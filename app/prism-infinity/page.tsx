import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import {
  ArrowDown,
  Check,
  Infinity as InfinityIcon,
  ListPlus,
  PackageCheck,
  Plus,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react'

import BrandLogo, { type BrandLogoKey } from '@/components/brand-logo'
import Footer from '@/components/footer'
import HomeCountUp from '@/components/home/HomeCountUp'
import Navbar from '@/components/navbar'
import { OfferIconTile } from '@/components/pricing/offer-kit'
import { FaqList } from '@/components/prism/faq-list'
import FinalCta from '@/components/prism/final-cta'
import { Marquee } from '@/components/prism/marquee'
import { Reveal } from '@/components/prism/reveal'
import { Eyebrow, Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import { WaitlistStatus } from '@/components/prism/waitlist-status'
import InfinityQueue, {
  REQUEST_TYPE_META,
} from '@/components/prism-infinity/InfinityQueue'
import InfinityRotatingWord from '@/components/prism-infinity/InfinityRotatingWord'
import {
  ALSO_INCLUDED,
  CANONICAL_URL,
  DELIVERABLES,
  FAQ_ITEMS,
  HERO_FACTS,
  HOW_IT_WORKS,
  MARQUEE_ITEMS,
  OWNER_REASONS,
  ROTATING_WORDS,
  type InfinityRequestType,
} from '@/components/prism-infinity/infinity-content'
import styles from '@/components/prism-infinity/infinity.module.css'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import {
  CONNECTED_CLIENT_TRAFFIC,
  PROOF_METRICS_VERIFIED_AT,
  SOCIAL_PROOF,
} from '@/lib/proof-metrics'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { WAITLIST_CTA } from '@/lib/waitlist'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Prism Infinity',
  description:
    'Unlimited landing pages, ad creative, websites, video, and photoshoots on one monthly subscription. Request what the business needs, one at a time. Pause anytime.',
  path: '/prism-infinity',
  ogImage: '/prism-opengraph.png',
})

const STEP_ICONS: Record<(typeof HOW_IT_WORKS)[number]['icon'], LucideIcon> = {
  queue: ListPlus,
  ship: PackageCheck,
  next: RefreshCw,
}

const PROOF_STATS: readonly {
  value: string
  label: string
  detail: string
  brand?: BrandLogoKey
}[] = [
  {
    value: CONNECTED_CLIENT_TRAFFIC.newUsers.toLocaleString('en-US'),
    label: 'new users across connected client sites',
    detail: `${CONNECTED_CLIENT_TRAFFIC.source} · ${CONNECTED_CLIENT_TRAFFIC.month} · ${CONNECTED_CLIENT_TRAFFIC.connectedSites} sites`,
  },
  {
    value: SOCIAL_PROOF.youtube.audience,
    label: `YouTube ${SOCIAL_PROOF.youtube.audienceLabel}`,
    detail: `${SOCIAL_PROOF.youtube.activity} ${SOCIAL_PROOF.youtube.activityLabel}`,
    brand: 'youtube',
  },
  {
    value: SOCIAL_PROOF.instagram.audience,
    label: `Instagram ${SOCIAL_PROOF.instagram.audienceLabel}`,
    detail: `${SOCIAL_PROOF.instagram.activity} ${SOCIAL_PROOF.instagram.activityLabel}`,
    brand: 'instagram',
  },
  {
    value: SOCIAL_PROOF.tiktok.audience,
    label: `TikTok ${SOCIAL_PROOF.tiktok.audienceLabel}`,
    detail: `${SOCIAL_PROOF.tiktok.activity} ${SOCIAL_PROOF.tiktok.activityLabel}`,
    brand: 'tiktok',
  },
] as const

const MARQUEE_TYPES: Record<(typeof MARQUEE_ITEMS)[number], InfinityRequestType> = {
  'Landing pages': 'landing',
  'Ad creative': 'ad',
  Websites: 'website',
  Photoshoots: 'photo',
  'Video ads': 'video',
  'SEO pages': 'content',
  'Booking flows': 'landing',
  'Brand systems': 'brand',
}

/** Card titles are lowercase and sentence style; proper nouns keep capitals. */
const toCardTitle = (value: string) =>
  value.charAt(0).toLowerCase() + value.slice(1)

const rise = (delay: number) =>
  ({ '--rise-delay': `${delay}ms` }) as CSSProperties

export default function PrismInfinityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section
          aria-labelledby="infinity-hero-heading"
          className="relative isolate overflow-hidden pb-20 pt-8 sm:pb-28 sm:pt-12"
        >
          <div aria-hidden="true" className="bg-grid absolute inset-x-0 top-0 -z-10 h-[52rem] opacity-60" />
          <div
            aria-hidden="true"
            className="absolute right-[-10rem] top-[-6rem] -z-10 h-[40rem] w-[min(56rem,140vw)] bg-[radial-gradient(closest-side,oklch(0.63_0.19_295/20%),transparent),radial-gradient(45%_45%_at_30%_70%,oklch(0.66_0.16_258/16%),transparent)] blur-2xl"
          />
          <div aria-hidden="true" className="bg-noise mask-fade-b absolute inset-0 -z-10 opacity-[0.05]" />

          <div className="prism-container grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <div className="flex min-w-0 flex-col items-start">
              <div className="prism-rise" style={rise(0)}>
                <WaitlistStatus />
              </div>
              <h1
                id="infinity-hero-heading"
                className="text-gradient prism-rise mt-6 pb-2 text-[clamp(2.4rem,1.2rem+3.9vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.055em]"
                style={rise(80)}
              >
                unlimited{' '}
                <br />
                <InfinityRotatingWord
                  words={ROTATING_WORDS}
                  animationClassName={styles.rotatingWord}
                  wordClassName="text-spectrum prism-spectrum-pan"
                  suffix="."
                />{' '}
                <br />
                one subscription.
              </h1>
              <p
                className="text-lead prism-rise mt-5 max-w-[46ch] text-pretty text-muted-foreground"
                style={rise(160)}
              >
                <span className="text-foreground">Prism Infinity</span> is one
                monthly plan for your ongoing creative work. Fill a queue with
                landing pages, ads, websites, video, and photoshoots. We ship one
                at a time, and the next one starts.
              </p>

              <div
                className="prism-rise mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
                style={rise(240)}
              >
                <WaitlistButton
                  location="prism-infinity hero"
                  size="xl"
                  className="w-full sm:w-auto"
                />
                <Button asChild variant="outline" size="xl" className="group/see w-full sm:w-auto">
                  <TrackedLink
                    href="#deliverables"
                    label="see what you can request"
                    location="prism-infinity hero"
                  >
                    See what you can request
                    <ArrowDown
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover/see:translate-y-0.5"
                    />
                  </TrackedLink>
                </Button>
              </div>

              <ul
                className="prism-rise mt-9 grid w-full gap-x-6 gap-y-2.5 border-t border-white/[0.08] pt-6 text-sm text-muted-foreground sm:grid-cols-2"
                style={rise(320)}
              >
                {HERO_FACTS.map((fact) => (
                  <li key={fact} className="flex items-center gap-2.5">
                    <Check aria-hidden="true" className="size-4 shrink-0 text-foreground/80" />
                    {fact}
                  </li>
                ))}
                <li className="flex items-center gap-2.5">
                  <InfinityIcon aria-hidden="true" className="size-4 shrink-0 text-foreground/80" />
                  One flat monthly rate
                </li>
              </ul>
            </div>

            <div className="prism-rise min-w-0" style={rise(200)}>
              <InfinityQueue className="mx-auto w-full max-w-[34rem]" />
            </div>
          </div>
        </section>

        {/* Everything fits in the queue */}
        <section
          className="border-y border-white/[0.06] bg-card/40 py-7 sm:py-9"
        >
          <Marquee duration={46} gap="2.5rem" label="Deliverables included in Prism Infinity">
            {MARQUEE_ITEMS.map((item) => {
              const Icon = REQUEST_TYPE_META[MARQUEE_TYPES[item]].icon
              return (
                <span
                  key={item}
                  className="flex shrink-0 items-center gap-3 whitespace-nowrap text-[clamp(1.35rem,1.1rem+1vw,2rem)] font-semibold tracking-[-0.035em] text-foreground/80"
                >
                  <Icon aria-hidden="true" className="size-[0.8em] text-subtle" />
                  {item}
                  <InfinityIcon aria-hidden="true" className="ml-7 size-[0.7em] text-white/15" />
                </span>
              )
            })}
          </Marquee>
        </section>

        {/* How it works */}
        <Section aria-labelledby="infinity-how-heading">
          <Reveal>
            <SectionHeader
              id="infinity-how-heading"
              eyebrow="How it works"
              title="name the need. we keep shipping."
              description="Unlimited requests, delivered one by one. You keep the queue full of work that grows the business. Prism keeps it moving."
              titleClassName="max-w-[16ch]"
            />
          </Reveal>
          <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            <span
              aria-hidden="true"
              className="absolute left-5 right-5 top-5 hidden h-px bg-gradient-to-r from-white/5 via-white/20 to-white/5 md:block"
            />
            {HOW_IT_WORKS.map((step, index) => {
              const Icon = STEP_ICONS[step.icon]
              return (
                <li key={step.label} className="relative min-w-0">
                  <Reveal delay={index * 100}>
                    <OfferIconTile className="relative bg-card">
                      <Icon aria-hidden="true" className="size-[18px]" />
                    </OfferIconTile>
                    <p className="mt-6 font-mono text-xs text-subtle">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="text-heading mt-2 text-foreground">
                      {step.label.toLowerCase()}
                    </h3>
                    <p className="mt-3 max-w-[38ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                      {step.body}
                    </p>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </Section>

        {/* Deliverables */}
        <Section
          id="deliverables"
          aria-labelledby="infinity-deliverables-heading"
          className="scroll-mt-20 pt-0 sm:pt-0"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeader
                id="infinity-deliverables-heading"
                eyebrow="What you'll request"
                title="the work owners actually need."
                titleClassName="max-w-[14ch]"
              />
            </Reveal>
            <p className="max-w-[44ch] text-pretty text-[15px] leading-7 text-muted-foreground lg:pb-2">
              Add the pages, creative, and content your business needs to one
              queue. We agree on each brief and work through your priorities one
              at a time.
            </p>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DELIVERABLES.map((item, index) => {
              const Icon = REQUEST_TYPE_META[item.icon].icon
              return (
                <li key={item.title} className="min-w-0">
                  <Reveal delay={(index % 3) * 80} className="h-full">
                    <SpotlightCard className="flex h-full flex-col p-6 sm:p-7">
                      <div className="flex items-center justify-between">
                        <OfferIconTile>
                          <Icon aria-hidden="true" className="size-[18px]" />
                        </OfferIconTile>
                        <span className="font-mono text-xs text-subtle">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="mt-10 text-[1.2rem] font-semibold leading-snug tracking-[-0.025em] text-foreground">
                        {toCardTitle(item.title)}
                      </h3>
                      <p className="mt-2.5 text-pretty text-[15px] leading-7 text-muted-foreground">
                        {item.body}
                      </p>
                    </SpotlightCard>
                  </Reveal>
                </li>
              )
            })}
          </ul>

          <Reveal className="mt-4">
            <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.015] p-6 sm:flex-row sm:items-center sm:gap-5 sm:p-7">
              <OfferIconTile>
                <Plus aria-hidden="true" className="size-[18px]" />
              </OfferIconTile>
              <div>
                <p className="text-base font-semibold tracking-[-0.02em] text-foreground">
                  {toCardTitle(ALSO_INCLUDED.title)}
                </p>
                <p className="mt-1.5 text-pretty text-[15px] leading-7 text-muted-foreground">
                  {ALSO_INCLUDED.body}
                </p>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* Why owners stay */}
        <Section aria-labelledby="infinity-owners-heading" className="pt-0 sm:pt-0">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card">
            <div aria-hidden="true" className="bg-dots mask-fade-b absolute inset-0 -z-10 opacity-[0.16]" />
            <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="flex flex-col items-start gap-6 p-6 py-12 sm:p-10 sm:py-14 lg:p-14">
                <Eyebrow>Why owners stay</Eyebrow>
                <h2
                  id="infinity-owners-heading"
                  className="text-title text-gradient max-w-[16ch] text-balance pb-1"
                >
                  stop hiring a new vendor for every project.
                </h2>
                <p className="text-lead max-w-[40ch] text-pretty text-muted-foreground">
                  One team, one queue, one monthly rate. Keep your brand and
                  feedback in one place as you move from project to project.
                </p>
                <WaitlistButton
                  location="prism-infinity owner reasons"
                  variant="outline"
                  className="mt-2"
                />
              </div>
              <ul className="grid gap-px border-t border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:border-l lg:border-t-0">
                {OWNER_REASONS.map((reason, index) => (
                  <li key={reason.title} className="min-w-0 bg-card">
                    <Reveal delay={(index % 2) * 80} className="flex h-full flex-col p-6 sm:p-8">
                      <span className="font-mono text-xs text-subtle">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-6 text-[1.15rem] font-semibold leading-snug tracking-[-0.025em] text-foreground">
                        {toCardTitle(reason.title)}
                      </h3>
                      <p className="mt-2.5 text-pretty text-[15px] leading-7 text-muted-foreground">
                        {reason.body}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Proof */}
        <Section aria-labelledby="infinity-proof-heading" className="pt-0 sm:pt-0">
          <Reveal>
            <SectionHeader
              id="infinity-proof-heading"
              eyebrow="Proof"
              title="the same team behind real results."
              description="Results from client websites and the audiences on Prism's own channels. Examples of our wider work, not a forecast for your subscription."
              titleClassName="max-w-[17ch]"
            />
          </Reveal>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] lg:grid-cols-4">
            {PROOF_STATS.map((stat) => (
              <div key={stat.label} className="flex min-w-0 flex-col bg-card p-6 sm:p-7">
                <dt className="order-2 mt-3 flex items-center gap-2 text-sm leading-6 text-muted-foreground">
                  {stat.brand ? (
                    <BrandLogo
                      brand={stat.brand}
                      theme="dark"
                      decorative
                      className="h-3.5 w-3.5 shrink-0"
                    />
                  ) : null}
                  {stat.label}
                </dt>
                <dd className="order-1 text-[clamp(2.2rem,1.7rem+1.6vw,3rem)] font-semibold leading-none tracking-[-0.045em] text-foreground">
                  <HomeCountUp value={stat.value} />
                </dd>
                <dd className="order-3 mt-1 font-mono text-[11px] leading-5 text-subtle">
                  {stat.detail}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 font-mono text-[11px] leading-5 text-subtle">
            Verified {PROOF_METRICS_VERIFIED_AT}. Client traffic is the sum of GA4
            new users across sites, not deduplicated people. Channel numbers are
            Prism&apos;s own audiences.
          </p>
        </Section>

        {/* FAQ */}
        <Section aria-labelledby="infinity-faq-heading" className="pt-0 sm:pt-0">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader
                id="infinity-faq-heading"
                eyebrow="FAQ"
                title="good things to know first."
                titleClassName="max-w-[13ch]"
              />
            </div>
            <FaqList items={FAQ_ITEMS} name="infinity-faq" defaultOpen={0} />
          </div>
        </Section>

        <FinalCta
          location="prism-infinity final cta"
          title="keep the queue full."
          href={WAITLIST_CTA.href}
          headingId="infinity-final-cta-heading"
        />
      </main>
      <Footer />

      <ServiceSchema
        serviceId="prism-infinity"
        name="Prism Infinity"
        description="Unlimited landing pages, ad creative, websites, video, and photoshoots on one monthly subscription. Unlimited requests, delivered one at a time. Pause or cancel anytime."
        serviceType="Productized creative subscription"
        areaServed="United States"
        offerDetails={{
          name: 'Prism Infinity',
          description:
            'Unlimited growth deliverables across landing pages, ad creative, websites, video, photoshoots, and content on one monthly subscription. Unlimited requests, delivered one at a time. Pause or cancel anytime. Prism is fully booked; scope is agreed when we reach out from the waitlist.',
          businessFunction: 'http://purl.org/goodrelations/v1#Sell',
          availability: 'https://schema.org/InStock',
          url: CANONICAL_URL,
        }}
      />
      <FAQSchema questions={[...FAQ_ITEMS]} />
    </div>
  )
}
