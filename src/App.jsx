import React, { useState } from "react";
import { motion } from "framer-motion";


// ====== CONFIG ======
const ME = {
  nome: 'Samantha Patrício',
  titulo: 'RH • Estratégia • Cultura • Design de Experiências',
  bio: 'Integro Pessoas, Processos e Espaços. Crio experiências vivas para marcas e times.',
  email: 'samantha.patricio56@outlook.com',
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/in/',
  cidades: ['Curitiba', 'Santa Catarina', 'Brasil'],
  logo: '/logo.png', // coloque seu arquivo em public/
}

const PROJETOS = [
  {
    titulo: 'Playbook de Onboarding com Cultura Viva',
    descricao: 'Onboarding interativo (microlearning, rituais e métricas de adaptação).',
    tags: ['RH Estratégico', 'Onboarding', 'Métricas'],
    link: '#',
  },
  {
    titulo: 'Arquitetura de Cultura & Espaço',
    descricao: 'Diretrizes para layout, ergonomia, psicologia das cores e rituais de equipe.',
    tags: ['Arquitetura Corporativa', 'Ergonomia', 'Branding'],
    link: '#',
  },
  {
    titulo: 'Livro: Por que os RHs adoecem',
    descricao: 'Obra autoral com análise antropológica, psicológica e socioeconômica.',
    tags: ['Livro', 'Pesquisa', 'Ensaios'],
    link: '#',
  },
]

const LIVROS = [
  { titulo: 'Por que os RHs adoecem', sub: 'Livro autoral', link: '#' },
  { titulo: 'Como Implementar um Setor de RH Estratégico', sub: 'Guia prático', link: '#' },
]

const SKILLS = [
  'People Analytics',
  'Recrutamento & Seleção',
  'Cultura & Clima',
  'Arquitetura Corporativa',
  'Comunicação Não-Violenta',
  'Liderança 1ª posição',
  'Design de Aprendizagem',
  'OKRs & KPIs',
  'Power BI / Excel',
]

const TIMELINE = [
  { ano: '2025', titulo: 'Autora & Consultora', texto: 'Lançamento de obras em RH e projetos de cultura organizacional hands-on.' },
  { ano: '2024', titulo: 'Estruturação de RH – Michelson Strong Store', texto: 'Implantei processos para 4 unidades, ritos de gestão e indicadores.' },
  { ano: '2019-2023', titulo: 'Formações & Pesquisa', texto: 'Biomedicina (4 anos), neuropsicologia, psicologia do trabalho, bioética.' },
]

// ====== HELPERS ======
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } },
}

function useMouseParallax(multiplier = 0.03) {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * multiplier
      const y = (e.clientY - rect.top - rect.height / 2) * multiplier
      setOffset({ x, y })
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [multiplier])
  return { ref, offset }
}

function Badge({ children }) {
  return <span className='inline-flex items-center rounded-full border px-3 py-1 text-xs opacity-90'>{children}</span>
}

// ====== SEÇÕES ======
function Nav() {
  const links = [
    { id: 'sobre', label: 'Sobre' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'livros', label: 'Livros' },
    { id: 'skills', label: 'Skills' },
    { id: 'trajetoria', label: 'Trajetória' },
    { id: 'contato', label: 'Contato' },
  ]
  return (
    <nav className='fixed inset-x-0 top-4 z-50 mx-auto w-fit rounded-full border bg-white/70 backdrop-blur px-3 md:px-4 py-2 shadow-soft'>
      <ul className='flex items-center gap-3'>
        <li className='hidden md:block'>
          <a href='#sobre' className='flex items-center gap-2 pr-2'>
            {ME.logo && <img src={ME.logo} alt='logo' className='h-6 w-6 object-contain' />}
            <span className='text-sm font-medium'>{ME.nome.split(' ')[0]}</span>
          </a>
        </li>
        {links.map((l) => (
          <li key={l.id}>
            <a href={`#${l.id}`} className='text-sm hover:opacity-70'>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 400], [0, 80])
  const scale = useTransform(scrollY, [0, 400], [1, 0.9])
  const { ref, offset } = useMouseParallax(0.04)

  return (
    <section id='sobre' ref={ref} className='relative flex min-h-screen items-center justify-center overflow-hidden'>
      <motion.div style={{ y, scale }} className='relative z-10 max-w-3xl text-center px-6'>
        {ME.logo && (
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={ME.logo}
            alt='Logotipo'
            className='mx-auto mb-4 h-16 w-16 object-contain'
          />
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80 }}
          className='text-4xl md:text-6xl font-bold tracking-tight'
        >
          {ME.nome}
        </motion.h1>
        <motion.p className='mt-2 text-lg md:text-xl opacity-80'>{ME.titulo}</motion.p>
        <motion.p className='mt-4 text-sm md:text-base opacity-70'>{ME.bio}</motion.p>
        <div className='mt-6 flex flex-wrap items-center justify-center gap-2'>
          <Badge>{ME.cidades.join(' • ')}</Badge>
          <Badge>Disponível para projetos</Badge>
        </div>
        <div className='mt-8 flex flex-wrap justify-center gap-3'>
          <Button asChild>
            <a href='#projetos'>
              Ver projetos <ArrowRight className='ml-2 h-4 w-4' />
            </a>
          </Button>
          <Button variant='outline' asChild>
            <a href={`mailto:${ME.email}`}>
              Fale comigo <Mail className='ml-2 h-4 w-4' />
            </a>
          </Button>
          <Button variant='outline' asChild>
            <a href={ME.linkedin} target='_blank' rel='noreferrer'>
              LinkedIn <Linkedin className='ml-2 h-4 w-4' />
            </a>
          </Button>
          <Button variant='outline' asChild>
            <a href={ME.github} target='_blank' rel='noreferrer'>
              GitHub <Github className='ml-2 h-4 w-4' />
            </a>
          </Button>
        </div>
      </motion.div>

      {/* Fundo animado */}
      <motion.div
        className='pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl'
        style={{
          x: offset.x,
          y: offset.y,
          background: 'radial-gradient(600px circle at 50% 50%, rgba(59,130,246,.25), transparent 60%)',
        }}
      />
      <motion.div
        className='pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl'
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{
          background: 'radial-gradient(600px circle at 50% 50%, rgba(168,85,247,.20), transparent 60%)',
        }}
      />

      <div className='absolute bottom-10 flex items-center gap-2 opacity-60'>
        <MousePointerClick className='h-4 w-4' />
        <span className='text-xs'>Passe o mouse, role, clique</span>
      </div>
    </section>
  )
}

function Projetos() {
  return (
    <section id='projetos' className='mx-auto max-w-6xl px-6 py-16'>
      <div className='mb-8 flex items-end justify-between'>
        <h2 className='text-2xl md:text-3xl font-semibold'>Projetos em Destaque</h2>
        <div className='text-sm opacity-70'>clique para saber mais</div>
      </div>
      <motion.div variants={container} initial='hidden' whileInView='show' viewport={{ once: true, margin: '-80px' }} className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {PROJETOS.map((p, i) => (
          <motion.a key={i} variants={item} href={p.link} className='group'>
            <Card className='h-full transition-transform duration-300 group-hover:-translate-y-1'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Rocket className='h-5 w-5' /> {p.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm opacity-80'>{p.descricao}</p>
                <div className='mt-4 flex flex-wrap gap-2'>
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
  )
}

function SkillsMarquee() {
  return (
    <section id='skills' className='bg-gray-100 py-12'>
      <div className='mx-auto max-w-6xl px-6'>
        <h3 className='mb-6 text-xl font-semibold'>Stack & Competências</h3>
        <div className='relative overflow-hidden'>
          <motion.div className='flex gap-6 whitespace-nowrap' animate={{ x: [0, -800] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
            {SKILLS.concat(SKILLS).map((s, i) => (
              <span key={i} className='rounded-full border px-4 py-2 text-sm opacity-80'>
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Timeline() {
  return (
    <section id='trajetoria' className='mx-auto max-w-5xl px-6 py-16'>
      <h3 className='mb-8 text-xl font-semibold'>Trajetória</h3>
      <div className='relative'>
        <div className='absolute left-4 top-0 bottom-0 w-px bg-gray-200' />
        <ul className='space-y-8'>
          {TIMELINE.map((t, i) => (
            <li key={i} className='relative pl-10'>
              <span className='absolute left-2 top-1.5 block h-4 w-4 rounded-full border bg-white' />
              <div className='text-sm opacity-60'>{t.ano}</div>
              <div className='text-base font-medium'>{t.titulo}</div>
              <p className='text-sm opacity-80'>{t.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Livros() {
  const [open, setOpen] = useState(false)
  return (
    <section id='livros' className='mx-auto max-w-6xl px-6 py-16'>
      <div className='mb-6 flex items-center justify-between'>
        <h3 className='text-2xl font-semibold'>Livros</h3>
        <div className='text-sm opacity-70'>clique no livro para abrir</div>
      </div>
      <div className='grid gap-8 lg:grid-cols-2 items-center'>
        <motion.div className='relative mx-auto h-64 w-48 cursor-pointer [perspective:1000px]' onClick={() => setOpen(!open)}>
          <motion.div
            className='absolute inset-0 rounded-xl border bg-gradient-to-br from-white to-gray-100 shadow-soft'
            style={{ transformOrigin: 'left' }}
            animate={{ rotateY: open ? -160 : 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          >
            <div className='flex h-full flex-col items-center justify-center gap-2 p-4 text-center'>
              {ME.logo && <img src={ME.logo} alt='logo' className='h-10 w-10' />}
              <div className='text-sm opacity-80'>Biblioteca de {ME.nome.split(' ')[0]}</div>
              <div className='text-xs opacity-60'>Clique para abrir</div>
            </div>
          </motion.div>

          <div className='absolute inset-0 grid grid-cols-2 rounded-xl border bg-white shadow-soft'>
            <div className='rounded-l-xl bg-gray-100' />
            <div className='rounded-r-xl bg-white' />
          </div>
        </motion.div>

        <motion.ul variants={container} initial='hidden' animate={open ? 'show' : 'hidden'} className='grid gap-3'>
          {LIVROS.map((b, i) => (
            <motion.li key={i} variants={item}>
              <a href={b.link} target='_blank' rel='noreferrer' className='group flex items-center justify-between rounded-xl border px-4 py-3 hover:bg-gray-100'>
                <div>
                  <div className='font-medium'>{b.titulo}</div>
                  <div className='text-xs opacity-70'>{b.sub}</div>
                </div>
                <ArrowRight className='h-4 w-4 opacity-60 group-hover:translate-x-0.5 transition' />
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

function Contato() {
  return (
    <section id='contato' className='mx-auto max-w-3xl px-6 py-16'>
      <h3 className='mb-4 text-xl font-semibold'>Contato</h3>
      <p className='opacity-80 text-sm'>Curtiu o estilo deste portfólio? Me escreva com o assunto "Projeto" e conte seu desafio em 4-6 linhas.</p>
      <div className='mt-6 flex flex-wrap gap-3'>
        <Button asChild>
          <a href={`mailto:${ME.email}`}>
            Mandar e-mail <Mail className='ml-2 h-4 w-4' />
          </a>
        </Button>
        <Button variant='outline' asChild>
          <a href={ME.linkedin} target='_blank' rel='noreferrer'>
            Conectar no LinkedIn <Linkedin className='ml-2 h-4 w-4' />
          </a>
        </Button>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className='relative min-h-screen bg-white text-gray-900 antialiased'>
      <Nav />
      <Hero />
      <Projetos />
      <Livros />
      <SkillsMarquee />
      <Timeline />
      <Contato />
      <footer className='mx-auto max-w-6xl px-6 py-10 text-xs opacity-60'>
        © {new Date().getFullYear()} {ME.nome}. Feito com React + Framer Motion + Tailwind.
      </footer>
    </div>
  )
}
