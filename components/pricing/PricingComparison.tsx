import { Check, Minus } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { PricingOfferId } from '@/lib/pricing-model'
import { cn } from '@/lib/utils'

export type ComparisonValue = boolean | string

export type ComparisonRow = {
  label: string
  values: Record<PricingOfferId, ComparisonValue>
}

type PricingComparisonProps = {
  columns: readonly { offerId: PricingOfferId; name: string; featured?: boolean }[]
  rows: readonly ComparisonRow[]
}

function ComparisonCell({ value }: { value: ComparisonValue }) {
  if (value === true) {
    return (
      <>
        <Check aria-hidden="true" className="size-[18px] text-foreground" />
        <span className="sr-only">Included</span>
      </>
    )
  }
  if (value === false) {
    return (
      <>
        <Minus aria-hidden="true" className="size-4 text-white/20" />
        <span className="sr-only">Not included</span>
      </>
    )
  }
  return <span className="text-[13px] leading-5 text-muted-foreground">{value}</span>
}

/**
 * shadcn Table comparing what each packaged offer includes. The first column
 * stays pinned while the table scrolls sideways on small screens.
 */
export function PricingComparison({ columns, rows }: PricingComparisonProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset]">
      <Table className="min-w-[46rem] table-fixed">
        <caption className="sr-only">
          What each Prism offer includes. No public prices; every plan is scoped from
          the waitlist.
        </caption>
        <TableHeader>
          <TableRow className="border-white/[0.08] hover:bg-transparent">
            <TableHead className="sticky left-0 z-10 h-14 w-[10.5rem] bg-card pl-5 sm:w-[34%] sm:pl-6">
              <span className="text-eyebrow text-subtle">What&apos;s included</span>
            </TableHead>
            {columns.map((column) => (
              <TableHead
                key={column.offerId}
                scope="col"
                className={cn(
                  'h-14 px-4 text-[14px] font-semibold tracking-[-0.01em] text-foreground',
                  column.featured && 'bg-white/[0.025]',
                )}
              >
                {column.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.label}
              className="border-white/[0.06] hover:bg-white/[0.015]"
            >
              <TableHead
                scope="row"
                className="sticky left-0 z-10 h-auto bg-card py-4 pl-5 text-[14px] font-normal text-foreground/90 sm:pl-6"
              >
                {row.label}
              </TableHead>
              {columns.map((column) => (
                <TableCell
                  key={column.offerId}
                  className={cn(
                    'px-4 py-4 align-middle',
                    column.featured && 'bg-white/[0.025]',
                  )}
                >
                  <ComparisonCell value={row.values[column.offerId]} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default PricingComparison
