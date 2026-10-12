import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Hammer,
  Infinity as InfinityIcon,
  ListPlus,
  MessagesSquare,
  Wrench,
} from 'lucide-react'

import BrowserFrame from '@/components/prism/browser-frame'
import FinalCta from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { FaqList } from '@/components/prism/faq-list'
import { Section, SectionHeader } from '@/components/prism/section'
import HomeCountUp from '@/components/home/HomeCountUp'
import { OfferIconTile } from '@/components/pricing/offer-kit'
import PricingComparison, {
  type ComparisonRow,
} from '@/components/pricing/PricingComparison'
import PricingHero from '@/components/pricing/PricingHero'
import PricingPlans, { type PricingPlan } from '@/components/pricing/PricingPlans'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import TrackedLink from '@/components/tracked-link'
import { Badge } from '@/components/ui/badge'
import { getCaseStudyMetric } from '@/lib/case-study-data'
import {
  CANONICAL_PRICING_OFFERS,
  CONTENT_OS_PRICE_LABEL,
  PRICING_OFFER_ORDER,
  PRISM_INFINITY_PRICE_LABEL,
  type PricingOfferId,
} from '@/lib/pricing-model'

// How any Prism engagement starts. (Identifier kept for the
// pricing-consistency required-snippet guard.)
const growthPathSteps = [
  {
    stage: '01',
    title: 'Join the waitlist',
    meta: 'About two minutes',
    icon: ListPlus,
    description:
      'Share your links, goals, and when you want to start. Prism is fully booked, so this is how every engagement begins right now.',
  },
  {
    stage: '02',
    title: 'We review and reach out',
    meta: 'Clear scope and price',
    icon: MessagesSquare,
    description:
      'For each monthly intake we review applications, reach out to the teams we can take on, and confirm what is included, what it costs, and how the work will run before you commit.',
  },
  {
    stage: '03',
    title: 'We build',
    meta: 'Prism standard',
    icon: Hammer,
    description:
      'We build the agreed work, review it with you, and prepare it for launch. You always know what is ready and what needs your input.',
  },
] as const

// Who each plan is for and what it includes. Copy stays inside what
// lib/pricing-model.ts and the offer pages already promise.
const PLAN_DETAILS: Record<
  PricingOfferId,
  Pick<PricingPlan, 'badge' | 'audience' | 'includes' | 'featured'>
> = {
  website: {
    badge: 'Custom build',
    audience: 'For businesses whose website should make choosing them easy.',
    includes: [
      'Custom design and development',
      'Clear service pages and inquiry forms',
      'Mobile-friendly design',
      'Foundations for Google and AI search',
      'Analytics set up at launch',
      'The finished site is yours',
    ],
  },
  content_os: {
    badge: 'Ongoing',
    audience:
      'For owners who want to show up every week without running content themselves.',
    includes: [
      'Scripts and video edits',
      'Social posts for your agreed channels',
      'Website content',
      'Planning, review, and publishing',
      'Three-month setup, then ongoing production',
    ],
  },
  dental_os: {
    badge: 'Dental practices',
    audience:
      'For dental practices that want more patients to find, trust, and contact them.',
    includes: [
      'Practice website',
      'SEO and AI search',
      'Google Maps and local listings',
      'Review requests and response support',
      'Google and Meta ads with call and inquiry tracking',
    ],
  },
  prism_infinity: {
    badge: 'Unlimited requests',
    featured: true,
    audience: 'For teams with a steady stream of creative work to ship.',
    includes: [
      'Landing pages and websites',
      'Ad creative and video edits',
      'Photoshoots and content',
      'Unlimited requests, one active at a time',
      'Pause or cancel anytime',
    ],
  },
}

// The four productized offers as plan cards. (Identifier kept for the
// pricing-consistency required-snippet guard.)
const pricingSnapshot: PricingPlan[] = PRICING_OFFER_ORDER.map((offerId) => {
  const offer = CANONICAL_PRICING_OFFERS[offerId]
  return {
    offerId,
    name: offer.name,
    priceLabel: offer.priceLabel,
    priceSubLabel: offer.priceSubLabel,
    cta: offer.primaryCta,
    explore: offer.secondaryCta,
    ...PLAN_DETAILS[offerId],
  }
})

const comparisonRows: ComparisonRow[] = [
  {
    label: 'Custom website with search foundations',
    values: {
      website: true,
      content_os: false,
      dental_os: true,
      prism_infinity: 'New sites and updates',
    },
  },
  {
    label: 'Video, social, and website content',
    values: {
      website: false,
      content_os: true,
      dental_os: false,
      prism_infinity: true,
    },
  },
  {
    label: 'Google Maps and local listings',
    values: {
      website: false,
      content_os: false,
      dental_os: true,
      prism_infinity: false,
    },
  },
  {
    label: 'Review requests and responses',
    values: {
      website: false,
      content_os: false,
      dental_os: true,
      prism_infinity: false,
    },
  },
  {
    label: 'Ads',
    values: {
      website: false,
      content_os: false,
      dental_os: 'Google and Meta campaigns',
      prism_infinity: 'Ad creative',
    },
  },
  {
    label: 'How it runs',
    values: {
      website: 'One project, optional care after launch',
      content_os: 'Three-month setup, then month-to-month',
      dental_os: 'Ongoing, scoped to each practice',
      prism_infinity: 'Monthly, pause or cancel anytime',
    },
  },
]

// The ongoing, recurring systems, all scoped together once we reach out.
// (Identifier kept for the pricing-consistency required-snippet guard.)
const partnerLevels = [
  {
    title: 'Website Care',
    price: 'Optional, after launch',
    icon: Wrench,
    href: '/websites',
    description:
      'Hosting, updates, and ongoing edits for your Prism website once it is live. Optional, and only after delivery.',
  },
  {
    title: 'Content OS',
    price: CONTENT_OS_PRICE_LABEL,
    icon: Camera,
    href: '/content',
    description:
      'A plan for consistent content across your website and selected social channels. We handle production, publishing, and ongoing improvements.',
  },
  {
    title: 'Prism Infinity',
    price: PRISM_INFINITY_PRICE_LABEL,
    icon: InfinityIcon,
    href: '/prism-infinity',
    description:
      'Ongoing landing pages, ad creative, websites, video, and photoshoots, delivered one request at a time. Pause or cancel anytime.',
  },
] as const

// Real, source-attributed results from lib/case-study-data.ts (Google Search
// Console). Keep in sync with the source; do not invent metrics.
const PROOF_POINTS = [
  {
    client: 'Dr. Christopher Wong',
    host: 'chriswongdds.com',
    slug: 'dr-christopher-wong',
    metric: getCaseStudyMetric('dr-christopher-wong'),
  },
  {
    client: 'Belize Kids',
    host: 'belizekids.org',
    slug: 'belize-kids-foundation',
    metric: getCaseStudyMetric('belize-kids-foundation'),
  },
] as const

const faqs = [
  {
    question: 'How does Prism pricing work?',
    answer:
      'Prism is fully booked right now, so every engagement starts on the waitlist. For each monthly intake we review applications, reach out, and confirm the scope, price, and next steps before work begins.',
  },
  {
    question: 'What does the PRO website include?',
    answer:
      'Custom design, engineering, analytics, and foundations for Google and AI search. We agree on the pages, features, and integrations with you before building. The finished site is yours.',
  },
  {
    question: 'What is Website Care?',
    answer:
      'Optional ongoing care: hosting, updates, and ongoing edits after your site is live. It is scoped with your build, added only once the site is delivered, and you can cancel anytime.',
  },
  {
    question: 'How does Content OS pricing work?',
    answer:
      'Pricing reflects the content, channels, and production your business needs. Join the waitlist and we will scope the setup and ongoing work together when we reach out.',
  },
  {
    question: 'What is Prism Infinity?',
    answer:
      'A monthly subscription for landing pages, ad creative, websites, video, and photoshoots, delivered one request at a time. Pause or cancel anytime. Join the waitlist and we will scope your plan when your intake opens.',
  },
  {
    question: 'How is Dental OS priced?',
    answer:
      'Dental OS brings together your practice website, search visibility, Google Maps, reviews, and ads. We scope the work around your practice goals once we reach out from the waitlist.',
  },
] as const

export default function PricingPageClient() {
  return (
    <div className="bg-background text-foreground">
      <PricingHero />

      {/* Plans */}
      <Section
        id="offers"
        aria-labelledby="pricing-offers-heading"
        className="scroll-mt-20 pt-4 sm:pt-6"
      >
        <SectionHeader
          id="pricing-offers-heading"
          eyebrow="The plans"
          title="four ways to work with Prism."
          titleClassName="max-w-none"
        />
        <div className="mt-10">
          <PricingPlans plans={pricingSnapshot} />
        </div>
      </Section>

      {/* Proof */}
      <Section aria-labelledby="pricing-proof-heading" className="pt-0 sm:pt-0">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
          <Reveal>
            <SectionHeader
              id="pricing-proof-heading"
              eyebrow="Proof"
              title="the work behind the plans."
              description="Measured search growth from two current clients, straight from Google Search Console."
              titleClassName="max-w-[15ch]"
            />
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {PROOF_POINTS.map((proof, index) => (
              <li key={proof.slug} className="min-w-0">
                <Reveal delay={index * 90} className="h-full">
                  <TrackedLink
                    href={`/case-studies/${proof.slug}`}
                    label={`${proof.client} case study`}
                    location="pricing proof"
                    className="group/proof flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/[0.16] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    <div className="mask-fade-b relative h-40 overflow-hidden px-5 pt-5 sm:h-44">
                      <BrowserFrame
                        src={`/case-studies/${proof.slug}-home-desktop.jpg`}
                        alt={`${proof.client} website home page built by Prism`}
                        url={proof.host}
                        sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 90vw"
                        className="transition-transform duration-500 group-hover/proof:-translate-y-1"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 pt-4">
                      <p className="text-eyebrow text-subtle">{proof.client}</p>
                      <p className="text-title mt-3 text-foreground">
                        <HomeCountUp value={proof.metric.value} />
                      </p>
                      <p className="mt-2 text-pretty text-sm leading-6 text-muted-foreground">
                        {proof.metric.label}
                      </p>
                      <p className="mt-auto pt-5 font-mono text-[11px] leading-5 text-subtle">
                        {proof.metric.sourceName} · {proof.metric.dateRange}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                        Read the case study
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 transition-transform duration-200 group-hover/proof:-translate-y-0.5 group-hover/proof:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </TrackedLink>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Comparison */}
      <Section aria-labelledby="pricing-compare-heading" className="pt-0 sm:pt-0">
        <Reveal>
          <SectionHeader
            id="pricing-compare-heading"
            eyebrow="Compare"
            title="what each plan includes."
            description="The short version. Your exact scope is agreed with you when your intake opens."
            align="center"
          />
        </Reveal>
        <Reveal className="mt-12">
          <PricingComparison
            columns={pricingSnapshot.map((plan) => ({
              offerId: plan.offerId,
              name: plan.name,
              featured: plan.featured,
            }))}
            rows={comparisonRows}
          />
        </Reveal>
        <p className="mt-4 text-center text-[13px] text-subtle sm:hidden">
          Swipe the table to see every plan.
        </p>
      </Section>

      {/* How an engagement starts */}
      <Section aria-labelledby="pricing-growth-path-heading" className="pt-0 sm:pt-0">
        <div
          id="growth-path"
          className="spectrum-rule relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-6 py-12 sm:px-10 sm:py-16 lg:px-14"
        >
          <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 opacity-[0.18] mask-fade-b" />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              id="pricing-growth-path-heading"
              eyebrow="How an engagement starts"
              title="map it, scope it, then build it."
              titleClassName="max-w-[16ch]"
            />
            <p className="max-w-[38ch] text-pretty text-[15px] leading-7 text-muted-foreground lg:pb-2">
              Join the waitlist. When we reach out, agree on the scope and price,
              then give us the go-ahead to build.
            </p>
          </div>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] lg:grid-cols-3">
            {growthPathSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <li key={step.stage} className="min-w-0 bg-card">
                  <Reveal delay={index * 90} className="flex h-full flex-col p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-3">
                      <OfferIconTile>
                        <Icon aria-hidden="true" className="size-[18px]" />
                      </OfferIconTile>
                      <span className="font-mono text-xs text-subtle">{step.stage}</span>
                    </div>
                    <h3 className="text-heading mt-8 text-foreground">
                      {step.title.toLowerCase()}
                    </h3>
                    <Badge variant="outline" className="mt-4">
                      {step.meta}
                    </Badge>
                    <p className="mt-5 text-pretty text-[15px] leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </Section>

      {/* Support after launch */}
      <Section aria-labelledby="pricing-support-heading" className="pt-0 sm:pt-0">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal>
            <SectionHeader
              id="pricing-support-heading"
              eyebrow="Ongoing systems"
              title="support after launch."
              description="Keep your website maintained, your content consistent, or your next project moving."
              titleClassName="max-w-[12ch]"
            />
          </Reveal>
          <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {partnerLevels.map((level, index) => {
              const Icon = level.icon
              return (
                <li key={level.title}>
                  <Reveal delay={index * 80}>
                    <TrackedLink
                      href={level.href}
                      label={level.title.toLowerCase()}
                      location="pricing support after launch"
                      className="group/level grid gap-4 py-7 transition-colors focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-start sm:gap-6"
                    >
                      <OfferIconTile>
                        <Icon aria-hidden="true" className="size-[18px]" />
                      </OfferIconTile>
                      <span className="flex min-w-0 flex-col gap-2">
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          <span className="text-[1.15rem] font-semibold tracking-[-0.02em] text-foreground">
                            {level.title}
                          </span>
                          <Badge variant="outline">{level.price}</Badge>
                        </span>
                        <span className="max-w-[56ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                          {level.description}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="hidden size-5 text-subtle transition-[transform,color] duration-200 group-hover/level:translate-x-0.5 group-hover/level:text-foreground sm:mt-2.5 sm:block"
                      />
                    </TrackedLink>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </Section>

      {/* FAQ */}
      <Section aria-labelledby="pricing-faq-heading" className="pt-0 sm:pt-0">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              id="pricing-faq-heading"
              eyebrow="FAQ"
              title="pricing questions."
              description="What is included, how ongoing care works, and how we scope your plan."
              titleClassName="max-w-[15ch]"
            />
            <TrackedLink
              href="/faq"
              label="faq"
              location="pricing faq"
              className="group/faq mt-8 inline-flex min-h-10 items-center gap-1.5 rounded-sm text-sm font-medium text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              More answers on the FAQ page
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover/faq:translate-x-0.5"
              />
            </TrackedLink>
          </div>
          <FaqList items={faqs} name="pricing-faq" defaultOpen={0} />
        </div>
      </Section>

      <FinalCta
        location="pricing final cta"
        secondary={{ label: 'See the work', href: '/case-studies' }}
      />

      <PricingStructuredData />
    </div>
  )
}

function PricingStructuredData() {
  const website = CANONICAL_PRICING_OFFERS.website
  const contentOs = CANONICAL_PRICING_OFFERS.content_os
  const infinity = CANONICAL_PRICING_OFFERS.prism_infinity

  return (
    <>
      <ServiceSchema
        serviceId="pricing-website"
        name={website.name}
        description={website.description}
        serviceType="Website design and development"
        areaServed="United States"
        offerDetails={{
          name: website.name,
          description: website.description,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/InStock',
          url: 'https://www.design-prism.com/websites',
        }}
      />
      <ServiceSchema
        serviceId="pricing-content-os"
        name={contentOs.name}
        description={contentOs.description}
        serviceType="Content and advertising automation"
        areaServed="United States"
        offerDetails={{
          name: contentOs.name,
          description: contentOs.description,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/InStock',
          url: 'https://www.design-prism.com/content',
        }}
      />
      <ServiceSchema
        serviceId="pricing-prism-infinity"
        name={infinity.name}
        description={infinity.description}
        serviceType="Creative and growth subscription"
        areaServed="United States"
        offerDetails={{
          name: infinity.name,
          description: infinity.description,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/InStock',
          url: 'https://www.design-prism.com/prism-infinity',
        }}
      />
      <FAQSchema
        questions={faqs.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />
    </>
  )
}
