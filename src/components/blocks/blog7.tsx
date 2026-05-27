import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

interface Post {
  id: string
  title: string
  summary: string
  label: string
  author: string
  published: string
  url: string
  image: string
}

interface Blog7Props {
  tagline?: string
  heading?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
  posts?: Post[]
}

const defaultPosts: Post[] = [
  {
    id: "post-1",
    title: "The Hidden Cost of AI Pilots That Never Ship",
    summary:
      "We've audited dozens of stalled AI initiatives. The technology was rarely the problem — the architecture, governance, and integration surface were. Here's the pattern we keep seeing, and how to design pilots that actually graduate to production.",
    label: "AI Strategy",
    author: "nvisia AI Lab",
    published: "Apr 12, 2026",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  },
  {
    id: "post-2",
    title: "Spec-Driven Legacy Analysis at Scale",
    summary:
      "How we used LLM-assisted dependency mapping to make a 30M-line COBOL estate legible to a modern engineering team in weeks instead of years. A field report from a recent financial-services modernization.",
    label: "Legacy Modernization",
    author: "Tom Bradley, Principal Architect",
    published: "Mar 28, 2026",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  },
  {
    id: "post-3",
    title: "Architecture Reviews Aren't Optional Anymore",
    summary:
      "When sprint pressure pushes architecture to the back burner, debt compounds fast. We make the case for treating architecture review as a recurring discipline — and share the lightweight cadence we use with enterprise teams.",
    label: "Architecture",
    author: "Linda Foster, Engineering Lead",
    published: "Mar 14, 2026",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  },
]

const Blog7 = ({
  tagline = "Insights",
  heading = "Thinking out loud",
  description = "Field notes, opinion pieces, and engineering deep-dives from the team — written by the people doing the work, not a marketing department.",
  buttonText = "Read all insights",
  buttonUrl = "#",
  posts = defaultPosts,
}: Blog7Props) => {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-14">
        <div className="text-center max-w-3xl">
          <Badge
            variant="secondary"
            className="mb-6 bg-orange-50 text-[#F15A22] uppercase tracking-widest px-3 py-1"
          >
            {tagline}
          </Badge>
          <h2 className="mb-4 text-pretty text-3xl font-semibold text-[#1E1033] tracking-tight md:text-4xl lg:text-5xl leading-tight">
            {heading}
          </h2>
          <p className="mb-6 text-gray-500 md:text-base lg:text-lg leading-relaxed mx-auto max-w-2xl">
            {description}
          </p>
          <Button
            variant="link"
            className="w-full sm:w-auto text-[#F15A22] hover:text-orange-600"
            asChild
          >
            <a href={buttonUrl}>
              {buttonText}
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
        </div>
        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="aspect-[16/9] w-full overflow-hidden">
                <a
                  href={post.url}
                  className="block h-full w-full transition-opacity duration-200 hover:opacity-90"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </a>
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-1 text-xs text-gray-400">
                  <span className="font-semibold text-[#6B21A8] uppercase tracking-widest">
                    {post.label}
                  </span>
                  <span>·</span>
                  <span>{post.published}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#1E1033] leading-snug md:text-xl group-hover:text-[#F15A22] transition-colors">
                  <a href={post.url}>{post.title}</a>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {post.summary}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{post.author}</span>
                <a
                  href={post.url}
                  className="flex items-center text-[#F15A22] font-semibold text-sm hover:gap-3 transition-all gap-2"
                >
                  Read more
                  <ArrowRight className="size-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Blog7 }
