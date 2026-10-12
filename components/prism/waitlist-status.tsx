import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import WaitlistIntakeMonth from '@/components/waitlist/WaitlistIntakeMonth'
import { WAITLIST_CTA } from '@/lib/waitlist'
import { cn } from '@/lib/utils'

type WaitlistStatusProps = {
  className?: string
  /** Render as a link to /waitlist (hero use) or as static status text. */
  asLink?: boolean
}

/**
 * The live capacity pill: green dot, "Fully booked", and the next intake
 * month from the visitor's own clock (never hard-coded; see lib/waitlist.ts).
 */
export function WaitlistStatus({
  className,
  asLink = true,
}: WaitlistStatusProps) {
  const body = (
    <>
      <span className="prism-live-dot" aria-hidden="true" />
      <span className="text-foreground">Fully booked</span>
      <span aria-hidden="true" className="h-3.5 w-px bg-white/15" />
      <span className="text-muted-foreground">
        Waitlist open for <WaitlistIntakeMonth />
      </span>
      {asLink ? (
        <ArrowRight
          aria-hidden="true"
          className="size-3.5 text-muted-foreground transition-transform duration-200 group-hover/status:translate-x-0.5 group-hover/status:text-foreground"
        />
      ) : null}
    </>
  )

  const classes = cn(
    'group/status inline-flex max-w-full items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] py-2 pl-3 pr-3.5 text-[12px] font-medium tracking-[-0.01em] sm:gap-2.5 sm:text-[13px] shadow-[0_1px_0_0_oklch(1_0_0/6%)_inset] backdrop-blur-md',
    asLink && 'transition-colors hover:border-white/20 hover:bg-white/[0.07]',
    className,
  )

  if (!asLink) {
    return (
      <p role="status" className={classes}>
        {body}
      </p>
    )
  }

  return (
    <Link href={WAITLIST_CTA.href} className={classes}>
      {body}
    </Link>
  )
}

export default WaitlistStatus
