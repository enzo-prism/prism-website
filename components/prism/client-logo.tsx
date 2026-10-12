import type { CSSProperties } from 'react'

import type { ClientLogo as ClientLogoRecord } from '@/lib/client-logos'
import { cn } from '@/lib/utils'

type ClientLogoProps = {
  logo: ClientLogoRecord
  /**
   * Visual area in px² each mark should occupy. Square marks and long
   * wordmarks get the same optical weight (width = sqrt(area * aspect)).
   */
  area?: number
  /** Caps for extreme aspect ratios, in px. */
  maxWidth?: number
  maxHeight?: number
  className?: string
}

/** Optical sizing for a logo wall: equal area, capped at the extremes. */
export function logoBox(
  aspect: number,
  area: number,
  maxWidth: number,
  maxHeight: number,
) {
  let width = Math.sqrt(area * aspect)
  let height = width / aspect
  if (height > maxHeight) {
    height = maxHeight
    width = height * aspect
  }
  if (width > maxWidth) {
    width = maxWidth
    height = width / aspect
  }
  return { width: Math.round(width), height: Math.round(height) }
}

/**
 * A client's real logo, tinted by `currentColor` through a CSS mask so every
 * mark on the dark canvas reads as one quiet, even row. Clients without a
 * usable logo file fall back to their name set in Geist.
 */
export function ClientLogo({
  logo,
  area = 3400,
  maxWidth = 176,
  maxHeight = 56,
  className,
}: ClientLogoProps) {
  const nameClass =
    'whitespace-nowrap text-[15px] font-medium leading-none tracking-[-0.025em]'

  if (!logo.file) {
    return (
      <span
        className={cn('inline-flex shrink-0 items-center', nameClass, className)}
        style={{ height: maxHeight }}
      >
        {logo.name}
      </span>
    )
  }

  // A nameless mark is set small beside the client's name.
  const box = logo.withName
    ? logoBox(logo.aspect, area * 0.36, maxWidth, maxHeight)
    : logoBox(logo.aspect, area, maxWidth, maxHeight)

  return (
    <span
      role="img"
      aria-label={logo.name}
      className={cn('inline-flex shrink-0 items-center gap-2.5', className)}
      style={{ height: maxHeight }}
    >
      {logo.withName ? (
        <span aria-hidden="true" className={cn('order-2', nameClass)}>
          {logo.name}
        </span>
      ) : null}
      <span
        aria-hidden="true"
        className="block bg-current"
        style={
          {
            width: box.width,
            height: box.height,
            WebkitMask: `url("${logo.file}") center / contain no-repeat`,
            mask: `url("${logo.file}") center / contain no-repeat`,
          } as CSSProperties
        }
      />
    </span>
  )
}

export default ClientLogo
