import type { CSSProperties, ReactNode } from 'react'

import { WaitlistButton } from '@/components/prism/waitlist-button'
import { WaitlistStatus } from '@/components/prism/waitlist-status'
import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type ServiceHeroGlow = 'blue' | 'warm' | 'green' | 'violet'

type ServiceHeroProps = {
  /** Lowercase display headline (the page's only h1). */
  title: ReactNode
  /** One or two sentences; lead with the product name. */
  description: ReactNode
  /** Service-focused waitlist href, e.g. /waitlist?focus=website. */
  ctaHref: string
  /** Analytics location shared by both hero CTAs, e.g. "websites hero". */
  location: string
  secondary: { label: string; href: string; trackingLabel: string }
  /** The product shot under the copy. */
  visual: ReactNode
  /** Optional proof row under the visual. */
  footer?: ReactNode
  glow?: ServiceHeroGlow
  /**
   * `center`: stacked and centered. `split`: headline on the left, subhead
   * and CTAs on the right, so the visual rises higher on wide screens.
   */
  layout?: 'center' | 'split'
  /** Override the h1 measure, e.g. "max-w-[17ch]". */
  titleClassName?: string
  className?: string
}

const GLOWS: Record<ServiceHeroGlow, string> = {
  blue: 'bg-[radial-gradient(40%_50%_at_30%_40%,oklch(0.66_0.16_258/22%),transparent_70%),radial-gradient(35%_45%_at_72%_45%,oklch(0.63_0.19_295/18%),transparent_70%)]',
  warm: 'bg-[radial-gradient(40%_50%_at_32%_42%,oklch(0.66_0.21_29/20%),transparent_70%),radial-gradient(36%_46%_at_70%_44%,oklch(0.75_0.17_55/16%),transparent_70%)]',
  green:
    'bg-[radial-gradient(40%_50%_at_30%_42%,oklch(0.76_0.17_145/16%),transparent_70%),radial-gradient(36%_46%_at_72%_44%,oklch(0.66_0.16_258/20%),transparent_70%)]',
  violet:
    'bg-[radial-gradient(40%_50%_at_30%_40%,oklch(0.63_0.19_295/22%),transparent_70%),radial-gradient(36%_46%_at_72%_46%,oklch(0.66_0.16_258/16%),transparent_70%)]',
}

function rise(delay: number): CSSProperties {
  return { '--rise-delay': `${delay}ms` } as CSSProperties
}

/**
 * Shared launch-page hero for /websites, /content, /ads, and /aeo: live waitlist
 * status, a lowercase display headline, one subhead that names the product,
 * the service-focused waitlist CTA plus an outline anchor, then the page's
 * own product visual, which starts inside the first viewport.
 */
export function ServiceHero({
  title,
  description,
  ctaHref,
  location,
  secondary,
  visual,
  footer,
  glow = 'blue',
  layout = 'center',
  titleClassName,
  className,
}: ServiceHeroProps) {
  const split = layout === 'split'

  const actions = (
    <div
      className={cn(
        'prism-rise flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center',
        split ? 'mt-7' : 'mt-8 justify-center',
      )}
      style={rise(280)}
    >
      <WaitlistButton location={location} href={ctaHref} size="xl" />
      <Button asChild size="xl" variant="outline">
        <TrackedLink
          href={secondary.href}
          label={secondary.trackingLabel}
          location={location}
        >
          {secondary.label}
        </TrackedLink>
      </Button>
    </div>
  )

  const lead = (
    <p
      className={cn(
        'prism-rise text-lead text-pretty text-muted-foreground',
        split ? 'max-w-[44ch]' : 'mt-5 max-w-[56ch]',
      )}
      style={rise(200)}
    >
      {description}
    </p>
  )

  return (
    <section
      aria-labelledby="service-hero-title"
      className={cn(
        'relative isolate overflow-x-clip pb-16 pt-8 sm:pb-24 sm:pt-12',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="mask-fade-b pointer-events-none absolute inset-0 -z-10"
      >
        <div className="bg-grid absolute inset-x-0 top-0 h-[720px] opacity-50" />
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-[900px] blur-2xl',
            GLOWS[glow],
          )}
        />
        <div className="bg-noise absolute inset-0 opacity-[0.05]" />
      </div>

      <div className="prism-container">
        {split ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-14">
            <div className="flex min-w-0 flex-col items-start">
              <div className="prism-rise" style={rise(0)}>
                <WaitlistStatus />
              </div>
              <h1
                id="service-hero-title"
                className={cn(
                  // One step under text-display (same weight, leading, and
                  // tracking) so two short sentences hold their own lines in
                  // the left column.
                  'prism-rise text-gradient mt-6 pb-2 text-[clamp(2.85rem,1.5rem+5vw,6rem)] font-semibold leading-[0.94] tracking-[-0.055em]',
                  titleClassName,
                )}
                style={rise(120)}
              >
                {title}
              </h1>
            </div>
            <div className="flex min-w-0 flex-col items-start lg:pb-3">
              {lead}
              {actions}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <div className="prism-rise" style={rise(0)}>
              <WaitlistStatus />
            </div>
            <h1
              id="service-hero-title"
              className={cn(
                'prism-rise text-display text-gradient mt-6 max-w-[14ch] text-balance pb-2',
                titleClassName,
              )}
              style={rise(120)}
            >
              {title}
            </h1>
            {lead}
            {actions}
          </div>
        )}

        <div
          className={cn(
            'prism-rise relative',
            split ? 'mt-12 sm:mt-14' : 'mt-11 sm:mt-14',
          )}
          style={rise(360)}
        >
          {visual}
        </div>

        {footer ? <div className="mt-10 sm:mt-14">{footer}</div> : null}
      </div>
    </section>
  )
}

export default ServiceHero
