import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  BellRing,
  CalendarCheck,
  ClipboardList,
  Moon,
  PhoneForwarded,
  Plug,
  Receipt,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

import Footer from '@/components/footer'
import { Callout, DentalFaq, TextLink } from '@/components/landing/dental/primitives'
import { LandingHero } from '@/components/landing/landing-hero'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { FAQSchema, WebPageSchema } from '@/components/schema-markup'
import ScrollToTop from '@/components/scroll-to-top'
import { Card } from '@/components/ui/card'
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
  'Dentrix',
  'Open Dental',
  'Eaglesoft',
  'Google Calendar',
  'Patient communication platforms',
  'Practice management systems',
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
      'pricing depends on call volume and integrations. join the waitlist and Prism will map the right next step when we can take on your practice.',
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

const featureIcons: LucideIcon[] = [CalendarCheck, Moon, Receipt, BellRing, ClipboardList, PhoneForwarded]

const relatedServices = [
  {
    label: 'dental websites',
    description: 'conversion-first sites that earn trust and book appointments',
    href: '/dental-website',
  },
  {
    label: 'dental seo',
    description: 'local search work aimed at high-intent patients',
    href: '/dental-practice-seo-expert',
  },
  {
    label: 'facebook ads',
    description: 'targeted campaigns aimed at new patient inquiries',
    href: '/facebook-ads-for-dentists',
  },
  {
    label: 'custom email',
    description: 'professional @yourpractice.com email for your team',
    href: '/custom-email-for-dental-practices',
  },
]

export default function DentalAIAgentsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="AI voice agents for dental practices"
          title="an ai receptionist for routine calls and careful handoffs."
          description="prism builds custom elevenlabs ai agents for dental practices. extend phone coverage, handle approved scheduling and administrative workflows, and route clinical or sensitive questions to your team."
          location="dental ai agents hero"
          ctaHref="/waitlist"
          ctaLabel={FREE_AUDIT_CTA_TEXT}
          secondary={{ label: 'See all AI agent services', href: '/ai-agents' }}
          glow="blue"
          titleClassName="max-w-[17ch]"
        >
          <Callout
            tone="warn"
            title="protected health information"
            icon={<ShieldCheck className="size-4" aria-hidden />}
            className="mx-auto max-w-3xl text-left"
          >
            <p>
              PHI is submitted to ElevenLabs only when the practice is an
              Enterprise customer with an executed ElevenLabs BAA and Zero
              Retention Mode enabled and configured. Otherwise, the agent
              collects non-PHI or routes the caller to staff. The practice
              remains responsible for its compliance program.{' '}
              <TextLink href="https://elevenlabs.io/docs/eleven-agents/legal/hipaa">
                Review ElevenLabs&apos; HIPAA requirements
              </TextLink>
              .
            </p>
          </Callout>
        </LandingHero>

        <Section aria-labelledby="agent-handles-title">
          <Reveal>
            <SectionHeader
              id="agent-handles-title"
              eyebrow="Built for dental workflows"
              title="what your dental ai agent handles."
              description="every feature is designed around the calls your front desk fields daily: scheduling, insurance, intake, and after-hours triage."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agentFeatures.map((item, index) => {
              const Icon = featureIcons[index] ?? PhoneForwarded
              return (
                <Reveal key={item.title} delay={(index % 3) * 70}>
                  <Card className="flex h-full flex-col p-6 transition-colors hover:border-white/[0.16]">
                    <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon className="size-[18px] text-foreground" aria-hidden />
                    </span>
                    <h3 className="mt-6 text-[17px] font-semibold tracking-[-0.02em] text-foreground">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{item.description}</p>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </Section>

        <Section aria-labelledby="agent-case-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:items-end lg:gap-16">
            <Reveal>
              <SectionHeader
                id="agent-case-title"
                eyebrow="The business case"
                title="the operating case for an ai receptionist."
                description="the business case depends on your call volume, staffing, integrations, and conversion baseline. prism measures coverage, handoffs, and booked outcomes instead of promising a universal return."
              />
            </Reveal>
            <Reveal delay={120}>
              <ul className="spectrum-rule grid grid-cols-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-card sm:grid-cols-2">
                {impactStats.map((item) => (
                  <li
                    key={item.stat}
                    className="-mb-px -mr-px flex flex-col gap-3 border-b border-r border-white/[0.07] p-6 sm:p-8"
                  >
                    <span className="text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] font-semibold leading-none tracking-[-0.045em] text-foreground">
                      {item.stat}
                    </span>
                    <span className="text-[15px] font-medium text-foreground/90">{item.label}</span>
                    <span className="text-[13px] leading-5 text-subtle">{item.context}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        <Section aria-labelledby="agent-tools-title">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-12 sm:px-12 sm:py-16">
            <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-40" />
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
              <SectionHeader
                id="agent-tools-title"
                eyebrow="Connected tools"
                title="connecting the tools your practice already uses."
                description="Connection options depend on each vendor and account. Prism validates permissions, supported actions, data handling, and fallback behavior before an integration goes live."
              />
              <ul className="flex flex-wrap gap-2.5">
                {integrations.map((tool) => (
                  <li
                    key={tool}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/60 px-4 py-2 text-[14px] text-foreground"
                  >
                    <Plug className="size-3.5 text-subtle" aria-hidden />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <DentalFaq
          idPrefix="dental-ai-agents"
          description="common questions from dental practices evaluating ai phone agents."
          items={faqs}
        />

        <Section aria-labelledby="agent-related-title">
          <Reveal>
            <SectionHeader
              id="agent-related-title"
              eyebrow="The full dental growth stack"
              title="pair your ai agent with prism’s dental services."
              description="ai phone agents work best when every touchpoint (your website, ads, seo, and follow-up) is working together."
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((service) => (
                <li key={service.href} className="bg-card">
                  <Link
                    href={service.href}
                    className="group/related flex h-full flex-col gap-2 p-6 transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">{service.label}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 text-subtle transition-[color,transform] duration-200 group-hover/related:translate-x-0.5 group-hover/related:text-foreground"
                      />
                    </span>
                    <span className="text-[14px] leading-6 text-muted-foreground">{service.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        <FinalCta
          location="dental ai agents final cta"
          href="/waitlist"
          secondary={{ label: 'View pricing', href: '/pricing' }}
        />
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
    </div>
  )
}
