'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import BrandLogo from '@/components/brand-logo'
import PixelishIcon from '@/components/pixelish/PixelishIcon'
import { LOGO_CONFIG } from '@/lib/constants'
import { WEBSITE_START_CTA } from '@/lib/pricing-model'
import { SERVICE_INTAKE_PATHS } from '@/lib/service-intake'
import { PRISM_SERVICES, type PrismServiceId } from '@/lib/services'
import { cn } from '@/lib/utils'
import { trackCTAClick, trackExternalLinkClick } from '@/utils/analytics'

/**
 * Link-in-bio hub for Prism's social profiles (/tiktok, /ig, /youtube).
 *
 * Visitors arrive warm — they just watched Prism's content — so the page
 * routes intent instead of thanking them. Three service CTAs open the
 * existing Website, Content, and Ads intake forms. One quiet, shared template
 * keeps the focus on those actions.
 */

export type SocialHubPlatform = 'tiktok' | 'instagram' | 'youtube'

type PlatformConfig = {
  label: string
  handle: string
  profileHref: string
}

const PLATFORMS: Record<SocialHubPlatform, PlatformConfig> = {
  tiktok: {
    label: 'TikTok',
    handle: '@the_design_prism',
    profileHref: 'https://www.tiktok.com/@the_design_prism',
  },
  instagram: {
    label: 'Instagram',
    handle: '@the_design_prism',
    profileHref: 'https://www.instagram.com/the_design_prism/',
  },
  youtube: {
    label: 'YouTube',
    handle: '@the_design_prism',
    profileHref: 'https://www.youtube.com/@the_design_prism',
  },
}

const HUB_ACTION_HREFS: Record<PrismServiceId, string> = {
  website: WEBSITE_START_CTA.href,
  content: SERVICE_INTAKE_PATHS.content,
  ads: SERVICE_INTAKE_PATHS.ads,
}

const HUB_ACTION_ICONS: Record<PrismServiceId, string> = {
  website: '/pixelish/browser.svg',
  content: '/pixelish/device-camera.svg',
  ads: '/pixelish/graph-chart-high.svg',
}

// Shared premium hover language from the core CTA system: a gentle lift, a
// warm gold-tinted glow (#d8bc79), and the site's signature easing curve.
const actionCardClassName = cn(
  'group flex min-h-[5rem] w-full items-center gap-4 rounded-xl border px-5 py-4 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black active:translate-y-0 motion-reduce:transition-none',
  'border-white/12 bg-white/[0.03] hover:border-[#d8bc79]/35 hover:bg-white/[0.06] hover:shadow-[0_24px_48px_-30px_rgba(216,188,121,0.5)]',
)

type ActionCardProps = {
  title: string
  detail: string
  href: string
  location: string
  platform: SocialHubPlatform
  service: PrismServiceId
  icon: ReactNode
}

function ActionCard({
  title,
  detail,
  href,
  location,
  platform,
  service,
  icon,
}: ActionCardProps) {
  const label = title.toLowerCase()

  return (
    <Link
      href={href}
      onClick={() => {
        trackCTAClick(label, location, {
          platform,
          service,
          destination: href,
        })
      }}
      data-cta-text={label}
      data-cta-location={location}
      data-cta-platform={platform}
      data-cta-service={service}
      className={actionCardClassName}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[10px] border border-white/12 bg-white/[0.04] text-[#f5f0e8]">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-sans text-[1.0625rem] font-medium leading-[1.35] tracking-[-0.015em] text-[#f5f0e8]">
          {title}
        </span>
        <span className="mt-1 block font-sans text-[0.875rem] font-normal leading-[1.5] tracking-[-0.01em] text-[#b8afa2]">
          {detail}
        </span>
      </span>
      <PixelishIcon
        src="/pixelish/arrow-right.svg"
        alt=""
        size={12}
        aria-hidden="true"
        className="shrink-0 opacity-50 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:opacity-100 motion-reduce:transition-none"
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

          <nav aria-label={`${config.label} page actions`} className="mt-7">
            <ul className="flex flex-col gap-2">
              {PRISM_SERVICES.map((service) => (
                <li key={service.id}>
                  <ActionCard
                    title={service.name}
                    detail={service.navDescription}
                    href={HUB_ACTION_HREFS[service.id]}
                    location={actionsLocation}
                    platform={platform}
                    service={service.id}
                    icon={
                      <PixelishIcon
                        src={HUB_ACTION_ICONS[service.id]}
                        alt=""
                        size={17}
                        aria-hidden="true"
                      />
                    }
                  />
                </li>
              ))}
            </ul>
          </nav>
        </main>

        <footer className="flex items-center justify-end gap-4 border-t border-white/12 py-6 font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.18em]">
          <span className="shrink-0 text-[#8f877b]">© prism</span>
        </footer>
      </div>
    </div>
  )
}
