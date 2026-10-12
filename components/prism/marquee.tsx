import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type MarqueeProps = {
  children: ReactNode
  className?: string
  /** Seconds for one full loop. */
  duration?: number
  /** Gap between items (any CSS length). */
  gap?: string
  reverse?: boolean
  pauseOnHover?: boolean
  vertical?: boolean
  /** Fade the leading and trailing edges. */
  fade?: boolean
  /** Accessible name for the rail. The duplicate copy is always aria-hidden. */
  label?: string
}

/**
 * CSS-only infinite marquee (server component). Children render twice and
 * each copy translates by its own length plus the gap, so the loop is
 * seamless at any width. Reduced motion: the rail is simply static.
 */
export function Marquee({
  children,
  className,
  duration = 40,
  gap = '1rem',
  reverse = false,
  pauseOnHover = true,
  vertical = false,
  fade = true,
  label,
}: MarqueeProps) {
  return (
    <div
      role={label ? 'region' : undefined}
      aria-label={label}
      data-reverse={reverse ? 'true' : 'false'}
      data-pause-on-hover={pauseOnHover ? 'true' : 'false'}
      className={cn(
        'prism-marquee flex overflow-hidden',
        vertical ? 'flex-col' : 'flex-row',
        fade && (vertical ? 'mask-fade-y' : 'mask-fade-x'),
        className,
      )}
      style={
        {
          gap,
          '--marquee-gap': gap,
          '--marquee-duration': `${duration}s`,
        } as CSSProperties
      }
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1 ? true : undefined}
          // The duplicate exists only to close the loop: never a tab stop.
          inert={copy === 1 ? true : undefined}
          data-axis={vertical ? 'y' : 'x'}
          className={cn(
            'prism-marquee-track flex shrink-0 [will-change:transform]',
            vertical ? 'flex-col' : 'flex-row',
          )}
          style={{ gap }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}

export default Marquee
