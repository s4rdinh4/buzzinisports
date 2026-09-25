/* eslint-disable prettier/prettier */
import { Link, createFileRoute } from "@tanstack/react-router";

import buzziniLogo from "@/assets/logo_buzzini.svg";
import logoBuzziniOutline from "@/assets/logo_buzzini_outline.svg";

const SCHEDULE = [
  {
    day: "Segunda",
    time: "18:30",
    detail: "Treino de corrida + técnica",
  },
  {
    day: "Terça",
    time: "06:15",
    detail: "Fartlek e desenvolvimento de ritmo",
  },
  {
    day: "Quarta",
    time: "18:30",
    detail: "Treino contínuo + desempenho",
  },
  {
    day: "Quinta",
    time: "06:15",
    detail: "Treino de qualidade e recuperação",
  },
  {
    day: "Sexta",
    time: "18:30",
    detail: "Treino de velocidade e potência",
  },
  {
    day: "Sábado",
    time: "08:00",
    detail: "Longa distância / prova",
  },
] as const;

const HIGHLIGHTS = [
  { label: "Presencial", value: "Bebedouro / SP" },
  { label: "Online", value: "Todo o Brasil" },
  { label: "Acompanhamento", value: "Semanal + WhatsApp" },
] as const;

export const Route = createFileRoute("/horarios")({
  head: () => ({
    meta: [
      { title: "Horários Buzzini Sports" },
      {
        name: "description",
        content:
          "Confira os horários da Buzzini Sports e veja como funciona o acompanhamento dos treinos em cada dia da semana.",
      },
    ],
  }),
  component: HorariosPage,
});

function HorariosPage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-[#0a0d12]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-12">
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <img src={buzziniLogo} alt="Buzzini Sports" className="h-10 w-auto sm:h-12" />
          </Link>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_12px_30px_rgba(249,115,22,0.28)] transition-transform hover:-translate-y-0.5 hover:bg-primary/90"
          >
            IR PARA O SITE
          </Link>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(249,115,22,0.16),transparent_24%),radial-gradient(circle_at_80%_72%,rgba(249,115,22,0.08),transparent_28%),linear-gradient(180deg,rgba(9,11,16,0.96),rgba(12,13,18,1))]" />
        <img
          src={logoBuzziniOutline}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[-2rem] top-1/2 hidden h-72 w-auto -translate-y-1/2 opacity-10 md:block lg:right-[-1rem] lg:h-80"
        />

        <section className="relative mx-auto max-w-6xl px-6 py-16 sm:px-12 sm:py-20">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Horários</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-6xl">
              O ritmo certo para <span className="text-primary">você evoluir</span>.
            </h1>
            <p className="mt-5 max-w-[42ch] font-mono text-sm leading-relaxed text-white/75 sm:text-base">
              Treinos com estrutura e acompanhamento para você manter consistência, evoluir com
              segurança e viver cada etapa da sua jornada em ritmo consciente.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.1rem] border border-border/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(17,17,20,0.96),rgba(11,12,15,1))] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                  {item.label}
                </p>
                <p className="mt-3 font-display text-xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-18 sm:px-12 sm:pb-22">
          <div className="rounded-[1.6rem] border border-border/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),rgba(17,17,20,0.96),rgba(9,11,16,1))] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Agenda</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-4xl">
                  Treinos da semana
                </h2>
              </div>
              <div className="hidden rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary sm:block">
                Presencial & Online
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {SCHEDULE.map((item) => (
                <div
                  key={item.day}
                  className="group rounded-[1.15rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(249,115,22,0.12),rgba(9,11,16,0.98),rgba(9,11,16,1))] p-5 transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-2xl font-semibold text-white">{item.day}</p>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
                      {item.time}
                    </span>
                  </div>
                  <p className="mt-4 font-mono text-sm leading-relaxed text-white/75">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-20 sm:px-12 sm:pb-28">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[1.5rem] border border-border/80 bg-[linear-gradient(135deg,rgba(249,115,22,0.14),rgba(17,17,20,0.94),rgba(9,11,16,1))] p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                Como funciona
              </p>
              <h3 className="mt-3 max-w-[18ch] font-display text-3xl font-semibold text-white sm:text-4xl">
                Mais que treino: acompanhamento real.
              </h3>
              <ul className="mt-6 space-y-4 font-mono text-sm leading-relaxed text-white/75">
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    ✓
                  </span>
                  <span>Planejamento individual com foco no seu objetivo, rotina e evolução.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    ✓
                  </span>
                  <span>
                    Suporte direto com a equipe para ajustes e orientações ao longo da semana.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    ✓
                  </span>
                  <span>
                    Estrutura para corrida, performance e consistência em todos os momentos.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-[1.5rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(17,17,20,0.96),rgba(11,12,15,1))] p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Contato</p>
              <div className="mt-5 space-y-4 font-mono text-sm text-white/75">
                <a
                  href="mailto:assessoria@buzzini.com.br"
                  className="block transition-colors hover:text-primary"
                >
                  assessoria@buzzini.com.br
                </a>
                <a
                  href="https://web.whatsapp.com/send?phone=5517988026622&text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Buzzini%20Sports%20e%20quero%20falar%20sobre%20os%20hor%C3%A1rios."
                  target="_blank"
                  rel="noreferrer"
                  className="block transition-colors hover:text-primary"
                >
                  +55 17 98802-6622
                </a>
              </div>
              <Link
                to="/"
                className="mt-8 inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                VOLTAR AO SITE
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
