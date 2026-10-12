import { cn } from '@/lib/utils'

type PrismMarkProps = {
  className?: string
  /** Decorative by default; pass a title when the mark stands alone. */
  title?: string
}

/**
 * The Prism chevron, redrawn as vector from /prism-logo.jpeg: a white
 * caret with the cyan and magenta fringes of light splitting at its edges.
 */
export function PrismMark({ className, title }: PrismMarkProps) {
  const path = 'M10 41 L24 7 L38 41 L31.6 41 L24 22.6 L16.4 41 Z'
  return (
    <svg
      viewBox="0 0 48 48"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      className={cn('size-6', className)}
    >
      {title ? <title>{title}</title> : null}
      <path
        d={path}
        fill="#5cdcff"
        opacity="0.85"
        transform="translate(-1.1 0.4)"
      />
      <path
        d={path}
        fill="#ff45cf"
        opacity="0.85"
        transform="translate(1.1 0.4)"
      />
      <path d={path} fill="#ffffff" />
    </svg>
  )
}

type PrismLogoProps = {
  className?: string
  markClassName?: string
  wordmarkClassName?: string
}

export function PrismLogo({
  className,
  markClassName,
  wordmarkClassName,
}: PrismLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        data-testid="navbar-logo-mark"
        className="relative grid size-8 place-items-center rounded-[10px] border border-white/10 bg-black shadow-[0_0_0_1px_oklch(0_0_0/60%),0_8px_24px_-10px_oklch(1_0_0/25%)]"
      >
        <PrismMark className={cn('size-[22px]', markClassName)} />
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
