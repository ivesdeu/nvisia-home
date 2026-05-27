import { useState, useEffect, useRef, type ReactNode } from 'react'
import {
  ArrowRight,
  Globe,
  Share2,
  ExternalLink,
  ChevronRight,
  Zap,
  Shield,
  Users,
  CheckCircle2,
  Star,
  Building2,
  MapPin,
  Menu,
  X,
  Sparkles,
} from 'lucide-react'
import HeroBadge from '@/components/ui/hero-badge'
import { Gallery4 } from '@/components/blocks/gallery4'
import { Testimonials } from '@/components/blocks/testimonials'
import { Blog7 } from '@/components/blocks/blog7'

const caseStudyItems = [
  {
    id: 'elca',
    title: 'ELCA: Intelligent Search at Scale',
    description:
      'Transforming digital discovery through human-centered AI. We rebuilt the search experience to make millions of resources findable, relevant, and contextual for every visitor.',
    href: '#',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
  },
  {
    id: 'fnbt',
    title: 'First National Bank and Trust',
    description:
      'Architecting a data strategy that lets a regional bank compete in a digital-first world — modern lakehouse, unified customer view, real-time analytics.',
    href: '#',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
  },
  {
    id: 'fhlbc',
    title: 'FHLBank Chicago: CX Overhaul',
    description:
      'Guiding a financial institution through a significant customer experience overhaul — research-driven design, modern frontend, and a new self-service portal.',
    href: '#',
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
  },
  {
    id: 'wholesaler',
    title: 'Leading National Wholesaler',
    description:
      'Multi-year partnership spanning enterprise architecture, product development, and UX — modernizing systems that move billions in inventory every quarter.',
    href: '#',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
  },
  {
    id: 'platform',
    title: 'Enterprise AI Enablement',
    description:
      'From AI strategy roadmap to production deployment — embedding agentic workflows, RAG pipelines, and governance into the way teams ship every day.',
    href: '#',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
  },
]

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = ['What We Do', 'Case Studies', 'Insights', 'Who We Are']

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0 md:justify-self-start">
          <img src="/nvisia-logo.png" alt="nvisia" className="h-11 w-auto" />
        </a>

        {/* Desktop nav (centered column) */}
        <div className="hidden md:flex items-center gap-8 md:justify-self-center">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-[#F15A22] transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4 md:justify-self-end">
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-[#F15A22] transition-colors">
            Events
          </a>
          <a
            href="#"
            className="bg-[#F15A22] hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5"
          >
            Let's Connect
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-sm font-medium text-gray-700">
              {link}
            </a>
          ))}
          <a href="#" className="text-sm font-medium text-gray-600">Events</a>
          <a
            href="#"
            className="bg-[#F15A22] text-white text-sm font-semibold px-5 py-2.5 rounded-full text-center"
          >
            Let's Connect
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── Scroll hooks & Reveal ────────────────────────────────────────────────────
function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setY(window.scrollY))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  return y
}

function Reveal({
  children,
  delay = 0,
  className = '',
  y = 8,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${y * 4}px)`,
      }}
    >
      {children}
    </div>
  )
}

// ─── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({
  end,
  duration = 1800,
  suffix = '',
}: {
  end: number
  duration?: number
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
            setCount(Math.round(end * eased))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix && <span className="text-[0.6em] align-top ml-0.5">{suffix}</span>}
    </span>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollY = useScrollY()
  // Soft fade-out & lift of hero content as user scrolls past it (capped)
  const heroFade = Math.max(0, 1 - scrollY / 600)
  const heroLift = Math.min(scrollY * 0.15, 80)

  return (
    <section className="bg-white relative min-h-screen pt-40 pb-24 flex items-center overflow-hidden">
      {/* Ambient blobs — parallax at varying speeds */}
      <div
        className="blob-glow absolute w-[36rem] h-[36rem] rounded-full pointer-events-none will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(107,33,168,0.35) 0%, rgba(241,90,34,0.25) 50%, transparent 70%)',
          filter: 'blur(80px)',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, calc(-50% + ${scrollY * 0.35}px))`,
        }}
      />
      <div
        className="absolute w-72 h-72 rounded-full pointer-events-none will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(241,90,34,0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: '20%',
          left: '15%',
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      <div
        className="absolute w-72 h-72 rounded-full pointer-events-none will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(107,33,168,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
          bottom: '15%',
          right: '15%',
          transform: `translateY(${scrollY * -0.25}px)`,
        }}
      />

      <div
        className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center text-center"
        style={{
          opacity: heroFade,
          transform: `translateY(${heroLift}px)`,
        }}
      >
        <div className="mb-10">
          <HeroBadge
            text="AI-Enhanced Transformation"
            variant="default"
            size="md"
            icon={<Sparkles className="h-4 w-4" />}
            endIcon={<ChevronRight className="h-4 w-4" />}
            className="border-transparent bg-orange-50 text-[#F15A22] font-semibold uppercase tracking-wide shadow-sm hover:bg-orange-100"
          />
        </div>

        <h1 className="text-center text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1E1033] leading-[1.05] mb-10 tracking-tight max-w-4xl mx-auto">
          <span className="text-[#F15A22]">Transform systems.</span>{' '}
          Ship products.{' '}
          <span className="bg-gradient-to-r from-[#6B21A8] to-[#F15A22] bg-clip-text text-transparent">
            Build real AI.
          </span>
        </h1>

        <p className="text-center text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Grounded in architecture, not hype.{' '}
          <strong className="font-semibold text-[#1E1033]">35 years</strong> of making transformation actually happen.
        </p>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          <a
            href="#"
            className="bg-[#F15A22] hover:bg-orange-600 text-white text-base font-semibold px-9 py-4 rounded-full transition-all hover:shadow-xl hover:shadow-orange-200 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 min-w-[220px]"
          >
            Talk with an Expert
            <ArrowRight size={18} />
          </a>
          <a
            href="#"
            className="bg-white/80 backdrop-blur border-2 border-[#1E1033] text-[#1E1033] hover:bg-[#1E1033] hover:text-white text-base font-semibold px-9 py-4 rounded-full transition-all inline-flex items-center justify-center gap-2 min-w-[220px]"
          >
            See Our Work
            <ChevronRight size={18} />
          </a>
        </div>

        {/* Social proof */}
        <div className="mt-16 flex items-center gap-4 justify-center mx-auto">
          <div className="flex -space-x-2">
            {['bg-orange-400', 'bg-purple-500', 'bg-blue-400', 'bg-green-400'].map((c, i) => (
              <div key={i} className={`w-10 h-10 rounded-full ${c} border-2 border-white shadow-sm`} />
            ))}
          </div>
          <div className="text-left">
            <div className="flex gap-0.5 mb-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-[#F15A22] text-[#F15A22]" />
              ))}
            </div>
            <span className="text-sm text-gray-500 font-medium">Trusted by 400+ enterprise clients</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
function Marquee() {
  const logos = ['Google Cloud', 'Amazon AWS', 'Microsoft Azure', 'Snowflake', 'Databricks', 'Docker', 'Elastic', 'Kubernetes', 'Terraform', 'Confluent']
  const doubled = [...logos, ...logos]

  return (
    <div className="hidden sm:block bg-white border-y border-gray-100 py-4 overflow-hidden">
      <div className="flex items-center">
        <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
          {doubled.map((logo, i) => (
            <span key={i} className="text-gray-400 font-semibold text-sm tracking-wide hover:text-gray-600 transition-colors cursor-default">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── The Problem ──────────────────────────────────────────────────────────────
function ProblemSection() {
  const stats = [
    { value: 35, suffix: '', label: 'Years in Tech' },
    { value: 400, suffix: '+', label: 'Enterprise Clients' },
    { value: 92, suffix: '%', label: 'Repeat Clients' },
  ]

  return (
    <section className="bg-[#1E1033] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight">
              Most organizations aren't{' '}
              <span className="text-[#F15A22]">short on ambition.</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              They're short on the architectural foundation to make it stick.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map(({ value, suffix, label }, i) => (
            <Reveal key={label} delay={i * 120}>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 hover:border-white/30 transition-all group">
                <div className="text-5xl md:text-6xl font-medium text-[#F15A22] mb-3 group-hover:scale-105 transition-transform">
                  <CountUp end={value} suffix={suffix} />
                </div>
                <div className="text-white/70 font-medium text-lg">{label}</div>
                <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#F15A22]/40 to-transparent" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Solutions ────────────────────────────────────────────────────────────────
function SolutionsSection() {
  const solutions = [
    {
      num: '01',
      title: 'AI-Accelerated Legacy Modernization',
      desc: 'Transform aging systems using AI to accelerate analysis, migrate risk, and build future-ready architectures.',
      bullets: [
        'AI-driven codebase analysis & dependency mapping',
        'Risk-scored migration roadmaps',
        'Incremental modernization without disruption',
        'Cloud-native target architecture design',
      ],
    },
    {
      num: '02',
      title: 'AI-Enhanced Product Development',
      desc: 'Accelerate product delivery by embedding AI into every phase, from requirements to QA.',
      bullets: [
        'AI-assisted requirements & design validation',
        'Automated testing & quality assurance',
        'Faster sprint cycles with intelligent tooling',
        'Continuous delivery pipeline optimization',
      ],
    },
    {
      num: '03',
      title: 'AI Strategy + Enterprise Enablement',
      desc: 'Cut through AI hype with a clear, actionable roadmap grounded in your business realities.',
      bullets: [
        'Current-state AI maturity assessment',
        'Use-case prioritization by ROI',
        'Governance & responsible AI framework',
        'Team enablement & change management',
      ],
    },
  ]

  return (
    <section className="dot-grid py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-16">
            <span className="text-xs font-bold text-[#F15A22] uppercase tracking-widest">Our Solutions</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1E1033] mt-3 leading-tight">
              Three ways we make{' '}
              <span className="bg-gradient-to-r from-[#6B21A8] to-[#F15A22] bg-clip-text text-transparent">
                transformation stick
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map(({ num, title, desc, bullets }, i) => (
            <Reveal key={num} delay={i * 140} className="h-full">
            <div
              className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-100 hover:-translate-y-1 transition-all duration-300 group h-full"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl font-black text-[#F15A22] select-none">{num}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-[#F15A22]/40 to-transparent" />
              </div>
              <h3 className="text-xl font-bold text-[#1E1033] mb-3 leading-snug">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{desc}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-[#F15A22] mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-600">{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="flex items-center gap-2 text-[#F15A22] font-semibold text-sm hover:gap-3 transition-all"
              >
                Learn more <ArrowRight size={15} />
              </a>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Why nvisia (Draftr-style annotated) ─────────────────────────────────────
function WhyNvisiaSection() {
  const callouts = [
    {
      label: 'Architectural Approach',
      desc: 'We design for long-term scale, not just the sprint in front of us.',
      icon: Building2,
    },
    {
      label: 'Integrated Capabilities',
      desc: 'Architecture, development, data, and AI under one roof.',
      icon: Zap,
    },
    {
      label: '35 Years of Longevity',
      desc: 'Scar tissue that only comes from decades of real delivery.',
      icon: Shield,
    },
    {
      label: '100% W-2 Employees',
      desc: 'No bench staffing. Our people are invested in your outcome.',
      icon: Users,
    },
  ]

  return (
    <section className="bg-[#1E1033] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left callouts */}
          <div>
            <Reveal>
              <span className="text-xs font-bold text-[#F15A22] uppercase tracking-widest">Why nvisia</span>
              <h2 className="text-4xl md:text-5xl font-medium text-white mt-3 mb-10 leading-tight">
                Why nvisia{' '}
                <span className="text-[#F15A22]">converts better</span>
              </h2>
            </Reveal>
            <div className="space-y-7">
              {callouts.map(({ label, desc, icon: Icon }, i) => (
                <Reveal key={label} delay={i * 100}>
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-[#F15A22]/15 border border-[#F15A22]/30 flex items-center justify-center group-hover:bg-[#F15A22]/25 transition-colors">
                    <Icon size={18} className="text-[#F15A22]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white text-sm">{label}</span>
                      <span className="text-xs text-white/30 font-mono">0{i + 1}</span>
                    </div>
                    <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: annotated project dashboard */}
          <Reveal className="relative flex justify-center" delay={200}>
            {/* Ambient glow */}
            <div
              className="absolute w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(107,33,168,0.5) 0%, transparent 70%)',
                filter: 'blur(50px)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
              }}
            />

            {/* Glassmorphism project card */}
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden w-full max-w-xs z-10">
              {/* Card header */}
              <div className="bg-white/5 border-b border-white/10 px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F15A22]" />
                  <span className="text-xs font-semibold text-white/80">Project Health</span>
                </div>
                <span className="text-[10px] text-white/40 font-mono">Q2 2026</span>
              </div>

              <div className="p-5 space-y-4">
                {/* Progress bars */}
                {[
                  { label: 'Architecture Review', pct: 92, color: 'bg-[#F15A22]' },
                  { label: 'AI Integration', pct: 78, color: 'bg-purple-400' },
                  { label: 'Data Migration', pct: 61, color: 'bg-blue-400' },
                ].map(({ label, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[10px] text-white/60 font-medium">{label}</span>
                      <span className="text-[10px] text-white/80 font-bold">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}

                {/* Team row */}
                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-white/40 block mb-1">Assigned team</span>
                    <div className="flex -space-x-1.5">
                      {['bg-orange-400', 'bg-purple-400', 'bg-blue-400', 'bg-green-400', 'bg-pink-400'].map((c, i) => (
                        <div key={i} className={`w-6 h-6 rounded-full ${c} border border-white/20`} />
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-white/40 block mb-1">On track</span>
                    <span className="text-sm font-black text-green-400">✓ Yes</span>
                  </div>
                </div>

                {/* Bottom stats */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: '10yr', label: 'Avg tenure' },
                    { val: 'W-2', label: 'All employees' },
                  ].map(({ val, label }) => (
                    <div key={label} className="bg-white/5 rounded-xl p-3 text-center">
                      <div className="text-base font-black text-[#F15A22]">{val}</div>
                      <div className="text-[9px] text-white/40 mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Annotation lines */}
            {[
              { top: '18%', label: 'Arch.' },
              { top: '38%', label: 'Integrated' },
              { top: '60%', label: 'Longevity' },
              { top: '80%', label: 'W-2' },
            ].map(({ top, label }) => (
              <div
                key={label}
                className="absolute right-0 flex items-center gap-1.5 pointer-events-none"
                style={{ top }}
              >
                <div className="w-8 h-px bg-[#F15A22]/50" />
                <div className="w-2 h-2 rounded-full border border-[#F15A22] bg-[#F15A22]/30" />
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: 35, suffix: '', label: 'Years in Tech' },
    { value: 400, suffix: '+', label: 'Enterprise Clients' },
    { value: 92, suffix: '%', label: 'Repeat Clients' },
    { value: 10, suffix: 'yr', label: 'Avg Consultant Tenure' },
    { value: 100, suffix: '%', label: 'W-2 Employees' },
    { value: 3000, suffix: '+', label: 'Projects Delivered' },
  ]

  return (
    <section className="bg-[#1E1033] border-y border-white/10 py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map(({ value, suffix, label }, i) => (
            <Reveal key={label} delay={i * 80}>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-black text-[#F15A22] mb-1 group-hover:scale-110 transition-transform">
                  <CountUp end={value} suffix={suffix} />
                </div>
                <div className="text-white/55 text-xs font-medium leading-tight">{label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── AI Lab ───────────────────────────────────────────────────────────────────
function AILabSection() {
  return (
    <section className="bg-[#0f0820] py-24 px-6">
      <Reveal className="max-w-4xl mx-auto text-center" y={12}>
        <div className="animated-border-card inline-block w-full">
          <div className="bg-[#1E1033] rounded-[calc(1.25rem-2px)] p-10 md:p-14">
            <div className="inline-flex items-center gap-1.5 bg-[#F15A22]/10 border border-[#F15A22]/30 rounded-full px-4 py-2 mb-6">
              <Zap size={14} strokeWidth={2.5} className="text-[#F15A22] shrink-0" />
              <span className="text-xs font-bold text-[#F15A22] uppercase tracking-widest leading-none">New</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight tracking-tight">
              The nvisia{' '}
              <span className="bg-gradient-to-r from-[#F15A22] to-[#6B21A8] bg-clip-text text-transparent">
                AI
              </span>{' '}
              Lab
            </h2>

            <p className="text-2xl text-white/60 font-light mb-5 italic">
              "Where curiosity becomes clarity."
            </p>

            <p className="text-white/60 leading-relaxed mb-8 max-w-2xl mx-auto">
              Our engineers run real experiments — spec-driven legacy analysis, local model deployment,
              agentic workflows — so when AI matters in your engagement, we already have the scar tissue.
              No theoretical frameworks. Real code. Real results.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#F15A22] hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:shadow-xl hover:shadow-orange-900/50 hover:-translate-y-0.5"
            >
              Learn More <ArrowRight size={16} />
            </a>

            {/* Tech tags */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {['LLM Fine-tuning', 'RAG Pipelines', 'Agentic Workflows', 'Local Models', 'Vector Search', 'Legacy Analysis'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full hover:text-white/60 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ─── Footer CTA ───────────────────────────────────────────────────────────────
function FooterCTA() {
  return (
    <section
      className="py-24 px-6 text-center"
      style={{ background: 'linear-gradient(135deg, #F15A22 0%, #e04a10 40%, #c23e0e 100%)' }}
    >
      <Reveal className="max-w-3xl mx-auto" y={10}>
        <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-4 py-2 mb-6">
          <Star size={14} className="fill-white text-white shrink-0" />
          <span className="text-xs font-bold text-white uppercase tracking-widest leading-none">Get Started</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-medium text-white mb-4 leading-tight">
          Ready to make transformation<br />actually happen?
        </h2>
        <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
          Let's talk about where you are and where you want to be. No sales deck. Just a real conversation.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-white text-[#F15A22] hover:bg-gray-50 font-bold px-9 py-4 rounded-full text-lg transition-all hover:shadow-2xl hover:-translate-y-0.5"
        >
          Let's Connect <ArrowRight size={18} />
        </a>
      </Reveal>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const navLinks = [
    { label: 'What We Do', href: '#' },
    { label: 'Case Studies', href: '#' },
    { label: 'Insights', href: '#' },
    { label: 'Who We Are', href: '#' },
    { label: 'Events', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'AI Lab', href: '#' },
  ]

  const offices = [
    { city: 'Chicago', addr: '200 S Wacker Dr, Suite 3100', state: 'Chicago, IL 60606' },
    { city: 'Milwaukee', addr: '330 E Kilbourn Ave, Suite 725', state: 'Milwaukee, WI 53202' },
    { city: 'Madison', addr: 'Madison, WI', state: '' },
  ]

  return (
    <footer className="bg-[#1E1033] px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Col 1 */}
          <div>
            <img src="/nvisia-logo.png" alt="nvisia" className="h-20 w-auto mb-4 brightness-0 invert opacity-90" />
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              We help enterprises transform systems, accelerate product development, and build real AI strategies grounded in architecture.
            </p>
            <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-4">Connect. Build. Enable.</p>
            <div className="flex gap-3">
              {[
              { Icon: Globe, href: '#' },
              { Icon: Share2, href: '#' },
              { Icon: ExternalLink, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#F15A22] border border-white/10 flex items-center justify-center transition-all group"
                >
                  <Icon size={15} className="text-white/60 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="relative inline-block text-white/50 hover:text-[#F15A22] text-sm transition-colors group"
                  >
                    <ChevronRight
                      size={12}
                      className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[#F15A22]"
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Offices</h4>
            <div className="space-y-5">
              {offices.map(({ city, addr, state }) => (
                <div key={city} className="flex items-start gap-3">
                  <MapPin size={14} className="text-[#F15A22] mt-1 shrink-0" />
                  <div>
                    <div className="text-white text-sm font-semibold">{city}</div>
                    <div className="text-white/40 text-xs leading-relaxed mt-0.5">
                      {addr}
                      {state && <><br />{state}</>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/30 text-xs">© {new Date().getFullYear()} nvisia. All rights reserved.</span>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Use', 'Accessibility'].map((item) => (
              <a key={item} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <ProblemSection />
      <SolutionsSection />
      <WhyNvisiaSection />
      <Gallery4
        eyebrow="Our Work"
        title="Work that speaks for itself"
        description="Selected engagements across financial services, distribution, and platform modernization. Every project is built on the same foundation: real architecture, integrated capabilities, and people who stick around."
        items={caseStudyItems}
      />
      <Testimonials />
      <StatsBar />
      <AILabSection />
      <Blog7 />
      <FooterCTA />
      <Footer />
    </div>
  )
}
