import Link from 'next/link'
import type { Metadata } from 'next'

import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'

import BrandLogo from '@/components/brand-logo'
import Footer from '@/components/footer'
import { LandingHero } from '@/components/landing/landing-hero'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { WebPageSchema } from '@/components/schema-markup'
import { Button } from '@/components/ui/button'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const openAiStack = [
  {
    title: 'strategic copilots',
    description:
      'We configure reasoning and multimodal workflows around your approved voice, offers, and service areas so campaign drafts start with useful context.',
    highlights: [
      'Persona and journey modeling to pinpoint local demand',
      'Offer testing scripts that recommend angles before we launch',
      'Automated briefs that feed creative, SEO, and listings updates',
    ],
  },
  {
    title: 'content engines',
    description:
      'OpenAI-powered workflows help turn transcripts, reviews, and practice knowledge into draft articles, video briefs, and nurture sequences for human review.',
    highlights: [
      'Topic clustering with embeddings to map authority gaps',
      'Voice-adapted outlines that hand off cleanly to our writers',
      'Compliance and tone checks before anything goes live',
    ],
  },
  {
    title: 'operations automation',
    description:
      'We connect OpenAI with your CRM, scheduling, and intake tools so front-office teams stay focused on high-value conversations.',
    highlights: [
      'Inbox triage and call summaries that sync with your systems',
      'Follow-up reminders triggered by lead quality and intent',
      'Practice intelligence dashboards that surface weekly wins',
    ],
  },
]

const discoverySurfaces = [
  {
    name: 'ChatGPT search',
    summary:
      'We publish clear, well-sourced site content and monitor attributable traffic where data is available. OpenAI decides what ChatGPT surfaces and cites.',
  },
  {
    name: 'Agents and tools',
    summary:
      'We can connect client-approved data and actions to agent workflows using supported APIs, with scoped permissions and human review.',
  },
  {
    name: 'Structured web content',
    summary:
      'We keep services, locations, FAQs, and proof consistent across public pages and structured data so search systems can interpret them accurately.',
  },
]

const workflow = [
  {
    title: 'map your growth signals',
    description:
      'We audit approved content, reviews, and CRM notes, then configure AI workflows around the language your team actually uses.',
  },
  {
    title: 'ship high leverage assets',
    description:
      'Campaigns, landing pages, and listing updates move through AI-assisted pipelines so your team can review and publish them more efficiently.',
  },
  {
    title: 'publish to owned sources',
    description:
      'We publish structured data and current offers to sources you control, then measure referral and search performance where reporting is available.',
  },
  {
    title: 'keep humans in the loop',
    description:
      'Every deliverable runs through expert review, performance tracking, and compliance checks to ensure quality, accuracy, and accountability.',
  },
]

const PAGE_TITLE = 'OpenAI growth systems'
const PAGE_DESCRIPTION =
  'See how Prism uses OpenAI APIs and tools to build reviewed workflows for marketing, operations, search visibility, and customer support.'
const CANONICAL_URL = 'https://www.design-prism.com/openai'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/openai',
  ogImage: '/prism-opengraph.png',
})

const inlineLinkClassName =
  'inline-flex items-center gap-1 rounded-sm font-medium text-foreground underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white/70 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'

export default function OpenAIPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="OpenAI implementation"
          title="practical ai systems built around your business."
          description="Prism is an independent agency that implements workflows with supported OpenAI products and APIs. We build the content, automations, and controls. OpenAI controls its products, search results, model behavior, and access."
          location="openai hero"
          secondary={{
            label: 'View the Codex rebuild guide',
            href: '/openai/site-rebuild',
          }}
          glow="green"
        >
          <p className="text-center text-sm leading-6 text-muted-foreground">
            Building broader small business AI systems? Explore{' '}
            <Link href="/smb" className={inlineLinkClassName}>
              small business AI services
            </Link>{' '}
            or{' '}
            <Link href="/services" className={inlineLinkClassName}>
              all services
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          </p>
        </LandingHero>

        <Section aria-labelledby="openai-stack-title">
          <Reveal>
            <SectionHeader
              id="openai-stack-title"
              eyebrow="For clients"
              title="how we use OpenAI for clients."
              description="Our team configures task-specific copilots, automates repeatable production steps, and keeps people responsible for review, approval, and measurement."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {openAiStack.map((item, index) => (
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

        <Section aria-labelledby="openai-discovery-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-16">
            <Reveal>
              <SectionHeader
                id="openai-discovery-title"
                eyebrow="AI discovery"
                title="preparing for ai discovery."
                description="We keep your public information accurate and machine-readable. That improves discoverability, but no agency can guarantee inclusion, ranking, or citation in an AI response."
              />
            </Reveal>
            <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {discoverySurfaces.map((surface, index) => (
                <Reveal
                  as="li"
                  key={surface.name}
                  delay={index * 80}
                  className="flex gap-4 py-6"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-card">
                    <BrandLogo
                      brand="openai"
                      theme="dark"
                      decorative
                      className="size-[18px]"
                    />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold tracking-[-0.02em] text-foreground">
                      {surface.name}
                    </span>
                    <span className="mt-1.5 block max-w-[60ch] text-[15px] leading-7 text-muted-foreground">
                      {surface.summary}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>

        <Section aria-labelledby="openai-guide-title">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card p-6 sm:p-12">
              <div
                aria-hidden="true"
                className="bg-grid absolute inset-0 opacity-40"
              />
              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
                <SectionHeader
                  id="openai-guide-title"
                  eyebrow="Hands-on guide"
                  title="rebuild your site locally with Codex."
                  titleClassName="text-[clamp(1.9rem,1.4rem+2vw,3rem)] font-semibold leading-[1] tracking-[-0.045em]"
                />
                <div className="space-y-6">
                  <p className="text-pretty text-base leading-7 text-muted-foreground">
                    Need the exact workflow for mirroring a live site, feeding
                    Codex accurate context, and launching the new build on
                    localhost? Follow our step-by-step Codex CLI playbook built
                    for macOS.
                  </p>
                  <Button asChild size="lg" className="group/cta">
                    <Link href="/openai/site-rebuild">
                      Read the local rebuild guide
                      <ArrowRight
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
                      />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>

        <Section aria-labelledby="openai-workflow-title">
          <Reveal>
            <SectionHeader
              id="openai-workflow-title"
              eyebrow="Workflow"
              title="our human + ai workflow."
              description="Every engagement blends OpenAI systems with Prism strategists so you get the velocity of automation and the judgment of a seasoned team."
              align="center"
            />
          </Reveal>
          <Reveal delay={100}>
            <ol className="spectrum-rule mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.07] md:grid-cols-2">
              {workflow.map((stage, index) => (
                <li
                  key={stage.title}
                  className="flex flex-col gap-3 bg-card p-6 sm:p-8"
                >
                  <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-subtle tabular-nums">
                    {String(index + 1).padStart(2, '0')}
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

        <FinalCta location="openai final cta" />
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
