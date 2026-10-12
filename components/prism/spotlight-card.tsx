'use client'

import {
  forwardRef,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
} from 'react'

import { cn } from '@/lib/utils'

type SpotlightCardProps = HTMLAttributes<HTMLDivElement> & {
  /** Adds the slow spectrum border beam (rationed: one per view). */
  beam?: boolean
}

/**
 * shadcn-style card with a pointer-tracked light. The highlight is pure CSS
 * (`.prism-spotlight` in globals.css); this island only writes two custom
 * properties, so touch and no-JS visitors get the plain card.
 */
export const SpotlightCard = forwardRef<HTMLDivElement, SpotlightCardProps>(
  function SpotlightCard(
    { className, beam = false, onPointerMove, ...props },
    ref,
  ) {
    const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType === 'mouse') {
        const rect = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty(
          '--spot-x',
          `${event.clientX - rect.left}px`,
        )
        event.currentTarget.style.setProperty(
          '--spot-y',
          `${event.clientY - rect.top}px`,
        )
      }
      onPointerMove?.(event)
    }

    return (
      <div
        ref={ref}
        data-slot="card"
        onPointerMove={handlePointerMove}
        className={cn(
          'prism-spotlight overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-colors duration-300 hover:border-white/[0.16]',
          beam && 'prism-beam',
          className,
        )}
        {...props}
      />
    )
  },
)

export default SpotlightCard
