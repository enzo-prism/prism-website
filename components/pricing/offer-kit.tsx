import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** Small rounded icon tile shared by the offer routes. */
export function OfferIconTile({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground shadow-[0_1px_0_0_oklch(1_0_0/6%)_inset]',
        className,
      )}
    >
      {children}
    </span>
  )
}
