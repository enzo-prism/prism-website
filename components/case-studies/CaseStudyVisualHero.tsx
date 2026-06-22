import Image from 'next/image'
import { ArrowRight, ExternalLink } from 'lucide-react'

import TrackedLink from '@/components/tracked-link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CaseStudyVisualHeroProps = {
  eyebrow?: string
  title: string
  description: string
  badge?: string
  websiteUrl?: string
  websiteLabel?: string
  trackedLocation: string
  homeDesktopSrc: string
  homeDesktopAlt: string
  homeMobileSrc?: string
  homeMobileAlt?: string
  primaryCta?: {
    href: string
    label: string
    text: string
  }
}

export function BrowserScreenshotFrame({
  src,
  alt,
  label,
  priority = false,
  className,
  imageClassName,
  sizes = '(min-width: 1280px) 480px, (min-width: 768px) 45vw, calc(100vw - 64px)',
}: {
  src: string
  alt: string
  label: string
  priority?: boolean
  className?: string
  imageClassName?: string
  sizes?: string
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-border/70 bg-black shadow-[0_30px_80px_-48px_rgba(0,0,0,0.9)]',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400/70" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-amber-300/70" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-emerald-300/70" aria-hidden="true" />
        <span className="ml-2 truncate rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="relative aspect-[16/10] bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn('object-cover object-top', imageClassName)}
        />
      </div>
    </div>
  )
}

export function MobileScreenshotFrame({
  src,
  alt,
  className,
  sizes = '(min-width: 1024px) 176px, (min-width: 640px) 160px, 144px',
}: {
  src: string
  alt: string
  className?: string
  sizes?: string
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[1.75rem] border border-border/70 bg-black p-2 shadow-[0_26px_70px_-42px_rgba(0,0,0,0.95)]',
        className,
      )}
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.25rem] bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    </div>
  )
}

function getHostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export default function CaseStudyVisualHero({
  eyebrow,
  title,
  description,
  badge,
  websiteUrl,
  websiteLabel,
  trackedLocation,
  homeDesktopSrc,
  homeDesktopAlt,
  homeMobileSrc,
  homeMobileAlt,
  primaryCta,
}: CaseStudyVisualHeroProps) {
  const browserLabel = websiteLabel ?? (websiteUrl ? getHostLabel(websiteUrl) : 'live site')

  return (
    <section className="border-b border-border/60 px-4 py-12 md:py-20">
      <div className="container mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-6">
        <div className="space-y-7">
          {badge ? (
            <Badge
              variant="secondary"
              className="w-fit rounded-full px-4 py-2 text-[10px] tracking-[0.22em]"
            >
              {badge}
            </Badge>
          ) : null}

          <div className="space-y-4">
            {eyebrow ? (
              <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground sm:text-sm">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {websiteUrl ? (
              <Button asChild className="rounded-full px-5">
                <TrackedLink
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  label={`Open ${title} live site`}
                  location={trackedLocation}
                >
                  <span className="inline-flex items-center gap-2">
                    <span>Open live site</span>
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </span>
                </TrackedLink>
              </Button>
            ) : null}
            {primaryCta ? (
              <Button asChild variant="secondary" className="rounded-full px-5">
                <TrackedLink
                  href={primaryCta.href}
                  label={primaryCta.label}
                  location={trackedLocation}
                >
                  <span className="inline-flex items-center gap-2">
                    <span>{primaryCta.text}</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </TrackedLink>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="relative pb-8">
          <BrowserScreenshotFrame
            src={homeDesktopSrc}
            alt={homeDesktopAlt}
            label={browserLabel}
            priority
          />
          {homeMobileSrc ? (
            <div className="ml-auto mt-4 w-36 sm:absolute sm:-bottom-3 sm:-left-4 sm:ml-0 sm:mt-0 sm:w-40 md:-left-6 lg:w-44">
              <MobileScreenshotFrame
                src={homeMobileSrc}
                alt={homeMobileAlt ?? homeDesktopAlt}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
