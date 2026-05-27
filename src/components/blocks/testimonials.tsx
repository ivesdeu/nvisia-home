import { motion } from "framer-motion"
import {
  TestimonialsColumn,
  type Testimonial,
} from "@/components/ui/testimonials-columns-1"

const testimonials: Testimonial[] = [
  {
    text: "nvisia rebuilt our customer search from scratch with AI in the loop, and conversion jumped 34% in the first quarter. They didn't just deliver code — they delivered a strategy that actually stuck.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Sarah Chen",
    role: "VP Engineering, ELCA",
  },
  {
    text: "Most consulting firms hand you a deck and disappear. nvisia stayed embedded for 18 months, and we still call them when something architectural comes up. That's the difference.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Marcus Williams",
    role: "CTO, First National Bank and Trust",
  },
  {
    text: "We were drowning in AI hype before we hired nvisia. They cut through the noise and gave us three real use cases tied to ROI. Two of them are live in production now.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Priya Patel",
    role: "Chief Data Officer, Midwest Distribution Co.",
  },
  {
    text: "Their architects shaped how we think about systems. The investment paid for itself in saved engineering hours during the migration alone.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "David Rodriguez",
    role: "Director of Engineering, FHLBank Chicago",
  },
  {
    text: "100% W-2 employees was actually the deciding factor for us. We've been burned by contractor churn before. nvisia's tenure shows in every artifact they produce.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Jennifer Park",
    role: "SVP Technology, Regional Healthcare Network",
  },
  {
    text: "They modernized 25-year-old COBOL using AI-assisted analysis in a fraction of the time we budgeted. Real architecture, not vibes.",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    name: "Tom Bradley",
    role: "EVP IT Strategy, National Insurance Group",
  },
  {
    text: "The work coming out of the AI Lab translated directly into our agentic workflows roadmap. We're shipping production agents now because of conversations that started in their lab.",
    image: "https://randomuser.me/api/portraits/women/89.jpg",
    name: "Rachel Kim",
    role: "Head of ML Platform, Enterprise SaaS Co.",
  },
  {
    text: "I expected a typical Big-Four engagement. What I got was a small team of senior engineers who shipped working code in week two. Refreshing doesn't even cover it.",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    name: "Michael O'Brien",
    role: "VP Product Engineering, Logistics Platform",
  },
  {
    text: "Their architectural reviews catch things our internal teams miss. It's like having an experienced co-CTO on retainer whenever we need a second set of eyes.",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    name: "Linda Foster",
    role: "CIO, Industrial Manufacturing Group",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

export const Testimonials = () => {
  return (
    <section className="bg-white py-24 px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center"
        >
          <span className="text-xs font-bold text-[#F15A22] uppercase tracking-widest mb-4">
            Trusted Voices
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1E1033] leading-tight">
            What clients say after the<br />
            engagement ends
          </h2>
          <p className="text-center mt-5 text-gray-500 text-base md:text-lg leading-relaxed">
            Real partnerships from real people — across financial services,
            healthcare, distribution, and platform teams.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-14 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[680px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={22}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={20}
          />
        </div>
      </div>
    </section>
  )
}
