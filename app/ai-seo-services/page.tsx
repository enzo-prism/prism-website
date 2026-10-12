import type { Metadata } from 'next'
import Link from 'next/link'

import BrandLogo from '@/components/brand-logo'
import FAQSection from '@/components/faq-section'
import Footer from '@/components/footer'
import { LandingHero } from '@/components/landing/landing-hero'
import { BulletList } from '@/components/landing/seo/bullet-list'
import { LinkPills } from '@/components/landing/seo/link-pills'
import { TextLink } from '@/components/landing/seo/text-link'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import ScrollToTop from '@/components/scroll-to-top'
import { HowToSchema, ServiceSchema } from '@/components/schema-markup'
import { SeoSection } from '@/components/seo/seo-section'
import { Card } from '@/components/ui/card'
import SeoTextSection from '@/components/seo-text-section'
import { FREE_AUDIT_CTA_TEXT } from '@/lib/constants'
import { Ban, FileCheck2, Search, ServerCog, ShieldCheck } from 'lucide-react'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { WAITLIST_CTA } from '@/lib/waitlist'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'AI SEO',
  description:
    'Help your brand appear in Google AI Overviews, ChatGPT, Gemini, and Perplexity with clear pages and credible proof.',
  path: '/ai-seo-services',
  ogImage: '/prism-opengraph.png',
})

const primaryCta = {
  label: FREE_AUDIT_CTA_TEXT,
  href: WAITLIST_CTA.href,
} as const

const secondaryCta = {
  label: 'See case studies',
  href: '/case-studies',
} as const

const whatYouGet = [
  {
    title: 'ai visibility audit + baseline',
    description:
      'we map how your brand shows up today across ai overviews and assistants, then align goals to measurable outcomes (calls, forms, pipeline).',
  },
  {
    title: 'answer-ready page upgrades',
    description:
      'we rewrite and restructure key pages so they’re quotable: clear headings, direct answers, proof, and an obvious next step.',
  },
  {
    title: 'entity + corroboration signals',
    description:
      'we tighten the off-site footprint (profiles, citations, mentions, and consistency) so ai systems can corroborate who you are and what you do.',
  },
  {
    title: 'measurement + iteration loop',
    description:
      'we use search console + conversion tracking to pick what to ship next, then compound improvements month to month.',
  },
]

const aiSearchSurfaces = [
  { label: 'chatgpt', brand: 'openai' },
  { label: 'google ai', brand: 'google' },
  { label: 'gemini', brand: 'gemini' },
  { label: 'perplexity', brand: 'perplexity' },
] as const

const components = [
  {
    title: 'technical + indexation hygiene',
    bullets: [
      'canonicals and duplicate cleanup',
      'internal linking that clarifies topic clusters',
      'structured data that matches visible content',
      'performance and mobile experience upgrades',
    ],
  },
  {
    title: 'content designed to be cited',
    bullets: [
      'short question → best answer blocks near the top',
      'scannable sections and definitions that reduce ambiguity',
      'real examples, constraints, and what-to-do-next steps',
      'faq coverage for high-intent objections',
    ],
  },
  {
    title: 'proof systems that corroborate claims',
    bullets: [
      'consistent business/entity data across the web',
      'credible mentions and references (not spam links)',
      'reviews and social proof where relevant',
      'case study and portfolio pages that back the narrative',
    ],
  },
]

const processSteps = [
  {
    step: 'Baseline',
    description:
      'benchmark current visibility, citations, and conversion paths so impact is provable.',
  },
  {
    step: 'Map',
    description:
      'define the topics you should own and the pages that should answer them (no doorway pages).',
  },
  {
    step: 'Ship',
    description:
      'upgrade 1–2 high-leverage pages at a time: clarity, proof, internal links, and schema.',
  },
  {
    step: 'Corroborate',
    description:
      'tighten listings, mentions, and consistency so engines can verify your business and expertise.',
  },
  {
    step: 'Iterate',
    description:
      'use search console + conversions to decide what to improve next and keep compounding.',
  },
]

const whatWeWontDo = [
  'publish dozens of thin pages to manipulate rankings (doorway patterns)',
  'stuff keywords or hide text',
  'buy fake links, citations, or reviews',
  'claim results we can’t support with proof',
  'ship ai-generated filler that isn’t genuinely useful',
]

const faqItems = [
  {
    question: 'What are AI SEO services?',
    answer:
      'AI SEO services help your brand earn visibility and citations in AI-powered search surfaces (like Google AI Overviews and chat assistants) by improving page clarity, corroborated proof, and technical SEO fundamentals so engines can understand and trust you.',
  },
  {
    question: 'Do AI SEO services replace traditional SEO?',
    answer:
      'No. The best AI SEO work strengthens traditional SEO: clean indexation, clear pages, strong internal linking, and trustworthy off-site signals. The difference is emphasis: being quotable, unambiguous, and easily corroborated.',
  },
  {
    question: 'How do you measure AI SEO?',
    answer:
      'We track classic signals (impressions, clicks, rankings) plus outcomes (calls, forms, bookings). AI citation tracking is still evolving, so we focus on measurable demand capture and on-page clarity that makes citations more likely.',
  },
  {
    question: 'How long do AI SEO services take?',
    answer:
      'You can ship clarity and technical wins quickly, but durable visibility compounds over weeks and months as proof signals and content depth build. We prefer steady shipping over sudden bursts of low-quality pages.',
  },
  {
    question: 'Will you create doorway pages for AI SEO?',
    answer:
      'No. We avoid doorway patterns and focus on pages that are genuinely useful: one topic per page, clear answers, real proof, and a clean internal linking structure.',
  },
]

const COMPONENT_ICONS = [ServerCog, FileCheck2, ShieldCheck] as const

export default function AiSeoServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="ai seo services"
          title="ai seo services that help you get cited and chosen."
          titleClassName="max-w-[17ch]"
          description="Prism helps your brand earn visibility in Google AI Overviews and chat-based search (ChatGPT, Gemini, Perplexity) by building clear, proof-backed pages and a measurable shipping loop. No spam. No keyword stuffing. Just a system that compounds."
          location="ai seo services hero"
          ctaHref={primaryCta.href}
          ctaLabel={primaryCta.label}
          secondary={secondaryCta}
          glow="violet"
        >
          <div className="mx-auto max-w-2xl">
            <Card className="spectrum-rule relative overflow-hidden p-4 text-left sm:p-5">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-background/70 px-4 py-3">
                <Search aria-hidden="true" className="size-4 shrink-0 text-subtle" />
                <span className="truncate text-[15px] text-muted-foreground">
                  who should I trust with my website and local search?
                </span>
                <span aria-hidden="true" className="ml-auto h-4 w-px shrink-0 animate-pulse bg-foreground/60 motion-reduce:animate-none" />
              </div>
              <p className="mt-4 text-eyebrow text-subtle">where buyers ask now</p>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {aiSearchSurfaces.map((surface) => (
                  <li
                    key={surface.label}
                    className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-foreground/90"
                  >
                    <BrandLogo brand={surface.brand} theme="dark" decorative className="h-4 w-4" />
                    <span>{surface.label}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <LinkPills
              label="Related pages"
              className="mt-6 justify-center"
              links={[
                { label: 'prism pricing', href: '/pricing' },
                { label: 'seo overview', href: '/seo' },
                { label: 'join the waitlist', href: '/waitlist' },
                { label: 'seo audit service', href: '/seo/audit' },
              ]}
            />
          </div>
        </LandingHero>

        <Section aria-labelledby="ai-seo-included-title">
          <Reveal>
            <SectionHeader
              id="ai-seo-included-title"
              eyebrow="scope"
              title="what’s included."
              description="ai seo services are not a plugin. they’re a combination of technical cleanliness, answer-ready content, and corroborated proof so engines can confidently recommend you."
            />
          </Reveal>
          <Reveal delay={80}>
            <ul className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.08] sm:mt-14 md:grid-cols-2">
              {whatYouGet.map((item, index) => (
                <li key={item.title} className="flex flex-col gap-3 bg-card p-6 sm:p-8">
                  <span className="font-mono text-xs tabular-nums text-subtle">0{index + 1}</span>
                  <h3 className="text-heading text-foreground">{item.title}</h3>
                  <p className="text-[15px] leading-7 text-muted-foreground">{item.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        <Section aria-labelledby="ai-seo-components-title">
          <Reveal>
            <SectionHeader
              id="ai-seo-components-title"
              eyebrow="the components"
              title="what ai systems actually need to trust you."
              description="engines don’t just match keywords. they try to understand who you are, what you do, and whether the web corroborates it."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-3">
            {components.map((component, index) => {
              const Icon = COMPONENT_ICONS[index % COMPONENT_ICONS.length]
              return (
                <Reveal key={component.title} delay={index * 80}>
                  <SpotlightCard beam={index === 1} className="h-full p-6 sm:p-7">
                    <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon aria-hidden="true" className="size-[18px] text-foreground" />
                    </span>
                    <h3 className="text-heading mt-6 text-foreground">{component.title}</h3>
                    <BulletList items={component.bullets} marker="dot" className="mt-5" />
                  </SpotlightCard>
                </Reveal>
              )
            })}
          </div>
        </Section>

        <Section id="process" aria-labelledby="ai-seo-process-title">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-12 sm:px-12 sm:py-16">
            <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-50" />
            <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                id="ai-seo-process-title"
                eyebrow="the process"
                title="a 90-day ai seo services plan."
                description="we ship improvements in a steady cadence: baseline first, then page upgrades, then corroboration, then iteration."
              />
              <TextLink href="/pricing" className="shrink-0">
                see pricing options
              </TextLink>
            </Reveal>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map((item, index) => (
                <li key={item.step} className="flex flex-col gap-3 bg-card p-6">
                  <span className="font-mono text-xs tabular-nums text-subtle">step 0{index + 1}</span>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">{item.step.toLowerCase()}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <SeoSection
          eyebrow="guardrails"
          title="what we won’t do."
          description="sustainable visibility comes from clarity and proof, not spam tactics that create risk."
        >
          <Card className="p-6 sm:p-8">
            <ul className="space-y-4">
              {whatWeWontDo.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-7 text-muted-foreground">
                  <Ban aria-hidden="true" className="mt-1 size-4 shrink-0 text-subtle" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </SeoSection>

        <FAQSection
          title="ai seo services faq."
          subtitle="quick answers to the questions teams ask before hiring ai seo services."
          items={faqItems}
        />

        <SeoTextSection title="ai seo services: the practical playbooks">
          <p>
            if you want the deeper strategy and step-by-step frameworks, start
            with these:
          </p>
          <ul>
            <li>
              <Link href="/blog/new-rules-of-visibility-ai-seo">
                the new rules of visibility (ai seo)
              </Link>
            </li>
            <li>
              <Link href="/blog/winning-ai-search-game">winning the ai search game</Link>
            </li>
            <li>
              <Link href="/blog/future-of-seo-ai-search">
                actionable checklist for ai search
              </Link>
            </li>
            <li>
              <Link href="/blog/turning-your-website-into-an-ai-powered-seo-flywheel">
                turning your website into an ai-powered seo flywheel
              </Link>
            </li>
          </ul>
        </SeoTextSection>

        <FinalCta
          location="ai seo services final cta"
          secondary={{ label: secondaryCta.label, href: secondaryCta.href }}
        />

        <ScrollToTop />
      </main>

      <Footer />

      <ServiceSchema
        serviceId="ai-seo-services"
        name="AI SEO services"
        description="AI SEO services that help brands earn visibility and citations in AI-powered search by improving content clarity, technical fundamentals, and corroborated proof."
        serviceType="SEO services"
        areaServed="United States"
      />
      <HowToSchema
        name="AI SEO services process"
        description="A repeatable AI SEO services system: baseline, map, ship, corroborate, and iterate."
        steps={processSteps.map((step) => ({
          name: step.step,
          text: step.description,
        }))}
      />
    </div>
  )
}
