'use client'

import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  Clapperboard,
  Globe,
  Megaphone,
  MessageSquareQuote,
} from 'lucide-react'

import BrandLogo from '@/components/brand-logo'
import { PrismLogo } from '@/components/prism/prism-logo'
import WaitlistIntakeMonth from '@/components/waitlist/WaitlistIntakeMonth'
import { PRISM_SERVICES, type PrismServiceId } from '@/lib/services'
import { cn } from '@/lib/utils'
import { CAPACITY_MESSAGE, WAITLIST_FOCUS_HREFS } from '@/lib/waitlist'
import { trackCTAClick, trackExternalLinkClick } from '@/utils/analytics'

/**
 * Link-in-bio hub for Prism's social profiles (/tiktok, /ig, /youtube).
 *
 * Visitors arrive warm (they just watched Prism's content), so the page
 * routes intent instead of thanking them. Prism is fully booked, so the four
 * service CTAs open the waitlist with that service pre-selected. One quiet,
 * shared template keeps the focus on those actions; no audience stats.
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

const HUB_ACTION_HREFS: Record<PrismServiceId, string> = WAITLIST_FOCUS_HREFS

const HUB_ACTION_ICONS: Record<PrismServiceId, LucideIcon> = {
  website: Globe,
  content: Clapperboard,
  ads: Megaphone,
  aeo: MessageSquareQuote,
}

const focusRing =
  'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'

type ActionCardProps = {
  title: string
  detail: string
  href: string
  location: string
  platform: SocialHubPlatform
  service: PrismServiceId
  icon: LucideIcon
  featured?: boolean
}

function ActionCard({
  title,
  detail,
  href,
  location,
  platform,
  service,
  icon: Icon,
  featured = false,
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
      className={cn(
        'group/action relative flex min-h-[4.75rem] w-full items-center gap-4 rounded-2xl border border-white/[0.08] bg-card px-4 py-4 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-white/[0.16] hover:bg-white/[0.035] active:translate-y-0 motion-reduce:transition-none sm:px-5',
        featured && 'prism-beam',
        focusRing,
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground"
      >
        <Icon className="size-[18px]" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[1.0625rem] font-medium leading-[1.3] tracking-[-0.015em] text-foreground">
          {title}
        </span>
        <span className="mt-0.5 block text-[0.875rem] leading-[1.45] tracking-[-0.01em] text-muted-foreground">
          {detail}
        </span>
      </span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 shrink-0 text-subtle transition-[transform,color] duration-300 group-hover/action:translate-x-0.5 group-hover/action:text-foreground motion-reduce:transition-none"
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
    <div className="relative isolate flex min-h-dvh flex-col overflow-x-clip bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-x-0 top-0 h-[560px] opacity-60" />
        <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(45%_40%_at_30%_30%,oklch(0.66_0.16_258/20%),transparent_70%),radial-gradient(40%_38%_at_75%_35%,oklch(0.63_0.19_295/16%),transparent_70%)] blur-2xl" />
        <div className="bg-noise absolute inset-0 opacity-[0.05]" />
      </div>

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5">
        <header className="flex items-center justify-between gap-4 py-5">
          <Link
            href="/"
            aria-label="Prism home"
            data-cta-text="prism home"
            data-cta-location={headerLocation}
            className={cn('inline-flex min-w-0 items-center rounded-lg', focusRing)}
          >
            <PrismLogo />
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
            className={cn(
              'inline-flex min-h-10 max-w-[52vw] items-center truncate rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-[0.8125rem] font-medium tracking-[-0.01em] text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground sm:max-w-none',
              focusRing,
            )}
          >
            {config.handle}
          </Link>
        </header>

        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-1 flex-col justify-center py-8 sm:py-10"
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]"
            >
              <BrandLogo
                brand={platform}
                theme="dark"
                decorative
                className="h-[18px] w-[18px]"
              />
            </span>
            <p className="inline-flex items-center gap-2.5 text-eyebrow text-subtle">
              <span aria-hidden="true" className="h-px w-5 bg-spectrum" />
              From {config.label}
            </p>
          </div>

          <h1 className="text-gradient mt-7 text-balance pb-1 text-[clamp(2.5rem,10vw,3.25rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
            grow your business with Prism.
          </h1>

          <p className="mt-5 max-w-[40ch] text-pretty text-[1.0625rem] leading-[1.6] tracking-[-0.012em] text-muted-foreground">
            We implement the strategies and tactics we post about to level up
            your business.
          </p>

          <p
            role="status"
            data-capacity-notice="hub"
            className="mt-6 flex max-w-[44ch] items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-pretty text-[0.9375rem] leading-[1.55] tracking-[-0.01em] text-muted-foreground"
          >
            <span className="prism-live-dot mt-[0.45rem]" aria-hidden="true" />
            <span>
              <span className="font-medium text-foreground">
                {CAPACITY_MESSAGE.headline}
              </span>{' '}
              Join the waitlist for the service you want.{' '}
              {CAPACITY_MESSAGE.nextIntakeLead} <WaitlistIntakeMonth />.
            </span>
          </p>

          <nav aria-label={`${config.label} page actions`} className="mt-8">
            <ul className="flex flex-col gap-2.5">
              {PRISM_SERVICES.map((service, index) => (
                <li key={service.id}>
                  <ActionCard
                    title={service.name}
                    detail={service.navDescription}
                    href={HUB_ACTION_HREFS[service.id]}
                    location={actionsLocation}
                    platform={platform}
                    service={service.id}
                    icon={HUB_ACTION_ICONS[service.id]}
                    featured={index === 0}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </main>

        <footer className="flex items-center justify-between gap-4 border-t border-white/[0.08] py-6 text-[12px] text-subtle">
          <span className="font-mono uppercase tracking-[0.18em] text-[10px]">
            Websites · Content · Ads · AEO
          </span>
          <span className="shrink-0">© Prism</span>
        </footer>
      </div>
    </div>
  )
}
