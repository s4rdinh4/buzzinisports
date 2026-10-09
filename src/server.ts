import "./lib/error-capture";

import { sendCompanyInquiryEmail } from "./lib/company-smtp";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { z } from "zod";

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

function getSmtpPassword(env: unknown): string | undefined {
  if (typeof env === "object" && env !== null) {
    const binding = (env as Record<string, unknown>)["SMTP_PASSWORD"];
    if (typeof binding === "string" && binding.length > 0) return binding;
  }

  if (typeof process !== "undefined") {
    const localPassword = process.env["SMTP_PASSWORD"];
    if (localPassword) return localPassword;
  }

  return undefined;
}

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

async function handleCompanyInquiry(request: Request, env: unknown): Promise<Response> {
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

  const password = getSmtpPassword(env);
  if (!password) {
    console.error("Company inquiry SMTP secret is not configured");
    return Response.json({ error: "Envio temporariamente indisponível." }, { status: 503 });
  }

  try {
    await sendCompanyInquiryEmail(password, parsed.data);
    return Response.json({ ok: true });
  } catch (error) {
    console.error(
      "Company inquiry email delivery failed",
      error instanceof Error ? error.name : "Unknown error",
      error instanceof Error ? error.message : "",
    );
    return Response.json(
      { error: "Não foi possível enviar a solicitação. Tente novamente mais tarde." },
      { status: 502 },
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
        return await handleCompanyInquiry(request, env);
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
