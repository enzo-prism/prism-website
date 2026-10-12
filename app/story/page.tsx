import type { Metadata } from "next"
import {
  BookOpen,
  Check,
  HeartHandshake,
  MessagesSquare,
  Search,
  Share2,
  Sparkles,
} from "lucide-react"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { LandingHero } from "@/components/landing/landing-hero"
import { FinalCta } from "@/components/prism/final-cta"
import { Reveal } from "@/components/prism/reveal"
import { Section, SectionHeader } from "@/components/prism/section"
import { SpotlightCard } from "@/components/prism/spotlight-card"
import { WebPageSchema } from "@/components/schema-markup"
import { Card } from "@/components/ui/card"
import { buildRouteMetadata } from "@/lib/seo/metadata"
import { WAITLIST_FOCUS_HREFS } from "@/lib/waitlist"

const whyStoriesWin = [
  "Build trust faster than any ad can.",
  "Improve SEO with real human language people actually search for.",
  "Turn leads into believers by showing what success looks like.",
]

const howItWorks = [
  {
    title: "Capture the signal",
    summary:
      "We collect authentic stories wherever they appear so every whisper of impact gets saved and categorized.",
    details: [
      "Track Google reviews, emails, DMs, surveys, and offhand remarks from practice or team calls.",
      "Tag insights by pain point, emotion, or service type to build a searchable knowledge base.",
      "Transform everyday feedback into a living archive of signals you can act on.",
    ],
    icon: Sparkles,
  },
  {
    title: "Expand the story",
    summary: "Raw feedback turns into a complete narrative that shows the before, the breakthrough, and the after.",
    details: [
      "Outline who the customer was before they found you.",
      "Surface the problem they faced and what almost kept them stuck.",
      "Show exactly what changed because of your work, supported by visuals, quotes, data, and emotion.",
    ],
    icon: BookOpen,
  },
  {
    title: "Share it everywhere",
    summary:
      "Each polished story becomes multi-channel fuel that keeps your brand visible wherever your audience shows up.",
    details: [
      "Blog features turn into SEO-rich articles that rank for real questions.",
      "Social micro-stories power reels, carousels, quotes, and snippets.",
      "Website proof and email/Google Posts reinforce credibility at every touchpoint.",
    ],
    icon: Share2,
  },
]

const whyItWorks = [
  {
    icon: Search,
    title: "It feeds SEO",
    description:
      "Google prioritizes E-E-A-T. Real stories are packed with human phrasing and firsthand experience, signaling authority and trust.",
  },
  {
    icon: MessagesSquare,
    title: "It increases conversions",
    description:
      "Specificity sells. Prospects relate when they see someone like them achieving the result they want, which pushes them to take action.",
  },
  {
    icon: HeartHandshake,
    title: "It strengthens community",
    description:
      "Featuring customers publicly creates fans. You celebrate their wins, they become the loudest champions of your brand.",
  },
]

const engineDeliverables = [
  "A Signal Capture System (custom forms, review automation, or post-visit prompts).",
  "A Story Production Workflow (we extract and craft narratives weekly or monthly).",
  "A Distribution Calendar (consistent storytelling across all platforms).",
  "A Story Vault (your growing library of customer stories, your most valuable content asset).",
]

const PAGE_TITLE = 'Story-driven marketing for local brands'
const PAGE_DESCRIPTION =
  'Turn customer impact into a growth engine. Prism captures real customer stories and turns them into SEO, conversions, and community momentum.'
const CANONICAL_URL = "https://www.design-prism.com/story"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/story",
  ogImage: "/prism-opengraph.png",
})

export default function StoryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <LandingHero
          location="story hero"
          ctaHref={WAITLIST_FOCUS_HREFS.content}
          secondary={{ label: "See the work", href: "/case-studies", trackingLabel: "see case studies" }}
          eyebrow="Story-driven marketing"
          title="turn customer impact into your loudest signal."
          description="The most powerful way to grow your business is to consistently tell stories of how you've impacted real people."
          glow="warm"
        />

        <Section aria-labelledby="story-why-title">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionHeader
                id="story-why-title"
                eyebrow="Why stories win"
                title="proof beats promises every single time."
                description={
                  <>
                    Most marketing shouts claims: &ldquo;we&apos;re the best,&rdquo; &ldquo;we care,&rdquo; &ldquo;we deliver.&rdquo; But trust is built when people see the
                    transformation you created, not just the boast you made.
                  </>
                }
              />
              <p className="mt-5 max-w-[58ch] text-pretty text-[1rem] leading-7 text-muted-foreground">
                Every business leaves a trail of change. A patient finally smiles without hiding. A homeowner breathes easier. A
                client saves time, stress, or money. Those stories prove your impact.
              </p>
            </Reveal>
            <Reveal delay={100} className="lg:self-end">
              <Card className="rounded-3xl p-6 sm:p-8">
                <h3 className="text-heading text-foreground">when you share real stories, you:</h3>
                <ul className="mt-6 grid gap-3">
                  {whyStoriesWin.map((reason) => (
                    <li
                      key={reason}
                      className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-[0.95rem] leading-6 text-muted-foreground"
                    >
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-foreground" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
        </Section>

        <Section aria-labelledby="story-engine-title" className="pt-0 sm:pt-0">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card p-6 sm:p-12">
            <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-40" />
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
              <SectionHeader
                id="story-engine-title"
                eyebrow="Our philosophy"
                title="the customer signal engine."
                description="At Prism, we call story-driven marketing the Customer Signal Engine, a system for capturing, expanding, and sharing the real stories behind your business so every channel speaks with proof."
              />
              <div className="grid gap-4 self-end">
                <blockquote className="rounded-2xl border border-white/[0.08] bg-background/60 p-6">
                  <p className="text-[1.15rem] font-medium leading-snug tracking-[-0.02em] text-foreground">
                    Marketing isn&apos;t about noise. It&apos;s about signal.
                  </p>
                  <p className="mt-3 text-[0.95rem] leading-7 text-muted-foreground">
                    The best signal comes from your customers. Their words, their emotions, their outcomes: those are the assets
                    that make your marketing resonate and compound.
                  </p>
                </blockquote>
                <div className="rounded-2xl border border-white/[0.08] bg-background/60 p-6">
                  <p className="text-eyebrow text-subtle">Why it matters</p>
                  <p className="mt-3 text-[0.95rem] leading-7 text-muted-foreground">
                    Story-driven content isn&apos;t fluff. It&apos;s the connective tissue between awareness, conversion, and loyalty. The more
                    signal you publish, the easier it becomes for prospects to see themselves in the outcomes you deliver.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section aria-labelledby="story-how-title">
          <SectionHeader
            id="story-how-title"
            eyebrow="How it works"
            title="three moves that make stories compound."
            align="center"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {howItWorks.map((step, index) => {
              const Icon = step.icon
              return (
                <Reveal key={step.title} delay={index * 80}>
                  <SpotlightCard className="flex h-full flex-col gap-5 p-6 sm:p-7" beam={index === 0}>
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground">
                        <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[11px] tabular-nums text-subtle">0{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-heading text-foreground">{step.title}</h3>
                      <p className="mt-3 text-[0.95rem] leading-7 text-muted-foreground">{step.summary}</p>
                    </div>
                    <ul className="mt-auto grid gap-2.5 border-t border-white/[0.08] pt-5">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                          <span className="mt-2.5 size-1 shrink-0 rounded-full bg-white/40" aria-hidden="true" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              )
            })}
          </div>
        </Section>

        <Section aria-labelledby="story-why-works-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <SectionHeader
              id="story-why-works-title"
              eyebrow="Why it works"
              title="signal beats spend every day of the week."
              description="These stories touch every KPI, from rankings to conversion to community. That's why we build engines, not one-off campaigns."
            />
            <ul className="grid overflow-hidden rounded-2xl border border-white/[0.08] bg-card">
              {whyItWorks.map((item, index) => {
                const Icon = item.icon
                return (
                  <li
                    key={item.title}
                    className={`flex items-start gap-4 p-6 sm:p-7 ${index > 0 ? "border-t border-white/[0.08]" : ""}`}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground">
                      <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-foreground">{item.title}</h3>
                      <p className="mt-1.5 text-[0.95rem] leading-7 text-muted-foreground">{item.description}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </Section>

        <Section aria-labelledby="story-stack-title">
          <SectionHeader
            id="story-stack-title"
            eyebrow="The engine we build"
            title="every partnership includes a full signal stack."
            description="Story-driven marketing only works when it's a system. We plug in the capture points, narrative workflows, distribution rhythms, and library that keeps the whole engine turning."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2">
            {engineDeliverables.map((deliverable, index) => (
              <li key={deliverable}>
                <Card className="flex h-full items-start gap-4 p-6">
                  <span className="font-mono text-[11px] tabular-nums text-subtle">0{index + 1}</span>
                  <p className="text-[0.95rem] leading-7 text-muted-foreground">{deliverable}</p>
                </Card>
              </li>
            ))}
          </ol>
        </Section>

        <Section aria-labelledby="story-result-title" className="pt-0 sm:pt-0">
          <div className="grid gap-10 border-t border-white/[0.08] pt-16 lg:grid-cols-2 lg:gap-16">
            <SectionHeader
              id="story-result-title"
              eyebrow="The result"
              title="a marketing system that compounds every story."
              description="Every new story adds credibility. Every story strengthens SEO. Every story deepens connection. That's how your customer impact becomes the flywheel behind sustainable growth."
            />
            <Card className="self-end rounded-3xl p-6 sm:p-8">
              <p className="text-eyebrow text-subtle">Flywheel snapshot</p>
              <p className="mt-4 text-[1rem] leading-7 text-muted-foreground">
                The signal engine compounds because it keeps feeding itself: capture leads to insights, insights fuel stories, stories power distribution,
                and distribution inspires the next wave of customers who are eager to be featured.
              </p>
            </Card>
          </div>
        </Section>

        <FinalCta
          location="story final cta"
          href={WAITLIST_FOCUS_HREFS.content}
          secondary={{ label: "See case studies", href: "/case-studies" }}
        />
      </main>
      <Footer />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </div>
  )
}
