import Link from "next/link"
import type { Metadata } from "next"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import { FAQSchema, WebPageSchema } from "@/components/schema-markup"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const agentFeatures = [
  {
    title: "appointment scheduling",
    description:
      "patients call, your agent checks real-time availability in dentrix, open dental, or eaglesoft, confirms the slot, and sends confirmation — all in one natural conversation.",
  },
  {
    title: "after-hours coverage",
    description:
      "emergency calls at 2am get triaged intelligently. your agent captures details, provides guidance, and routes urgent cases to the on-call provider.",
  },
  {
    title: "insurance & billing questions",
    description:
      "your agent verifies coverage, explains common procedures and costs, and helps patients understand their benefits — reducing front desk workload significantly.",
  },
  {
    title: "appointment reminders",
    description:
      "proactive outbound calls to confirm upcoming appointments, reducing no-shows and keeping your schedule full.",
  },
  {
    title: "new patient intake",
    description:
      "collect patient information, explain first-visit procedures, answer common questions, and build rapport before they walk in the door.",
  },
  {
    title: "call routing & overflow",
    description:
      "during busy periods, your agent handles routine calls while your team focuses on patients in the chair. complex cases transfer seamlessly to staff.",
  },
]

const impactStats = [
  {
    stat: "35%",
    label: "of dental calls go unanswered during business hours",
    context: "industry research shows over a third of patient calls never reach a human",
  },
  {
    stat: "$200+",
    label: "average lifetime value lost per missed call",
    context: "each unanswered call represents a potential long-term patient relationship",
  },
  {
    stat: "40–60%",
    label: "reduction in front desk call volume",
    context: "practices using ai agents free up staff to focus on in-office patient care",
  },
  {
    stat: "24/7",
    label: "coverage captures after-hours appointments",
    context: "your ai agent books appointments while your competitors send calls to voicemail",
  },
]

const integrations = [
  "dentrix",
  "open dental",
  "eaglesoft",
  "google calendar",
  "patient communication platforms",
  "practice management systems",
]

const faqs = [
  {
    question: "will patients know they're talking to an ai?",
    answer:
      "the agent uses elevenlabs' most natural voice technology. most patients won't notice — but we always recommend transparent disclosure. your agent can introduce itself however you prefer.",
  },
  {
    question: "what happens if the ai can't handle a question?",
    answer:
      "your agent gracefully transfers to your team with full context of the conversation. it knows its limits and never guesses on clinical questions.",
  },
  {
    question: "how long does setup take?",
    answer:
      "most dental practices go live within 5–7 business days. we handle all configuration, testing, and integration work.",
  },
  {
    question: "does it work with my practice management software?",
    answer:
      "yes. we integrate with dentrix, open dental, eaglesoft, and most major pms platforms for real-time scheduling and patient lookup.",
  },
  {
    question: "what does it cost?",
    answer:
      "pricing depends on call volume and integrations. book a strategy call to get a custom quote for your practice.",
  },
]

const PAGE_TITLE = "AI Phone Agents for Dental Practices | Design Prism"
const PAGE_DESCRIPTION =
  "Custom ElevenLabs AI voice agents for dental practices. Automate patient calls, appointment scheduling, insurance verification, and after-hours support. Deployed by Prism in days."
const CANONICAL_URL = "https://www.design-prism.com/ai-agents/dental"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/ai-agents/dental",
  ogImage: "/prism-opengraph.png",
})

export default function DentalAIAgentsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-950 text-white">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(76,201,240,0.15),_transparent_55%)]"
            aria-hidden
          />
          <div className="container relative mx-auto px-4 py-24 md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-neutral-200">
                ai voice agents for dental practices
              </span>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                your ai receptionist never puts a patient on hold
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-200 md:text-lg">
                prism builds custom elevenlabs ai agents specifically for dental practices. answer every patient call
                instantly, schedule appointments 24/7, handle insurance questions, and send reminders — without adding
                staff.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
                >
                  get started
                </Link>
                <Link
                  href="/ai-agents"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
                >
                  see all ai agent services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What Your Agent Handles */}
        <section className="px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">
                built for dental workflows
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                what your dental ai agent handles
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                every feature is designed around the calls your front desk fields daily — scheduling, insurance, intake,
                and after-hours triage.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {agentFeatures.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI / Impact */}
        <section className="border-y border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">the business case</p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                the math behind your ai receptionist
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                missed calls cost real revenue. an ai agent pays for itself by capturing the patients your team
                can&apos;t reach in time.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {impactStats.map((item) => (
                <div
                  key={item.stat}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 text-center shadow-sm"
                >
                  <p className="text-4xl font-semibold text-neutral-900">{item.stat}</p>
                  <p className="mt-2 text-sm font-medium text-neutral-900">{item.label}</p>
                  <p className="mt-2 text-xs text-neutral-500">{item.context}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
              <div className="space-y-6">
                <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">
                  seamless connections
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                  connects to the tools your practice already uses
                </h2>
                <p className="text-base leading-relaxed text-neutral-600">
                  your ai agent plugs into your existing practice management software so appointments, patient records,
                  and availability stay perfectly in sync.
                </p>
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
                <ul className="space-y-3">
                  {integrations.map((tool) => (
                    <li key={tool} className="flex items-center gap-3">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-neutral-900">{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:items-start">
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white">
                  FAQ
                </h2>
                <p className="mt-4 text-sm text-neutral-600">
                  common questions from dental practices evaluating ai phone agents.
                </p>
              </div>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-neutral-900">{faq.question}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="border-t border-neutral-100 bg-white px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">
                the full dental growth stack
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                pair your ai agent with prism&apos;s dental services
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                ai phone agents work best when every touchpoint — your website, ads, seo, and follow-up — is working
                together.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: "dental websites",
                  description: "conversion-first sites that earn trust and book appointments",
                  href: "/dental-website",
                },
                {
                  label: "dental seo",
                  description: "local search visibility that brings high-intent patients",
                  href: "/dental-practice-seo-expert",
                },
                {
                  label: "facebook ads",
                  description: "targeted campaigns that fill your schedule with new patients",
                  href: "/facebook-ads-for-dentists",
                },
                {
                  label: "custom email",
                  description: "professional @yourpractice.com email for your team",
                  href: "/custom-email-for-dental-practices",
                },
              ].map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="block rounded-2xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md"
                >
                  <h3 className="text-base font-semibold text-neutral-900">{service.label}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{service.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 pb-20 pt-16 sm:pb-24">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">
              ready to stop missing patient calls?
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">next step</h2>
            <p className="mt-4 text-base text-neutral-600">
              book a complimentary strategy call. we&apos;ll map your call volume, identify automation opportunities,
              and show you exactly how an ai agent fits your practice.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                book a strategy call
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-8 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900"
              >
                view pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
      <FAQSchema questions={faqs} />
    </>
  )
}
