import { EmailAPIError, sendLovableEmail, setEmailUnsubscribe } from "@lovable.dev/email-js";
import { decodeHTML } from "entities";
import { z } from "zod";

const MAX_CAMPAIGN_BYTES = 150_000;
const MAX_CAMPAIGN_RECIPIENTS = 50;
const CAMPAIGN_HTML_LIMIT = 100_000;
const SESSION_COOKIE_NAME = "buzzini_campaign_session";
const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;
const UNSUBSCRIBE_PLACEHOLDER = "{{unsubscribe_url}}";
const SENDER_DOMAIN = "notify.buzzini.com.br";

function containsUnsafeEmailMarkup(html: string): boolean {
  return (
    /<(?:script|iframe|object|embed)\b/i.test(html) ||
    /<[a-z][^>]*\s+on[a-z0-9_-]+\s*=/i.test(html) ||
    /<[a-z][^>]*\s+(?:href|src|action|formaction)\s*=\s*(?:["'])?\s*(?:javascript|data):/i.test(
      html,
    )
  );
}

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
    .refine((value) => !containsUnsafeEmailMarkup(value), "O HTML contém conteúdo não permitido."),
  consentConfirmed: z.literal(true),
  unsubscribeConfirmed: z.literal(true),
});

function getAdminSecret(): string | null {
  const secret = process.env["EMAIL_CAMPAIGN_ADMIN_KEY"];
  return secret && secret.length >= 32 ? secret : null;
}

function jsonResponse(body: unknown, status = 200, headers?: HeadersInit): Response {
  const responseHeaders = new Headers(headers);
  responseHeaders.set("Cache-Control", "no-store");
  return Response.json(body, { status, headers: responseHeaders });
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function readCookie(request: Request, name: string): string | undefined {
  const cookieHeader = request.headers.get("cookie") ?? "";
  for (const cookie of cookieHeader.split(";")) {
    const [key, ...valueParts] = cookie.trim().split("=");
    if (key === name) return valueParts.join("=");
  }
  return undefined;
}

async function createSessionSignature(expiration: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(expiration));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

async function isValidSessionSignature(
  expiration: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  if (!/^\d{10}$/.test(expiration) || !/^[a-f0-9]{64}$/.test(signature)) return false;
  if (Number(expiration) <= Math.floor(Date.now() / 1000)) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  const signatureBytes = new Uint8Array(
    signature.match(/.{2}/g)?.map((part) => Number.parseInt(part, 16)) ?? [],
  );
  return crypto.subtle.verify("HMAC", key, signatureBytes, new TextEncoder().encode(expiration));
}

async function validateSession(request: Request, secret: string): Promise<boolean> {
  const token = readCookie(request, SESSION_COOKIE_NAME);
  if (!token) return false;
  const separator = token.indexOf(".");
  if (separator < 0) return false;
  return isValidSessionSignature(token.slice(0, separator), token.slice(separator + 1), secret);
}

function sessionCookie(request: Request, value: string, maxAge: number): string {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${SESSION_COOKIE_NAME}=${value}; Path=/api/email-campaign; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`;
}

async function authorizeCampaignRequest(request: Request): Promise<Response | null> {
  const secret = getAdminSecret();
  if (!secret) {
    console.error("EMAIL_CAMPAIGN_ADMIN_KEY is missing or shorter than 32 characters");
    return jsonResponse(
      { error: "O acesso administrativo ainda não está configurado no servidor." },
      503,
    );
  }

  if (!(await validateSession(request, secret))) {
    return jsonResponse({ error: "A sessão expirou. Entre novamente." }, 401);
  }
  return null;
}

async function handleCampaignLogin(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Método não permitido." }, 405, { Allow: "POST" });
  }
  if (!isSameOrigin(request)) {
    return jsonResponse({ error: "Origem da solicitação inválida." }, 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return jsonResponse({ error: "Formato de solicitação inválido." }, 415);
  }

  const secret = getAdminSecret();
  if (!secret) {
    console.error("EMAIL_CAMPAIGN_ADMIN_KEY is missing or shorter than 32 characters");
    return jsonResponse(
      { error: "O acesso administrativo ainda não está configurado no servidor." },
      503,
    );
  }

  let payload: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > 2_000) {
      return jsonResponse({ error: "Solicitação muito grande." }, 413);
    }
    payload = JSON.parse(body);
  } catch {
    return jsonResponse({ error: "Não foi possível ler os dados enviados." }, 400);
  }

  const parsed = z.object({ key: z.string().min(1).max(500) }).safeParse(payload);
  if (!parsed.success) {
    return jsonResponse({ error: "Informe a chave de acesso." }, 400);
  }

  const [submittedDigest, expectedDigest] = await Promise.all([
    crypto.subtle.digest("SHA-256", new TextEncoder().encode(parsed.data.key)),
    crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret)),
  ]);
  const submittedBytes = new Uint8Array(submittedDigest);
  const expectedBytes = new Uint8Array(expectedDigest);
  let matches = 0;
  for (let index = 0; index < expectedBytes.length; index += 1) {
    matches |= submittedBytes[index]! ^ expectedBytes[index]!;
  }
  if (matches !== 0) {
    return jsonResponse({ error: "Chave de acesso inválida." }, 401);
  }

  const expiration = String(Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS);
  const signature = await createSessionSignature(expiration, secret);
  return jsonResponse({ ok: true }, 200, {
    "Set-Cookie": sessionCookie(request, `${expiration}.${signature}`, SESSION_MAX_AGE_SECONDS),
  });
}

function handleCampaignLogout(request: Request): Response {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Método não permitido." }, 405, { Allow: "POST" });
  }
  if (!isSameOrigin(request)) {
    return jsonResponse({ error: "Origem da solicitação inválida." }, 403);
  }
  return jsonResponse({ ok: true }, 200, { "Set-Cookie": sessionCookie(request, "", 0) });
}

function htmlToPlainText(html: string): string {
  const text = html
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ")
    .replace(
      /<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a\s*>/gi,
      (_match, _quote: string, href: string, content: string) =>
        `${content.replace(/<[^>]*>/g, " ")} (${href})`,
    )
    .replace(/<\s*(br|\/p|\/div|\/tr|\/li|\/h[1-6])\b[^>]*>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n");

  return decodeHTML(text).trim();
}

function containsUnsubscribePlaceholder(html: string): boolean {
  const links = html.matchAll(/<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a\s*>/gi);
  for (const link of links) {
    if (link[2]?.trim() !== UNSUBSCRIBE_PLACEHOLDER) continue;
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

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  if (!/^[a-zA-Z0-9_-]+$/.test(value)) throw new Error("Invalid unsubscribe token encoding");
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function getUnsubscribeEncryptionKey(secret: string): Promise<CryptoKey> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret));
  return crypto.subtle.importKey("raw", digest, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

async function createUnsubscribeToken(
  email: string,
  campaignId: string,
  secret: string,
): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const payload = new TextEncoder().encode(JSON.stringify({ email, campaignId }));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    await getUnsubscribeEncryptionKey(secret),
    payload,
  );
  return `${bytesToBase64Url(iv)}.${bytesToBase64Url(new Uint8Array(encrypted))}`;
}

async function readUnsubscribeToken(
  token: string,
  secret: string,
): Promise<{ email: string; campaignId: string } | null> {
  try {
    const [encodedIv, encodedPayload, ...rest] = token.split(".");
    if (!encodedIv || !encodedPayload || rest.length > 0) return null;
    const decodedIv = base64UrlToBytes(encodedIv);
    const iv = new Uint8Array(decodedIv.length);
    iv.set(decodedIv);
    const decodedPayload = base64UrlToBytes(encodedPayload);
    const encryptedPayload = new Uint8Array(decodedPayload.length);
    encryptedPayload.set(decodedPayload);
    const decoded = new TextDecoder().decode(
      await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        await getUnsubscribeEncryptionKey(secret),
        encryptedPayload,
      ),
    );
    const parsed: unknown = JSON.parse(decoded);
    const result = z
      .object({
        email: z.string().email().max(254),
        campaignId: z.string().uuid(),
      })
      .safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

function unsubscribePage(message: string, token: string, confirmed = false): Response {
  const title = confirmed ? "Descadastro confirmado" : "Cancelar recebimento de e-mails";
  const content = confirmed
    ? `<p>${message}</p>`
    : `<p>Confirme para parar de receber comunicações de marketing da Buzzini Sports.</p>
      <form method="post">
        <input type="hidden" name="token" value="${token}">
        <button type="submit">Confirmar descadastro</button>
      </form>`;
  const html = `<!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="noindex,nofollow">
        <title>${title} | Buzzini Sports</title>
        <style>
          body{margin:0;padding:24px;background:#0b0e14;color:#f8fafc;font:16px/1.6 Arial,sans-serif}
          main{max-width:560px;margin:12vh auto;padding:32px;border:1px solid #334155;border-radius:16px;background:#131924}
          h1{font-size:24px}p{color:#cbd5e1}
          button{margin-top:16px;padding:12px 20px;border:0;border-radius:999px;background:#f59e0b;color:#111827;font-weight:700;cursor:pointer}
        </style>
      </head>
      <body><main><h1>${title}</h1>${content}</main></body>
    </html>`;
  return new Response(html, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
      "Content-Security-Policy":
        "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
      "Content-Type": "text/html; charset=utf-8",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function handleUnsubscribe(request: Request, token: string): Promise<Response> {
  const secret = getAdminSecret();
  if (!secret) {
    console.error("EMAIL_CAMPAIGN_ADMIN_KEY is missing or shorter than 32 characters");
    return new Response("O descadastro está temporariamente indisponível.", { status: 503 });
  }

  const payload = await readUnsubscribeToken(token, secret);
  if (!payload) {
    return new Response("Este link de descadastro é inválido.", { status: 400 });
  }

  if (request.method === "GET") {
    return unsubscribePage("", token);
  }
  if (request.method !== "POST") {
    return new Response("Método não permitido.", { status: 405, headers: { Allow: "GET, POST" } });
  }
  if (!isSameOrigin(request)) {
    return new Response("Origem da solicitação inválida.", { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/x-www-form-urlencoded")) {
    return new Response("Solicitação inválida.", { status: 415 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return new Response("Não foi possível ler a solicitação.", { status: 400 });
  }
  if (form.get("token") !== token) {
    return new Response("O link de descadastro não corresponde à solicitação.", { status: 400 });
  }

  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    console.error("LOVABLE_API_KEY is not configured for email unsubscribes");
    return new Response("O descadastro está temporariamente indisponível.", { status: 503 });
  }

  try {
    const apiBaseUrl = process.env["LOVABLE_API_BASE_URL"];
    await setEmailUnsubscribe(
      { recipient: payload.email, domain: SENDER_DOMAIN, subscribed: false },
      apiBaseUrl ? { apiKey, apiBaseUrl } : { apiKey },
    );
  } catch (error) {
    console.error(
      "Marketing email unsubscribe failed",
      error instanceof EmailAPIError ? error.code : "unexpected_failure",
      error instanceof EmailAPIError ? error.status : undefined,
    );
    return new Response("Não foi possível concluir o descadastro. Tente novamente mais tarde.", {
      status: 502,
    });
  }

  return unsubscribePage(
    "Seu endereço foi removido das comunicações de marketing da Buzzini Sports.",
    token,
    true,
  );
}

export async function handleEmailCampaign(request: Request): Promise<Response> {
  const pathname = new URL(request.url).pathname;
  if (pathname === "/api/email-campaign/login") return handleCampaignLogin(request);
  if (pathname === "/api/email-campaign/logout") return handleCampaignLogout(request);
  if (pathname !== "/api/email-campaign") {
    return jsonResponse({ error: "Não encontrado." }, 404);
  }

  const unsubscribeToken = new URL(request.url).searchParams.get("unsubscribe");
  if (unsubscribeToken) return handleUnsubscribe(request, unsubscribeToken);

  if (request.method !== "GET" && request.method !== "POST") {
    return jsonResponse({ error: "Método não permitido." }, 405, { Allow: "GET, POST" });
  }

  if (request.method === "POST") {
    if (!isSameOrigin(request)) {
      return jsonResponse({ error: "Origem da solicitação inválida." }, 403);
    }
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return jsonResponse({ error: "Formato de solicitação inválido." }, 415);
    }
  }

  const authorizationError = await authorizeCampaignRequest(request);
  if (authorizationError) return authorizationError;

  if (request.method === "GET") return jsonResponse({ ok: true });

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_CAMPAIGN_BYTES) {
    return jsonResponse({ error: "O conteúdo ultrapassa o limite permitido." }, 413);
  }

  let payload: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_CAMPAIGN_BYTES) {
      return jsonResponse({ error: "O conteúdo ultrapassa o limite permitido." }, 413);
    }
    payload = JSON.parse(body);
  } catch {
    return jsonResponse({ error: "Não foi possível ler os dados enviados." }, 400);
  }

  const parsed = campaignSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldLabels: Record<string, string> = {
      campaignId: "identificador da campanha",
      recipients: "destinatários (e-mails inválidos ou limite acima de 50)",
      subject: "assunto (obrigatório, máximo de 180 caracteres)",
      html: "HTML (obrigatório, máximo de 100.000 caracteres ou conteúdo não permitido)",
      consentConfirmed: "confirmação de consentimento",
      unsubscribeConfirmed: "confirmação do link de descadastro",
    };
    const invalidFields = [
      ...new Set(
        parsed.error.issues.map((issue) => {
          const field = issue.path[0];
          return fieldLabels[typeof field === "string" ? field : ""] ?? "dados do formulário";
        }),
      ),
    ];
    return jsonResponse({ error: `Confira: ${invalidFields.join("; ")}.` }, 400);
  }

  if (!containsUnsubscribePlaceholder(parsed.data.html)) {
    return jsonResponse(
      {
        error: `Inclua o marcador ${UNSUBSCRIBE_PLACEHOLDER} no href de um link com texto de descadastro.`,
      },
      400,
    );
  }

  const recipients = [...new Set(parsed.data.recipients.map((email) => email.toLowerCase()))];
  if (recipients.length !== parsed.data.recipients.length) {
    return jsonResponse({ error: "Remova endereços repetidos da lista antes de enviar." }, 400);
  }

  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    console.error("LOVABLE_API_KEY is not configured for email campaigns");
    return jsonResponse(
      { error: "O serviço de e-mail ainda não está configurado no servidor." },
      503,
    );
  }

  const campaignSecret = getAdminSecret();
  if (!campaignSecret) {
    console.error("EMAIL_CAMPAIGN_ADMIN_KEY is missing or shorter than 32 characters");
    return jsonResponse(
      { error: "O acesso administrativo ainda não está configurado no servidor." },
      503,
    );
  }

  const plainText = htmlToPlainText(parsed.data.html);
  if (!plainText) {
    return jsonResponse(
      { error: "O HTML precisa conter texto para a versão de e-mail sem formatação." },
      400,
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
      const unsubscribeToken = await createUnsubscribeToken(
        recipient,
        parsed.data.campaignId,
        campaignSecret,
      );
      const unsubscribeUrl = new URL("/api/email-campaign", request.url);
      unsubscribeUrl.searchParams.set("unsubscribe", unsubscribeToken);
      const personalizedHtml = parsed.data.html.replaceAll(
        UNSUBSCRIBE_PLACEHOLDER,
        unsubscribeUrl.toString(),
      );
      await sendLovableEmail(
        {
          to: recipient,
          from: { name: "Buzzini Sports", address: "noreply@notify.buzzini.com.br" },
          sender_domain: "notify.buzzini.com.br",
          subject: parsed.data.subject,
          html: personalizedHtml,
          text: htmlToPlainText(personalizedHtml),
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

  return jsonResponse({ ok: true, results });
}
