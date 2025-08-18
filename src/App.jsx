// src/App.jsx
import React, { useState, useRef, useEffect } from "react";
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

import { Button } from "./components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";

/* ===================== CONFIG BÁSICA (ATUALIZADA) ===================== */
const ME = {
  nome: "Samantha Patrício",
  titulo: "RH • Estratégia • Cultura • Design de Experiências",
  bio:
    "Meu nome é Samantha Patrício, 26 anos. Atuo como RH Generalista há 7 anos e já liderei a implementação do RH do zero, estruturando subsistemas e rotinas. Com atuação estratégica e visão de futuro, alinho práticas de RH à cultura e aos objetivos do negócio. Estou em busca de novos desafios e aberta a oportunidades na área de Recursos Humanos.",
  email: "samantha.patricio56@outlook.com",
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

/* ===================== LIVROS — use /public/capas/ ===================== */
const LIVROS = [
  {
    titulo: "Como Implementar um Setor de RH Estratégico",
    sub: "Guia prático",
    link: "https://www.amazon.com.br/Como-Implementar-Setor-RH-Estrat%C3%A9gico-ebook/dp/B0FBY5S5YW",
    capa: "/capas/rh-estrategico.jpg?v=2",
  },
  {
    titulo: "METODOLOGIA C.I.R.C.U.L.O",
    sub: "Samantha Patrício",
    link: "https://www.amazon.com.br/METODOLOGIA-C-I-R-C-U-L-SAMANTHA-PATR%C3%8DCIO-ebook/dp/B0FDJN7TSQ",
    capa: "/capas/metodologia-circulo.jpg?v=2",
  },
];


/* ===================== PLANILHAS & KITS ===================== */
const PLANILHAS = [
  {
    titulo: "Análise SWOT (Planilha)",
    sub: "Ferramenta prática para diagnóstico estratégico",
    link: "https://lnkd.in/e6fGsFac",
  },
  {
    titulo: "Cargos & Salários (Planilha)",
    sub: "Estruture trilhas e faixas salariais",
    link: "https://go.hotmart.com/P98376571U",
  },
  {
    titulo: "Kit Planilhas de Marketing",
    sub: "Conjunto de planilhas para gestão e growth",
    link: "https://go.hotmart.com/I98391084X",
  },
];

/* ===================== SKILLS ===================== */
const SKILLS = [
  "People Analytics",
  "Recrutamento & Seleção",
  "Cultura & Clima",
  "Arquitetura Corporativa",
  "Comunicação Não-Violenta",
  "Liderança 1ª posição",
  "Design de Aprendizagem",
  "OKRs & KPIs",
  "Power BI / Excel",
];

/* ===================== TIMELINE (ATUALIZADA) ===================== */
const TIMELINE = [
  {
    ano: "2025",
    titulo: "Autora & Consultora",
    texto:
      "Lançamento de obras em RH e projetos de cultura organizacional hands-on.",
  },
  {
    ano: "2024",
    titulo: "Estruturação de RH",
    texto:
      "Implementei RH do zero e estruturei processos e subsistemas, com fortalecimento de gestão e indicadores.",
  },
  {
    ano: "2019–2023",
    titulo: "Base acadêmica & método científico",
    texto:
      "Formação multidisciplinar (neuropsicologia, psicologia do trabalho e bioética) com prática de laboratório (biotecnologia, radiobiologia, bioterismo e modelagem molecular).",
  },
];

/* ===================== FORMAÇÕES & CURSOS ===================== */
const GRADUACOES = [
  { periodo: "2024–2026", titulo: "Tecnólogo em Recursos Humanos — em andamento" },
  {
    periodo: "2024–2028",
    titulo: "Arquitetura e Urbanismo — Unicesumar (PROUNI — Bolsa 100%)",
  },
];

const OUTRAS_FORMACOES = [
  "Biomedicina (4 anos) — Uniasselvi",
  "Auxiliar de Biotecnologia — UFV",
  "UFSC — Astrofísica e Cosmologia; Neuroanatomia e Neurofisiologia",
  "Univali — 1 ano de Fonoaudiologia; 1 ano de Publicidade e Propaganda; Simpósio de Ética em Pesquisas",
  "USP/ICB — Biotecnologia; Bioética; Bioterismo (Ciência de animais de laboratório); Modelagem Molecular (GBI Hands On); Radiobiologia; Bioimpressão 3D; Orientação no Lab. de Controle Sanitário e Genético (ICB II); Minicurso de Perícia Criminal",
  "Solloagro — USP",
  "Bioética — Harvard (edX)",
];

const RH_CURSOS = [
  "Analista de RH | Estratégia, teoria e prática",
  "Microsoft Power BI para RH",
  "Diploma Course in Human Resource Management (HRM)",
  "Especialista em Departamento Pessoal",
  "Analista comportamental: Profiler & DISC",
  "People Analytics, OKR, BP, Cultura Organizacional, R&S, E-social, Folha, Indicadores, Endomarketing",
  "NR1/5/18/33/35 — Segurança & Ergonomia",
  "ESG e créditos de carbono",
  "Eventos: CONCARH 2024/2025, Open Mind 2025, RH Experience 2025, Logistique 2025, Casacor 2024/2025",
  "Inglês Avançado (Fisk)",
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
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs opacity-90">
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
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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
    { id: "skills", label: "Skills" },
    { id: "trajetoria", label: "Trajetória" },
    { id: "formacao", label: "Formação" },
    { id: "contato", label: "Contato" },
  ];
  return (
    <nav className="fixed inset-x-0 top-4 z-50 mx-auto w-fit rounded-full border bg-white/70 dark:bg-neutral-900/60 dark:border-neutral-800 backdrop-blur px-3 md:px-4 py-2 shadow-soft">
      <ul className="flex items-center gap-3">
        <li className="hidden md:block">
          <a href="#sobre" className="flex items-center gap-2 pr-2">
            {ME.logo && <img src={ME.logo} alt="logo" className="h-6 w-6 object-contain" />}
            <span className="text-sm font-medium">{ME.nome.split(" ")[0]}</span>
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
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]);
  const { ref, offset } = useMouseParallax(0.04);

  return (
    <section
      id="sobre"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 to-white dark:from-[#0f0f0f] dark:to-[#0b0b0b]"
    >
      <motion.div style={{ y, scale }} className="relative z-10 max-w-3xl text-center px-6">
        {ME.logo && (
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={ME.logo}
            alt="Logotipo"
            className="mx-auto mb-4 h-24 w-24 md:h-28 md:w-28 object-contain"
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
          <Button className="bg-brand border-brand text-white hover:opacity-90" asChild>
            <a href="#projetos">
              Ver projetos <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={`mailto:${ME.email}`}>
              Fale comigo <Mail className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={ME.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <Linkedin className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={ME.github} target="_blank" rel="noreferrer">
              GitHub <Github className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </motion.div>

      {/* bolhas de fundo */}
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
                  {p.tags.map((t, j) => (
                    <Badge key={j}>{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

/* ===================== LIVROS (capa pra fora) ===================== */
function Book({ capa, titulo, link }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex items-start gap-6">
      <div
        className="relative w-[240px] h-[320px] perspective-1000"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* capa de fora (não espelha) */}
        <motion.div
          className="absolute inset-0 origin-left rounded-2xl shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
          animate={{ rotateY: open ? -180 : 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
        >
          <div className="w-full h-full rounded-2xl bg-white/95 dark:bg-neutral-900 grid place-items-center p-4">
            {capa ? (
              <img src={capa} alt={titulo} className="max-h-[75%] object-contain" />
            ) : (
              <img src="/logo.png" alt="logo" className="h-20 opacity-80" />
            )}
            <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-200 text-center px-2">
              {titulo}
            </p>
          </div>
        </motion.div>

        {/* verso da capa (dentro) */}
        <motion.div
          className="absolute inset-0 origin-left rounded-2xl shadow-inner"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
          animate={{ rotateY: open ? 0 : 180 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
        >
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-white to-gray-100 dark:from-neutral-900 dark:to-neutral-800 p-4 flex flex-col items-center justify-center">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm hover:bg-black hover:text-white border-black dark:border-white"
            >
              Ver na Amazon
            </a>
          </div>
        </motion.div>

        {/* página da direita */}
        <div className="absolute left-[240px] top-0 w-[240px] h-[320px] rounded-2xl shadow-lg bg-white/90 dark:bg-neutral-800 grid place-items-center">
          <span className="text-gray-500 dark:text-gray-300 text-sm">Passe o mouse na capa →</span>
        </div>
      </div>
    </div>
  );
}

function BooksSection() {
  return (
    <section id="livros" className="py-12 mx-auto max-w-6xl px-6">
      <h2 className="text-2xl font-semibold mb-6 text-brand-700 dark:text-white">Livros</h2>
      <div className="flex flex-wrap gap-10">
        {LIVROS.map((b) => (
          <Book key={b.titulo} {...b} />
        ))}
      </div>
    </section>
  );
}

/* ===================== PLANILHAS & KITS ===================== */
function PlanilhasSection() {
  return (
    <section id="planilhas" className="py-12 mx-auto max-w-6xl px-6">
      <h2 className="text-2xl font-semibold mb-6 text-brand-700 dark:text-white">
        Planilhas & Kits
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLANILHAS.map((p) => (
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

/* ===================== SKILLS ===================== */
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

/* ===================== TIMELINE ===================== */
function Timeline() {
  return (
    <section id="trajetoria" className="mx-auto max-w-5xl px-6 py-16">
      <h3 className="mb-8 text-xl font-semibold">Trajetória</h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 dark:bg-neutral-800" />
        <ul className="space-y-8">
          {TIMELINE.map((t, i) => (
            <li key={i} className="relative pl-10">
              <span className="absolute left-2 top-1.5 block h-4 w-4 rounded-full border bg-white dark:bg-neutral-900" />
              <div className="text-sm opacity-60">{t.ano}</div>
              <div className="text-base font-medium">{t.titulo}</div>
              <p className="text-sm opacity-80">{t.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ===================== FORMAÇÃO & CURSOS ===================== */
function FormacaoCursos() {
  return (
    <section id="formacao" className="mx-auto max-w-6xl px-6 py-16">
      <h3 className="mb-6 text-xl font-semibold text-brand-700 dark:text-white">
        Formação & Cursos
      </h3>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Graduações */}
        <div className="rounded-2xl border p-5">
          <h4 className="font-medium mb-3">Graduações</h4>
          <ul className="space-y-2 text-sm">
            {GRADUACOES.map((g) => (
              <li key={g.titulo}>
                <span className="opacity-60 mr-2">{g.periodo}</span> {g.titulo}
              </li>
            ))}
          </ul>
        </div>

        {/* Outras formações (resumo) */}
        <div className="rounded-2xl border p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Outras Formações</h4>
            <a
              className="text-xs underline hover:opacity-80"
              href="/curriculo.html"
              target="_blank"
              rel="noreferrer"
            >
              Currículo completo →
            </a>
          </div>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {OUTRAS_FORMACOES.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cursos de RH */}
      <div className="rounded-2xl border p-5 mt-6">
        <h4 className="font-medium mb-3">Cursos em RH (seleção)</h4>
        <div className="flex flex-wrap gap-2">
          {RH_CURSOS.map((c) => (
            <span key={c} className="rounded-full border px-3 py-1 text-xs">
              {c}
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
        Curtiu o estilo deste portfólio? Me escreva com o assunto "Projeto" e conte seu desafio em
        4–6 linhas.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button className="bg-brand border-brand text-white hover:opacity-90" asChild>
          <a href={`mailto:${ME.email}`}>
            Mandar e-mail <Mail className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={ME.linkedin} target="_blank" rel="noreferrer">
            Conectar no LinkedIn <Linkedin className="ml-2 h-4 w-4" />
          </a>
        </Button>
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
      <PlanilhasSection />
      <SkillsMarquee />
      <Timeline />
      <FormacaoCursos />
      <Contato />
      <footer className="mx-auto max-w-6xl px-6 py-10 text-xs opacity-60">
        © {new Date().getFullYear()} {ME.nome}. Feito com React + Framer Motion + Tailwind.
      </footer>
    </div>
  );
}
