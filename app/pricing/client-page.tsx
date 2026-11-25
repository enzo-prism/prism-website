import { OwnerDecision } from '@/components/prism/owner-decision'
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Hammer,
  ListPlus,
  Megaphone,
  MessageSquareQuote,
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
  ADS_PRICE_LABEL,
  AEO_PRICE_LABEL,
  CANONICAL_PRICING_OFFERS,
  CONTENT_PRICE_LABEL,
  PRICING_OFFER_ORDER,
  type PricingOfferId,
} from '@/lib/pricing-model'

// How any Prism engagement starts. (Identifier kept for the
// pricing-consistency required-snippet guard.)
const growthPathSteps = [
  {
    stage: '01',
    title: 'Join the waitlist',
    meta: 'Two minutes',
    icon: ListPlus,
    description:
      'Share your links, goals, and timeline. Every Prism engagement starts here.',
  },
  {
    stage: '02',
    title: 'We review and reach out',
    meta: 'Clear scope and price',
    icon: MessagesSquare,
    description:
      'Each monthly intake, we select the teams we can move farthest and confirm exact scope and price before you commit.',
  },
  {
    stage: '03',
    title: 'We build',
    meta: 'Prism standard',
    icon: Hammer,
    description:
      'We design, build, and refine the work with clear check-ins all the way to launch.',
  },
] as const

// Who each plan is for and what it includes. Copy stays inside what
// lib/pricing-model.ts and the service pages (/website-design, /content, /ads,
// /aeo) already promise.
const PLAN_DETAILS: Record<
  PricingOfferId,
  Pick<PricingPlan, 'badge' | 'audience' | 'includes' | 'featured'>
> = {
  website: {
    badge: 'Custom design',
    featured: true,
    audience: 'For businesses ready for a flagship website that earns trust immediately.',
    includes: [
      'Custom design system, zero templates',
      'Sharp copy built around buyer questions',
      'Fast, mobile-first engineering',
      'Search and AI foundations at launch',
      'Conversion tracking and GA4 setup',
      'Full ownership from launch day',
    ],
  },
  content: {
    badge: 'Ongoing',
    audience:
      'For leaders who want steady, high-caliber publishing without running production.',
    includes: [
      'Strategy, scripts, and video edits',
      'Channel-native social posts',
      'Editorial website content',
      'End-to-end review and publishing',
      'Three-month setup, then monthly production',
    ],
  },
  ads: {
    badge: 'Paid campaigns',
    audience:
      'For teams investing in paid demand built around qualified calls and bookings.',
    includes: [
      'Google, Meta, TikTok, and Yelp campaigns',
      'Dedicated creative: visuals, video, and copy',
      'Focused landing pages built to convert',
      'Call, form, and booking attribution',
      'Weekly tuning and plain-English reports',
    ],
  },
  aeo: {
    badge: 'AI search',
    audience:
      'For brands building clear visibility across ChatGPT, Google AI Overviews, and Perplexity.',
    includes: [
      'Visibility audit across major AI engines',
      'Crawler access and structured data',
      'Answer-first pages and verifiable FAQs',
      'Aligned listings and business facts',
      'Monthly citation checks and reports',
    ],
  },
}

// The four offers (one per service) as plan cards. (Identifier kept for the
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
    label: 'Custom website design and build',
    values: {
      website: true,
      content: false,
      ads: false,
      aeo: 'Fixes to your current site',
    },
  },
  {
    label: 'Video, social, and website content',
    values: {
      website: false,
      content: true,
      ads: 'Ad creative',
      aeo: 'Answer-first pages',
    },
  },
  {
    label: 'Google, Meta, TikTok, and Yelp campaigns',
    values: {
      website: false,
      content: false,
      ads: true,
      aeo: false,
    },
  },
  {
    label: 'Visibility in ChatGPT, AI Overviews, and Perplexity',
    values: {
      website: 'Search and AI foundations',
      content: 'Articles that answer questions',
      ads: false,
      aeo: true,
    },
  },
  {
    label: 'Pages that lead to an inquiry',
    values: {
      website: 'Service pages and inquiry forms',
      content: 'Landing pages and articles',
      ads: 'A clear page after the click',
      aeo: 'Pages assistants can quote',
    },
  },
  {
    label: 'How results are reviewed',
    values: {
      website: 'Analytics set up at launch',
      content: 'Monthly review of what worked',
      ads: 'Weekly, with call and form tracking',
      aeo: 'Monthly answer checks',
    },
  },
  {
    label: 'How it runs',
    values: {
      website: 'One project, optional care after launch',
      content: 'Three-month setup, then month-to-month',
      ads: 'Launch, then weekly tuning',
      aeo: AEO_PRICE_LABEL,
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
    href: '/website-design',
    description:
      'Managed hosting, updates, and ongoing refinements once your site is live. Optional and cancelable anytime.',
  },
  {
    title: 'Content',
    price: CONTENT_PRICE_LABEL,
    icon: Camera,
    href: '/content',
    description:
      'Consistent video, social, and website editorial handled end to end and sharpened every month.',
  },
  {
    title: 'Ads',
    price: ADS_PRICE_LABEL,
    icon: Megaphone,
    href: '/ads',
    description:
      'Weekly optimization across bids, targeting, and creative, reported clearly on real calls and inquiries.',
  },
  {
    title: 'AEO',
    price: AEO_PRICE_LABEL,
    icon: MessageSquareQuote,
    href: '/aeo',
    description:
      'Monthly buyer-question checks across answer engines, with priorities set from what shifted.',
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
      'Prism is fully booked right now, so every engagement begins on the waitlist. When your intake opens, we confirm exact scope, price, and timeline before work starts.',
  },
  {
    question: 'What does Prism website design include?',
    answer:
      'Custom design, copy, mobile-first development, analytics, and search and AI foundations. Exact pages and features are confirmed up front, and the finished site is 100% yours.',
  },
  {
    question: 'What is Website Care?',
    answer:
      'Optional ongoing care covering hosting, updates, and continuous refinements after launch. Added only once your site ships, and cancelable anytime.',
  },
  {
    question: 'How is Content priced?',
    answer:
      'Pricing matches your channels and production cadence. Join the waitlist and we will scope the setup and ongoing work when your intake opens.',
  },
  {
    question: 'How are Ads priced?',
    answer:
      'Management is scoped to your channels and goals once your intake opens. Your media budget stays separate and scales only when live performance supports it.',
  },
  {
    question: 'How is AEO priced?',
    answer:
      'Scoped when your waitlist intake opens based on the buyer questions, engines, and site fixes required. Starts with a full audit, followed by monthly checks.',
  },
  {
    question: 'Do you work with dental practices?',
    answer:
      'Yes. Dental is one of our deepest specialties, served through the same four disciplines: website design, content, ads, and AEO.',
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
              description="Verified search growth from current clients, pulled directly from Google Search Console."
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
            description="At a glance. Exact deliverables and pricing are confirmed when your intake opens."
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
              Join the waitlist. When a spot opens, we align on scope and price,
              then build.
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
              description="Ongoing care to keep your site sharp, content moving, campaigns tuned, and AI visibility measured."
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

      <OwnerDecision
          eyebrow="Example scope"
          title="one useful change, clearly scoped."
          body="Suppose customers reach a product page but rarely contact the shop. A first project might cover the mobile inquiry, delivery checks and a report of received requests. We agree on deliverables, access and cost before work starts. If the priority changes, you choose the trade-off."
          links={[
            { label: "Meet the team behind the work", href: "/about" },
            { label: "Compare hiring options", href: "/blog/who-prism-is-for" },
          ]}
        />
      <FinalCta
        location="pricing final cta"
        secondary={{ label: 'See the work', href: '/case-studies' }}
      />

      <PricingStructuredData />
    </div>
  )
}

function PricingStructuredData() {
  const { website, content, ads, aeo } = CANONICAL_PRICING_OFFERS

  return (
    <>
      <ServiceSchema
        serviceId="pricing-website"
        name={website.name}
        description={website.description}
        serviceType="Website design"
        areaServed="United States"
        offerDetails={{
          name: website.name,
          description: website.description,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/LimitedAvailability',
          url: 'https://www.design-prism.com/website-design',
        }}
      />
      <ServiceSchema
        serviceId="pricing-content"
        name={content.name}
        description={content.description}
        serviceType="Content and social media marketing"
        areaServed="United States"
        offerDetails={{
          name: content.name,
          description: content.description,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/LimitedAvailability',
          url: 'https://www.design-prism.com/content',
        }}
      />
      <ServiceSchema
        serviceId="pricing-ads"
        name={ads.name}
        description={ads.description}
        serviceType="Paid advertising management"
        areaServed="United States"
        offerDetails={{
          name: ads.name,
          description: ads.description,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/LimitedAvailability',
          url: 'https://www.design-prism.com/ads',
        }}
      />
      <ServiceSchema
        serviceId="pricing-aeo"
        name={aeo.name}
        description={aeo.description}
        serviceType="Answer engine optimization"
        areaServed="United States"
        offerDetails={{
          name: aeo.name,
          description: aeo.description,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/LimitedAvailability',
          url: 'https://www.design-prism.com/aeo',
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
