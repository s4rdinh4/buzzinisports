/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import {
  ArrowDown,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Play,
  Radio,
  Route as RouteIcon,
  UserRoundCheck,
  Watch,
  X,
} from "lucide-react";
import brazilMap from "@svg-maps/brazil";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import buzziniLogo from "@/assets/buzzini-logo.png.asset.json";
import fundoBuzzini from "@/assets/fundo_buzzini.jpeg";
import fundoSite from "@/assets/fundo_site.jpeg";
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
import whatsappIcon from "@/assets/whatsapp.webp";
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
          "Combinamos conhecimento técnico com uma abordagem inovadora para criar treinos personalizados que realmente fazem a diferença. Desenhamos planos que são tão únicos quanto você, ajustados para quebrar limites.",
      },
      { property: "og:title", content: "Buzzini Sports — Assessoria de Corrida" },
      {
        property: "og:description",
        content:
          "Combinamos conhecimento técnico com uma abordagem inovadora para criar treinos personalizados que realmente fazem a diferença. Desenhamos planos que são tão únicos quanto você, ajustados para quebrar limites.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function StravaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      role="img"
      focusable="false"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
      <path d="M 8.6935,9.972 7.649,7.914 l -1.5325,0 2.577,5.086 2.575,-5.086 -1.533,0 m -3.504,-2.7995 1.418,2.799 2.086,0 L 6.2315,1 l -3.5,6.914 2.0845,0" />
    </svg>
  );
}

function SiteLogo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDesktopScrolled, setIsDesktopScrolled] = useState(false);
  const [isMobileHeaderPill, setIsMobileHeaderPill] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      const isDesktopViewport = window.matchMedia("(min-width: 768px)").matches;
      const hasPassedHero = window.scrollY > window.innerHeight * 0.75;
      const hasScrolledForMobilePill = window.scrollY > 48;
      setIsDesktop(isDesktopViewport);
      setIsDesktopScrolled(hasPassedHero);
      setIsMobileHeaderPill(hasScrolledForMobilePill);

      if (isDesktopViewport && !hasPassedHero) setIsMenuOpen(false);
      if (!isDesktopViewport && !hasScrolledForMobilePill) setIsMenuOpen(false);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const isCompactHeader = isDesktopScrolled || (!isDesktop && isMobileHeaderPill);
  const shouldShowMenu = isDesktop ? isDesktopScrolled : isMobileHeaderPill;
  const isMobileMenuFullscreen = !isDesktop && isMenuOpen;
  const menuItems = [
    { label: "COMO FUNCIONA", href: "#como-funciona", isPrimary: false, isDisabled: false },
    { label: "LOCAIS", href: "#localidades", isPrimary: false, isDisabled: false },
    { label: "HORÁRIOS", href: "#horarios", isPrimary: false, isDisabled: true },
    { label: "PLANOS", href: "#planos", isPrimary: true, isDisabled: false },
  ] as const;

  useEffect(() => {
    document.body.style.overflow = !isDesktop && isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDesktop, isMenuOpen]);

  return (
    <header
      className={`snap-intro z-50 transition-none ${
        isMobileMenuFullscreen
          ? "fixed inset-0 bg-background/95 px-4 pb-12 pt-4 backdrop-blur-sm"
          : isCompactHeader
            ? "fixed left-6 top-4 sm:left-12 sm:top-6"
            : isDesktop
              ? "absolute left-1/2 top-4 -translate-x-1/2 sm:top-6"
              : "absolute left-1/2 top-4 -translate-x-1/2 sm:top-6"
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
        className={`flex items-center gap-2 transition-none ${
          isMobileMenuFullscreen
            ? "relative w-full"
            : isCompactHeader
              ? "rounded-full bg-background/85 p-1.5 shadow-[0_12px_35px_rgba(0,0,0,0.18)] ring-1 ring-border"
              : "rounded-none bg-transparent p-0 shadow-none ring-0"
        } ${isMenuOpen && isCompactHeader ? "w-60" : "w-auto"} ${isCompactHeader ? "sm:w-40" : "sm:w-auto"}`}
      >
        <a
          href="#inicio"
          aria-label="Buzzini Sports — início"
          className={`block min-w-0 flex-1 transition-none ${isMobileMenuFullscreen ? "pl-0" : "pl-2"}`}
        >
          <img
            src={buzziniLogo.url}
            alt="Buzzini Sports"
            className={`w-auto object-contain transition-none ${isCompactHeader && isDesktop ? "translate-x-[22px]" : ""} ${
              isMobileMenuFullscreen
                ? "h-11 sm:h-12"
                : isCompactHeader
                  ? "h-9 sm:h-10"
                  : !isDesktop
                    ? "h-12 sm:h-16"
                    : "h-10 sm:h-12 md:h-24"
            }`}
          />
        </a>
        <button
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
          className={`ml-auto flex shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            isMobileMenuFullscreen ? "size-10" : "size-9"
          } ${shouldShowMenu ? "visible" : "hidden"} ${isCompactHeader ? "" : "md:hidden"}`}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav
        id="site-navigation"
        aria-label="Navegação principal"
        className={
          isMobileMenuFullscreen
            ? "mt-16 flex h-[calc(100%-4rem)] flex-col items-center justify-center gap-4 text-center"
            : `absolute left-0 top-full mt-2 w-72 rounded-2xl bg-background/95 p-2 shadow-xl ring-1 ring-border transition-all duration-300 ${isMenuOpen && shouldShowMenu ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`
        }
      >
        {menuItems.map((item, index) => {
          const shouldReveal = isMobileMenuFullscreen || (isMenuOpen && shouldShowMenu);
          const sharedClasses = isMobileMenuFullscreen
            ? "block w-full max-w-xs rounded-full border px-5 py-4 font-mono text-sm uppercase tracking-[0.18em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            : "block rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

          if (item.isDisabled) {
            return (
              <span
                key={item.label}
                className={`${sharedClasses} cursor-not-allowed border-border/80 bg-card/70 text-muted/70 ${
                  isMobileMenuFullscreen ? "translate-y-3 opacity-0" : "-translate-y-1 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 120}ms`,
                  opacity: shouldReveal ? 1 : 0,
                  transform: shouldReveal ? "translateY(0)" : undefined,
                }}
              >
                {item.label}
              </span>
            );
          }

          const itemClasses = item.isPrimary
            ? isMobileMenuFullscreen
              ? "border-primary bg-primary text-primary-foreground shadow-[0_18px_45px_rgba(249,115,22,0.28)] hover:bg-primary-soft hover:text-primary-foreground"
              : "border-primary bg-primary text-primary-foreground shadow-[0_12px_28px_rgba(249,115,22,0.2)] hover:bg-primary-soft"
            : isMobileMenuFullscreen
              ? "border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground"
              : "border-transparent bg-transparent text-muted hover:bg-primary hover:text-primary-foreground";

          return (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`${sharedClasses} ${itemClasses} ${
                isMobileMenuFullscreen ? "translate-y-3 opacity-0" : "-translate-y-1 opacity-0"
              } ${isMobileMenuFullscreen || (isMenuOpen && shouldShowMenu) ? "visible" : "hidden"}`}
              style={{
                transitionDelay: `${index * 120}ms`,
                opacity: shouldReveal ? 1 : 0,
                transform: shouldReveal ? "translateY(0)" : undefined,
              }}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="inicio"
      className="snap-intro snap-sec relative flex items-end overflow-hidden bg-background"
    >
      <img
        src={fundoBuzzini}
        alt="Pessoa correndo ao amanhecer"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/15" />
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

function OpeningMessage() {
  return (
    <section className="snap-intro snap-sec flex min-h-[60vh] items-center bg-background py-14 sm:py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center sm:px-12">
        <p className="max-w-[24ch] font-display text-2xl font-semibold leading-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
          Não importa sua idade, seu ritmo ou
          <span className="mt-2 block">
            <span className="relative inline-block rounded-[0.18em] bg-primary/15 px-[0.12em] pb-[0.05em] text-primary">
              onde você está começando
            </span>
            .
          </span>
        </p>
        <p className="max-w-[30ch] font-display text-2xl font-semibold leading-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
          Não importa se você ainda acredita que
          <span className="mt-2 block">
            <span className="relative inline-block rounded-[0.18em] bg-primary/15 px-[0.12em] pb-[0.05em] text-primary">
              corrida{" "}
            </span>{" "}
            não é pra você.
          </span>
        </p>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section
      aria-label="Manifesto Buzzini Sports"
      className="snap-intro snap-sec relative flex min-h-[100svh] items-center overflow-hidden bg-card"
    >
      <img
        src={buzziniLogo.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 w-[30rem] max-w-[82vw] -translate-y-1/2 opacity-[0.07] sm:-left-20 sm:w-[44rem]"
      />
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col items-center justify-center px-6 py-24 text-center sm:px-12">
        <p className="max-w-[20ch] font-display text-3xl font-semibold leading-[1.12] text-balance text-foreground sm:text-5xl lg:text-6xl">
          Não treinamos
          <span className="relative mx-[0.12em] inline-block rounded-[0.18em] bg-primary/15 px-[0.12em] pb-[0.05em] text-primary">
            pessoas
          </span>
          <span className="block">só para correr mais rápido.</span>
        </p>
        <p className="mt-6 max-w-[52ch] font-mono text-sm leading-relaxed text-pretty text-muted sm:mt-8 sm:text-base lg:text-lg">
          Treinamos pessoas para desenvolver
          <span className="font-bold text-foreground"> disciplina, autonomia e saúde </span>
          através da corrida.
        </p>
        <a
          href="#como-funciona"
          aria-label="Ir para Como funciona"
          className="group mt-10 flex size-12 items-center justify-center self-center rounded-full border border-primary text-primary transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-card sm:mt-12 sm:size-14"
        >
          <ArrowDown
            aria-hidden="true"
            className="size-5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 sm:size-5"
          />
        </a>
      </div>
    </section>
  );
}

const DEPOIMENTS = [
  {
    video: video01,
    poster: video01Poster,
    description: "Estrutura, disciplina e apoio para seguir evoluindo mesmo com a rotina pesada.",
  },
  {
    video: video02,
    poster: video02Poster,
    description: "Treinos pensados para o seu momento e para o resultado que você quer alcançar.",
  },
  {
    video: video03,
    poster: video03Poster,
    description:
      "Acompanhamento real, planejamento individual e evolução que faz diferença no dia a dia.",
  },
] as const;

function DepoimentVideo({
  video,
  poster,
  index,
  description,
}: (typeof DEPOIMENTS)[number] & { index: number }) {
  const [showControls, setShowControls] = useState(false);

  const startVideo = (element: HTMLVideoElement) => {
    setShowControls(true);
    void element.play();
  };

  return (
    <div className="flex w-full flex-col justify-center sm:mx-0">
      <div className="relative mx-auto w-[72%] cursor-pointer overflow-hidden rounded-2xl bg-card ring-1 ring-border max-sm:w-full">
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

      <div className="mx-auto mt-3 w-[72%] text-left max-sm:w-full">
        <p className="font-mono text-[10px] leading-relaxed text-muted sm:text-xs">{description}</p>
      </div>
    </div>
  );
}

function Stories() {
  const [page, setPage] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const pageCount = DEPOIMENTS.length;

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
      id="historias"
      className="relative mb-0 flex flex-col justify-start bg-background pt-14 pb-24 sm:mb-12 sm:justify-center sm:pt-20 sm:pb-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
          Buzzini em ação
        </p>
        <h2 className="mt-3 max-w-[40ch] font-display text-3xl font-semibold leading-tight text-balance text-foreground sm:mt-4 sm:text-5xl">
          Histórias que ganham movimento.
        </h2>

        {isMobile ? (
          <div
            className="mt-8 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex gap-4 transition-transform duration-300 ease-out"
              style={{ transform: `translateX(calc(-${page} * (82% + 1rem)))` }}
            >
              {DEPOIMENTS.map((depoiment, index) => (
                <div key={depoiment.video} className="w-[82%] min-w-[82%]">
                  <DepoimentVideo {...depoiment} index={index} />
                </div>
              ))}
            </div>
            <div
              className="mt-6 flex items-center justify-center gap-2"
              role="tablist"
              aria-label="Páginas de histórias"
            >
              {DEPOIMENTS.map((depoiment, index) => (
                <button
                  key={depoiment.video}
                  type="button"
                  role="tab"
                  aria-selected={page === index}
                  aria-label={`Ir para vídeo ${index + 1}`}
                  onClick={() => setPage(index)}
                  className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
                    page === index ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/60"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
            {DEPOIMENTS.map((depoiment, index) => (
              <DepoimentVideo key={depoiment.video} {...depoiment} index={index} />
            ))}
          </div>
        )}
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
    <section id="equipe" className="relative flex flex-col justify-center bg-card py-8 sm:py-12">
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
        <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-3 sm:gap-4">
          {visibleCoaches.map((coach) => (
            <div
              key={coach.name}
              className="touch-pan-y flex h-full flex-col overflow-hidden rounded-lg bg-background ring-1 ring-border"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="aspect-[5/4] w-full overflow-hidden sm:aspect-[5/4]">
                <img
                  src={coach.photo}
                  alt={`Retrato de ${coach.name}`}
                  width={512}
                  height={512}
                  loading="lazy"
                  className="h-full w-full scale-[1.02] object-cover object-top"
                />
              </div>
              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <p className="font-display text-base font-semibold text-foreground sm:text-lg">
                  {coach.name}
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-primary sm:text-[10px]">
                  {coach.credential}
                </p>
                <p className="mt-2 font-mono text-[10px] leading-relaxed text-pretty text-muted sm:text-xs">
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

const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Você define sua realidade",
    subtitle: "Sua rotina que manda, ajuste conforme seu tempo.",
    icon: CalendarClock,
    layout: "col-span-1 sm:col-span-7 sm:row-span-2",
    titleSize: "text-lg sm:text-3xl",
  },
  {
    number: "02",
    title: "Acesso ao App Runy",
    subtitle: "Possibilidade de sincronizar com seu relógio GPS.",
    icon: Watch,
    layout: "col-span-1 sm:col-span-5",
    titleSize: "text-lg sm:text-2xl",
  },
  {
    number: "03",
    title: "Seu treinador próximo a você",
    subtitle: "Um treinador que acompanha sua evolução.",
    icon: UserRoundCheck,
    layout: "col-span-1 sm:col-span-5",
    titleSize: "text-lg sm:text-2xl",
  },
  {
    number: "04",
    title: "Metodologia Exclusiva",
    subtitle: "Um plano criado para você ir mais longe.",
    icon: RouteIcon,
    layout: "col-span-1 sm:col-span-12",
    titleSize: "text-lg sm:text-2xl",
  },
] as const;

function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="snap-intro snap-sec relative flex flex-col justify-center overflow-hidden bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-12 sm:py-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary sm:text-xs">
              Como funciona
            </p>
            <h2 className="mt-2 max-w-[18ch] font-display text-3xl font-semibold leading-none text-balance text-foreground sm:mt-3 sm:text-5xl">
              Seu treino, no seu ritmo.
            </h2>
          </div>
          <p className="hidden max-w-[34ch] font-mono text-xs leading-relaxed text-muted md:block">
            Planejamento individual, tecnologia e acompanhamento para transformar constância em
            evolução.
          </p>
        </div>

        <div className="mt-5 grid auto-rows-fr grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-12 sm:grid-rows-3 sm:gap-4">
          {HOW_IT_WORKS.map((item, index) => {
            const Icon = item.icon;
            const isPrimary = index === 0;

            return (
              <article
                key={item.number}
                className={`group relative flex min-h-[12rem] flex-col justify-between overflow-hidden rounded-lg border p-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-transform duration-200 ease-out hover:-translate-y-0.5 sm:min-h-0 sm:p-4 ${
                  isPrimary
                    ? "border-orange-400/40 bg-[linear-gradient(135deg,#ff9a3d_0%,#f97316_32%,#d65a0c_58%,#2d1206_100%)] text-white shadow-[0_18px_38px_rgba(249,115,22,0.18)]"
                    : "border-border/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),rgba(17,24,39,0.96),rgba(2,6,23,1))] text-foreground"
                } ${item.layout}`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_35%)]" />
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <span
                    className={`font-mono text-[9px] font-bold tracking-[0.16em] ${
                      isPrimary ? "text-white/75" : "text-slate-300"
                    }`}
                  >
                    {item.number}
                  </span>
                  <span
                    className={`flex size-8 items-center justify-center rounded-full border ${
                      isPrimary
                        ? "border-white/20 bg-white/10 text-white"
                        : "border-border/60 bg-slate-800/70 text-slate-100"
                    }`}
                  >
                    <Icon aria-hidden="true" className="size-4 sm:size-5" strokeWidth={1.75} />
                  </span>
                </div>
                <div className="relative z-10 mt-3 sm:mt-5">
                  <h3
                    className={`font-display leading-[0.98] tracking-[-0.03em] text-balance ${item.titleSize} ${
                      isPrimary ? "font-semibold text-white" : "font-medium text-slate-100"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-1.5 max-w-[44ch] font-mono text-[9px] leading-relaxed text-pretty sm:text-[10px] ${
                      isPrimary ? "text-white/80" : "text-slate-300/85"
                    }`}
                  >
                    {item.subtitle}
                  </p>
                </div>
              </article>
            );
          })}
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
      className="relative flex flex-col justify-center overflow-hidden bg-card"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-6 py-10 sm:px-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div className="relative order-2 mx-auto w-full max-w-xl lg:order-1">
          <svg
            viewBox="285 275 310 285"
            role="img"
            aria-label="Mapa ampliado da região Sudeste com Bebedouro, Ribeirão Preto e São Paulo destacadas"
            className="relative mx-auto block h-auto max-h-[42svh] w-full overflow-hidden"
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
          <div className="mt-6 divide-y divide-border border-y border-border">
            {LOCATIONS_INFO.map((item) => (
              <div key={item.name} className="flex gap-4 py-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <MapPin aria-hidden="true" className="size-4" />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-foreground">{item.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase text-primary">{item.state}</p>
                  <p className="mt-2 font-mono text-xs text-muted">{item.detail}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-4 py-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background text-primary ring-1 ring-border">
                <Radio aria-hidden="true" className="size-4" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-foreground">Online</p>
                <p className="mt-1 font-mono text-[10px] uppercase text-primary">Todo o Brasil</p>
                <p className="mt-2 font-mono text-xs text-muted">
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

type Plan = {
  name: string;
  price: string;
  benefits: string[];
  featuredBenefits: string[];
  isFeatured: boolean;
};

const PLANS: Record<Location, Plan[]> = {
  "Outras cidades": [
    {
      name: "Anual",
      price: "R$ 130/mês",
      benefits: [
        "Planilha Personalizada",
        "Contato com Treinador",
        "Acesso ao App Runy",
        "Estrutura Buzzini no dia da Prova",
      ],
      featuredBenefits: ["Kit Exclusivo Buzzini", "Desconto especial anual"],
      isFeatured: true,
    },
    {
      name: "Semestral",
      price: "R$ 140/mês",
      benefits: [
        "Planilha Personalizada",
        "Contato com Treinador",
        "Acesso ao App Runy",
        "Estrutura Buzzini no dia da Prova",
      ],
      featuredBenefits: ["Camiseta Buzzini", "Melhor suporte com o treinador"],
      isFeatured: false,
    },
    {
      name: "Trimestral",
      price: "R$ 145/mês",
      benefits: [
        "Planilha Personalizada",
        "Contato com Treinador",
        "Acesso ao App Runy",
        "Estrutura Buzzini no dia da Prova",
      ],
      featuredBenefits: [],
      isFeatured: false,
    },
    {
      name: "Mensal",
      price: "R$ 150/mês",
      benefits: [
        "Planilha Personalizada",
        "Contato com Treinador",
        "Acesso ao App Runy",
        "Estrutura Buzzini no dia da Prova",
      ],
      featuredBenefits: [],
      isFeatured: false,
    },
  ],
  "São Paulo": [
    {
      name: "Anual",
      price: "R$ 230/mês",
      benefits: [
        "Planilha Personalizada",
        "Contato com Treinador",
        "Acesso ao App Runy",
        "Estrutura Buzzini no dia da Prova",
      ],
      featuredBenefits: ["Kit Exclusivo Buzzini", "Desconto especial anual"],
      isFeatured: true,
    },
    {
      name: "Semestral",
      price: "R$ 240/mês",
      benefits: [
        "Planilha Personalizada",
        "Contato com Treinador",
        "Acesso ao App Runy",
        "Estrutura Buzzini no dia da Prova",
      ],
      featuredBenefits: ["Camiseta Buzzini", "Melhor suporte com o treinador"],
      isFeatured: false,
    },
    {
      name: "Trimestral",
      price: "R$ 245/mês",
      benefits: [
        "Planilha Personalizada",
        "Contato com Treinador",
        "Acesso ao App Runy",
        "Estrutura Buzzini no dia da Prova",
      ],
      featuredBenefits: [],
      isFeatured: false,
    },
    {
      name: "Mensal",
      price: "R$ 250/mês",
      benefits: [
        "Planilha Personalizada",
        "Contato com Treinador",
        "Acesso ao App Runy",
        "Estrutura Buzzini no dia da Prova",
      ],
      featuredBenefits: [],
      isFeatured: false,
    },
  ],
  Online: [
    {
      name: "Trimestral",
      price: "R$ 110/mês",
      benefits: [
        "Planilha Personalizada",
        "Contato com Treinador",
        "Acesso ao App Runy",
        "Estrutura Buzzini no dia da Prova",
      ],
      featuredBenefits: ["Acompanhamento onde você estiver"],
      isFeatured: false,
    },
  ],
};

function RestartBanner() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_32%),linear-gradient(180deg,#0c0f12_0%,#090b10_100%)] py-4 sm:py-6">
      <div className="mx-auto w-full max-w-[calc(100%-1.25rem)] px-0 sm:max-w-[calc(100%-2rem)]">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-primary/20 bg-background shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:rounded-[2rem]">
          <img
            src={fundoSite}
            alt="Pessoa correndo em ambiente natural"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.7),rgba(9,11,16,0.8),rgba(9,11,16,0.34))]" />
          <div className="absolute -right-14 bottom-[-2.5rem] h-72 w-72 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/20 blur-3xl opacity-80" />
          <div className="absolute left-8 top-8 h-28 w-28 rounded-full bg-primary/20 blur-2xl" />

          <div className="relative z-10 flex min-h-[24rem] items-center px-5 py-7 sm:px-8 lg:px-12 lg:py-9">
            <div className="max-w-[22ch] text-left">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary sm:text-xs">
                Recomeçar é possível
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold leading-[0.96] text-balance text-foreground sm:text-3xl lg:text-4xl">
                Nunca correu? Tudo bem.
                <span className="mt-2 block text-foreground/95">
                  Parou há um tempo? Você pode{" "}
                  <span className="font-bold text-primary">recomeçar</span>.
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Plans() {
  const [location, setLocation] = useState<Location>("Outras cidades");
  const isMobile = useIsMobile();
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    location: Location;
  } | null>(null);

  const whatsappNumber = "5517988026622";
  const whatsappMessage = selectedPlan
    ? `Olá, vi no site o plano ${selectedPlan.name} e gostaria de mais informações`
    : "";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const whatsappWebLink = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    if (selectedPlan === null) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPlan(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedPlan]);

  return (
    <section
      id="planos"
      className="snap-sec relative flex flex-col justify-start bg-background pt-8 pb-16 sm:justify-center sm:pt-4 sm:pb-10"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              Você define seu plano, nós cuidamos do resto.
            </p>
            <h2 className="mt-3 max-w-[40ch] font-display text-3xl font-semibold leading-tight text-balance text-foreground sm:mt-4 sm:text-5xl">
              Planos Buzzini
            </h2>
          </div>
          <p className="max-w-[40ch] font-mono text-xs leading-relaxed text-muted lg:text-right">
            Você paga mês a mês no cartão ou tudo à vista no Pix.{" "}
            <span className="font-bold text-foreground">O valor não muda:</span> à vista é a soma
            das mensalidades e com um super desconto!
          </p>
        </div>
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
        <div className="mt-5 grid grid-cols-1 gap-5 pb-2 sm:mt-6 sm:grid-cols-4 sm:pb-0">
          {PLANS[location].map((plan) => {
            const isFeatured = plan.isFeatured;
            const [priceValue, priceSuffix] = plan.price.split("/");
            const [currency, amount] = (priceValue ?? plan.price).split(" ");
            const isAnnualPlan = plan.name === "Anual";
            const dailyValue = Number((amount ?? "0").replace(/\./g, "")) / 30;
            const dailyPriceText = `Cerca de ${Number(dailyValue).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })} por dia`;
            const planGradient = isFeatured
              ? "bg-[linear-gradient(180deg,rgba(249,115,22,0.16),rgba(16,17,20,0.96),rgba(16,17,20,1))]"
              : "bg-[linear-gradient(180deg,rgba(148,163,184,0.08),rgba(16,17,20,0.96),rgba(16,17,20,1))]";

            return (
              <article
                key={plan.name}
                className={`relative flex min-h-44 flex-col justify-between rounded-lg p-5 pt-8 transition-all ${planGradient} ${
                  isFeatured
                    ? "border border-primary/40 text-foreground shadow-[0_0_0_1px_rgba(255,120,33,0.18)]"
                    : "text-foreground ring-border"
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3 left-4 rounded-full bg-primary px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-primary-foreground shadow-sm">
                    Mais escolhido
                  </span>
                )}
                <div>
                  <p
                    className={`font-mono text-xs font-bold uppercase tracking-[0.12em] ${isFeatured ? "text-primary" : "text-muted"}`}
                  >
                    {plan.name}
                  </p>
                  <p className="mt-4 flex items-baseline gap-1 font-display font-semibold leading-none text-foreground">
                    <span className="text-xl font-medium sm:text-2xl">{currency}</span>
                    <span className="text-3xl sm:text-4xl">{amount}</span>
                    {priceSuffix && (
                      <span className="font-mono text-xs font-normal text-muted sm:text-sm">
                        /{priceSuffix}
                      </span>
                    )}
                  </p>
                  <ul
                    className={`mt-4 space-y-2 font-mono text-[11px] leading-relaxed ${
                      isFeatured ? "text-foreground/80" : "text-foreground/75"
                    }`}
                  >
                    {plan.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className={isFeatured ? "text-primary" : "text-primary"}
                        >
                          ✓
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                    {plan.featuredBenefits.map((benefit) => (
                      <li key={benefit} className="flex gap-2 font-bold text-primary">
                        <span aria-hidden="true" className="text-primary">
                          ★
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {isAnnualPlan && (
                  <div className="mt-3 flex justify-center">
                    <span className="relative inline-block rounded-[0.18em] bg-primary/15 px-[0.12em] pb-[0.05em] font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-primary sm:text-[9px]">
                      {dailyPriceText}
                    </span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    const message = `Olá, vi no site o plano ${plan.name} e gostaria de mais informações`;
                    const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

                    if (isMobile) {
                      window.location.href = link;
                      return;
                    }

                    setSelectedPlan({ name: plan.name, location });
                  }}
                  className={`mt-5 h-10 w-full rounded-full px-3 font-mono text-xs font-bold uppercase ${"bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"}`}
                >
                  Quero esse plano
                </Button>
              </article>
            );
          })}
        </div>
      </div>
      {selectedPlan !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSelectedPlan(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="plan-dialog-title"
            aria-describedby="plan-dialog-description"
            className="relative grid w-full max-w-2xl gap-4 rounded-lg border border-border bg-background p-6 shadow-lg sm:p-8"
          >
            <Button
              type="button"
              variant="ghost"
              aria-label="Fechar"
              onClick={() => setSelectedPlan(null)}
              className="absolute right-3 top-3 size-9 rounded-full p-0 text-muted hover:bg-card hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </Button>
            <div className="flex flex-col space-y-1.5 pr-10 text-center sm:text-left">
              <h3 id="plan-dialog-title" className="font-display text-2xl text-foreground">
                Fale com a Buzzini Sports
              </h3>
              <p id="plan-dialog-description" className="font-mono text-sm text-muted">
                Escaneie o QR Code ou abra o WhatsApp Web para mais informações sobre o plano{" "}
                {selectedPlan.name}.
              </p>
            </div>
            <div className="mt-2 grid gap-6 sm:grid-cols-2 sm:items-center">
              <div className="flex flex-col items-center gap-4 rounded-lg bg-card p-5 text-center ring-1 ring-border">
                <div className="rounded-lg bg-white p-3">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(whatsappLink)}`}
                    alt="QR Code para abrir a conversa no WhatsApp"
                    width={220}
                    height={220}
                  />
                </div>
                <p className="max-w-[26ch] font-mono text-xs text-muted">
                  Aponte a câmera do celular para iniciar a conversa com a Buzzini Sports no
                  WhatsApp.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
                    Plano {selectedPlan.name}
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted">
                    {selectedPlan.location}
                  </p>
                  <p className="mt-3 font-mono text-sm leading-relaxed text-foreground/80">
                    “{whatsappMessage}”
                  </p>
                </div>
                <Button
                  asChild
                  className="h-12 rounded-full border border-[#32D951] bg-transparent font-mono text-xs uppercase text-[#32D951] hover:bg-[#32D951]/10 hover:text-[#32D951]"
                >
                  <a
                    href={whatsappWebLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Abrir WhatsApp Web
                    <img
                      src={whatsappIcon}
                      alt=""
                      aria-hidden="true"
                      className="size-5 object-contain"
                    />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
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
    <section id="faq" className="relative flex flex-col justify-center bg-card py-12 sm:py-16">
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
    <footer id="rodape" className="relative overflow-hidden bg-background py-12 sm:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/8 via-primary/3 to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center justify-start">
              <img
                src={buzziniLogo.url}
                alt="Buzzini Sports"
                className="h-12 w-auto object-contain sm:h-14"
              />
            </div>
            <p className="font-display text-3xl font-semibold text-foreground">Buzzini Sports</p>
            <p className="mt-3 max-w-[40ch] font-mono text-sm text-pretty text-muted">
              Combinamos conhecimento técnico com uma abordagem inovadora para criar treinos
              personalizados que realmente fazem a diferença. Desenhamos planos que são tão únicos
              quanto você, ajustados para quebrar limites.
            </p>
          </div>
          <div className="flex flex-col gap-3 font-mono text-sm text-foreground/80">
            <p className="text-xs uppercase tracking-[0.15em] text-muted">Contato</p>
            <a
              href="mailto:assessoria@buzzini.com.br"
              className="transition-colors hover:text-primary"
            >
              assessoria@buzzini.com.br
            </a>
            <a
              href="https://web.whatsapp.com/send?phone=5517988026622&text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Buzzini%20Sports%20e%20quero%20falar%20sobre%20os%20planos."
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir WhatsApp da Buzzini Sports"
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Phone aria-hidden="true" className="size-4" />
              <span>+55 17 98802-6622</span>
            </a>
            <div className="mt-2 flex flex-col items-start gap-2">
              <a
                href="https://www.instagram.com/buzzinisports/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram da Buzzini Sports"
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Instagram aria-hidden="true" className="size-4" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.strava.com/clubs/buzzini"
                target="_blank"
                rel="noreferrer"
                aria-label="Strava da Buzzini Sports"
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <StravaIcon className="size-4" />
                <span>Strava</span>
              </a>
              <a
                href="https://web.whatsapp.com/send?phone=5517988026622&text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Buzzini%20Sports%20e%20quero%20falar%20sobre%20os%20planos."
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp da Buzzini Sports"
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-border pt-5 font-mono text-xs text-muted">
          © 2026 Buzzini Sports · CNPJ 58.977.432/0001-37
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
      <OpeningMessage />
      <Manifesto />
      <HowItWorks />
      <Locations />
      <Stories />
      <Team />
      <RestartBanner />
      <Plans />
      <Faq />
      <Footer />
    </main>
  );
}
