import { ArrowRight } from 'lucide-react'

import TrackedLink from '@/components/tracked-link'
import { Button, type ButtonProps } from '@/components/ui/button'
import { WAITLIST_CTA } from '@/lib/waitlist'
import { cn } from '@/lib/utils'

type WaitlistButtonProps = {
  /** Analytics location, e.g. "home_hero". */
  location: string
  href?: string
  label?: string
  size?: ButtonProps['size']
  variant?: ButtonProps['variant']
  className?: string
  /** Show the trailing arrow (default true). */
  arrow?: boolean
}

/** The one primary CTA on every redesigned route: "Join the waitlist". */
export function WaitlistButton({
  location,
  href = WAITLIST_CTA.href,
  label = WAITLIST_CTA.label,
  size = 'lg',
  variant = 'default',
  className,
  arrow = true,
}: WaitlistButtonProps) {
  return (
    <Button
      asChild
      size={size}
      variant={variant}
      className={cn('group/cta', className)}
    >
      <TrackedLink href={href} label={label} location={location}>
        {label}
        {arrow ? (
          <ArrowRight
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
          />
        ) : null}
      </TrackedLink>
    </Button>
  )
}

export default WaitlistButton
