import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import HomeCountUp from '@/components/home/HomeCountUp'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { cn } from '@/lib/utils'

type ProofMetricCardProps = {
  value: string
  label: string
  client: string
  href: string
  sourceName?: string
  dateRange?: string
  beam?: boolean
  className?: string
}

/**
 * One verified client result (from getCaseStudyMetric) with its source and
 * measurement window printed right under the number.
 */
export function ProofMetricCard({
  value,
  label,
  client,
  href,
  sourceName,
  dateRange,
  beam = false,
  className,
}: ProofMetricCardProps) {
  return (
    <SpotlightCard
      beam={beam}
      className={cn(
        'group/metric relative flex flex-col p-7 sm:p-8',
        className,
      )}
    >
      <p className="text-eyebrow text-subtle">{client}</p>
      <p className="mt-8 text-[clamp(3.5rem,2.6rem+3vw,5.5rem)] font-semibold leading-none tracking-[-0.06em] text-foreground">
        <HomeCountUp value={value} />
      </p>
      <p className="mt-5 max-w-[34ch] text-pretty text-[15px] leading-7 text-muted-foreground">
        {label}
      </p>
      <div className="mt-auto flex flex-col gap-4 pt-8">
        {sourceName ? (
          <p className="border-t border-white/[0.08] pt-4 font-mono text-[11px] leading-5 text-subtle">
            Source: {sourceName}
            {dateRange ? (
              <>
                <br />
                {dateRange}
              </>
            ) : null}
          </p>
        ) : null}
        <Link
          href={href}
          className="inline-flex w-fit items-center gap-1.5 rounded-sm text-sm font-medium text-foreground after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-hidden focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50"
        >
          Read the case study
          <span className="sr-only"> for {client}</span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover/metric:-translate-y-0.5 group-hover/metric:translate-x-0.5"
          />
        </Link>
      </div>
    </SpotlightCard>
  )
}

export default ProofMetricCard
