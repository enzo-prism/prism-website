import { BadgeCheck } from 'lucide-react'

import type { CaseStudyResultMetric } from '@/lib/case-study-data'

type CaseStudyResultsBandProps = {
  clientName: string
  results: CaseStudyResultMetric[]
}

/**
 * Dated, source-attributed metrics for a case study. Values are verified
 * against the named source before publishing (see CaseStudyResultMetric).
 */
export default function CaseStudyResultsBand({
  clientName,
  results,
}: CaseStudyResultsBandProps) {
  if (results.length === 0) return null

  return (
    <section
      aria-label={`Measured results for ${clientName}`}
      className="border-b border-border/60 px-4 py-14 md:py-20"
    >
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          <BadgeCheck aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
          measured results · verified
        </p>
        <div
          className={`mt-8 grid gap-8 ${results.length > 1 ? 'sm:grid-cols-2' : ''}`}
        >
          {results.map((metric) => (
            <article key={metric.label} className="space-y-3">
              <p className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
                {metric.value}
              </p>
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {metric.label}
              </p>
              {/* Source attribution sits next to the number — third-party,
                  dated sources are what make a stat credible. */}
              <p className="flex max-w-[26rem] items-start gap-2 text-sm leading-6 text-muted-foreground">
                <BadgeCheck
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-foreground/70"
                  strokeWidth={2}
                />
                <span>
                  <span className="font-semibold text-foreground/80">
                    Source:{' '}
                  </span>
                  {metric.detail}
                </span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
