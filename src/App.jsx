// src/App.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  ArrowRight,
  Linkedin,
  Github,
  Mail,
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

/* ===================== TEMA ===================== */
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

/* ===================== COMPONENTES ===================== */
function Nav({ theme, onToggle }) {
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
    <nav className="fixed inset-x-0 top-4 z-50 mx-auto w-fit rounded-full border bg-white/70 dark:bg-neutral-900/60 dark:border-neutral-800 backdrop-blur px-3 md:px-4 py-2 shadow-soft">
      <ul className="flex items-center gap-3">
        <li className="pr-2">
          <a href="#sobre" className="flex items-center">
            <img
              src={ME.logo}
              alt="Samantha Patrício"
              className="h-8 w-8 md:h-10 md:w-10 object-contain"
            />
          </a>
        </li>
        {links.map((l) => (
          <li key={l.id}>
            <a className="text-sm hover:opacity-70" href={`#${l.id}`}>
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <button
            onClick={onToggle}
            className="rounded-full border px-2 py-1 text-xs hover:opacity-80 dark:border-neutral-700"
            title="Alternar tema"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="sobre"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden"
    >
      {/* Logo grande */}
      <div className="relative z-10 text-center px-6">
        <motion.img
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={ME.logo}
          alt="Samantha Patrício"
          className="mx-auto mb-6 h-28 w-auto md:h-40"
        />

        <p className="text-center text-base md:text-lg opacity-80 max-w-3xl mx-auto">
          RH • Estratégia • Cultura • Design de Experiências
        </p>
        <p className="mt-3 text-sm md:text-base opacity-70 max-w-3xl mx-auto">
          Integro Pessoas, Processos e Espaços. Experiência do colaborador,
          eficiência e leitura de dados.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs opacity-90">
            {ME.cidades.join(" • ")}
          </span>
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs opacity-90">
            Disponível para projetos
          </span>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#livros"
            className="inline-flex items-center gap-2 rounded-full bg-brand-700 text-white px-4 py-2 text-sm hover:opacity-90"
          >
            Ver projetos <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${ME.email}`}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
          >
            Fale comigo <Mail className="h-4 w-4" />
          </a>
          <a
            href={ME.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
          >
            LinkedIn <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={ME.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
          >
            GitHub <Github className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* bolhas de fundo */}
      <div
        className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl"
        style={{
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
    </section>
  );
}

function SkillsMarquee() {
  // loop suave
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
              <span
                key={i}
                className="rounded-full border px-4 py-2 text-sm opacity-80"
              >
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BookCard({ capa, titulo, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl border bg-white/60 dark:bg-neutral-900/60 hover:shadow-soft transition"
      title="Ver na Amazon"
    >
      <div className="p-4">
        <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-white dark:bg-neutral-800 grid place-items-center">
          <motion.img
            src={capa}
            alt={titulo}
            className="h-full w-full object-contain"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          />
        </div>
        <div className="pt-3">
          <div className="font-medium">{titulo}</div>
          <div className="text-xs opacity-70 inline-flex items-center gap-1">
            Ver na Amazon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-3 w-3"
              fill="currentColor"
            >
              <path d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3Z" />
              <path d="M5 5h5v2H7v10h10v-3h2v5H5V5Z" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

function Livros() {
  return (
    <section id="livros" className="py-12 mx-auto max-w-6xl px-6">
      <h2 className="text-2xl font-semibold mb-6 text-brand-700 dark:text-white">
        Livros
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {LIVROS.map((b) => (
          <BookCard key={b.titulo} {...b} />
        ))}
      </div>
    </section>
  );
}

function Produtos() {
  return (
    <section id="produtos" className="py-12 mx-auto max-w-6xl px-6">
      <h2 className="text-2xl font-semibold mb-6 text-brand-700 dark:text-white">
        Produtos & Planilhas
      </h2>
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

function Contato() {
  return (
    <section id="contato" className="mx-auto max-w-3xl px-6 py-16">
      <h3 className="mb-4 text-xl font-semibold">Contato</h3>
      <p className="opacity-80 text-sm">
        Curtiu o portfólio? Me escreva com o assunto{" "}
        <b>“Projeto”</b> e descreva seu desafio em 4–6 linhas.
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
      <Contato />
      <footer className="mx-auto max-w-6xl px-6 py-10 text-xs opacity-60">
        © {new Date().getFullYear()} Samantha Patrício.
      </footer>
    </div>
  );
}
