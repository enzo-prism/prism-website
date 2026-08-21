import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Check } from 'lucide-react'

import BrandLogo, { type BrandLogoKey } from '@/components/brand-logo'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainedSectionClassName,
  coreRouteContainerClassName,
  coreRouteHeroFrameClassName,
  coreRouteSectionClassName,
  coreRouteSectionCompactClassName,
  coreRouteSplitLayoutClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import HomeCountUp from '@/components/home/HomeCountUp'
import HomeReveal from '@/components/home/HomeReveal'
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
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  QUEUE_BOARD,
  ROTATING_WORDS,
} from '@/components/prism-infinity/infinity-content'
import PixelishIcon from '@/components/pixelish/PixelishIcon'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import {
  BOOK_A_CALL_CTA,
  PRISM_INFINITY_PRICE_LABEL,
} from '@/lib/pricing-model'
import { CONNECTED_CLIENT_TRAFFIC, SOCIAL_PROOF } from '@/lib/proof-metrics'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

import styles from './prism-infinity.module.css'

const SUBSCRIBE_HREF = BOOK_A_CALL_CTA.href
const SUBSCRIBE_LABEL = BOOK_A_CALL_CTA.label

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/prism-infinity',
  ogImage: '/prism-opengraph.png',
})

const PROOF_STATS: readonly {
  value: string
  label: string
  detail: string
  brand?: BrandLogoKey
}[] = [
  {
    value: CONNECTED_CLIENT_TRAFFIC.newUsers.toLocaleString('en-US'),
    label: 'new users across connected client sites',
    detail: `${CONNECTED_CLIENT_TRAFFIC.month} · ${CONNECTED_CLIENT_TRAFFIC.connectedSites} sites`,
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

function SectionKicker({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.26em] text-[#8f877b]">
      {children}
    </p>
  )
}

/**
 * Animated lemniscate: a faint full loop with a gold comet orbiting it.
 * Pure SVG + CSS — no JS, disabled under reduced motion.
 */
function InfinityGlyph({ className }: { className?: string }) {
  const d =
    'M100 50C85 24 48 24 48 50C48 76 85 76 100 50C115 24 152 24 152 50C152 76 115 76 100 50Z'

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 100"
      className={className}
      focusable="false"
    >
      <path className={styles.glyphTrail} d={d} pathLength={1} />
      <path className={styles.glyphGlow} d={d} pathLength={1} />
      <path className={styles.glyphComet} d={d} pathLength={1} />
    </svg>
  )
}

function QueueBoard() {
  return (
    <div className="rounded-[1.4rem] border border-white/12 bg-[#070707] p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <p className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.24em] text-[#8f877b]">
          Your request board
        </p>
        <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#d8bc79]">
          <span
            aria-hidden="true"
            className={cn(
              'h-1.5 w-1.5 rounded-full bg-[#d8bc79]',
              styles.pulseDot,
            )}
          />
          Live
        </p>
      </div>

      <ul className="mt-4 space-y-3">
        <li className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
          <Check
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-[#7d766a]"
          />
          <span className="flex-1 truncate text-sm text-[#8f877b] line-through decoration-white/20">
            {QUEUE_BOARD.delivered}
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#7d766a]">
            Delivered
          </span>
        </li>

        <li className="rounded-xl border border-[#d8bc79]/30 bg-[#d8bc79]/[0.06] px-4 py-3">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className={cn(
                'h-2 w-2 shrink-0 rounded-full bg-[#d8bc79]',
                styles.pulseDot,
              )}
            />
            <span className="flex-1 truncate text-sm font-medium text-[#f5f0e8]">
              {QUEUE_BOARD.active}
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#d8bc79]">
              In progress
            </span>
          </div>
          <div
            aria-hidden="true"
            className={cn('mt-3 h-1 rounded-full', styles.queueBar)}
          >
            <span className={styles.queueBarFill} />
          </div>
        </li>

        {QUEUE_BOARD.queued.map((title, index) => (
          <li
            key={title}
            className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3"
          >
            <span className="font-mono text-[0.62rem] text-[#7d766a]">
              {String(index + 2).padStart(2, '0')}
            </span>
            <span className="flex-1 truncate text-sm text-[#b8afa2]">
              {title}
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#7d766a]">
              Queued
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 border-t border-white/10 pt-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#7d766a]">
        Unlimited queue · one active request
      </p>
    </div>
  )
}

function ServiceMarquee() {
  return (
    <div
      aria-label="Growth deliverables included in Prism Infinity. Focus to pause the animation."
      className={cn('overflow-hidden border-y border-white/10', styles.marquee)}
      role="region"
      tabIndex={0}
    >
      <div className={cn('flex items-center gap-0 py-5', styles.marqueeTrack)}>
        {[false, true].map((duplicate) => (
          <ul
            key={duplicate ? 'duplicate' : 'original'}
            aria-hidden={duplicate || undefined}
            className="flex shrink-0 items-center"
          >
            {MARQUEE_ITEMS.map((title) => (
              <li
                key={title}
                className="flex items-center gap-3 whitespace-nowrap pr-14"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[#d8bc79]"
                />
                <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[#b8afa2]">
                  {title}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default function PrismInfinityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black font-sans text-[#f5f0e8]">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div className={coreRouteHeroFrameClassName}>
              <div
                aria-hidden="true"
                className={cn(
                  'absolute inset-[-12%] bg-[radial-gradient(circle_at_16%_18%,rgba(216,188,121,0.09),transparent_36%),radial-gradient(circle_at_86%_82%,rgba(245,240,232,0.05),transparent_40%),linear-gradient(135deg,rgba(0,0,0,0.1),rgba(0,0,0,0.5))]',
                  styles.aurora,
                )}
              />

              <div className="relative z-10 grid gap-8 px-6 py-8 sm:gap-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-end lg:px-12 lg:py-16">
                <div className="flex flex-col gap-5">
                  <p className="flex items-center gap-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-[#797165]">
                    <InfinityGlyph className="h-5 w-10" />
                    Prism Infinity
                  </p>
                  <h1 className="max-w-[16ch] text-balance font-sans text-[clamp(2.05rem,4.8vw,3.65rem)] font-medium leading-[1] tracking-[-0.05em] text-[#f5f0e8]">
                    Unlimited
                    <br />
                    <InfinityRotatingWord
                      words={ROTATING_WORDS}
                      animationClassName={styles.rotatingWord}
                      suffix="."
                    />
                    <br />
                    One subscription.
                  </h1>
                  <p className="max-w-[40rem] text-pretty font-sans text-[1.02rem] leading-7 text-[#b8afa2] sm:text-[1.12rem] sm:leading-8 lg:max-w-[34rem]">
                    One monthly plan for the deliverables that grow a business.
                    Fill a queue with landing pages, ads, websites, video, and
                    photoshoots. We ship one at a time.
                  </p>
                </div>

                <div className="space-y-5 border-t border-white/12 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                  <div>
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#8f877b]">
                      Monthly plan
                    </p>
                    <p
                      className={cn(
                        'mt-3 font-sans text-[clamp(2.2rem,5vw,3rem)] font-medium leading-none tracking-[-0.04em]',
                        styles.priceShimmer,
                      )}
                    >
                      {PRISM_INFINITY_PRICE_LABEL}
                    </p>
                  </div>
                  <ul className="space-y-3 border-t border-white/10 pt-5">
                    {HERO_FACTS.map((fact) => (
                      <li
                        key={fact}
                        className="flex items-start gap-3 text-sm leading-6 text-[#b8afa2]"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-1 h-3.5 w-3.5 shrink-0 text-[#d8bc79]"
                        />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative z-10 border-t border-white/12 px-6 py-6 sm:px-10 lg:px-12">
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                  <CoreActionLink
                    href={SUBSCRIBE_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="heroPrimary"
                    label="book a free demo"
                    location="prism-infinity hero"
                  >
                    {SUBSCRIBE_LABEL}
                  </CoreActionLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServiceMarquee />

        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <HomeReveal>
              <CoreSectionHeading
                eyebrow="How it works"
                title="Name the need. We keep shipping."
                description="Unlimited requests, delivered one by one. You keep the queue full of work that grows the business. Prism keeps it moving."
                titleClassName="max-w-[16ch] xl:max-w-[18ch]"
              />
            </HomeReveal>
            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start">
              <ol className="grid gap-4">
                {HOW_IT_WORKS.map((step, index) => (
                  <li key={step.label}>
                    <HomeReveal
                      delay={index * 90}
                      className={cn(
                        'flex gap-5 rounded-[1.4rem] border border-white/10 bg-[#070707] p-5 sm:p-6',
                        styles.liftCard,
                      )}
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                        <PixelishIcon
                          src={step.iconSrc}
                          alt=""
                          size={20}
                          aria-hidden="true"
                          className={cn('h-5 w-5 opacity-80', styles.cardIcon)}
                        />
                      </div>
                      <div>
                        <p className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[#8f877b]">
                          {String(index + 1).padStart(2, '0')}
                        </p>
                        <h2 className="mt-2 text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                          {step.label}
                        </h2>
                        <p className="mt-2 text-sm leading-7 text-[#b8afa2]">
                          {step.body}
                        </p>
                      </div>
                    </HomeReveal>
                  </li>
                ))}
              </ol>
              <HomeReveal delay={180}>
                <QueueBoard />
              </HomeReveal>
            </div>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div
            className={cn(
              coreRouteContainerClassName,
              coreRouteSplitLayoutClassName,
            )}
          >
            <HomeReveal>
              <CoreSectionHeading
                eyebrow="What you'll request"
                title="The work owners actually need."
                description="Prism Infinity is an infinite queue of growth deliverables, not a catalog of agency extras. Request whatever the moment calls for."
                titleClassName="max-w-[14ch] xl:max-w-[16ch]"
              />
            </HomeReveal>
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {DELIVERABLES.map((item, index) => (
                <li key={item.title}>
                  <HomeReveal
                    delay={index * 60}
                    className="flex gap-4 py-5 sm:gap-5 sm:py-6"
                  >
                    <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-black/40">
                      <PixelishIcon
                        src={item.iconSrc}
                        alt=""
                        size={18}
                        aria-hidden="true"
                        className="h-4 w-4 opacity-80"
                      />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#7d766a]">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-2 text-lg font-medium tracking-[-0.03em] text-[#f5f0e8] sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-pretty text-sm leading-6 text-[#b8afa2]">
                        {item.body}
                      </p>
                    </div>
                  </HomeReveal>
                </li>
              ))}
            </ol>
          </div>
          <div className={cn(coreRouteContainerClassName, 'mt-6')}>
            <HomeReveal delay={120}>
              <div
                className={cn(
                  'flex flex-col gap-3 rounded-[1.4rem] border border-[#d8bc79]/25 bg-[#d8bc79]/[0.05] p-5 sm:flex-row sm:items-center sm:gap-5',
                  styles.liftCard,
                )}
              >
                <span
                  aria-hidden="true"
                  className="font-sans text-2xl font-medium leading-none text-[#d8bc79]"
                >
                  +
                </span>
                <div>
                  <p className="text-base font-medium tracking-[-0.03em] text-[#f5f0e8]">
                    {ALSO_INCLUDED.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#b8afa2]">
                    {ALSO_INCLUDED.body}
                  </p>
                </div>
              </div>
            </HomeReveal>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div
              className={cn(
                coreRouteContainedSectionClassName,
                'grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start',
              )}
            >
              <HomeReveal>
                <div className="space-y-5">
                  <SectionKicker>Why owners stay</SectionKicker>
                  <p className="font-sans text-[clamp(1.7rem,3.2vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.045em] text-[#f5f0e8]">
                    Stop hiring a new vendor for every project.
                  </p>
                  <p className="max-w-[34rem] text-pretty text-[1.02rem] leading-8 text-[#b8afa2]">
                    One team, one queue, one monthly rate. Pause when work
                    slows. No contracts, no penalties, no awkward conversations.
                  </p>
                  <CoreActionLink
                    href={SUBSCRIBE_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    label="book a free demo"
                    location="prism-infinity owner reasons"
                  >
                    Ask us how it works
                  </CoreActionLink>
                </div>
              </HomeReveal>
              <ul className="grid gap-px overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/10 sm:grid-cols-2">
                {OWNER_REASONS.map((reason, index) => (
                  <li key={reason.title} className="bg-black p-5 sm:p-6">
                    <HomeReveal delay={(index % 2) * 80}>
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#7d766a]">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-3 text-lg font-medium tracking-[-0.03em] text-[#f5f0e8]">
                        {reason.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[#b8afa2]">
                        {reason.body}
                      </p>
                    </HomeReveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div className={coreRouteContainedSectionClassName}>
              <HomeReveal>
                <CoreSectionHeading
                  eyebrow="Proof"
                  title="The same team behind real results."
                  description="Prism Infinity is the same craft and output engine that drives growth and reach for the brands we work with."
                />
              </HomeReveal>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                {PROOF_STATS.map((stat) => (
                  <div key={stat.label} className="bg-black p-6">
                    <dt className="font-sans text-[clamp(1.9rem,4vw,2.6rem)] font-medium leading-none tracking-[-0.04em] text-[#d8bc79]">
                      <HomeCountUp value={stat.value} />
                    </dt>
                    <dd className="mt-3 flex items-center gap-2 text-sm leading-6 text-[#b8afa2]">
                      {stat.brand ? (
                        <BrandLogo
                          brand={stat.brand}
                          theme="dark"
                          decorative
                          className="h-3.5 w-3.5 shrink-0"
                        />
                      ) : null}
                      {stat.label}
                    </dd>
                    <dd className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[#7d766a]">
                      {stat.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div
              className={cn(
                coreRouteHeroFrameClassName,
                'px-6 py-12 text-center sm:px-10 sm:py-16',
              )}
            >
              <div
                aria-hidden="true"
                className={cn(
                  'absolute inset-[-12%] bg-[radial-gradient(circle_at_50%_0%,rgba(216,188,121,0.07),transparent_46%)]',
                  styles.aurora,
                )}
              />
              <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
                <InfinityGlyph className="h-14 w-28" />
                <div className="mt-6">
                  <SectionKicker>Monthly plan</SectionKicker>
                </div>
                <p
                  className={cn(
                    'mt-6 font-sans text-[clamp(2.2rem,6vw,3.6rem)] font-medium leading-none tracking-[-0.05em]',
                    styles.priceShimmer,
                  )}
                >
                  {PRISM_INFINITY_PRICE_LABEL}
                </p>
                <p className="mt-5 max-w-md text-pretty text-[1.02rem] leading-8 text-[#b8afa2]">
                  Unlimited landing pages, ad creative, websites, video, and
                  photoshoots. Pause or cancel anytime. Book a 30-minute Zoom
                  call and we&apos;ll scope your subscription together.
                </p>
                <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                  <CoreActionLink
                    href={SUBSCRIBE_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="heroPrimary"
                    label="book a free demo"
                    location="prism-infinity pricing recap"
                  >
                    {SUBSCRIBE_LABEL}
                  </CoreActionLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={coreRouteSectionCompactClassName}>
          <div className={coreRouteContainerClassName}>
            <HomeReveal>
              <CoreSectionHeading
                eyebrow="FAQ"
                title="Good things to know first."
              />
            </HomeReveal>
            <div className="mt-10 space-y-3">
              {FAQ_ITEMS.map((item, index) => (
                <HomeReveal key={item.question} delay={index * 60}>
                  <details
                    className={cn(
                      'group rounded-[1.4rem] border border-white/10 bg-[#070707] px-5 py-5 sm:px-6',
                      styles.liftCard,
                    )}
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-lg font-medium tracking-[-0.03em] text-[#f5f0e8] sm:text-xl">
                      {item.question}
                      <span
                        aria-hidden="true"
                        className="text-[#d8bc79] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45 motion-reduce:transition-none"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-[#b8afa2]">
                      {item.answer}
                    </p>
                  </details>
                </HomeReveal>
              ))}
            </div>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <HomeReveal>
                <CoreSectionHeading
                  title="Keep the queue full."
                  description="One subscription for the deliverables that grow the business. Book a 30-minute Zoom call and we'll scope it together."
                  titleClassName="max-w-[14ch] xl:max-w-[16ch]"
                />
              </HomeReveal>
              <HomeReveal delay={120}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <CoreActionLink
                    href={SUBSCRIBE_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="heroPrimary"
                    label="book a free demo"
                    location="prism-infinity final cta"
                  >
                    {SUBSCRIBE_LABEL}
                  </CoreActionLink>
                </div>
              </HomeReveal>
            </div>
          </div>
        </section>
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
            'Unlimited growth deliverables across landing pages, ad creative, websites, video, photoshoots, and content on one monthly subscription. Unlimited requests, delivered one at a time. Pause or cancel anytime. Scoped on a 30-minute call.',
          businessFunction: 'http://purl.org/goodrelations/v1#Sell',
          availability: 'https://schema.org/InStock',
          url: CANONICAL_URL,
        }}
      />
      <FAQSchema questions={[...FAQ_ITEMS]} />
    </div>
  )
}
