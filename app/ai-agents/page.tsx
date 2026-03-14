import Link from "next/link"
import type { Metadata } from "next"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { WebPageSchema } from "@/components/schema-markup"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const agentCapabilities = [
  {
    title: "natural conversations",
    description:
      "powered by elevenlabs' industry-leading voice technology, your agent sounds human, not robotic. it understands accents, handles interruptions, and responds naturally.",
    highlights: [
      "Lifelike voices that match your brand personality",
      "Context-aware responses that feel like real conversations",
      "Multilingual support for diverse customer bases",
    ],
  },
  {
    title: "smart actions",
    description:
      "agents don't just talk \u2014 they book appointments, check availability, route calls, collect information, and trigger workflows in your existing systems.",
    highlights: [
      "Real-time calendar and CRM integrations",
      "Automated follow-ups and confirmations",
      "Intelligent call routing based on intent",
    ],
  },
  {
    title: "always available",
    description:
      "your ai agent works 24/7/365. no hold times, no voicemail, no missed opportunities. every call gets answered on the first ring.",
    highlights: [
      "Zero wait times for inbound calls",
      "After-hours coverage without overtime costs",
      "Peak-hour overflow handling so no call goes unanswered",
    ],
  },
]

const useCases = [
  {
    title: "dental practices",
    description:
      "answer patient calls, schedule appointments, handle insurance questions, and send reminders \u2014 even after hours.",
    href: "/ai-agents/dental",
  },
  {
    title: "local services",
    description:
      "plumbers, hvac, electricians \u2014 capture emergency calls 24/7, dispatch the right team, and never lose a lead to voicemail.",
    href: null,
  },
  {
    title: "e-commerce & retail",
    description:
      "handle order status, returns, product questions, and upsell opportunities through natural voice conversations.",
    href: null,
  },
  {
    title: "professional services",
    description:
      "law firms, accounting, consulting \u2014 qualify leads, schedule consultations, and route calls by expertise.",
    href: null,
  },
  {
    title: "property management",
    description:
      "manage tenant requests, schedule showings, handle maintenance dispatches, and provide property information around the clock.",
    href: null,
  },
]

const workflow = [
  {
    step: "01",
    title: "discovery & strategy",
    description:
      "we map your call flows, faqs, and business rules to design an agent that sounds and acts like your best team member.",
  },
  {
    step: "02",
    title: "build & train",
    description:
      "we configure your elevenlabs agent with custom voice, knowledge base, tool integrations (calendar, crm, pms), and conversation flows.",
  },
  {
    step: "03",
    title: "test & refine",
    description:
      "real call testing with your team to fine-tune responses, edge cases, and handoff protocols before going live.",
  },
  {
    step: "04",
    title: "launch & optimize",
    description:
      "we deploy your agent, monitor call quality, and continuously improve based on real conversation data.",
  },
]

const whyPrism = [
  {
    title: "elevenlabs certified partner",
    description:
      "we work directly with elevenlabs' commercial partner program, giving you access to priority support, advanced features, and best practices.",
  },
  {
    title: "full-stack implementation",
    description:
      "we don't just configure a chatbot \u2014 we build complete voice agent systems with crm integrations, custom workflows, analytics dashboards, and ongoing optimization.",
  },
  {
    title: "small business focused",
    description:
      "enterprise agencies charge enterprise prices. prism specializes in making ai accessible and affordable for small and medium businesses.",
  },
]

const PAGE_TITLE = "ElevenLabs AI Agents for Small Business | Design Prism"
const PAGE_DESCRIPTION =
  "Prism builds and implements custom ElevenLabs AI voice agents for small and medium businesses. 24/7 phone answering, appointment scheduling, and customer support \u2014 deployed in days."
const CANONICAL_URL = "https://www.design-prism.com/ai-agents"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/ai-agents",
  ogImage: "/prism-opengraph.png",
})

export default function AIAgentsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-neutral-100">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-white" aria-hidden="true" />
          <div className="container relative mx-auto px-4 pb-16 pt-20 sm:pt-24 md:pb-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">elevenlabs certified partner</p>
              <h1 className="mt-4 text-4xl font-semibold lowercase tracking-tight text-neutral-900 sm:text-5xl">
                ai voice agents that answer, book, and convert \u2014 24/7
              </h1>
              <p className="mt-4 text-base text-neutral-600 sm:text-lg">
                prism builds custom elevenlabs ai agents for small and medium businesses. your customers get instant,
                natural voice support. you get more booked appointments, fewer missed calls, and a team that never
                sleeps.
              </p>
              <p className="mt-3 text-sm text-neutral-500 sm:text-base">
                already using openai tools? explore{" "}
                <Link href="/openai" className="font-semibold text-neutral-900 underline underline-offset-4">
                  openai growth systems
                </Link>
                .
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  talk with prism
                </Link>
                <Link
                  href="#use-cases"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900"
                >
                  explore use cases
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What Are AI Agents */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                what is an elevenlabs ai agent?
              </h2>
              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                ai agents are intelligent voice assistants that handle real phone conversations. they understand context,
                answer questions, schedule appointments, transfer calls, and integrate with your existing tools \u2014 all
                with natural-sounding voices that represent your brand.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {agentCapabilities.map((item) => (
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

        {/* Use Cases / Industries */}
        <section id="use-cases" className="border-y border-neutral-100 bg-neutral-50 py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                built for businesses that depend on every call
              </h2>
              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                from dental offices to property management companies, prism deploys ai agents tailored to your industry,
                workflows, and customer expectations.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((item) => {
                const card = (
                  <div className="flex h-full flex-col gap-3 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <h3 className="text-lg font-semibold lowercase text-neutral-900">{item.title}</h3>
                    <p className="text-sm text-neutral-600">{item.description}</p>
                    {item.href && (
                      <span className="mt-auto inline-flex items-center text-sm font-semibold text-neutral-900 underline underline-offset-4">
                        learn more
                      </span>
                    )}
                  </div>
                )
                return item.href ? (
                  <Link key={item.title} href={item.href} className="block">
                    {card}
                  </Link>
                ) : (
                  <div key={item.title}>{card}</div>
                )
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                from first call to full deployment in days
              </h2>
              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                every engagement blends elevenlabs technology with prism strategists so you get the velocity of ai and
                the judgment of a seasoned implementation team.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {workflow.map((stage) => (
                <div
                  key={stage.step}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
                    {stage.step}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold lowercase text-neutral-900">{stage.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{stage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Prism */}
        <section className="border-y border-neutral-100 bg-neutral-50 py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                why build your ai agent with prism
              </h2>
              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                anyone can sign up for elevenlabs. prism brings the strategy, integrations, and ongoing optimization that
                turn a voice agent into a revenue-generating team member.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {whyPrism.map((item) => (
                <div key={item.title} className="flex h-full flex-col gap-3 rounded-3xl border border-neutral-200 bg-white p-6">
                  <h3 className="text-lg font-semibold lowercase text-neutral-900">{item.title}</h3>
                  <p className="text-sm text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                ready to never miss another call?
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                start with a complimentary strategy session. we&apos;ll map your call flows, identify automation
                opportunities, and show you exactly how an ai agent fits your business.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  book a strategy call
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900"
                >
                  view pricing
                </Link>
              </div>
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
