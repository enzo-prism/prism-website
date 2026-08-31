import Link from 'next/link'
import type { Metadata } from 'next'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ScrollToTop from '@/components/scroll-to-top'
import { FAQSchema, WebPageSchema } from '@/components/schema-markup'
import { FREE_AUDIT_CTA_TEXT } from '@/lib/constants'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const agentFeatures = [
  {
    title: 'appointment scheduling',
    description:
      'where supported, the agent can read approved availability, request an appointment, and send a confirmation. we verify each practice-management connection before enabling write actions.',
  },
  {
    title: 'after-hours coverage',
    description:
      'after-hours calls can be logged and routed through practice-approved escalation rules. the agent does not diagnose, provide clinical guidance, or replace emergency instructions.',
  },
  {
    title: 'insurance & billing questions',
    description:
      'the agent can answer approved administrative FAQs and collect details for staff follow-up. benefits, coverage, treatment, and final cost questions stay with qualified staff and insurers.',
  },
  {
    title: 'appointment reminders',
    description:
      "with the practice's approved consent and communication settings, outbound reminders can request confirmations and route changes back to the team.",
  },
  {
    title: 'new patient intake',
    description:
      'collect the minimum approved intake details, explain published first-visit information, and hand sensitive or clinical questions to the practice.',
  },
  {
    title: 'call routing & overflow',
    description:
      'during busy periods, your agent handles routine calls while your team focuses on patients in the chair. complex cases transfer cleanly to staff.',
  },
]

const impactStats = [
  {
    stat: 'Coverage',
    label: 'capture approved after-hours requests',
    context: 'availability and escalation rules are set by the practice',
  },
  {
    stat: 'Overflow',
    label: 'handle routine calls during busy periods',
    context: 'unsupported or sensitive requests transfer to staff',
  },
  {
    stat: 'Handoff',
    label: 'route calls with collected context',
    context: 'clinical decisions and final answers stay with people',
  },
  {
    stat: 'Measured',
    label: 'review call outcomes and exceptions',
    context: "performance is evaluated against the practice's baseline",
  },
]

const integrations = [
  'dentrix',
  'open dental',
  'eaglesoft',
  'google calendar',
  'patient communication platforms',
  'practice management systems',
]

const faqs = [
  {
    question: "will patients know they're talking to an ai?",
    answer:
      'we recommend clear disclosure that the caller is speaking with an ai assistant. the greeting, recording notice, consent language, and escalation path are reviewed with the practice before launch.',
  },
  {
    question: "what happens if the ai can't handle a question?",
    answer:
      'we configure explicit limits, approved answers, and transfer rules. clinical, sensitive, or unsupported questions are routed to staff instead of being answered by the agent.',
  },
  {
    question: 'how long does setup take?',
    answer:
      'timing depends on call-flow complexity, vendor access, privacy review, integrations, testing, and staff approval. prism confirms the implementation plan before work begins.',
  },
  {
    question: 'does it work with my practice management software?',
    answer:
      'integration options vary by product, account, API access, and approved data scope. we verify the exact read, write, and handoff capabilities for your system before promising automation.',
  },
  {
    question: 'how do you handle patient privacy?',
    answer:
      'we minimize the data collected, map where it is stored and sent, and review vendor agreements and account settings with the practice. PHI is submitted to ElevenLabs only for an Enterprise customer with an executed ElevenLabs BAA and Zero Retention Mode enabled and configured. otherwise, the agent collects non-PHI or routes the caller to staff. the practice remains responsible for its compliance program.',
  },
  {
    question: 'what does it cost?',
    answer:
      'pricing depends on call volume and integrations. start with a free growth audit so Prism can map the right next step.',
  },
]

const PAGE_TITLE = 'AI phone agents for dentists'
const PAGE_DESCRIPTION =
  'AI phone agents for approved scheduling, administrative questions, call routing, and after-hours dental workflows.'
const CANONICAL_URL = 'https://www.design-prism.com/ai-agents/dental'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/ai-agents/dental',
  ogImage: '/prism-opengraph.png',
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
                an ai receptionist for routine calls and careful handoffs
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-200 md:text-lg">
                prism builds custom elevenlabs ai agents for dental practices.
                extend phone coverage, handle approved scheduling and
                administrative workflows, and route clinical or sensitive
                questions to your team.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
                >
                  {FREE_AUDIT_CTA_TEXT}
                </Link>
                <Link
                  href="/ai-agents"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
                >
                  see all ai agent services
                </Link>
              </div>
            </div>
            <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950">
              <p className="font-semibold">protected health information</p>
              <p className="mt-2">
                PHI is submitted to ElevenLabs only when the practice is an
                Enterprise customer with an executed ElevenLabs BAA and Zero
                Retention Mode enabled and configured. Otherwise, the agent
                collects non-PHI or routes the caller to staff. The practice
                remains responsible for its compliance program.{' '}
                <Link
                  href="https://elevenlabs.io/docs/eleven-agents/legal/hipaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-4"
                >
                  Review ElevenLabs&apos; HIPAA requirements
                </Link>
                .
              </p>
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
                every feature is designed around the calls your front desk
                fields daily: scheduling, insurance, intake, and after-hours
                triage.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {agentFeatures.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-neutral-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI / Impact */}
        <section className="border-y border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">
                the business case
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                the operating case for an ai receptionist
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                the business case depends on your call volume, staffing,
                integrations, and conversion baseline. prism measures coverage,
                handoffs, and booked outcomes instead of promising a universal
                return.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {impactStats.map((item) => (
                <div
                  key={item.stat}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 text-center shadow-sm"
                >
                  <p className="text-4xl font-semibold text-neutral-900">
                    {item.stat}
                  </p>
                  <p className="mt-2 text-sm font-medium text-neutral-900">
                    {item.label}
                  </p>
                  <p className="mt-2 text-xs text-neutral-500">
                    {item.context}
                  </p>
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
                  connected tools
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                  connects to the tools your practice already uses
                </h2>
                <p className="text-base leading-relaxed text-neutral-600">
                  connection options depend on each vendor and account. prism
                  validates permissions, supported actions, data handling, and
                  fallback behavior before an integration goes live.
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
                      <span className="text-sm font-medium text-neutral-900">
                        {tool}
                      </span>
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
                  common questions from dental practices evaluating ai phone
                  agents.
                </p>
              </div>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {faq.question}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {faq.answer}
                    </p>
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
                ai phone agents work best when every touchpoint (your website,
                ads, seo, and follow-up) is working together.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: 'dental websites',
                  description:
                    'conversion-first sites that earn trust and book appointments',
                  href: '/dental-website',
                },
                {
                  label: 'dental seo',
                  description:
                    'local search visibility that brings high-intent patients',
                  href: '/dental-practice-seo-expert',
                },
                {
                  label: 'facebook ads',
                  description:
                    'targeted campaigns that fill your schedule with new patients',
                  href: '/facebook-ads-for-dentists',
                },
                {
                  label: 'custom email',
                  description:
                    'professional @yourpractice.com email for your team',
                  href: '/custom-email-for-dental-practices',
                },
              ].map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="block rounded-2xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md"
                >
                  <h3 className="text-base font-semibold text-neutral-900">
                    {service.label}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600">
                    {service.description}
                  </p>
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
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              next step
            </h2>
            <p className="mt-4 text-base text-neutral-600">
              start with a free growth audit. we&apos;ll map your call volume,
              identify automation opportunities, and show how an ai agent fits
              your practice.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                {FREE_AUDIT_CTA_TEXT}
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
