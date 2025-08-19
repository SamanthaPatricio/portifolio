import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  ArrowRight,
  Linkedin,
  Github,
  Mail,
  Check,
} from "lucide-react";

/* ===================== DADOS ===================== */
const ME = {
  logo: "/logo.png", // public/logo.png
  email: "samanthapatricio39@gmail.com",
  linkedin: "https://www.linkedin.com/in/samanthapatricio/",
  github: "https://github.com/SamanthaPatricio",
  cidades: ["Curitiba", "Santa Catarina", "Brasil"],
};

const SKILLS = [
  "RH Estratégico",
  "People Analytics",
  "BP de RH",
  "Cultura & Clima",
  "Arquitetura de Cultura",
  "OKRs & KPIs",
  "Treinamento & DDS",
  "Cargos & Salários",
  "Recrutamento & Seleção",
  "Power BI",
  "Excel Avançado",
  "Folha & E-Social",
  "Comunicação Interna",
  "Endomarketing",
  "Ergonomia & SST",
];

const LIVROS = [
  {
    titulo: "Como Implementar um Setor de RH Estratégico",
    link:
      "https://www.amazon.com.br/Como-Implementar-Setor-RH-Estrat%C3%A9gico-ebook/dp/B0FBY5S5YW",
    capa:
      "https://m.media-amazon.com/images/I/61f8jkvibKL._SY466_.jpg",
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
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle };
}

/* ===================== UI HELPERS ===================== */
function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs opacity-90">
      {children}
    </span>
  );
}

/* ===================== NAV ===================== */
function Nav({ theme, onToggle }) {
  const links = [
    { id: "sobre", label: "Sobre" },
    { id: "livros", label: "Livros" },
    { id: "produtos", label: "Produtos" },
    { id: "solides", label: "Sólides" },
    { id: "formacao", label: "Formação" },
    { id: "contato", label: "Contato" },
  ];
  return (
    <nav className="fixed inset-x-0 top-4 z-50 mx-auto w-fit rounded-full border bg-white/70 dark:bg-neutral-900/60 dark:border-neutral-800 backdrop-blur px-3 md:px-4 py-2 shadow-soft">
      <ul className="flex items-center gap-3">
        <li className="pr-2">
          <a href="#sobre" className="flex items-center" title="Início">
            <img src={ME.logo} alt="Samantha Patrício" className="h-10 w-10 object-contain" />
          </a>
        </li>
        {links.map((l) => (
          <li key={l.id}><a className="text-sm hover:opacity-70" href={`#${l.id}`}>{l.label}</a></li>
        ))}
        <li>
          <button
            onClick={onToggle}
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
  return (
    <section id="sobre" className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-6">
        <motion.img
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={ME.logo}
          alt="Samantha Patrício"
          className="mx-auto mb-6 h-32 w-auto md:h-48"
        />
        <p className="text-base md:text-lg opacity-80 max-w-3xl mx-auto">
          RH • Estratégia • Cultura • Design de Experiências
        </p>
        <p className="mt-3 text-sm md:text-base opacity-70 max-w-3xl mx-auto">
          Integro Pessoas, Processos e Espaços. Experiência do colaborador, eficiência e leitura de dados.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Badge>{ME.cidades.join(" • ")}</Badge>
          <Badge>Disponível para projetos</Badge>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#livros" className="inline-flex items-center gap-2 rounded-full bg-brand-700 text-white px-4 py-2 text-sm hover:opacity-90">
            Ver projetos <ArrowRight className="h-4 w-4" />
          </a>
          <a href={`mailto:${ME.email}`} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
            Fale comigo <Mail className="h-4 w-4" />
          </a>
          <a href={ME.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
            LinkedIn <Linkedin className="h-4 w-4" />
          </a>
          <a href={ME.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
            GitHub <Github className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* bolhas de fundo */}
      <div
        className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(600px circle at 50% 50%, rgba(157,124,43,.20), transparent 60%)" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ background: "radial-gradient(600px circle at 50% 50%, rgba(157,124,43,.12), transparent 60%)" }}
      />
    </section>
  );
}

/* ===================== MARQUEE ===================== */
function SkillsMarquee() {
  return (
    <section id="skills" className="bg-gray-100 dark:bg-neutral-900/40 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <h3 className="mb-6 text-xl font-semibold">Stack & Competências</h3>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4 whitespace-nowrap will-change-transform"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            {[...SKILLS, ...SKILLS].map((s, i) => (
              <span key={i} className="rounded-full border px-4 py-2 text-sm opacity-80">{s}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ===================== LIVROS — Flip 3D ===================== */
function BookFlip({ capa, titulo, link }) {
  const open = { rotateY: -180 };
  const closed = { rotateY: 0 };
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group relative mx-auto w-[220px] sm:w-[240px] h-[300px] sm:h-[320px] perspective-1000"
      title="Ver na Amazon"
    >
      {/* CAPA (fora) */}
      <motion.div
        className="absolute inset-0 origin-left rounded-2xl shadow-soft bg-white dark:bg-neutral-900 grid place-items-center p-3"
        style={{ backfaceVisibility: "hidden" }}
        initial={closed}
        whileHover={open}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
      >
        <img src={capa} alt={titulo} className="max-h-[80%] object-contain" />
        <p className="mt-2 text-xs text-center opacity-80 px-2">{titulo}</p>
      </motion.div>

      {/* VERSO (dentro) */}
      <motion.div
        className="absolute inset-0 origin-left rounded-2xl shadow-soft"
        style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        initial={open}
        whileHover={closed}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
      >
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-white to-gray-100 dark:from-neutral-900 dark:to-neutral-800 p-4 flex flex-col items-center justify-center">
          <span className="text-sm font-medium mb-2 text-center px-2">{titulo}</span>
          <span className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm hover:bg-black hover:text-white border-black dark:border-white">
            Ver na Amazon
          </span>
        </div>
      </motion.div>

      {/* Página direita para “Passe o mouse” */}
      <div className="absolute left-[220px] sm:left-[240px] top-0 w-[200px] sm:w-[220px] h-full rounded-2xl shadow-soft bg-white/90 dark:bg-neutral-800 grid place-items-center">
        <span className="text-gray-500 dark:text-gray-300 text-xs">Passe o mouse na capa →</span>
      </div>
    </a>
  );
}

function Livros() {
  return (
    <section id="livros" className="py-12 mx-auto max-w-6xl px-6">
      <h2 className="text-2xl font-semibold mb-6 text-brand-700 dark:text-white">Livros</h2>
      <div className="flex flex-wrap gap-10">
        {LIVROS.map((b) => (
          <BookFlip key={b.titulo} {...b} />
        ))}
      </div>
    </section>
  );
}

/* ===================== SÓLIDES / PROFILER ===================== */
function SolidesProfiler() {
  const mail = `mailto:${ME.email}?subject=Orçamento%20—%20Profiler%20Sólides&body=Oi%20Samantha!%0D%0AQuero%20um%20orçamento%20de%20Profiler%20(Sólides).%20Quantidade%20de%20pessoas%3A%20___%0D%0APrazo%3A%20___%0D%0AObjetivo%3A%20___`;
  const bullets = [
    "Mapeamento comportamental (Profiler / DISC) individual e por equipe",
    "Leitura de forças, riscos, aderência a cargo e recomendações práticas",
    "Dinâmicas de devolutiva e alinhamento com lideranças",
    "Trilhas de desenvolvimento e rota de comunicação",
  ];
  return (
    <section id="solides" className="py-12 mx-auto max-w-6xl px-6">
      <h2 className="text-2xl font-semibold mb-2 text-brand-700 dark:text-white">
        Consultoria Sólides • Profiler (Analista Comportamental)
      </h2>
      <p className="opacity-80 text-sm max-w-3xl">
        Sou consultora Sólides (Profiler). Aplicação, leitura e devolutivas para fortalecer
        performance, comunicação e cultura.
      </p>
      <ul className="mt-4 grid gap-2 md:grid-cols-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 mt-0.5 text-brand-700" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <a
          href={mail}
          className="inline-flex items-center gap-2 rounded-full bg-brand-700 text-white px-4 py-2 text-sm hover:opacity-90"
        >
          Pedir orçamento
        </a>
      </div>
    </section>
  );
}

/* ===================== PRODUTOS ===================== */
function Produtos() {
  return (
    <section id="produtos" className="py-12 mx-auto max-w-6xl px-6">
      <h2 className="text-2xl font-semibold mb-6 text-brand-700 dark:text-white">Produtos & Planilhas</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {PRODUTOS.map((p) => (
          <a
            key={p.titulo}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border p-4 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
          >
            <div className="font-medium">{p.titulo}</div>
            <div className="text-xs opacity-70">{p.sub}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ===================== FORMAÇÃO ===================== */
function Formacao() {
  const graduacoes = [
    "Tecnólogo em Recursos Humanos — em andamento (2026)",
    "Arquitetura e Urbanismo — Unicesumar (PROUNI) — formação 2028",
  ];
  const outras = [
    "Biomedicina — 4 anos (Uniasselvi)",
    "USP/ICB — Biotecnologia, Bioética, Bioterismo, Modelagem Molecular (GBI Hands On), Radiobiologia, Bioimpressão 3D, Orientação no Lab. de Controle Sanitário e Genético (ICB II)",
    "UFV — Auxiliar de Biotecnologia",
    "UFSC — Neuroanatomia e Neurofisiologia",
    "Harvard (edX) — Bioética para pesquisa em ciências da vida",
    "Univali — 1 ano de Fonoaudiologia; 1 ano de Publicidade e Propaganda; Simpósio de Ética em Pesquisas",
  ];
  return (
    <section id="formacao" className="py-12 mx-auto max-w-6xl px-6">
      <h2 className="text-2xl font-semibold mb-6 text-brand-700 dark:text-white">Formação</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border p-5">
          <h4 className="font-medium mb-3">Graduações</h4>
          <ul className="space-y-2 text-sm">
            {graduacoes.map((g) => <li key={g}>{g}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Outras Formações</h4>
            <a
              href="/curriculo.html"
              target="_blank"
              rel="noreferrer"
              className="text-xs underline hover:opacity-80"
            >
              Currículo completo →
            </a>
          </div>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {outras.map((o) => <li key={o}>{o}</li>)}
          </ul>
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
        Curtiu o portfólio? Me escreva com o assunto <b>“Projeto”</b> e descreva seu desafio em 4–6 linhas.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`mailto:${ME.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-brand-700 text-white px-4 py-2 text-sm hover:opacity-90"
        >
          Mandar e-mail <Mail className="h-4 w-4" />
        </a>
        <a
          href={ME.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
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
      <Nav theme={theme} onToggle={toggle} />
      <Hero />
      <SkillsMarquee />
      <Livros />
      <Produtos />
      <SolidesProfiler />
      <Formacao />
      <Contato />
      <footer className="mx-auto max-w-6xl px-6 py-10 text-xs opacity-60">
        © {new Date().getFullYear()} Samantha Patrício.
      </footer>
    </div>
  );
}

