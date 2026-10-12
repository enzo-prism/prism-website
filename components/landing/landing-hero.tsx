import type { CSSProperties, ReactNode } from 'react'

import { Eyebrow } from '@/components/prism/section'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import { WaitlistStatus } from '@/components/prism/waitlist-status'
import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type LandingHeroGlow = 'blue' | 'warm' | 'green' | 'violet' | 'none'

export type LandingHeroAction = {
  label: string
  href: string
  /** Analytics label; defaults to the visible label. */
  trackingLabel?: string
}

type LandingHeroProps = {
  /** Mono metadata label above the headline. */
  eyebrow?: ReactNode
  /** Lowercase display headline. Renders as the page's only h1. */
  title: ReactNode
  description?: ReactNode
  /** Analytics location shared by the hero CTAs, e.g. "seo hero". */
  location: string
  /** Waitlist href (use WAITLIST_FOCUS_HREFS for service pages). */
  ctaHref?: string
  ctaLabel?: string
  /** Hide the primary waitlist CTA (e.g. legal pages, utility pages). */
  hideCta?: boolean
  secondary?: LandingHeroAction
  /** Show the live capacity pill above the eyebrow (default true). */
  showStatus?: boolean
  align?: 'center' | 'left'
  glow?: LandingHeroGlow
  /** Small row above everything (breadcrumbs). */
  topSlot?: ReactNode
  /** Visual or proof rendered under the CTAs. */
  children?: ReactNode
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  id?: string
}

const GLOWS: Record<Exclude<LandingHeroGlow, 'none'>, string> = {
  blue: 'bg-[radial-gradient(40%_50%_at_30%_40%,oklch(0.66_0.16_258/22%),transparent_70%),radial-gradient(35%_45%_at_72%_45%,oklch(0.63_0.19_295/16%),transparent_70%)]',
  warm: 'bg-[radial-gradient(40%_50%_at_32%_42%,oklch(0.66_0.21_29/18%),transparent_70%),radial-gradient(36%_46%_at_70%_44%,oklch(0.75_0.17_55/14%),transparent_70%)]',
  green:
    'bg-[radial-gradient(40%_50%_at_30%_42%,oklch(0.76_0.17_145/14%),transparent_70%),radial-gradient(36%_46%_at_72%_44%,oklch(0.66_0.16_258/18%),transparent_70%)]',
  violet:
    'bg-[radial-gradient(40%_50%_at_30%_42%,oklch(0.63_0.19_295/18%),transparent_70%),radial-gradient(36%_46%_at_72%_44%,oklch(0.66_0.21_29/12%),transparent_70%)]',
}

function rise(delay: number): CSSProperties {
  return { '--rise-delay': `${delay}ms` } as CSSProperties
}

/**
 * Shared hero for the long-tail landers, hubs, and utility routes: optional
 * live waitlist status, mono eyebrow, a lowercase display headline, one lead
 * sentence, the waitlist CTA plus an optional outline action, and an
 * optional visual underneath. Lit by a soft glow over the grid.
 */
export function LandingHero({
  eyebrow,
  title,
  description,
  location,
  ctaHref,
  ctaLabel,
  hideCta = false,
  secondary,
  showStatus = true,
  align = 'center',
  glow = 'blue',
  topSlot,
  children,
  className,
  titleClassName,
  descriptionClassName,
  id = 'landing-hero-title',
}: LandingHeroProps) {
  const centered = align === 'center'
  const hasActions = !hideCta || Boolean(secondary)

  return (
    <section
      aria-labelledby={id}
      className={cn('relative isolate overflow-x-clip pb-14 pt-12 sm:pb-20 sm:pt-20', className)}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-x-0 top-0 h-[640px] opacity-50" />
        {glow !== 'none' ? (
          <div className={cn('absolute inset-x-0 top-0 h-[760px] blur-2xl', GLOWS[glow])} />
        ) : null}
        <div className="bg-noise absolute inset-0 opacity-[0.05]" />
      </div>

      <div className="prism-container">
        {topSlot ? <div className="mb-8 sm:mb-10">{topSlot}</div> : null}
        <div
          className={cn(
            'flex flex-col',
            centered ? 'mx-auto max-w-4xl items-center text-center' : 'max-w-4xl items-start',
          )}
        >
          {showStatus ? (
            <div className="prism-rise mb-8" style={rise(0)}>
              <WaitlistStatus />
            </div>
          ) : null}
          {eyebrow ? (
            <div className="prism-rise" style={rise(60)}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          ) : null}
          <h1
            id={id}
            className={cn(
              'prism-rise text-display text-gradient max-w-[15ch] text-balance pb-2',
              eyebrow ? 'mt-5' : null,
              titleClassName,
            )}
            style={rise(120)}
          >
            {title}
          </h1>
          {description ? (
            <p
              className={cn(
                'prism-rise text-lead mt-6 max-w-[56ch] text-pretty text-muted-foreground',
                descriptionClassName,
              )}
              style={rise(200)}
            >
              {description}
            </p>
          ) : null}
          {hasActions ? (
            <div
              className={cn(
                'prism-rise mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center',
                centered ? 'justify-center' : 'justify-start',
              )}
              style={rise(280)}
            >
              {!hideCta ? (
                <WaitlistButton location={location} href={ctaHref} label={ctaLabel} size="xl" />
              ) : null}
              {secondary ? (
                <Button asChild size="xl" variant="outline">
                  <TrackedLink
                    href={secondary.href}
                    label={secondary.trackingLabel ?? secondary.label}
                    location={location}
                  >
                    {secondary.label}
                  </TrackedLink>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>

        {children ? (
          <div className="prism-rise relative mt-14 sm:mt-20" style={rise(360)}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default LandingHero
