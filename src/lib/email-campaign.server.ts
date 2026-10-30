import { EmailAPIError, sendLovableEmail } from "@lovable.dev/email-js";
import { decodeHTML } from "entities";
import { z } from "zod";

const MAX_CAMPAIGN_BYTES = 150_000;
const MAX_CAMPAIGN_RECIPIENTS = 50;
const CAMPAIGN_HTML_LIMIT = 100_000;

const campaignSchema = z.object({
  campaignId: z.string().uuid(),
  recipients: z.array(z.string().trim().email().max(254)).min(1).max(MAX_CAMPAIGN_RECIPIENTS),
  subject: z
    .string()
    .trim()
    .min(1)
    .max(180)
    .refine(
      (value) =>
        !Array.from(value).some(
          (character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127,
        ),
    ),
  html: z
    .string()
    .min(1)
    .max(CAMPAIGN_HTML_LIMIT)
    .refine(
      (value) => !/<(?:script|iframe|object|embed)\b|on[a-z]+\s*=|javascript\s*:/i.test(value),
      "O HTML contém conteúdo não permitido.",
    ),
  consentConfirmed: z.literal(true),
  unsubscribeConfirmed: z.literal(true),
});

type Authorization = { authorizedEmail: string } | { response: Response };

async function authorizeCampaignRequest(request: Request): Promise<Authorization> {
  const supabaseUrl = process.env["SUPABASE_URL"];
  const publishableKey = process.env["SUPABASE_PUBLISHABLE_KEY"];
  const adminEmails = (process.env["EMAIL_CAMPAIGN_ADMIN_EMAILS"] ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (!supabaseUrl || !publishableKey || adminEmails.length === 0) {
    console.error("Email campaign admin authorization is not configured");
    return {
      response: Response.json(
        { error: "O acesso administrativo ainda não está configurado no servidor." },
        { status: 503 },
      ),
    };
  }

  const authorization = request.headers.get("authorization");
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) {
    return {
      response: Response.json({ error: "Faça login para continuar." }, { status: 401 }),
    };
  }

  let userResponse: Response;
  try {
    userResponse = await fetch(`${supabaseUrl.replace(/\/+$/, "")}/auth/v1/user`, {
      headers: {
        apikey: publishableKey,
        authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Email campaign authentication request failed", error);
    return {
      response: Response.json(
        { error: "Não foi possível validar seu login. Tente novamente." },
        { status: 502 },
      ),
    };
  }

  if (userResponse.status === 401 || userResponse.status === 403) {
    return {
      response: Response.json({ error: "Sua sessão expirou. Entre novamente." }, { status: 401 }),
    };
  }

  if (!userResponse.ok) {
    console.error("Email campaign authentication failed", userResponse.status);
    return {
      response: Response.json(
        { error: "Não foi possível validar seu login. Tente novamente." },
        { status: 502 },
      ),
    };
  }

  let user: { email?: unknown; email_confirmed_at?: unknown };
  try {
    user = (await userResponse.json()) as typeof user;
  } catch (error) {
    console.error("Email campaign authentication returned an invalid response", error);
    return {
      response: Response.json(
        { error: "Não foi possível validar seu login. Tente novamente." },
        { status: 502 },
      ),
    };
  }

  if (
    typeof user.email !== "string" ||
    !user.email_confirmed_at ||
    !adminEmails.includes(user.email.trim().toLowerCase())
  ) {
    return {
      response: Response.json(
        { error: "Esta conta não está autorizada a acessar os disparos." },
        { status: 403 },
      ),
    };
  }

  return { authorizedEmail: user.email };
}

function htmlToPlainText(html: string): string {
  const text = html
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ")
    .replace(/<\s*(br|\/p|\/div|\/tr|\/li|\/h[1-6])\b[^>]*>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n");

  return decodeHTML(text).trim();
}

function containsUnsubscribeLink(html: string): boolean {
  const links = html.matchAll(
    /<a\b[^>]*\bhref\s*=\s*(["'])(https?:\/\/.*?)\1[^>]*>([\s\S]*?)<\/a\s*>/gi,
  );
  for (const link of links) {
    const label = decodeHTML((link[3] ?? "").replace(/<[^>]*>/g, " ")).trim();
    if (
      /descadastr|cancelar.{0,30}(?:receb|inscriç)|parar de receber|unsubscribe|opt.?out|sair da lista/i.test(
        label,
      )
    ) {
      return true;
    }
  }
  return false;
}

export async function handleEmailCampaign(request: Request): Promise<Response> {
  if (request.method !== "GET" && request.method !== "POST") {
    return Response.json({ error: "Método não permitido." }, { status: 405 });
  }

  if (request.method === "POST") {
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
  }

  const authorization = await authorizeCampaignRequest(request);
  if ("response" in authorization) return authorization.response;

  if (request.method === "GET") {
    return Response.json({ ok: true, email: authorization.authorizedEmail });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_CAMPAIGN_BYTES) {
    return Response.json({ error: "O conteúdo ultrapassa o limite permitido." }, { status: 413 });
  }

  let payload: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_CAMPAIGN_BYTES) {
      return Response.json({ error: "O conteúdo ultrapassa o limite permitido." }, { status: 413 });
    }
    payload = JSON.parse(body);
  } catch {
    return Response.json({ error: "Não foi possível ler os dados enviados." }, { status: 400 });
  }

  const parsed = campaignSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      { error: "Confira os destinatários, o assunto, o HTML e as confirmações obrigatórias." },
      { status: 400 },
    );
  }

  if (!containsUnsubscribeLink(parsed.data.html)) {
    return Response.json(
      {
        error: "Inclua no HTML um link HTTPS funcional, com texto de descadastro, antes de enviar.",
      },
      { status: 400 },
    );
  }

  const recipients = [...new Set(parsed.data.recipients.map((email) => email.toLowerCase()))];
  if (recipients.length !== parsed.data.recipients.length) {
    return Response.json(
      { error: "Remova endereços repetidos da lista antes de enviar." },
      { status: 400 },
    );
  }

  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    console.error("LOVABLE_API_KEY is not configured for email campaigns");
    return Response.json(
      { error: "O serviço de e-mail ainda não está configurado no servidor." },
      { status: 503 },
    );
  }

  const plainText = htmlToPlainText(parsed.data.html);
  if (!plainText) {
    return Response.json(
      { error: "O HTML precisa conter texto para a versão de e-mail sem formatação." },
      { status: 400 },
    );
  }

  const results: Array<{
    email: string;
    status: "sent" | "suppressed" | "failed" | "not_sent";
  }> = [];
  let stopSending = false;

  for (const recipient of recipients) {
    if (stopSending) {
      results.push({ email: recipient, status: "not_sent" });
      continue;
    }

    try {
      await sendLovableEmail(
        {
          to: recipient,
          from: { name: "Buzzini Sports", address: "noreply@notify.buzzini.com.br" },
          sender_domain: "notify.buzzini.com.br",
          subject: parsed.data.subject,
          html: parsed.data.html,
          text: plainText,
          purpose: "marketing",
          label: "admin-marketing-campaign",
          idempotency_key: `${parsed.data.campaignId}-${recipient}`,
        },
        { apiKey, sendUrl: process.env["LOVABLE_SEND_URL"] },
      );
      results.push({ email: recipient, status: "sent" });
    } catch (error) {
      if (error instanceof EmailAPIError && error.code === "recipient_suppressed") {
        results.push({ email: recipient, status: "suppressed" });
        continue;
      }

      console.error(
        "Marketing campaign email delivery failed",
        error instanceof EmailAPIError ? error.code : "unexpected_failure",
        error instanceof EmailAPIError ? error.status : undefined,
      );
      results.push({ email: recipient, status: "failed" });

      if (error instanceof EmailAPIError && error.retryable) {
        stopSending = true;
      }
    }
  }

  return Response.json({ ok: true, results });
}
