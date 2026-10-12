import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, BadgeCheck, Play } from 'lucide-react'

import type { CaseStudyResultMetric } from '@/lib/case-study-data'
import { cn } from '@/lib/utils'

export type WorkCardProps = {
  slug: string
  client: string
  industry: string
  location: string
  description?: string
  screenshotSrc?: string
  host?: string
  /** Verified, source-attributed metric. Only pass published values. */
  metric?: CaseStudyResultMetric
  hasExplainerVideo?: boolean
  /** Wide card (spans two columns at lg) for studies with a verified metric. */
  featured?: boolean
  /**
   * Below 640px, render the half-width gallery tile: tighter stage, smaller
   * chrome and title, industry only. Featured cards keep the full layout.
   */
  compactOnMobile?: boolean
  headingLevel?: 'h2' | 'h3'
  className?: string
}

/**
 * Gallery card for the Work section: the live site in window chrome on a lit
 * stage, then client, industry, location, and the verified metric when one
 * exists. Server component; the hover lift and zoom are CSS transforms.
 */
export function WorkCard({
  slug,
  client,
  industry,
  location,
  description,
  screenshotSrc,
  host,
  metric,
  hasExplainerVideo = false,
  featured = false,
  compactOnMobile = false,
  headingLevel: Heading = 'h3',
  className,
}: WorkCardProps) {
  const compact = compactOnMobile && !featured

  return (
    <Link
      href={`/case-studies/${slug}`}
      className={cn(
        'group/work relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-[transform,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.18] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50',
        className,
      )}
    >
      <div
        className={cn(
          'relative isolate overflow-hidden border-b border-white/[0.06] px-5 pt-5 sm:px-7 sm:pt-7',
          compact && 'max-sm:px-3 max-sm:pt-3',
          featured ? 'aspect-[16/11] md:aspect-[3/1]' : 'aspect-[16/11]',
        )}
      >
        {hasExplainerVideo ? (
          <span
            className={cn(
              'absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-background/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur-md',
              compact && 'max-sm:right-1.5 max-sm:top-1.5 max-sm:px-1.5 max-sm:py-1',
            )}
          >
            <Play aria-hidden="true" className="size-3 fill-current" />
            <span className={cn(compact && 'max-sm:sr-only')}>Video</span>
          </span>
        ) : null}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_50%_0%,oklch(1_0_0/7%),transparent_70%)]"
        />
        <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 opacity-40 mask-fade-b" />
        {featured ? (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(45%_70%_at_30%_100%,oklch(0.66_0.16_258/16%),transparent_70%),radial-gradient(40%_70%_at_75%_100%,oklch(0.66_0.21_29/12%),transparent_70%)]"
          />
        ) : null}

        {screenshotSrc ? (
          <figure
            className={cn(
              'mx-auto overflow-hidden rounded-t-lg border border-b-0 border-white/10 bg-popover shadow-[0_30px_60px_-30px_oklch(0_0_0/90%)] transition-transform duration-500 ease-out group-hover/work:-translate-y-1 group-hover/work:scale-[1.015]',
              featured ? 'md:max-w-[44rem]' : '',
            )}
          >
            <div
              className={cn(
                'flex h-6 items-center gap-1.5 border-b border-white/[0.06] px-2.5',
                compact && 'max-sm:h-3.5 max-sm:gap-1 max-sm:px-1.5 max-sm:[&>span]:size-1',
              )}
              aria-hidden="true"
            >
              <span className="size-1.5 rounded-full bg-white/15" />
              <span className="size-1.5 rounded-full bg-white/15" />
              <span className="size-1.5 rounded-full bg-white/15" />
              {host ? (
                <span
                  className={cn(
                    'mx-auto max-w-[60%] truncate rounded bg-white/[0.05] px-2 py-px font-mono text-[9px] text-subtle',
                    compact && 'max-sm:hidden',
                  )}
                >
                  {host}
                </span>
              ) : null}
            </div>
            <Image
              src={screenshotSrc}
              alt={`${client} website built by Prism`}
              width={2880}
              height={1800}
              sizes={
                featured
                  ? '(min-width: 1024px) 704px, (min-width: 768px) 90vw, 92vw'
                  : compact
                    ? '(min-width: 1024px) 340px, (min-width: 640px) 45vw, 46vw'
                    : '(min-width: 1024px) 340px, (min-width: 768px) 45vw, 92vw'
              }
              className="block h-auto w-full"
            />
          </figure>
        ) : null}
      </div>

      <div
        className={cn(
          'flex flex-1 flex-col gap-4 p-5 sm:p-6',
          compact && 'max-sm:gap-2 max-sm:px-3.5 max-sm:pb-4 max-sm:pt-3.5',
          featured && 'md:flex-row md:items-end md:justify-between md:gap-10',
        )}
      >
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <Heading
              className={cn(
                'text-lg font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-xl',
                compact && 'max-sm:text-[15px] max-sm:leading-[1.2] max-sm:tracking-[-0.015em]',
              )}
            >
              {client}
            </Heading>
            <ArrowUpRight
              aria-hidden="true"
              className={cn(
                'mt-0.5 size-4 shrink-0 text-subtle transition-[transform,color] duration-300 group-hover/work:-translate-y-0.5 group-hover/work:translate-x-0.5 group-hover/work:text-foreground',
                featured && 'md:hidden',
                compact && 'max-sm:hidden',
              )}
            />
          </div>
          <p
            className={cn(
              'mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-subtle',
              compact && 'max-sm:mt-1 max-sm:text-xs',
            )}
          >
            <span>{industry}</span>
            <span
              aria-hidden="true"
              className={cn('size-0.5 rounded-full bg-current', compact && 'max-sm:hidden')}
            />
            <span className={cn(compact && 'max-sm:hidden')}>{location}</span>
          </p>
          {featured && description ? (
            <p className="mt-3 max-w-[46ch] text-pretty text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        {metric ? (
          <div
            className={cn(
              'mt-auto border-t border-white/[0.06] pt-4',
              featured && 'md:mt-0 md:min-w-[15rem] md:border-l md:border-t-0 md:pl-8 md:pt-0',
            )}
          >
            <p className="flex items-baseline gap-2">
              <span
                className={cn(
                  'font-semibold tracking-[-0.04em] text-foreground',
                  featured ? 'text-4xl sm:text-5xl' : 'text-2xl',
                )}
              >
                {metric.value}
              </span>
            </p>
            <p className="mt-1.5 max-w-[30ch] text-[13px] leading-5 text-muted-foreground">
              {metric.label}
            </p>
            {metric.sourceName ? (
              <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-subtle">
                <BadgeCheck aria-hidden="true" className="size-3.5" />
                {metric.sourceName}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </Link>
  )
}

export default WorkCard
