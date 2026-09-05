import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Globe, Megaphone, Share2, Sparkles } from 'lucide-react'

import BrandLogo, { type BrandLogoKey } from '@/components/brand-logo'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { ServiceSiblings } from '@/components/services/ServiceSiblings'
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
import { BOOK_A_CALL_CTA, CANONICAL_PRICING_OFFERS } from '@/lib/pricing-model'
import { CONNECTED_CLIENT_TRAFFIC, SOCIAL_PROOF } from '@/lib/proof-metrics'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

const CANONICAL_URL = 'https://www.design-prism.com/content'
const CONTENT_OS_OFFER = CANONICAL_PRICING_OFFERS.content_os

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Content',
  description:
    'A content system that plans, produces, and publishes across your website and your social channels.',
  path: '/content',
  ogImage: '/prism-opengraph.png',
})

const HERO_CHIPS = [
  'Your social channels',
  'Your website',
  '3-month implementation',
] as const

const CAPABILITIES = [
  {
    title: 'Posts, scripts, and video ideas',
    body: 'AI agents draft, edit, and schedule a steady stream of on-brand posts, scripts, and short-form video concepts built around your offers.',
    icon: Sparkles,
  },
  {
    title: 'Adapted for each channel',
    body: 'We adapt and publish your content for YouTube, Instagram, TikTok, LinkedIn, and more, with formats that fit each channel.',
    icon: Share2,
  },
  {
    title: 'Ready for ads',
    body: 'Strong organic posts can become creative for paid campaigns. Prism Ads is a separate service when you are ready to add paid distribution.',
    icon: Megaphone,
  },
  {
    title: 'On-site content',
    body: 'Landing pages, blog posts, and search-focused content give visitors more ways to discover your business on your own website.',
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
    body: 'Agents start producing, distributing, and testing content across your channels and your website.',
  },
  {
    label: 'Review and improve',
    detail: 'Ongoing',
    body: 'Each month we review performance, refine topics and formats, and use what we learn to plan the next round of content.',
  },
] as const

const PROOF_TILES = [
  {
    platform: 'YouTube',
    brand: 'youtube',
    value: SOCIAL_PROOF.youtube.audience,
    label: SOCIAL_PROOF.youtube.audienceLabel,
    detail: `${SOCIAL_PROOF.youtube.activity} ${SOCIAL_PROOF.youtube.activityLabel}`,
  },
  {
    platform: 'Instagram',
    brand: 'instagram',
    value: SOCIAL_PROOF.instagram.audience,
    label: SOCIAL_PROOF.instagram.audienceLabel,
    detail: `${SOCIAL_PROOF.instagram.activity} ${SOCIAL_PROOF.instagram.activityLabel}`,
  },
  {
    platform: 'TikTok',
    brand: 'tiktok',
    value: SOCIAL_PROOF.tiktok.audience,
    label: SOCIAL_PROOF.tiktok.audienceLabel,
    detail: `${SOCIAL_PROOF.tiktok.activity} ${SOCIAL_PROOF.tiktok.activityLabel}`,
  },
] as const satisfies readonly {
  platform: string
  brand: BrandLogoKey
  value: string
  label: string
  detail: string
}[]

const FAQ_ITEMS = [
  {
    question: 'What do the content agents actually do?',
    answer:
      'They plan, draft, edit, schedule, and publish content across your social platforms and website, reviewed against your brand and offers. The best performers can later become ad creative on the Ads service.',
  },
  {
    question: 'What does the 3-month implementation include?',
    answer:
      'We connect your channels, define your brand voice and offers, build the agent system, and ship the first wave of content so the engine is live and producing by the end of the three months.',
  },
  {
    question: 'What does the monthly optimization cover?',
    answer:
      'Ongoing operation and optimization: the agents keep producing and distributing across your channels, and Prism tunes the system each month based on what is driving reach and revenue.',
  },
  {
    question: 'Which platforms do you cover?',
    answer:
      'Every major social platform, including YouTube, Instagram, TikTok, and LinkedIn, plus content published directly on your own website.',
  },
  {
    question: 'Can I cancel?',
    answer:
      'Yes. After the 3-month implementation, the monthly optimization is month-to-month. You can pause or cancel anytime.',
  },
  {
    question: 'How much does the content system cost?',
    answer:
      'Pricing is scoped to your business. Book a 30-minute Zoom call and we will map your channels, goals, and the right system together. You leave the call with a clear plan and a clear price.',
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
                  eyebrow="Content"
                  title="Your expertise. Published consistently."
                  description="Turn your ideas and offers into posts, scripts, and website content. We handle planning, production, and publishing across your social channels and site."
                  titleClassName="max-w-[20ch]"
                />

                <p className="mt-8 text-[1.02rem] leading-7 text-[#b8afa2]">
                  <span className="font-medium text-[#f5f0e8]">
                    Implemented over 3 months
                  </span>
                  {', '}then optimized every month. Scoped to your business on a
                  30-minute call.
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <CoreActionLink
                    href={BOOK_A_CALL_CTA.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="heroPrimary"
                    label="book a free demo"
                    location="content hero"
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
              title="From the first idea to the published post."
              description="Prism combines AI agents and brand review to keep content moving across your channels."
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
              title="Set it up. Keep showing up."
              description="Three months to connect your channels and build the system, followed by monthly reviews and improvements."
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
              title="See it on our own channels."
              description="This is the same system Prism runs on itself. These are our audiences and the views behind them."
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
                    {tile.label} · {tile.detail}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 border border-[#d8bc79]/25 bg-[#d8bc79]/[0.05] p-6 text-[0.98rem] leading-7 text-[#c9c1b6]">
              <span className="font-medium text-[#d8bc79]">
                {CONNECTED_CLIENT_TRAFFIC.newUsers.toLocaleString('en-US')}
              </span>{' '}
              new users across {CONNECTED_CLIENT_TRAFFIC.connectedSites}{' '}
              connected client sites in {CONNECTED_CLIENT_TRAFFIC.month}.
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
                  location="content pricing"
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
              title="Start the content system."
              description="Give your social channels and website a consistent publishing plan. We will map the content, workflow, and scope with you."
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <CoreActionLink
                href={BOOK_A_CALL_CTA.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="heroPrimary"
                label="book a free demo"
                location="content final"
              >
                {BOOK_A_CALL_CTA.label}
              </CoreActionLink>
            </div>
          </div>
        </section>
        <ServiceSiblings current="content" />
      </main>
      <Footer />
      <ServiceSchema
        serviceId="content"
        name="Prism Content"
        description={CONTENT_OS_OFFER.description}
        serviceType="Content and social media marketing"
        areaServed="United States"
        offerDetails={{
          name: CONTENT_OS_OFFER.name,
          description: `A content system that plans, produces, and publishes across your social channels and your website. Implemented over 3 months, then optimized every month. Scoped on a 30-minute call.`,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/InStock',
          url: CANONICAL_URL,
        }}
      />
      <FAQSchema questions={[...FAQ_ITEMS]} />
    </div>
  )
}
