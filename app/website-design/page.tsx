import { OwnerDecision } from '@/components/prism/owner-decision'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  FileText,
  KeyRound,
  Palette,
  PenLine,
  Rocket,
  Smartphone,
} from 'lucide-react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import { ProofMetricCard } from '@/components/services/ProofMetricCard'
import {
  ServiceBento,
  type ServiceBentoItem,
} from '@/components/services/ServiceBento'
import { ServiceFaq } from '@/components/services/ServiceFaq'
import { ServiceHero } from '@/components/services/ServiceHero'
import { ServiceSiblings } from '@/components/services/ServiceSiblings'
import {
  ServiceSteps,
  type ServiceStep,
} from '@/components/services/ServiceSteps'
import { WebsiteDesignAnatomy } from '@/components/services/WebsiteDesignAnatomy'
import { WebsiteDesignHeroVisual } from '@/components/services/WebsiteDesignHeroVisual'
import { WebsiteDesignWorkRail } from '@/components/services/WebsiteDesignWorkRail'
import { getClientQuotes } from '@/components/services/community-comments'
import {
  TechStackIcon,
  WEBSITE_SURFACE_ICONS,
} from '@/components/tech-stack-icons'
import TrackedLink from '@/components/tracked-link'
import { getCaseStudyMetric } from '@/lib/case-study-data'
import { WEBSITE_WAITLIST_CTA } from '@/lib/pricing-model'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_DESCRIPTION =
  'Custom website design for your brand: pages written around customer questions, mobile-first layouts, inquiry forms, and analytics, built by Prism.'
const PAGE_PATH = '/website-design'
const CANONICAL_URL = `https://www.design-prism.com${PAGE_PATH}`

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Custom website design for small business',
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  ogImage: '/prism-opengraph.png',
})

// Real, source-attributed results from lib/case-study-data.ts (Google Search
// Console). These are the only published client result metrics; do not
// invent others.
const wongImpressions = getCaseStudyMetric('dr-christopher-wong')
const belizeImpressions = getCaseStudyMetric('belize-kids-foundation')

const WONG_CLIENT = 'Dr. Christopher Wong'
const WONG_HREF = '/case-studies/dr-christopher-wong'

// Named website design clients, verbatim from content/wall-of-love-data.tsx.
const CLIENT_QUOTES = getClientQuotes([3, 1])

const WHAT_YOU_GET: readonly ServiceBentoItem[] = [
  {
    icon: Palette,
    title: 'design that feels like your business',
    body: 'Custom type, color, spacing, and motion. Zero templates.',
    className: 'md:col-span-4',
    visual: <DesignSpecimen />,
  },
  {
    icon: Smartphone,
    title: 'designed for the phone first',
    body: 'Fast, thumb-friendly layouts built for mobile first.',
    points: ['Mobile-first layouts', 'Semantic HTML', 'Speed checked'],
  },
  {
    icon: BarChart3,
    title: 'know what brings people in',
    body: 'GA4 and conversion tracking live on day one.',
    visual: <TrackingList />,
  },
  {
    icon: PenLine,
    title: 'copy designed in, not pasted in',
    body: 'Clear answers built into every layout.',
    visual: <QuestionList />,
  },
  {
    icon: KeyRound,
    title: 'yours, completely',
    body: 'Domain, code, content, and data belong to you.',
    visual: <OwnershipList />,
  },
]

const STEPS: readonly ServiceStep[] = [
  {
    icon: FileText,
    title: 'join the waitlist',
    detail: 'First',
    body: 'Share your site and goal. We confirm scope and price up front.',
  },
  {
    icon: Palette,
    title: 'design, then build',
    detail: 'Design',
    body: 'Custom visual direction, build, and live preview before launch.',
  },
  {
    icon: Rocket,
    title: 'launch and measure',
    detail: 'Launch',
    body: 'Tracking, speed, and search verified on launch day.',
  },
]

const FAQ_ITEMS = [
  {
    question: 'What is included in Prism website design?',
    answer:
      'Custom design, page copy, mobile-first development, inquiry forms, search foundations, and analytics. One team designs and builds the site, so what you approve is exactly what ships.',
  },
  {
    question: 'Do you use templates?',
    answer:
      'No. Every site starts from scratch around your brand and buyers, with its own typography, color system, layout, and motion.',
  },
  {
    question: 'Can you redesign my current website?',
    answer:
      'Yes. We audit what already performs, protect existing search traffic with clean redirects, and rebuild on a stronger foundation.',
  },
  {
    question: 'Do you only design, or build too?',
    answer:
      'Both. We handle strategy, copy, design, engineering, analytics, and launch under one roof.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'Prism is fully booked right now, so every website project starts on the waitlist. When your intake opens, we confirm exact scope and price before work begins.',
  },
  {
    question: 'How do you support visibility in AI assistants?',
    answer:
      'We structure your services, locations, and credentials clearly in both copy and schema so Google and AI assistants can read them accurately. Rankings and recommendations are never guaranteed.',
  },
  {
    question: 'Do I own the website?',
    answer:
      'Completely. From launch day, the website and everything within it belongs to you. There is no lock-in of any kind.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'Your choice. Keep Prism on for ongoing updates, analytics, search, and AI visibility, or take full handoff in-house.',
  },
] as const

// Where a Prism-designed site has to be understood: classic search AND AI
// answers.
const SURFACE_NOTES: Record<string, string> = {
  'Google Search': 'Search results',
  'Google Maps': 'Local results',
  'AI Overviews': 'AI answers in Google',
  ChatGPT: 'Assistant answers',
  Gemini: 'Assistant answers',
  Claude: 'Assistant answers',
  Perplexity: 'Answer engine',
}

function DesignSpecimen() {
  return (
    <div className="flex items-end justify-between gap-6 border-t border-white/[0.06] px-6 pb-6 pt-6 sm:px-7 sm:pb-7">
      <span className="text-[clamp(4rem,3rem+3vw,6.5rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-foreground">
        Aa
      </span>
      <div className="flex flex-1 flex-col items-end gap-3">
        <div className="flex gap-1.5">
          {[
            'bg-foreground',
            'bg-foreground/70',
            'bg-foreground/40',
            'bg-foreground/15',
            'bg-popover',
          ].map((swatch) => (
            <span
              key={swatch}
              className={`size-8 rounded-lg border border-white/10 sm:size-10 ${swatch}`}
            />
          ))}
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          {['Typography', 'Color', 'Spacing', 'Motion'].map((token) => (
            <span
              key={token}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {token}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function TrackingList() {
  return (
    <ul className="flex flex-col gap-1.5 px-6 pb-6 sm:px-7 sm:pb-7">
      {[
        'Inquiry form submitted',
        'Call link tapped',
        'Traffic source recorded',
      ].map((event) => (
        <li
          key={event}
          className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[13px] text-muted-foreground"
        >
          {event}
          <span className="size-1.5 rounded-full bg-foreground/60" />
        </li>
      ))}
    </ul>
  )
}

function QuestionList() {
  return (
    <ul className="flex flex-col gap-1.5 px-6 pb-6 sm:px-7 sm:pb-7">
      {[
        'Do you serve my area?',
        'How soon can I book?',
        'What should I expect?',
      ].map((question, index) => (
        <li
          key={question}
          className={`w-fit rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-[13px] text-muted-foreground ${index === 1 ? 'ml-4' : index === 2 ? 'ml-8' : ''}`}
        >
          {question}
        </li>
      ))}
    </ul>
  )
}

function OwnershipList() {
  return (
    <ul className="grid grid-cols-2 gap-1.5 px-6 pb-6 sm:px-7 sm:pb-7">
      {['Your domain', 'Your content', 'Your analytics', 'Your code'].map(
        (item) => (
          <li
            key={item}
            className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[13px] text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-foreground/60" />
            {item}
          </li>
        ),
      )}
    </ul>
  )
}

function HeroProof() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Link
        href={WONG_HREF}
        className="group/proof flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-card/70 px-6 py-4 backdrop-blur-md transition-colors hover:border-white/20 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:flex-row sm:gap-5 sm:text-left"
      >
        <span className="text-[2.5rem] font-semibold leading-none tracking-[-0.05em] text-foreground">
          {wongImpressions.value}
        </span>
        <span className="text-[15px] leading-6 text-muted-foreground">
          {wongImpressions.label} for {WONG_CLIENT}
          <ArrowUpRight
            aria-hidden="true"
            className="ml-1 inline size-4 align-[-2px] text-foreground transition-transform duration-200 group-hover/proof:-translate-y-0.5 group-hover/proof:translate-x-0.5"
          />
        </span>
      </Link>
      <p className="font-mono text-[11px] text-subtle">
        Source:{' '}
        {[wongImpressions.sourceName, wongImpressions.dateRange]
          .filter(Boolean)
          .join(' · ')}
      </p>
    </div>
  )
}

export default function WebsiteDesignPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <ServiceHero
          title={
            <>
              website design that makes choosing you{' '}
              {/* Positioned spans paint outside the h1's clipped fill, so the
                  word carries its own gradient. */}
              <span className="text-gradient relative whitespace-nowrap">
                easy.
                <span
                  aria-hidden="true"
                  className="absolute inset-x-[0.04em] bottom-[-0.04em] h-[0.06em] rounded-full bg-spectrum"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-[0.04em] bottom-[-0.06em] h-[0.12em] rounded-full bg-spectrum opacity-60 blur-md"
                />
              </span>
            </>
          }
          titleClassName="max-w-[19ch]"
          description={
            <>
              <span className="text-foreground">Designed and built by Prism</span>
              : a custom look for your brand, fast mobile build, and tracking live on day one.
            </>
          }
          ctaHref={WEBSITE_WAITLIST_CTA.href}
          location="website design hero"
          secondary={{
            label: 'See the work',
            href: '#work',
            trackingLabel: 'see website design proof',
          }}
          visual={<WebsiteDesignHeroVisual />}
          footer={<HeroProof />}
          glow="blue"
        />

        <ServiceBento
          idPrefix="website-design"
          title="designed to win the visit."
          items={WHAT_YOU_GET}
        />

        <WebsiteDesignAnatomy />

        <WebsiteDesignWorkRail />

        <Section aria-labelledby="website-design-visibility-title">
          <Reveal>
            <div className="relative isolate grid gap-12 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div
                aria-hidden="true"
                className="bg-grid absolute inset-0 -z-10 opacity-60"
              />
              <div
                aria-hidden="true"
                className="absolute -right-24 top-1/2 -z-10 size-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.66_0.16_258/22%),transparent)] blur-2xl"
              />
              <div className="flex flex-col gap-5">
                <SectionHeader
                  id="website-design-visibility-title"
                  eyebrow="Visibility"
                  title={
                    <>
                      built to be understood by Google and{' '}
                      <span className="text-spectrum prism-spectrum-pan">
                        AI
                      </span>
                      .
                    </>
                  }
                  titleClassName="max-w-[16ch]"
                />
                <p className="text-lead max-w-[44ch] text-pretty text-foreground">
                  Support discovery on Google and in AI.
                </p>
                <p className="max-w-[46ch] text-pretty text-sm leading-6 text-muted-foreground">
                  Structured services, locations, and schema. Rankings are never guaranteed.
                </p>
                <TrackedLink
                  href="/aeo"
                  label="go further with aeo"
                  location="website design visibility"
                  className="group/aeo inline-flex min-h-10 w-fit items-center gap-1.5 rounded-sm text-sm font-medium text-foreground transition-colors hover:text-foreground/80 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  Go further with Prism AEO
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover/aeo:translate-x-0.5"
                  />
                </TrackedLink>
              </div>
              <ul
                aria-label="Search and answer surfaces"
                className="grid gap-2 sm:grid-cols-2"
              >
                {WEBSITE_SURFACE_ICONS.map((icon) => (
                  <li
                    key={icon.label}
                    className="flex min-h-14 items-center gap-3 rounded-xl border border-white/[0.08] bg-background/60 px-4 py-3 backdrop-blur-sm sm:last:col-span-2"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
                      <TechStackIcon spec={icon} className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-medium leading-tight text-foreground">
                        {icon.label}
                      </span>
                      <span className="block text-[13px] text-subtle">
                        {SURFACE_NOTES[icon.label]}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Section>

        <ServiceSteps
          idPrefix="website-design"
          title="it starts on the waitlist."
          steps={STEPS}
        />

        <Section aria-labelledby="website-design-results-title">
          <Reveal>
            <SectionHeader
              id="website-design-results-title"
              eyebrow="Results"
              title="measured at the source."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-12">
            <Reveal className="flex lg:col-span-4">
              <ProofMetricCard
                value={wongImpressions.value}
                label={wongImpressions.label}
                client={WONG_CLIENT}
                href={WONG_HREF}
                sourceName={wongImpressions.sourceName}
                dateRange={wongImpressions.dateRange}
                beam
                className="w-full"
              />
            </Reveal>
            <Reveal delay={80} className="flex lg:col-span-4">
              <ProofMetricCard
                value={belizeImpressions.value}
                label={belizeImpressions.label}
                client="Belize Kids"
                href="/case-studies/belize-kids-foundation"
                sourceName={belizeImpressions.sourceName}
                dateRange={belizeImpressions.dateRange}
                className="w-full"
              />
            </Reveal>
            <div className="flex flex-col gap-4 lg:col-span-4">
              {CLIENT_QUOTES.map((quote, index) => (
                <Reveal
                  key={quote.id}
                  delay={160 + index * 80}
                  className="flex flex-1"
                >
                  <figure className="flex w-full flex-col justify-between gap-6 rounded-2xl border border-white/[0.08] bg-card p-7">
                    <blockquote className="text-pretty text-lg leading-snug tracking-[-0.015em] text-foreground">
                      &ldquo;{quote.text}&rdquo;
                    </blockquote>
                    <figcaption className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-foreground">
                        {quote.client}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-3 w-px bg-white/15"
                      />
                      <span className="text-subtle">
                        Website Design client
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        <ServiceFaq
          idPrefix="website-design"
          items={FAQ_ITEMS}
          title="before you join."
        />

        <OwnerDecision
          eyebrow="Design in use"
          title="see real customer flows."
          links={[
            { label: "Olympic Bootworks walkthrough", href: "/case-studies/olympic-bootworks#walkthrough" },
            { label: "Canary Cove estate", href: "/case-studies/canary-cove" },
          ]}
        />
        <ServiceSiblings current="website" />

        <FinalCta
          location="website design final cta"
          title="let's design your site."
          href={WEBSITE_WAITLIST_CTA.href}
          headingId="website-design-final-cta-title"
        />
      </main>
      <Footer />
      <ServiceSchema
        serviceId="website-design"
        name="Prism Website Design"
        description="Custom website design and development: brand-led design, page copy, mobile-first layouts, inquiry forms, analytics, and search foundations. Prism is fully booked; scope and price are agreed when we reach out from the waitlist."
        serviceType="Website design"
        areaServed="United States"
        offerDetails={{
          name: 'Prism Website Design',
          description:
            'Custom website design for your brand, with page copy, mobile-first layouts, inquiry forms, analytics, and search foundations, designed and built by Prism. Scoped to your business when we reach out from the waitlist.',
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/LimitedAvailability',
          url: CANONICAL_URL,
        }}
      />
      <FAQSchema questions={[...FAQ_ITEMS]} />
    </div>
  )
}
