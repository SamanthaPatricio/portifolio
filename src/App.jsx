import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  MousePointerClick,
  Rocket,
  Sun,
  Moon,
} from "lucide-react";

/* ===================== DADOS ===================== */
const ME = {
  nome: "Samantha Patrício",
  titulo: "RH • Estratégia • Cultura • Design de Experiências",
  bio:
    "Sou Samantha Patrício, 26. RH Generalista há 7 anos; implementei RH do zero, estruturando subsistemas, rotinas e indicadores. Atuação estratégica, alinhando cultura e objetivos do negócio, com foco em experiência do colaborador, eficiência e leitura de dados. Aberta a novos desafios em RH (generalista/estratégico, BP, cultura, desenvolvimento, people analytics e organização de processos).",
  email: "samanthapatricio39@gmail.com",
  github: "https://github.com/SamanthaPatricio",
  linkedin: "https://www.linkedin.com/in/samanthapatricio/",
  cidades: ["Curitiba", "Santa Catarina", "Brasil"],
  logo: "/logo.png", // public/logo.png
};

const PROJETOS = [
  {
    titulo: "Playbook de Onboarding com Cultura Viva",
    descricao:
      "Onboarding interativo (microlearning, rituais e métricas de adaptação).",
    tags: ["RH Estratégico", "Onboarding", "Métricas"],
    link: "#",
  },
  {
    titulo: "Arquitetura de Cultura & Espaço",
    descricao:
      "Diretrizes para layout, ergonomia, psicologia das cores e rituais de equipe.",
    tags: ["Arquitetura Corporativa", "Ergonomia", "Branding"],
    link: "#",
  },
  {
    titulo: "Livro: Por que os RHs adoecem",
    descricao:
      "Obra autoral com análise antropológica, psicológica e socioeconômica.",
    tags: ["Livro", "Pesquisa", "Ensaios"],
    link: "#",
  },
];

const LIVROS = [
  {
    titulo: "Como Implementar um Setor de RH Estratégico",
    link:
      "https://www.amazon.com.br/Como-Implementar-Setor-RH-Estrat%C3%A9gico-ebook/dp/B0FBY5S5YW",
    capa: "https://m.media-amazon.com/images/I/61f8jkvibKL._SY466_.jpg",
  },
  {
    titulo: "METODOLOGIA C.I.R.C.U.L.O",
    link:
      "https://www.amazon.com.br/METODOLOGIA-C-I-R-C-U-L-SAMANTHA-PATR%C3%8DCIO-ebook/dp/B0FDJN7TSQ",
    capa:
      "https://m.media-amazon.com/images/I/31X7RaCqo9L._SY445_SX342_ControlCacheEqualizer_.jpg",
  },
];

const PRODUTOS = [
  {
    titulo: "Planilha — Análise SWOT",
    sub: "Ferramenta prática para diagnóstico estratégico",
    link: "https://lnkd.in/e6fGsFac",
  },
  {
    titulo: "Planilha — Cargos & Salários",
    sub: "Estruture trilhas e faixas salariais",
    link: "https://go.hotmart.com/P98376571U",
  },
  {
    titulo: "Kit — Planilhas de Marketing",
    sub: "Conjunto de planilhas para gestão e growth",
    link: "https://go.hotmart.com/I98391084X",
  },
];

const SKILLS = [
  "People Analytics",
  "Recrutamento & Seleção",
  "Cultura & Clima",
  "Arquitetura Corporativa",
  "Comunicação Não-Violenta",
  "Liderança (1ª posição)",
  "Design de Aprendizagem",
  "OKRs & KPIs",
  "Power BI / Excel",
];

/* ======= Cursos RH — destaques (chips) ======= */
const CURSOS_RH_DESTAQUE = [
  "Consultora Sólides — Profiler (Analista Comportamental)",
  "Analista DISC e Empreendimento",
  "Analista de RH",
  "Analista de Departamento Pessoal",
  "Cargos & Salários",
  "Inovação de RH com IA (imersão)",
  "Microsoft Power BI para RH",
  "Reforma Trabalhista e Direito do Trabalho",
  "NR1 • NR5 • NR18 • NR33 • NR35 (SST, Segurança & Ergonomia)",
  "Endomarketing & Marketing Digital",
  "Gestão Financeira & Logística",
  "DP em Ação 2024",
  "Open Mind 2025",
  "A Ciência da Felicidade (BerkeleyX)",
  "Avaliação de Valores (UPValenciaX)",
  "Gestão de Pessoas: RH (UNCordobaX)",
  "Inteligência Emocional e Liderança (AnahuacX)",
  "Strategic HR Management (StellenBoschX)",
  "Liderança — Daniel Spinelli",
  "Organizational Psychology (UCX)",
  "ESG e Créditos de Carbono",
  "Libras — Básico",
];

/* ======= Currículo — conforme combinado ======= */
const GRADUACOES = [
  { periodo: "2024–2026", titulo: "Tecnólogo em Recursos Humanos — em andamento" },
  {
    periodo: "2024–2028",
    titulo: "Arquitetura e Urbanismo — Unicesumar (PROUNI — Bolsa 100%)",
  },
];

const OUTRAS_FORMACOES_PRINCIPAIS = [
  "Biomedicina (4 anos).",
  "USP/ICB: Biotecnologia; Bioética; Bioterismo; Modelagem Molecular (GBI Hands On); Radiobiologia; Bioimpressão 3D; Orientação no Lab. de Controle Sanitário e Genético (ICB II).",
  "UFV: Auxiliar de Biotecnologia.",
  "Harvard (edX): Bioética para pesquisa em ciências da vida.",
  "UFSC: Neuroanatomia e Neurofisiologia.",
  "Univali: 1 ano de Fonoaudiologia; 1 ano de Publicidade e Propaganda; Simpósio “Revisão ética em pesquisas com seres humanos”.",
];

const EVENTOS = [
  "CONCARH — 2024 e 2025",
  "RH Experience 2025 — Mentoria Renato Moreira",
  "Open Mind 2025",
  "Logistique 2025",
  "Casacor — 2024 e 2025",
  "Participação no Radiosimpósio II",
  "Práticas de Aceleração de IA para RH — ABRH-SC (Vanessa Mosca)",
  "Silvana (Sil Fiora) Fioravanti — Felicidade, Liderança e Atendimento Disney (participei em 2024)",
];

const ASSOCIACOES = ["Associada ABRH – Itajaí/SC"];

const HOBBIES = [
  "Arquitetura (feng shui e paisagismo)",
  "Botânica e Herbologia",
  "Astrofísica e Cosmologia (UFSC — Prof. Alexandre Miers Zabot)",
  "Solloagro — USP (hobby/conhecimento paralelo)",
];

const TEC_CONHECIMENTOS = [
  "Sistemas: TOTVS Protheus, SGP, Chronos, Secullum, SOC, Escalasoft, RSYS, Sólides.",
  "Linguagens & dados: Python; noções de Java e HTML; Power BI (dashboards/relatórios).",
  "Marketing aplicado a RH: comunicação interna, endomarketing e employer branding.",
  "Office avançado (Excel, Word, PowerPoint).",
  "Inglês Avançado (Fisk).",
];

/* Rotinas e entregas — consolidadas (sem repetição) */
const ROTINAS_ENTREGAS = [
  "Estruturação completa do RH do zero para matriz e 3 filiais (duas no PR e uma no RS).",
  "Gestão de Benefícios (políticas, fornecedores, elegibilidade, comunicação e indicadores de uso).",
  "Relação PJ/terceiros (contratos, compliance, integração a fluxos e controles).",
  "KPIs/KPOs de RH (recrutamento, turnover, absenteísmo, T&D, clima, tempo de contratação, custo de pessoal etc.), dashboards e rotinas de análise.",
  "Indicadores de controle (SLA, aderência a processos, prazos legais) e pesquisa de clima com planos de ação.",
  "Cargos & Salários, trilhas e cenários de carreira.",
  "Abertura de filial no RS: compra de empresa, contratação, sindicato, alvará, CNPJ.",
  "Admissão, integração (manual, LGPD, uniformes, conta-salário), desligamento, folha, ponto, advertências, afastamentos, psicossocial.",
  "Implantação de processos de RH fim-a-fim; apoio à liderança em políticas, fluxos e cultura.",
  "T&D: NRs, CIPA, DDS, LNT, acompanhamento de PCMSO, LTCAT, PGR e planos de ação; brigada (treinamentos e atas).",
  "Ponto: SGP, Chronos, Secullum (filiais Recife-PE, Gravataí-RS, Itajaí e Navegantes) e cadastro no Escalasoft.",
  "Folha (importações/lançamentos), variáveis, benefícios, diárias de motoristas, férias, ASO, PCMSO.",
  "Vistorias (bombeiros), PPRA/ergonomia.",
  "Lançamento de documentos/guias, IRRF, INSS para o financeiro.",
  "Códigos de conduta e ética, pesquisa de clima, feedback de experiência.",
  "E-Social (consultas/envios); TOTVS/Protheus (admissão, contratos, carteira); SOC (exames).",
];

/* ===================== HELPERS ===================== */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

function useMouseParallax(multiplier = 0.05) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * multiplier;
      const y = (e.clientY - rect.top - rect.height / 2) * multiplier;
      setOffset({ x, y });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [multiplier]);
  return { ref, offset };
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300">
      {children}
    </span>
  );
}

/* ===================== THEME ===================== */
function useTheme() {
  const getInitial = () => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
    } catch {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };
  const [theme, setTheme] = useState(getInitial);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle };
}

/* ===================== NAV ===================== */
function Nav({ theme, toggleTheme }) {
  const links = [
    { id: "sobre", label: "Sobre" },
    { id: "projetos", label: "Projetos" },
    { id: "livros", label: "Livros" },
    { id: "produtos", label: "Produtos" },
    { id: "solides", label: "Sólides" },
    { id: "formacao", label: "Currículo" },
    { id: "contato", label: "Contato" },
  ];
  return (
    <nav className="fixed inset-x-0 top-4 z-50 mx-auto w-fit rounded-full border bg-white/70 dark:bg-neutral-900/60 dark:border-neutral-800 backdrop-blur px-3 md:px-4 py-2 shadow-soft">
      <ul className="flex items-center gap-3">
        <li className="hidden md:block">
          <a href="#sobre" className="flex items-center gap-2 pr-2">
            {ME.logo && (
              <img src={ME.logo} alt="logo" className="h-7 w-7 object-contain" />
            )}
          </a>
        </li>
        {links.map((l) => (
          <li key={l.id}>
            <a href={`#${l.id}`} className="text-sm hover:opacity-70">
              {l.label}
            </a>
          </li>
        ))}
        <li className="pl-1">
          <button
            onClick={toggleTheme}
            className="rounded-full border px-2 py-1 text-xs hover:opacity-80 dark:border-neutral-700"
            title="Alternar tema"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </li>
      </ul>
    </nav>
  );
}

/* ===================== HERO ===================== */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.94]);
  const { ref, offset } = useMouseParallax(0.05);

  return (
    <section
      id="sobre"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, scale }} className="relative z-10 max-w-4xl text-center px-6">
        {ME.logo && (
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={ME.logo}
            alt="Logotipo"
            className="mx-auto mb-4 h-28 w-auto md:h-36 object-contain"
          />
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          {ME.nome}
        </motion.h1>
        <motion.p className="mt-2 text-lg md:text-xl opacity-80">{ME.titulo}</motion.p>
        <motion.p className="mt-4 text-sm md:text-base opacity-70">{ME.bio}</motion.p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Badge>{ME.cidades.join(" • ")}</Badge>
          <Badge>Disponível para projetos</Badge>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#projetos"
            className="inline-flex items-center gap-2 rounded-full border bg-brand-700 text-white px-4 py-2 text-sm hover:opacity-90"
          >
            Ver projetos <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${ME.email}`}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-black hover:text-white"
          >
            Fale comigo <Mail className="h-4 w-4" />
          </a>
          <a
            href={ME.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-black hover:text-white"
          >
            LinkedIn <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={ME.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-black hover:text-white"
          >
            GitHub <Github className="h-4 w-4" />
          </a>
        </div>
      </motion.div>

      {/* bolhas */}
      <motion.div
        className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl"
        style={{
          x: offset.x,
          y: offset.y,
          background:
            "radial-gradient(600px circle at 50% 50%, rgba(157,124,43,.20), transparent 60%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "radial-gradient(600px circle at 50% 50%, rgba(157,124,43,.12), transparent 60%)",
        }}
      />

      <div className="absolute bottom-10 flex items-center gap-2 opacity-60">
        <MousePointerClick className="h-4 w-4" />
        <span className="text-xs">Passe o mouse, role, clique</span>
      </div>
    </section>
  );
}

/* ===================== PROJETOS ===================== */
function Projetos() {
  return (
    <section id="projetos" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold text-brand-700 dark:text-white">
          Projetos em Destaque
        </h2>
        <div className="text-sm opacity-70">clique para saber mais</div>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PROJETOS.map((p, i) => (
          <motion.a
            key={i}
            variants={item}
            href={p.link}
            className="group h-full rounded-2xl border transition-transform duration-300 group-hover:-translate-y-1 p-4"
          >
            <div className="flex items-center gap-2 text-base font-medium">
              <Rocket className="h-5 w-5 text-brand-700" /> {p.titulo}
            </div>
            <p className="mt-2 text-sm opacity-80">{p.descricao}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t, j) => (
                <Badge key={j}>{t}</Badge>
              ))}
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

/* ===================== Book 3D ===================== */
function Book3D({ capa, titulo, link }) {
  const [open, setOpen] = useState(false);
  const openCover = { rotateY: -160 };
  const closeCover = { rotateY: 0 };
  const openFirstPage = { rotateY: -18, x: 2 };
  const closeFirstPage = { rotateY: -180, x: 0 };

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      title="Ver na Amazon"
      className="group relative w-[220px] sm:w-[240px] h-[300px] sm:h-[320px] perspective-1000"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((s) => !s)}
    >
      <div className="absolute inset-0 rounded-xl bg-white dark:bg-neutral-900 shadow" />
      <motion.div
        className="absolute inset-0 origin-left rounded-xl bg-white dark:bg-neutral-900 shadow"
        style={{ backfaceVisibility: "hidden" }}
        initial={closeFirstPage}
        animate={open ? openFirstPage : closeFirstPage}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
      >
        <div className="w-full h-full rounded-xl grid place-items-center p-4">
          <span className="text-xs opacity-70 text-center px-2">{titulo}</span>
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0 origin-left rounded-xl bg-white dark:bg-neutral-900 shadow-xl"
        style={{ backfaceVisibility: "hidden" }}
        initial={closeCover}
        animate={open ? openCover : closeCover}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
      >
        <div className="w-full h-full rounded-xl grid place-items-center p-3">
          <img src={capa} alt={titulo} className="max-h-[82%] object-contain" />
          <p className="mt-2 text-[11px] text-center opacity-85 px-2">{titulo}</p>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-black/15 to-transparent pointer-events-none" />
      </motion.div>
    </a>
  );
}

/* ===================== LIVROS ===================== */
function BooksSection() {
  return (
    <section id="livros" className="py-12 mx-auto max-w-6xl px-6">
      <h2 className="text-2xl font-semibold mb-6 text-brand-700 dark:text-white">Livros</h2>
      <div className="flex flex-wrap gap-10">
        {LIVROS.map((b) => (
          <Book3D key={b.titulo} {...b} />
        ))}
      </div>
    </section>
  );
}

/* ===================== PRODUTOS ===================== */
function Produtos() {
  return (
    <section id="produtos" className="py-12 mx-auto max-w-6xl px-6">
      <h2 className="text-2xl font-semibold mb-6 text-brand-700 dark:text-white">
        Produtos & Planilhas
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUTOS.map((p) => (
          <li key={p.titulo}>
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl border p-4 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
            >
              <div className="font-medium">{p.titulo}</div>
              <div className="text-xs opacity-70">{p.sub}</div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ===================== SKILLS MARQUEE ===================== */
function SkillsMarquee() {
  return (
    <section id="skills" className="bg-gray-100 dark:bg-neutral-900/40 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <h3 className="mb-6 text-xl font-semibold">Stack & Competências</h3>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: [0, -800] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {SKILLS.concat(SKILLS).map((s, i) => (
              <span key={i} className="rounded-full border px-4 py-2 text-sm opacity-80">
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ===================== SÓLIDES / PROFILER ===================== */
function SolidesProfiler() {
  return (
    <section id="solides" className="mx-auto max-w-6xl px-6 py-16">
      <h3 className="mb-6 text-xl font-semibold">Sólides • Profiler (Analista Comportamental)</h3>
      <p className="opacity-80 text-sm">
        Consultoria para mapeamento comportamental, cultura e performance. Aplicação do Profiler
        (Sólides), leitura de times, desenho de trilhas de desenvolvimento, alinhamento com
        indicadores e rituais de gestão.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {CURSOS_RH_DESTAQUE.slice(0, 10).map((c) => (
          <span key={c} className="rounded-full border px-3 py-1 text-xs">
            {c}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`mailto:${ME.email}?subject=Orçamento%20Sólides%20Profiler&body=Conte%20um%20pouco%20sobre%20o%20escopo,%20prazos%20e%20tamanho%20do%20time.`}
          className="inline-flex items-center gap-2 rounded-full border bg-brand-700 text-white px-4 py-2 text-sm hover:opacity-90"
        >
          Pedir orçamento <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href={ME.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-black hover:text-white"
        >
          Ver no LinkedIn <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

/* ===================== CURRÍCULO COMPLETO (RESUMIDO AQUI) ===================== */
function Curriculo() {
  return (
    <section id="formacao" className="mx-auto max-w-6xl px-6 py-16">
      <h3 className="mb-6 text-xl font-semibold">Currículo — Formação & Experiência</h3>

      {/* Graduações */}
      <div className="rounded-2xl border p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">Graduações</h4>
          <a
            className="text-xs underline hover:opacity-80"
            href="/curriculo.html"
            target="_blank"
            rel="noreferrer"
          >
            Currículo completo →
          </a>
        </div>
        <ul className="space-y-2 text-sm">
          {GRADUACOES.map((g) => (
            <li key={g.titulo}>
              <span className="opacity-60 mr-2">{g.periodo}</span> {g.titulo}
            </li>
          ))}
        </ul>
      </div>

      {/* Outras Formações */}
      <div className="rounded-2xl border p-5 mb-6">
        <h4 className="font-medium mb-3">Outras formações — principais</h4>
        <ul className="list-disc pl-5 text-sm space-y-1">
          {OUTRAS_FORMACOES_PRINCIPAIS.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>

      {/* Cursos RH */}
      <div className="rounded-2xl border p-5 mb-6">
        <h4 className="font-medium mb-3">Cursos de RH (seleção)</h4>
        <div className="flex flex-wrap gap-2">
          {CURSOS_RH_DESTAQUE.map((c) => (
            <span key={c} className="rounded-full border px-3 py-1 text-xs">
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Conhecimentos Técnicos */}
      <div className="rounded-2xl border p-5 mb-6">
        <h4 className="font-medium mb-3">Conhecimentos técnicos</h4>
        <ul className="list-disc pl-5 text-sm space-y-1">
          {TEC_CONHECIMENTOS.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

      {/* Rotinas e Entregas */}
      <div className="rounded-2xl border p-5 mb-6">
        <h4 className="font-medium mb-3">Rotinas e entregas (experiência prática consolidada)</h4>
        <ul className="list-disc pl-5 text-sm space-y-1">
          {ROTINAS_ENTREGAS.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

      {/* Eventos & participações */}
      <div className="rounded-2xl border p-5 mb-6">
        <h4 className="font-medium mb-3">Eventos & Participações</h4>
        <ul className="list-disc pl-5 text-sm space-y-1">
          {EVENTOS.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>

      {/* Associações */}
      <div className="rounded-2xl border p-5 mb-6">
        <h4 className="font-medium mb-3">Associações profissionais</h4>
        <ul className="list-disc pl-5 text-sm space-y-1">
          {ASSOCIACOES.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>

      {/* Hobbies */}
      <div className="rounded-2xl border p-5">
        <h4 className="font-medium mb-3">Hobbies & conhecimentos paralelos</h4>
        <div className="flex flex-wrap gap-2">
          {HOBBIES.map((h) => (
            <span key={h} className="rounded-full border px-3 py-1 text-xs">
              {h}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== CONTATO ===================== */
function Contato() {
  return (
    <section id="contato" className="mx-auto max-w-3xl px-6 py-16">
      <h3 className="mb-4 text-xl font-semibold">Contato</h3>
      <p className="opacity-80 text-sm">
        Curtiu o portfólio? Me escreva com o assunto <strong>“Projeto”</strong> e conte seu desafio
        em 4–6 linhas.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`mailto:${ME.email}`}
          className="inline-flex items-center gap-2 rounded-full border bg-brand-700 text-white px-4 py-2 text-sm hover:opacity-90"
        >
          Mandar e-mail <Mail className="h-4 w-4" />
        </a>
        <a
          href={ME.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-black hover:text-white"
        >
          Conectar no LinkedIn <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

/* ===================== APP ===================== */
export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0c0c0c] text-gray-900 dark:text-gray-100 antialiased">
      <Nav theme={theme} toggleTheme={toggle} />
      <Hero />
      <Projetos />
      <BooksSection />
      <Produtos />
      <SkillsMarquee />
      <SolidesProfiler />
      <Curriculo />
      <Contato />
      <footer className="mx-auto max-w-6xl px-6 py-10 text-xs opacity-60">
        © {new Date().getFullYear()} {ME.nome}. Feito com React + Framer Motion + Tailwind.
      </footer>
    </div>
  );
}
// Importe o Contador (adicione esta linha com as importações existentes)
import Contador from './components/ui/Contador';

function App() {
  return (
    // Seu JSX existente aqui...
    // Adicione o componente <Contador /> onde desejar
    <>
      {/* ... outro conteúdo da sua página ... */}
      <Contador />
      {/* ... outro conteúdo da sua página ... */}
    </>
  )
}

export default App
