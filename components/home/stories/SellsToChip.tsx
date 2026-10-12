import { Building2, Users } from 'lucide-react'

import type { HomepageStory } from '@/components/home/homepage-content'
import { cn } from '@/lib/utils'

export const SELLS_TO_LABEL: Record<HomepageStory['sellsTo'], string> = {
  consumers: 'Sells to consumers',
  businesses: 'Sells to businesses',
}

/** Mono "SELLS TO …" chip shared by the story panels and the legend. */
export function SellsToChip({
  sellsTo,
  className,
}: {
  sellsTo: HomepageStory['sellsTo']
  className?: string
}) {
  const Icon = sellsTo === 'businesses' ? Building2 : Users
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] pl-2.5 pr-3 font-mono text-[10.5px] font-medium uppercase leading-none tracking-[0.14em] text-muted-foreground',
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.6} />
      {SELLS_TO_LABEL[sellsTo]}
    </span>
  )
}
