import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Section } from '@/components/prism/section'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import { PrismMark } from '@/components/prism/prism-logo'
import WaitlistIntakeMonth from '@/components/waitlist/WaitlistIntakeMonth'
import { CAPACITY_MESSAGE } from '@/lib/waitlist'
import { cn } from '@/lib/utils'

type FinalCtaProps = {
  /** Analytics location for the CTA, e.g. "home final cta". */
  location: string
  title?: ReactNode
  description?: ReactNode
  href?: string
  secondary?: { label: string; href: string }
  className?: string
  headingId?: string
}

/**
 * The closing band on every core route: live status, a lowercase headline
 * that names the next intake month, the shared capacity copy, and the
 * waitlist CTA, lit from below by the spectrum.
 */
export function FinalCta({
  location,
  title,
  description,
  href,
  secondary,
  className,
  headingId = 'final-cta-heading',
}: FinalCtaProps) {
  return (
    <Section
      className={cn('pt-8 sm:pt-12', className)}
      aria-labelledby={headingId}
    >
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-4 pb-16 pt-14 text-center sm:px-12 sm:pb-24 sm:pt-20">
        <div
          aria-hidden="true"
          className="bg-grid absolute inset-0 -z-10 opacity-60"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(50%_60%_at_20%_100%,oklch(0.66_0.21_29/28%),transparent_70%),radial-gradient(45%_60%_at_50%_100%,oklch(0.86_0.15_90/18%),transparent_70%),radial-gradient(50%_60%_at_80%_100%,oklch(0.66_0.16_258/30%),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-[10%] bottom-0 -z-10 h-px bg-spectrum opacity-80 blur-[0.5px]"
        />
        <div
          aria-hidden="true"
          className="bg-noise absolute inset-0 -z-10 opacity-[0.07]"
        />

        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <span
            aria-hidden="true"
            className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-background/60 shadow-[0_0_40px_-8px_oklch(0.66_0.16_258/55%)]"
          >
            <PrismMark className="size-8" />
          </span>
          <h2
            id={headingId}
            className="text-title text-gradient mt-7 max-w-[16ch] text-balance pb-1"
          >
            {title ?? (
              <>
                get on the list for <WaitlistIntakeMonth />.
              </>
            )}
          </h2>
          <p className="text-lead mt-5 max-w-[46ch] text-pretty text-muted-foreground">
            {description ?? (
              <>
                {CAPACITY_MESSAGE.headline} {CAPACITY_MESSAGE.intakeLead}{' '}
                <WaitlistIntakeMonth />. {CAPACITY_MESSAGE.intakeTail}
              </>
            )}
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <WaitlistButton location={location} href={href} size="xl" />
            {secondary ? (
              <Link
                href={secondary.href}
                className="group/secondary inline-flex h-13 items-center gap-2 rounded-full px-6 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {secondary.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover/secondary:translate-x-0.5"
                />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default FinalCta
