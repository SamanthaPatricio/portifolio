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
  CheckCircle2,
  BarChart3,
  Users2,
  FileText,
} from "lucide-react";

import { Button } from "./components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";

/* ===================== CONFIG ===================== */
const ME = {
  nome: "Samantha Patrício",
  titulo: "RH • Estratégia • Cultura • Design de Experiências",
  bio:
    "Sou RH Generalista (7 anos). Já implementei RH do zero, estruturando subsistemas, rotinas e indicadores. Atuação estratégica, cultura viva e leitura de dados.",
  email: "samanthapatricio39@gmail.com",
  github: "https://github.com/SamanthaPatricio",
  linkedin: "https://www.linkedin.com/in/samanthapatricio/",
  cidades: ["Curitiba", "Santa Catarina", "Brasil"],
  logo: "/logo.png",
};

const PROJETOS = [
  {
    titulo: "Playbook de Onboarding com Cultura Viva",
    descricao:
      "Onboarding interativo com microlearning, rituais práticos e métricas de adaptação.",
    tags: ["RH Estratégico", "Onboarding", "Métricas"],
    link: "#",
  },
  {
    titulo: "Arquitetura de Cultura & Espaço",
    descricao:
      "Diretrizes para layout, ergonomia, psicologia das cores e ritmos de equipe.",
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

/* ========= LIVROS (usa local > remoto > placeholder) ========= */
const LIVROS = [
  {
    titulo: "Como Implementar um Setor de RH Estratégico",
    link:
      "https://www.amazon.com.br/Como-Implementar-Setor-RH-Estrat%C3%A9gico-ebook/dp/B0FBY5S5YW",
    capaLocal: "/capas/rh-estrategico.jpg",
    capaRemota: "https://m.media-amazon.com/images/I/61f8jkvibKL._SY466_.jpg",
  },
  {
    titulo: "METODOLOGIA C.I.R.C.U.L.O",
    link:
      "https://www.amazon.com.br/METODOLOGIA-C-I-R-C-U-L-SAMANTHA-PATR%C3%8DCIO-ebook/dp/B0FDJN7TSQ",
    capaLocal: "/capas/metodologia-circulo.jpg",
    capaRemota:
      "https://m.media-amazon.com/images/I/31X7RaCqo9L._SY445_SX342_ControlCacheEqualizer_.jpg",
  },
];

/* ========= PLANOS/CTA SOLIDES ========= */
const SOLIDES_OFERTAS = [
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    titulo: "Mapa comportamental (Profiler Sólides)",
    texto:
      "Aplicação, leitura e devolutiva do Profiler por analista certificada. Fit cultural, forças, riscos e sugestões práticas.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    titulo: "People Analytics & Dashboards",
    texto:
      "KPIs/KPOs de RH (turnover, absenteísmo, T&D, clima, custos, tempo de contratação) em painéis no Power BI.",
  },
  {
    icon: <Users2 className="h-5 w-5" />,
    titulo: "Estruturação de RH",
    texto:
      "Do zero à operação: políticas, fluxos, C&S, trilhas de carreira, integração, folha/ponto e governança.",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    titulo: "Treinamentos & Cultura",
    texto:
      "Onboarding vivo, liderança de 1ª posição, comunicação, segurança (NRs/CIPA) e cultura organizacional.",
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

/* ===================== TIMELINE ===================== */
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
      "Implantei RH do zero e estruturei processos e subsistemas, fortalecendo gestão e indicadores.",
  },
  {
    ano: "2019–2023",
    titulo: "Base acadêmica & método científico",
    texto:
      "Formação multidisciplinar (neuropsicologia, psicologia do trabalho/social, antropologia, bioética e biomedicina).",
  },
];

/* ===================== MOTION HELPERS ===================== */
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
    <span className="inline-flex items-center rounded-full border border-gray-300 dark:border-neutral-700 px-3 py-1 text-xs text-gray-700 dark:text-gray-300">
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
    theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

/* ===================== NAV ===================== */
function Nav({ theme, toggleTheme }) {
  const links = [
    { id: "sobre", label: "Sobre" },
    { id: "projetos", label: "Projetos" },
    { id: "livros", label: "Livros" },
    { id: "solides", label: "Consultoria" },
    { id: "skills", label: "Skills" },
    { id: "trajetoria", label: "Trajetória" },
    { id: "formacao", label: "Formação" },
    { id: "contato", label: "Contato" },
  ];
  return (
    <nav className="fixed inset-x-0 top-4 z-50 mx-auto w-fit rounded-full border bg-white/70 dark:bg-neutral-900/60 dark:border-neutral-800 backdrop-blur px-3 md:px-4 py-2 shadow-soft">
      <ul className="flex items-center gap-3">
        <li>
          <a href="#sobre" className="flex items-center gap-2 pr-2">
            {ME.logo && (
              <img src={ME.logo} alt="logo" className="h-6 w-6 object-contain" />
            )}
            {/* tira o nome visível no nav */}
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
            alt="Logotipo Samantha Patrício"
            className="mx-auto mb-6 h-32 w-32 md:h-40 md:w-40 object-contain"
          />
        )}
        {/* Nome escondido só para SEO/acessibilidade */}
        <h1 className="sr-only">{ME.nome}</h1>

        <p className="text-lg md:text-xl opacity-80">{ME.titulo}</p>
        <p className="mt-4 text-sm md:text-base opacity-70">{ME.bio}</p>

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

/* ===================== PROJETOS (com contraste no dark) ===================== */
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
            <Card className="h-full transition-transform duration-300 group-hover:-translate-y-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-brand-700" /> {p.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {p.descricao}
                </p>
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

/* ===================== LIVROS (capa pra fora, sem inverter) ===================== */
function BookCard({ titulo, link, capaLocal, capaRemota }) {
  const [open, setOpen] = useState(false);

  // escolhe a melhor imagem disponível
  const [src, setSrc] = useState(capaLocal || capaRemota || "/logo.png");
  useEffect(() => setSrc(capaLocal || capaRemota || "/logo.png"), [capaLocal, capaRemota]);

  return (
    <div className="relative flex items-start gap-6">
      <div
        className="relative w-[240px] h-[320px] perspective-1000"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Capa externa (NÃO espelha) */}
        <motion.div
          className="absolute inset-0 origin-left rounded-2xl shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
          animate={{ rotateY: open ? -180 : 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
        >
          <div className="w-full h-full rounded-2xl bg-white/95 dark:bg-neutral-900 grid place-items-center p-4">
            <img
              src={src}
              onError={() => setSrc(capaRemota || "/logo.png")}
              alt={titulo}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="max-h-[75%] object-contain"
            />
            <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-200 text-center px-2">
              {titulo}
            </p>
          </div>
        </motion.div>

        {/* Parte de dentro (link) */}
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

        {/* Página da direita fixa */}
        <div className="absolute left-[240px] top-0 w-[240px] h-[320px] rounded-2xl shadow-lg bg-white/90 dark:bg-neutral-800 grid place-items-center">
          <span className="text-gray-500 dark:text-gray-300 text-sm">
            Passe o mouse na capa →
          </span>
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
          <BookCard key={b.titulo} {...b} />
        ))}
      </div>
    </section>
  );
}

/* ===================== CONSULTORIA / SÓLIDES PROFILER ===================== */
function SolidesSection() {
  const subject =
    encodeURIComponent("Orçamento | Profiler Sólides / Estruturação de RH / People Analytics");
  const body = encodeURIComponent(
    `Olá Samantha,
    
Quero um orçamento para:
- ( ) Profiler Sólides
- ( ) Estruturação de RH
- ( ) Dashboards / KPIs (Power BI)
- ( ) Treinamentos

Empresa / Tamanho do time:
Prazo desejado:
Objetivo principal:`
  );
  const href = `mailto:${ME.email}?subject=${subject}&body=${body}`;

  return (
    <section id="solides" className="py-16 mx-auto max-w-6xl px-6">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-brand-700 dark:text-white">
          Consultoria · Sólides Profiler & RH Estratégico
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          Analista **Profiler Sólides** certificada. Entrego diagnóstico comportamental, indicadores
          de gente e estruturação de processos com foco em performance e cultura viva.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {SOLIDES_OFERTAS.map((f) => (
          <div
            key={f.titulo}
            className="rounded-2xl border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 p-5"
          >
            <div className="flex items-start gap-3">
              <span className="text-brand-700">{f.icon}</span>
              <div>
                <div className="font-medium">{f.titulo}</div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">{f.texto}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button className="bg-brand border-brand text-white hover:opacity-90" asChild>
          <a href={href}>Pedir orçamento</a>
        </Button>
      </div>
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
const GRADUACOES = [
  { periodo: "2024–2026", titulo: "Tecnólogo em Recursos Humanos — em andamento" },
  { periodo: "2024–2028", titulo: "Arquitetura e Urbanismo — Unicesumar (PROUNI — Bolsa 100%)" },
];

const OUTRAS_FORMACOES = [
  "Biomedicina (4 anos) — Uniasselvi",
  "USP/ICB — Biotecnologia; Bioética; Bioterismo; Modelagem Molecular (GBI Hands On); Radiobiologia; Bioimpressão 3D; Orientação no Lab. de Controle Sanitário e Genético (ICB II).",
  "UFV — Auxiliar de Biotecnologia.",
  "Harvard (edX) — Bioética para pesquisa em ciências da vida.",
  "UFSC — Neuroanatomia e Neurofisiologia.",
  "Univali — 1 ano de Fonoaudiologia; 1 ano de Publicidade e Propaganda; Simpósio “Revisão ética em pesquisas com seres humanos”.",
];

const RH_CURSOS = [
  "Consultora Sólides – Profiler (Analista comportamental)",
  "Analista DISC e Empreendimento; Analista de RH; Analista de DP",
  "Cargos & Salários; Inovação de RH com IA (imersão)",
  "Microsoft Power BI (dashboards e relatórios de RH)",
  "Course/Diploma in Human Resource Management (HRM)",
  "Reforma Trabalhista e Direito do Trabalho",
  "NR1 — Saúde mental; NR5, NR18, NR33, NR35 — Segurança & Ergonomia",
  "Endomarketing e Marketing Digital; Gestão Financeira; Logística",
  "DP em Ação 2024; Open Mind 2025; A Ciência da Felicidade (BerkeleyX)",
  "Avaliação de valores (UPValenciaX); Gestão de Pessoas (UNCordobaX)",
  "Inteligência Emocional e Liderança (AnahuacX); Strategic HR (StellenBoschX)",
  "Liderança — Daniel Spinelli; Organizational Psychology (UCX); ESG & Créditos de Carbono",
  "Libras — Básico",
];

function FormacaoCursos() {
  return (
    <section id="formacao" className="mx-auto max-w-6xl px-6 py-16">
      <h3 className="mb-6 text-xl font-semibold text-brand-700 dark:text-white">
        Formação & Cursos
      </h3>

      <div className="grid gap-6 md:grid-cols-2">
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

        <div className="rounded-2xl border p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Outras Formações</h4>
            <a className="text-xs underline hover:opacity-80" href="/curriculo.html" target="_blank" rel="noreferrer">
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

      <div className="rounded-2xl border p-5 mt-6">
        <h4 className="font-medium mb-3">Cursos (seleção)</h4>
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
        Quer conversar sobre um projeto? Envie 4–6 linhas com contexto, metas e prazos.
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
      <SolidesSection />
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
