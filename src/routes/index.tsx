import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroVideo from "@/assets/hero-video.mp4";
import coachMarina from "@/assets/coach-marina.png";
import coachPaulo from "@/assets/coach-paulo.png";
import coachLara from "@/assets/coach-lara.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Passada — Assessoria de Corrida" },
      {
        name: "description",
        content:
          "Assessoria de corrida com planos personalizados do 5K à maratona. São Paulo, Curitiba e Recife — presencial e online.",
      },
      { property: "og:title", content: "Passada — Assessoria de Corrida" },
      {
        property: "og:description",
        content:
          "Planos de treino personalizados, equipe de coaches e acompanhamento de verdade. Do 5K à maratona.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SECTIONS = [
  { id: "inicio", label: "Início" },
  { id: "historias", label: "Histórias" },
  { id: "equipe", label: "Equipe" },
  { id: "planos", label: "Planos" },
  { id: "faq", label: "FAQ" },
  { id: "rodape", label: "Contato" },
];

function Dots() {
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Navegação entre seções"
      className="fixed right-5 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-4"
    >
      {SECTIONS.map(({ id, label }) => (
        <a key={id} href={`#${id}`} title={label} aria-label={label}>
          <span
            className={`block size-2.5 rounded-full transition-colors duration-300 ${
              active === id ? "bg-amber" : "bg-ink/20 hover:bg-ink/40"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="inicio"
      className="snap-sec relative flex items-end overflow-hidden bg-ink"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-ink/0" />
      <div className="relative z-10 w-full px-6 pb-14 sm:px-12">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-cream/90 sm:text-sm">
          Assessoria de corrida · desde 2014
        </p>
        <h1 className="max-w-[20ch] font-display text-5xl font-semibold leading-none text-balance text-cream sm:text-7xl">
          A primeira passada já está contada.
        </h1>
        <p className="mt-6 max-w-[44ch] font-mono text-sm text-pretty text-cream/80 sm:text-base">
          Do 5K à maratona, um plano que respira com o seu ritmo. Treinos
          guiados de verdade, semana após semana.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#planos"
            className="rounded-full bg-amber py-3 pl-5 pr-5 font-mono text-sm font-bold text-ink ring-1 ring-inset ring-amber/40 transition-transform hover:-translate-y-0.5"
          >
            Assinar plano
          </a>
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-cream/70">
            3 cidades · 480 alunos ativos
          </span>
        </div>
      </div>
    </section>
  );
}

const STORIES = [
  {
    result: "5K",
    detail: "em 25min",
    name: "Beatriz Leão",
    city: "São Paulo",
    text: "Primeira prova da vida, depois de 9 semanas de treino guiado.",
    card: "bg-[#F0E7DB]",
    accent: "text-pistao",
  },
  {
    result: "42K",
    detail: "concluída",
    name: "Ricardo Alves",
    city: "Curitiba",
    text: "Chegou no 3:40 após o plano de maratona de 16 semanas.",
    card: "bg-[#E7ECE2]",
    accent: "text-sage",
  },
  {
    result: "21K",
    detail: "estreia",
    name: "Camila Rocha",
    city: "Recife",
    text: "Primeira meia maratona, sem dor e com ritmo constante.",
    card: "bg-[#E2EAEE]",
    accent: "text-sky",
  },
];

function Stories() {
  return (
    <section
      id="historias"
      className="snap-sec relative flex flex-col justify-center bg-cream"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-pistao">
          Histórias de quem terminou
        </p>
        <h2 className="mt-4 max-w-[40ch] font-display text-4xl font-semibold leading-tight text-balance text-ink sm:text-5xl">
          Progressão que você sente no asfalto.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {STORIES.map((story) => (
            <div
              key={story.name}
              className={`rounded-[min(1vw,20px)] p-6 ring-1 ring-black/5 ${story.card}`}
            >
              <div className="flex items-baseline gap-2">
                <span
                  className={`font-display text-5xl font-semibold leading-none ${story.accent}`}
                >
                  {story.result}
                </span>
                <span className="font-mono text-sm text-ink-soft">
                  {story.detail}
                </span>
              </div>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                {story.name} · {story.city}
              </p>
              <p className="mt-2 font-mono text-sm text-pretty text-ink/80">
                {story.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const COACHES = [
  {
    photo: coachMarina,
    name: "Marina Duarte",
    credential: "CREF 12345-G · Master Runner",
    bio: "11 anos de assessoria, foco em iniciantes e ritmo de base.",
  },
  {
    photo: coachPaulo,
    name: "Paulo Serrano",
    credential: "CREF 88213-G · Maratonista",
    bio: "Plano de maratona e progressão de volume sob medida.",
  },
  {
    photo: coachLara,
    name: "Lara Nogueira",
    credential: "CREF 55670-G · Fundiadora",
    bio: "Velocidade e força, do 5K ao 10K com técnica de corrida.",
  },
];

function Team() {
  return (
    <section
      id="equipe"
      className="snap-sec relative flex flex-col justify-center bg-[#EDE6D9]"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-pistao">
          Quem faz o treino acontecer
        </p>
        <h2 className="mt-4 max-w-[40ch] font-display text-4xl font-semibold leading-tight text-balance text-ink sm:text-5xl">
          A equipe por trás do ritmo.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {COACHES.map((coach) => (
            <div
              key={coach.name}
              className="overflow-hidden rounded-[min(1vw,20px)] bg-cream ring-1 ring-black/5"
            >
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src={coach.photo}
                  alt={`Retrato de ${coach.name}`}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="p-5">
                <p className="font-display text-xl font-semibold text-ink">
                  {coach.name}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-pistao">
                  {coach.credential}
                </p>
                <p className="mt-2 font-mono text-sm text-pretty text-ink-soft">
                  {coach.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PLANS = [
  {
    name: "Plano Base",
    price: "R$ 89",
    features: ["Plano de treino mensal", "App de acompanhamento", "Comunidade de alunos"],
    cities: "São Paulo · Curitiba",
    highlight: false,
  },
  {
    name: "Plano Completo",
    price: "R$ 149",
    features: ["Tudo do Base", "2 retornos por mês", "Análise de corrida"],
    cities: "São Paulo · Curitiba · Recife",
    highlight: true,
  },
  {
    name: "Plano Pro",
    price: "R$ 229",
    features: ["Tudo do Completo", "Retornos ilimitados", "Planejamento de prova"],
    cities: "São Paulo · Curitiba · Recife",
    highlight: false,
  },
];

function Plans() {
  return (
    <section
      id="planos"
      className="snap-sec relative flex flex-col justify-center bg-cream"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-pistao">
          Planos mensais
        </p>
        <h2 className="mt-4 max-w-[40ch] font-display text-4xl font-semibold leading-tight text-balance text-ink sm:text-5xl">
          Escolha o ritmo, a cidade e o plano.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {PLANS.map((plan) =>
            plan.highlight ? (
              <div
                key={plan.name}
                className="flex flex-col rounded-[min(1vw,20px)] bg-pistao p-6 ring-1 ring-inset ring-pistao/40"
              >
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-cream/80">
                  {plan.name}
                </p>
                <p className="mt-3 font-display text-4xl font-semibold text-cream">
                  {plan.price}
                  <span className="font-mono text-base font-normal text-cream/70">
                    /mês
                  </span>
                </p>
                <ul className="mt-5 space-y-2 font-mono text-sm text-pretty text-cream/90">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-cream/20 pt-6">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-cream/80">
                    Cidades
                  </p>
                  <p className="mt-1 font-mono text-sm text-cream">
                    {plan.cities}
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={plan.name}
                className="flex flex-col rounded-[min(1vw,20px)] bg-[#F0E7DB] p-6 ring-1 ring-black/5"
              >
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  {plan.name}
                </p>
                <p className="mt-3 font-display text-4xl font-semibold text-ink">
                  {plan.price}
                  <span className="font-mono text-base font-normal text-ink-soft">
                    /mês
                  </span>
                </p>
                <ul className="mt-5 space-y-2 font-mono text-sm text-pretty text-ink/80">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-black/5 pt-6">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    Cidades
                  </p>
                  <p className="mt-1 font-mono text-sm text-ink">
                    {plan.cities}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    question: "Preciso já correr para assinar?",
    answer:
      "Não. Começamos com uma avaliação e um plano de caminhada para os que estão saindo do zero.",
  },
  {
    question: "Como funciona o retorno do treino?",
    answer:
      "Você registra os treinos no app e o treinador ajusta volume e intensidade a cada ciclo.",
  },
  {
    question: "Atendem pessoas fora das três cidades?",
    answer:
      "Sim, o acompanhamento é remoto; a presença local vale para encontros de grupo opcionais.",
  },
];

function Faq() {
  return (
    <section
      id="faq"
      className="snap-sec relative flex flex-col justify-center bg-[#EDE6D9]"
    >
      <div className="mx-auto w-full max-w-4xl px-6 sm:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-pistao">
          Dúvidas frequentes
        </p>
        <h2 className="mt-4 max-w-[40ch] font-display text-4xl font-semibold leading-tight text-balance text-ink sm:text-5xl">
          Antes de amarrar o cadarço.
        </h2>
        <div className="mt-10 space-y-3">
          {FAQS.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-[min(1vw,18px)] bg-cream ring-1 ring-black/5"
            >
              <details open={index === 0} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5">
                  <span className="font-display text-lg font-medium text-ink">
                    {faq.question}
                  </span>
                  <span className="font-mono text-xl leading-none text-ink-soft">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">–</span>
                  </span>
                </summary>
                <p className="px-6 pb-6 font-mono text-sm text-pretty text-ink-soft">
                  {faq.answer}
                </p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <section
      id="rodape"
      className="snap-sec relative flex flex-col justify-end bg-ink"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pb-12 sm:px-12">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="font-display text-3xl font-semibold text-cream">
              Passada
            </p>
            <p className="mt-3 max-w-[40ch] font-mono text-sm text-pretty text-cream/70">
              Assessoria de corrida com foco em ritmo, respiração e progressão
              medível.
            </p>
          </div>
          <div className="flex flex-col gap-3 font-mono text-sm text-cream/80">
            <p className="text-xs uppercase tracking-[0.15em] text-cream/50">
              Contato
            </p>
            <p>ola@passada.run</p>
            <p>+55 11 98877-0014</p>
            <div className="mt-2 flex gap-4">
              <a
                href="#"
                className="transition-colors hover:text-amber"
              >
                Instagram
              </a>
              <a
                href="#"
                className="transition-colors hover:text-amber"
              >
                Strava
              </a>
              <a
                href="#"
                className="transition-colors hover:text-amber"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-cream/10 pt-5 font-mono text-xs text-cream/40">
          © 2026 Passada Assessoria · São Paulo · Curitiba · Recife
        </p>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="bg-cream">
      <Dots />
      <Hero />
      <Stories />
      <Team />
      <Plans />
      <Faq />
      <Footer />
    </main>
  );
}
