import Image from 'next/image'

import { cn } from '@/lib/utils'

/**
 * The Prism logo artwork: the white chevron with its magenta and cyan
 * fringes, cut from the official logo file (Prism Logo, 2024; the same image
 * as /prism-logo.jpeg) with the black background keyed to transparency.
 * Never redraw it: /brand/prism-mark.png is the source of truth for every
 * on-site mark (header, footer, closing CTA, intake pass, blog, about).
 */
const MARK_SRC = '/brand/prism-mark.png'
const MARK_WIDTH = 360
const MARK_HEIGHT = 314

type PrismMarkProps = {
  className?: string
  /** Decorative by default; pass a title when the mark stands alone. */
  title?: string
  /** Load eagerly (above-the-fold chrome such as the header). */
  priority?: boolean
}

/**
 * The chevron on its own, centered in a square box sized by `className`
 * (default size-6). The artwork sits at ~70% of the box so the mark keeps
 * the breathing room of the original square logo.
 */
export function PrismMark({ className, title, priority = false }: PrismMarkProps) {
  return (
    <span
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn('relative inline-grid size-6 shrink-0 place-items-center', className)}
    >
      <Image
        src={MARK_SRC}
        alt=""
        width={MARK_WIDTH}
        height={MARK_HEIGHT}
        priority={priority}
        sizes="64px"
        draggable={false}
        className="pointer-events-none block h-auto w-[72%] select-none"
      />
    </span>
  )
}

type PrismLogoProps = {
  className?: string
  markClassName?: string
  wordmarkClassName?: string
}

/** The lockup: the logo square (black tile with the mark) plus "Prism". */
export function PrismLogo({
  className,
  markClassName,
  wordmarkClassName,
}: PrismLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        data-testid="navbar-logo-mark"
        className="relative grid size-8 place-items-center overflow-hidden rounded-[10px] border border-white/10 bg-black shadow-[0_0_0_1px_oklch(0_0_0/60%),0_8px_24px_-10px_oklch(1_0_0/25%)]"
      >
        <PrismMark priority className={cn('size-[26px]', markClassName)} />
      </span>
      <span
        className={cn(
          'text-[17px] font-semibold tracking-[-0.03em] text-foreground',
          wordmarkClassName,
        )}
      >
        Prism
      </span>
    </span>
  )
}

export default PrismLogo
