import { WaitlistButton } from '@/components/prism/waitlist-button'
import { WaitlistStatus } from '@/components/prism/waitlist-status'
import { cn } from '@/lib/utils'

type InlineWaitlistCtaProps = {
  /** Analytics location for the CTA. */
  location: string
  /** One short line (sentence case or lowercase house headline). */
  title: string
  className?: string
}

/**
 * A quiet mid-page invitation: one line, the waitlist button, and the live
 * capacity pill. Used where a long proof section ends, so the waitlist is
 * never more than a scroll away. Not a heading (it does not start a section).
 */
export function InlineWaitlistCta({
  location,
  title,
  className,
}: InlineWaitlistCtaProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-5 text-center',
        className,
      )}
    >
      <p className="text-heading text-balance text-foreground">{title}</p>
      <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
        <WaitlistButton location={location} className="w-full sm:w-auto" />
        <WaitlistStatus asLink={false} />
      </div>
    </div>
  )
}

export default InlineWaitlistCta
