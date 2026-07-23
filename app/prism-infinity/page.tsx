import type { Metadata } from 'next'
import type { ComponentType, ReactNode } from 'react'
import {
  BadgeDollarSign,
  Camera,
  Check,
  CirclePause,
  Clapperboard,
  Contact,
  CreditCard,
  FolderCheck,
  Gem,
  Globe,
  ListPlus,
  Megaphone,
  PackageCheck,
  PenTool,
  Presentation,
  Printer,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from 'lucide-react'

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
} from '@/components/core-route/CoreRoutePrimitives'
import HomeCountUp from '@/components/home/HomeCountUp'
import HomeReveal from '@/components/home/HomeReveal'
import InfinityRotatingWord from '@/components/prism-infinity/InfinityRotatingWord'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import { paymentLink } from '@/lib/payment-links'
import { PRISM_INFINITY_PRICE_LABEL } from '@/lib/pricing-model'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

import styles from './prism-infinity.module.css'

const PAGE_TITLE = 'Prism Infinity'
const PAGE_DESCRIPTION =
  'Unlimited design, websites, video, content, and ads for $2,000 per month. Submit one request at a time and pause anytime.'
const CANONICAL_URL = 'https://www.design-prism.com/prism-infinity'
const SUBSCRIBE_HREF = paymentLink('infinity')
const INTRO_HREF = '/contact?topic=prism-infinity'
const SUBSCRIBE_LABEL = `Subscribe — ${PRISM_INFINITY_PRICE_LABEL}`

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/prism-infinity',
  ogImage: '/prism-opengraph.png',
})

const ROTATING_WORDS = [
  'design',
  'websites',
  'video',
  'content',
  'ads',
] as const

const HERO_FACTS = [
  'Unlimited requests',
  'Delivered one at a time',
  'Pause or cancel anytime',
] as const

type IconComponent = ComponentType<{ className?: string }>

const HOW_IT_WORKS: readonly {
  label: string
  body: string
  icon: IconComponent
}[] = [
  {
    label: 'Subscribe',
    body: 'Start your plan at a single flat monthly rate and get your own Prism request board on day one.',
    icon: CreditCard,
  },
  {
    label: 'Request',
    body: 'Add as many requests as you like — design, web, video, content, ads, and more. Your queue is yours.',
    icon: ListPlus,
  },
  {
    label: 'Receive',
    body: 'We deliver one request at a time, fast. The moment one ships, we start the next in your queue.',
    icon: PackageCheck,
  },
] as const

const INCLUDED: readonly {
  title: string
  body: string
  icon: IconComponent
}[] = [
  {
    title: 'Logo design',
    body: 'Marks, wordmarks, and refreshes built for real brand systems.',
    icon: PenTool,
  },
  {
    title: 'Print design',
    body: 'Brochures, signage, menus, and collateral that match your brand.',
    icon: Printer,
  },
  {
    title: 'Web development',
    body: 'Landing pages, sites, and front-end builds shipped production-ready.',
    icon: Globe,
  },
  {
    title: 'Video editing',
    body: 'Short-form, ads, and long-form cuts edited to your story.',
    icon: Clapperboard,
  },
  {
    title: 'Content creation',
    body: 'Posts, graphics, and creative for every platform you publish on.',
    icon: Sparkles,
  },
  {
    title: 'Ads',
    body: 'Ad creative and variations built to test, scale, and convert.',
    icon: Megaphone,
  },
  {
    title: 'Slide deck design',
    body: 'Pitch, sales, and investor decks designed to land the room.',
    icon: Presentation,
  },
  {
    title: 'In-person pro photoshoots',
    body: 'On-location shoots that give you a library of owned, on-brand imagery.',
    icon: Camera,
  },
  {
    title: 'Business card design',
    body: 'Cards and small-format print that carry the brand into the room.',
    icon: Contact,
  },
] as const

const BENEFITS: readonly {
  title: string
  body: string
  icon: IconComponent
}[] = [
  {
    title: 'Fixed monthly rate',
    body: 'One flat $2,000/month. No scope creep, no surprise invoices, no hourly billing.',
    icon: BadgeDollarSign,
  },
  {
    title: 'Fast delivery',
    body: 'Most requests land in just a few days, delivered one at a time so quality holds.',
    icon: Zap,
  },
  {
    title: 'Top-tier quality',
    body: 'The same Prism craft behind our case-study work, applied to every request.',
    icon: Gem,
  },
  {
    title: 'Flexible & scalable',
    body: 'Scale the queue up or down as your needs shift, without renegotiating a contract.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Pause or cancel anytime',
    body: 'No lock-in. Pause when work slows and keep your unused time, or cancel outright.',
    icon: CirclePause,
  },
  {
    title: 'All yours',
    body: 'Every deliverable is yours to keep, with full ownership of the final files.',
    icon: FolderCheck,
  },
] as const

const PROOF_STATS: readonly {
  value: string
  label: string
  detail: string
  brand?: BrandLogoKey
}[] = [
  {
    value: '$100K',
    label: 'revenue driven for clients',
    detail: 'June 2026',
  },
  {
    value: '24K',
    label: 'YouTube followers',
    detail: '3M+ views',
    brand: 'youtube',
  },
  {
    value: '38K',
    label: 'Instagram followers',
    detail: '10M+ views',
    brand: 'instagram',
  },
  {
    value: '9K',
    label: 'TikTok followers',
    detail: '4M+ views',
    brand: 'tiktok',
  },
] as const

const FAQ_ITEMS = [
  {
    question: 'What counts as a request?',
    answer:
      'A request is one focused deliverable — a logo, a landing page, a video edit, a slide deck, an ad set, a photoshoot. If it is something Prism does, it can be a request.',
  },
  {
    question: 'How fast is turnaround?',
    answer:
      'Most requests are delivered in a few days. Larger requests are broken into clear milestones so you always see momentum while we work through your queue one item at a time.',
  },
  {
    question: 'How many active requests can I have?',
    answer:
      'Add as many requests as you like to your queue. Prism works on one active request at a time and starts the next the moment one is delivered, so the queue keeps moving without ever capping how much you submit.',
  },
  {
    question: 'Can I really pause or cancel anytime?',
    answer:
      'Yes. Pause your plan when work slows and keep your unused days for when you return, or cancel outright. There are no contracts and no penalties.',
  },
  {
    question: 'What is out of scope?',
    answer:
      'Prism Infinity covers design, web, video, content, and ads production. It does not include paid ad spend, third-party software or licensing fees, or large custom software builds — we flag those up front and scope them separately.',
  },
] as const

const QUEUE_BOARD = {
  delivered: 'Logo refresh',
  active: 'Homepage redesign',
  queued: ['Ad creative — 3 variations', 'Pitch deck refresh'],
} as const

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
          <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-[#7d766a]" />
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
  const items = INCLUDED.map(({ title, icon }) => ({ title, icon }))

  return (
    <div
      className={cn('overflow-hidden border-y border-white/10', styles.marquee)}
    >
      <div className={cn('flex items-center gap-0 py-5', styles.marqueeTrack)}>
        {[false, true].map((duplicate) => (
          <ul
            key={duplicate ? 'duplicate' : 'original'}
            aria-hidden={duplicate || undefined}
            className="flex shrink-0 items-center"
          >
            {items.map(({ title, icon: Icon }) => (
              <li
                key={title}
                className="flex items-center gap-3 whitespace-nowrap pr-14"
              >
                <Icon aria-hidden="true" className="h-4 w-4 text-[#d8bc79]" />
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
        {/* 1. Hero */}
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

              <div className="relative z-10 grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-end lg:px-12 lg:py-16">
                <div className="flex flex-col gap-5">
                  <p className="flex items-center gap-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-[#797165]">
                    <InfinityGlyph className="h-5 w-10" />
                    Prism Infinity
                  </p>
                  <h1 className="max-w-[13ch] text-balance font-sans text-[clamp(2.05rem,4.8vw,3.65rem)] font-medium leading-[1] tracking-[-0.05em] text-[#f5f0e8]">
                    Unlimited{' '}
                    <InfinityRotatingWord
                      words={ROTATING_WORDS}
                      animationClassName={styles.rotatingWord}
                      suffix="."
                    />
                    <br />
                    One subscription.
                  </h1>
                  <p className="max-w-[40rem] text-pretty font-sans text-[1.02rem] leading-7 text-[#b8afa2] sm:text-[1.12rem] sm:leading-8 lg:max-w-[34rem]">
                    $2,000/month for unlimited design, web, video, content,
                    ads, and more — delivered one request at a time.
                  </p>
                </div>

                <div className="space-y-5 border-t border-white/12 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                  <div>
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#8f877b]">
                      One subscription
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
                    variant="heroPrimary"
                    label="subscribe prism infinity"
                    location="prism-infinity hero"
                  >
                    {SUBSCRIBE_LABEL}
                  </CoreActionLink>
                  <CoreActionLink
                    href={INTRO_HREF}
                    variant="primary"
                    label="book intro prism infinity"
                    location="prism-infinity hero"
                  >
                    Book a 15-min intro
                  </CoreActionLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Service marquee */}
        <ServiceMarquee />

        {/* 3. How it works + live queue */}
        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <HomeReveal>
              <CoreSectionHeading
                eyebrow="How it works"
                title="Subscribe, request, receive."
                description="Unlimited requests, delivered one by one. You keep the queue full; Prism keeps it moving."
              />
            </HomeReveal>
            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start">
              <ol className="grid gap-4">
                {HOW_IT_WORKS.map((step, index) => (
                  <HomeReveal key={step.label} delay={index * 90}>
                    <li
                      className={cn(
                        'flex gap-5 rounded-[1.4rem] border border-white/10 bg-[#070707] p-5 sm:p-6',
                        styles.liftCard,
                      )}
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                        <step.icon
                          aria-hidden="true"
                          className={cn(
                            'h-5 w-5 text-[#b8afa2]',
                            styles.cardIcon,
                          )}
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
                    </li>
                  </HomeReveal>
                ))}
              </ol>
              <HomeReveal delay={180}>
                <QueueBoard />
              </HomeReveal>
            </div>
          </div>
        </section>

        {/* 4. What's included */}
        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <HomeReveal>
              <CoreSectionHeading
                eyebrow="What's included"
                title="One plan. Every deliverable."
                description="Your subscription covers the full range of work Prism makes — request whatever the moment calls for."
              />
            </HomeReveal>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {INCLUDED.map((item, index) => (
                <HomeReveal key={item.title} delay={(index % 3) * 80}>
                  <li
                    className={cn(
                      'h-full rounded-[1.4rem] border border-white/10 bg-[#070707] p-5',
                      styles.liftCard,
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={cn('h-5 w-5 text-[#8f877b]', styles.cardIcon)}
                    />
                    <h3 className="mt-4 text-lg font-medium tracking-[-0.03em] text-[#f5f0e8]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#b8afa2]">
                      {item.body}
                    </p>
                  </li>
                </HomeReveal>
              ))}
            </ul>
            <HomeReveal delay={120}>
              <div
                className={cn(
                  'mt-4 flex flex-col gap-3 rounded-[1.4rem] border border-[#d8bc79]/25 bg-[#d8bc79]/[0.05] p-5 sm:flex-row sm:items-center sm:gap-5',
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
                    Anything we add to Prism later
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#b8afa2]">
                    As Prism grows, your subscription grows with it. New
                    services join the plan at no extra cost.
                  </p>
                </div>
              </div>
            </HomeReveal>
          </div>
        </section>

        {/* 5. Membership benefits */}
        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div className={coreRouteContainedSectionClassName}>
              <HomeReveal>
                <CoreSectionHeading
                  eyebrow="Membership benefits"
                  title="Built like a product, not a retainer."
                  description="A productized subscription means predictable cost, fast turnaround, and zero lock-in."
                />
              </HomeReveal>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {BENEFITS.map((benefit, index) => (
                  <HomeReveal key={benefit.title} delay={(index % 3) * 80}>
                    <article
                      className={cn(
                        'h-full rounded-[1.4rem] border border-white/10 bg-[#070707] p-5',
                        styles.liftCard,
                      )}
                    >
                      <benefit.icon
                        aria-hidden="true"
                        className={cn(
                          'h-5 w-5 text-[#8f877b]',
                          styles.cardIcon,
                        )}
                      />
                      <h3 className="mt-4 text-lg font-medium tracking-[-0.03em] text-[#f5f0e8]">
                        {benefit.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[#b8afa2]">
                        {benefit.body}
                      </p>
                    </article>
                  </HomeReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Risk reversal */}
        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div
              className={cn(
                coreRouteContainedSectionClassName,
                'grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center',
              )}
            >
              <HomeReveal>
                <div className="space-y-5">
                  <SectionKicker>No lock-in</SectionKicker>
                  <p className="font-sans text-[clamp(1.7rem,3.2vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.045em] text-[#f5f0e8]">
                    Pause or cancel anytime.
                  </p>
                  <p className="max-w-[34rem] text-pretty text-[1.02rem] leading-8 text-[#b8afa2]">
                    Work in bursts? Pause your plan between projects and keep
                    your unused days for when you return. No contracts, no
                    penalties, no awkward conversations.
                  </p>
                </div>
              </HomeReveal>
              <HomeReveal delay={120} className="lg:justify-self-end">
                <CoreActionLink
                  href={INTRO_HREF}
                  variant="primary"
                  label="book intro prism infinity"
                  location="prism-infinity risk reversal"
                >
                  Ask us how it works
                </CoreActionLink>
              </HomeReveal>
            </div>
          </div>
        </section>

        {/* 7. Proof band */}
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

        {/* 8. Pricing recap */}
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
                  <SectionKicker>One simple price</SectionKicker>
                </div>
                <p
                  className={cn(
                    'mt-6 font-sans text-[clamp(3rem,8vw,4.5rem)] font-medium leading-none tracking-[-0.05em]',
                    styles.priceShimmer,
                  )}
                >
                  {PRISM_INFINITY_PRICE_LABEL}
                </p>
                <p className="mt-5 max-w-md text-pretty text-[1.02rem] leading-8 text-[#b8afa2]">
                  Unlimited requests across design, web, video, content, and
                  ads. Pause or cancel anytime.
                </p>
                <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                  <CoreActionLink
                    href={SUBSCRIBE_HREF}
                    variant="heroPrimary"
                    label="subscribe prism infinity"
                    location="prism-infinity pricing recap"
                  >
                    {SUBSCRIBE_LABEL}
                  </CoreActionLink>
                  <CoreActionLink
                    href={INTRO_HREF}
                    variant="primary"
                    label="book intro prism infinity"
                    location="prism-infinity pricing recap"
                  >
                    Book a 15-min intro
                  </CoreActionLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
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

        {/* 10. Final CTA */}
        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <HomeReveal>
                <CoreSectionHeading
                  title="Start Prism Infinity."
                  description="One subscription for everything Prism does. Subscribe today and send your first request within minutes."
                />
              </HomeReveal>
              <HomeReveal delay={120}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <CoreActionLink
                    href={SUBSCRIBE_HREF}
                    variant="heroPrimary"
                    label="subscribe prism infinity"
                    location="prism-infinity final cta"
                  >
                    Start Prism Infinity
                  </CoreActionLink>
                  <CoreActionLink
                    href={INTRO_HREF}
                    variant="primary"
                    label="book call prism infinity"
                    location="prism-infinity final cta"
                  >
                    Book a call
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
        description="Unlimited design, web, video, content, and ads on one monthly subscription. Unlimited requests, delivered one at a time. Pause or cancel anytime."
        serviceType="Productized creative subscription"
        areaServed="United States"
        offerDetails={{
          name: 'Prism Infinity',
          description:
            'Unlimited Prism across design, web, video, content, and ads for a flat $2,000/month. Unlimited requests, delivered one at a time. Pause or cancel anytime.',
          businessFunction: 'http://purl.org/goodrelations/v1#Sell',
          price: '2000',
          priceCurrency: 'USD',
          billingPeriod: 'P1M',
          availability: 'https://schema.org/InStock',
          url: CANONICAL_URL,
        }}
      />
      <FAQSchema questions={[...FAQ_ITEMS]} />
    </div>
  )
}
