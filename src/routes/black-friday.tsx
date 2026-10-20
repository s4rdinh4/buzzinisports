import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  CreditCard,
  MessageCircle,
} from "lucide-react";

import buzziniLogo from "@/assets/logo_buzzini.svg";
import heroPhoto from "@/assets/fundo-site.webp";
import { sendGTMEvent } from "@/lib/gtm";

const whatsappNumber = "5517988026622";
const whatsappMessage =
  "Olá! Tenho interesse na promoção Black Friday da Buzzini Sports: plano trimestral de R$ 150,00 por R$ 99,90, com pagamento no cartão. Pode me orientar sobre a contratação?";
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

export const Route = createFileRoute("/black-friday")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Black Friday Buzzini Sports | Plano trimestral" },
      {
        name: "description",
        content:
          "Na Black Friday Buzzini Sports, o plano trimestral sai de R$ 150,00 por R$ 99,90. Pagamento no cartão. Fale com a equipe pelo WhatsApp.",
      },
      { property: "og:title", content: "Black Friday Buzzini Sports — Corra com a Buzzini" },
      {
        property: "og:description",
        content: "Plano trimestral de R$ 150,00 por R$ 99,90. Pagamento no cartão.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://buzzinisports.lovable.app/black-friday" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://buzzinisports.lovable.app/black-friday" }],
  }),
  component: BlackFridayPage,
});

function BlackFridayPage() {
  const trackWhatsAppClick = (placement: string) => {
    sendGTMEvent("whatsapp_click", {
      campaign: "black_friday",
      source: "black_friday",
      plan_name: "Trimestral",
      placement,
      method: "whatsapp",
    });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#090a0b] text-[#f5f2ec]">
      <header className="relative z-10 border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <img
            src={buzziniLogo}
            alt="Buzzini Sports"
            className="h-9 w-auto sm:h-11"
            width="137"
            height="44"
          />
          <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 sm:text-xs">
            <span className="size-2 rounded-full bg-[#f36b2b]" aria-hidden="true" />
            Black Friday
          </span>
        </div>
      </header>

      <main>
        <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden">
          <picture className="absolute inset-0 -z-20">
            <img
              src={heroPhoto}
              sizes="100vw"
              alt=""
              aria-hidden="true"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full min-h-[calc(100svh-5rem)] w-full object-cover object-center"
            />
          </picture>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,9,10,0.97)_0%,rgba(8,9,10,0.88)_48%,rgba(8,9,10,0.32)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#090a0b_0%,transparent_40%)]" />
          <div className="absolute -right-24 top-20 -z-10 size-80 rounded-full bg-[#f36b2b]/15 blur-[100px]" />

          <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-center px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
            <div className="w-full max-w-3xl">
              <p className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#ff8954] sm:text-xs">
                <span className="h-px w-8 bg-[#ff8954]" aria-hidden="true" />
                Buzzini Sports apresenta
              </p>
              <h1 className="mt-6 max-w-[12ch] font-display text-[clamp(3.25rem,12vw,7.8rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-white">
                Black
                <br />
                Friday<span className="text-[#f36b2b]">.</span>
              </h1>
              <p className="mt-6 max-w-xl font-display text-xl font-medium leading-snug text-white/85 sm:mt-8 sm:text-2xl">
                Seu próximo passo na corrida começa com um plano.
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
                Treino com direção, acompanhamento de verdade e uma condição especial no plano
                trimestral.
              </p>

              <div className="mt-8 flex flex-wrap items-end gap-x-5 gap-y-3 sm:mt-10 sm:gap-x-7">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                    De
                  </p>
                  <p className="mt-1 font-display text-xl font-medium text-white/55 line-through decoration-[#f36b2b] decoration-2 sm:text-2xl">
                    R$ 150,00
                  </p>
                </div>
                <span className="mb-2 font-mono text-sm text-[#ff8954]" aria-hidden="true">
                  →
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ff8954]">
                    Por
                  </p>
                  <p className="mt-1 font-display text-4xl font-semibold leading-none tracking-tight text-white sm:text-5xl">
                    R$ 99,90
                  </p>
                </div>
              </div>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-white/65">
                Plano trimestral <span className="px-1 text-[#f36b2b]">/</span> Pagamento no cartão
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsAppClick("hero")}
                className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#f36b2b] px-7 py-4 text-sm font-bold text-[#17100d] shadow-[0_12px_50px_rgba(243,107,43,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff8954] motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#090a0b] sm:mt-9 sm:w-auto sm:min-w-72"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                Tenho interesse na oferta
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <p className="mt-3 text-xs leading-relaxed text-white/55">
                Fale com a equipe no WhatsApp para saber como contratar.
              </p>
            </div>
          </div>

          <a
            href="#sobre-a-assessoria"
            aria-label="Conheça a assessoria Buzzini Sports"
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8954] sm:flex"
          >
            Conheça a assessoria
            <ArrowDown className="size-3.5" aria-hidden="true" />
          </a>
        </section>

        <section
          id="sobre-a-assessoria"
          className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12 lg:py-28"
        >
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#ff8954] sm:text-xs">
              Ritmo com propósito
            </p>
            <h2 className="mt-4 max-w-[15ch] font-display text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              Mais clareza em cada treino.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/65 sm:text-base">
              Na Buzzini, seu plano de corrida é personalizado para seu objetivo e sua rotina, com
              contato com treinador e acesso ao app Runy.
            </p>
          </div>

          <div className="grid content-start gap-3 sm:grid-cols-2 sm:gap-4">
            {[
              "Planilha personalizada",
              "Contato com treinador",
              "Acesso ao app Runy",
              "Estrutura Buzzini no dia da prova",
            ].map((benefit, index) => (
              <div
                key={benefit}
                className="flex min-h-20 items-center gap-4 border-t border-white/15 py-4 sm:min-h-28 sm:px-4"
              >
                <span className="font-mono text-xs text-[#ff8954]">0{index + 1}</span>
                <p className="text-sm font-medium text-white/85 sm:text-base">{benefit}</p>
                <Check className="ml-auto size-4 shrink-0 text-[#ff8954]" aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#111213]">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-[1fr_auto] lg:px-12">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#ff8954] sm:text-xs">
                Black Friday Buzzini
              </p>
              <h2 className="mt-3 max-w-[22ch] font-display text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
                Plano trimestral: de R$ 150,00 por R$ 99,90.
              </h2>
              <p className="mt-3 flex items-center gap-2 text-sm text-white/60">
                <CreditCard className="size-4 text-[#ff8954]" aria-hidden="true" />
                Pagamento no cartão.
              </p>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsAppClick("offer")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#f36b2b]/70 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-[#ff8954] hover:bg-[#f36b2b]/10 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8954] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111213]"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Falar sobre a oferta
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section
          aria-labelledby="faq-title"
          className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12 lg:py-24"
        >
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#ff8954] sm:text-xs">
              Antes de começar
            </p>
            <h2
              id="faq-title"
              className="mt-3 max-w-[12ch] font-display text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl"
            >
              Dúvidas sobre a oferta?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
              Veja o que está informado e confirme com a equipe qualquer condição que não esteja
              detalhada.
            </p>
          </div>

          <div className="divide-y divide-white/15 border-y border-white/15">
            <details className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-white marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff8954] sm:text-base [&::-webkit-details-marker]:hidden">
                <span>Qual é o plano e qual preço estão divulgados?</span>
                <ChevronDown
                  className="size-5 shrink-0 text-[#ff8954] transition-transform group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-2xl pb-5 pr-8 text-sm leading-relaxed text-white/65">
                A página informa o plano trimestral, de R$ 150,00 por R$ 99,90. Não está
                especificado se R$ 99,90 é o valor total ou mensal; confirme esse detalhe com a
                equipe pelo WhatsApp antes de contratar.
              </p>
            </details>

            <details className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-white marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff8954] sm:text-base [&::-webkit-details-marker]:hidden">
                <span>Como é feito o pagamento?</span>
                <ChevronDown
                  className="size-5 shrink-0 text-[#ff8954] transition-transform group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-2xl pb-5 pr-8 text-sm leading-relaxed text-white/65">
                A condição divulgada é pagamento no cartão. Bandeiras aceitas, parcelamento e outros
                detalhes não estão especificados; confirme com a equipe pelo WhatsApp.
              </p>
            </details>

            <details className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-white marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff8954] sm:text-base [&::-webkit-details-marker]:hidden">
                <span>Qual é a duração e quais são as condições da promoção?</span>
                <ChevronDown
                  className="size-5 shrink-0 text-[#ff8954] transition-transform group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-2xl pb-5 pr-8 text-sm leading-relaxed text-white/65">
                A oferta é apresentada para um plano trimestral. O prazo de validade da promoção e
                outras condições não estão informados nesta página; confirme com a equipe pelo
                WhatsApp.
              </p>
            </details>

            <details className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-white marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff8954] sm:text-base [&::-webkit-details-marker]:hidden">
                <span>Como faço para contratar?</span>
                <ChevronDown
                  className="size-5 shrink-0 text-[#ff8954] transition-transform group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-2xl pb-5 pr-8 text-sm leading-relaxed text-white/65">
                Fale com a equipe Buzzini pelo WhatsApp para tirar dúvidas e receber orientação
                sobre a contratação.{" "}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackWhatsAppClick("faq")}
                  className="font-semibold text-[#ff8954] underline decoration-[#ff8954]/50 underline-offset-4 transition-colors hover:text-white motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8954]"
                >
                  Chamar no WhatsApp
                </a>
                .
              </p>
            </details>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <span>Buzzini Sports · Assessoria de corrida</span>
        <span>Oferta do plano trimestral. Pagamento no cartão.</span>
      </footer>
    </div>
  );
}
