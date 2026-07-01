import type { Metadata } from 'next'
import type { ReactNode } from 'react'

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
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import { paymentLink } from '@/lib/payment-links'
import { PRISM_INFINITY_PRICE_LABEL } from '@/lib/pricing-model'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

const PAGE_TITLE = 'Prism Infinity — unlimited design, web & marketing'
const PAGE_DESCRIPTION =
  'Prism Infinity is $2,000/month for unlimited design, web, video, content, and ads, delivered one request at a time. Pause or cancel anytime.'
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

const HERO_FACTS = [
  'Unlimited requests',
  'Delivered one at a time',
  'Pause or cancel anytime',
] as const

const HOW_IT_WORKS = [
  {
    label: 'Subscribe',
    body: 'Start your plan at a single flat monthly rate and get your own Prism request board on day one.',
  },
  {
    label: 'Request',
    body: 'Add as many requests as you like — design, web, video, content, ads, and more. Your queue is yours.',
  },
  {
    label: 'Receive',
    body: 'We deliver one request at a time, fast. The moment one ships, we start the next in your queue.',
  },
] as const

const INCLUDED = [
  {
    title: 'Logo design',
    body: 'Marks, wordmarks, and refreshes built for real brand systems.',
  },
  {
    title: 'Print design',
    body: 'Brochures, signage, menus, and collateral that match your brand.',
  },
  {
    title: 'Web development',
    body: 'Landing pages, sites, and front-end builds shipped production-ready.',
  },
  {
    title: 'Video editing',
    body: 'Short-form, ads, and long-form cuts edited to your story.',
  },
  {
    title: 'Content creation',
    body: 'Posts, graphics, and creative for every platform you publish on.',
  },
  {
    title: 'Ads',
    body: 'Ad creative and variations built to test, scale, and convert.',
  },
  {
    title: 'Slide deck design',
    body: 'Pitch, sales, and investor decks designed to land the room.',
  },
  {
    title: 'In-person pro photoshoots',
    body: 'On-location shoots that give you a library of owned, on-brand imagery.',
  },
  {
    title: 'Business card design',
    body: 'Cards and small-format print that carry the brand into the room.',
  },
] as const

const BENEFITS = [
  {
    title: 'Fixed monthly rate',
    body: 'One flat $2,000/month. No scope creep, no surprise invoices, no hourly billing.',
  },
  {
    title: 'Fast delivery',
    body: 'Most requests land in just a few days, delivered one at a time so quality holds.',
  },
  {
    title: 'Top-tier quality',
    body: 'The same Prism craft behind our case-study work, applied to every request.',
  },
  {
    title: 'Flexible & scalable',
    body: 'Scale the queue up or down as your needs shift, without renegotiating a contract.',
  },
  {
    title: 'Pause or cancel anytime',
    body: 'No lock-in. Pause when work slows and keep your unused time, or cancel outright.',
  },
  {
    title: 'All yours',
    body: 'Every deliverable is yours to keep, with full ownership of the final files.',
  },
] as const

const PROOF_STATS: readonly {
  value: string
  label: string
  detail: string
  brand?: BrandLogoKey
}[] = [
  {
    value: '$100,000',
    label: 'revenue driven for clients',
    detail: 'June 2026',
  },
  {
    value: '24,000',
    label: 'YouTube followers',
    detail: '3M+ views',
    brand: 'youtube',
  },
  {
    value: '38,000',
    label: 'Instagram followers',
    detail: '10M+ views',
    brand: 'instagram',
  },
  {
    value: '9,000',
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

function SectionKicker({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.26em] text-[#8f877b]">
      {children}
    </p>
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
                className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.06),transparent_32%),linear-gradient(135deg,rgba(0,0,0,0.14),rgba(0,0,0,0.5))]"
              />

              <div className="relative z-10 grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-end lg:px-12 lg:py-16">
                <CoreSectionHeading
                  eyebrow="Prism Infinity"
                  title="Everything Prism does. One subscription."
                  description="$2,000/month for unlimited design, web, video, content, ads, and more — delivered one request at a time."
                  as="h1"
                  variant="hero"
                  titleClassName="max-w-[14ch]"
                  descriptionClassName="lg:max-w-[34rem]"
                />

                <div className="space-y-5 border-t border-white/12 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                  <div>
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#8f877b]">
                      One subscription
                    </p>
                    <p className="mt-3 font-sans text-[clamp(2.2rem,5vw,3rem)] font-medium leading-none tracking-[-0.04em] text-[#f5f0e8]">
                      {PRISM_INFINITY_PRICE_LABEL}
                    </p>
                  </div>
                  <ul className="space-y-3 border-t border-white/10 pt-5">
                    {HERO_FACTS.map((fact) => (
                      <li
                        key={fact}
                        className="flex items-start gap-3 text-sm leading-6 text-[#b8afa2]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8f877b]"
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

        {/* 2. How it works */}
        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              eyebrow="How it works"
              title="Subscribe, request, receive."
              description="Unlimited requests, delivered one by one. You keep the queue full; Prism keeps it moving."
            />
            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              {HOW_IT_WORKS.map((step, index) => (
                <li
                  key={step.label}
                  className="border border-white/10 bg-[#070707] p-5"
                >
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#8f877b]">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-5 text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {step.label}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#b8afa2]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 3. What's included */}
        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              eyebrow="What's included"
              title="One plan. Every deliverable."
              description="Your subscription covers the full range of work Prism makes — request whatever the moment calls for."
            />
            <ul className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {INCLUDED.map((item) => (
                <li key={item.title} className="bg-black p-5">
                  <h3 className="text-lg font-medium tracking-[-0.03em] text-[#f5f0e8]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#b8afa2]">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3 border border-white/12 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:gap-5">
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
                  As Prism grows, your subscription grows with it. New services
                  join the plan at no extra cost.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Membership benefits */}
        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div className={coreRouteContainedSectionClassName}>
              <CoreSectionHeading
                eyebrow="Membership benefits"
                title="Built like a product, not a retainer."
                description="A productized subscription means predictable cost, fast turnaround, and zero lock-in."
              />
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {BENEFITS.map((benefit) => (
                  <article
                    key={benefit.title}
                    className="border border-white/10 bg-[#070707] p-5"
                  >
                    <h3 className="text-lg font-medium tracking-[-0.03em] text-[#f5f0e8]">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#b8afa2]">
                      {benefit.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Risk reversal */}
        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div
              className={cn(
                coreRouteContainedSectionClassName,
                'grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center',
              )}
            >
              <div className="space-y-5">
                <SectionKicker>No lock-in</SectionKicker>
                <p className="font-sans text-[clamp(1.7rem,3.2vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.045em] text-[#f5f0e8]">
                  Pause or cancel anytime.
                </p>
                <p className="max-w-[34rem] text-pretty text-[1.02rem] leading-8 text-[#b8afa2]">
                  Work in bursts? Pause your plan between projects and keep your
                  unused days for when you return. No contracts, no penalties,
                  no awkward conversations.
                </p>
              </div>
              <div className="lg:justify-self-end">
                <CoreActionLink
                  href={INTRO_HREF}
                  variant="primary"
                  label="book intro prism infinity"
                  location="prism-infinity risk reversal"
                >
                  Ask us how it works
                </CoreActionLink>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Proof band */}
        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div className={coreRouteContainedSectionClassName}>
              <CoreSectionHeading
                eyebrow="Proof"
                title="The same team behind real results."
                description="Prism Infinity is the same craft and output engine that drives growth and reach for the brands we work with."
              />
              <dl className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                {PROOF_STATS.map((stat) => (
                  <div key={stat.label} className="bg-black p-6">
                    <dt className="font-sans text-[clamp(1.9rem,4vw,2.6rem)] font-medium leading-none tracking-[-0.04em] text-[#d8bc79]">
                      {stat.value}
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

        {/* 7. Pricing recap */}
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
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_40%)]"
              />
              <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
                <SectionKicker>One simple price</SectionKicker>
                <p className="mt-6 font-sans text-[clamp(3rem,8vw,4.5rem)] font-medium leading-none tracking-[-0.05em] text-[#f5f0e8]">
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

        {/* 8. FAQ */}
        <section className={coreRouteSectionCompactClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              eyebrow="FAQ"
              title="Good things to know first."
            />
            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {item.question}
                    <span className="text-[#d8bc79] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-[#b8afa2]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Final CTA */}
        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <CoreSectionHeading
                title="Start Prism Infinity."
                description="One subscription for everything Prism does. Subscribe today and send your first request within minutes."
              />
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
