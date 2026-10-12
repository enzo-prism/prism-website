import Image from 'next/image'

import { cn } from '@/lib/utils'

type BrowserFrameProps = {
  src: string
  alt: string
  /** Host shown in the address pill, e.g. "drchriswong.com". */
  url?: string
  className?: string
  imageClassName?: string
  sizes?: string
  priority?: boolean
  /** Intrinsic size of the screenshot (defaults to the 2880x1800 captures). */
  width?: number
  height?: number
}

/**
 * Minimal window chrome around a real client screenshot. The screenshots in
 * public/case-studies/ are 2880x1800 desktop captures and 3:6.5 mobile ones.
 */
export function BrowserFrame({
  src,
  alt,
  url,
  className,
  imageClassName,
  sizes = '(min-width: 1024px) 40vw, 90vw',
  priority = false,
  width = 2880,
  height = 1800,
}: BrowserFrameProps) {
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-xl border border-white/10 bg-popover shadow-[0_30px_80px_-30px_oklch(0_0_0/90%),0_1px_0_0_oklch(1_0_0/6%)_inset]',
        className,
      )}
    >
      <div
        className="flex h-7 items-center gap-1.5 border-b border-white/[0.06] px-3"
        aria-hidden="true"
      >
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        {url ? (
          <span className="mx-auto max-w-[60%] truncate rounded-md bg-white/[0.05] px-3 py-0.5 font-mono text-[10px] text-subtle">
            {url}
          </span>
        ) : null}
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={cn('block h-auto w-full', imageClassName)}
      />
    </figure>
  )
}

export default BrowserFrame
