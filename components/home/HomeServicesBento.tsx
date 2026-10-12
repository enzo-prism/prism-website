import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  BarChart3,
  Camera,
  LayoutTemplate,
  Megaphone,
  MessageSquareQuote,
  Search,
} from 'lucide-react'

import { HOMEPAGE_SERVICES } from '@/components/home/homepage-content'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { quotesData } from '@/content/wall-of-love-data'
import { SOCIAL_PROOF } from '@/lib/proof-metrics'
import { cn } from '@/lib/utils'

type BentoCardProps = {
  icon: typeof LayoutTemplate
  title: string
  description: string
  href?: string
  linkLabel?: string
  className?: string
  visual?: ReactNode
  visualClassName?: string
  beam?: boolean
}

function BentoCard({
  icon: Icon,
  title,
  description,
  href,
  linkLabel,
  className,
  visual,
  visualClassName,
  beam,
}: BentoCardProps) {
  return (
    <SpotlightCard
      beam={beam}
      data-home-service-card=""
      className={cn('group/bento relative flex flex-col', className)}
    >
      <div className="relative z-10 flex flex-col gap-3 p-6 sm:p-7">
        <span className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-foreground">
          <Icon aria-hidden="true" className="size-4" />
        </span>
        <h3 className="text-heading mt-2 text-foreground">
          {href ? (
            <Link
              href={href}
              className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-hidden focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p className="max-w-[40ch] text-pretty text-[15px] leading-relaxed text-muted-foreground">
          {description}
        </p>
        {href && linkLabel ? (
          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/90">
            {linkLabel}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover/bento:-translate-y-0.5 group-hover/bento:translate-x-0.5"
            />
          </span>
        ) : null}
      </div>
      {visual ? (
        <div
          aria-hidden="true"
          className={cn('relative mt-auto', visualClassName)}
        >
          {visual}
        </div>
      ) : null}
    </SpotlightCard>
  )
}

function WebsiteVisual() {
  return (
    <div className="relative h-[230px] overflow-hidden sm:h-[300px]">
      <div className="absolute left-6 right-[-18%] top-2 rotate-[-2deg] overflow-hidden rounded-xl border border-white/10 bg-popover shadow-[0_40px_80px_-30px_oklch(0_0_0/90%)] transition-transform duration-500 group-hover/bento:-translate-y-2 sm:left-10">
        <div className="flex h-6 items-center gap-1 border-b border-white/[0.06] px-2.5">
          <span className="size-1.5 rounded-full bg-white/15" />
          <span className="size-1.5 rounded-full bg-white/15" />
          <span className="size-1.5 rounded-full bg-white/15" />
          <span className="mx-auto rounded bg-white/[0.05] px-2 font-mono text-[9px] text-subtle">
            exquisitedentistryla.com
          </span>
        </div>
        <Image
          src="/case-studies/exquisite-dentistry-home-desktop.jpg"
          alt=""
          width={2880}
          height={1800}
          sizes="(min-width: 1024px) 640px, 90vw"
          className="block h-auto w-full"
        />
      </div>
      <div className="absolute bottom-5 left-6 flex flex-wrap gap-2 sm:left-10">
        {['Custom design', 'Mobile first', 'SEO schema', 'Analytics'].map(
          (chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/10 bg-background/80 px-3 py-1 text-[12px] text-muted-foreground backdrop-blur-md"
            >
              {chip}
            </span>
          ),
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent" />
    </div>
  )
}

const CONTENT_COMMENT_HANDLES = ['relevique', 'helder_movement', 'notpharaoh_']

function ContentVisual() {
  const comments = CONTENT_COMMENT_HANDLES.map((handle) =>
    quotesData.find(
      (quote) => quote.client === handle && !quote.requiresConsent,
    ),
  ).filter((quote): quote is (typeof quotesData)[number] => Boolean(quote))

  const channels = [
    {
      name: 'YouTube',
      icon: '/logos/svgl/youtube.svg',
      value: SOCIAL_PROOF.youtube.audience,
      label: SOCIAL_PROOF.youtube.audienceLabel,
    },
    {
      name: 'Instagram',
      icon: '/logos/svgl/instagram.svg',
      value: SOCIAL_PROOF.instagram.audience,
      label: SOCIAL_PROOF.instagram.audienceLabel,
    },
    {
      name: 'TikTok',
      icon: '/logos/svgl/tiktok-dark.svg',
      value: SOCIAL_PROOF.tiktok.audience,
      label: SOCIAL_PROOF.tiktok.audienceLabel,
    },
  ]

  return (
    <div className="flex flex-col gap-3 px-6 pb-6 sm:px-7 sm:pb-7">
      <div className="grid grid-cols-3 gap-2">
        {channels.map((channel) => (
          <div
            key={channel.name}
            className="flex flex-col gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3"
          >
            <Image
              src={channel.icon}
              alt=""
              width={18}
              height={18}
              className="size-[18px]"
            />
            <span className="text-lg font-semibold leading-none tracking-[-0.03em] text-foreground">
              {channel.value}
            </span>
            <span className="text-[11px] text-subtle">{channel.label}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {comments.map((comment, index) => (
          <div
            key={comment.id}
            className={cn(
              'rounded-xl border border-white/[0.08] bg-popover/90 p-3.5 shadow-[0_16px_40px_-24px_oklch(0_0_0/90%)] transition-transform duration-500',
              index === 1 && 'ml-4 group-hover/bento:-translate-x-1',
              index === 2 && 'ml-8 group-hover/bento:-translate-x-2',
            )}
          >
            <p className="text-[13px] leading-snug text-foreground/90">
              “{comment.text}”
            </p>
            <p className="mt-1.5 font-mono text-[10px] text-subtle">
              @{comment.client} on Instagram
            </p>
          </div>
        ))}
      </div>
      <p className="text-[12px] leading-relaxed text-subtle">
        Comments on Prism’s own posts. Audience as of{' '}
        {SOCIAL_PROOF.youtube.verifiedAt}.
      </p>
    </div>
  )
}

const AD_PLATFORMS = [
  { name: 'Google', icon: '/logos/svgl/google.svg' },
  { name: 'Meta', icon: '/logos/svgl/meta.svg' },
  { name: 'TikTok', icon: '/logos/svgl/tiktok-dark.svg' },
  { name: 'Yelp', icon: '/logos/svgl/yelp.svg' },
]

function AdsVisual() {
  return (
    <div className="px-6 pb-6 sm:px-7 sm:pb-7">
      <div className="grid grid-cols-4 gap-2">
        {AD_PLATFORMS.map((platform) => (
          <div
            key={platform.name}
            className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] py-3.5 transition-transform duration-300 group-hover/bento:-translate-y-0.5"
          >
            <Image
              src={platform.icon}
              alt=""
              width={22}
              height={22}
              className="size-[22px]"
            />
            <span className="text-[11px] text-subtle">{platform.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const AI_SURFACES = [
  { name: 'ChatGPT', icon: '/logos/svgl/openai-dark.svg' },
  { name: 'Gemini', icon: '/logos/svgl/gemini.svg' },
  { name: 'Claude', icon: '/logos/svgl/claude-ai.svg' },
  { name: 'Perplexity', icon: '/logos/svgl/perplexity-ai.svg' },
]

function SearchVisual() {
  return (
    <div className="flex flex-col gap-3 px-6 pb-6 sm:px-7 sm:pb-7">
      <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5">
        <Search className="size-4 text-subtle" />
        <span className="text-[14px] text-foreground/90">
          best dentist near me
        </span>
        <span className="ml-0.5 h-4 w-px animate-pulse bg-foreground/70 motion-reduce:animate-none" />
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[12px] text-muted-foreground">
          <Image
            src="/logos/svgl/google.svg"
            alt=""
            width={13}
            height={13}
            className="size-[13px]"
          />
          Google
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[12px] text-muted-foreground">
          <Image
            src="/logos/svgl/google-maps.svg"
            alt=""
            width={13}
            height={13}
            className="size-[13px]"
          />
          Maps
        </span>
        {AI_SURFACES.map((surface) => (
          <span
            key={surface.name}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[12px] text-muted-foreground"
          >
            <Image
              src={surface.icon}
              alt=""
              width={13}
              height={13}
              className="size-[13px]"
            />
            {surface.name}
          </span>
        ))}
      </div>
    </div>
  )
}

function ReviewsVisual() {
  const quote = quotesData.find((item) => item.id === 3)
  if (!quote) return null
  return (
    <div className="px-6 pb-6 sm:px-7 sm:pb-7">
      <figure className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
        <blockquote className="text-[15px] leading-relaxed text-foreground/90">
          “{quote.text}”
        </blockquote>
        <figcaption className="mt-3 flex items-center gap-2.5">
          <span className="grid size-7 place-items-center rounded-full bg-white/10 text-[11px] font-semibold text-foreground">
            TJ
          </span>
          <span className="text-[13px] text-muted-foreground">
            {quote.client}, website client
          </span>
        </figcaption>
      </figure>
    </div>
  )
}

const TRACKED_EVENTS = [
  { label: 'Call', detail: 'from Google Maps' },
  { label: 'Booking request', detail: 'from your website' },
  { label: 'Form submitted', detail: 'from an Instagram ad' },
]

function TrackingVisual() {
  return (
    <div className="px-6 pb-6 sm:px-7 sm:pb-7">
      <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]">
        {TRACKED_EVENTS.map((event, index) => (
          <li key={event.label} className="flex items-center gap-3 px-4 py-2.5">
            <span
              className="size-1.5 rounded-full"
              style={{
                background: [
                  'var(--spectrum-green)',
                  'var(--spectrum-blue)',
                  'var(--spectrum-violet)',
                ][index],
              }}
            />
            <span className="text-[13px] font-medium text-foreground/90">
              {event.label}
            </span>
            <span className="ml-auto text-[12px] text-subtle">
              {event.detail}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[12px] text-subtle">
        Example of the events we set up and report on.
      </p>
    </div>
  )
}

/** "What we do" as a bento grid: each card shows the work, not a promise. */
export default function HomeServicesBento() {
  return (
    <Section id="services" aria-labelledby="home-services-title">
      <Reveal>
        <SectionHeader
          id="home-services-title"
          eyebrow={HOMEPAGE_SERVICES.eyebrow}
          title={HOMEPAGE_SERVICES.title}
          description={HOMEPAGE_SERVICES.description}
        />
      </Reveal>

      <div className="mt-14 grid gap-4 lg:grid-cols-6">
        <Reveal className="lg:col-span-4">
          <BentoCard
            icon={LayoutTemplate}
            title="websites."
            description="Fast, custom sites that explain your value and make it easy to call or book. You own every pixel."
            href="/websites"
            linkLabel="Explore websites"
            className="h-full"
            visual={<WebsiteVisual />}
            beam
          />
        </Reveal>
        <Reveal className="lg:col-span-2 lg:row-span-2" delay={80}>
          <BentoCard
            icon={Camera}
            title="content."
            description="Video, photo, and posts from the team that grew its own channels first."
            href="/content"
            linkLabel="Explore content"
            className="h-full"
            visual={<ContentVisual />}
          />
        </Reveal>
        <Reveal className="lg:col-span-2" delay={120}>
          <BentoCard
            icon={Megaphone}
            title="ads."
            description="Campaigns on Google, Meta, TikTok, and Yelp that land on a page worth landing on."
            href="/ads"
            linkLabel="Explore ads"
            className="h-full"
            visual={<AdsVisual />}
          />
        </Reveal>
        <Reveal className="lg:col-span-2" delay={160}>
          <BentoCard
            icon={Search}
            title="search & ai answers."
            description="Show up on Google, Maps, and in AI answers when people ask for what you do."
            className="h-full"
            visual={<SearchVisual />}
          />
        </Reveal>
        <Reveal className="lg:col-span-3" delay={80}>
          <BentoCard
            icon={MessageSquareQuote}
            title="reviews & proof."
            description="Real reviews and real results on every page, so trust is built before the first call."
            className="h-full"
            visual={<ReviewsVisual />}
          />
        </Reveal>
        <Reveal className="lg:col-span-3" delay={140}>
          <BentoCard
            icon={BarChart3}
            title="tracking."
            description="Calls, forms, and bookings measured, so you always know what is working."
            className="h-full"
            visual={<TrackingVisual />}
          />
        </Reveal>
      </div>
    </Section>
  )
}
