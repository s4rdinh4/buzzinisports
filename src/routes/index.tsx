/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, MapPin, Menu, Play, Radio, X } from "lucide-react";
import brazilMap from "@svg-maps/brazil";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import buzziniLogo from "@/assets/buzzini-logo.png.asset.json";
import heroVideoMp4 from "@/assets/hero-video.mp4.asset.json";
import heroVideoWebm from "@/assets/hero-video.webm.asset.json";
import coachLara from "@/assets/coach-lara.webp.asset.json";
import fotoLucas from "@/assets/foto_lucas.webp.asset.json";
import fotoRobson from "@/assets/foto_robson.webp.asset.json";
import fotoVinicius from "@/assets/foto_vinicius.webp.asset.json";
import fotoLarissa from "@/assets/foto_larissa.webp.asset.json";
import fotoBeatriz from "@/assets/foto_beatriz.webp.asset.json";
import fotoGeorge from "@/assets/foto_george.webp.asset.json";
import fotoHudson from "@/assets/foto_hudson.webp.asset.json";
import fotoRodrigo from "@/assets/foto_rodrigo.webp.asset.json";
import fotoIgor from "@/assets/foto_igor.webp.asset.json";
import video01 from "@/assets/depoiments/video01.mp4";
import video01Poster from "@/assets/depoiments/video01.jpg";
import video02 from "@/assets/depoiments/video02.mp4";
import video02Poster from "@/assets/depoiments/video02.jpg";
import video03 from "@/assets/depoiments/video03.mp4";
import video03Poster from "@/assets/depoiments/video03.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buzzini Sports — Assessoria de Corrida" },
      {
        name: "description",
        content:
          "Assessoria de corrida com planos personalizados do 5K à maratona. São Paulo, Curitiba e Recife — presencial e online.",
      },
      { property: "og:title", content: "Buzzini Sports— Assessoria de Corrida" },
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

function SiteLogo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDesktopScrolled, setIsDesktopScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      const isDesktopViewport = window.matchMedia("(min-width: 768px)").matches;
      const hasPassedHero = window.scrollY > window.innerHeight * 0.75;
      setIsDesktop(isDesktopViewport);
      setIsDesktopScrolled(hasPassedHero);
      if (isDesktopViewport && !hasPassedHero) setIsMenuOpen(false);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const shouldShowMenu = !isDesktop || isDesktopScrolled;

  return (
    <header
      className={`z-50 transition-none ${
        isDesktopScrolled
          ? "fixed left-6 top-4 sm:left-12 sm:top-6"
          : isDesktop
            ? "absolute left-1/2 top-4 -translate-x-1/2 sm:top-6"
            : "absolute left-6 top-4 sm:left-12 sm:top-6"
      }`}
      onMouseEnter={() => shouldShowMenu && setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
      onFocus={() => shouldShowMenu && setIsMenuOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsMenuOpen(false);
        }
      }}
    >
      <div
        className={`flex items-center rounded-full bg-background/85 p-1.5 shadow-[0_12px_35px_rgba(0,0,0,0.18)] ring-1 ring-border transition-none ${isMenuOpen ? "w-60" : "w-40"} ${isDesktopScrolled ? (isMenuOpen ? "md:w-60" : "md:w-40") : "md:w-auto md:rounded-none md:bg-transparent md:p-0 md:shadow-none md:ring-0"}`}
      >
        <a
          href="#inicio"
          aria-label="Buzzini Sports — início"
          className="block min-w-0 flex-1 transition-none"
        >
          <img
            src={buzziniLogo.url}
            alt="Buzzini Sports"
            className={`w-auto object-contain transition-none ${!isDesktop || isDesktopScrolled ? "translate-x-[22px]" : ""} ${isDesktopScrolled ? "h-8 sm:h-9" : "h-8 sm:h-9 md:h-24"}`}
          />
        </a>
        <button
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
          className={`flex size-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isDesktopScrolled ? "" : "md:hidden"}`}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav
        id="site-navigation"
        aria-label="Navegação principal"
        className={`absolute left-0 top-full mt-2 w-64 rounded-2xl bg-background/95 p-2 shadow-xl ring-1 ring-border transition-all duration-200 ${isMenuOpen && shouldShowMenu ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
      >
        {[
          ["Início", "inicio"],
          ["Histórias", "historias"],
          ["Equipe", "equipe"],
          ["Localidades", "localidades"],
          ["Planos", "planos"],
          ["Dúvidas", "faq"],
        ].map(([label, section]) => (
          <a
            key={section}
            href={`#${section}`}
            onClick={() => setIsMenuOpen(false)}
            className="block rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="snap-sec relative flex items-end overflow-hidden bg-background">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-label="Pessoa correndo ao amanhecer"
      >
        <source src={heroVideoWebm.url} type="video/webm" />
        <source src={heroVideoMp4.url} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-background/5" />
      <div className="relative z-10 w-full px-6 pb-14 sm:px-12">
        <h1 className="max-w-[20ch] font-display text-5xl font-semibold leading-none text-balance text-foreground sm:text-7xl">
          Find Your Motivation!
        </h1>
        <p className="mt-6 max-w-[44ch] font-mono text-sm text-pretty text-foreground/80 sm:text-base">
          Não somos apenas uma assessoria de corrida, somos seu parceiro na jornada de transformar
          desafios em conquistas.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#planos"
            className="rounded-full bg-primary px-5 py-3 font-mono text-sm font-bold text-primary-foreground ring-1 ring-inset ring-primary-soft/40 transition-transform hover:-translate-y-0.5 hover:bg-primary-soft"
          >
            Quero correr
          </a>
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/70">
            Presencial e Online · +400 alunos atendidos
          </span>
        </div>
      </div>
    </section>
  );
}

const DEPOIMENTS = [
  { video: video01, poster: video01Poster },
  { video: video02, poster: video02Poster },
  { video: video03, poster: video03Poster },
];

function DepoimentVideo({ video, poster, index }: (typeof DEPOIMENTS)[number] & { index: number }) {
  const [showControls, setShowControls] = useState(false);

  const startVideo = (element: HTMLVideoElement) => {
    setShowControls(true);
    void element.play();
  };

  return (
    <div className="relative mx-auto w-[90%] cursor-pointer overflow-hidden rounded-2xl bg-card ring-1 ring-border">
      <video
        className="aspect-[9/16] w-full cursor-pointer object-cover"
        controls={showControls}
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={`Depoimento em vídeo da Buzzini Sports ${index + 1}`}
        onClick={(event) => {
          if (!showControls) startVideo(event.currentTarget);
        }}
      >
        <source src={video} type="video/mp4" />
      </video>
      {!showControls && (
        <button
          type="button"
          onClick={(event) => {
            const videoElement = event.currentTarget.previousElementSibling;
            if (videoElement instanceof HTMLVideoElement) startVideo(videoElement);
          }}
          className="absolute inset-0 flex items-center justify-center bg-black/10 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
          aria-label={`Reproduzir depoimento ${index + 1}`}
        >
          <span className="flex size-14 items-center justify-center rounded-full bg-primary shadow-lg">
            <Play aria-hidden="true" className="ml-1 size-6 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}

function Stories() {
  return (
    <section
      id="historias"
      className="snap-sec relative flex flex-col justify-start bg-background py-16 sm:justify-center sm:py-0"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
          Buzzini em ação
        </p>
        <h2 className="mt-3 max-w-[40ch] font-display text-3xl font-semibold leading-tight text-balance text-foreground sm:mt-4 sm:text-5xl">
          Histórias que ganham movimento.
        </h2>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
          {DEPOIMENTS.map((depoiment, index) => (
            <DepoimentVideo key={depoiment.video} {...depoiment} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const COACHES = [
  {
    photo: fotoLucas.url,
    name: "Lucas Buzzini",
    credential: "Diretor · Maratonista",
    bio: "Formado em Fisioterapia, idealizador do projeto e apaixonado por corrida.",
  },
  {
    photo: fotoRobson.url,
    name: "Robson Botelho",
    credential: "Treinador · Maratonista",
    bio: "Especializado em treinamento de alta performances.",
  },
  {
    photo: fotoRodrigo.url,
    name: "Rodrigo Brito",
    credential: "Treinador · Maratonista",
    bio: "Treinador de corrida, responsável técnico pela Buzzini São Paulo.",
  },
  {
    photo: coachLara.url,
    name: "Nara de Lucena",
    credential: "Treinadora · Corrida",
    bio: "Velocidade e força, do 5K ao 10K com técnica de corrida.",
  },
  {
    photo: fotoVinicius.url,
    name: "Vinicius Silva",
    credential: "Treinador Auxiliar · Fisioterapeuta",
    bio: "Formado em fisioterapia, especializado em reabilitação e prevenção de lesões.",
  },
  {
    photo: fotoBeatriz.url,
    name: "Beatriz Padovan",
    credential: "Treinadora Auxiliar · Educação Física",
    bio: "Treinadora de corrida, como foco principal no desenvolvimento de atletas iniciantes e intermediários.",
  },
  {
    photo: fotoHudson.url,
    name: "Hudson Morais",
    credential: "Treinador Auxiliar · Educação Física",
    bio: "Treinador de corrida, responsável técnico pela Buzzini Ribeirão Preto.",
  },
  {
    photo: fotoGeorge.url,
    name: "George Almeida",
    credential: "Treinador Auxiliar · Educação Física",
    bio: "Treinador de corrida, com foco em desenvolvimento de atletas iniciantes.",
  },
  {
    photo: fotoIgor.url,
    name: "Igor Sardinha",
    credential: "Tech · Desenvolvedor",
    bio: "Responsável pelo sistema de acompanhamento de treinos e evolução dos alunos.",
  },
  {
    photo: fotoLarissa.url,
    name: "Larissa Paredes",
    credential: "Marketing · Designer",
    bio: "Responsável pela comunicação visual e marketing da Buzzini Sports.",
  },
];

function Team() {
  const [page, setPage] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const pageSize = isMobile ? 1 : 3;
  const pageCount = Math.ceil(COACHES.length / pageSize);
  const visibleCoaches = COACHES.slice(page * pageSize, (page + 1) * pageSize);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;

    if (startX === null || endX === undefined) return;

    const distance = endX - startX;
    if (Math.abs(distance) < 48) return;

    setPage((currentPage) =>
      Math.max(0, Math.min(pageCount - 1, currentPage + (distance < 0 ? 1 : -1))),
    );
  };

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, pageCount - 1));
  }, [pageCount]);

  return (
    <section
      id="equipe"
      className="snap-sec relative flex flex-col justify-center bg-card py-12 sm:py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              Quem faz o treino acontecer
            </p>
            <h2 className="mt-3 max-w-[40ch] font-display text-3xl font-semibold leading-tight text-balance text-foreground sm:mt-4 sm:text-5xl">
              A equipe por trás do ritmo.
            </h2>
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setPage((currentPage) => currentPage - 1)}
              disabled={page === 0}
              aria-label="Página anterior da equipe"
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setPage((currentPage) => currentPage + 1)}
              disabled={page === pageCount - 1}
              aria-label="Próxima página da equipe"
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:mt-9 sm:grid-cols-3 sm:gap-5">
          {visibleCoaches.map((coach) => (
            <div
              key={coach.name}
              className="touch-pan-y overflow-hidden rounded-lg bg-background ring-1 ring-border"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="aspect-[40/27] w-full overflow-hidden sm:aspect-[8/9]">
                <img
                  src={coach.photo}
                  alt={`Retrato de ${coach.name}`}
                  width={512}
                  height={512}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="p-4 sm:p-5">
                <p className="font-display text-lg font-semibold text-foreground sm:text-xl">
                  {coach.name}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary sm:text-xs">
                  {coach.credential}
                </p>
                <p className="mt-2 font-mono text-xs text-pretty text-muted sm:text-sm">
                  {coach.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between sm:justify-center">
          <div className="flex gap-2" role="tablist" aria-label="Páginas da equipe">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={page === index}
                aria-label={`Ir para página ${index + 1} da equipe`}
                onClick={() => setPage(index)}
                className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
                  page === index ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/60"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2 sm:hidden">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setPage((currentPage) => currentPage - 1)}
              disabled={page === 0}
              aria-label="Página anterior da equipe"
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setPage((currentPage) => currentPage + 1)}
              disabled={page === pageCount - 1}
              aria-label="Próxima página da equipe"
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const LOCATIONS_INFO = [
  {
    name: "Bebedouro",
    state: "São Paulo",
    detail: "Treinos presenciais e encontros de performance.",
  },
  {
    name: "Ribeirão Preto",
    state: "São Paulo",
    detail: "Treinos presenciais e acompanhamento próximo.",
  },
  {
    name: "São Paulo",
    state: "Capital",
    detail: "Treinos presenciais, e experiência personalizada para cada aluno.",
  },
] as const;

function Locations() {
  return (
    <section
      id="localidades"
      className="snap-sec relative flex flex-col justify-center overflow-hidden bg-card"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-6 py-14 sm:px-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="relative order-2 mx-auto w-full max-w-xl lg:order-1">
          <svg
            viewBox="285 275 310 285"
            role="img"
            aria-label="Mapa ampliado da região Sudeste com Bebedouro, Ribeirão Preto e São Paulo destacadas"
            className="relative mx-auto block h-auto max-h-[52svh] w-full overflow-hidden"
          >
            {brazilMap.locations
              .filter((state: { id: string }) => ["sp", "mg", "rj", "es"].includes(state.id))
              .map((state: { id: string; path: string }) => (
                <path
                  key={state.id}
                  d={state.path}
                  className={
                    state.id === "sp"
                      ? "fill-primary/20 stroke-primary"
                      : "fill-background stroke-border"
                  }
                  strokeWidth={state.id === "sp" ? 2.5 : 1.5}
                  strokeLinejoin="round"
                />
              ))}
            {[
              { x: 398, y: 415, number: "1", label: "BEBEDOURO" },
              { x: 409, y: 419, number: "2", label: "RIBEIRÃO PRETO" },
              { x: 427, y: 459, number: "3", label: "SÃO PAULO" },
            ].map((point) => (
              <g key={point.label}>
                <circle cx={point.x} cy={point.y} r="11" className="fill-primary/20" />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="7"
                  className="fill-primary stroke-background"
                  strokeWidth="2"
                />
                <text
                  x={point.x}
                  y={point.y + 4}
                  textAnchor="middle"
                  className="fill-primary-foreground font-mono text-[7px] font-bold"
                >
                  {point.number}
                </text>
              </g>
            ))}
          </svg>
          <div className="relative z-10 mx-auto mt-6 flex w-fit flex-wrap justify-center gap-x-5 gap-y-2 rounded-full bg-background px-5 py-3 font-mono text-[10px] uppercase text-muted ring-1 ring-border">
            <span>
              <b className="text-primary">1</b> Bebedouro
            </span>
            <span>
              <b className="text-primary">2</b> Ribeirão Preto
            </span>
            <span>
              <b className="text-primary">3</b> São Paulo
            </span>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary"></p>
          <h2 className="mt-4 max-w-[14ch] font-display text-4xl font-semibold leading-tight text-balance text-foreground sm:text-5xl">
            Perto de você. Em todo o Brasil.
          </h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {LOCATIONS_INFO.map((item) => (
              <div key={item.name} className="flex gap-4 py-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <MapPin aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <p className="font-display text-xl font-semibold text-foreground">{item.name}</p>
                  <p className="mt-1 font-mono text-xs uppercase text-primary">{item.state}</p>
                  <p className="mt-2 font-mono text-sm text-muted">{item.detail}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-4 py-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background text-primary ring-1 ring-border">
                <Radio aria-hidden="true" className="size-5" />
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-foreground">Online</p>
                <p className="mt-1 font-mono text-xs uppercase text-primary">Todo o Brasil</p>
                <p className="mt-2 font-mono text-sm text-muted">
                  Planilha personalizada e acompanhamento onde você estiver.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const LOCATIONS = ["Outras cidades", "São Paulo", "Online"] as const;
type Location = (typeof LOCATIONS)[number];

const PLAN_BENEFITS = {
  Mensal: {
    included: ["Treino personalizado", "Ajustes mensais", "Sem fidelidade"],
    excluded: ["Treinos presenciais"],
  },
  Trimestral: {
    included: ["Treino personalizado", "Ajustes mensais", "Mais consistência"],
    excluded: ["Treinos presenciais"],
  },
  Semestral: {
    included: ["Treino personalizado", "Ajustes mensais", "Evolução acompanhada"],
    excluded: ["Treinos presenciais"],
  },
  Anual: {
    included: ["Treino personalizado", "Ajustes mensais", "Melhor custo-benefício"],
    excluded: ["Treinos presenciais"],
  },
} as const;

const PRICES: Record<
  Location,
  { period: keyof typeof PLAN_BENEFITS; price: string; detail: string }[]
> = {
  "Outras cidades": [
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
  const [location, setLocation] = useState<Location>("Outras cidades");

  return (
    <section
      id="planos"
      className="snap-sec relative flex flex-col justify-start bg-background py-16 sm:justify-center sm:py-0"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Planos Buzzini</p>
        <h2 className="mt-3 max-w-[40ch] font-display text-3xl font-semibold leading-tight text-balance text-foreground sm:mt-4 sm:text-5xl">
          Seu treino, no seu ritmo.
        </h2>
        <div
          className="mt-6 flex w-full gap-1 rounded-full bg-card-high p-1 ring-1 ring-border sm:mt-8"
          role="tablist"
          aria-label="Local de treino"
        >
          {LOCATIONS.map((item) => (
            <Button
              key={item}
              type="button"
              role="tab"
              aria-selected={location === item}
              variant="ghost"
              onClick={() => setLocation(item)}
              className={`h-11 flex-1 rounded-full font-mono text-xs uppercase sm:text-sm ${
                location === item
                  ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary-soft hover:text-primary-foreground"
                  : "text-muted hover:bg-background/60 hover:text-foreground"
              }`}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-4">
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
                <p
                  className={`font-mono text-xs uppercase tracking-[0.12em] ${index === 3 ? "text-primary-foreground/70" : "text-muted"}`}
                >
                  {option.period}
                </p>
                <p className="mt-4 font-display text-3xl font-semibold leading-none sm:text-4xl">
                  {option.price}
                </p>
                <ul
                  className={`mt-4 space-y-2 font-mono text-[11px] leading-relaxed ${index === 3 ? "text-primary-foreground/80" : "text-foreground/75"}`}
                >
                  {PLAN_BENEFITS[option.period].included.map((benefit) => (
                    <li key={benefit} className="flex gap-2">
                      <span
                        aria-hidden="true"
                        className={index === 3 ? "text-primary-foreground" : "text-primary"}
                      >
                        ✓
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                  {PLAN_BENEFITS[option.period].excluded.map((benefit) => (
                    <li key={benefit} className="flex gap-2 text-muted line-through">
                      <span aria-hidden="true" className="text-muted no-underline">
                        ×
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p
                className={`mt-6 font-mono text-xs ${index === 3 ? "text-primary-foreground/70" : "text-muted"}`}
              >
                {option.detail}
              </p>
              <Button
                asChild
                variant="ghost"
                className={`mt-5 h-10 w-full rounded-full px-3 font-mono text-xs uppercase ${
                  index === 3
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:text-primary"
                    : "bg-transparent text-foreground ring-1 ring-border hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                <a
                  href={`mailto:ola@passada.run?subject=${encodeURIComponent(`Interesse no plano ${option.period} - ${location}`)}`}
                  aria-label={`Quero o plano ${option.period} de ${location}`}
                >
                  Quero este plano
                </a>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    question: "Preciso ser corredor experiente para entrar na assessoria?",
    answer:
      "Não! A assessoria é para todos os níveis, desde quem está começando do zero até quem já corre e quer melhorar seus tempos. Os treinos são planejados de acordo com seu nível, objetivo e rotina.",
  },
  {
    question: "E se eu não conseguir acompanhar os treinos?",
    answer:
      "Você não precisa acompanhar o ritmo de ninguém. O treinamento é individualizado e ajustado à sua realidade, respeitando seu momento, sua capacidade e sua evolução.",
  },
  {
    question: "Quantos dias por semana preciso treinar?",
    answer:
      "Depende do seu objetivo e da sua disponibilidade. O planejamento é adaptado à sua rotina, podendo ser estruturado para quem corre 2, 3, 4 ou mais vezes por semana.",
  },
  {
    question: "Como vou saber qual ritmo devo fazer em cada treino?",
    answer:
      "Você não precisa ficar chutando o ritmo. Os treinos são prescritos com referências de ritmo, esforço e/ou frequência cardíaca, para que você saiba exatamente como executar cada sessão.",
  },
  {
    question: "A assessoria serve para quem quer correr uma prova específica?",
    answer:
      "Sim! O planejamento pode ser direcionado para uma meta específica, como completar seus primeiros 5 km, melhorar o tempo nos 10 km, buscar um RP na meia maratona ou se preparar para uma maratona.",
  },
  {
    question: "Vou ter acompanhamento mesmo treinando sozinho?",
    answer:
      "Sim! Mesmo treinando sozinho, você conta com acompanhamento da equipe durante todo o processo. Você recebe seu planejamento, pode tirar dúvidas e acompanha sua evolução ao longo das semanas.",
  },
];

function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="snap-sec relative flex flex-col justify-center bg-card py-12 sm:py-16"
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
              <details open={openFaq === index} className="group">
                <summary
                  onClick={(event) => {
                    event.preventDefault();
                    setOpenFaq((currentFaq) => (currentFaq === index ? null : index));
                  }}
                  className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5"
                >
                  <span className="font-display text-lg font-medium text-foreground">
                    {faq.question}
                  </span>
                  <span className="font-mono text-xl leading-none text-primary">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">–</span>
                  </span>
                </summary>
                <p className="px-6 pb-6 font-mono text-sm text-pretty text-muted">{faq.answer}</p>
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
    <footer id="rodape" className="relative snap-start bg-background py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="font-display text-3xl font-semibold text-foreground">Buzzini Sports</p>
            <p className="mt-3 max-w-[40ch] font-mono text-sm text-pretty text-muted">
              Combinamos conhecimento técnico com uma abordagem inovadora para criar treinos
              personalizados que realmente fazem a diferença. Desenhamos planos que são tão únicos
              quanto você, ajustados para quebrar limites.
            </p>
          </div>
          <div className="flex flex-col gap-3 font-mono text-sm text-foreground/80">
            <p className="text-xs uppercase tracking-[0.15em] text-muted">Contato</p>
            <p>assessoria@buzzini.com.br</p>
            <p>+55 17 98802-6622</p>
            <div className="mt-2 flex gap-4">
              <a
                href="https://www.instagram.com/buzzinisports/"
                className="transition-colors hover:text-primary"
              >
                Instagram
              </a>
              <a
                href="https://www.strava.com/clubs/buzzini"
                className="transition-colors hover:text-primary"
              >
                Strava
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                YouTube
              </a>
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-border pt-5 font-mono text-xs text-muted">
          © 2026 Buzzini Sports · Bebedouro · Ribeirão Preto · São Paulo
        </p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-background">
      <SiteLogo />
      <Hero />
      <Stories />
      <Team />
      <Locations />
      <Plans />
      <Faq />
      <Footer />
    </main>
  );
}
