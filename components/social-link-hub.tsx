'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import BrandLogo from '@/components/brand-logo'
import PixelishIcon from '@/components/pixelish/PixelishIcon'
import { LOGO_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { trackCTAClick, trackExternalLinkClick } from '@/utils/analytics'

/**
 * Link-in-bio hub for Prism's social profiles (/tiktok, /ig, /youtube).
 *
 * Visitors arrive warm — they just watched Prism's content — so the page
 * routes intent instead of thanking them: order the $300 website, read the
 * proof, or explore Content OS ("the system behind this video") and Prism
 * Infinity. One template, platform-aware copy.
 */

export type SocialHubPlatform = 'tiktok' | 'instagram' | 'youtube'

type PlatformConfig = {
  label: string
  handle: string
  profileHref: string
  headline: string
  /** Two-number proof line: one attention stat, one business stat. */
  proofStrip: string
  contentOsTitle: string
  caseStudiesDetail: string
  secondary: 'youtube-channel' | 'wall-of-love'
}

const SUPPORT_LINE =
  'Prism builds websites, content systems, and growth for founders, owners, and operators.'

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@the_design_prism'

const PLATFORMS: Record<SocialHubPlatform, PlatformConfig> = {
  tiktok: {
    label: 'TikTok',
    handle: '@the_design_prism',
    profileHref: 'https://www.tiktok.com/@the_design_prism',
    headline: 'You found the studio behind the videos.',
    proofStrip: '17M+ views across channels · $100,000+ driven for clients',
    contentOsTitle: 'The system behind this video',
    caseStudiesDetail: '22 verified case studies',
    secondary: 'youtube-channel',
  },
  instagram: {
    label: 'Instagram',
    handle: '@the_design_prism',
    profileHref: 'https://www.instagram.com/the_design_prism/',
    headline: 'You found the studio behind the feed.',
    proofStrip: '38,000 followers here · $100,000+ driven for clients',
    contentOsTitle: 'The system behind this feed',
    caseStudiesDetail: '22 verified case studies',
    secondary: 'youtube-channel',
  },
  youtube: {
    label: 'YouTube',
    handle: '@the_design_prism',
    profileHref: YOUTUBE_CHANNEL_URL,
    headline: 'You found the studio behind the channel.',
    proofStrip: '24,000 subscribers · 22 verified case studies',
    contentOsTitle: 'The system behind this channel',
    caseStudiesDetail: '$100,000+ driven for clients',
    secondary: 'wall-of-love',
  },
}

// Shared premium hover language from the core CTA system: a gentle lift, a
// warm gold-tinted glow (#d8bc79), and the site's signature easing curve.
const actionCardBaseClassName =
  'group flex min-h-[4.5rem] w-full items-center gap-4 rounded-xl border px-5 py-4 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black active:translate-y-0 motion-reduce:transition-none'

const quietActionCardClassName = cn(
  actionCardBaseClassName,
  'border-white/12 bg-white/[0.03] hover:border-[#d8bc79]/35 hover:bg-white/[0.06] hover:shadow-[0_24px_48px_-30px_rgba(216,188,121,0.5)]',
)

const primaryActionCardClassName = cn(
  actionCardBaseClassName,
  'border-[#f5f0e8]/70 bg-[#f5f0e8] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_20px_40px_-26px_rgba(245,240,232,0.72)] hover:border-white hover:bg-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_30px_60px_-26px_rgba(216,188,121,0.45),0_22px_44px_-24px_rgba(245,240,232,0.85)]',
)

type ActionTone = 'quiet' | 'primary'

type ActionCardProps = {
  title: string
  detail: string
  href: string
  external?: boolean
  tone?: ActionTone
  location: string
  icon: ReactNode
}

function ActionCard({
  title,
  detail,
  href,
  external = false,
  tone = 'quiet',
  location,
  icon,
}: ActionCardProps) {
  const label = title.toLowerCase()
  const isPrimary = tone === 'primary'

  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={() => {
        if (external) {
          trackExternalLinkClick(href, label)
        } else {
          trackCTAClick(label, location)
        }
      }}
      data-cta-text={label}
      data-cta-location={location}
      className={
        isPrimary ? primaryActionCardClassName : quietActionCardClassName
      }
    >
      <span
        className={cn(
          'grid h-11 w-11 shrink-0 place-items-center rounded-lg border',
          isPrimary
            ? 'border-black/10 bg-black/[0.04] text-[#050505]'
            : 'border-white/12 bg-white/[0.04] text-[#f5f0e8]',
        )}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            'block text-[0.97rem] font-medium tracking-[-0.01em]',
            isPrimary ? 'text-[#050505]' : 'text-[#f5f0e8]',
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            'mt-1 block font-mono text-[10px] font-semibold uppercase leading-[1.5] tracking-[0.18em]',
            isPrimary ? 'text-[#050505]/55' : 'text-[#8f877b]',
          )}
        >
          {detail}
        </span>
      </span>
      <PixelishIcon
        src="/pixelish/arrow-right.svg"
        alt=""
        size={12}
        aria-hidden="true"
        invert={!isPrimary}
        className={cn(
          'shrink-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transition-none',
          isPrimary ? 'opacity-60' : 'opacity-50 group-hover:opacity-100',
        )}
      />
    </Link>
  )
}

export default function SocialLinkHub({
  platform,
}: {
  platform: SocialHubPlatform
}) {
  const config = PLATFORMS[platform]
  const headerLocation = `${platform} landing header`
  const actionsLocation = `${platform} landing actions`

  return (
    <div className="flex min-h-dvh flex-col bg-black text-[#f5f0e8]">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5">
        <header className="flex items-center justify-between gap-4 py-5">
          <Link
            href="/"
            aria-label="Prism home"
            data-cta-text="prism home"
            data-cta-location={headerLocation}
            className="inline-flex min-w-0 items-center gap-3 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/12 bg-white">
              <Image
                src={LOGO_CONFIG.src}
                alt=""
                width={40}
                height={40}
                className={`h-full w-full object-contain ${LOGO_CONFIG.className}`}
                priority
              />
            </span>
            <span className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.22em]">
              prism
            </span>
          </Link>

          <Link
            href={config.profileHref}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-text={`${platform} profile`}
            data-cta-location={headerLocation}
            onClick={() =>
              trackExternalLinkClick(config.profileHref, `${platform} profile`)
            }
            className="max-w-[46vw] truncate font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8f877b] transition-colors hover:text-[#f5f0e8] focus-visible:rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:max-w-none"
          >
            {config.handle}
          </Link>
        </header>

        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-1 flex-col justify-center py-12"
        >
          <span
            aria-hidden="true"
            className="grid h-12 w-12 place-items-center rounded-xl border border-white/12 bg-white/[0.04]"
          >
            <BrandLogo
              brand={platform}
              theme="dark"
              decorative
              className="h-5 w-5"
            />
          </span>

          <h1 className="mt-7 max-w-[16ch] text-balance font-sans text-[clamp(2rem,8vw,2.8rem)] font-medium leading-[1.02] tracking-[-0.045em] text-[#f5f0e8]">
            {config.headline}
          </h1>

          <p className="mt-4 max-w-[36ch] text-pretty font-sans text-[0.98rem] leading-7 text-[#b8afa2]">
            {SUPPORT_LINE}
          </p>

          <p className="mt-5 font-mono text-[10px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-[#8f877b]">
            {config.proofStrip}
          </p>

          <nav aria-label={`${config.label} page actions`} className="mt-9">
            <div className="grid gap-3">
            <ActionCard
              title="Order your website"
              detail="$300 flat · live in 7 days"
              href="/websites#order"
              tone="primary"
              location={actionsLocation}
              icon={
                <PixelishIcon
                  src="/pixelish/browser.svg"
                  alt=""
                  size={16}
                  aria-hidden="true"
                  invert={false}
                />
              }
            />
            <ActionCard
              title="See the proof"
              detail={config.caseStudiesDetail}
              href="/case-studies"
              location={actionsLocation}
              icon={
                <PixelishIcon
                  src="/pixelish/graph-chart-high.svg"
                  alt=""
                  size={16}
                  aria-hidden="true"
                />
              }
            />
            <ActionCard
              title={config.contentOsTitle}
              detail="$5,000 + $1,000/month"
              href="/content-os"
              location={actionsLocation}
              icon={
                <PixelishIcon
                  src="/pixelish/media-play.svg"
                  alt=""
                  size={16}
                  aria-hidden="true"
                />
              }
            />
            <ActionCard
              title="Everything Prism, unlimited"
              detail="$2,000/month · pause anytime"
              href="/prism-infinity"
              location={actionsLocation}
              icon={
                <span
                  aria-hidden="true"
                  className="font-sans text-[1.15rem] font-medium leading-none"
                >
                  ∞
                </span>
              }
            />
            </div>

            <div className="mt-3 grid gap-3">
            <ActionCard
              title="Refer a friend"
              detail="$100 when they become a client"
              href="/refer"
              location={actionsLocation}
              icon={
                <PixelishIcon
                  src="/pixelish/currency-dollar.svg"
                  alt=""
                  size={15}
                  aria-hidden="true"
                />
              }
            />
            <ActionCard
              title="Start free"
              detail="growth audit · no pressure"
              href="/get-started"
              location={actionsLocation}
              icon={
                <PixelishIcon
                  src="/pixelish/lens-plus.svg"
                  alt=""
                  size={15}
                  aria-hidden="true"
                />
              }
            />
            {config.secondary === 'youtube-channel' ? (
              <ActionCard
                title="Prism on YouTube"
                detail="long-form builds"
                href={YOUTUBE_CHANNEL_URL}
                external
                location={actionsLocation}
                icon={
                  <BrandLogo
                    brand="youtube"
                    theme="dark"
                    decorative
                    className="h-4 w-4"
                  />
                }
              />
            ) : (
              <ActionCard
                title="Wall of love"
                detail="clients in their own words"
                href="/wall-of-love"
                location={actionsLocation}
                icon={
                  <PixelishIcon
                    src="/pixelish/emoji-heart.svg"
                    alt=""
                    size={15}
                    aria-hidden="true"
                  />
                }
              />
            )}
            </div>
          </nav>
        </main>

        <footer className="flex items-center justify-between gap-4 border-t border-white/12 py-5 font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-[#8f877b]">
          <span>real clients · real numbers · start anytime</span>
          <span className="shrink-0 text-[#6e6e68]">© prism</span>
        </footer>
      </div>
    </div>
  )
}
