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
  TrendingUp,
  PenTool,
} from "lucide-react";

import { Button } from "./components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";

/* ===================== CONFIG BÁSICA ===================== */
const ME = {
  nome: "Samantha Patrício",
  titulo: "RH • Estratégia • Cultura • Design de Experiências",
  bio:
    "Sou Samantha Patrício, 26. RH Generalista há 7 anos; implementei RH do zero estruturando subsistemas, rotinas e indicadores. Atuação estratégica alinhando cultura e objetivos do negócio, com foco em experiência do colaborador, eficiência e dados. Aberta a novos desafios (RH generalista/estratégico, BP, cultura, desenvolvimento, people analytics e organização de processos).",
  email: "samanthapatricio39@gmail.com",
  github: "https://github.com/SamanthaPatricio",
  linkedin: "https://www.linkedin.com/in/samanthapatricio/",
  cidades: ["Curitiba", "Santa Catarina", "Brasil"],
  logo: "/logo.png", // coloque em public/logo.png
};

/* ===================== PROJETOS ===================== */
const PROJETOS = [
  {
    titulo: "Playbook de Onboarding com Cultura Viva",
    descricao:
      "Onboarding interativo (microlearning e métricas de adaptação).",
    tags: ["RH Estratégico", "Onboarding", "Métricas"],
    link: "#",
  },
  {
    titulo: "Arquitetura de Cultura & Espaço",
    descricao:
      "Diretrizes para layout, ergonomia e psicologia das cores para equipes.",
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

/* ===================== LIVROS – usando capas da Amazon ===================== */
const LIVROS = [
  {
    titulo: "Como Implementar um Setor de RH Estratégico",
    link: "https://www.amazon.com.br/Como-Implementar-Setor-RH-Estrat%C3%A9gico-ebook/dp/B0FBY5S5YW",
    capa: "https://m.media-amazon.com/images/I/61f8jkvibKL._SY466_.jpg",
  },
  {
    titulo: "METODOLOGIA C.I.R.C.U.L.O",
    link: "https://www.amazon.com.br/METODOLOGIA-C-I-R-C-U-L-SAMANTHA-PATR%C3%8DCIO-ebook/dp/B0FDJN7TSQ",
    capa: "https://m.media-amazon.com/images/I/31X7RaCqo9L._SY445_SX342_ControlCacheEqualizer_.jpg",
  },
];

/* ===================== HELPERS ===================== */
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } } };

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

/* ===================== TEMA ===================== */
function useTheme() {
  const getInitial = () => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
    } catch {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 px-3 py-1 text-xs">
      {children}
    </span>
  );
}

/* ===================== NAV ===================== */
function Nav({ theme, toggleTheme }) {
  const links = [
    { id: "sobre", label: "Sobre" },
    { id: "projetos", label: "Projetos" },
    { id: "livros", label: "Livros" },
    { id: "solides", label: "Sólides" },
    { id: "formacao", label: "Formação" },
    { id: "contato", label: "Contato" },
  ];
  return (
    <nav className="fixed inset-x-0 top-4 z-50 mx-auto w-fit rounded-full border bg-white/70 dark:bg-neutral-900/60 dark:border-neutral-800 backdrop-blur px-3 md:px-4 py-2 shadow-soft">
      <ul className="flex items-center gap-3">
        <li className="hidden md:block">
          <a href="#sobre" className="flex items-center gap-2 pr-2">
            {ME.logo && (
              <img
                src={ME.logo}
                alt="logo"
                className="h-8 w-8 md:h-10 md:w-10 object-contain"
              />
            )}
          </a>
        </li>
        {links.map((l) => (
          <li key={l.id}>
            <a href={`#${l.id}`} className="text-sm hover:opacity-70">{l.label}</a>
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
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]);
  const { ref, offset } = useMouseParallax(0.04);

  return (
    <section id="sobre" ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 to-white dark:from-[#0f0f0f] dark:to-[#0b0b0b]">
      <motion.div style={{ y, scale }} className="relative z-10 max-w-3xl text-center px-6">
        {ME.logo && (
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={ME.logo}
            alt="Logotipo Samantha Patrício"
            className="mx-auto mb-8 h-[140px] w-[140px] md:h-[200px] md:w-[200px] lg:h-[240px] lg:w-[240px] object-contain"
          />
        )}

        {/* H1 oculto visualmente (SEO/AC) */}
        <motion.h1 className="sr-only">{ME.nome}</motion.h1>

        <motion.p className="mt-2 text-lg md:text-xl opacity-80">{ME.titulo}</motion.p>
        <motion.p className="mt-4 text-sm md:text-base opacity-70">{ME.bio}</motion.p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Badge>{ME.cidades.join(" • ")}</Badge>
          <Badge>Disponível para projetos</Badge>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <a href="#projetos">
              Ver projetos <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={`mailto:${ME.email}`}>Fale comigo <Mail className="ml-2 h-4 w-4" /></a>
          </Button>
          <Button variant="outline" asChild>
            <a href={ME.linkedin} target="_blank" rel="noreferrer">LinkedIn <Linkedin className="ml-2 h-4 w-4" /></a>
          </Button>
          <Button variant="outline" asChild>
            <a href={ME.github} target="_blank" rel="noreferrer">GitHub <Github className="ml-2 h-4 w-4" /></a>
          </Button>
        </div>
      </motion.div>

      {/* bolhas */}
      <motion.div
        className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl"
        style={{
          x: offset.x,
          y: offset.y,
          background: "radial-gradient(600px circle at 50% 50%, rgba(157,124,43,.20), transparent 60%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          background: "radial-gradient(600px circle at 50% 50%, rgba(157,124,43,.12), transparent 60%)",
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
        <h2 className="text-2xl md:text-3xl font-semibold text-brand-700 dark:text-white">Projetos em Destaque</h2>
        <div className="text-sm opacity-70">clique para saber mais</div>
      </div>
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJETOS.map((p, i) => (
          <motion.a key={i} variants={item} href={p.link} className="group">
            <Card className="h-full transition-transform duration-300 group-hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-brand-700" /> {p.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-80">{p.descricao}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t, j) => <Badge key={j}>{t}</Badge>)}
                </div>
              </CardContent>
            </Card>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

/* ===================== LIVROS (capa para fora, sem espelhar) ===================== */
function Book({ capa, titulo, link }) {
  const [src, setSrc] = useState(capa);
  return (
    <div className="relative w-[240px]">
      <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-soft p-4 will-change-transform hover:-rotate-1 hover:scale-[1.01] transition">
        <a href={link} target="_blank" rel="noreferrer" className="block">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-xl grid place-items-center bg-gradient-to-br from-brand-50 to-white dark:from-neutral-800 dark:to-neutral-900">
            <img
              src={src}
              alt={titulo}
              onError={() => setSrc("/logo.png")}
              className="max-h-[85%] w-auto object-contain"
            />
          </div>
          <div className="text-center mt-3 text-sm font-medium">{titulo}</div>
        </a>
      </div>
    </div>
  );
}

function BooksSection() {
  return (
    <section id="livros" className="py-12 mx-auto max-w-6xl px-6">
      <h2 className="text-2xl font-semibold mb-6 text-brand-700 dark:text-white">Livros</h2>
      <div className="flex flex-wrap gap-10">
        {LIVROS.map((b) => <Book key={b.titulo} {...b} />)}
      </div>
    </section>
  );
}

/* ===================== SÓLIDES (Profiler) ===================== */
function SolidesProfiler() {
  return (
    <section id="solides" className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-6 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-brand-700" />
            Consultoria Sólides — Profiler (Analista Comportamental)
          </h2>
          <p className="mt-3 opacity-80 text-sm md:text-base">
            Avaliação de perfil, mapeamento de time, aderência cultural, desenho de cargos e
            trilhas de desenvolvimento. Entrego **diagnóstico** e **plano de ação**.
          </p>
          <ul className="mt-4 text-sm list-disc pl-5 space-y-1 opacity-90">
            <li>Aplicação e leitura Profiler (Sólides)</li>
            <li>Relatórios por pessoa, função e time</li>
            <li>Workshops de devolutiva e alinhamento cultural</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <Button asChild>
              <a href={`mailto:${ME.email}?subject=Orçamento%20Sólides%20Profiler&body=Conte%20brevemente%20seu%20escopo,%20prazos%20e%20tamanho%20do%20time.`}>
                Pedir orçamento
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={ME.linkedin} target="_blank" rel="noreferrer">
                Falar no LinkedIn
              </a>
            </Button>
          </div>
        </div>
        <div>
          <Card className="p-6">
            <CardTitle className="flex items-center gap-2"><PenTool className="h-5 w-5 text-brand-700" /> Entregáveis</CardTitle>
            <CardContent className="mt-3 text-sm opacity-90 space-y-1">
              <p>• Relatórios Profiler (individuais e de time)</p>
              <p>• Plano de desenvolvimento por competência</p>
              <p>• Recomendações de cultura e processos</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ===================== FORMAÇÃO (link pro currículo completo se quiser usar) ===================== */
function FormacaoCursos() {
  const GRADUACOES = [
    { periodo: "2024–2026", titulo: "Tecnólogo em Recursos Humanos — em andamento" },
    { periodo: "2024–2028", titulo: "Arquitetura e Urbanismo — Unicesumar (PROUNI — Bolsa 100%)" },
  ];

  const OUTRAS = [
    "Biomedicina (4 anos)",
    "USP/ICB — Biotecnologia; Bioética; Bioterismo; Modelagem Molecular (GBI Hands On); Radiobiologia; Bioimpressão 3D; Orientação no Lab. de Controle Sanitário e Genético (ICB II)",
    "UFV — Auxiliar de Biotecnologia",
    "Harvard (edX) — Bioética para pesquisa em ciências da vida",
    "UFSC — Neuroanatomia e Neurofisiologia",
    "Univali — 1 ano de Fonoaudiologia; 1 ano de Publicidade e Propaganda; Simpósio de Ética em Pesquisa",
  ];

  return (
    <section id="formacao" className="mx-auto max-w-6xl px-6 py-16">
      <h3 className="mb-6 text-xl font-semibold text-brand-700 dark:text-white">Formação & Cursos</h3>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border p-5">
          <h4 className="font-medium mb-3">Graduações</h4>
          <ul className="space-y-2 text-sm">
            {GRADUACOES.map((g) => (
              <li key={g.titulo}><span className="opacity-60 mr-2">{g.periodo}</span> {g.titulo}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Outras Formações</h4>
            <a className="text-xs underline hover:opacity-80" href="/curriculo.html" target="_blank" rel="noreferrer">
              Currículo completo →
            </a>
          </div>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {OUTRAS.map((f, i) => <li key={i}>{f}</li>)}
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
        Curtiu o estilo deste portfólio? Me escreva com o assunto "Projeto" e conte seu desafio em 4–6 linhas.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <a href={`mailto:${ME.email}`}>Mandar e-mail <Mail className="ml-2 h-4 w-4" /></a>
        </Button>
        <Button variant="outline" asChild>
          <a href={ME.linkedin} target="_blank" rel="noreferrer">Conectar no LinkedIn <Linkedin className="ml-2 h-4 w-4" /></a>
        </Button>
      </div>
    </section>
  );
}

/* ===================== APP ===================== */
export default function App() {
  const { theme, toggle } = useTheme();
  return (
    <div className="relative min-h-screen bg-transparent antialiased">
      <Nav theme={theme} toggleTheme={toggle} />
      <Hero />
      <Projetos />
      <BooksSection />
      <SolidesProfiler />
      <FormacaoCursos />
      <Contato />
      <footer className="mx-auto max-w-6xl px-6 py-10 text-xs opacity-60">
        © {new Date().getFullYear()} {ME.nome}. Feito com React + Framer Motion + Tailwind.
      </footer>
    </div>
  );
}
