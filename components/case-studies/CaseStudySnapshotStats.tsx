import { BadgeCheck } from 'lucide-react'

import HomeCountUp from '@/components/home/HomeCountUp'
import type { CaseStudyResultMetric } from '@/lib/case-study-data'
import { cn } from '@/lib/utils'

export type SnapshotFact = {
  label: string
  value: string
  detail?: string
  /** Render the value at number scale (counts like "6"). */
  numeric?: boolean
}

type CaseStudySnapshotStatsProps = {
  /** Verified, source-attributed metric. Never pass an estimate. */
  metric?: CaseStudyResultMetric
  facts: SnapshotFact[]
  className?: string
  ariaLabel?: string
}

/**
 * The stats band under a case study hero. A verified metric (value, label,
 * source, window) leads when one exists; otherwise the band shows delivered
 * work facts that already live in the data. It never shows estimates.
 */
export default function CaseStudySnapshotStats({
  metric,
  facts,
  className,
  ariaLabel = 'Project snapshot',
}: CaseStudySnapshotStatsProps) {
  const cells = facts.slice(0, metric ? 3 : 4)
  if (!metric && cells.length === 0) return null

  // Facts sit two-up on small screens; an odd last fact spans the row so the
  // hairline grid never shows an empty cell.
  const oddTail = cells.length % 2 === 1

  return (
    <section aria-label={ariaLabel} className={cn('relative pb-4 pt-6 sm:pt-10', className)}>
      <div className="prism-container">
        <dl
          className={cn(
            'grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset]',
            metric
              ? 'lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]'
              : cells.length >= 4
                ? 'lg:grid-cols-4'
                : cells.length === 3
                  ? 'lg:grid-cols-3'
                  : '',
          )}
        >
          {metric ? (
            <div className="spectrum-rule relative col-span-2 bg-card p-6 sm:p-7 lg:col-span-1">
              <dt className="text-eyebrow text-subtle">Verified result</dt>
              <dd className="mt-4">
                <HomeCountUp
                  value={metric.value}
                  className="text-5xl font-semibold tracking-[-0.05em] text-foreground sm:text-6xl"
                />
              </dd>
              <dd className="mt-3 max-w-[34ch] text-sm leading-6 text-muted-foreground">
                {metric.label}
              </dd>
              {metric.sourceName || metric.dateRange ? (
                <dd className="mt-4 flex items-start gap-2 text-xs leading-5 text-subtle">
                  <BadgeCheck aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                  <span>
                    {[metric.sourceName, metric.dateRange].filter(Boolean).join(', ')}
                  </span>
                </dd>
              ) : null}
            </div>
          ) : null}

          {cells.map((fact, index) => (
            <div
              key={fact.label}
              className={cn(
                'flex flex-col bg-card p-5 sm:p-6',
                oddTail && index === cells.length - 1 && 'col-span-2 lg:col-span-1',
              )}
            >
              <dt className="text-eyebrow text-subtle">{fact.label}</dt>
              <dd
                className={cn(
                  'mt-4 text-foreground',
                  fact.numeric
                    ? 'text-4xl font-semibold tracking-[-0.045em] sm:text-5xl'
                    : 'text-lg font-semibold leading-snug tracking-[-0.02em]',
                )}
              >
                {fact.value}
              </dd>
              {fact.detail ? (
                <dd className="mt-2 text-[13px] leading-5 text-muted-foreground">
                  {fact.detail}
                </dd>
              ) : null}
            </div>
          ))}
        </dl>
        {metric?.detail ? (
          <p className="mt-3 text-xs leading-5 text-subtle">{metric.detail}</p>
        ) : null}
      </div>
    </section>
  )
}
