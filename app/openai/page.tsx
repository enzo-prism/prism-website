import Link from "next/link"
import type { Metadata } from "next"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const openAiStack = [
  {
    title: "strategic copilots",
    description:
      "We build proprietary GPT-4.1 and o1 workspaces that mirror your voice, offers, and service areas so every campaign draft starts with context.",
    highlights: [
      "Persona and journey modeling to pinpoint local demand",
      "Offer testing scripts that recommend angles before we launch",
      "Automated briefs that feed creative, SEO, and listings updates",
    ],
  },
  {
    title: "content engines",
    description:
      "OpenAI powered workflows turn transcripts, reviews, and practice intel into production-ready articles, videos, and nurture sequences.",
    highlights: [
      "Topic clustering with embeddings to map authority gaps",
      "Voice-adapted outlines that hand off cleanly to our writers",
      "Compliance and tone checks before anything goes live",
    ],
  },
  {
    title: "operations automation",
    description:
      "We connect OpenAI with your CRM, scheduling, and intake tools so front-office teams stay focused on high-value conversations.",
    highlights: [
      "Inbox triage and call summaries that sync with your systems",
      "Follow-up reminders triggered by lead quality and intent",
      "Practice intelligence dashboards that surface weekly wins",
    ],
  },
]

const distributionPartners = [
  {
    name: "ChatGPT",
    summary:
      "We monitor prompts and suggested follow-ups to learn how prospects evaluate providers, then tailor your answers and site structure accordingly.",
  },
  {
    name: "OpenAI Search & Assistants",
    summary:
      "As OpenAI ships new search flows, we study how results are sourced so your offers, FAQs, and locality data stay present in answer cards.",
  },
  {
    name: "Third-party GPT Plug-ins",
    summary:
      "For GPTs that recommend local businesses, we supply structured data, reviews, and proof points so you surface when prospects explore options.",
  },
]

const workflow = [
  {
    title: "map your growth signals",
    description:
      "We audit existing content, reviews, and CRM notes, then tune OpenAI copilots with the language that wins bookings for your team.",
  },
  {
    title: "ship high leverage assets",
    description:
      "Campaigns, landing pages, and listings refreshes move through AI-accelerated pipelines so you launch updates in days, not months.",
  },
  {
    title: "amplify through distribution",
    description:
      "We sync structured data and fresh offers to OpenAI surfaces, measure exposure, and iterate so you appear where prospects research.",
  },
  {
    title: "keep humans in the loop",
    description:
      "Every deliverable runs through expert review, performance tracking, and compliance checks to ensure quality, accuracy, and accountability.",
  },
]

export const metadata: Metadata = {
  title: "openai growth systems | design prism",
  description:
    "See how Prism uses OpenAI tools, copilots, and distribution intelligence to expand your practice across chat, search, and assistant surfaces.",
  openGraph: {
    title: "openai growth systems | design prism",
    description:
      "Prism trains OpenAI copilots on your brand, publishes AI-assisted campaigns, and studies distribution so you show up across new surfaces.",
    url: "https://design-prism.com/openai",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism OpenAI Growth Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "openai growth systems | design prism",
    description:
      "Prism uses OpenAI copilots and distribution intelligence to get your practice discovered across AI-powered channels.",
    images: ["/prism-opengraph.png"],
  },
}

export default function OpenAIPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className="relative overflow-hidden border-b border-neutral-100">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-white" aria-hidden="true" />
          <div className="container relative mx-auto px-4 pb-16 pt-20 sm:pt-24 md:pb-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">openai partnership</p>
              <h1 className="mt-4 text-4xl font-semibold lowercase tracking-tight text-neutral-900 sm:text-5xl">
                ai copilots that keep your presence everywhere
              </h1>
              <p className="mt-4 text-base text-neutral-600 sm:text-lg">
                Prism works directly with OpenAI&apos;s tools and distribution network so your practice shows up in the conversations,
                searches, and recommendations happening inside ChatGPT and beyond.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  talk with prism
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900"
                >
                  explore services
                </Link>
                <Link
                  href="/openai/site-rebuild"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900 hover:bg-neutral-50"
                >
                  view codex rebuild guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                how we use openai for clients
              </h2>
              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                Our team trains custom copilots, automates production, and embeds governance so every deliverable is accurate, on-brand, and measurable.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {openAiStack.map((item) => (
                <div
                  key={item.title}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div>
                    <h3 className="text-xl font-semibold lowercase text-neutral-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
                  </div>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-neutral-100 bg-neutral-50 py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                showing up on openai distribution
              </h2>
              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                We study how OpenAI showcases local businesses so your expertise, proof, and offers stay visible when prospects ask for help.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {distributionPartners.map((partner) => (
                <div key={partner.name} className="flex h-full flex-col gap-3 rounded-3xl border border-neutral-200 bg-white p-6">
                  <h3 className="text-lg font-semibold lowercase text-neutral-900">{partner.name}</h3>
                  <p className="text-sm text-neutral-600">{partner.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl rounded-3xl border border-neutral-200 bg-neutral-50 p-8 shadow-sm sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">hands-on guide</p>
              <h2 className="mt-3 text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                rebuild your site locally with codex
              </h2>
              <p className="mt-4 text-sm text-neutral-600 sm:text-base">
                Need the exact workflow for mirroring a live site, feeding Codex accurate context, and launching the new build on localhost? Follow our step-by-step Codex CLI playbook built for macOS.
              </p>
              <div className="mt-6">
                <Link
                  href="/openai/site-rebuild"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  read the local rebuild guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                our human + ai workflow
              </h2>
              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                Every engagement blends OpenAI systems with Prism strategists so you get the velocity of automation and the judgment of a seasoned team.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {workflow.map((stage) => (
                <div
                  key={stage.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="text-xl font-semibold lowercase text-neutral-900">{stage.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{stage.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                request an openai strategy session
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
