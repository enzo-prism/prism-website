import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowUpRight,
  BarChart3,
  FileText,
  Gauge,
  KeyRound,
  Palette,
  PenLine,
  Rocket,
  Search,
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
import { WebsitesHeroVisual } from '@/components/services/WebsitesHeroVisual'
import { WebsitesWorkRail } from '@/components/services/WebsitesWorkRail'
import { getClientQuotes } from '@/components/services/community-comments'
import {
  TechStackIcon,
  WEBSITE_SURFACE_ICONS,
} from '@/components/tech-stack-icons'
import { getCaseStudyMetric } from '@/lib/case-study-data'
import { WEBSITE_WAITLIST_CTA } from '@/lib/pricing-model'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'PRO websites'
const PAGE_DESCRIPTION =
  'Custom websites with clear service pages, mobile-friendly design, working inquiry forms, and analytics to help you understand what brings customers in.'
const CANONICAL_URL = 'https://www.design-prism.com/websites'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/websites',
  ogImage: '/prism-opengraph.png',
})

// Real, source-attributed results from lib/case-study-data.ts (Google Search
// Console). These are the only published client result metrics; do not
// invent others.
const wongImpressions = getCaseStudyMetric('dr-christopher-wong')
const belizeImpressions = getCaseStudyMetric('belize-kids-foundation')

const WONG_CLIENT = 'Dr. Christopher Wong'
const WONG_HREF = '/case-studies/dr-christopher-wong'

// Named website clients, verbatim from content/wall-of-love-data.tsx.
const CLIENT_QUOTES = getClientQuotes([3, 1])

const WHAT_YOU_GET: readonly ServiceBentoItem[] = [
  {
    icon: Palette,
    title: 'design that feels like your business',
    body: 'We define your typography, color, spacing, and motion, then carry them through every page, so your site looks like one business instead of a template.',
    className: 'md:col-span-4',
    visual: <DesignSpecimen />,
  },
  {
    icon: Gauge,
    title: 'fast, accessible, easy to use',
    body: 'Built for speed and everyday use on any device, with a clear page structure people and search engines can follow.',
    points: [
      'Page speed and mobile usability checks',
      'Accessible, semantic page structure',
      'Technical SEO foundations built in',
    ],
  },
  {
    icon: BarChart3,
    title: 'know what brings people in',
    body: 'GA4 and conversion tracking are part of the build, so you can see how people find you and where they reach out.',
    visual: <TrackingList />,
  },
  {
    icon: PenLine,
    title: 'pages that answer real questions',
    body: 'We write and organize your pages around what customers ask before they call, then share a preview for your feedback.',
    visual: <QuestionList />,
  },
  {
    icon: KeyRound,
    title: 'yours, completely',
    body: 'The site and everything in it belongs to you from launch day. No lock-in. Keep Prism running it, or take it in-house.',
    visual: <OwnershipList />,
  },
]

const STEPS: readonly ServiceStep[] = [
  {
    icon: FileText,
    title: 'join the waitlist',
    detail: 'First',
    body: 'Share your links and goals. We review applications for each monthly intake, then reach out to scope your build with a clear plan and a clear price.',
  },
  {
    icon: Palette,
    title: 'design and build',
    detail: 'Build',
    body: 'We write and design the pages, build the site, and share a preview so you can react to the copy, images, and experience.',
  },
  {
    icon: Rocket,
    title: 'launch and measure',
    detail: 'Launch',
    body: 'We set up analytics and search information, check every page, form, and contact link, then launch and plan what to improve next.',
  },
]

const FAQ_ITEMS = [
  {
    question: 'What makes a Prism PRO website different?',
    answer:
      'We bring the copy, design, build, forms, and analytics together. Customers can understand your services and contact you easily, while you can see which pages and traffic sources lead to inquiries.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'Prism is fully booked right now, so every website starts on the waitlist. When we reach out, we scope the pages, features, and support you need and agree on the scope and price before work begins.',
  },
  {
    question: 'How do you support visibility in AI assistants?',
    answer:
      'We make your services, locations, team, and business details clear in both the page copy and its search information. Search engines and AI assistants can use that information, but rankings and recommendations remain outside our control.',
  },
  {
    question: 'Do I own the website?',
    answer:
      'Completely. From the moment it ships, the website and everything within it belongs to you. There is no lock-in of any kind.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'That decision is yours. Prism can continue to run the site, covering updates, analytics, search, and AI visibility, or hand it off entirely. Either way, it remains yours.',
  },
] as const

// Where a PRO website has to be understood: classic search AND AI answers.
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

export default function WebsitesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <ServiceHero
          title={
            <>
              a website that makes choosing you{' '}
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
          titleClassName="max-w-[17ch]"
          description={
            <>
              <span className="text-foreground">The PRO website</span>: custom
              design, fast pages, and a clear path from first visit to inquiry,
              with analytics and search foundations built in from day one.
            </>
          }
          ctaHref={WEBSITE_WAITLIST_CTA.href}
          location="websites hero"
          secondary={{
            label: 'See the work',
            href: '#work',
            trackingLabel: 'see website proof',
          }}
          visual={<WebsitesHeroVisual />}
          footer={<HeroProof />}
          glow="blue"
        />

        <ServiceBento
          idPrefix="websites"
          title="everything a site needs to win the visit."
          description="Design, engineering, copy, and analytics in one build, so the site looks right, works everywhere, and shows you what is working."
          items={WHAT_YOU_GET}
        />

        <Section aria-labelledby="websites-visibility-title">
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
                  id="websites-visibility-title"
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
                <p className="text-lead max-w-[48ch] text-pretty text-foreground">
                  Support discovery on Google and in AI.
                </p>
                <p className="max-w-[52ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                  We organize service pages, location details, and business
                  information so search engines and AI assistants can understand
                  what you do. Useful answers and accurate details support
                  discovery; rankings and recommendations are never guaranteed.
                </p>
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

        <WebsitesWorkRail />

        <ServiceSteps
          idPrefix="websites"
          title="it starts on the waitlist."
          description="Prism is fully booked. When your intake opens, you leave the scoping conversation with a clear plan and a clear price."
          steps={STEPS}
        />

        <Section aria-labelledby="websites-results-title">
          <Reveal>
            <SectionHeader
              id="websites-results-title"
              eyebrow="Results"
              title="measured at the source."
              description="Two published client results, straight from Google Search Console, plus what clients told us in their own words."
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
                      <span className="text-subtle">Website client</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        <ServiceFaq
          idPrefix="websites"
          items={FAQ_ITEMS}
          title="before you join."
        />

        <ServiceSiblings current="website" />

        <FinalCta
          location="websites final cta"
          title="your site, next."
          href={WEBSITE_WAITLIST_CTA.href}
          headingId="websites-final-cta-title"
        />
      </main>
      <Footer />
      <ServiceSchema
        serviceId="pro-website"
        name="Prism PRO website"
        description="Custom website design and development with service pages, inquiry forms, analytics, and search foundations. Prism is fully booked; scope and price are agreed when we reach out from the waitlist."
        serviceType="Website design and development"
        areaServed="United States"
        offerDetails={{
          name: 'Prism PRO website',
          description:
            'A custom website with clear copy, mobile-friendly pages, inquiry forms, analytics, and search foundations. Scoped to your business when we reach out from the waitlist.',
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/InStock',
          url: CANONICAL_URL,
        }}
      />
      <FAQSchema questions={[...FAQ_ITEMS]} />
    </div>
  )
}
