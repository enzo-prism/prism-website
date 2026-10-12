import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight, Check } from 'lucide-react'

import Footer from '@/components/footer'
import { LandingHero } from '@/components/landing/landing-hero'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { WebPageSchema } from '@/components/schema-markup'
import { Card } from '@/components/ui/card'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const agentCapabilities = [
  {
    title: 'natural conversations',
    description:
      'Built with ElevenLabs voice technology, your agent can handle turn-taking, interruptions, and approved customer questions in a natural-sounding conversation.',
    highlights: [
      'Lifelike voices that match your brand personality',
      'Context-aware responses that feel like real conversations',
      'Multilingual support for diverse customer bases',
    ],
  },
  {
    title: 'smart actions',
    description:
      'Agents don’t just talk. They book appointments, check availability, route calls, collect information, and trigger workflows in your existing systems.',
    highlights: [
      'Real-time calendar and CRM integrations',
      'Automated follow-ups and confirmations',
      'Intelligent call routing based on intent',
    ],
  },
  {
    title: 'extended availability',
    description:
      'Your AI agent can extend coverage beyond staffed hours and absorb routine-call overflow, with fallback and escalation rules for outages or unsupported requests.',
    highlights: [
      'Configurable inbound-call coverage',
      'After-hours answers for approved workflows',
      'Peak-hour overflow with human handoff',
    ],
  },
]

const useCases = [
  {
    title: 'dental practices',
    description:
      'Answer patient calls, schedule appointments, handle insurance questions, and send reminders, even after hours.',
    href: '/ai-agents/dental',
  },
  {
    title: 'local services',
    description:
      'Plumbers, HVAC, electricians: capture after-hours requests, route urgent calls, and reduce leads lost to voicemail.',
    href: null,
  },
  {
    title: 'e-commerce & retail',
    description:
      'Handle order status, returns, product questions, and upsell opportunities through natural voice conversations.',
    href: null,
  },
  {
    title: 'professional services',
    description:
      'Law firms, accounting, consulting: qualify leads, schedule consultations, and route calls by expertise.',
    href: null,
  },
  {
    title: 'property management',
    description:
      'Manage tenant requests, schedule showings, handle maintenance dispatches, and provide property information around the clock.',
    href: null,
  },
]

const workflow = [
  {
    step: '01',
    title: 'discovery & strategy',
    description:
      'We map your call flows, FAQs, and business rules to design an agent that sounds and acts like your best team member.',
  },
  {
    step: '02',
    title: 'build & configure',
    description:
      'We configure your ElevenLabs agent with custom voice, knowledge base, tool integrations (calendar, CRM, PMS), and conversation flows.',
  },
  {
    step: '03',
    title: 'test & refine',
    description:
      'Real call testing with your team to fine-tune responses, edge cases, and handoff protocols before going live.',
  },
  {
    step: '04',
    title: 'launch & optimize',
    description:
      'We deploy your agent, monitor call quality, and continuously improve based on real conversation data.',
  },
]

const whyPrism = [
  {
    title: 'ElevenLabs implementation',
    description:
      'We configure ElevenLabs agents around your approved knowledge, call flows, integrations, and escalation rules. Platform access and support remain governed by ElevenLabs and your account.',
  },
  {
    title: 'full-stack implementation',
    description:
      'We don’t just configure a chatbot. We build complete voice agent systems with CRM integrations, custom workflows, analytics dashboards, and ongoing optimization.',
  },
  {
    title: 'small business focused',
    description:
      'Prism scopes voice automation around the team, systems, call volume, and review process a small or medium business already has.',
  },
]

const PAGE_TITLE = 'AI voice agents for small business'
const PAGE_DESCRIPTION =
  'Prism builds and manages ElevenLabs voice agents for call handling, appointment workflows, routing, and after-hours coverage.'
const CANONICAL_URL = 'https://www.design-prism.com/ai-agents'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/ai-agents',
  index: false,
  ogImage: '/prism-opengraph.png',
})

export default function AIAgentsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="ElevenLabs voice implementation"
          title="ai voice agents for calls, booking, and follow-up."
          description={
            <>
              Prism builds custom ElevenLabs AI agents for small and medium
              businesses. Extend phone coverage, handle approved routine
              requests, and route the conversations that need a person. Results
              depend on call volume, integrations, and the workflows approved
              during testing.
            </>
          }
          location="ai agents hero"
          secondary={{ label: 'Explore use cases', href: '#use-cases' }}
          glow="violet"
        >
          <p className="text-center text-sm text-muted-foreground">
            Already using OpenAI tools? Explore{' '}
            <Link
              href="/openai"
              className="inline-flex items-center gap-1 rounded-sm font-medium text-foreground underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white/70 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              OpenAI growth systems
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          </p>
        </LandingHero>

        <Section aria-labelledby="ai-agents-what-title">
          <Reveal>
            <SectionHeader
              id="ai-agents-what-title"
              eyebrow="The agent"
              title="what is an ElevenLabs ai agent?"
              description="AI agents are intelligent voice assistants that handle real phone conversations. They understand context, answer questions, schedule appointments, transfer calls, and integrate with your existing tools, all with natural-sounding voices that represent your brand."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {agentCapabilities.map((item, index) => (
              <Reveal key={item.title} delay={index * 80} className="h-full">
                <SpotlightCard
                  beam={index === 0}
                  className="flex h-full flex-col gap-5 p-6 sm:p-7"
                >
                  <div>
                    <h3 className="text-heading text-foreground">
                      {item.title}.
                    </h3>
                    <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <ul className="mt-auto space-y-2.5 border-t border-white/[0.08] pt-5 text-sm text-muted-foreground">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2.5">
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-foreground"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="use-cases" aria-labelledby="ai-agents-use-cases-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader
                id="ai-agents-use-cases-title"
                eyebrow="Use cases"
                title="built for businesses where calls matter."
                description="From dental offices to property management companies, Prism deploys AI agents tailored to your industry, workflows, and customer expectations."
              />
            </Reveal>
            <ul className="grid gap-4 sm:grid-cols-2">
              {useCases.map((item, index) => (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={index * 60}
                  className={item.href ? 'h-full sm:col-span-2' : 'h-full'}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="group/case block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      <Card className="flex h-full flex-col gap-3 p-6 transition-[border-color,transform] duration-300 group-hover/case:-translate-y-0.5 group-hover/case:border-white/20">
                        <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-[15px] leading-7 text-muted-foreground">
                          {item.description}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-foreground">
                          Learn more
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-4 transition-transform duration-200 group-hover/case:-translate-y-0.5 group-hover/case:translate-x-0.5"
                          />
                        </span>
                      </Card>
                    </Link>
                  ) : (
                    <Card className="flex h-full flex-col gap-3 p-6">
                      <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-[15px] leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                    </Card>
                  )}
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>

        <Section aria-labelledby="ai-agents-workflow-title">
          <Reveal>
            <SectionHeader
              id="ai-agents-workflow-title"
              eyebrow="How it works"
              title="from first call to a tested deployment."
              description="Every engagement blends ElevenLabs technology with Prism strategists so you get the velocity of AI and the judgment of a seasoned implementation team."
              align="center"
            />
          </Reveal>
          <Reveal delay={100}>
            <ol className="spectrum-rule mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.07] md:grid-cols-2 lg:grid-cols-4">
              {workflow.map((stage) => (
                <li
                  key={stage.step}
                  className="flex flex-col gap-3 bg-card p-6 sm:p-8"
                >
                  <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-subtle tabular-nums">
                    {stage.step}
                  </span>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                    {stage.title}
                  </h3>
                  <p className="text-[15px] leading-7 text-muted-foreground">
                    {stage.description}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Section>

        <Section aria-labelledby="ai-agents-why-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-16">
            <Reveal>
              <SectionHeader
                id="ai-agents-why-title"
                eyebrow="Why Prism"
                title="why build your ai agent with Prism."
                description="Anyone can evaluate a voice platform. Prism brings the strategy, integrations, testing, and ongoing review needed to turn it into a dependable part of the call workflow."
              />
            </Reveal>
            <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {whyPrism.map((item, index) => (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={index * 80}
                  className="py-6"
                >
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[60ch] text-[15px] leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>

        <FinalCta
          location="ai agents final cta"
          title="ready to reduce missed calls?"
          description="Join the waitlist. When we can take on your team, we'll map your call flows, identify automation opportunities, and show how an AI agent fits your business."
          secondary={{ label: 'View pricing', href: '/pricing' }}
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
