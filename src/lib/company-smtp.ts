const smtpHost = "smtp.titan.email";
const smtpPort = 465;
const sender = "no-reply@buzzini.com.br";
const recipient = "assessoria@buzzini.com.br";
const encoder = new TextEncoder();

export type CompanyInquiry = {
  name: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  location: string;
  participants: string;
  message: string;
};

class SmtpResponseError extends Error {
  constructor(readonly statusCode: number) {
    super(`SMTP server returned ${statusCode}`);
    this.name = "SmtpResponseError";
  }
}

function base64(value: string): string {
  const bytes = encoder.encode(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function wrapBase64(value: string): string {
  return value.match(/.{1,76}/g)?.join("\r\n") ?? "";
}

function encodeHeader(value: string): string {
  return `=?UTF-8?B?${base64(value)}?=`;
}

function buildEmail(inquiry: CompanyInquiry): string {
  const body = [
    "Nova solicitação de proposta — Buzzini Empresas",
    "",
    `Nome: ${inquiry.name}`,
    `E-mail corporativo: ${inquiry.email}`,
    `Empresa: ${inquiry.company}`,
    `Cargo: ${inquiry.role}`,
    `Telefone: ${inquiry.phone || "Não informado"}`,
    `Participantes estimados: ${inquiry.participants}`,
    `Cidade e estado: ${inquiry.location}`,
    `Mensagem: ${inquiry.message || "Não informada"}`,
  ].join("\n");
  const encodedBody = wrapBase64(base64(body));

  return [
    `From: Buzzini Empresas <${sender}>`,
    `To: ${recipient}`,
    `Reply-To: ${inquiry.email}`,
    `Subject: ${encodeHeader(`Plano Empresarial | ${inquiry.company}`)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    encodedBody,
    ".",
    "",
  ].join("\r\n");
}

export async function sendCompanyInquiryEmail(
  password: string,
  inquiry: CompanyInquiry,
): Promise<void> {
  const { connect } = await import("cloudflare:sockets");
  const socket = connect({ hostname: smtpHost, port: smtpPort }, { secureTransport: "on" });
  const reader = socket.readable.getReader();
  const writer = socket.writable.getWriter();
  const decoder = new TextDecoder();
  let buffer = "";

  async function readLine(): Promise<string> {
    while (true) {
      const lineEnd = buffer.indexOf("\r\n");
      if (lineEnd !== -1) {
        const line = buffer.slice(0, lineEnd);
        buffer = buffer.slice(lineEnd + 2);
        return line;
      }

      const { value, done } = await reader.read();
      if (done) throw new Error("SMTP connection closed unexpectedly");
      buffer += decoder.decode(value, { stream: true });
      if (buffer.length > 8192) throw new Error("SMTP response exceeded the allowed size");
    }
  }

  async function readResponse(expected: number[]): Promise<void> {
    const lines: string[] = [];
    let line = await readLine();
    lines.push(line);
    const match = /^(\d{3})([ -])/.exec(line);
    if (!match) throw new Error("Invalid SMTP response");

    const statusCode = Number(match[1]);
    while (line[3] === "-") {
      line = await readLine();
      lines.push(line);
      if (lines.length > 30) throw new Error("SMTP response had too many lines");
      if (!line.startsWith(`${statusCode} `) && !line.startsWith(`${statusCode}-`)) {
        throw new Error("Invalid multiline SMTP response");
      }
    }

    if (!expected.includes(statusCode)) throw new SmtpResponseError(statusCode);
  }

  async function sendCommand(command: string, expected: number[]): Promise<void> {
    await writer.write(encoder.encode(`${command}\r\n`));
    await readResponse(expected);
  }

  try {
    await readResponse([220]);
    await sendCommand("EHLO buzzinisports.com.br", [250]);
    await sendCommand("AUTH PLAIN", [334]);
    await sendCommand(base64(`\u0000${sender}\u0000${password}`), [235]);
    await sendCommand(`MAIL FROM:<${sender}>`, [250]);
    await sendCommand(`RCPT TO:<${recipient}>`, [250, 251]);
    await sendCommand("DATA", [354]);
    await writer.write(encoder.encode(buildEmail(inquiry)));
    await readResponse([250]);
    await sendCommand("QUIT", [221]);
  } finally {
    reader.releaseLock();
    writer.releaseLock();
    await socket.close();
  }
}
