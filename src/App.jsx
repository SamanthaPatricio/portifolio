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
  ClipboardList,
} from "lucide-react";

/* ====== mini UI (autônoma) ====== */
const Button = ({ href, variant = "solid", className = "", children }) => {
  const base =
    "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm transition";
  const style =
    variant === "outline"
      ? "border border-gray-300 dark:border-neutral-700 bg-transparent"
      : "bg-brand text-white border border-brand hover:opacity-90";
  if (href) {
    const ext = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={`${base} ${style} ${className}`}
        target={ext ? "_blank" : undefined}
        rel={ext ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return <button className={`${base} ${style} ${className}`}>{children}</button>;
};

const Card = ({ className = "", children }) => (
  <div
    className={`rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 ${className}`}
  >
    {children}
  </div>
);
const CardHeader = ({ children }) => <div className="p-4">{children}</div>;
const CardTitle = ({ children, className = "" }) => (
  <div className={`font-semibold ${className}`}>{children}</div>
);
const CardContent = ({ children }) => <div className="p-4 pt-0">{children}</div>;

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 px-3 py-1 text-xs">
    {children}
  </span>
);

/* ===================== CONFIG ===================== */
const ME = {
  nome: "Samantha Patrício",
  titulo: "RH • Estratégia • Cultura • Design de Experiências",
  bio:
    "Sou Samantha Patrício, 26. RH Generalista há 7 anos; implementei RH do zero estruturando subsistemas, rotinas e indicadores. Atuação estratégica alinhada à cultura e objetivos do negócio, com foco em experiência do colaborador, eficiência e leitura de dados. Aberta a novos desafios (RH generalista/estratégico, BP, cultura, desenvolvimento, people analytics e organização de processos).",
  email: "samanthapatricio39@gmail.com",
  github: "https://github.com/SamanthaPatricio",
  linkedin: "https://www.linkedin.com/in/samanthapatricio/",
  cidades: ["Curitiba", "Santa Catarina", "Brasil"],
  logo: "/logo.png"
};

const PROJETOS = [
  {
    titulo: "Playbook de Onboarding com Cultura Viva",
    descricao:
      "Onboarding interativo (microlearning, rituais e métricas de adaptação).",
    tags: ["RH Estratégico", "Onboarding", "Métricas"],
    link: "#"
  },
  {
    titulo: "Arquitetura de Cultura & Espaço",
    descricao:
      "Diretrizes para layout, ergonomia, psicologia das cores e rituais de equipe.",
    tags: ["Arquitetura Corporativa", "Ergonomia", "Branding"],
    link: "#"
  },
  {
    titulo: "Livro: Por que os RHs adoecem",
    descricao:
      "Obra autoral com análise antropológica, psicológica e socioeconômica.",
    tags: ["Livro", "Pesquisa", "Ensaios"],
    link: "#"
  }
];

const LIVROS = [
  {
    titulo: "Como Implementar um Setor de RH Estratégico",
    link:
      "https://www.amazon.com.br/Como-Implementar-Setor-RH-Estrat%C3%A9gico-ebook/dp/B0FBY5S5YW",
    capa: "https://m.media-amazon.com/images/I/61f8jkvibKL._SY466_.jpg"
  },
  {
    titulo: "METODOLOGIA C.I.R.C.U.L.O",
    link:
      "https://www.amazon.com.br/METODOLOGIA-C-I-R-C-U-L-SAMANTHA-PATR%C3%8DCIO-ebook/dp/B0FDJN7TSQ",
    capa:
      "https://m.media-amazon.com/images/I/31X7RaCqo9L._SY445_SX342_ControlCacheEqualizer_.jpg"
  }
];

const PLANILHAS = [
  {
    titulo: "Análise SWOT (Planilha)",
    sub: "Diagnóstico estratégico",
    link: "https://lnkd.in/e6fGsFac"
  },
  {
    titulo: "Planilha de Cargos & Salários",
    sub: "Trilhas e faixas salariais",
    link: "https://go.hotmart.com/P98376571U"
  },
  {
    titulo: "Kit – Planilhas de Marketing",
    sub: "Gestão e growth",
    link: "https://go.hotmart.com/I98391084X"
  }
];

const RH_CURSOS_DESTAQUE = [
  "Consultora Sólides – Profiler (Analista Comportamental)",
  "Analista DISC e Empreendimento",
  "Analista de RH",
  "Analista de Departamento Pessoal",
  "Cargos e Salários",
  "Inovação de RH com IA (imersão)",
  "Microsoft Power BI para RH",
  "Diploma Course in HRM",
  "Reforma Trabalhista e Direito do Trabalho",
  "NR1 | Saúde mental e gestão SST",
  "NR5, NR18, NR33, NR35 — Segurança & Ergonomia",
  "Endomarketing e Marketing Digital",
  "Gestão Financeira e Logística"
];

/* ===================== tema ===================== */
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

/* ===================== hero helpers ===================== */
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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } }
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
};

/* ===================== NAV ===================== */
function Nav({ theme, toggleTheme }) {
  const links = [
    { id: "sobre", label: "Sobre" },
    { id: "projetos", label: "Projetos" },
    { id: "livros", label: "Livros" },
    { id: "solides", label: "Sólides" },
    { id: "cursosrh", label: "Cursos RH" },
    { id: "produtos", label: "Produtos" },
    { id: "formacao", label: "Formação" },
    { id: "contato", label: "Contato" }
  ];
  return (
    <nav className="fixed inset-x-0 top-4 z-50 mx-auto w-fit rounded-full border bg-white/70 dark:bg-neutral-900/60 dark:border-neutral-800 backdrop-blur px-3 md:px-4 py-2 shadow-soft">
      <ul className="flex items-center gap-3">
        <li className="block">
          <a href="#sobre" className="flex items-center gap-2 pr-1">
            {ME.logo && (
              <img
                src={ME.logo}
                alt="logo"
                className="h-10 w-10 md:h-11 md:w-11 object-contain"
              />
            )}
          </a>
        </li>
        {links.map((l) => (
          <li key={l.id} className="hidden sm:block">
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

/* ===================== SEÇÕES ===================== */
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
      <motion.div style={{ y, scale }} className="relative z-10 max-w-4xl text-center px-6">
        {ME.logo && (
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={ME.logo}
            alt="Logotipo"
            className="mx-auto mb-2 h-40 w-40 md:h-44 md:w-44 object-contain"
          />
        )}
        <p className="mt-1 text-lg md:text-xl opacity-80">{ME.titulo}</p>
        <p className="mt-4 text-sm md:text-base opacity-70">{ME.bio}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Badge>{ME.cidades.join(" • ")}</Badge>
          <Badge>Disponível para projetos</Badge>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="#projetos">
            Ver projetos <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button href={`mailto:${ME.email}`} variant="outline">
            Fale comigo <Mail className="ml-2 h-4 w-4" />
          </Button>
          <Button href={ME.linkedin} variant="outline">
            LinkedIn <Linkedin className="ml-2 h-4 w-4" />
          </Button>
          <Button href={ME.github} variant="outline">
            GitHub <Github className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl"
        style={{
          x: offset.x,
          y: offset.y,
          background:
            "radial-gradient(600px circle at 50% 50%, rgba(157,124,43,.20), transparent 60%)"
        }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "radial-gradient(600px circle at 50% 50%, rgba(157,124,43,.12), transparent 60%)"
        }}
      />

      <div className="absolute bottom-10 flex items-center gap-2 opacity-60">
        <MousePointerClick className="h-4 w-4" />
        <span className="text-xs">Passe o mouse, role, clique</span>
      </div>
    </section>
  );
}

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

const BookCard = ({ capa, titulo, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noreferrer"
    className="group block rounded-2xl border bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 p-4 hover:-translate-y-1 transition"
  >
    <div className="mx-auto w-[220px] h-[320px] overflow-hidden rounded-xl bg-white dark:bg-neutral-800 grid place-items-center">
      <img
        src={capa}
        alt={titulo}
        className="max-h-[96%] max-w-[96%] object-contain"
        loading="lazy"
      />
    </div>
    <div className="mt-3 text-center text-sm font-medium">{titulo}</div>
    <div className="mt-1 text-center text-xs opacity-70 group-hover:underline">
      Ver na Amazon
    </div>
  </a>
);

function BooksSection() {
  return (
    <section id="livros" className="py-12 mx-auto max-w-6xl px-6">
      <h2 className="text-2xl font-semibold mb-6 text-brand-700 dark:text-white">
        Livros
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LIVROS.map((b) => (
          <BookCard key={b.titulo} {...b} />
        ))}
      </div>
    </section>
  );
}

function SolidesSection() {
  const assunto = encodeURIComponent("Orçamento Profiler Sólides");
  const corpo = encodeURIComponent(
    `Olá, quero orçamento de Profiler Sólides.\n\nEmpresa / Time:\nPessoas avaliadas:\nPrazo desejado:\nObjetivo (seleção, desenvolvimento, liderança, cultura etc.):`
  );
  const link = `mailto:${ME.email}?subject=${assunto}&body=${corpo}`;

  return (
    <section id="solides" className="py-12 mx-auto max-w-6xl px-6">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-brand-700 dark:text-white">
            Sólides • Profiler (Analista Comportamental)
          </h2>
          <p className="mt-3 opacity-80 text-sm">
            Aplicação do Profiler, devolutiva executiva e recomendações práticas
            para seleção, onboarding, desenvolvimento e desenho de cultura/rituais.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>• Avaliação individual e de time</li>
            <li>• Perfis, motivadores, comunicação, performance e riscos</li>
            <li>• Plano de ação para liderança e RH</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <Button href={link}>Pedir orçamento</Button>
            <Button href={ME.linkedin} variant="outline">
              Ver cases no LinkedIn
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Entregáveis
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-90 space-y-2">
            <p>• Relatório Profiler + leitura executiva</p>
            <p>• Mapa de Time + riscos e combinações</p>
            <p>• Roteiro de comunicação e ritos de gestão</p>
            <p>• Sugestões de trilha (T&D/experiência)</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function CursosRHSection() {
  return (
    <section id="cursosrh" className="bg-gray-100 dark:bg-neutral-900/40 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <h3 className="mb-6 text-xl font-semibold">Cursos de RH (destaque)</h3>
        <div className="flex flex-wrap gap-2">
          {RH_CURSOS_DESTAQUE.map((c) => (
            <span
              key={c}
              className="rounded-full border px-3 py-1 text-xs bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProdutosSection() {
  return (
    <section id="produtos" className="py-12 mx-auto max-w-6xl px-6">
      <h2 className="text-2xl font-semibold mb-6 text-brand-700 dark:text-white">
        Produtos & Planilhas
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLANILHAS.map((p) => (
          <li key={p.titulo}>
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl border p-4 hover:bg-gray-50 dark:hover:bg-neutral-800 transition bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800"
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

const GRADUACOES = [
  { periodo: "2024–2026", titulo: "Tecnólogo em Recursos Humanos — em andamento" },
  { periodo: "2024–2028", titulo: "Arquitetura e Urbanismo — Unicesumar (PROUNI — Bolsa 100%)" }
];
const OUTRAS_FORMACOES = [
  "Biomedicina (4 anos)",
  "USP/ICB — Biotecnologia; Bioética; Bioterismo; Modelagem Molecular (GBI Hands On); Radiobiologia; Bioimpressão 3D; Orientação no Lab. de Controle Sanitário e Genético (ICB II)",
  "UFV — Auxiliar de Biotecnologia",
  "Harvard (edX) — Bioética para pesquisa em ciências da vida",
  "UFSC — Neuroanatomia e Neurofisiologia",
  "Univali — 1 ano de Fonoaudiologia; 1 ano de Publicidade e Propaganda; Simpósio de Ética em Pesquisa"
];

function FormacaoCursos() {
  return (
    <section id="formacao" className="mx-auto max-w-6xl px-6 py-16">
      <h3 className="mb-6 text-xl font-semibold text-brand-700 dark:text-white">
        Formação & Cursos
      </h3>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Graduações</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {GRADUACOES.map((g) => (
                <li key={g.titulo}>
                  <span className="opacity-60 mr-2">{g.periodo}</span> {g.titulo}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Outras Formações</CardTitle>
              <a
                className="text-xs underline hover:opacity-80"
                href="/curriculo.html"
                target="_blank"
                rel="noreferrer"
              >
                Currículo completo →
              </a>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {OUTRAS_FORMACOES.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Contato() {
  return (
    <section id="contato" className="mx-auto max-w-3xl px-6 py-16">
      <h3 className="mb-4 text-xl font-semibold">Contato</h3>
      <p className="opacity-80 text-sm">
        Curtiu o estilo deste portfólio? Me escreva com o assunto "Projeto" e conte seu desafio em
        4–6 linhas.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={`mailto:${ME.email}`}>Mandar e-mail <Mail className="ml-2 h-4 w-4" /></Button>
        <Button href={ME.linkedin} variant="outline">Conectar no LinkedIn <Linkedin className="ml-2 h-4 w-4" /></Button>
      </div>
    </section>
  );
}

export default function App() {
  const { theme, toggle } = useTheme();
  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0c0c0c] text-gray-900 dark:text-gray-100 antialiased">
      <Nav theme={theme} toggleTheme={toggle} />
      <Hero />
      <Projetos />
      <BooksSection />
      <SolidesSection />
      <CursosRHSection />
      <ProdutosSection />
      <FormacaoCursos />
      <Contato />
      <footer className="mx-auto max-w-6xl px-6 py-10 text-xs opacity-60">
        © {new Date().getFullYear()} {ME.nome}. Feito com React + Framer Motion + Tailwind.
      </footer>
    </div>
  );
}
