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
 * routes intent instead of thanking them. The two offer cards sit under
 * short sans routing questions ("Doing under $1M a year?" / "Doing $1M–$10M
 * a year?") so the revenue segmentation is read before the offer; the
 * referral card sits after a hairline so it never reads as a third revenue
 * tier. One template, platform-aware stats.
 */

export type SocialHubPlatform = 'tiktok' | 'instagram' | 'youtube'

type PlatformConfig = {
  label: string
  handle: string
  profileHref: string
  /** Two-number proof line: one attention stat, one business stat. */
  proofStrip: [attention: string, business: string]
}

const PLATFORMS: Record<SocialHubPlatform, PlatformConfig> = {
  tiktok: {
    label: 'TikTok',
    handle: '@the_design_prism',
    profileHref: 'https://www.tiktok.com/@the_design_prism',
    proofStrip: ['17M+ views', '$5 million+ revenue driven for clients'],
  },
  instagram: {
    label: 'Instagram',
    handle: '@the_design_prism',
    profileHref: 'https://www.instagram.com/the_design_prism/',
    proofStrip: ['37k followers', '$5 million+ revenue driven for clients'],
  },
  youtube: {
    label: 'YouTube',
    handle: '@the_design_prism',
    profileHref: 'https://www.youtube.com/@the_design_prism',
    proofStrip: ['24k subscribers', '$5 million+ revenue driven for clients'],
  },
}

// Shared premium hover language from the core CTA system: a gentle lift, a
// warm gold-tinted glow (#d8bc79), and the site's signature easing curve.
const actionCardBaseClassName =
  'group flex min-h-[5rem] w-full items-center gap-4 rounded-xl border px-5 py-4 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black active:translate-y-0 motion-reduce:transition-none'

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
  tone?: ActionTone
  location: string
  icon: ReactNode
  /** Full accessible name when a visual routing question sits outside the link. */
  ariaLabel?: string
}

function ActionCard({
  title,
  detail,
  href,
  tone = 'quiet',
  location,
  icon,
  ariaLabel,
}: ActionCardProps) {
  const label = title.toLowerCase()
  const isPrimary = tone === 'primary'

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      onClick={() => {
        trackCTAClick(label, location)
      }}
      data-cta-text={label}
      data-cta-location={location}
      className={
        isPrimary ? primaryActionCardClassName : quietActionCardClassName
      }
    >
      <span
        className={cn(
          'grid h-12 w-12 shrink-0 place-items-center rounded-[10px] border',
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
            'block font-sans text-[1.0625rem] font-medium leading-[1.35] tracking-[-0.015em]',
            isPrimary ? 'text-[#050505]' : 'text-[#f5f0e8]',
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            'mt-1 block font-sans text-[0.875rem] font-normal leading-[1.5] tracking-[-0.01em]',
            isPrimary ? 'text-[#050505]/60' : 'text-[#b8afa2]',
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
            <span className="truncate font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5f0e8]">
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
            className="inline-flex min-h-11 max-w-[46vw] items-center truncate font-sans text-[0.875rem] font-medium leading-none tracking-[-0.01em] text-[#b8afa2] transition-colors hover:text-[#f5f0e8] focus-visible:rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:max-w-none"
          >
            {config.handle}
          </Link>
        </header>

        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-1 flex-col justify-center py-6"
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

          <h1 className="mt-6 max-w-[19ch] text-balance font-sans text-[clamp(2rem,8vw,2.8rem)] font-medium leading-[1.02] tracking-[-0.045em] text-[#f5f0e8]">
            Grow your business with Prism
          </h1>

          <p className="mt-4 max-w-[40ch] text-pretty font-sans text-[1rem] font-normal leading-[1.6] tracking-[-0.01em] text-[#cfc7ba]">
            We implement the strategies and tactics we post about to level up
            your business.
          </p>

          <p className="mt-3 font-sans text-[0.875rem] font-normal leading-[1.5] tracking-[-0.01em] text-[#b8afa2]">
            <span className="whitespace-nowrap">{config.proofStrip[0]}</span>
            {' · '}
            <span className="whitespace-nowrap">{config.proofStrip[1]}</span>
          </p>

          <nav aria-label={`${config.label} page actions`} className="mt-7">
            <p
              aria-hidden="true"
              className="font-sans text-[0.8125rem] font-medium leading-[1.4] tracking-[-0.01em] text-[#f5f0e8]"
            >
              Doing under $1M a year?
            </p>
            <div className="mt-2">
              <ActionCard
                title="Premium Website Design"
                detail="rank on ChatGPT and Google"
                ariaLabel="Premium Website Design, for businesses under $1M a year. Rank on ChatGPT and Google."
                href="/website-intake"
                tone="primary"
                location={actionsLocation}
                icon={
                  <PixelishIcon
                    src="/pixelish/browser.svg"
                    alt=""
                    size={17}
                    aria-hidden="true"
                    invert={false}
                  />
                }
              />
            </div>

            <p
              aria-hidden="true"
              className="mt-5 font-sans text-[0.8125rem] font-medium leading-[1.4] tracking-[-0.01em] text-[#f5f0e8]"
            >
              Doing $1M–$10M a year?
            </p>
            <div className="mt-2">
              <ActionCard
                title="Prism Infinity"
                detail="unlimited design, web, content, and ads"
                ariaLabel="Prism Infinity, for businesses doing $1M–$10M a year. Unlimited design, web, content, and ads."
                href="/prism-infinity"
                location={actionsLocation}
                icon={
                  <PixelishIcon
                    src="/pixelish/arrow-refresh.svg"
                    alt=""
                    size={16}
                    aria-hidden="true"
                  />
                }
              />
            </div>

            <div className="mt-4 border-t border-white/12 pt-4">
              <ActionCard
                title="Refer a friend"
                detail="You get $100 when they become a client"
                href="/refer"
                location={actionsLocation}
                icon={
                  <PixelishIcon
                    src="/pixelish/currency-dollar.svg"
                    alt=""
                    size={16}
                    aria-hidden="true"
                  />
                }
              />
            </div>
          </nav>
        </main>

        <footer className="flex items-center justify-end gap-4 border-t border-white/12 py-6 font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.18em]">
          <span className="shrink-0 text-[#8f877b]">© prism</span>
        </footer>
      </div>
    </div>
  )
}
