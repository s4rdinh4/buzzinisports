import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Flame,
  Globe2,
  GraduationCap,
  HeartPulse,
  Instagram,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  PieChart,
  Send,
  Share2,
  Sparkles,
  Target,
  Trophy,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

import buzziniLogo from "@/assets/logo_buzzini.svg";
import teamPhoto from "@/assets/time_buzzini.jpg";
import heroRunner1600 from "@/assets/hero-runner-1600.webp";
import faixaBuzzini from "@/assets/faixa-buzzini.webp";
import fotoLarissa from "@/assets/foto-larissa.webp";
import fotoHudson from "@/assets/foto-hudson.webp";
import fotoNara from "@/assets/foto-nara.webp";

const WHATSAPP_NUMBER = "5517991556246";
const BASE_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=`;
const MEDIA_KIT_URL = "https://buzzinisports.lovable.app/midia-kit";

export const Route = createFileRoute("/midia-kit")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Mídia Kit Oficial 2026 | Buzzini Sports — Parcerias & Patrocínio" },
      {
        name: "description",
        content:
          "Mídia Kit oficial da Buzzini Sports. Conecte sua marca a mais de +200 alunos ativos, mais de 24 provas ao ano, presença em 3 polos (Bebedouro, Ribeirão, SP) e mais de 320 mil contas alcançadas por mês.",
      },
      { property: "og:title", content: "Mídia Kit Oficial 2026 | Buzzini Sports" },
      {
        property: "og:description",
        content:
          "Oportunidades de patrocínio e ativação com a Buzzini Sports. Comunidade fiel de corredores (+200 alunos), histórico com Z2, Centauro/Fila, Forcell e YoPRO.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: MEDIA_KIT_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: MEDIA_KIT_URL }],
  }),
  component: MidiaKitPage,
});

interface PartnershipOption {
  id: string;
  name: string;
  reachEstimate: string;
  monthlyImpact: number;
  description: string;
}

const PARTNERSHIP_OPTIONS: PartnershipOption[] = [
  {
    id: "race-tent",
    name: "Espaço & Backdrop na Tenda Oficial (+24 Provas ao Ano)",
    reachEstimate: "+60 a +140 atletas/prova + público da arena",
    monthlyImpact: 85000,
    description:
      "Sua marca em destaque na arena física de mais de 24 provas do calendário oficial (Live! Run, Track&Field, etc.) com banner, totem e backdrop oficial para fotos de pódio e medalhas.",
  },
  {
    id: "instagram-collab",
    name: "Collabs no Instagram & Reels (+320k Contas/Mês)",
    reachEstimate: "+320 mil contas alcançadas/mês",
    monthlyImpact: 140000,
    description:
      "Publicações conjuntas em collab no perfil oficial (@buzzinisports), cobertura dos treinos nos Stories e menção orgânica no ecossistema de endurance.",
  },
  {
    id: "major-races-activation",
    name: "Ativação nas Grandes Maratonas Nacionais & Globais",
    reachEstimate: "Comitivas para SP, Rio, Floripa, POA e Buenos Aires",
    monthlyImpact: 90000,
    description:
      "Presença de destaque da sua marca nas viagens para a Maratona do Rio, Floripa, SPCity, POA, Meia de Buenos Aires e Ironman, com cobertura audiovisual dedicada.",
  },
  {
    id: "product-sampling",
    name: "Sampling Direto & Degustação nos Treinos e Provas",
    reachEstimate: "+200 alunos ativos / +300 pessoas no ecossistema",
    monthlyImpact: 35000,
    description:
      "Distribuição física de amostras, suplementos, hidratação ou produtos nos kits de prova e treinos semanais da assessoria esportiva.",
  },
  {
    id: "special-train",
    name: "Naming Rights de Treinão Temático / Shake Out Run",
    reachEstimate: "Treino exclusivo com café da manhã e fotos",
    monthlyImpact: 50000,
    description:
      "Treino especial 'Powered by Sua Marca' (como os já realizados com Centauro/Fila e Forcell Rio), com café especial e engajamento presencial dos atletas.",
  },
  {
    id: "vip-club-discounts",
    name: "Clube de Vantagens & Cupons Exclusivos para Alunos",
    reachEstimate: "Canal direto de conversão com +200 alunos",
    monthlyImpact: 25000,
    description:
      "Divulgação de cupom exclusivo nos grupos oficiais de WhatsApp e recomendação ativa e de confiança dos professores da equipe.",
  },
];

const FAQS = [
  {
    q: "Existe exclusividade de categoria comercial para a minha marca?",
    a: "Sim! Na Cota Master, sua marca garante exclusividade total no segmento (apenas um banco, uma marca esportiva, uma de suplementos, etc.). Nas demais cotas, garantimos que não haja marcas concorrentes diretas em uma mesma ativação.",
  },
  {
    q: "Podemos enviar produtos e amostras para os kits dos alunos (Sampling)?",
    a: "Com certeza. O sampling direto é um dos pilares mais fortes da Buzzini Sports. Entregamos os produtos em mãos durante os treinos semanais ou nos kits de prova oficiais, assegurando experimentação real por atletas praticantes.",
  },
  {
    q: "Vocês produzem fotos e vídeos profissionais com a nossa marca?",
    a: "Sim. Em todas as 24 provas do ano e viagens para maratonas, a Buzzini conta com cobertura audiovisual profissional na tenda, backdrop de pódio e percurso, gerando material de alta resolução para uso mútuo nas redes.",
  },
  {
    q: "Por que a Buzzini não insere logos em camisetas e uniformes?",
    a: "Nossa política preserva a identidade visual minimalista do uniforme e valoriza muito mais as marcas parceiras em canais de alto impacto real: tendas físicas oficiais nas 24 provas, backdrops de fotos com medalhas, collabs no Instagram com mais de 320 mil contas de alcance e sampling direto na mão do atleta.",
  },
];

function MidiaKitPage() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "race-tent",
    "instagram-collab",
    "product-sampling",
  ]);

  const [consent, setConsent] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Toggle option selection in the simulator
  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Copy media kit link to clipboard (optimized for sending by email)
  const handleCopyLink = () => {
    if (typeof window !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href || MEDIA_KIT_URL);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3200);
    }
  };

  // Calculate estimated total monthly impact
  const totalImpact = selectedOptions.reduce((acc, currId) => {
    const item = PARTNERSHIP_OPTIONS.find((opt) => opt.id === currId);
    return acc + (item?.monthlyImpact || 0);
  }, 0);

  // Selected format names string
  const selectedNames = selectedOptions
    .map((id) => PARTNERSHIP_OPTIONS.find((opt) => opt.id === id)?.name)
    .filter(Boolean)
    .join(", ");

  const customWhatsAppMsg = encodeURIComponent(
    `Olá Lucas e equipe Buzzini Sports! Vi o Mídia Kit online da assessoria e gostaria de receber uma proposta comercial.\n` +
      (selectedNames ? `Formatos selecionados: ${selectedNames}\n` : "") +
      `Gostaria de agendar uma conversa para receber uma proposta personalizada!`,
  );

  // Send contact form via email (matching /empresas schema)
  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);
    setSubmissionStatus("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/midia-kit-contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company"),
          role: formData.get("role") || "",
          phone: formData.get("phone"),
          formats: selectedNames || "Formatos sob consulta",
          message: formData.get("message") || "",
          consent,
          website: formData.get("website") || "",
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        setSubmissionStatus(
          typeof result?.error === "string"
            ? result.error
            : "Não foi possível enviar sua solicitação por e-mail no momento. Fale conosco diretamente pelo WhatsApp comercial.",
        );
        setIsSuccess(false);
        return;
      }

      form.reset();
      setConsent(false);
      setIsSuccess(true);
      setSubmissionStatus(
        "Solicitação enviada com sucesso! Nossa equipe comercial recebeu sua mensagem por e-mail e entrará em contato em breve.",
      );
    } catch {
      setSubmissionStatus(
        "Não foi possível enviar a solicitação agora. Tente novamente em alguns instantes ou chame nossa equipe diretamente pelo WhatsApp.",
      );
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-800 antialiased selection:bg-orange-500/20 selection:text-orange-950 font-sans pb-16">
      {/* Modern CSS keyframes */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulseSoft {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.04); opacity: 0.9; }
        }
        @keyframes shimmerWave {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
        .animate-float-slow {
          animation: floatSlow 5s ease-in-out infinite;
        }
        .animate-pulse-soft {
          animation: pulseSoft 3s ease-in-out infinite;
        }
        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }
        .shimmer-effect::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-150%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmerWave 3.5s infinite;
        }
      `}</style>

      {/* Top Fixed Nav */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
            aria-label="Buzzini Sports Home"
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-slate-950 p-1.5 shadow-sm ring-1 ring-slate-900/10">
              <img src={buzziniLogo} alt="Buzzini Sports" className="h-full w-auto" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-extrabold tracking-tight text-slate-950">
                BUZZINI
              </span>
              <span className="text-[0.62rem] font-bold uppercase tracking-wider text-[#FF5500]">
                SPORTS
              </span>
            </div>
            <span className="hidden rounded-full border border-orange-200/90 bg-orange-50 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-orange-700 sm:inline-block">
              Mídia Kit 2026
            </span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content" className="relative">
        {/* Ambient Light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center overflow-hidden"
        >
          <div className="h-[480px] w-[1100px] -translate-y-1/3 rounded-full bg-gradient-to-b from-orange-200/50 via-amber-100/30 to-transparent blur-3xl" />
          <div className="absolute right-0 top-60 h-[380px] w-[450px] rounded-full bg-orange-100/60 blur-3xl" />
        </div>

        {/* HERO SECTION */}
        <section className="relative px-4 pt-12 pb-14 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Live Season Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/90 bg-white px-3.5 py-1 text-xs font-bold text-orange-700 shadow-sm animate-float-slow">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#FF5500]" />
              </span>
              <span>Apresentação Comercial Oficial • Temporada 2026</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-medium">Fundada em 10/03/2024</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Conecte sua marca a quem vive a corrida com{" "}
              <span className="relative inline-block text-[#FF5500]">
                fidelidade e presença real
                <span className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-orange-300/70" />
              </span>
              .
            </h1>

            {/* Concise Subheadline */}
            <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-slate-600 sm:text-lg">
              Com mais de <strong className="text-slate-950 font-bold">+200 alunos ativos</strong>,
              corpo técnico de{" "}
              <strong className="text-[#FF5500] font-bold">8 professores especialistas</strong>,
              presença confirmada em{" "}
              <strong className="text-slate-950 font-bold">mais de 24 provas ao ano</strong> e mais
              de{" "}
              <strong className="text-[#FF5500] font-bold">
                320 mil contas alcançadas por mês
              </strong>{" "}
              no Instagram, a Buzzini Sports é a ponte direta entre a sua marca e corredores
              altamente engajados.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contato"
                className="shimmer-effect inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#FF5500] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all hover:-translate-y-0.5 hover:bg-[#E64D00] hover:shadow-lg"
              >
                <Zap className="size-4" />
                <span>Solicitar Proposta por E-mail</span>
                <ArrowRight className="size-4" />
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Olá Lucas! Vi o Mídia Kit da Buzzini Sports e gostaria de conversar sobre patrocínio comercial.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5"
              >
                <MessageCircle className="size-4 text-emerald-600" />
                <span>WhatsApp Comercial</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50/70 px-4 py-2.5 text-sm font-bold text-orange-800 transition-all hover:bg-orange-100"
              >
                {copiedLink ? (
                  <>
                    <Check className="size-4 text-emerald-600" />
                    <span className="text-emerald-700">Link Copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="size-4 text-[#FF5500]" />
                    <span>Copiar Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 5 KPI CARDS */}
          <div id="numeros" className="mx-auto mt-12 max-w-6xl scroll-mt-24">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {/* Card 1: Alunos */}
              <div className="group rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-orange-50 text-[#FF5500]">
                    <Users className="size-4.5" />
                  </div>
                  <span className="rounded-full bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 text-[0.62rem] font-bold text-emerald-700">
                    +54% cresc.
                  </span>
                </div>
                <div className="mt-3">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-slate-950">
                    +200
                  </span>
                  <p className="text-xs font-bold text-[#FF5500]">Alunos Ativos</p>
                  <p className="mt-1 text-[0.7rem] text-slate-500">
                    +300 pessoas no ecossistema direto
                  </p>
                </div>
              </div>

              {/* Card 2: Alcance Digital */}
              <div className="group rounded-2xl border-2 border-orange-500/60 bg-gradient-to-b from-orange-50/80 via-white to-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF5500] hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[#FF5500] text-white shadow-sm">
                    <Flame className="size-4.5" />
                  </div>
                  <span className="rounded-full bg-orange-100 border border-orange-300 px-2 py-0.5 text-[0.62rem] font-bold text-orange-800">
                    Orgânico
                  </span>
                </div>
                <div className="mt-3">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-slate-950">
                    +320k
                  </span>
                  <p className="text-xs font-bold text-[#FF5500]">Contas Alcançadas / Mês</p>
                  <p className="mt-1 text-[0.7rem] text-slate-600">
                    Reels virais e coberturas de treinos
                  </p>
                </div>
              </div>

              {/* Card 3: Provas ao Ano */}
              <div className="group rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Trophy className="size-4.5" />
                  </div>
                  <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[0.62rem] font-bold text-amber-800">
                    ~2 por mês
                  </span>
                </div>
                <div className="mt-3">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-slate-950">
                    +24
                  </span>
                  <p className="text-xs font-bold text-[#FF5500]">Provas por Ano</p>
                  <p className="mt-1 text-[0.7rem] text-slate-500">
                    Média de +60 atletas, pico de +140
                  </p>
                </div>
              </div>

              {/* Card 4: Corpo Docente */}
              <div className="group rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <GraduationCap className="size-4.5" />
                  </div>
                  <span className="rounded-full bg-sky-50 border border-sky-200 px-2 py-0.5 text-[0.62rem] font-bold text-sky-800">
                    Especialistas
                  </span>
                </div>
                <div className="mt-3">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-slate-950">
                    8
                  </span>
                  <p className="text-xs font-bold text-[#FF5500]">Professores</p>
                  <p className="mt-1 text-[0.7rem] text-slate-500">
                    Acompanhamento técnico qualificado
                  </p>
                </div>
              </div>

              {/* Card 5: Comunidade Instagram */}
              <div className="group col-span-2 sm:col-span-1 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-sm">
                    <Instagram className="size-4.5" />
                  </div>
                  <a
                    href="https://instagram.com/buzzinisports"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.62rem] font-bold text-slate-500 hover:text-[#FF5500]"
                  >
                    @buzzinisports ↗
                  </a>
                </div>
                <div className="mt-3">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-slate-950">
                    +2.670
                  </span>
                  <p className="text-xs font-bold text-[#FF5500]">Seguidores Fiéis</p>
                  <p className="mt-1 text-[0.7rem] text-slate-500">
                    Atletas e praticantes de corrida
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: VISUAL GALLERY (PRESENÇA REAL) */}
        <section
          id="galeria"
          className="scroll-mt-20 py-12 sm:py-16 border-t border-slate-200/80 bg-white"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5500]">
                  Presença Real
                </p>
                <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                  A Buzzini acontecendo na pista
                </h2>
              </div>
              <p className="max-w-md text-xs sm:text-sm text-slate-600 leading-relaxed">
                Uma comunidade ativa que lota arenas de corrida, conquista pódios e consome produtos
                de marcas parceiras.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {/* Photo 1: Team delegation celebration */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={teamPhoto}
                    alt="Equipe Buzzini Sports reunida"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="rounded-full bg-[#FF5500] px-2.5 py-0.5 text-[0.62rem] font-extrabold uppercase tracking-wider text-white">
                    🏆 Maior Assessoria
                  </span>
                  <h3 className="mt-2 font-display text-base font-bold">
                    Força Coletiva & Delegações
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-300">
                    Até 140 atletas em uma mesma prova, dominando arenas e pódios.
                  </p>
                </div>
              </div>

              {/* Photo 2: Faixa pórtico de chegada */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={faixaBuzzini}
                    alt="Linha de chegada Buzzini"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-[0.62rem] font-extrabold uppercase tracking-wider text-slate-950">
                    Superação
                  </span>
                  <h3 className="mt-2 font-display text-base font-bold">Linha de Chegada</h3>
                  <p className="mt-0.5 text-xs text-slate-300">
                    Média de 60 atletas cruzando pórticos em cada etapa oficial.
                  </p>
                </div>
              </div>

              {/* Photo 3: Hero runner em treino */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={heroRunner1600}
                    alt="Atleta em treino Buzzini"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="rounded-full bg-sky-500 px-2.5 py-0.5 text-[0.62rem] font-extrabold uppercase tracking-wider text-slate-950">
                    Rotina
                  </span>
                  <h3 className="mt-2 font-display text-base font-bold">
                    Treinos & Consumo Diário
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-300">
                    Treinos semanais com uso intensivo de tênis, vestuário e nutrição.
                  </p>
                </div>
              </div>
            </div>

            {/* Coaches bar */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img
                    src={fotoHudson}
                    alt="Coach Hudson"
                    className="size-9 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src={fotoLarissa}
                    alt="Coach Larissa"
                    className="size-9 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src={fotoNara}
                    alt="Coach Nara"
                    className="size-9 rounded-full border-2 border-white object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-slate-950">
                    Corpo Técnico de8 Professores
                  </h4>
                  <p className="text-[0.7rem] text-slate-500">
                    Acompanhamento especializado para corredores e triatletas
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#FF5500]">
                Recomendação qualificada de marcas e produtos
              </span>
            </div>
          </div>
        </section>

        {/* SECTION: PERFIL ENXUTO DOS ALUNOS & POLOS EM % */}
        <section
          id="perfil"
          className="scroll-mt-20 border-t border-slate-200/80 bg-slate-50/60 py-12 sm:py-16"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5500]">
                Raio-X da Comunidade
              </p>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                Quem a sua marca alcança com a Buzzini?
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Box 1: Gênero */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                    <PieChart className="size-4" />
                  </div>
                  <h3 className="font-display text-xs font-bold text-slate-950">
                    Divisão por Gênero
                  </h3>
                </div>
                <div className="mt-4 space-y-2 text-xs font-semibold">
                  <div>
                    <div className="flex justify-between text-[0.72rem]">
                      <span className="text-rose-600 font-bold">57% Mulheres</span>
                      <span className="text-slate-900">+114 alunas</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: "57%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[0.72rem]">
                      <span className="text-sky-600 font-bold">43% Homens</span>
                      <span className="text-slate-900">+85 alunos</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full" style={{ width: "43%" }} />
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-[0.7rem] text-slate-500">
                  Amplo apelo para moda fitness, bem-estar e calçados.
                </p>
              </div>

              {/* Box 2: Faixa Etária */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-orange-100 text-[#FF5500]">
                    <Activity className="size-4" />
                  </div>
                  <h3 className="font-display text-xs font-bold text-slate-950">Faixa Etária</h3>
                </div>
                <div className="mt-4 rounded-lg bg-orange-50/70 border border-orange-200/80 p-3 text-center">
                  <span className="font-display text-2xl font-extrabold text-[#FF5500]">
                    25 a 40 anos
                  </span>
                  <p className="text-[0.68rem] font-bold text-slate-700">Faixa predominante</p>
                </div>
                <p className="mt-3 text-[0.7rem] text-slate-500">
                  Público ativo em fase profissional ascendente e poder de decisão.
                </p>
              </div>

              {/* Box 3: Perfil Econômico */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <Wallet className="size-4" />
                  </div>
                  <h3 className="font-display text-xs font-bold text-slate-950">
                    Perfil Econômico
                  </h3>
                </div>
                <div className="mt-4 rounded-lg bg-emerald-50/70 border border-emerald-200/80 p-3 text-center">
                  <span className="font-display text-2xl font-extrabold text-emerald-700">
                    Classes B e C
                  </span>
                  <p className="text-[0.68rem] font-bold text-slate-700">
                    Ticket Médio: R$ 140,00/mês
                  </p>
                </div>
                <p className="mt-3 text-[0.7rem] text-slate-500">
                  Consumidores fiéis que compram calçados, nutrição e viajam para maratonas.
                </p>
              </div>

              {/* Box 4: Nível Esportivo */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                    <Target className="size-4" />
                  </div>
                  <h3 className="font-display text-xs font-bold text-slate-950">Nível Esportivo</h3>
                </div>
                <div className="mt-4 space-y-1.5 text-[0.72rem]">
                  <div className="rounded-md bg-slate-50 p-2 border border-slate-200">
                    <strong className="text-slate-900">Iniciantes e Intermediários:</strong> Maioria
                    formando hábitos e comprando kits.
                  </div>
                  <div className="rounded-md bg-slate-50 p-2 border border-slate-200">
                    <strong className="text-slate-900">Avançados & Triathlon:</strong> Atletas de
                    maratonas e provas extremas (Ironman).
                  </div>
                </div>
              </div>
            </div>

            {/* Polos Geográficos enxutos em Porcentagem (%) */}
            <div
              id="geografia"
              className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="font-display text-base font-bold text-slate-950">
                    Distribuição Geográfica da Equipe
                  </h3>
                  <p className="text-xs text-slate-500">
                    Proporção territorial dos mais de +200 alunos ativos da Buzzini Sports
                  </p>
                </div>
                <span className="self-start sm:self-auto rounded-full bg-orange-100 border border-orange-300 px-3 py-0.5 text-xs font-bold text-orange-800">
                  +200 Atletas Ativos
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Bebedouro */}
                <div className="rounded-xl border-2 border-[#FF5500] bg-orange-50/40 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.65rem] font-bold uppercase text-orange-800 bg-orange-100 px-2 py-0.5 rounded">
                      Matriz Oficial
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Polo Principal</span>
                  </div>
                  <h4 className="mt-2 font-display text-lg font-bold text-slate-950">
                    Bebedouro — SP
                  </h4>
                  <div className="mt-1 flex items-baseline gap-2">
                    <p className="font-display text-3xl font-extrabold text-[#FF5500]">78,5%</p>
                    <span className="text-xs font-semibold text-slate-600">da equipe</span>
                  </div>
                  <p className="mt-2 text-[0.72rem] text-slate-600">
                    Maior concentração de treinos presenciais e mobilização em massa para provas.
                  </p>
                </div>

                {/* Ribeirão Preto */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.65rem] font-bold uppercase text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                      Polo Regional
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Agronegócio</span>
                  </div>
                  <h4 className="mt-2 font-display text-lg font-bold text-slate-950">
                    Ribeirão Preto — SP
                  </h4>
                  <div className="mt-1 flex items-baseline gap-2">
                    <p className="font-display text-3xl font-extrabold text-slate-900">10,5%</p>
                    <span className="text-xs font-semibold text-slate-600">da equipe</span>
                  </div>
                  <p className="mt-2 text-[0.72rem] text-slate-600">
                    Forte presença em circuitos de renome nacional como Live! Run e Track&Field.
                  </p>
                </div>

                {/* São Paulo */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.65rem] font-bold uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Capital
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Parques & Maratonas
                    </span>
                  </div>
                  <h4 className="mt-2 font-display text-lg font-bold text-slate-950">
                    São Paulo — SP
                  </h4>
                  <div className="mt-1 flex items-baseline gap-2">
                    <p className="font-display text-3xl font-extrabold text-slate-900">3,0%</p>
                    <span className="text-xs font-semibold text-slate-600">da equipe</span>
                  </div>
                  <p className="mt-2 text-[0.72rem] text-slate-600">
                    Atletas nos principais parques (Ibirapuera, USP) e em grandes maratonas do
                    estado.
                  </p>
                </div>
              </div>

              {/* Online e demais cidades */}
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center text-xs text-slate-600">
                <span className="font-bold text-slate-900">
                  8,0% em Demais Regiões & Assessoria Online:
                </span>{" "}
                Atletas conectados e comitivas em Colina, Viradouro, Barretos, Cajobi, Matão, Jaú,
                Curitiba, Campo Grande, Balneário Camboriú, além de alunos nos 🇺🇸 Estados Unidos e
                🇮🇪 Irlanda.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: 24 PROVAS POR ANO & TROFÉUS */}
        <section
          id="provas"
          className="scroll-mt-20 border-t border-slate-200/80 bg-white py-12 sm:py-16"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="rounded-full bg-amber-100 border border-amber-300 px-3 py-0.5 text-xs font-bold text-amber-900">
                Presença Presencial Consolidada
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                Mais de 24 Provas ao Ano com Estrutura Física Completa
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm text-slate-600">
                Média de mais de 60 atletas por prova e delegações de até +140 atletas em grandes
                comitivas, transformando arenas esportivas em pontos de ativação direta da sua
                marca.
              </p>
            </div>

            {/* 3 Troféus de Maior Assessoria */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-amber-200 bg-gradient-to-b from-amber-50/60 to-white p-5 text-center shadow-sm">
                <Trophy className="mx-auto size-6 text-amber-600" />
                <h3 className="mt-2 font-display text-base font-bold text-slate-950">
                  Live! Run XP
                </h3>
                <p className="text-xs font-bold uppercase text-amber-700">
                  🏆 Troféu Maior Assessoria
                </p>
              </div>
              <div className="rounded-xl border border-amber-200 bg-gradient-to-b from-amber-50/60 to-white p-5 text-center shadow-sm">
                <Trophy className="mx-auto size-6 text-amber-600" />
                <h3 className="mt-2 font-display text-base font-bold text-slate-950">
                  Track&Field Series
                </h3>
                <p className="text-xs font-bold uppercase text-amber-700">
                  🏆 Troféu Maior Assessoria
                </p>
              </div>
              <div className="rounded-xl border border-amber-200 bg-gradient-to-b from-amber-50/60 to-white p-5 text-center shadow-sm">
                <Trophy className="mx-auto size-6 text-amber-600" />
                <h3 className="mt-2 font-display text-base font-bold text-slate-950">
                  Parque Night Run
                </h3>
                <p className="text-xs font-bold uppercase text-amber-700">
                  🏆 Troféu Maior Assessoria
                </p>
              </div>
            </div>

            {/* Calendário de Grandes Maratonas */}
            <div className="mt-8">
              <h4 className="text-center text-xs font-bold uppercase tracking-wider text-slate-700">
                Comitivas nas Maiores Provas Nacionais e Internacionais
              </h4>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {[
                  "Maratona do Rio 🇧🇷",
                  "Maratona de Floripa 🇧🇷",
                  "SPCity Marathon 🇧🇷",
                  "Meia de Buenos Aires 🇦🇷",
                  "Maratona de POA 🇧🇷",
                  "Ironman Brasil 🏊‍♂️🚴‍♂️🏃‍♂️",
                  "Circuito ASICS 👟",
                  "Maratona de Ribeirão Preto 🇧🇷",
                ].map((race) => (
                  <span
                    key={race}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-800"
                  >
                    {race}
                  </span>
                ))}
              </div>
            </div>

            {/* Estrutura na arena */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/70 p-4 flex flex-wrap items-center justify-around gap-4 text-xs font-semibold text-slate-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#FF5500]" />
                <span>Tenda Oficial Própria</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#FF5500]" />
                <span>Backdrop de Medalhas para Fotos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#FF5500]" />
                <span>Windbanners & Totens de Marca</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#FF5500]" />
                <span>Ponto de Hidratação & Sampling</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: CASES DE MARCAS ENXUTOS */}
        <section
          id="cases"
          className="scroll-mt-20 border-t border-slate-200/80 bg-slate-50/60 py-12 sm:py-16"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5500]">
                Histórico Comprovado
              </p>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                Marcas que ativam com a Buzzini Sports
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="font-display font-extrabold text-lg text-[#FF5500]">Z2 Foods</span>
                <p className="text-xs font-semibold text-slate-800 mt-1">Nutrição Esportiva</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Degustação e sampling direto de géis de carboidrato em treinos longos e provas.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="font-display font-extrabold text-lg text-[#FF5500]">
                  Centauro & FILA
                </span>
                <p className="text-xs font-semibold text-slate-800 mt-1">Varejo & Tênis</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Realização de <strong>Shake Out Run</strong> com experimentação e test-drive de
                  calçados de corrida.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="font-display font-extrabold text-lg text-[#FF5500]">FORCELL</span>
                <p className="text-xs font-semibold text-slate-800 mt-1">Parceria Recorrente</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Ativações em eventos corporativos, incluindo <strong>Forcell Rio</strong> e
                  comitiva <strong>Buzzini in Rio</strong>.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="font-display font-extrabold text-lg text-[#FF5500]">
                  YoPRO (Danone)
                </span>
                <p className="text-xs font-semibold text-slate-800 mt-1">Recovery Proteico</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Distribuição pós-treino entregando recuperação proteica na tenda da assessoria.
                </p>
              </div>
            </div>

            {/* Evento proprietário */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <h4 className="font-display text-sm font-bold text-slate-950">
                  Evento Próprio: Morilo's PET & Treinões Temáticos
                </h4>
                <p className="text-xs text-slate-500">
                  Corridas engajando famílias inteiras, palestras técnicas e apresentações
                  pré-prova.
                </p>
              </div>
              <a
                href="#contato"
                className="shrink-0 text-xs font-bold text-[#FF5500] hover:underline"
              >
                Ativar no próximo evento ↗
              </a>
            </div>
          </div>
        </section>

        {/* SECTION: SIMULADOR INTERATIVO */}
        <section
          id="simulador"
          className="scroll-mt-20 border-t border-slate-200/80 bg-white py-12 sm:py-16"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="rounded-full bg-orange-100 border border-orange-300 px-3 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-orange-800">
                Simulador de Ativação
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                Monte a Estratégia da sua Marca
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="space-y-2.5 lg:col-span-7">
                {PARTNERSHIP_OPTIONS.map((opt) => {
                  const isChecked = selectedOptions.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleOption(opt.id)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                        isChecked
                          ? "border-[#FF5500] bg-orange-50/70 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-md border ${
                          isChecked
                            ? "border-[#FF5500] bg-[#FF5500] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="size-3.5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className="text-xs sm:text-sm font-bold text-slate-950">
                            {opt.name}
                          </span>
                          <span className="rounded-full bg-white border border-slate-200 px-2 py-0.5 text-[0.62rem] font-semibold text-[#FF5500]">
                            {opt.reachEstimate}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-600">{opt.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Real-time Impact Summary Card */}
              <div className="lg:col-span-5">
                <div className="sticky top-20 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-lg">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-slate-500">
                    Projeção Mensal Estimada
                  </span>

                  <div className="mt-3 text-center">
                    <div className="font-display text-4xl sm:text-5xl font-extrabold text-[#FF5500]">
                      {totalImpact.toLocaleString("pt-BR")}+
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      pontos de contato diretos e digitais por mês
                    </p>
                  </div>

                  <div className="mt-5 space-y-2 border-t border-slate-200/80 pt-3 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Formatos selecionados:</span>
                      <strong className="text-slate-900">
                        {selectedOptions.length} de {PARTNERSHIP_OPTIONS.length}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Presença em pista:</span>
                      <strong className="text-slate-900">Mais de 24 provas ao ano</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Comunidade direta:</span>
                      <strong className="text-[#FF5500]">+200 alunos / +300 pessoas</strong>
                    </div>
                  </div>

                  <a
                    href="#contato"
                    className="shimmer-effect mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF5500] px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all hover:bg-[#E64D00]"
                  >
                    <Send className="size-4" />
                    <span>Solicitar Proposta para esta Seleção</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: COTAS DE PATROCÍNIO (ZERO LOGO EM UNIFORMES) */}
        <section
          id="cotas"
          className="scroll-mt-20 py-12 sm:py-16 border-t border-slate-200/80 bg-slate-50/60"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5500]">
                Cotas Estruturadas
              </p>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                Níveis de Patrocínio e Ativação
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                * Preservamos a estética dos uniformes dos atletas; ativamos sua marca em tendas,
                pódios, reels e sampling.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {/* Cota Prata */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.62rem] font-bold uppercase text-slate-700">
                  Cota Prata
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-slate-950">
                  Apoio & Nutrição
                </h3>
                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#FF5500] shrink-0 mt-0.5" />
                    <span>Banner na tenda oficial em mais de 24 provas do ano.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#FF5500] shrink-0 mt-0.5" />
                    <span>Sampling pontual de produtos nos treinos (+200 alunos).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#FF5500] shrink-0 mt-0.5" />
                    <span>Cupom exclusivo nos grupos oficiais de alunos.</span>
                  </li>
                </ul>
                <a
                  href="#contato"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100"
                >
                  Selecionar Cota Prata
                </a>
              </div>

              {/* Cota Ouro */}
              <div className="relative rounded-2xl border-2 border-[#FF5500] bg-gradient-to-b from-orange-50/60 via-white to-white p-5 shadow-md">
                <span className="absolute -top-3 right-4 rounded-full bg-[#FF5500] px-2.5 py-0.5 text-[0.62rem] font-extrabold uppercase text-white">
                  Mais Procurada
                </span>
                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[0.62rem] font-bold uppercase text-orange-800">
                  Cota Ouro
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-slate-950">
                  Patrocinador Oficial
                </h3>
                <ul className="mt-4 space-y-2 text-xs text-slate-800">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#FF5500] shrink-0 mt-0.5" />
                    <span>Totem e backdrop oficial de medalhas na tenda de prova.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#FF5500] shrink-0 mt-0.5" />
                    <span>1 collab mensal no Instagram (alcance de mais de 320k contas).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#FF5500] shrink-0 mt-0.5" />
                    <span>Sampling garantido em todos os kits de provas da equipe.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#FF5500] shrink-0 mt-0.5" />
                    <span>Presença nas viagens para as grandes Maratonas.</span>
                  </li>
                </ul>
                <a
                  href="#contato"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#FF5500] py-2 text-xs font-bold text-white shadow-sm hover:bg-[#E64D00]"
                >
                  Selecionar Cota Ouro
                </a>
              </div>

              {/* Cota Master */}
              <div className="rounded-2xl border border-amber-300 bg-gradient-to-b from-amber-50/50 via-white to-white p-5 shadow-sm">
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[0.62rem] font-bold uppercase text-amber-800">
                  Cota Master
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-slate-950">
                  Parceiro Master
                </h3>
                <ul className="mt-4 space-y-2 text-xs text-slate-800">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="size-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>Exclusividade total na sua categoria de produto ou serviço.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="size-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>Naming rights de 1 Treinão Temático oficial por semestre.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="size-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>2 collabs mensais + stories semanais no Instagram (+320k contas).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="size-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>Espaço VIP e co-branding na tenda de todas as mais de 24 provas.</span>
                  </li>
                </ul>
                <a
                  href="#contato"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-amber-300 bg-amber-100/70 py-2 text-xs font-bold text-amber-900 hover:bg-amber-200"
                >
                  Consultar Cota Master
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: FAQ ENXUTO */}
        <section
          id="faq"
          className="scroll-mt-20 py-12 sm:py-16 border-t border-slate-200/80 bg-white"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-extrabold text-slate-950">
              Perguntas Frequentes de Marcas
            </h2>
            <div className="mt-6 space-y-2.5">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="rounded-xl border border-slate-200 bg-slate-50/50 transition-all overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-3 p-4 text-left font-display text-xs sm:text-sm font-bold text-slate-900 hover:text-[#FF5500]"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`size-4 shrink-0 text-slate-400 transition-transform ${
                          isOpen ? "rotate-180 text-[#FF5500]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-slate-200/60 bg-white px-4 py-3 text-xs text-slate-600 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION: FORMULÁRIO DE ENVIO POR E-MAIL (ESQUEMA DO EMPRESAS) */}
        <section
          id="contato"
          className="scroll-mt-20 border-t border-slate-200/80 bg-slate-50/70 py-12 sm:py-16"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-9 shadow-xl">
              <div className="text-center">
                <span className="rounded-full bg-orange-100 border border-orange-300 px-3 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-orange-800">
                  Solicitação de Proposta
                </span>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                  Conecte sua marca à Buzzini Sports
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm text-slate-600">
                  Preencha os dados abaixo para receber nossa proposta comercial oficial diretamente
                  no seu e-mail corporativo.
                </p>
              </div>

              {submissionStatus && (
                <div
                  className={`mt-6 rounded-xl border p-4 text-center text-xs leading-relaxed ${
                    isSuccess
                      ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                      : "border-rose-300 bg-rose-50 text-rose-800"
                  }`}
                >
                  <p className="font-semibold">{submissionStatus}</p>
                  {isSuccess && (
                    <div className="mt-3">
                      <a
                        href={`${BASE_WHATSAPP_URL}${customWhatsAppMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 underline hover:text-emerald-700"
                      >
                        <MessageCircle className="size-3.5" />
                        <span>Prefere agilizar a conversa agora pelo WhatsApp? Clique aqui ↗</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                {/* Honeypot field for anti-spam */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      Seu Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Ex: Carlos Mendes"
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF5500] focus:outline-none focus:ring-1 focus:ring-[#FF5500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      Nome da Empresa ou Marca *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      placeholder="Ex: NutriSport Brasil"
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF5500] focus:outline-none focus:ring-1 focus:ring-[#FF5500]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      E-mail Corporativo *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="carlos@empresa.com.br"
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF5500] focus:outline-none focus:ring-1 focus:ring-[#FF5500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      WhatsApp / Celular com DDD *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="(17) 99155-6246"
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF5500] focus:outline-none focus:ring-1 focus:ring-[#FF5500]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Cargo / Função na Empresa
                  </label>
                  <input
                    type="text"
                    name="role"
                    placeholder="Ex: Gerente de Marketing, Diretor, Head de Parcerias"
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF5500] focus:outline-none focus:ring-1 focus:ring-[#FF5500]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Mensagem ou Objetivos da Marca
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Conte um pouco sobre os objetivos da sua marca, orçamento previsto ou ativação desejada..."
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF5500] focus:outline-none focus:ring-1 focus:ring-[#FF5500]"
                  />
                </div>

                {/* Consent checkbox (LGPD) */}
                <label className="flex items-start gap-2.5 pt-1 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-0.5 size-4 rounded border-slate-300 text-[#FF5500] focus:ring-[#FF5500]"
                  />
                  <span>
                    Autorizo a equipe comercial da Buzzini Sports a entrar em contato com minha
                    empresa por e-mail ou WhatsApp para envio de propostas e informações comerciais.
                    *
                  </span>
                </label>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="shimmer-effect inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF5500] py-3 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all hover:bg-[#E64D00] disabled:opacity-60"
                  >
                    <Send className="size-4" />
                    <span>
                      {isSubmitting ? "Enviando solicitação..." : "Enviar Solicitação de Parceria"}
                    </span>
                  </button>
                </div>
              </form>

              {/* Direct WhatsApp shortcut */}
              <div className="mt-6 border-t border-slate-200 pt-4 text-center">
                <p className="text-xs text-slate-500">
                  Deseja falar diretamente com o diretor comercial agora?
                </p>
                <a
                  href={`${BASE_WHATSAPP_URL}${customWhatsAppMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
                >
                  <MessageCircle className="size-3.5" />
                  <span>WhatsApp Direto: (17) 99155-6246</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-slate-950 p-1">
              <img src={buzziniLogo} alt="Buzzini Sports" className="h-full w-auto" />
            </div>
            <span className="text-[0.7rem] text-slate-500">
              © 2026 Buzzini Sports · CNPJ 58.977.432/0001-37. Todos os direitos reservados.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href="https://instagram.com/buzzinisports"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#FF5500]"
            >
              <Instagram className="size-3 text-[#FF5500]" />
              <span>@buzzinisports</span>
            </a>
            <a href="/" className="hover:text-[#FF5500]">
              Página Principal
            </a>
            <a href="/empresas" className="hover:text-[#FF5500]">
              Buzzini Empresas
            </a>
            <button
              onClick={handleCopyLink}
              className="hover:text-[#FF5500] flex items-center gap-1"
            >
              <Share2 className="size-3 text-[#FF5500]" />
              <span>{copiedLink ? "Link Copiado!" : "Compartilhar Link"}</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Sticky Action Pill Bar */}
      <aside
        aria-label="Ações rápidas"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-3 py-1.5 shadow-xl backdrop-blur-md ring-1 ring-slate-900/5 sm:gap-3 sm:px-4 sm:py-2"
      >
        <div className="hidden sm:flex items-center gap-2 pr-2 border-r border-slate-200 text-xs font-bold text-slate-800">
          <span className="flex size-2 rounded-full bg-[#FF5500] animate-ping" />
          <span>Mídia Kit 2026</span>
        </div>

        <a
          href="#contato"
          className="inline-flex items-center gap-1 rounded-full bg-[#FF5500] hover:bg-[#E64D00] px-3.5 py-1 text-xs font-bold text-white shadow-sm transition-all"
        >
          <Mail className="size-3.5" />
          <span>Pedir Proposta</span>
        </a>
      </aside>

      {/* Floating Copied Toast */}
      {copiedLink && (
        <aside
          aria-live="polite"
          className="fixed bottom-20 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-300 bg-white px-4 py-3 shadow-2xl ring-1 ring-emerald-500/10 transition-all duration-300"
        >
          <div className="flex size-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Check className="size-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Link Copiado com Sucesso!</p>
            <p className="text-[0.7rem] text-slate-500">
              Pronto para colar no seu e-mail de apresentação.
            </p>
          </div>
        </aside>
      )}
    </div>
  );
}
