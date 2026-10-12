'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { trackNavigation } from '@/utils/analytics'

export type WorkFilter = {
  key: string
  label: string
  count: number
}

export type WorkGalleryItem = {
  slug: string
  group: string
  featured?: boolean
  /** Server-rendered WorkCard. */
  card: ReactNode
}

type CaseStudiesListProps = {
  filters: WorkFilter[]
  items: WorkGalleryItem[]
  /** Optional closing tile (server-rendered), shown after every filter. */
  closingTile?: ReactNode
}

const ALL = 'all'

const FADE = '2.5rem'

/** Edge fade for the scrollable filter row: only on the side with more chips. */
function fadeMask(left: boolean, right: boolean) {
  if (!left && !right) return undefined
  const start = left ? `transparent 0, black ${FADE}` : 'black 0'
  const end = right ? `black calc(100% - ${FADE}), transparent 100%` : 'black 100%'
  return `linear-gradient(to right, ${start}, ${end})`
}

/**
 * Industry filter for the Work gallery. Cards are rendered on the server and
 * passed in; this island only owns the active filter. The server HTML shows
 * every card ("All"), so crawlers and no-JS visitors see the full index.
 *
 * Below 1024px the gallery is two columns: regular cards are half-width
 * tiles (compact under 640px), featured cards and the closing tile span the
 * row, and an odd last tile spans the row so the grid never leaves a hole.
 * The filter row scrolls sideways on small screens with an edge fade on
 * whichever side has more chips.
 */
export default function CaseStudiesList({
  filters,
  items,
  closingTile,
}: CaseStudiesListProps) {
  const [active, setActive] = useState<string>(ALL)
  const [interacted, setInteracted] = useState(false)
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  // Server frame: chips start at the left edge, so only the right can hide
  // more. The effect corrects this once the real widths are known.
  const [edges, setEdges] = useState({ left: false, right: true })

  const measure = useCallback(() => {
    const node = scrollerRef.current
    if (!node) return
    const max = node.scrollWidth - node.clientWidth
    const next = { left: node.scrollLeft > 4, right: node.scrollLeft < max - 4 }
    setEdges((prev) =>
      prev.left === next.left && prev.right === next.right ? prev : next,
    )
  }, [])

  useEffect(() => {
    measure()
    const node = scrollerRef.current
    if (!node || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [measure])

  const mask = fadeMask(edges.left, edges.right)

  const tabs = [{ key: ALL, label: 'All', count: items.length }, ...filters].filter(
    (tab) => tab.count > 0,
  )

  return (
    <Tabs
      value={active}
      onValueChange={(value) => {
        setActive(value)
        setInteracted(true)
        trackNavigation('case_study_filter', value)
      }}
      className="gap-8 sm:gap-10"
    >
      <div
        ref={scrollerRef}
        onScroll={measure}
        style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
        className="-mx-5 overflow-x-auto overscroll-x-contain px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        <TabsList
          aria-label="Filter work by industry"
          className="w-max rounded-full border-white/[0.08] bg-white/[0.03] p-1"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="h-10 gap-2 px-4 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-0"
            >
              {tab.label}
              <span className="font-mono text-[11px] tabular-nums text-subtle">
                {tab.count}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => {
        const visible =
          tab.key === ALL ? items : items.filter((item) => item.group === tab.key)
        const regular = visible.filter((item) => !item.featured)
        const lastRegular =
          regular.length % 2 === 1 ? regular[regular.length - 1]?.slug : undefined
        return (
          <TabsContent
            key={tab.key}
            value={tab.key}
            className="grid grid-flow-row-dense grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3"
          >
            {visible.map((item) => (
              <div
                key={item.slug}
                className={cn(
                  'min-w-0',
                  item.featured && 'col-span-2',
                  item.slug === lastRegular && 'max-lg:col-span-2',
                  interacted &&
                    'motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500',
                )}
              >
                {item.card}
              </div>
            ))}
            {closingTile ? (
              <div className="col-span-2 min-w-0 lg:col-span-1">{closingTile}</div>
            ) : null}
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
