'use client'

import { Check, Minus } from 'lucide-react'
import { useState } from 'react'

import type { ComparisonRow } from '@/components/pricing/PricingComparison'
import type { PricingOfferId } from '@/lib/pricing-model'
import { cn } from '@/lib/utils'

type PricingComparisonCardsProps = {
  columns: readonly {
    offerId: PricingOfferId
    name: string
    featured?: boolean
  }[]
  rows: readonly ComparisonRow[]
  className?: string
}

/**
 * The comparison on phones: a sticky switcher picks one plan, and its
 * inclusions read as one stacked card (no sideways table). md+ shows the
 * full table instead (PricingComparison).
 */
export function PricingComparisonCards({
  columns,
  rows,
  className,
}: PricingComparisonCardsProps) {
  const [selected, setSelected] = useState<PricingOfferId>(
    (columns.find((column) => column.featured) ?? columns[0]).offerId,
  )
  const plan =
    columns.find((column) => column.offerId === selected) ?? columns[0]
  const panelId = 'pricing-compare-card'

  return (
    <div className={className}>
      {/* Solid strip from the header down, so rows never show through. */}
      <div className="sticky top-[var(--prism-header-height,64px)] z-10 -mx-5 bg-background px-5 py-2 sm:-mx-8 sm:px-8">
        <div
          role="group"
          aria-label="Choose a plan to compare"
          className="grid grid-cols-4 gap-1 rounded-2xl border border-white/[0.1] bg-card p-1"
        >
          {columns.map((column) => {
            const active = column.offerId === selected
            return (
              <button
                key={column.offerId}
                type="button"
                aria-pressed={active}
                aria-label={column.name}
                aria-controls={panelId}
                onClick={() => setSelected(column.offerId)}
                className={cn(
                  'min-h-11 min-w-0 rounded-xl px-1.5 text-[13px] font-medium leading-4 transition-[background-color,color,scale] duration-(--dur-press) ease-(--ease-out) focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.97]',
                  active
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {/* One word per chip so all four fit a 320px phone. */}
                {column.name.split(' ')[0]}
              </button>
            )
          })}
        </div>
      </div>

      <section
        id={panelId}
        aria-label={`${plan.name}: what's included`}
        className="mt-3 rounded-2xl border border-white/[0.08] bg-card px-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset]"
      >
        <h3 className="pb-1 pt-5 text-[1.0625rem] font-semibold tracking-[-0.02em] text-foreground">
          {plan.name}
        </h3>
        <dl key={plan.offerId} className="divide-y divide-white/[0.06]">
          {rows.map((row) => {
            const value = row.values[plan.offerId]
            return (
              <div
                key={row.label}
                className={cn(
                  'py-3.5',
                  typeof value === 'string'
                    ? 'grid gap-1'
                    : 'flex items-center justify-between gap-4',
                )}
              >
                <dt
                  className={cn(
                    'text-[14px] leading-5',
                    value === false ? 'text-subtle' : 'text-foreground/90',
                  )}
                >
                  {row.label}
                </dt>
                <dd className="shrink-0">
                  {value === true ? (
                    <>
                      <Check
                        aria-hidden="true"
                        className="size-[18px] text-foreground"
                      />
                      <span className="sr-only">Included</span>
                    </>
                  ) : value === false ? (
                    <>
                      <Minus
                        aria-hidden="true"
                        className="size-4 text-white/20"
                      />
                      <span className="sr-only">Not included</span>
                    </>
                  ) : (
                    <span className="text-[13px] leading-5 text-muted-foreground">
                      {value}
                    </span>
                  )}
                </dd>
              </div>
            )
          })}
        </dl>
      </section>
    </div>
  )
}

export default PricingComparisonCards
