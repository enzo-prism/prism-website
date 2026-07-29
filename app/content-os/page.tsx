import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Globe, Megaphone, Share2, Sparkles } from 'lucide-react'

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
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import {
  BOOK_A_CALL_CTA,
  CANONICAL_PRICING_OFFERS,
} from '@/lib/pricing-model'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

const CANONICAL_URL = 'https://www.design-prism.com/content-os'
const CONTENT_OS_OFFER = CANONICAL_PRICING_OFFERS.content_os

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Content OS',
  description:
    'AI agents that create and improve content and ads across your website and social channels.',
  path: '/content-os',
  ogImage: '/prism-opengraph.png',
})

const HERO_CHIPS = [
  'Every social platform',
  'Your website',
  '3-month implementation',
] as const

const CAPABILITIES = [
  {
    title: 'Content engine',
    body: 'AI agents draft, edit, and schedule a steady stream of on-brand posts, scripts, and short-form video concepts built around your offers.',
    icon: Sparkles,
  },
  {
    title: 'Multi-platform distribution',
    body: 'Every piece is adapted and published natively across YouTube, Instagram, TikTok, LinkedIn, and more — no manual reformatting.',
    icon: Share2,
  },
  {
    title: 'Ad creative',
    body: 'Winning organic content becomes paid ad creative, with variations the agents launch, measure, and iterate on.',
    icon: Megaphone,
  },
  {
    title: 'On-site content',
    body: 'Your website stays alive with landing pages, blog posts, and SEO content wired to the same engine.',
    icon: Globe,
  },
] as const

const STEPS = [
  {
    label: 'Implement',
    detail: '3 months',
    body: 'We connect your brand, channels, and offers, then build and train the agent system over the first three months.',
  },
  {
    label: 'Launch the agent system',
    detail: 'Go live',
    body: 'Agents start producing, distributing, and testing content and ads across every platform and your website.',
  },
  {
    label: 'Scale every month',
    detail: 'Ongoing',
    body: 'Each month we optimize what is working, retire what is not, and push for more reach, revenue, and creative.',
  },
] as const

const PROOF_TILES = [
  {
    platform: 'YouTube',
    brand: 'youtube',
    value: '24,000',
    detail: '3M+ views',
  },
  {
    platform: 'Instagram',
    brand: 'instagram',
    value: '38,000',
    detail: '10M+ views',
  },
  { platform: 'TikTok', brand: 'tiktok', value: '9,000', detail: '4M+ views' },
] as const satisfies readonly {
  platform: string
  brand: BrandLogoKey
  value: string
  detail: string
}[]

const FAQ_ITEMS = [
  {
    question: 'What do the Content OS agents actually do?',
    answer:
      'They plan, draft, edit, schedule, and publish content across your social platforms and website, then turn the best performers into paid ad creative — all reviewed against your brand and offers.',
  },
  {
    question: 'What does the 3-month implementation include?',
    answer:
      'We connect your channels, define your brand voice and offers, build the agent system, and ship the first wave of content and ads so the engine is live and producing by the end of the three months.',
  },
  {
    question: 'What does the monthly optimization cover?',
    answer:
      'Ongoing operation and optimization: the agents keep producing and distributing across every platform, and Prism tunes the system each month based on what is driving reach and revenue.',
  },
  {
    question: 'Which platforms do you cover?',
    answer:
      'Every major social platform — including YouTube, Instagram, TikTok, and LinkedIn — plus content published directly on your own website.',
  },
  {
    question: 'Can I cancel?',
    answer:
      'Yes. After the 3-month implementation, the monthly optimization is month-to-month. You can pause or cancel anytime.',
  },
  {
    question: 'How much does Content OS cost?',
    answer:
      'Pricing is scoped to your business. Book a 30-minute Zoom call and we will map your channels, goals, and the right system together — you leave the call with a clear plan and a clear price.',
  },
] as const

function HeroChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex min-h-9 items-center rounded-full border border-white/12 bg-white/[0.03] px-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#c9c1b6]">
      {children}
    </span>
  )
}

export default function ContentOsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black font-sans text-[#f5f0e8]">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <section className="border-b border-white/12 px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
          <div className={coreRouteContainerClassName}>
            <div
              className={cn(
                coreRouteHeroFrameClassName,
                'px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20',
              )}
            >
              <div className="max-w-3xl">
                <CoreSectionHeading
                  as="h1"
                  variant="hero"
                  eyebrow="Content OS"
                  title="AI agents that scale your content and ads."
                  description="Across every social platform and your website — implemented in 3 months, then optimized every month."
                  titleClassName="max-w-[20ch]"
                />

                <p className="mt-8 text-[1.02rem] leading-7 text-[#b8afa2]">
                  <span className="font-medium text-[#f5f0e8]">
                    Implemented over 3 months
                  </span>
                  {', '}then optimized every month. Scoped to your business on
                  a 30-minute call.
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <CoreActionLink
                    href={BOOK_A_CALL_CTA.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="heroPrimary"
                    label="book a free demo"
                    location="content-os hero"
                  >
                    {BOOK_A_CALL_CTA.label}
                  </CoreActionLink>
                </div>

                <div className="mt-9 flex flex-wrap gap-2">
                  {HERO_CHIPS.map((chip) => (
                    <HeroChip key={chip}>{chip}</HeroChip>
                  ))}
                </div>
              </div>
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
            <CoreSectionHeading
              eyebrow="What it does"
              title="A content and ads team, run by agents."
              description="Four capabilities working as one system, so your brand ships more, everywhere, without a bigger team."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {CAPABILITIES.map((capability) => {
                const Icon = capability.icon
                return (
                  <article
                    key={capability.title}
                    className="border border-white/10 bg-[#070707] p-5"
                  >
                    <Icon
                      className="h-5 w-5 text-[#f5f0e8]"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <h2 className="mt-5 text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                      {capability.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[#b8afa2]">
                      {capability.body}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              eyebrow="How it works"
              title="Implement once. Compound every month."
              description="A focused build, then a system that keeps producing and improving on its own cadence."
            />
            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              {STEPS.map((step, index) => (
                <li
                  key={step.label}
                  className="border border-white/10 bg-[#070707] p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#8f877b]">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#8f877b]">
                      {step.detail}
                    </p>
                  </div>
                  <h2 className="mt-6 text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
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

        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              eyebrow="Proof"
              title="Our own reach is the proof."
              description="Content OS is the same system Prism runs on itself. These are our audiences and the views behind them."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {PROOF_TILES.map((tile) => (
                <div
                  key={tile.platform}
                  className="border border-white/12 bg-[#070707] p-6"
                >
                  <div className="flex items-center gap-2">
                    <BrandLogo
                      brand={tile.brand}
                      theme="dark"
                      decorative
                      className="h-4 w-4"
                    />
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#8f877b]">
                      {tile.platform}
                    </p>
                  </div>
                  <p className="mt-6 font-sans text-[2.6rem] font-medium leading-none tracking-[-0.05em] text-[#d8bc79]">
                    {tile.value}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[#b8afa2]">
                    followers · {tile.detail}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 border border-[#d8bc79]/25 bg-[#d8bc79]/[0.05] p-6 text-[0.98rem] leading-7 text-[#c9c1b6]">
              <span className="font-medium text-[#d8bc79]">$100,000</span> in
              revenue driven for clients in June 2026.
            </p>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div
              className={cn(
                coreRouteContainedSectionClassName,
                'flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between',
              )}
            >
              <div className="space-y-5">
                <CoreSectionHeading
                  eyebrow="Pricing"
                  title="Scoped to your business."
                />
                <div className="space-y-2">
                  <p className="text-[1.1rem] leading-7 text-[#f5f0e8]">
                    <span className="font-medium">
                      Every business runs content differently.
                    </span>
                  </p>
                  <p className="text-[1rem] leading-7 text-[#8f877b]">
                    Book a 30-minute Zoom call and we&apos;ll scope the system
                    and the investment together.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
                <CoreActionLink
                  href={BOOK_A_CALL_CTA.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="heroPrimary"
                  label="book a free demo"
                  location="content-os pricing"
                >
                  {BOOK_A_CALL_CTA.label}
                </CoreActionLink>
              </div>
            </div>
          </div>
        </section>

        <section className={coreRouteSectionCompactClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading eyebrow="FAQ" title="Before you start." />
            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {item.question}
                    <span className="text-[#d8bc79] transition-transform group-open:rotate-45 motion-reduce:transition-none">
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

        <section className={coreRouteSectionClassName}>
          <div
            className={cn(
              coreRouteContainerClassName,
              'flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between',
            )}
          >
            <CoreSectionHeading
              title="Start Content OS."
              description="Put AI agents to work on your content and ads across every platform and your website."
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <CoreActionLink
                href={BOOK_A_CALL_CTA.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="heroPrimary"
                label="book a free demo"
                location="content-os final"
              >
                {BOOK_A_CALL_CTA.label}
              </CoreActionLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ServiceSchema
        serviceId="content-os"
        name={CONTENT_OS_OFFER.name}
        description={CONTENT_OS_OFFER.description}
        serviceType="Content and social media marketing"
        areaServed="United States"
        offerDetails={{
          name: CONTENT_OS_OFFER.name,
          description: `AI agents that scale content and ads across every social platform and your website. Implemented over 3 months, then optimized every month. Scoped on a 30-minute call.`,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/InStock',
          url: CANONICAL_URL,
        }}
      />
      <FAQSchema questions={[...FAQ_ITEMS]} />
    </div>
  )
}
