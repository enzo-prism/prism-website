'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, PlayCircle } from 'lucide-react'

import CoreImage from '@/components/core-image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { buildCategoryPillClasses } from '@/lib/category-styles'
import { cn } from '@/lib/utils'

type CaseStudyCardTone = 'default' | 'light'

interface CaseStudyCardProps {
  business: string
  category: string
  location: string
  slug: string
  description?: string
  clientLogo?: string
  hasExplainerVideo?: boolean
  tone?: CaseStudyCardTone
  /** Website screenshot rendered above the card body (dark tone only). */
  screenshotSrc?: string
  /** Source-verified headline metric; render only published values. */
  metric?: { value: string; label: string }
}

export default function CaseStudyCard({
  business,
  category,
  location,
  slug,
  description,
  clientLogo,
  hasExplainerVideo = false,
  tone = 'default',
  screenshotSrc,
  metric,
}: CaseStudyCardProps) {
  const isLight = tone === 'light'

  return (
    <Link
      href={`/case-studies/${slug}`}
      className="group block rounded-[1.75rem] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/60"
    >
      <Card
        className={cn(
          'relative h-full overflow-hidden border shadow-none transition-[transform,background-color,border-color,box-shadow] duration-200 hover:-translate-y-1',
          isLight
            ? 'rounded-[1.75rem] border-black/8 bg-[#ffffff] shadow-[0_18px_48px_rgba(15,23,42,0.05)] hover:border-black/12 hover:shadow-[0_24px_70px_rgba(15,23,42,0.08)]'
            : 'rounded-md bg-card/30 backdrop-blur-sm hover:bg-card/45',
        )}
      >
        {!isLight && screenshotSrc ? (
          <div className="relative aspect-[16/10] overflow-hidden border-b border-border/40 bg-muted/20">
            <Image
              src={screenshotSrc}
              alt={`${business} website built by Prism`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        ) : null}

        <CardContent
          className={cn('flex h-full flex-col', isLight ? 'p-6' : 'p-5')}
        >
          <div className="flex items-start justify-between gap-3">
            <Badge className={buildCategoryPillClasses(category, isLight ? 'light' : 'default')}>
              {category}
            </Badge>
            {isLight ? (
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/8 text-[rgba(15,23,42,0.38)]">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            ) : null}
          </div>

          {isLight && clientLogo ? (
            <div className="mt-6 flex h-12 items-center">
              <CoreImage
                src={clientLogo}
                alt={`${business} logo`}
                width={120}
                height={48}
                className="h-10 w-auto max-w-[9.5rem] object-contain object-left"
                showLoadingIndicator={false}
                disableShadow
              />
            </div>
          ) : null}

          <h3
            className={cn(
              'font-semibold',
              isLight
                ? 'mt-5 text-[1.35rem] leading-8 text-[#0a0a0b]'
                : 'mt-4 text-lg text-foreground',
            )}
          >
            {business}
          </h3>

          {description ? (
            <p
              className={cn(
                isLight
                  ? 'mt-3 text-sm leading-7 text-[rgba(15,23,42,0.62)]'
                  : 'mt-2 text-sm leading-6 text-muted-foreground',
              )}
            >
              {description}
            </p>
          ) : null}

          <p
            className={cn(
              isLight
                ? 'mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[rgba(15,23,42,0.35)] font-mono'
                : 'mt-2 text-sm text-muted-foreground/80',
            )}
          >
            {location}
          </p>

          {!isLight && metric ? (
            <p className="mt-4 text-sm leading-6">
              <span className="font-semibold text-foreground">
                {metric.value}
              </span>{' '}
              <span className="text-muted-foreground">{metric.label}</span>
            </p>
          ) : null}

          {hasExplainerVideo ? (
            <div
              className={cn(
                'mt-auto flex items-center gap-2 pt-5 text-[11px] font-medium uppercase tracking-[0.16em]',
                isLight
                  ? 'border-t border-black/8 text-[rgba(15,23,42,0.46)]'
                  : 'border-t border-border/50 text-muted-foreground',
              )}
            >
              <PlayCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>explainer video</span>
            </div>
          ) : isLight ? (
            <div className="mt-auto pt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(15,23,42,0.38)]">
              View case study
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  )
}
