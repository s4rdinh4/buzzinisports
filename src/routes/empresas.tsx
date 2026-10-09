import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  Handshake,
  HeartHandshake,
  HeartPulse,
  MessageCircle,
  MoveUpRight,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import buzziniLogo from "@/assets/logo_buzzini.svg";
import heroRunner960 from "@/assets/hero-runner-960.webp";
import heroRunner1600 from "@/assets/hero-runner-1600.webp";
import teamPhoto from "@/assets/time_buzzini.jpg";

const whatsappNumber = "5517988026622";
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá, quero conhecer a Buzzini Empresas.")}`;

const faqs = [
  {
    question: "Como funciona a coparticipação?",
    answer:
      "O custo mensal é dividido entre empresa e colaborador conforme a proposta acordada. A participação do colaborador é voluntária e eventual desconto em folha depende de autorização e das regras aplicáveis.",
  },
  {
    question: "Quanto a empresa paga por colaborador?",
    answer:
      "O valor complementar depende da faixa comercial e da proposta. O exemplo desta página é apenas ilustrativo e não representa preço ou condição comercial definitiva.",
  },
  {
    question: "Como funciona o desconto em folha?",
    answer:
      "Quando adotado, o desconto da parte do colaborador deve ocorrer mediante autorização e conforme as regras aplicáveis, a serem alinhadas entre empresa e colaborador.",
  },
  {
    question: "Quem pode participar?",
    answer:
      "A adesão é voluntária. A empresa e a Buzzini alinham os critérios de participação antes da contratação.",
  },
  {
    question: "O benefício é voltado somente a quem já corre?",
    answer:
      "Não. A proposta pode atender pessoas iniciantes e também quem já tem experiência. O formato para cada perfil precisa ser alinhado comercialmente.",
  },
  {
    question: "É possível contratar para diferentes quantidades de funcionários?",
    answer:
      "Sim, as condições podem variar conforme a quantidade de participantes ativos. A Buzzini pode apresentar uma simulação personalizada para o perfil da empresa.",
  },
  {
    question: "A assessoria substitui outros benefícios de academia?",
    answer:
      "A proposta apresentada é de assessoria de corrida. Ela não pressupõe substituir outros benefícios; a empresa pode avaliar como se integra às iniciativas que já oferece.",
  },
  {
    question: "Como solicitar uma proposta?",
    answer:
      "Preencha o formulário para abrir uma mensagem pré-preenchida no WhatsApp oficial. Nada é enviado automaticamente: você revisa a mensagem e decide se quer enviá-la.",
  },
];

export const Route = createFileRoute("/empresas")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Buzzini Empresas — Corrida para sua equipe" },
      {
        name: "description",
        content:
          "Mais movimento na rotina. Mais saúde para sua equipe. Conheça a proposta Buzzini Empresas e converse com nossa equipe pelo WhatsApp oficial.",
      },
      { property: "og:title", content: "Buzzini Empresas — Corrida para sua equipe" },
      {
        property: "og:description",
        content:
          "Uma proposta de corrida para empresas, acolhendo diferentes níveis de experiência e construída em conjunto.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://buzzinisports.lovable.app/empresas" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://buzzinisports.lovable.app/empresas" }],
  }),
  component: EmpresasPage,
});

const operationSteps = [
  {
    title: "A empresa contrata",
    text: "Define o modelo de subsídio, as regras e a quantidade de participantes.",
  },
  {
    title: "O colaborador adere",
    text: "Conhece o benefício e decide voluntariamente participar.",
  },
  {
    title: "O custo é compartilhado",
    text: "O colaborador paga sua parte e a empresa subsidia o restante, conforme as condições acordadas.",
  },
  {
    title: "A Buzzini oferece a assessoria",
    text: "O colaborador utiliza os serviços previstos no contrato corporativo.",
  },
];

const rhBenefits = [
  {
    icon: HeartPulse,
    title: "Previsibilidade financeira",
    text: "Investimento mensal calculado por participante, conforme a proposta comercial.",
  },
  {
    icon: UsersRound,
    title: "Adesão voluntária",
    text: "Cada colaborador decide se deseja participar do benefício.",
  },
  {
    icon: HeartHandshake,
    title: "Implantação organizada",
    text: "Definição do fluxo com RH e folha de pagamento antes do início.",
  },
  {
    icon: Sparkles,
    title: "Escalabilidade",
    text: "Condições comerciais podem variar conforme o volume de participantes ativos.",
  },
  {
    icon: ShieldCheck,
    title: "Bem-estar",
    text: "Incentivo à prática esportiva com orientação profissional, conforme o contrato.",
  },
];

const commercialSteps = [
  ["01", "Solicitação de contato", "A empresa envia seus dados pelo WhatsApp oficial."],
  ["02", "Entendimento do perfil", "A Buzzini conhece o perfil e a quantidade de funcionários."],
  [
    "03",
    "Avaliação e proposta",
    "As partes avaliam a adesão potencial e definem uma proposta personalizada.",
  ],
  [
    "04",
    "Aprovação e divulgação",
    "A empresa aprova as condições e organiza a divulgação interna.",
  ],
  ["05", "Implantação", "O benefício é implantado conforme o contrato."],
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary sm:text-xs">
      {children}
    </p>
  );
}

function NumberedHeading({
  number,
  eyebrow,
  title,
  id,
}: {
  number: string;
  eyebrow: string;
  title: string;
  id: string;
}) {
  return (
    <div>
      <Eyebrow>
        {number} / {eyebrow}
      </Eyebrow>
      <h2
        id={id}
        className="mt-4 max-w-[19ch] font-display text-3xl font-semibold leading-tight text-balance sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
    </div>
  );
}

function EmpresasPage() {
  const [consent, setConsent] = useState(false);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      "Olá, quero conversar sobre a Buzzini Empresas.",
      "",
      `Nome: ${formData.get("name")}`,
      `E-mail corporativo: ${formData.get("email")}`,
      `Empresa: ${formData.get("company")}`,
      `Cargo: ${formData.get("role")}`,
      `Telefone: ${formData.get("phone") || "Não informado"}`,
      `Participantes estimados: ${formData.get("participants")}`,
      `Cidade e estado: ${formData.get("location")}`,
      `Mensagem: ${formData.get("message") || "Não informada"}`,
    ].join("\n");
    window.location.assign(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <a
        href="#conteudo"
        className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:font-bold focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>

      <header className="absolute inset-x-0 top-0 z-20">
        <nav
          aria-label="Navegação principal"
          className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-10 lg:px-14"
        >
          <a href="#inicio" aria-label="Buzzini Sports — início">
            <img src={buzziniLogo} alt="Buzzini Sports" className="h-10 w-auto sm:h-12" />
          </a>
          <div className="flex items-center gap-3 sm:gap-6">
            <a
              href="#como-funciona"
              className="hidden text-xs font-semibold text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:inline-flex"
            >
              Como funciona
            </a>
            <a
              href="#contato"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-5"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              <span>Fale com a equipe</span>
            </a>
          </div>
        </nav>
      </header>

      {/* 1 — Hero */}
      <section
        id="inicio"
        className="relative flex min-h-[max(44rem,100svh)] items-end overflow-hidden bg-[#090b10] sm:items-center"
      >
        <picture className="absolute inset-0">
          <source media="(max-width: 767px)" srcSet={heroRunner960} />
          <img
            src={heroRunner1600}
            alt="Grupo diverso de corredores reunido em uma prova ao ar livre"
            width={1600}
            height={1067}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[58%_center] sm:object-center"
          />
        </picture>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,11,16,0.90)_0%,rgba(9,11,16,0.68)_52%,rgba(9,11,16,0.28)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/55 to-transparent sm:hidden"
        />
        <div
          id="conteudo"
          className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-36 sm:px-10 sm:py-36 lg:px-14"
        >
          <div className="max-w-3xl">
            <Eyebrow>Buzzini Sports apresenta · Empresas</Eyebrow>
            <h1 className="mt-5 max-w-[16ch] font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-balance text-white sm:text-6xl lg:text-7xl">
              Mais movimento na rotina. Mais saúde para sua equipe.
            </h1>
            <p className="mt-6 max-w-[53ch] text-base leading-relaxed text-white/85 text-pretty sm:text-lg">
              Ofereça assessoria de corrida como benefício corporativo, com acompanhamento
              profissional e um modelo de coparticipação entre empresa e colaborador.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contato"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Quero levar a Buzzini para minha empresa
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
              <a
                href="#contato"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Solicitar uma simulação
                <ArrowDown aria-hidden="true" className="size-4" />
              </a>
            </div>
            <p className="mt-5 text-xs text-white/70">
              Uma proposta com participação voluntária e investimento compartilhado.
            </p>
          </div>
        </div>
      </section>

      {/* 2 — Diferenciais */}
      <section
        aria-labelledby="diferenciais-titulo"
        className="px-5 py-20 sm:px-10 sm:py-28 lg:px-14"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <NumberedHeading
            number="02"
            eyebrow="A proposta"
            id="diferenciais-titulo"
            title="Corrida pensada para a realidade da sua empresa."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              [
                "Atividade física e bem-estar",
                "Um benefício para incentivar a prática de atividade física com orientação profissional.",
              ],
              [
                "Custo compartilhado",
                "Empresa e colaborador dividem o investimento conforme as condições acordadas.",
              ],
              [
                "Investimento ajustável à adesão",
                "O subsídio por participante pode variar conforme a quantidade de inscritos.",
              ],
              [
                "Para diferentes experiências",
                "A proposta pode contemplar pessoas iniciantes e também quem já corre.",
              ],
              [
                "Qualidade de vida em pauta",
                "Uma oportunidade de fortalecer as iniciativas internas de bem-estar.",
              ],
            ].map(([title, text], index) => (
              <article
                key={title}
                className="rounded-2xl border border-border bg-card/70 p-5 sm:p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {index === 0 ? (
                    <Handshake aria-hidden="true" className="size-5" />
                  ) : index === 1 || index === 3 ? (
                    <UsersRound aria-hidden="true" className="size-5" />
                  ) : (
                    <ShieldCheck aria-hidden="true" className="size-5" />
                  )}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Operação: exatamente quatro passos */}
      <section
        id="como-funciona"
        aria-labelledby="operacao-titulo"
        className="border-y border-border/70 bg-card/45 px-5 py-20 sm:px-10 sm:py-28 lg:px-14"
      >
        <div className="mx-auto max-w-7xl">
          <NumberedHeading
            number="03"
            eyebrow="Como funciona"
            id="operacao-titulo"
            title="Quatro passos para construir a proposta."
          />
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {operationSteps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-border bg-background p-6">
                <span className="font-mono text-sm font-bold tracking-[0.14em] text-primary">
                  0{index + 1}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4 — Coparticipação */}
      <section
        aria-labelledby="coparticipacao-titulo"
        className="px-5 py-20 sm:px-10 sm:py-28 lg:px-14"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20">
          <div>
            <NumberedHeading
              number="04"
              eyebrow="Coparticipação"
              id="coparticipacao-titulo"
              title="Um exemplo para entender a divisão."
            />
            <p className="mt-5 max-w-[55ch] text-sm leading-relaxed text-muted sm:text-base">
              A contribuição da pessoa colaboradora pode ser complementada pela empresa. O
              complemento varia conforme a faixa comercial definida na proposta. Com maior adesão, a
              empresa pode ter acesso a condições comerciais melhores; solicite uma simulação
              personalizada para conhecer as possibilidades.
            </p>
          </div>
          <div className="rounded-3xl border-2 border-primary/60 bg-[radial-gradient(circle_at_90%_0%,rgba(249,115,22,0.14),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))] p-5 sm:p-8">
            <div className="rounded-xl border border-primary/50 bg-primary/10 p-4 sm:p-5">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-primary">
                Importante · não é preço comercial definitivo
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                Os valores abaixo são apenas ilustrativos. Não representam tabela de preços, oferta
                ou condição comercial da Buzzini Sports.
              </p>
            </div>
            <div className="mt-5 rounded-xl border border-border bg-background/80 p-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                Referência ilustrativa mensal
              </p>
              <p className="mt-2 font-display text-3xl font-semibold sm:text-4xl">R$ 120,00</p>
              <p className="mt-1 text-sm text-muted">valor individual de referência por mês</p>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-background/80 p-4">
                <p className="text-xs text-muted">Colaborador · exemplo</p>
                <p className="mt-1 font-display text-2xl font-semibold">R$ 60,00/mês</p>
              </div>
              <div className="rounded-xl bg-background/80 p-4">
                <p className="text-xs text-muted">Complemento da empresa</p>
                <p className="mt-1 font-display text-base font-semibold text-primary">
                  Conforme faixa comercial
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              O valor de referência e a contribuição da empresa não fixam preço nem divisão final.
              Os termos reais serão apresentados e confirmados na proposta comercial.
            </p>
          </div>
        </div>
      </section>

      {/* 5 — Benefícios para RH */}
      <section
        aria-labelledby="rh-titulo"
        className="border-y border-border/70 bg-card/45 px-5 py-20 sm:px-10 sm:py-28 lg:px-14"
      >
        <div className="mx-auto max-w-7xl">
          <NumberedHeading
            number="05"
            eyebrow="Benefícios para RH"
            id="rh-titulo"
            title="Movimento que pode fazer parte da cultura."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">
            {rhBenefits.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-border bg-background p-5">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold leading-snug">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted">
            Possíveis benefícios dependem da adesão, do contexto e do formato aprovado; não são
            resultados garantidos.
          </p>
        </div>
      </section>

      {/* 6 — Diferentes experiências, com fotografia existente */}
      <section
        aria-labelledby="experiencia-titulo"
        className="px-5 py-20 sm:px-10 sm:py-28 lg:px-14"
      >
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div className="overflow-hidden rounded-3xl border border-border">
            <img
              src={teamPhoto}
              alt="Equipe Buzzini participando de uma corrida de rua"
              width={1600}
              height={1067}
              loading="lazy"
              decoding="async"
              className="max-h-[36rem] w-full object-cover object-center"
            />
          </div>
          <div>
            <NumberedHeading
              number="06"
              eyebrow="Diferentes experiências"
              id="experiencia-titulo"
              title="Cada pessoa tem seu próprio ponto de partida."
            />
            <p className="mt-5 max-w-[55ch] text-sm leading-relaxed text-muted sm:text-base">
              A proposta pode receber quem está começando e quem já tem experiência com corrida. A
              empresa e a equipe Buzzini alinham quais níveis e formatos são viáveis antes de
              confirmar o programa.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                ["Primeiros passos", "Para quem quer começar a se movimentar."],
                ["Voltando à corrida", "Para quem está retomando depois de uma pausa."],
                ["Corrida na rotina", "Para quem já corre e quer participar com a equipe."],
                ["Mais experiência", "Objetivos e necessidades são conversados na proposta."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-xl border border-border bg-card p-4">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              As descrições indicam perfis, não níveis técnicos ou serviços contratados. O escopo é
              confirmado comercialmente.
            </p>
          </div>
        </div>
      </section>

      {/* 7 — Processo comercial completo */}
      <section
        aria-labelledby="comercial-titulo"
        className="border-y border-border/70 bg-card/45 px-5 py-20 sm:px-10 sm:py-28 lg:px-14"
      >
        <div className="mx-auto max-w-7xl">
          <NumberedHeading
            number="07"
            eyebrow="Etapas comerciais"
            id="comercial-titulo"
            title="Da primeira mensagem à decisão."
          />
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">
            {commercialSteps.map(([number, title, text]) => (
              <li key={number} className="rounded-2xl border border-border bg-background p-5">
                <p className="font-mono text-sm font-bold text-primary">{number}</p>
                <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8 — Oito perguntas */}
      <section
        id="duvidas"
        aria-labelledby="duvidas-titulo"
        className="px-5 py-20 sm:px-10 sm:py-28 lg:px-14"
      >
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <NumberedHeading
              number="08"
              eyebrow="Perguntas frequentes"
              id="duvidas-titulo"
              title="O que vale saber antes de conversar."
            />
            <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-muted">
              Os detalhes comerciais e operacionais são confirmados pela equipe antes da
              contratação.
            </p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {faqs.map(({ question, answer }) => (
              <details key={question} className="group">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-left font-semibold marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
                  {question}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180 motion-reduce:transition-none"
                  />
                </summary>
                <p className="max-w-[68ch] pb-5 pr-8 text-sm leading-relaxed text-muted">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — Formulário que prepara uma mensagem, não envia */}
      <section
        id="contato"
        aria-labelledby="contato-titulo"
        className="border-y border-primary/20 bg-card/60 px-5 py-20 sm:px-10 sm:py-28 lg:px-14"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <NumberedHeading
              number="09"
              eyebrow="Converse com a equipe"
              id="contato-titulo"
              title="Vamos levar mais movimento para sua empresa?"
            />
            <p className="mt-5 max-w-[45ch] text-sm leading-relaxed text-muted sm:text-base">
              Conte um pouco sobre sua empresa e nossa equipe poderá apresentar uma proposta
              adequada ao seu perfil.
            </p>
            <p className="mt-3 max-w-[45ch] text-sm leading-relaxed text-muted">
              Ao continuar, abriremos o WhatsApp oficial com uma mensagem preenchida pelos dados
              abaixo. Você poderá revisar e escolher se deseja enviá-la; o site não faz envio
              automático.
            </p>
            <p className="mt-4 max-w-[48ch] text-xs leading-relaxed text-muted">
              Este site não salva nem envia os dados do formulário para um servidor. Eles serão
              incluídos na mensagem preparada para o WhatsApp e só serão compartilhados com a
              Buzzini se você optar por enviá-la. Ao usar o WhatsApp, também se aplicam as condições
              de privacidade do próprio serviço.
            </p>
            <p className="mt-4 rounded-lg border border-border bg-background/70 p-3 text-xs leading-relaxed text-muted">
              Política de privacidade própria da Buzzini: não foi localizada uma URL oficial
              confirmada para apresentar aqui. Solicite essa informação à empresa antes de enviar
              dados pessoais, se necessário.
            </p>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="grid gap-4 rounded-2xl border border-border bg-background p-5 sm:grid-cols-2 sm:p-7"
          >
            <label className="grid gap-2 text-sm font-semibold">
              Seu nome <span className="text-primary">*</span>
              <input
                name="name"
                autoComplete="name"
                required
                className="min-h-11 rounded-lg border border-border bg-card px-3 font-normal text-foreground outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="Nome e sobrenome"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              E-mail corporativo <span className="text-primary">*</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-h-11 rounded-lg border border-border bg-card px-3 font-normal text-foreground outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="voce@empresa.com.br"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Empresa <span className="text-primary">*</span>
              <input
                name="company"
                autoComplete="organization"
                required
                className="min-h-11 rounded-lg border border-border bg-card px-3 font-normal text-foreground outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="Nome da empresa"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Cargo <span className="text-primary">*</span>
              <input
                name="role"
                autoComplete="organization-title"
                required
                className="min-h-11 rounded-lg border border-border bg-card px-3 font-normal text-foreground outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="Ex.: Recursos Humanos"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Telefone para retorno <span className="font-normal text-muted">(opcional)</span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                className="min-h-11 rounded-lg border border-border bg-card px-3 font-normal text-foreground outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="(00) 00000-0000"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Cidade e estado <span className="text-primary">*</span>
              <input
                name="location"
                autoComplete="address-level2"
                required
                className="min-h-11 rounded-lg border border-border bg-card px-3 font-normal text-foreground outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="Cidade - UF"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
              Participantes estimados <span className="text-primary">*</span>
              <select
                name="participants"
                required
                defaultValue=""
                className="min-h-11 rounded-lg border border-border bg-card px-3 font-normal text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="" disabled>
                  Selecione uma faixa
                </option>
                <option>1–10 pessoas</option>
                <option>11–30 pessoas</option>
                <option>31–100 pessoas</option>
                <option>Mais de 100 pessoas</option>
                <option>Ainda não sabemos</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
              O que gostaria de conversar?{" "}
              <span className="font-normal text-muted">(opcional)</span>
              <textarea
                name="message"
                rows={4}
                maxLength={600}
                className="resize-y rounded-lg border border-border bg-card px-3 py-3 font-normal text-foreground outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="Conte brevemente o que sua empresa procura."
              />
            </label>
            <label className="flex items-start gap-3 text-xs leading-relaxed text-muted sm:col-span-2">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                required
                className="mt-0.5 size-4 shrink-0 accent-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              <span>
                Estou ciente de que, ao continuar, os dados acima serão inseridos em uma mensagem
                para o WhatsApp oficial. O site não envia a mensagem: poderei revisar e só será
                compartilhada se eu tocar em enviar no WhatsApp. Li o aviso sobre a política de
                privacidade não localizada. <span className="text-primary">*</span>
              </span>
            </label>
            <button
              type="submit"
              disabled={!consent}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2 sm:justify-self-start"
            >
              Solicitar contato comercial
              <MoveUpRight aria-hidden="true" className="size-4" />
            </button>
            <p className="text-xs leading-relaxed text-muted sm:col-span-2">
              Nenhuma mensagem será enviada automaticamente. O WhatsApp pode abrir em outra tela;
              revise o texto e envie manualmente se desejar.
            </p>
          </form>
        </div>
      </section>

      {/* 10 — Rodapé */}
      <footer className="bg-[#111113] px-5 py-8 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <a href="#inicio" aria-label="Buzzini Sports — voltar ao início">
              <img src={buzziniLogo} alt="Buzzini Sports" className="h-9 w-auto" />
            </a>
            <p className="mt-2 text-xs text-muted">
              10 / Buzzini Empresas · Corrida para todos os ritmos.
            </p>
          </div>
          <a
            href="https://www.instagram.com/buzzinisports/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-white/75 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Instagram Buzzini Sports
            <MoveUpRight aria-hidden="true" className="size-3.5" />
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-white/75 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            WhatsApp Buzzini Sports
            <MoveUpRight aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </footer>
    </main>
  );
}
