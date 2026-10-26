import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Copy,
  ExternalLink,
  Eye,
  Flame,
  Globe2,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  HelpCircle,
  Instagram,
  Layers,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  Phone,
  PieChart,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
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

const WHATSAPP_NUMBER = "5517988026622";
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
          "Mídia Kit oficial da Buzzini Sports. Conecte sua marca a 200 alunos ativos, 24 provas ao ano, presença em 3 polos (Bebedouro, Ribeirão, SP) e mais de 320 mil contas alcançadas por mês.",
      },
      { property: "og:title", content: "Mídia Kit Oficial 2026 | Buzzini Sports" },
      {
        property: "og:description",
        content:
          "Oportunidades de patrocínio e ativação com a Buzzini Sports. Comunidade fiel de corredores, histórico com Z2, Centauro/Fila, Forcell e YoPRO.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: MEDIA_KIT_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: MEDIA_KIT_URL }],
  }),
  component: MidiaKitPage,
});

// Interactive partnership options for the sponsorship builder
interface PartnershipOption {
  id: string;
  name: string;
  category: "tenda" | "digital" | "experiencia" | "maratonas";
  reachEstimate: string;
  monthlyImpact: number;
  description: string;
}

const PARTNERSHIP_OPTIONS: PartnershipOption[] = [
  {
    id: "race-tent",
    name: "Espaço Físico & Backdrop na Tenda Oficial (24 Provas/Ano)",
    category: "tenda",
    reachEstimate: "60 a 140 alunos por prova + público da arena",
    monthlyImpact: 85000,
    description:
      "Sua marca em destaque na arena física das 24 provas do calendário anual (Live! Run, Track&Field, Night Run, etc.) com banner, totem e backdrop oficial para fotos de pódio e medalhas.",
  },
  {
    id: "instagram-collab",
    name: "Collabs no Instagram & Reels (320k Contas/Mês)",
    category: "digital",
    reachEstimate: "320 mil contas alcançadas organicamente",
    monthlyImpact: 140000,
    description:
      "Publicações conjuntas em collab no perfil oficial (@buzzinisports), cobertura dos treinos nos Stories e menção orgânica no ecossistema de endurance.",
  },
  {
    id: "major-races-activation",
    name: "Ativação nas Grandes Maratonas Nacionais & Globais",
    category: "maratonas",
    reachEstimate: "Comitivas para SP, Rio, Floripa, POA e Buenos Aires",
    monthlyImpact: 90000,
    description:
      "Presença de destaque da sua marca nas viagens para a Maratona do Rio, Floripa, SPCity, POA, Meia de Buenos Aires e Ironman, com cobertura audiovisual dedicada.",
  },
  {
    id: "product-sampling",
    name: "Sampling Direto & Degustação nos Treinos e Provas",
    category: "experiencia",
    reachEstimate: "Entrega em mãos para 200 alunos / 300 pessoas",
    monthlyImpact: 35000,
    description:
      "Distribuição física de amostras, suplementos, hidratação ou produtos nos kits de prova e treinos semanais da assessoria esportiva.",
  },
  {
    id: "special-train",
    name: "Naming Rights de Treinão Temático / Shake Out Run",
    category: "experiencia",
    reachEstimate: "Treino exclusivo com café da manhã e cobertura fotográfica",
    monthlyImpact: 50000,
    description:
      "Treino especial 'Powered by Sua Marca' (como os já realizados com Centauro/Fila e Forcell Rio), com café especial e engajamento presencial de atletas.",
  },
  {
    id: "own-events",
    name: "Presença em Eventos Próprios (Morilo's PET & Palestras)",
    category: "experiencia",
    reachEstimate: "Famílias e comunidade regional de corrida",
    monthlyImpact: 30000,
    description:
      "Ativação nos eventos proprietários da Buzzini, como a corrida Morilo's PET, ciclos de palestras esportivas e encontros pré-prova.",
  },
  {
    id: "vip-club-discounts",
    name: "Clube de Vantagens & Cupons Exclusivos para Alunos",
    category: "digital",
    reachEstimate: "Canal direto de conversão com alunos e comunidade",
    monthlyImpact: 25000,
    description:
      "Divulgação de cupom exclusivo nos grupos oficiais de WhatsApp e recomendação ativa e de confiança dos 8 professores da equipe.",
  },
];

// FAQ items for brand managers & sponsors
const FAQS = [
  {
    q: "Existe exclusividade de categoria comercial para a minha marca?",
    a: "Sim! Na Cota Master, sua marca garante exclusividade total no segmento (por exemplo: apenas um banco/cooperativa, uma marca de vestuário, uma marca de suplementação ou um plano de saúde). Nas demais cotas, garantimos que não haja marcas concorrentes diretas em uma mesma ativação.",
  },
  {
    q: "Podemos enviar produtos e amostras para os kits dos alunos (Sampling)?",
    a: "Com certeza. O sampling direto é um dos pilares mais fortes da Buzzini Sports. Entregamos os produtos em mãos durante os treinos semanais ou nos kits de prova oficiais, assegurando experimentação real por atletas de corrida e endurance.",
  },
  {
    q: "Vocês produzem fotos e vídeos profissionais com a nossa marca?",
    a: "Sim. Em todas as 24 provas do calendário anual e viagens para maratonas, a Buzzini conta com cobertura fotográfica e de vídeo profissional na tenda, backdrop de pódio e percurso, gerando material de alta resolução para uso nas redes de ambas as partes.",
  },
  {
    q: "Por que a Buzzini não insere logos em uniformes e camisetas?",
    a: "Nossa política preserva a identidade visual minimalista do uniforme e valoriza muito mais as marcas parceiras em canais de alto impacto real: tendas físicas de destaque nas 24 provas, backdrops oficiais de medalha, collabs no Instagram com mais de 320 mil contas de alcance e sampling direto na mão do corredor.",
  },
  {
    q: "Qual o prazo de ativação após alinhamento da proposta?",
    a: "Nossa equipe comercial e técnica é extremamente ágil. Em até 5 dias úteis após a confirmação, iniciamos a divulgação nos grupos oficiais de WhatsApp, colabs no Instagram e inclusão da marca nas arenas de prova seguintes.",
  },
];

function MidiaKitPage() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "race-tent",
    "instagram-collab",
    "product-sampling",
  ]);

  const [contactName, setContactName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [interestNote, setInterestNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Toggle option selection in the simulator
  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
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

  // Build custom WhatsApp link with selected options
  const selectedNames = selectedOptions
    .map((id) => PARTNERSHIP_OPTIONS.find((opt) => opt.id === id)?.name)
    .filter(Boolean)
    .join(", ");

  const customWhatsAppMsg = encodeURIComponent(
    `Olá Lucas e equipe Buzzini Sports! Estive vendo o Mídia Kit online da assessoria e tenho interesse em oportunidades de parceria.\n` +
      (companyName ? `Empresa: ${companyName}\n` : "") +
      (contactName ? `Contato: ${contactName}\n` : "") +
      (selectedNames ? `Formatos de interesse: ${selectedNames}\n` : "") +
      `Gostaria de agendar uma conversa para receber uma proposta personalizada!`
  );

  const handleSubmitLead = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const redirectUrl = `${BASE_WHATSAPP_URL}${customWhatsAppMsg}`;
    setTimeout(() => {
      window.open(redirectUrl, "_blank", "noopener,noreferrer");
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-800 antialiased selection:bg-orange-500/20 selection:text-orange-950 font-sans">
      {/* Modern CSS keyframes for fluid animations */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes pulseSoft {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
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

      {/* Accessibility skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-[#FF5500] focus:px-4 focus:py-2.5 focus:font-bold focus:text-white focus:shadow-xl"
      >
        Pular para o conteúdo principal
      </a>

      {/* Top Floating / Fixed Nav */}
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

          <nav className="hidden items-center gap-5 text-xs font-semibold text-slate-600 lg:flex">
            <a href="#numeros" className="transition-colors hover:text-[#FF5500]">
              Números
            </a>
            <a href="#galeria" className="transition-colors hover:text-[#FF5500]">
              Pista & Atletas
            </a>
            <a href="#perfil" className="transition-colors hover:text-[#FF5500]">
              Perfil dos Alunos
            </a>
            <a href="#geografia" className="transition-colors hover:text-[#FF5500]">
              Regiões
            </a>
            <a href="#provas" className="transition-colors hover:text-[#FF5500]">
              24 Provas
            </a>
            <a href="#cases" className="transition-colors hover:text-[#FF5500]">
              Cases
            </a>
            <a href="#simulador" className="transition-colors hover:text-[#FF5500]">
              Simulador
            </a>
            <a href="#cotas" className="transition-colors hover:text-[#FF5500]">
              Cotas
            </a>
            <a href="#faq" className="transition-colors hover:text-[#FF5500]">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Copy Link Button (Ideal for sending by email) */}
            <button
              onClick={handleCopyLink}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]"
              title="Copiar link para colar no e-mail de apresentação"
            >
              {copiedLink ? (
                <>
                  <Check className="size-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5 text-[#FF5500]" />
                  <span className="hidden sm:inline">Copiar Link</span>
                  <span className="sm:hidden">Link</span>
                </>
              )}
            </button>

            <a
              href="#contato"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF5500] px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-[#E64D00] hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]"
            >
              <MessageCircle className="size-3.5" />
              <span>Seja Parceiro</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content" className="relative">
        {/* Modern Ambient Light & Mesh Gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center overflow-hidden"
        >
          <div className="h-[540px] w-[1200px] -translate-y-1/3 rounded-full bg-gradient-to-b from-orange-200/50 via-amber-100/30 to-transparent blur-3xl" />
          <div className="absolute right-0 top-60 h-[420px] w-[500px] rounded-full bg-orange-100/60 blur-3xl" />
          <div className="absolute left-0 top-80 h-[420px] w-[500px] rounded-full bg-sky-100/50 blur-3xl" />
        </div>

        {/* HERO SECTION */}
        <section className="relative px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            {/* Live Season Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-orange-200/90 bg-white px-4 py-1.5 text-xs font-bold text-orange-700 shadow-sm animate-float-slow">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#FF5500]" />
              </span>
              <span>Apresentação Comercial Oficial • Temporada 2026</span>
              <span className="hidden text-slate-300 sm:inline">•</span>
              <span className="hidden text-slate-600 font-medium sm:inline">
                2 Anos e 7 Meses de Expansão Contínua
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Conecte sua marca a quem vive a corrida com{" "}
              <span className="relative inline-block text-[#FF5500]">
                fidelidade, paixão e presença real
                <span className="absolute -bottom-1.5 left-0 h-1.5 w-full rounded-full bg-orange-300/70" />
              </span>
              .
            </h1>

            {/* Subheadline with real briefing numbers */}
            <p className="mx-auto mt-6 max-w-3xl font-sans text-base leading-relaxed text-slate-600 sm:text-lg lg:text-xl">
              Fundada em <strong className="text-slate-950 font-bold">março de 2024</strong> e em
              forte expansão, a <strong className="text-slate-950 font-bold">Buzzini Sports</strong>{" "}
              reúne uma equipe de{" "}
              <strong className="text-[#FF5500] font-bold">8 professores especializados</strong>,{" "}
              <strong className="text-slate-950 font-bold">200 alunos ativos</strong> (impactando
              mais de <strong className="text-slate-950 font-bold">300 pessoas</strong> no
              ecossistema direto) e disputa{" "}
              <strong className="text-[#FF5500] font-bold">24 provas por ano</strong> com delegações
              de até <strong className="text-slate-950 font-bold">140 atletas</strong>, alcançando
              mais de{" "}
              <strong className="text-[#FF5500] font-extrabold">320 mil contas mensais</strong> no
              Instagram.
            </p>

            {/* Action Buttons */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href="#simulador"
                className="shimmer-effect inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF5500] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5 hover:bg-[#E64D00] hover:shadow-xl hover:shadow-orange-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]"
              >
                <Zap className="size-4" />
                <span>Simular Minha Estratégia</span>
                <ArrowRight className="size-4" />
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Olá Lucas! Vi o Mídia Kit da Buzzini Sports e gostaria de conversar sobre oportunidades de patrocínio e ativação para minha marca."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]"
              >
                <MessageCircle className="size-4 text-emerald-600" />
                <span>Falar no WhatsApp Comercial</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50/70 px-5 py-3 text-sm font-bold text-orange-800 transition-all hover:bg-orange-100 hover:border-orange-300"
              >
                {copiedLink ? (
                  <>
                    <Check className="size-4 text-emerald-600" />
                    <span className="text-emerald-700">Link Copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="size-4 text-[#FF5500]" />
                    <span>Copiar Link da Apresentação</span>
                  </>
                )}
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              💡 Enviando para sua diretoria por e-mail? Use o botão acima para copiar o link direto da apresentação web interativa.
            </p>
          </div>

          {/* 5 BIG BENTO KPI CARDS */}
          <div id="numeros" className="mx-auto mt-14 max-w-6xl scroll-mt-24">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {/* Card 1: Alunos */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-[#FF5500] transition-transform duration-300 group-hover:scale-110">
                    <Users className="size-5" />
                  </div>
                  <span className="rounded-full bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-700">
                    +54% cresc.
                  </span>
                </div>
                <div className="mt-3">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                    200
                  </span>
                  <p className="text-xs font-bold text-[#FF5500]">Alunos Ativos Hoje</p>
                  <p className="mt-1.5 text-[0.73rem] leading-relaxed text-slate-500">
                    Evolução sólida de 130 para 200 alunos. Mais de 300 pessoas no ecossistema direto.
                  </p>
                </div>
              </div>

              {/* Card 2: Alcance Digital */}
              <div className="group relative overflow-hidden rounded-2xl border-2 border-orange-500/60 bg-gradient-to-b from-orange-50/80 via-white to-white p-5 shadow-md shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF5500] hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#FF5500] text-white shadow-md shadow-orange-500/30 transition-transform duration-300 group-hover:scale-110 animate-pulse-soft">
                    <Flame className="size-5" />
                  </div>
                  <span className="rounded-full bg-orange-100 border border-orange-300 px-2 py-0.5 text-[0.65rem] font-bold text-orange-800">
                    Viral Orgânico
                  </span>
                </div>
                <div className="mt-3">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                    320k
                  </span>
                  <p className="text-xs font-bold text-[#FF5500]">Contas Alcançadas</p>
                  <p className="mt-1.5 text-[0.73rem] leading-relaxed text-slate-600">
                    Impacto orgânico expressivo nos últimos 30 dias com reels de treinos e coberturas oficiais de provas.
                  </p>
                </div>
              </div>

              {/* Card 3: Provas ao Ano */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-transform duration-300 group-hover:scale-110">
                    <Trophy className="size-5" />
                  </div>
                  <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[0.65rem] font-bold text-amber-800">
                    ~2 por mês
                  </span>
                </div>
                <div className="mt-3">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                    24
                  </span>
                  <p className="text-xs font-bold text-[#FF5500]">Provas por Ano</p>
                  <p className="mt-1.5 text-[0.73rem] leading-relaxed text-slate-500">
                    Média de 60 atletas por prova e recorde histórico de 140 alunos em uma única comitiva.
                  </p>
                </div>
              </div>

              {/* Card 4: Corpo Docente */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition-transform duration-300 group-hover:scale-110">
                    <GraduationCap className="size-5" />
                  </div>
                  <span className="rounded-full bg-sky-50 border border-sky-200 px-2 py-0.5 text-[0.65rem] font-bold text-sky-800">
                    Técnicos
                  </span>
                </div>
                <div className="mt-3">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                    8
                  </span>
                  <p className="text-xs font-bold text-[#FF5500]">Professores na Equipe</p>
                  <p className="mt-1.5 text-[0.73rem] leading-relaxed text-slate-500">
                    Acompanhamento técnico qualificado para iniciantes, intermediários e atletas de triathlon.
                  </p>
                </div>
              </div>

              {/* Card 5: Comunidade Instagram */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Instagram className="size-5" />
                  </div>
                  <a
                    href="https://instagram.com/buzzinisports"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.65rem] font-bold text-slate-500 hover:text-[#FF5500]"
                  >
                    @buzzinisports ↗
                  </a>
                </div>
                <div className="mt-3">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                    2.670
                  </span>
                  <p className="text-xs font-bold text-[#FF5500]">Seguidores Ativos</p>
                  <p className="mt-1.5 text-[0.73rem] leading-relaxed text-slate-500">
                    Comunidade nichada de praticantes de endurance, alta retenção e interação diária.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: VISUAL GALLERY SHOWCASE (A BUZZINI EM AÇÃO) */}
        <section id="galeria" className="scroll-mt-20 py-16 sm:py-24 border-t border-slate-200/80 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5500]">
                  Presença & Credibilidade Visual
                </p>
                <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                  A Buzzini Sports acontecendo no mundo real
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-600">
                Mais do que números na internet: uma comunidade vibrante e unida que lota arenas de corrida, sobe em pódios e consome produtos de marcas parceiras.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Photo 1: Team delegation celebration */}
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-md">
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src={teamPhoto}
                    alt="Equipe Buzzini Sports reunida"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="rounded-full bg-[#FF5500] px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-white">
                    🏆 Maior Assessoria
                  </span>
                  <h3 className="mt-2.5 font-display text-lg font-bold">
                    Força Coletiva & Delegações
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                    Presença maciça de até 140 atletas em uma mesma prova, dominando pódios e arenas por onde passa.
                  </p>
                </div>
              </div>

              {/* Photo 2: Faixa pórtico de chegada */}
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-md">
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src={faixaBuzzini}
                    alt="Linha de chegada Buzzini"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="rounded-full bg-amber-500 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-slate-950">
                    Superação Real
                  </span>
                  <h3 className="mt-2.5 font-display text-lg font-bold">
                    Linha de Chegada & Conquistas
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                    Média de 60 atletas cruzando pórticos em cada etapa, gerando fotos de alto engajamento emocional.
                  </p>
                </div>
              </div>

              {/* Photo 3: Hero runner em treino */}
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-md">
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src={heroRunner1600}
                    alt="Atleta em treino Buzzini"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="rounded-full bg-sky-500 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-slate-950">
                    Rotina & Foco
                  </span>
                  <h3 className="mt-2.5 font-display text-lg font-bold">
                    Treinamento & Consumo Diário
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                    Treinos semanais com uso intensivo de tênis, vestuário, nutrição esportiva e suplementação.
                  </p>
                </div>
              </div>
            </div>

            {/* Coaches bar */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img src={fotoHudson} alt="Coach Hudson" className="size-10 rounded-full border-2 border-white object-cover" />
                  <img src={fotoLarissa} alt="Coach Larissa" className="size-10 rounded-full border-2 border-white object-cover" />
                  <img src={fotoNara} alt="Coach Nara" className="size-10 rounded-full border-2 border-white object-cover" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-slate-950">Corpo Técnico Qualificado</h4>
                  <p className="text-xs text-slate-500">8 treinadores e especialistas em biomecânica, corrida e triathlon</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FF5500]">
                <span>Acompanhamento personalizado em cada treino</span>
                <CheckCircle2 className="size-4" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: PERFIL REAL DOS ALUNOS */}
        <section
          id="perfil"
          className="scroll-mt-20 border-t border-slate-200/80 bg-slate-50/50 py-16 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5500]">
                  Raio-X da Comunidade
                </p>
                <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                  Quem são os 200 atletas da Buzzini Sports?
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-600">
                Dados reais que mostram exatamente quem a sua marca alcança ao se associar à
                Buzzini: pessoas ativas, que consomem com regularidade e buscam superação contínua.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Box 1: Gênero (Forte Presença Feminina) */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                    <PieChart className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-slate-950">
                      Divisão por Gênero
                    </h3>
                    <p className="text-[0.7rem] font-medium text-slate-500">Maioria Feminina</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-rose-600">Mulheres (57%)</span>
                      <span className="text-slate-900">~114 alunas</span>
                    </div>
                    <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-500"
                        style={{ width: "57%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-sky-600">Homens (43%)</span>
                      <span className="text-slate-900">~85 alunos</span>
                    </div>
                    <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-sky-500 transition-all duration-500"
                        style={{ width: "43%" }}
                      />
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-[0.73rem] leading-relaxed text-slate-500">
                  Forte apelo para marcas de vestuário fitness, nutrição, bem-estar, autocuidado e calçados esportivos.
                </p>
              </div>

              {/* Box 2: Faixa Etária */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 text-[#FF5500]">
                    <Activity className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-slate-950">
                      Faixa Etária
                    </h3>
                    <p className="text-[0.7rem] font-medium text-slate-500">Público Ativo</p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50/60 p-4 text-center">
                  <span className="font-display text-3xl font-extrabold text-[#FF5500]">
                    25 a 40 anos
                  </span>
                  <p className="mt-1 text-[0.72rem] font-bold text-slate-800">
                    Faixa etária predominante
                  </p>
                </div>

                <p className="mt-5 text-[0.73rem] leading-relaxed text-slate-500">
                  Público em plena fase produtiva, tomadores de decisão e abertos a inovações que agregam saúde e bem-estar.
                </p>
              </div>

              {/* Box 3: Nível de Treinamento */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <Target className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-slate-950">
                      Nível Esportivo
                    </h3>
                    <p className="text-[0.7rem] font-medium text-slate-500">Fase de Evolução</p>
                  </div>
                </div>

                <div className="mt-6 space-y-2 text-xs">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-2.5">
                    <strong className="text-slate-900">Iniciantes & Intermediários:</strong>
                    <p className="text-[0.7rem] text-slate-500">
                      Predominante — formando hábitos esportivos e adquirindo seus primeiros tênis e kits.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-2.5">
                    <strong className="text-slate-900">Avançados & Triathlon:</strong>
                    <p className="text-[0.7rem] text-slate-500">
                      Corredores de maratonas e provas extremas como Ironman, servindo de inspiração para toda a assessoria.
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 4: Perfil Econômico & Ticket */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <Wallet className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-slate-950">
                      Perfil & Ticket
                    </h3>
                    <p className="text-[0.7rem] font-medium text-slate-500">Classes B e C</p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-center">
                  <span className="font-display text-3xl font-extrabold text-emerald-700">
                    R$ 140,00
                  </span>
                  <p className="mt-1 text-[0.72rem] font-bold text-slate-800">
                    Ticket Médio Mensal por Aluno
                  </p>
                </div>

                <p className="mt-5 text-[0.73rem] leading-relaxed text-slate-500">
                  Consumidores fiéis que compram calçados esportivos (Olympikus, Fila, Nike, Asics), suplementação e viajam para provas com regularidade.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: PRESENÇA GEOGRÁFICA DETALHADA */}
        <section id="geografia" className="scroll-mt-20 py-16 sm:py-24 bg-white border-t border-slate-200/80">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5500]">
                Distribuição dos 200 Alunos
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Onde a Buzzini Sports está presente?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
                A assessoria tem forte concentração física no interior e capital paulista, além de
                atletas conectados em diversas cidades brasileiras e no exterior.
              </p>
            </div>

            {/* 3 Main Hubs */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {/* Hub 1: Bebedouro */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#FF5500] bg-gradient-to-b from-orange-50/80 via-white to-white p-6 shadow-lg shadow-orange-500/10">
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-[#FF5500] text-white shadow-md shadow-orange-500/20">
                    <Building2 className="size-6" />
                  </div>
                  <span className="rounded-full bg-orange-100 border border-orange-300 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-orange-800">
                    Matriz Oficial
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-slate-950">
                  Bebedouro
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-extrabold text-[#FF5500]">157</span>
                  <span className="text-xs font-semibold text-slate-500">alunos presenciais</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  Centro neurálgico com treinos presenciais intensos, mobilização massiva e tradição esportiva consolidada.
                </p>
              </div>

              {/* Hub 2: Ribeirão Preto */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <Sparkles className="size-6" />
                  </div>
                  <span className="rounded-full bg-sky-50 border border-sky-200 px-2.5 py-0.5 text-[0.65rem] font-bold text-sky-800">
                    Polo Regional
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-slate-950">
                  Ribeirão Preto
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-extrabold text-slate-900">21</span>
                  <span className="text-xs font-semibold text-slate-500">alunos ativos</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  Capital do agronegócio e polo regional com forte presença nos circuitos Live! Run, Track&Field e Maratona de Ribeirão.
                </p>
              </div>

              {/* Hub 3: São Paulo */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <MapPin className="size-6" />
                  </div>
                  <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[0.65rem] font-bold text-amber-800">
                    Capital Paulista
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-slate-950">
                  São Paulo (Capital)
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-extrabold text-slate-900">6</span>
                  <span className="text-xs font-semibold text-slate-500">alunos locais</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  Presença nos treinos nos parques de SP (Ibirapuera, USP) e delegações nas maiores maratonas paulistanas.
                </p>
              </div>
            </div>

            {/* Other Cities / Online & International */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/60 p-6 text-center shadow-sm">
              <h4 className="font-display text-base font-bold text-slate-950">
                Capilaridade Nacional e Internacional (+16 Alunos Online)
              </h4>
              <p className="mx-auto mt-1 max-w-2xl text-xs text-slate-500">
                Além dos 3 polos principais, atletas Buzzini treinam e competem representando a
                assessoria em diversas cidades e no exterior:
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {[
                  "Colina",
                  "Viradouro",
                  "Barretos",
                  "Cajobi",
                  "Matão",
                  "Jaú",
                  "Taquaral",
                  "Taiúva",
                  "Curitiba",
                  "Campo Grande",
                  "Balneário Camboriú",
                  "🇺🇸 Estados Unidos",
                  "🇮🇪 Irlanda",
                ].map((city) => (
                  <span
                    key={city}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs transition-colors hover:border-orange-300 hover:bg-orange-50"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: 24 PROVAS POR ANO & FORÇA DE DELEGAÇÃO */}
        <section
          id="provas"
          className="scroll-mt-20 border-t border-slate-200/80 bg-slate-50/50 py-16 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-900">
                <Trophy className="size-3.5 text-amber-600" />
                <span>Onde a Buzzini Acontece no Mundo Real</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                24 Provas ao Ano: Média de 60 Atletas por Prova e até 140 na Maior Delegação
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
                A presença de pista da Buzzini Sports transforma qualquer arena de prova em uma
                onda laranja vibrante, com estrutura física completa e torcida engajada.
              </p>
            </div>

            {/* 3 TROPHIES HIGHLIGHT */}
            <div className="mt-12">
              <h3 className="text-center text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                🏆 Troféus de Maior Assessoria Conquistados
              </h3>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Troféu Live Run */}
                <div className="relative rounded-2xl border border-amber-200 bg-gradient-to-b from-amber-50/70 to-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                    <Trophy className="size-7" />
                  </div>
                  <h4 className="mt-4 font-display text-lg font-bold text-slate-950">
                    Live! Run XP
                  </h4>
                  <p className="mt-1 text-xs font-extrabold uppercase tracking-wide text-amber-700">
                    🏆 Maior Assessoria Esportiva
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Destaque absoluto em número de inscritos no renomado circuito nacional Live! Run.
                  </p>
                </div>

                {/* Troféu Track&Field */}
                <div className="relative rounded-2xl border border-amber-200 bg-gradient-to-b from-amber-50/70 to-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                    <Trophy className="size-7" />
                  </div>
                  <h4 className="mt-4 font-display text-lg font-bold text-slate-950">
                    Track&Field Run Series
                  </h4>
                  <p className="mt-1 text-xs font-extrabold uppercase tracking-wide text-amber-700">
                    🏆 Maior Assessoria Esportiva
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Premiação máxima no maior circuito de corrida de rua da América Latina.
                  </p>
                </div>

                {/* Troféu Parque Night Run */}
                <div className="relative rounded-2xl border border-amber-200 bg-gradient-to-b from-amber-50/70 to-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                    <Trophy className="size-7" />
                  </div>
                  <h4 className="mt-4 font-display text-lg font-bold text-slate-950">
                    Parque Night Run
                  </h4>
                  <p className="mt-1 text-xs font-extrabold uppercase tracking-wide text-amber-700">
                    🏆 Maior Assessoria Esportiva
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Presença maciça, energia contagiante e liderança coletiva na prova noturna.
                  </p>
                </div>
              </div>
            </div>

            {/* PÓDIOS & RELEVÂNCIA */}
            <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 text-center">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                Conquistas Competitivas
              </span>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Pódios no Geral e Campeões da <strong>AFC Tríplice Coroa</strong> comprovando a excelência técnica da equipe de atletas e professores.
              </p>
            </div>

            {/* GRANDES MARATONAS E CALENDÁRIO 2025/2026 */}
            <div className="mt-12">
              <h3 className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                <Globe2 className="size-4 text-[#FF5500]" />
                Grandes Maratonas e Provas no Calendário Buzzini
              </h3>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                {[
                  { name: "Maratona do Rio", tag: "42K & 21K", flag: "🇧🇷" },
                  { name: "Maratona de Floripa", tag: "42K & 21K", flag: "🇧🇷" },
                  { name: "SPCity Marathon", tag: "42K & 21K", flag: "🇧🇷" },
                  { name: "Meia de Buenos Aires", tag: "Internacional", flag: "🇦🇷" },
                  { name: "Maratona de POA", tag: "Porto Alegre", flag: "🇧🇷" },
                  { name: "Ironman Brasil", tag: "Triathlon Extremo", flag: "🏊‍♂️🚴‍♂️🏃‍♂️" },
                  { name: "Maratona Ribeirão", tag: "Polo Regional", flag: "🇧🇷" },
                  { name: "Circuito ASICS", tag: "Alta Performance", flag: "👟" },
                  { name: "Live! Run XP", tag: "Troféu Maior Ass.", flag: "🏆" },
                  { name: "Track&Field Series", tag: "Troféu Maior Ass.", flag: "🏆" },
                ].map((race) => (
                  <div
                    key={race.name}
                    className="rounded-xl border border-slate-200 bg-white p-3.5 text-center shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-sm"
                  >
                    <span className="text-xl">{race.flag}</span>
                    <h5 className="mt-2 text-xs font-bold text-slate-900">{race.name}</h5>
                    <span className="mt-1 inline-block rounded-full bg-orange-50 border border-orange-200 px-2 py-0.5 text-[0.65rem] font-semibold text-orange-700">
                      {race.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ESTRUTURA FÍSICA NA ARENA */}
            <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="max-w-xl">
                  <span className="rounded-full bg-orange-100 border border-orange-300 px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-orange-800">
                    Ponto de Apoio Oficial
                  </span>
                  <h4 className="mt-2 font-display text-xl font-bold text-slate-950">
                    Estrutura Completa de Tenda em Cada Prova
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Em todas as provas oficiais, a Buzzini monta sua tenda própria com backdrop de
                    pódio para fotos com medalhas, bandeiras, hidratação, ponto de apoio e recepção
                    de atletas e familiares.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-900">
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-2xs">
                    <CheckCircle2 className="size-4 text-[#FF5500]" />
                    <span>Tenda Oficial Própria</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-2xs">
                    <CheckCircle2 className="size-4 text-[#FF5500]" />
                    <span>Backdrop de Medalhas</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-2xs">
                    <CheckCircle2 className="size-4 text-[#FF5500]" />
                    <span>Windbanners & Totens</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-2xs">
                    <CheckCircle2 className="size-4 text-[#FF5500]" />
                    <span>Ponto de Hidratação</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: HISTÓRICO COM MARCAS / CASES REAIS */}
        <section id="cases" className="scroll-mt-20 py-16 sm:py-24 bg-white border-t border-slate-200/80">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5500]">
                Cases & Credibilidade
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Marcas que já confiaram e ativaram com a Buzzini Sports
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
                A assessoria já desenvolveu parcerias, experimentações de produtos, shake out runs
                e ativações com marcas de destaque no ecossistema esportivo.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Brand 1: Z2 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-xl">
                <div className="flex size-12 items-center justify-center rounded-xl bg-orange-100 text-[#FF5500] font-display font-extrabold text-xl shadow-2xs">
                  Z2
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-950">
                  Z2 Foods
                </h3>
                <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#FF5500]">
                  Nutrição Esportiva & Géis
                </span>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  Ativação de experimentação de produtos e degustação de géis de carboidrato em treinos longos e provas para os alunos.
                </p>
                <div className="mt-4 border-t border-slate-100 pt-3 text-[0.7rem] font-medium text-slate-500">
                  ✓ Sampling direto nos treinos
                  <br />✓ Alta adesão e consumo dos atletas
                </div>
              </div>

              {/* Brand 2: Centauro / Fila */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-xl">
                <div className="flex size-12 items-center justify-center rounded-xl bg-orange-100 text-[#FF5500] font-display font-extrabold text-sm shadow-2xs">
                  FILA
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-950">
                  Centauro & FILA
                </h3>
                <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#FF5500]">
                  Varejo & Calçados
                </span>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  Realização de <strong>Shake Out Run</strong> com experimentação de tênis e produtos de performance junto à comitiva de atletas.
                </p>
                <div className="mt-4 border-t border-slate-100 pt-3 text-[0.7rem] font-medium text-slate-500">
                  ✓ Test-drive de calçados
                  <br />✓ Treino especial pré-prova
                </div>
              </div>

              {/* Brand 3: FORCELL */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-xl">
                <div className="flex size-12 items-center justify-center rounded-xl bg-orange-100 text-[#FF5500] font-display font-extrabold text-xs shadow-2xs">
                  FORCELL
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-950">
                  FORCELL
                </h3>
                <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#FF5500]">
                  Parceria Recorrente
                </span>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  Histórico consistente de ativação em eventos, incluindo o <strong>Evento Forcell Rio</strong> e a comitiva <strong>Buzzini in Rio</strong> com tenda e suporte.
                </p>
                <div className="mt-4 border-t border-slate-100 pt-3 text-[0.7rem] font-medium text-slate-500">
                  ✓ Parceria contínua de longo prazo
                  <br />✓ Eventos exclusivos e viagens
                </div>
              </div>

              {/* Brand 4: YoPRO */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-xl">
                <div className="flex size-12 items-center justify-center rounded-xl bg-orange-100 text-[#FF5500] font-display font-extrabold text-xs shadow-2xs">
                  YoPRO
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-950">
                  YoPRO (Danone)
                </h3>
                <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#FF5500]">
                  Recovery & Proteínas
                </span>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  Ativação de produto pós-treino entregando recuperação proteica aos atletas na tenda e treinões especiais.
                </p>
                <div className="mt-4 border-t border-slate-100 pt-3 text-[0.7rem] font-medium text-slate-500">
                  ✓ Degustação pós-treino
                  <br />✓ Conexão direta no momento de recovery
                </div>
              </div>
            </div>

            {/* EVENTOS PRÓPRIOS DA BUZZINI */}
            <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div>
                  <span className="rounded-full bg-orange-100 border border-orange-300 px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-orange-800">
                    Eventos Proprietários
                  </span>
                  <h4 className="mt-2 font-display text-xl font-bold text-slate-950">
                    Morilo’s PET, Palestras Técnicas e Encontros Pré-Prova
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    A Buzzini promove iniciativas próprias como o evento <strong>Morilo’s PET</strong> (engajando famílias inteiras e seus pets), além de ciclos de palestras esportivas e encontros pré-prova, abrindo espaços exclusivos para ativações de marcas parceiras.
                  </p>
                </div>
                <a
                  href="#contato"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#FF5500] px-5 py-3 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-[#E64D00] hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>Ativar no Próximo Evento</span>
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: OS 5 PILARES QUE A BUZZINI OFERECE ÀS MARCAS */}
        <section
          id="formatos"
          className="scroll-mt-20 border-t border-slate-200/80 bg-slate-50/50 py-16 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5500]">
                O que entregamos
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Os 5 Pilares de Entrega para Marcas Parceiras
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
                Uma relação construída em conjunto, garantindo que o investimento da sua empresa
                gere resultados tangíveis de marca e conversão.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Pilar 1: Visibilidade */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-md">
                <div className="flex size-11 items-center justify-center rounded-xl bg-orange-100 text-[#FF5500]">
                  <Megaphone className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-950">
                  1. Visibilidade Contínua
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Exposição física ao longo de 24 provas anuais, com tenda oficial, backdrop de medalhas e grandes delegações de 60 a 140 atletas.
                </p>
              </div>

              {/* Pilar 2: Retorno & Comunidade */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-md">
                <div className="flex size-11 items-center justify-center rounded-xl bg-orange-100 text-[#FF5500]">
                  <BarChart3 className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-950">
                  2. Retorno Real (ROI)
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Contato com uma comunidade de mais de 300 pessoas no ecossistema e 200 alunos das Classes B/C com alta lealdade e consumo regular.
                </p>
              </div>

              {/* Pilar 3: Redes Sociais */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-md">
                <div className="flex size-11 items-center justify-center rounded-xl bg-orange-100 text-[#FF5500]">
                  <Instagram className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-950">
                  3. Redes Sociais Potentes
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Mais de 320.000 contas alcançadas por mês com collabs em Reels, unboxings e rotina dos atletas e dos 8 treinadores.
                </p>
              </div>

              {/* Pilar 4: Ativações & Sampling */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-md">
                <div className="flex size-11 items-center justify-center rounded-xl bg-orange-100 text-[#FF5500]">
                  <HeartPulse className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-950">
                  4. Ativações & Sampling
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Entrega de produtos direto na mão de quem treina: shake out runs, kits de corrida e degustação em treinos e eventos próprios.
                </p>
              </div>

              {/* Pilar 5: Individualidade */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-md sm:col-span-2 lg:col-span-2">
                <div className="flex size-11 items-center justify-center rounded-xl bg-orange-100 text-[#FF5500]">
                  <Sparkles className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-950">
                  5. Individualidade & Projetos Customizados
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Não trabalhamos com pacotes engessados. A diretoria da Buzzini senta com a sua equipe para desenhar ativações que façam sentido genuíno para o público e tragam os resultados esperados pela sua marca.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: SIMULADOR INTERATIVO DE IMPACTO */}
        <section
          id="simulador"
          className="scroll-mt-20 border-t border-slate-200/80 bg-white py-16 sm:py-24"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="rounded-full bg-orange-100 border border-orange-300 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-orange-800">
                Simulador Interativo 2.0
              </span>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Monte a Estratégia de Ativação da sua Marca
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">
                Selecione os canais de interesse para ver a projeção de impacto e solicitar uma
                proposta personalizada com a diretoria comercial.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Option Selector List */}
              <div className="space-y-3 lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Selecione os formatos que deseja ativar:
                </p>
                {PARTNERSHIP_OPTIONS.map((opt) => {
                  const isChecked = selectedOptions.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleOption(opt.id)}
                      className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                        isChecked
                          ? "border-[#FF5500] bg-orange-50/80 shadow-sm ring-1 ring-[#FF5500]/20"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                          isChecked
                            ? "border-[#FF5500] bg-[#FF5500] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="size-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-sm font-bold text-slate-950">{opt.name}</span>
                          <span className="rounded-full bg-white border border-slate-200 px-2.5 py-0.5 text-[0.65rem] font-semibold text-[#FF5500]">
                            {opt.reachEstimate}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-600">{opt.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Real-time Impact Summary Card */}
              <div className="lg:col-span-5">
                <div className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                    <span className="font-display text-sm font-bold text-slate-950">
                      Projeção de Impacto Mensal
                    </span>
                    <Sparkles className="size-4 text-[#FF5500]" />
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      Impressões & Contatos Estimados
                    </p>
                    <div className="mt-2 font-display text-5xl font-extrabold text-[#FF5500]">
                      {totalImpact.toLocaleString("pt-BR")}+
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      pontos de contato diretos e digitais por mês
                    </p>
                  </div>

                  <div className="mt-6 space-y-2.5 border-t border-slate-200/80 pt-4 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Ações selecionadas:</span>
                      <strong className="text-slate-900">
                        {selectedOptions.length} de {PARTNERSHIP_OPTIONS.length}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Presença em pista:</span>
                      <strong className="text-slate-900">24 provas por ano</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Comunidade direta:</span>
                      <strong className="text-[#FF5500] font-bold">200 alunos / 300 pessoas</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Equipe técnica:</span>
                      <strong className="text-slate-900">8 professores</strong>
                    </div>
                  </div>

                  <div className="mt-6">
                    <a
                      href={`${BASE_WHATSAPP_URL}${customWhatsAppMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shimmer-effect inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF5500] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-[#E64D00] hover:shadow-xl hover:-translate-y-0.5"
                    >
                      <MessageCircle className="size-4" />
                      <span>Pedir Proposta para esta Seleção</span>
                    </a>
                    <p className="mt-2 text-center text-[0.68rem] text-slate-500">
                      Proposta personalizada montada com agilidade pela diretoria da Buzzini.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: COTAS DE PATROCÍNIO SUGERIDAS */}
        <section id="cotas" className="scroll-mt-20 py-16 sm:py-24 border-t border-slate-200/80 bg-slate-50/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5500]">
                Cotas Estruturadas
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Níveis de Patrocínio e Parceria
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
                Projetos adequados aos objetivos da sua empresa, focados em presença em provas,
                maratonas, sampling e canais digitais.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Cota Prata */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md">
                <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-slate-700">
                  Cota Prata
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-slate-950">
                  Apoio & Nutrição
                </h3>
                <p className="mt-2 text-xs text-slate-500">
                  Ideal para marcas locais, suplementação, hidratação ou serviços esportivos.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#FF5500]" />
                    <span>Banner ou windbanner na tenda oficial nas 24 provas do ano.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#FF5500]" />
                    <span>Sampling pontual de produtos nos treinos da equipe.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#FF5500]" />
                    <span>1 post/reels em collab no Instagram a cada bimestre.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#FF5500]" />
                    <span>Cupom exclusivo divulgado no grupo de WhatsApp de alunos.</span>
                  </li>
                </ul>

                <a
                  href={`${BASE_WHATSAPP_URL}${encodeURIComponent(
                    "Olá! Gostaria de detalhes sobre a Cota Prata (Apoio & Nutrição) da Buzzini Sports."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-800 transition-all hover:bg-slate-100 hover:border-slate-300"
                >
                  <span>Consultar Cota Prata</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </div>

              {/* Cota Ouro */}
              <div className="relative rounded-2xl border-2 border-[#FF5500] bg-gradient-to-b from-orange-50/70 via-white to-white p-6 shadow-xl shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute -top-3.5 right-6 rounded-full bg-[#FF5500] px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-wide text-white shadow-sm">
                  Mais Procurada
                </div>
                <span className="rounded-full bg-orange-100 border border-orange-300 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-orange-800">
                  Cota Ouro
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-slate-950">
                  Patrocinador Oficial
                </h3>
                <p className="mt-2 text-xs text-slate-500">
                  Presença robusta e contínua em todas as 24 provas, maratonas e canais digitais.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-slate-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#FF5500]" />
                    <span>Espaço de destaque, totem e backdrop de pódio na tenda oficial.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#FF5500]" />
                    <span>
                      <strong>1 collab mensal no Instagram</strong> com alcance de 320k contas.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#FF5500]" />
                    <span>Sampling garantido em todos os kits de provas da assessoria.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#FF5500]" />
                    <span>
                      Presença nas comitivas para as grandes Maratonas (Rio, Floripa, SPCity, POA, Buenos Aires).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#FF5500]" />
                    <span>Campanhas de cupom exclusivo e recomendação ativa dos 8 professores.</span>
                  </li>
                </ul>

                <a
                  href={`${BASE_WHATSAPP_URL}${encodeURIComponent(
                    "Olá! Gostaria de detalhes sobre a Cota Ouro (Patrocinador Oficial) da Buzzini Sports."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF5500] py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-[#E64D00] hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Flame className="size-3.5" />
                  <span>Consultar Cota Ouro</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </div>

              {/* Cota Master */}
              <div className="rounded-2xl border border-amber-300 bg-gradient-to-b from-amber-50/50 via-white to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <span className="rounded-full bg-amber-100 border border-amber-200 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-amber-800">
                  Cota Master
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-slate-950">
                  Parceiro Master
                </h3>
                <p className="mt-2 text-xs text-slate-500">
                  Exclusividade no segmento com ativação premium em todas as arenas e eventos próprios.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-slate-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-600" />
                    <span>Tenda oficial com co-branding completo, espaço VIP e promotores.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-600" />
                    <span>
                      <strong>Naming rights de 1 Treinão Temático / Shake Out Run por semestre</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-600" />
                    <span>
                      <strong>2 collabs mensais + stories semanais</strong> no Instagram (320k de alcance).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-600" />
                    <span>Apoio máster e ações de experiência nas viagens para maratonas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-600" />
                    <span>Presença de honra no evento Morilo’s PET e palestras técnicas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-600" />
                    <span>
                      <strong>Exclusividade total na sua categoria de produto ou serviço</strong>.
                    </span>
                  </li>
                </ul>

                <a
                  href={`${BASE_WHATSAPP_URL}${encodeURIComponent(
                    "Olá! Gostaria de detalhes sobre a Cota Master (Exclusividade) da Buzzini Sports."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-100/70 py-2.5 text-xs font-bold text-amber-900 transition-all hover:bg-amber-200/80"
                >
                  <span>Consultar Cota Master</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: FAQ INTERATIVO PARA MARCAS E PATROCINADORES */}
        <section id="faq" className="scroll-mt-20 py-16 sm:py-24 border-t border-slate-200/80 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
                Tire suas dúvidas
              </span>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Perguntas Frequentes de Marcas e Parceiros
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">
                Respostas rápidas para as principais dúvidas de gestores de marketing antes de iniciar uma parceria com a Buzzini Sports.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left font-display text-sm font-bold text-slate-900 hover:text-[#FF5500]"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`size-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#FF5500]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-slate-200/60 bg-white px-5 py-4 text-xs leading-relaxed text-slate-600">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION: FORMULÁRIO DE CONTATO & WHATSAPP DIRETO */}
        <section
          id="contato"
          className="scroll-mt-20 border-t border-slate-200/80 bg-slate-50/70 py-16 sm:py-24"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10 lg:p-12">
              <div className="text-center">
                <span className="rounded-full bg-orange-100 border border-orange-300 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-orange-800">
                  Vamos Conversar
                </span>
                <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                  Leve sua marca para a linha de frente do esporte.
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">
                  Preencha os dados abaixo para receber nossa proposta comercial ou entre em contato
                  diretamente pelo WhatsApp com a diretoria da Buzzini Sports.
                </p>
              </div>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-emerald-300 bg-emerald-50 p-6 text-center">
                  <CheckCircle2 className="mx-auto size-12 text-emerald-600" />
                  <h3 className="mt-3 font-display text-lg font-bold text-slate-950">
                    Solicitação Recebida com Sucesso!
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Você está sendo direcionado para o WhatsApp da nossa equipe comercial para
                    conversar diretamente sobre a sua marca.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="mt-8 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Ex: Carlos Mendes"
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF5500] focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700">
                        Nome da Empresa ou Marca *
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Ex: NutriSport Brasil"
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF5500] focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20"
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
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="carlos@empresa.com.br"
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF5500] focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700">
                        WhatsApp / Celular com DDD *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="(17) 99999-9999"
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF5500] focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      Mensagem ou Detalhes da Ação Desejada
                    </label>
                    <textarea
                      rows={3}
                      value={interestNote}
                      onChange={(e) => setInterestNote(e.target.value)}
                      placeholder="Conte um pouco sobre sua marca e o tipo de ativação ou cota que deseja discutir..."
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF5500] focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="shimmer-effect inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF5500] py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-[#E64D00] hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]"
                    >
                      <Send className="size-4" />
                      <span>Enviar Solicitação de Parceria</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Direct WhatsApp Box & Quick Copy Link */}
              <div className="mt-8 border-t border-slate-200 pt-6 text-center">
                <p className="text-xs text-slate-500">
                  Prefere falar diretamente agora com o diretor comercial ou copiar o link desta página?
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "Olá Lucas! Gostaria de conversar com a diretoria comercial da Buzzini Sports sobre patrocínio."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-5 py-2 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
                  >
                    <MessageCircle className="size-4" />
                    <span>WhatsApp Direto: (17) 98802-6622</span>
                  </a>

                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="size-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Link Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="size-3.5 text-[#FF5500]" />
                        <span>Copiar Link para E-mail</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-10 text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-7 items-center justify-center rounded-lg bg-slate-950 p-1">
              <img src={buzziniLogo} alt="Buzzini Sports" className="h-full w-auto" />
            </div>
            <span className="text-[0.72rem] text-slate-500">
              © 2026 Buzzini Sports · CNPJ 58.977.432/0001-37. Todos os direitos reservados.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://instagram.com/buzzinisports"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-[#FF5500]"
            >
              <Instagram className="size-3.5 text-[#FF5500]" />
              <span>@buzzinisports</span>
            </a>
            <a href="/" className="transition-colors hover:text-[#FF5500]">
              Página Principal
            </a>
            <a href="/empresas" className="transition-colors hover:text-[#FF5500]">
              Buzzini Empresas
            </a>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 transition-colors hover:text-[#FF5500]"
            >
              <Share2 className="size-3 text-[#FF5500]" />
              <span>{copiedLink ? "Link Copiado!" : "Compartilhar Link"}</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Sticky Quick Action Pill Bar */}
      <aside
        aria-label="Ações rápidas"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-3 py-1.5 shadow-2xl backdrop-blur-md ring-1 ring-slate-900/5 sm:gap-3 sm:px-4 sm:py-2"
      >
        <div className="hidden sm:flex items-center gap-2 pr-2 border-r border-slate-200 text-xs font-bold text-slate-800">
          <span className="flex size-2 rounded-full bg-[#FF5500] animate-ping" />
          <span>Mídia Kit 2026</span>
        </div>

        <button
          onClick={handleCopyLink}
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 hover:bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition-colors"
        >
          {copiedLink ? (
            <>
              <Check className="size-3 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Copiado</span>
            </>
          ) : (
            <>
              <Copy className="size-3 text-[#FF5500]" />
              <span>Copiar Link</span>
            </>
          )}
        </button>

        <a
          href="#simulador"
          className="hidden md:inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#FF5500] transition-colors"
        >
          <span>Simulador</span>
        </a>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            "Olá Lucas! Vi o Mídia Kit da Buzzini Sports e gostaria de conversar sobre patrocínio."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5500] hover:bg-[#E64D00] px-3.5 py-1 text-xs font-bold text-white shadow-sm transition-all"
        >
          <MessageCircle className="size-3.5" />
          <span>Falar no WhatsApp</span>
        </a>
      </aside>

      {/* Floating Copied Toast */}
      {copiedLink && (
        <aside
          aria-live="polite"
          className="fixed bottom-20 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-300 bg-white px-4 py-3 shadow-2xl ring-1 ring-emerald-500/10 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
        >
          <div className="flex size-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Check className="size-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Link Copiado com Sucesso!</p>
            <p className="text-[0.7rem] text-slate-500">Pronto para colar no seu e-mail de apresentação.</p>
          </div>
        </aside>
      )}
    </div>
  );
}
