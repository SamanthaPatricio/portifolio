// src/App.jsx
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
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

/* ===================== CONFIG BÁSICA ===================== */
const ME = {
  nome: "Samantha Patrício",
  titulo: "RH • Estratégia • Cultura • Design de Experiências",
  bio:
    "Sou Samantha Patrício, 26 anos. Atuo como RH Generalista há 7 anos e já implementei o RH do zero, estruturando subsistemas, rotinas e indicadores. Minha atuação é estratégica, alinhando cultura e objetivos do negócio com foco em experiência do colaborador, eficiência e leitura de dados. Aberta a novos desafios em RH (generalista/estratégico, BP, cultura, desenvolvimento, people analytics e organização de processos).",
  email: "samanthapatricio39@gmail.com",
  github: "https://github.com/SamanthaPatricio",
  linkedin: "https://www.linkedin.com/in/samanthapatricio/",
  cidades: ["Curitiba", "Santa Catarina", "Brasil"],
  logo: "/logo.png", // coloque sua logo em public/logo.png
};

/* ===================== PROJETOS (exemplos) ===================== */
const PROJETOS = [
  {
    titulo: "Playbook de Onboarding com Cultura Viva",
    descricao:
      "Onboarding interativo com microlearning, rituais e métricas de adaptação.",
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

/* ===================== LIVROS ===================== */
/* Capas diretas da Amazon: mantemos dimensões consistentes */
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

/* ===================== PRODUTOS / PLANILHAS ===================== */
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

/* ===================== CURSOS DE RH (chips) ===================== */
const RH_CURSOS = [
  "Consultora Sólides – Profiler (Analista Comportamental)",
  "Analista DISC e Empreendimento",
  "Analista de RH",
  "Analista de Departamento Pessoal",
  "Cargos & Salários",
  "Inovação de RH com IA (imersão)",
  "Microsoft Power BI para RH",
  "Diploma Course in HRM",
  "Reforma Trabalhista • Direito do Trabalho",
  "NR1 (Saúde mental), NR5, NR18, NR33, NR35",
  "Endomarketing & Marketing Digital",
  "Gestão Financeira & Logística",
  "DP em Ação 2024 • Open Mind 2025",
  "A Ciência da Felicidade (BerkeleyX)",
  "Avaliação de Valores (UPValenciaX)",
  "Gestão de Pessoas (UNCordobaX)",
  "Inteligência Emocional (AnahuacX)",
  "Strategic HR Management (StellenBoschX)",
  "Liderança – Daniel Spinelli",
  "Organizational Psychology (UCX)",
  "ESG & Créditos de Carbono",
  "Libras — Básico",
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

function useMouseParallax(multiplier = 0.03) {
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
    <span className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-xs text-neutral-700 dark:text-neutral-200">
      {children}
    </span>
  );
}

/* ===================== TEMA (claro/escuro) ===================== */
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
    { id: "cursos", label: "Cursos" },
    { id: "formacao", label: "Formação" },
    { id: "contato", label: "Contato" },
  ];
  return (
    <nav className="fixed inset-x-0 top-4 z-50 mx-auto w-fit rounded-full border bg-white/70 dark:bg-neutral-900/60 dark:border-neutral-800 backdrop-blur px-3 md:px-4 py-2 shadow">
      <ul className="flex items-center gap-3">
        <li className="hidden md:block">
          <a href="#sobre" className="flex items-center gap-2 pr-2">
            {ME.logo && (
              <img src={ME.logo} alt="logo" className="h-8 w-8 object-contain" />
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
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const { ref, offset } = useMouseParallax(0.04);

  return (
    <section
      id="sobre"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 to-white dark:from-[#0f0f0f] dark:to-[#0b0b0b]"
    >
      <motion.div style={{ y, scale }} className="relative z-10 max-w-3xl text-center px-6">
        {/* LOGO GRANDE */}
        {ME.logo && (
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={ME.logo}
            alt="Samantha Patrício"
            className="mx-auto mb-5 h-28 w-28 md:h-36 md:w-36 object-contain"
          />
        )}

        {/* SEO, mas sem nome gigante na interface */}
        <h1 className="sr-only">{ME.nome}</h1>

        <p className="text-xl md:text-2xl opacity-90">{ME.titulo}</p>
        <p className="mt-4 text-sm md:text-base opacity-80">{ME.bio}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Badge>{ME.cidades.join(" • ")}</Badge>
          <Badge>Disponível para projetos</Badge>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-full border border-amber-700 bg-amber-700 text-white px-4 py-2 hover:opacity-90"
            href="#projetos"
          >
            Ver projetos <ArrowRight className="h-4 w-4" />
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:bg-black hover:text-white"
            href={`mailto:${ME.email}`}
          >
            Fale comigo <Mail className="h-4 w-4" />
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:bg-black hover:text-white"
            href={ME.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <Linkedin className="h-4 w-4" />
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:bg-black hover:text-white"
            href={ME.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <Github className="h-4 w-4" />
          </a>
        </div>
      </motion.div>

      {/* bolhas de fundo */}
      <motion.div
        className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl"
        style={{
          x: offset.x,
          y: offset.y,
          background:
            "radial-gradient(600px circle at 50% 50%, rgba(157,124,43,.18), transparent 60%)",
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
        <h2 className="text-2xl md:text-3xl font-semibold text-amber-800 dark:text-white">
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
          <motion.a key={i} variants={item} href={p.link} className="group">
            <div className="h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 transition-transform duration-300 group-hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="h-5 w-5 text-amber-800" />
                <span className="font-medium">{p.titulo}</span>
              </div>
              <p className="text-sm opacity-90">{p.descricao}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t, j) => (
                  <Badge key={j}>{t}</Badge>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

/* ===================== LIVROS (cards simples) ===================== */
function BooksSection() {
  return (
    <section id="livros" className="py-12 mx-auto max-w-6xl px-6">
      <h2 className="text-2xl font-semibold mb-6 text-amber-800 dark:text-white">Livros</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {LIVROS.map((b) => (
          <a
            key={b.titulo}
            href={b.link}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 hover:-translate-y-1 transition"
          >
            {/* wrapper para padronizar proporção */}
            <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-white dark:bg-neutral-950 grid place-items-center border border-neutral-100 dark:border-neutral-800">
              <img
                src={b.capa}
                alt={b.titulo}
                className="h-full w-auto object-contain"
                loading="lazy"
              />
            </div>
            <div className="mt-3 font-medium">{b.titulo}</div>
            <div className="text-xs opacity-70 inline-flex items-center gap-1 mt-1">
              Ver na Amazon <ExternalLink className="h-3 w-3" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ===================== PRODUTOS ===================== */
function Produtos() {
  return (
    <section id="produtos" className="py-12 mx-auto max-w-6xl px-6">
      <h2 className="text-2xl font-semibold mb-6 text-amber-800 dark:text-white">
        Produtos & Planilhas
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUTOS.map((p) => (
          <a
            key={p.titulo}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 hover:-translate-y-1 transition"
          >
            <div className="font-medium">{p.titulo}</div>
            <div className="text-sm opacity-80">{p.sub}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ===================== SÓLIDES — PROFILER ===================== */
function SolidesProfiler() {
  const bullets = [
    "Mapeamento de perfil comportamental (DISC/Sólides Profiler)",
    "Alinhamento perfil–cargo, aderência cultural e trilhas de desenvolvimento",
    "Apoio a R&S, performance e sucessão com dados",
    "Devolutiva executiva e plano de ação por squad/área",
  ];
  const mailto = encodeURI(
    `mailto:${ME.email}?subject=Orçamento%20Sólides%20Profiler&body=Olá%20Samantha,%0A%0AQuero orçamento do Profiler (Analista Comportamental).%0A%0AContexto do time:%20__%0AQuantidade de pessoas:%20__%0APrazo desejado:%20__%0A%0AObrigada(o)!`
  );

  return (
    <section id="solides" className="py-12 mx-auto max-w-6xl px-6">
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-amber-800 dark:text-white">
          Sólides — Profiler (Analista Comportamental)
        </h2>
        <p className="mt-2 opacity-80 text-sm md:text-base">
          Consultoria hands-on para equipes que precisam de clareza, alinhamento e decisões
          baseadas em dados comportamentais.
        </p>

        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-amber-700" />
              <span className="text-sm">{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={mailto}
            className="inline-flex items-center gap-2 rounded-full border border-amber-700 bg-amber-700 text-white px-4 py-2 hover:opacity-90"
          >
            Pedir orçamento <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={ME.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:bg-black hover:text-white"
          >
            LinkedIn <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===================== CURSOS (chips) ===================== */
function CursosRH() {
  return (
    <section id="cursos" className="bg-neutral-50 dark:bg-neutral-900/40 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <h3 className="mb-6 text-xl font-semibold">Cursos de RH (principais)</h3>
        <div className="flex flex-wrap gap-2">
          {RH_CURSOS.map((c) => (
            <span
              key={c}
              className="rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-xs"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== FORMAÇÃO (link currículo) ===================== */
function Formacao() {
  return (
    <section id="formacao" className="mx-auto max-w-6xl px-6 py-16">
      <h3 className="mb-6 text-xl font-semibold text-amber-800 dark:text-white">
        Formação & Currículo
      </h3>
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5">
        <p className="text-sm opacity-85">
          Veja o currículo completo (com a lista de cursos e formações) em uma página à parte:
        </p>
        <a
          className="mt-3 inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:bg-black hover:text-white"
          href="/curriculo.html"
          target="_blank"
          rel="noreferrer"
        >
          Abrir currículo completo <ExternalLink className="h-4 w-4" />
        </a>
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
        Curtiu o estilo deste portfólio? Me escreva com o assunto "Projeto" e conte seu desafio em
        4–6 linhas.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          className="inline-flex items-center gap-2 rounded-full border border-amber-700 bg-amber-700 text-white px-4 py-2 hover:opacity-90"
          href={`mailto:${ME.email}`}
        >
          Mandar e-mail <Mail className="h-4 w-4" />
        </a>
        <a
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:bg-black hover:text-white"
          href={ME.linkedin}
          target="_blank"
          rel="noreferrer"
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
    <div className="relative min-h-screen bg-white dark:bg-[#0c0c0c] text-neutral-900 dark:text-neutral-100 antialiased">
      <Nav theme={theme} toggleTheme={toggle} />
      <Hero />
      <Projetos />
      <BooksSection />
      <Produtos />
      <SolidesProfiler />
      <CursosRH />
      <Formacao />
      <Contato />
      <footer className="mx-auto max-w-6xl px-6 py-10 text-xs opacity-60">
        © {new Date().getFullYear()} {ME.nome}. Feito com React + Framer Motion + Tailwind.
      </footer>
    </div>
  );
}
