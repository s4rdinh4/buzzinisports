import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

type UnsubscribeState = "ready" | "submitting" | "success" | "error";

export const Route = createFileRoute("/descadastro")({
  staticData: { sitemap: false },
  validateSearch: z.object({ token: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Cancelar inscrição | Buzzini Sports" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: UnsubscribePage,
});

function UnsubscribePage() {
  const { token } = Route.useSearch();
  const [state, setState] = useState<UnsubscribeState>("ready");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleUnsubscribe() {
    if (!token || state === "submitting") return;
    setState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(`/api/email-campaign?unsubscribe=${encodeURIComponent(token)}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ token }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Não foi possível concluir o descadastro.");
      }

      setState("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Não foi possível concluir o descadastro.",
      );
      setState("error");
    }
  }

  const hasToken = Boolean(token);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <section
        aria-labelledby="unsubscribe-title"
        className="w-full max-w-xl rounded-3xl border border-border bg-card p-7 shadow-2xl sm:p-10"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Buzzini Sports</p>
        <h1 id="unsubscribe-title" className="mt-4 font-display text-3xl font-semibold">
          {state === "success" ? "Descadastro confirmado" : "Cancelar inscrição"}
        </h1>

        {state === "success" ? (
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Seu endereço foi removido das comunicações de marketing da Buzzini Sports.
          </p>
        ) : hasToken ? (
          <>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Se você confirmar, não receberá mais e-mails de campanhas da Buzzini Sports neste
              endereço.
            </p>
            {state === "error" && (
              <p role="alert" className="mt-4 text-sm leading-relaxed text-red-300">
                {errorMessage}
              </p>
            )}
            <button
              type="button"
              onClick={() => void handleUnsubscribe()}
              disabled={state === "submitting"}
              className="mt-7 min-h-12 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary-soft disabled:cursor-wait disabled:opacity-60"
            >
              {state === "submitting" ? "Processando..." : "Confirmar descadastro"}
            </button>
          </>
        ) : (
          <p role="alert" className="mt-4 text-sm leading-relaxed text-muted">
            Este link de descadastro está incompleto ou inválido. Use o link recebido no e-mail.
          </p>
        )}
      </section>
    </main>
  );
}
