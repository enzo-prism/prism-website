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
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          measured results
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
              <p className="max-w-[26rem] text-sm leading-6 text-muted-foreground/80">
                {metric.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
