import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle, Send, X, Sparkles } from "lucide-react"

type Message = {
  role: "user" | "bot"
  text: string | string[]
  animate?: boolean
}

type QA = {
  keywords: string[]
  answer: string | string[]
}

// Knowledge base — distilled from every visible section of the landing page.
// Each entry's keywords are matched against the user's question; the entry
// with the highest score wins.
const knowledgeBase: QA[] = [
  {
    keywords: ["what", "do", "company", "nvisia", "about", "who"],
    answer: [
      "nvisia helps enterprises transform systems, ship products, and build real AI — grounded in architecture, not hype.",
      "Three pillars: AI-Accelerated Legacy Modernization, AI-Enhanced Product Development, and AI Strategy + Enterprise Enablement.",
    ],
  },
  {
    keywords: ["year", "years", "old", "experience", "history", "long", "tenure", "longevity"],
    answer:
      "35 years in tech. Our average consultant tenure is 10 years, which means our people stick around long enough to build deep institutional knowledge.",
  },
  {
    keywords: ["client", "clients", "customer", "customers", "enterprise"],
    answer:
      "400+ enterprise clients, with a 92% repeat-client rate. Featured case studies: ELCA, First National Bank and Trust, FHLBank Chicago, plus multi-year wholesaler and AI-enablement engagements.",
  },
  {
    keywords: ["project", "projects", "delivered", "shipped", "completed"],
    answer: "3,000+ projects delivered across financial services, distribution, healthcare, and platform modernization.",
  },
  {
    keywords: ["retention", "repeat", "renewal", "loyal"],
    answer:
      "92% of our clients come back. That's the strongest signal we have that the work actually sticks after we hand it off.",
  },
  {
    keywords: ["employee", "employees", "contractor", "contractors", "staff", "w2", "w-2", "bench", "team"],
    answer:
      "100% W-2 employees — no bench staffing, no contractor churn. Our people are invested in your outcome because they're not on a temp contract.",
  },
  {
    keywords: ["ai", "lab", "research", "experiment", "rag", "agentic", "llm", "model"],
    answer: [
      "The nvisia AI Lab is where our engineers run real experiments — spec-driven legacy analysis, local model deployment, agentic workflows.",
      "When AI matters in your engagement, we already have the scar tissue. Areas of active work include LLM fine-tuning, RAG pipelines, agentic workflows, local models, vector search, and legacy analysis.",
    ],
  },
  {
    keywords: ["office", "offices", "location", "where", "address", "based", "chicago", "milwaukee", "madison"],
    answer: [
      "Three offices in the Midwest:",
      "• Chicago — 200 S Wacker Dr, Suite 3100",
      "• Milwaukee — 330 E Kilbourn Ave, Suite 725",
      "• Madison, WI",
    ],
  },
  {
    keywords: ["contact", "talk", "connect", "reach", "email", "phone", "meeting", "call"],
    answer:
      "Easiest path: click 'Let's Connect' in the top-right of the page or 'Talk with an Expert' in the hero. Both open a real conversation — no sales deck.",
  },
  {
    keywords: ["stack", "tech", "technology", "partner", "partners", "platform", "platforms", "aws", "gcp", "google", "azure", "microsoft", "snowflake", "databricks", "docker", "kubernetes", "terraform", "elastic"],
    answer:
      "Active technology partners include Google Cloud, AWS, Microsoft Azure, Snowflake, Databricks, Docker, Elastic, Kubernetes, Terraform, and Confluent. The architecture is matched to the problem, not the other way around.",
  },
  {
    keywords: ["why", "different", "differentiator", "value", "unique", "competitor"],
    answer: [
      "Four things make nvisia different:",
      "• Architectural Approach — we design for long-term scale, not just the next sprint.",
      "• Integrated Capabilities — architecture, development, data, and AI under one roof.",
      "• 35 Years of Longevity — three decades of shipping real systems.",
      "• 100% W-2 Employees — no bench staffing, real investment in outcomes.",
    ],
  },
  {
    keywords: ["solution", "solutions", "service", "services", "offering", "offerings"],
    answer: [
      "Three core solution tracks:",
      "01 — AI-Accelerated Legacy Modernization: transform aging systems using AI to accelerate analysis, migrate risk, and build future-ready architectures.",
      "02 — AI-Enhanced Product Development: embed AI into every phase from requirements to QA.",
      "03 — AI Strategy + Enterprise Enablement: cut through AI hype with a clear, actionable roadmap grounded in your business realities.",
    ],
  },
  {
    keywords: ["legacy", "modernization", "modernize", "cobol", "old", "outdated", "rewrite"],
    answer:
      "AI-Accelerated Legacy Modernization: we use AI-driven codebase analysis and dependency mapping, risk-scored migration roadmaps, incremental modernization without disruption, and cloud-native target architecture. Recent example: 30M lines of COBOL made legible to a modern team in weeks.",
  },
  {
    keywords: ["product", "development", "build", "ship", "delivery", "qa", "testing"],
    answer:
      "AI-Enhanced Product Development covers AI-assisted requirements and design validation, automated testing and QA, faster sprint cycles with intelligent tooling, and continuous-delivery pipeline optimization.",
  },
  {
    keywords: ["strategy", "roadmap", "consulting", "advisory", "governance"],
    answer:
      "AI Strategy + Enterprise Enablement includes a current-state AI maturity assessment, use-case prioritization by ROI, governance and responsible-AI framework, and team enablement plus change management.",
  },
  {
    keywords: ["case", "study", "studies", "work", "portfolio", "elca", "fhlbank", "bank", "wholesale", "wholesaler"],
    answer: [
      "Featured engagements:",
      "• ELCA — Intelligent Search at Scale (human-centered AI).",
      "• First National Bank and Trust — data strategy for the digital era.",
      "• FHLBank Chicago — significant customer experience overhaul.",
      "• Leading National Wholesaler — multi-year EA + product + UX partnership.",
      "• Enterprise AI Enablement — AI strategy through production agentic workflows.",
    ],
  },
  {
    keywords: ["tagline", "slogan", "motto", "brand"],
    answer: "Connect. Build. Enable. That's the throughline.",
  },
  {
    keywords: ["insight", "insights", "blog", "article", "post", "writing", "thinking"],
    answer:
      "Recent insights from the team include 'The Hidden Cost of AI Pilots That Never Ship', 'Spec-Driven Legacy Analysis at Scale', and 'Architecture Reviews Aren't Optional Anymore'. See the Insights section above.",
  },
  {
    keywords: ["price", "pricing", "cost", "rate", "rates", "budget", "expensive", "cheap"],
    answer:
      "Pricing isn't published — every engagement is scoped to the problem. The fastest way to get a number that's actually useful is to click 'Talk with an Expert' and tell us what you're trying to ship.",
  },
  {
    keywords: ["industry", "industries", "vertical", "sector", "finance", "financial", "healthcare", "insurance", "distribution", "manufacturing"],
    answer:
      "We work across financial services (banks, FHLBanks), healthcare, insurance, distribution and logistics, and platform / SaaS companies. Public-sector engagements happen too.",
  },
  {
    keywords: ["testimonial", "testimonials", "review", "reviews", "feedback"],
    answer:
      "Real quotes from clients are in the 'Trusted Voices' section above. The pattern that keeps coming up: engineers who stay embedded after the engagement ends.",
  },
  {
    keywords: ["hire", "career", "careers", "job", "jobs", "join", "apply"],
    answer:
      "Careers info isn't on the landing page yet, but nvisia hires 100% W-2 — no contracting middleman. Use 'Let's Connect' for now and ask about open roles.",
  },
  {
    keywords: ["event", "events", "conference", "webinar", "talk"],
    answer:
      "Events are linked in the top nav. We sponsor and present at industry conferences, plus host AI Lab meetups out of the Chicago and Milwaukee offices.",
  },
]

const SUGGESTED_QUESTIONS = [
  "What does nvisia do?",
  "How long have you been around?",
  "Why are you different?",
  "Where are your offices?",
  "What's the AI Lab?",
]

function scoreEntry(entry: QA, query: string): number {
  const q = query.toLowerCase()
  let score = 0
  for (const kw of entry.keywords) {
    if (q.includes(kw.toLowerCase())) {
      // Longer keywords are stronger signals (e.g. "modernization" beats "ai")
      score += kw.length
    }
  }
  return score
}

function findAnswer(query: string): string | string[] {
  if (!query.trim()) {
    return "Ask me anything about nvisia and I'll pull the answer from this page."
  }

  let bestEntry: QA | null = null
  let bestScore = 0

  for (const entry of knowledgeBase) {
    const s = scoreEntry(entry, query)
    if (s > bestScore) {
      bestScore = s
      bestEntry = entry
    }
  }

  if (!bestEntry || bestScore === 0) {
    return [
      "I couldn't find that on the page. I can help with topics like:",
      "• What nvisia does and how long we've been around",
      "• Our three solution tracks and the AI Lab",
      "• Case studies, client retention, and team makeup",
      "• Office locations and how to get in touch",
    ]
  }

  return bestEntry.answer
}

export default function AskBot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: [
        "Hey — I'm a bot that reads this landing page.",
        "Ask me anything about nvisia and I'll point you at the answer.",
      ],
    },
  ])
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, open, isTyping])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 250)
    }
  }, [open])

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return
    setInput("")
    setMessages((prev) => [...prev, { role: "user", text: trimmed }])
    setIsTyping(true)
    // Brief "thinking" pause, then start streaming the response
    window.setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: findAnswer(trimmed), animate: true },
      ])
    }, 650)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 pointer-events-none">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto w-[90vw] max-w-sm h-[32rem] max-h-[80vh] bg-white rounded-2xl shadow-2xl shadow-purple-900/20 border border-gray-200 flex flex-col overflow-hidden"
            role="dialog"
            aria-label="Ask nvisia"
          >
            {/* Header */}
            <div className="bg-[#1E1033] px-5 py-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-[#F15A22] flex items-center justify-center shrink-0">
                  <Sparkles size={16} className="text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#1E1033]" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm leading-tight">Ask nvisia</div>
                  <div className="text-white/50 text-xs leading-tight">Answers pulled from this page</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#FAFAFB]">
              {messages.map((msg, i) => (
                <MessageBubble
                  key={i}
                  role={msg.role}
                  text={msg.text}
                  animate={msg.animate}
                  onTick={() => {
                    if (scrollRef.current) {
                      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                    }
                  }}
                />
              ))}

              {/* Typing indicator while waiting for the bot reply */}
              {isTyping && <TypingIndicator />}

              {/* Suggested questions — only show before user has typed anything */}
              {messages.length === 1 && !isTyping && (
                <div className="pt-2 space-y-2">
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold pl-1">
                    Try asking
                  </div>
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="w-full text-left text-sm text-[#1E1033] bg-white hover:bg-orange-50 hover:text-[#F15A22] border border-gray-200 hover:border-orange-200 rounded-xl px-3 py-2 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="border-t border-gray-200 p-3 bg-white flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isTyping ? "nvisia is typing..." : "Ask anything about nvisia..."}
                disabled={isTyping}
                className="flex-1 px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-full outline-none focus:border-[#F15A22] focus:bg-white transition-colors text-[#1E1033] placeholder:text-gray-400 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-full bg-[#F15A22] text-white flex items-center justify-center hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                aria-label="Send"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto relative w-14 h-14 rounded-full bg-[#F15A22] hover:bg-orange-600 text-white shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 flex items-center justify-center transition-all hover:-translate-y-0.5 group"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
        {/* Pulse ring on idle */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#F15A22] animate-ping opacity-20" />
        )}
      </button>
    </div>
  )
}

function MessageBubble({
  role,
  text,
  animate,
  onTick,
}: {
  role: "user" | "bot"
  text: string | string[]
  animate?: boolean
  onTick?: () => void
}) {
  const lines = Array.isArray(text) ? text : [text]
  const fullText = lines.join("\n\n")
  const isUser = role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-[#F15A22] text-white rounded-br-sm"
            : "bg-white text-[#1E1033] border border-gray-200 rounded-bl-sm"
        }`}
      >
        {animate && !isUser ? (
          <TypewriterText text={fullText} onTick={onTick} />
        ) : (
          <p className="whitespace-pre-line">{fullText}</p>
        )}
      </div>
    </motion.div>
  )
}

function TypewriterText({ text, onTick }: { text: string; onTick?: () => void }) {
  const [displayed, setDisplayed] = useState("")
  const indexRef = useRef(0)

  useEffect(() => {
    let cancelled = false
    indexRef.current = 0
    setDisplayed("")

    const step = () => {
      if (cancelled) return
      indexRef.current += 1
      const next = text.slice(0, indexRef.current)
      setDisplayed(next)
      onTick?.()
      if (indexRef.current < text.length) {
        // Slight variance so the stream doesn't feel mechanical. Brief pause at
        // punctuation so phrasing reads naturally.
        const last = text[indexRef.current - 1]
        const delay =
          last === "." || last === "?" || last === "!"
            ? 90 + Math.random() * 50
            : last === "," || last === ";" || last === ":"
              ? 45 + Math.random() * 30
              : last === "\n"
                ? 70
                : 12 + Math.random() * 14
        window.setTimeout(step, delay)
      }
    }
    const start = window.setTimeout(step, 40)

    return () => {
      cancelled = true
      window.clearTimeout(start)
    }
  }, [text, onTick])

  const isDone = displayed.length >= text.length
  return (
    <p className="whitespace-pre-line">
      {displayed}
      {!isDone && (
        <span className="inline-block w-[2px] h-[1em] bg-[#1E1033] ml-0.5 align-[-2px] animate-pulse" />
      )}
    </p>
  )
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex justify-start"
    >
      <div className="bg-white text-[#1E1033] border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#1E1033]/40"
            style={{
              animation: `askbot-dot 1.2s ${i * 0.15}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
