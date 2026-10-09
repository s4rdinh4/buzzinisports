import "./lib/error-capture";

import { sendTemplateEmail } from "./lib/email-templates/send-email";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { z } from "zod";
import { EmailAPIError } from '@lovable.dev/email-js';

const companyInquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(2).max(160),
  role: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(40),
  location: z.string().trim().min(2).max(120),
  participants: z.enum([
    "1–10 pessoas",
    "11–30 pessoas",
    "31–100 pessoas",
    "Mais de 100 pessoas",
    "Ainda não sabemos",
  ]),
  message: z.string().trim().max(600),
  consent: z.literal(true),
  website: z.string().max(0),
});

const MAX_COMPANY_INQUIRY_BYTES = 10_000;

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

async function handleCompanyInquiry(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "Método não permitido." }, { status: 405 });
  }

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return Response.json({ error: "Origem da solicitação inválida." }, { status: 403 });
      }
    } catch {
      return Response.json({ error: "Origem da solicitação inválida." }, { status: 403 });
    }
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Formato de solicitação inválido." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_COMPANY_INQUIRY_BYTES) {
    return Response.json({ error: "Solicitação muito grande." }, { status: 413 });
  }

  let payload: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_COMPANY_INQUIRY_BYTES) {
      return Response.json({ error: "Solicitação muito grande." }, { status: 413 });
    }
    payload = JSON.parse(body);
  } catch {
    return Response.json({ error: "Não foi possível ler os dados enviados." }, { status: 400 });
  }

  const parsed = companyInquirySchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      { error: "Confira os campos obrigatórios do formulário." },
      { status: 400 },
    );
  }

  try {
    const result = await sendTemplateEmail('company-inquiry', 'assessoria@buzzini.com.br', {
      templateData: parsed.data,
      replyTo: parsed.data.email,
      idempotencyKey: `company-inquiry-${crypto.randomUUID()}`,
    });
    if (!result.sent) {
      return Response.json({ ok: false, code: 'recipient_suppressed', error: 'O recebimento por e-mail está indisponível. Entre em contato pelo WhatsApp.' });
    }
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof EmailAPIError) {
      if (error.code === 'domain_not_verified' || error.code === 'emails_disabled') {
        return Response.json(
          { ok: false, code: error.code, error: 'O envio por e-mail ainda não está disponível. Tente novamente mais tarde ou fale com a equipe pelo WhatsApp.' },
        );
      }
      if (error.status === 429) {
        const retryAfter = error.retryAfterSeconds ?? 60;
        return Response.json(
          { ok: false, code: 'rate_limited', error: 'O envio está temporariamente ocupado. Aguarde alguns instantes antes de tentar novamente.' },
          { status: 429, headers: { 'Retry-After': String(retryAfter) } },
        );
      }
    }
    console.error(
      "Company inquiry email delivery failed",
      error instanceof Error ? error.name : "Unknown error",
      error instanceof EmailAPIError ? error.code : 'unexpected_failure',
    );
    return Response.json(
      { ok: false, code: 'delivery_failed', error: "Não foi possível enviar a solicitação. Tente novamente mais tarde." },
    );
  }
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/api/empresa-contato") {
        return await handleCompanyInquiry(request);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
