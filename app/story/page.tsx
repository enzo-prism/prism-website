import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, BookOpen, Share2, Sparkles } from "lucide-react"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PixelishIcon from "@/components/pixelish/PixelishIcon"
import { WebPageSchema } from "@/components/schema-markup"

const whyStoriesWin = [
  "Build trust faster than any ad can.",
  "Improve SEO with real human language people actually search for.",
  "Turn leads into believers by showing what success looks like.",
]

const howItWorks = [
  {
    title: "Capture the Signal",
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
    title: "Expand the Story",
    summary: "Raw feedback turns into a complete narrative that shows the before, the breakthrough, and the after.",
    details: [
      "Outline who the customer was before they found you.",
      "Surface the problem they faced and what almost kept them stuck.",
      "Show exactly what changed because of your work — supported by visuals, quotes, data, and emotion.",
    ],
    icon: BookOpen,
  },
  {
    title: "Share It Everywhere",
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
    iconSrc: "/pixelish/lens.svg",
    title: "It feeds SEO",
    description:
      "Google prioritizes E-E-A-T. Real stories are packed with human phrasing and firsthand experience, signaling authority and trust.",
  },
  {
    iconSrc: "/pixelish/chat-dots.svg",
    title: "It increases conversions",
    description:
      "Specificity sells. Prospects relate when they see someone like them achieving the result they want, which pushes them to take action.",
  },
  {
    iconSrc: "/pixelish/emoji-heart.svg",
    title: "It strengthens community",
    description:
      "Featuring customers publicly creates fans. You celebrate their wins, they become the loudest champions of your brand.",
  },
]

const engineDeliverables = [
  "A Signal Capture System (custom forms, review automation, or post-visit prompts).",
  "A Story Production Workflow (we extract and craft narratives weekly or monthly).",
  "A Distribution Calendar (consistent storytelling across all platforms).",
  "A Story Vault (your growing library of customer stories — your most valuable content asset).",
]

const PAGE_TITLE = "story-driven marketing | design prism"
const PAGE_DESCRIPTION =
  "Turn customer impact into a growth engine. Prism’s Customer Signal Engine captures real stories and turns them into SEO, conversions, and community."
const CANONICAL_URL = "https://www.design-prism.com/story"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description:
      "Capture customer stories, expand them into narratives, and distribute them everywhere with Prism’s Customer Signal Engine.",
    url: CANONICAL_URL,
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism Story-Driven Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/prism-opengraph.png"],
  },
}

export default function StoryPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900">
        <section className="relative overflow-hidden border-b border-neutral-100 bg-neutral-950 text-white">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_rgba(0,0,0,0.92))]"
          />
          <div className="absolute inset-0 opacity-30 mix-blend-screen">
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.14),_rgba(15,23,42,0))]" />
          </div>
          <div className="relative">
            <div className="container mx-auto max-w-4xl px-4 py-20 text-center sm:py-24 md:px-6 md:py-28">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">story-driven marketing</p>
              <h1 className="mt-5 text-4xl font-semibold lowercase tracking-tight sm:text-5xl md:text-6xl">
                turn customer impact into your loudest signal
              </h1>
              <p className="mt-5 text-base text-white/80 sm:text-lg">
                The most powerful way to grow your business is to consistently tell stories of how you&apos;ve impacted real people.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-100"
                >
                  start a story-driven strategy session
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-white">
          <div className="container mx-auto grid gap-12 px-4 py-16 md:grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)] md:px-6 lg:gap-16 lg:py-24">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">why stories win</p>
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                proof beats promises every single time
              </h2>
              <p className="text-base text-neutral-600 sm:text-lg">
                Most marketing shouts claims — “we&apos;re the best,” “we care,” “we deliver.” But trust is built when people see the
                transformation you created, not just the boast you made.
              </p>
              <p className="text-base text-neutral-600 sm:text-lg">
                Every business leaves a trail of change. A patient finally smiles without hiding. A homeowner breathes easier. A
                client saves time, stress, or money. Those stories prove your impact.
              </p>
            </div>
            <div className="h-full rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm sm:p-8">
              <h3 className="text-xl font-semibold lowercase text-neutral-900">when you share real stories, you:</h3>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600 sm:text-base">
                {whyStoriesWin.map((reason) => (
                  <li key={reason} className="flex gap-3 rounded-2xl border border-neutral-200 bg-white p-4 text-neutral-700">
                    <span className="mt-[2px] text-lg" aria-hidden>
                      •
                    </span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-neutral-50">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_1.1fr)_minmax(0,_0.9fr)] md:px-6 lg:gap-16 lg:py-24">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">our philosophy</p>
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">the customer signal engine</h2>
              <p className="text-base text-neutral-600 sm:text-lg">
                At Prism, we call story-driven marketing the Customer Signal Engine — a system for capturing, expanding, and sharing
                the real stories behind your business so every channel speaks with proof.
              </p>
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <p className="text-lg font-semibold lowercase text-neutral-900">marketing isn&apos;t about noise. it&apos;s about signal.</p>
                <p className="mt-3 text-base text-neutral-600">
                  The best signal comes from your customers. Their words, their emotions, their outcomes — those are the assets
                  that make your marketing resonate and compound.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">why it matters</p>
                <p className="mt-3 text-base text-neutral-600">
                  Story-driven content isn&apos;t fluff — it&apos;s the connective tissue between awareness, conversion, and loyalty. The more
                  signal you publish, the easier it becomes for prospects to see themselves in the outcomes you deliver.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-white">
          <div className="container mx-auto px-4 py-16 md:px-6 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">how it works</p>
              <h2 className="mt-3 text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                three moves that make stories compound
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {howItWorks.map((step) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.title}
                    className="flex h-full flex-col gap-4 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-neutral-900/10 p-3 text-neutral-900">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <h3 className="text-xl font-semibold lowercase text-neutral-900">{step.title}</h3>
                    </div>
                    <p className="text-sm text-neutral-600">{step.summary}</p>
                    <ul className="space-y-3 text-sm text-neutral-600">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" aria-hidden />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-neutral-950 text-white">
          <div className="container mx-auto px-4 py-16 md:px-6 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">why it works</p>
              <h2 className="mt-3 text-3xl font-semibold lowercase tracking-tight sm:text-4xl">
                signal beats spend every day of the week
              </h2>
              <p className="mt-4 text-base text-white/70 sm:text-lg">
                These stories touch every KPI — from rankings to conversion to community. That&apos;s why we build engines, not one-off
                campaigns.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {whyItWorks.map((item) => (
                <div
                  key={item.title}
                  className="flex h-full flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-sm backdrop-blur transition hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <PixelishIcon src={item.iconSrc} alt="" size={18} aria-hidden="true" />
                    <h3 className="text-lg font-semibold lowercase text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm text-white/80">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-white">
          <div className="container mx-auto px-4 py-16 md:px-6 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">the engine we build</p>
              <h2 className="mt-3 text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                every partnership includes a full signal stack
              </h2>
              <p className="mt-4 text-base text-neutral-600 sm:text-lg">
                Story-driven marketing only works when it&apos;s a system. We plug in the capture points, narrative workflows, distribution rhythms,
                and library that keeps the whole engine turning.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {engineDeliverables.map((deliverable) => (
                <div
                  key={deliverable}
                  className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 text-sm leading-relaxed text-neutral-700 shadow-sm"
                >
                  {deliverable}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-neutral-50">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)] md:px-6 lg:gap-16 lg:py-24">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">the result</p>
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                a marketing system that compounds every story
              </h2>
              <p className="text-base text-neutral-600 sm:text-lg">
                Every new story adds credibility. Every story strengthens SEO. Every story deepens connection. That&apos;s how your customer impact
                becomes the flywheel behind sustainable growth.
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">flywheel snapshot</p>
              <p className="mt-3 text-base text-neutral-600">
                The signal engine compounds because it keeps feeding itself: capture leads to insights, insights fuel stories, stories power distribution,
                and distribution inspires the next wave of customers who are eager to be featured.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="container mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-neutral-950 px-6 py-16 text-center text-white shadow-sm sm:px-10">
            <h2 className="text-3xl font-semibold lowercase sm:text-4xl">let&apos;s build your story engine</h2>
            <p className="mt-4 text-base text-white/80 sm:text-lg">
              We&apos;ll show you how to turn everyday wins inside your business into the stories that drive its future.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
              >
                start a story-driven strategy session
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60"
              >
                talk with prism
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </>
  )
}
