import type { Metadata } from 'next'
import {
  ArrowUpRight,
  CalendarRange,
  Clapperboard,
  Globe,
  Megaphone,
  RefreshCw,
  Rocket,
  Share2,
  Sparkles,
} from 'lucide-react'

import BrandLogo, { type BrandLogoKey } from '@/components/brand-logo'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import { CommentsRail } from '@/components/services/CommentsRail'
import { ContentHeroVisual } from '@/components/services/ContentHeroVisual'
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
import { getCommunityComments } from '@/components/services/community-comments'
import {
  CANONICAL_PRICING_OFFERS,
  CONTENT_WAITLIST_CTA,
} from '@/lib/pricing-model'
import { SOCIAL_PROOF, SOCIAL_PROOF_CHANNELS } from '@/lib/proof-metrics'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

const CANONICAL_URL = 'https://www.design-prism.com/content'
const CONTENT_OFFER = CANONICAL_PRICING_OFFERS.content

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Content',
  description:
    'Video edits, social posts, scripts, and website content planned and published around your expertise and offers.',
  path: '/content',
  ogImage: '/prism-opengraph.png',
})

const CHANNEL_BRANDS: Record<string, BrandLogoKey> = {
  YouTube: 'youtube',
  Instagram: 'instagram',
  TikTok: 'tiktok',
}

// Instagram comments on Prism's own videos. Community, never client reviews.
const COMMENT_ROWS = [
  getCommunityComments([44, 14, 33, 11, 36, 19]),
  getCommunityComments([31, 39, 12, 18, 41, 25]),
] as const

function DraftQueue() {
  const drafts = [
    {
      icon: Clapperboard,
      title: 'Video edit',
      meta: 'Cut for Reels and Shorts',
      status: 'In review',
    },
    {
      icon: Sparkles,
      title: 'Script',
      meta: 'From your customer questions',
      status: 'Approved',
    },
    {
      icon: CalendarRange,
      title: 'Caption and post',
      meta: 'Queued for your channels',
      status: 'Scheduled',
    },
  ]
  return (
    <ul className="flex flex-col gap-2 border-t border-white/[0.06] px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
      {drafts.map((draft, index) => {
        const Icon = draft.icon
        return (
          <li
            key={draft.title}
            className={cn(
              'flex items-center gap-3 rounded-xl border border-white/[0.08] bg-background/60 px-3.5 py-3',
              index === 1 && 'sm:ml-6',
              index === 2 && 'sm:ml-12',
            )}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-foreground">
              <Icon aria-hidden="true" className="size-4" strokeWidth={1.7} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-foreground">
                {draft.title}
              </span>
              <span className="block truncate text-[13px] text-subtle">
                {draft.meta}
              </span>
            </span>
            <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
              {draft.status}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

function ChannelRow() {
  const brands: { brand: BrandLogoKey; label: string }[] = [
    { brand: 'youtube', label: 'YouTube' },
    { brand: 'instagram', label: 'Instagram' },
    { brand: 'tiktok', label: 'TikTok' },
    { brand: 'linkedin', label: 'LinkedIn' },
  ]
  return (
    <div className="flex flex-wrap gap-2 px-6 pb-6 sm:px-7 sm:pb-7">
      {brands.map((item) => (
        <span
          key={item.label}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1.5 pr-3 text-[13px] text-muted-foreground"
        >
          <BrandLogo
            brand={item.brand}
            theme="dark"
            decorative
            className="size-4"
          />
          {item.label}
        </span>
      ))}
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1.5 pr-3 text-[13px] text-muted-foreground">
        <Globe aria-hidden="true" className="size-4" />
        Your website
      </span>
    </div>
  )
}

const WHAT_YOU_GET: readonly ServiceBentoItem[] = [
  {
    icon: Sparkles,
    title: 'posts, scripts, and video ideas',
    body: 'We turn your footage, expertise, and customer questions into video edits, scripts, captions, and posts, then bring them to you for review.',
    className: 'md:col-span-4',
    visual: <DraftQueue />,
  },
  {
    icon: Share2,
    title: 'adapted for each channel',
    body: 'We adjust the cut, caption, and format for every channel in your plan, then publish the approved content.',
    visual: <ChannelRow />,
  },
  {
    icon: Globe,
    title: 'content on your own site',
    body: 'Landing pages, blog posts, and search-focused articles give people more ways to find you on the site you own.',
  },
  {
    icon: Megaphone,
    title: 'ready for ads',
    body: 'Strong organic posts can become creative for paid campaigns. Prism Ads is a separate service when you are ready for paid reach.',
  },
  {
    icon: RefreshCw,
    title: 'a system, not a one-off',
    body: 'Implemented over three months, then optimized every month, so showing up becomes a routine instead of a scramble.',
  },
]

const STEPS: readonly ServiceStep[] = [
  {
    icon: CalendarRange,
    title: 'implement',
    detail: '3 months',
    body: 'We gather your footage and brand references, connect the agreed channels, and set up how you review and approve content.',
  },
  {
    icon: Rocket,
    title: 'publish approved work',
    detail: 'Go live',
    body: 'We prepare the first edits and posts, work through your feedback, and settle into a steady publishing routine.',
  },
  {
    icon: RefreshCw,
    title: 'review and improve',
    detail: 'Ongoing',
    body: 'Each month we review what held attention or prompted inquiries, then use it to plan the next batch.',
  },
]

const FAQ_ITEMS = [
  {
    question: 'What is Prism Content OS?',
    answer:
      'Content OS is Prism’s service for planning, producing, and publishing content across your website and social channels. It includes a 3-month implementation followed by monthly operation and optimization. Prism is fully booked, so scope is agreed when we reach out from the waitlist.',
  },
  {
    question: 'How does website content support SEO and AI discovery?',
    answer:
      'Useful website content answers customer questions and explains your services with clear, accurate information. It gives search engines and AI assistants relevant pages to find and reference. Content works alongside technical SEO and verifiable business information; publishing alone does not guarantee rankings or citations.',
  },
  {
    question: 'How much work will I need to do?',
    answer:
      'Share existing footage, business updates, and your expertise, then review the drafts. Prism handles planning, editing, formatting, and publishing. We agree on who approves content and how feedback is collected at the start.',
  },
  {
    question: 'What does the 3-month implementation include?',
    answer:
      'We organize your source material, define topics and brand voice, connect the agreed channels, and produce the first content. The three-month setup establishes the review and publishing routine for ongoing work.',
  },
  {
    question: 'What does the monthly optimization cover?',
    answer:
      'We keep planning, producing, and publishing, then review which topics and formats hold attention or prompt inquiries. Those findings guide the next content batch.',
  },
  {
    question: 'Which platforms do you cover?',
    answer:
      'We can work with YouTube, Instagram, TikTok, LinkedIn, and your website. We choose the channels and content formats with you when scoping the plan.',
  },
  {
    question: 'Can I cancel?',
    answer:
      'Yes. After the 3-month implementation, the monthly optimization is month-to-month. You can pause or cancel anytime.',
  },
  {
    question: 'How much does the content system cost?',
    answer:
      'Pricing is scoped to your business. Prism is fully booked right now, so join the waitlist; when we reach out we map your channels, goals, and the right system together and you leave with a clear plan and a clear price.',
  },
] as const

export default function ContentOsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <ServiceHero
          layout="split"
          title={
            <>
              <span className="block">your expertise. </span>
              <span className="block">
                catching{' '}
                <span className="text-spectrum prism-spectrum-pan">fire.</span>
              </span>
            </>
          }
          description={
            <>
              <span className="text-foreground">Content OS</span> turns your
              ideas and offers into videos, posts, scripts, and website
              content, then handles the planning, production, and publishing.
            </>
          }
          ctaHref={CONTENT_WAITLIST_CTA.href}
          location="content hero"
          secondary={{
            label: 'See our numbers',
            href: '#proof',
            trackingLabel: 'see content proof',
          }}
          visual={<ContentHeroVisual />}
          glow="warm"
        />

        <ServiceBento
          idPrefix="content"
          title="from the first idea to the published post."
          description="You bring the expertise and the source material. We turn it into finished content, collect your feedback, and handle publishing."
          items={WHAT_YOU_GET}
        />

        <ServiceSteps
          idPrefix="content"
          title="set it up. keep showing up."
          description="Three months to connect your channels and build the system, then monthly reviews that shape every new batch."
          steps={STEPS}
        />

        <Section
          id="proof"
          bleed
          aria-labelledby="content-proof-title"
          className="scroll-mt-20 overflow-x-clip"
        >
          <div className="prism-container">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
              <Reveal>
                <SectionHeader
                  id="content-proof-title"
                  eyebrow="Proof"
                  title="we run it on ourselves first."
                  description={`The same system runs Prism's own channels: ${SOCIAL_PROOF.combinedAudience} followers and subscribers across YouTube, Instagram, and TikTok.`}
                />
                <p className="mt-4 max-w-[52ch] text-xs leading-5 text-subtle">
                  {SOCIAL_PROOF.combinedAudienceMethodology}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.08] bg-card">
                  {SOCIAL_PROOF_CHANNELS.map((channel) => (
                    <li
                      key={channel.platform}
                      className="group/channel relative flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                        <BrandLogo
                          brand={CHANNEL_BRANDS[channel.platform]}
                          theme="dark"
                          decorative
                          className="size-5"
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="text-2xl font-semibold tracking-[-0.04em] text-foreground tabular-nums">
                            {channel.audience}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {channel.platform} {channel.audienceLabel} ·{' '}
                            {channel.activity} {channel.activityLabel}
                          </span>
                        </p>
                        <p className="mt-1.5 text-pretty text-xs leading-5 text-subtle">
                          {channel.source.replace(/\.$/, '')}. Verified{' '}
                          {channel.verifiedAt}.
                        </p>
                      </div>
                      <a
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full px-1 text-sm font-medium text-foreground after:absolute after:inset-0 after:content-[''] focus-visible:outline-hidden focus-visible:after:ring-[3px] focus-visible:after:ring-inset focus-visible:after:ring-ring/50"
                      >
                        Visit
                        <span className="sr-only">
                          {' '}
                          Prism on {channel.platform}
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 transition-transform duration-200 group-hover/channel:-translate-y-0.5 group-hover/channel:translate-x-0.5"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <div className="mt-16 sm:mt-20">
            <p className="prism-container mb-6 text-eyebrow text-subtle">
              Comments on Prism&apos;s own videos · community, not client
              reviews
            </p>
            <CommentsRail
              rows={COMMENT_ROWS}
              label="Instagram comments on Prism content"
            />
          </div>
        </Section>

        <ServiceFaq
          idPrefix="content"
          items={FAQ_ITEMS}
          title="before you start."
        />

        <ServiceSiblings current="content" />

        <FinalCta
          location="content final cta"
          title="your content, next."
          href={CONTENT_WAITLIST_CTA.href}
          headingId="content-final-cta-title"
        />
      </main>
      <Footer />
      <ServiceSchema
        serviceId="content"
        name="Prism Content"
        description={CONTENT_OFFER.description}
        serviceType="Content and social media marketing"
        areaServed="United States"
        offerDetails={{
          name: CONTENT_OFFER.name,
          description: `A content system that plans, produces, and publishes across your social channels and your website. Implemented over 3 months, then optimized every month. Prism is fully booked; scope is agreed when we reach out from the waitlist.`,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/LimitedAvailability',
          url: CANONICAL_URL,
        }}
      />
      <FAQSchema questions={[...FAQ_ITEMS]} />
    </div>
  )
}
