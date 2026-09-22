import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import heroShoe from "@/assets/hero-shoe.jpg.asset.json";
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
              active === id ? "bg-primary" : "bg-foreground/25 hover:bg-foreground/50"
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
      className="snap-sec relative flex items-end overflow-hidden bg-background"
    >
      <img
        src={heroShoe.url}
        alt="Corredor em passada sobre asfalto molhado ao amanhecer"
        className="ken-burns absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-background/5" />
      <div className="relative z-10 w-full px-6 pb-14 sm:px-12">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-foreground/90 sm:text-sm">
          Assessoria de corrida · desde 2014
        </p>
        <h1 className="max-w-[20ch] font-display text-5xl font-semibold leading-none text-balance text-foreground sm:text-7xl">
          A primeira passada já está contada.
        </h1>
        <p className="mt-6 max-w-[44ch] font-mono text-sm text-pretty text-foreground/80 sm:text-base">
          Do 5K à maratona, um plano que respira com o seu ritmo. Treinos
          guiados de verdade, semana após semana.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#planos"
            className="rounded-full bg-primary px-5 py-3 font-mono text-sm font-bold text-primary-foreground ring-1 ring-inset ring-primary-soft/40 transition-transform hover:-translate-y-0.5 hover:bg-primary-soft"
          >
            Assinar plano
          </a>
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/70">
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
    card: "bg-card",
    accent: "text-pistao",
  },
  {
    result: "42K",
    detail: "concluída",
    name: "Ricardo Alves",
    city: "Curitiba",
    text: "Chegou no 3:40 após o plano de maratona de 16 semanas.",
    card: "bg-card-high",
    accent: "text-sage",
  },
  {
    result: "21K",
    detail: "estreia",
    name: "Camila Rocha",
    city: "Recife",
    text: "Primeira meia maratona, sem dor e com ritmo constante.",
    card: "bg-card",
    accent: "text-sky",
  },
];

function Stories() {
  return (
    <section
      id="historias"
      className="snap-sec relative flex flex-col justify-center bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
          Histórias de quem terminou
        </p>
        <h2 className="mt-4 max-w-[40ch] font-display text-4xl font-semibold leading-tight text-balance text-foreground sm:text-5xl">
          Progressão que você sente no asfalto.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {STORIES.map((story) => (
            <div
              key={story.name}
              className={`rounded-lg p-6 ring-1 ring-border ${story.card}`}
            >
              <div className="flex items-baseline gap-2">
                <span
                   className="font-display text-5xl font-semibold leading-none text-primary"
                >
                  {story.result}
                </span>
                <span className="font-mono text-sm text-muted">
                  {story.detail}
                </span>
              </div>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-muted">
                {story.name} · {story.city}
              </p>
              <p className="mt-2 font-mono text-sm text-pretty text-foreground/80">
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
      className="snap-sec relative flex flex-col justify-center bg-card"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
          Quem faz o treino acontecer
        </p>
        <h2 className="mt-4 max-w-[40ch] font-display text-4xl font-semibold leading-tight text-balance text-foreground sm:text-5xl">
          A equipe por trás do ritmo.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {COACHES.map((coach) => (
            <div
              key={coach.name}
              className="overflow-hidden rounded-lg bg-background ring-1 ring-border"
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
                <p className="font-display text-xl font-semibold text-foreground">
                  {coach.name}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-primary">
                  {coach.credential}
                </p>
                <p className="mt-2 font-mono text-sm text-pretty text-muted">
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

const LOCATIONS = ["Bebedouro", "São Paulo", "Online"] as const;
type Location = (typeof LOCATIONS)[number];

const PLAN_BENEFITS = {
  Mensal: "Flexibilidade para começar",
  Trimestral: "Tempo para criar consistência",
  Semestral: "Evolução com acompanhamento",
  Anual: "Melhor custo-benefício",
} as const;

const PRICES: Record<Location, { period: keyof typeof PLAN_BENEFITS; price: string; detail: string }[]> = {
  Bebedouro: [
    { period: "Mensal", price: "R$ 129", detail: "por mês" },
    { period: "Trimestral", price: "R$ 349", detail: "3 meses" },
    { period: "Semestral", price: "R$ 649", detail: "6 meses" },
    { period: "Anual", price: "R$ 1.190", detail: "12 meses" },
  ],
  "São Paulo": [
    { period: "Mensal", price: "R$ 169", detail: "por mês" },
    { period: "Trimestral", price: "R$ 459", detail: "3 meses" },
    { period: "Semestral", price: "R$ 849", detail: "6 meses" },
    { period: "Anual", price: "R$ 1.590", detail: "12 meses" },
  ],
  Online: [
    { period: "Mensal", price: "R$ 89", detail: "por mês" },
    { period: "Trimestral", price: "R$ 239", detail: "3 meses" },
    { period: "Semestral", price: "R$ 449", detail: "6 meses" },
    { period: "Anual", price: "R$ 790", detail: "12 meses" },
  ],
};

function Plans() {
  const [location, setLocation] = useState<Location>("Bebedouro");

  return (
    <section
      id="planos"
      className="snap-sec relative flex flex-col justify-center bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
          Planos Buzzini
        </p>
        <h2 className="mt-4 max-w-[40ch] font-display text-4xl font-semibold leading-tight text-balance text-foreground sm:text-5xl">
          Seu treino, no seu ritmo.
        </h2>
        <div className="mt-8 flex w-full border-b border-border" role="tablist" aria-label="Local de treino">
          {LOCATIONS.map((item) => (
            <Button
              key={item}
              type="button"
              role="tab"
              aria-selected={location === item}
              variant="ghost"
              onClick={() => setLocation(item)}
              className={`h-12 flex-1 rounded-none border-b-2 font-mono text-xs uppercase sm:text-sm ${
                location === item
                  ? "border-primary text-primary hover:bg-primary/10 hover:text-primary"
                  : "border-transparent text-muted hover:bg-card-high hover:text-foreground"
              }`}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PRICES[location].map((option, index) => (
            <article
              key={option.period}
              className={`flex min-h-44 flex-col justify-between rounded-lg p-5 ring-1 ${
                index === 3
                  ? "bg-primary text-primary-foreground ring-primary-soft"
                  : "bg-card text-foreground ring-border"
              }`}
            >
              <div>
                <p className={`font-mono text-xs uppercase tracking-[0.12em] ${index === 3 ? "text-primary-foreground/70" : "text-muted"}`}>
                  {option.period}
                </p>
                <p className="mt-4 font-display text-3xl font-semibold leading-none sm:text-4xl">
                  {option.price}
                </p>
                <p className={`mt-3 font-mono text-xs leading-relaxed ${index === 3 ? "text-primary-foreground/80" : "text-foreground/75"}`}>
                  {PLAN_BENEFITS[option.period]}
                </p>
              </div>
              <p className={`mt-6 font-mono text-xs ${index === 3 ? "text-primary-foreground/70" : "text-muted"}`}>
                {option.detail}
              </p>
            </article>
          ))}
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
      className="snap-sec relative flex flex-col justify-center bg-card"
    >
      <div className="mx-auto w-full max-w-4xl px-6 sm:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
          Dúvidas frequentes
        </p>
        <h2 className="mt-4 max-w-[40ch] font-display text-4xl font-semibold leading-tight text-balance text-foreground sm:text-5xl">
          Antes de amarrar o cadarço.
        </h2>
        <div className="mt-10 space-y-3">
          {FAQS.map((faq, index) => (
            <div
              key={faq.question}
               className="overflow-hidden rounded-lg bg-background ring-1 ring-border"
            >
              <details open={index === 0} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5">
                   <span className="font-display text-lg font-medium text-foreground">
                    {faq.question}
                  </span>
                   <span className="font-mono text-xl leading-none text-primary">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">–</span>
                  </span>
                </summary>
                 <p className="px-6 pb-6 font-mono text-sm text-pretty text-muted">
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
      className="snap-sec relative flex flex-col justify-end bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pb-12 sm:px-12">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
             <p className="font-display text-3xl font-semibold text-foreground">
              Passada
            </p>
             <p className="mt-3 max-w-[40ch] font-mono text-sm text-pretty text-muted">
              Assessoria de corrida com foco em ritmo, respiração e progressão
              medível.
            </p>
          </div>
           <div className="flex flex-col gap-3 font-mono text-sm text-foreground/80">
             <p className="text-xs uppercase tracking-[0.15em] text-muted">
              Contato
            </p>
            <p>ola@passada.run</p>
            <p>+55 11 98877-0014</p>
            <div className="mt-2 flex gap-4">
              <a
                href="#"
                 className="transition-colors hover:text-primary"
              >
                Instagram
              </a>
              <a
                href="#"
                 className="transition-colors hover:text-primary"
              >
                Strava
              </a>
              <a
                href="#"
                 className="transition-colors hover:text-primary"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
         <p className="mt-10 border-t border-border pt-5 font-mono text-xs text-muted">
          © 2026 Passada Assessoria · São Paulo · Curitiba · Recife
        </p>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="bg-background">
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
