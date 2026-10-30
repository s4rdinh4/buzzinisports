import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

type RecipientResult = {
  email: string;
  status: "sent" | "suppressed" | "failed" | "not_sent";
  error?: string;
};

type CampaignResponse = {
  ok?: boolean;
  error?: string;
  results?: RecipientResult[];
};

export const Route = createFileRoute("/admin/email-campaign")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Disparo de e-mail | Buzzini Sports" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EmailCampaignPage,
});

function EmailCampaignPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [password, setPassword] = useState("");
  const [recipientsInput, setRecipientsInput] = useState("");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [consentConfirmed, setConsentConfirmed] = useState(false);
  const [unsubscribeConfirmed, setUnsubscribeConfirmed] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [results, setResults] = useState<RecipientResult[]>([]);

  useEffect(() => {
    let active = true;
    void fetch("/api/email-campaign")
      .then(async (response) => {
        if (response.ok) return true;
        if (response.status === 401) return false;
        const payload = (await response.json()) as CampaignResponse;
        throw new Error(payload.error || "Não foi possível verificar o acesso.");
      })
      .then((authenticated) => {
        if (active) setIsAuthenticated(authenticated);
      })
      .catch((error: unknown) => {
        if (!active) return;
        setErrorMessage(
          error instanceof Error ? error.message : "Não foi possível verificar o acesso.",
        );
      })
      .finally(() => {
        if (active) setIsLoadingSession(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const recipients = recipientsInput
    .split(/[\n,;]+/)
    .map((recipient) => recipient.trim().toLowerCase())
    .filter(Boolean);
  const uniqueRecipients = [...new Set(recipients)];
  const hasDuplicateRecipients = uniqueRecipients.length !== recipients.length;
  const invalidRecipients = uniqueRecipients.filter(
    (recipient) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient),
  );
  const canSend =
    isAuthenticated &&
    !isSending &&
    uniqueRecipients.length > 0 &&
    uniqueRecipients.length <= 50 &&
    !hasDuplicateRecipients &&
    invalidRecipients.length === 0 &&
    subject.trim().length > 0 &&
    html.trim().length > 0 &&
    html.includes("{{unsubscribe_url}}") &&
    consentConfirmed &&
    unsubscribeConfirmed;

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch("/api/email-campaign/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: password }),
      });
      const payload = (await response.json()) as CampaignResponse;
      if (!response.ok) throw new Error(payload.error || "Não foi possível entrar.");
      setPassword("");
      setIsAuthenticated(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Não foi possível validar a chave de acesso.",
      );
    }
  }

  async function handleSignOut() {
    try {
      const response = await fetch("/api/email-campaign/logout", { method: "POST" });
      if (!response.ok) {
        setErrorMessage("Não foi possível encerrar a sessão. Tente novamente.");
        return;
      }
      setIsAuthenticated(false);
      setErrorMessage("");
      setResults([]);
    } catch {
      setErrorMessage("Não foi possível encerrar a sessão. Tente novamente.");
    }
  }

  function addUnsubscribeLink() {
    const unsubscribeMarkup =
      '<p style="font-size:12px;color:#64748b;text-align:center;">Não deseja mais receber nossos e-mails? <a href="{{unsubscribe_url}}" style="color:#f59e0b;">Cancelar inscrição</a>.</p>';
    setHtml((currentHtml) => {
      if (currentHtml.includes("{{unsubscribe_url}}")) return currentHtml;
      if (/<\/body\s*>/i.test(currentHtml)) {
        return currentHtml.replace(/<\/body\s*>/i, `${unsubscribeMarkup}\n</body>`);
      }
      if (/<\/html\s*>/i.test(currentHtml)) {
        return currentHtml.replace(/<\/html\s*>/i, `${unsubscribeMarkup}\n</html>`);
      }
      return currentHtml.trim() ? `${currentHtml}\n${unsubscribeMarkup}` : unsubscribeMarkup;
    });
  }

  async function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend) return;

    setIsSending(true);
    setErrorMessage("");
    setResults([]);
    try {
      const response = await fetch("/api/email-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: crypto.randomUUID(),
          recipients: uniqueRecipients,
          subject: subject.trim(),
          html,
          consentConfirmed,
          unsubscribeConfirmed,
        }),
      });
      const payload = (await response.json()) as CampaignResponse;
      if (!response.ok) {
        if (response.status === 401) setIsAuthenticated(false);
        throw new Error(payload.error || "Não foi possível iniciar o envio.");
      }
      setResults(payload.results ?? []);
      if (!payload.results?.length) {
        setErrorMessage("O servidor não retornou o resultado do envio.");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Não foi possível concluir o envio.",
      );
    } finally {
      setIsSending(false);
    }
  }

  const resultLabels: Record<RecipientResult["status"], string> = {
    sent: "Enviado",
    suppressed: "Não enviado — endereço suprimido",
    failed: "Falha no envio",
    not_sent: "Não enviado — campanha interrompida",
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-8 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Área administrativa
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              Disparo de e-mail
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              Envie uma campanha individualmente para cada contato, usando o remetente oficial
              Buzzini Sports.
            </p>
          </div>
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => void handleSignOut()}
              className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-card"
            >
              Sair
            </button>
          )}
        </header>

        {errorMessage && (
          <p
            role="alert"
            className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            {errorMessage}
          </p>
        )}

        {isLoadingSession ? (
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted">
            Verificando acesso...
          </div>
        ) : !isAuthenticated ? (
          <form
            onSubmit={(event) => void handleSignIn(event)}
            className="max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl"
          >
            <h2 className="font-display text-xl font-semibold">Entrar</h2>
            <p className="mt-2 text-sm text-muted">
              Informe a chave administrativa configurada nos secrets do servidor.
            </p>
            <label className="mt-4 block text-sm font-medium" htmlFor="admin-password">
              Chave de acesso
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <button
              type="submit"
              className="mt-5 min-h-11 w-full rounded-full bg-primary px-5 font-semibold text-primary-foreground transition-colors hover:bg-primary-soft"
            >
              Entrar
            </button>
          </form>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
            <form
              onSubmit={(event) => void handleSend(event)}
              className="space-y-5 rounded-2xl border border-border bg-card p-5 shadow-xl sm:p-7"
            >
              <div>
                <h2 className="font-display text-xl font-semibold">Nova campanha</h2>
                <p className="mt-1 text-sm text-muted">
                  Até 50 destinatários. Os endereços não ficam visíveis uns para os outros nem são
                  armazenados pela página.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium" htmlFor="campaign-recipients">
                  Destinatários
                </label>
                <textarea
                  id="campaign-recipients"
                  required
                  rows={5}
                  value={recipientsInput}
                  onChange={(event) => setRecipientsInput(event.target.value)}
                  placeholder={"pessoa1@exemplo.com\npessoa2@exemplo.com"}
                  aria-describedby="recipients-help"
                  className="mt-1 w-full resize-y rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
                <p id="recipients-help" className="mt-1 text-xs text-muted">
                  Separe os endereços por linha, vírgula ou ponto e vírgula.{" "}
                  {uniqueRecipients.length}
                  /50 endereços na lista.
                </p>
                {invalidRecipients.length > 0 && (
                  <p role="alert" className="mt-1 text-xs text-red-300">
                    Confira os endereços inválidos: {invalidRecipients.join(", ")}
                  </p>
                )}
                {hasDuplicateRecipients && (
                  <p role="alert" className="mt-1 text-xs text-red-300">
                    Há endereços repetidos. Remova-os antes de enviar.
                  </p>
                )}
                {uniqueRecipients.length > 50 && (
                  <p role="alert" className="mt-1 text-xs text-red-300">
                    O limite por campanha é de 50 destinatários.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium" htmlFor="campaign-subject">
                  Assunto
                </label>
                <input
                  id="campaign-subject"
                  required
                  maxLength={180}
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="mt-1 min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium" htmlFor="campaign-html">
                  HTML do e-mail
                </label>
                <textarea
                  id="campaign-html"
                  required
                  maxLength={100_000}
                  rows={14}
                  value={html}
                  onChange={(event) => setHtml(event.target.value)}
                  placeholder="Cole aqui o HTML completo da campanha."
                  className="mt-1 w-full resize-y rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
                <button
                  type="button"
                  onClick={addUnsubscribeLink}
                  className="mt-2 min-h-9 rounded-full border border-border px-3 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Inserir link personalizado de descadastro
                </button>
                <div className="mt-3 rounded-lg border border-primary/30 bg-primary/5 p-3 text-xs leading-relaxed text-muted">
                  <p className="font-semibold text-foreground">O link final é criado no disparo</p>
                  <p className="mt-1">
                    No HTML você verá{" "}
                    <code className="rounded bg-background px-1 py-0.5 font-mono text-foreground">
                      {"{{unsubscribe_url}}"}
                    </code>
                    . Isso é esperado: ao enviar, o sistema troca esse marcador por um link para a
                    página de descadastro com um token exclusivo para cada destinatário.
                  </p>
                  <p className="mt-1">Máximo de 100.000 caracteres.</p>
                </div>
              </div>

              <div className="space-y-3 rounded-xl border border-border bg-background/60 p-4">
                <label className="flex items-start gap-3 text-sm leading-relaxed">
                  <input
                    type="checkbox"
                    checked={consentConfirmed}
                    onChange={(event) => setConsentConfirmed(event.target.checked)}
                    className="mt-1 size-4 accent-primary"
                  />
                  <span>
                    Confirmo que os destinatários autorizaram o recebimento destas comunicações.
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm leading-relaxed">
                  <input
                    type="checkbox"
                    checked={unsubscribeConfirmed}
                    onChange={(event) => setUnsubscribeConfirmed(event.target.checked)}
                    className="mt-1 size-4 accent-primary"
                  />
                  <span>
                    Confirmo que o HTML inclui um link funcional para o destinatário cancelar o
                    recebimento.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!canSend}
                className="min-h-12 w-full rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary-soft disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSending ? "Enviando campanha..." : "Enviar campanha"}
              </button>
            </form>

            <aside className="space-y-5">
              <section className="rounded-2xl border border-border bg-card p-5">
                <h2 className="font-display text-lg font-semibold">Remetente</h2>
                <p className="mt-2 text-sm text-muted">Buzzini Sports</p>
                <p className="font-mono text-sm">noreply@notify.buzzini.com.br</p>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  O envio ocorre pelo serviço gerenciado do Lovable. Cada contato recebe uma
                  mensagem individual.
                </p>
              </section>

              <section className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="border-b border-border p-4">
                  <h2 className="font-display text-lg font-semibold">Pré-visualização</h2>
                  <p className="mt-1 text-xs text-muted">
                    A prévia é isolada e pode não refletir todos os clientes de e-mail.
                  </p>
                </div>
                {html.trim() ? (
                  <iframe
                    title="Pré-visualização do HTML da campanha"
                    srcDoc={html}
                    sandbox=""
                    referrerPolicy="no-referrer"
                    className="h-[28rem] w-full bg-white"
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center px-5 text-sm text-muted">
                    Cole o HTML para visualizar.
                  </div>
                )}
              </section>

              {results.length > 0 && (
                <section
                  aria-live="polite"
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <h2 className="font-display text-lg font-semibold">Resultado do envio</h2>
                  <p className="mt-1 text-sm text-muted">
                    {results.filter((result) => result.status === "sent").length} enviados de{" "}
                    {results.length} destinatários.
                  </p>
                  <ul className="mt-4 max-h-72 space-y-2 overflow-auto text-xs">
                    {results.map((result) => (
                      <li
                        key={`${result.email}-${result.status}`}
                        className="flex flex-wrap justify-between gap-x-3 gap-y-1 border-t border-border pt-2"
                      >
                        <span className="break-all font-mono">{result.email}</span>
                        <span className="text-right">
                          <span
                            className={
                              result.status === "sent"
                                ? "text-emerald-300"
                                : result.status === "not_sent"
                                  ? "text-amber-300"
                                  : "text-red-300"
                            }
                          >
                            {resultLabels[result.status]}
                          </span>
                          {result.error && (
                            <span className="mt-1 block max-w-xs text-red-200/80">
                              Motivo: {result.error}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
