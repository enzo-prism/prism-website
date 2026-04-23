import type { ReactNode } from 'react'
import Link from 'next/link'

import TrackedLink from '@/components/tracked-link'
import { cn } from '@/lib/utils'

export const coreRouteSectionClassName =
  'border-b border-white/12 px-4 py-20 sm:px-6 sm:py-24'

export const coreRouteSectionCompactClassName =
  'border-b border-white/12 px-4 py-16 sm:px-6 sm:py-20'

export const coreRouteContainerClassName = 'mx-auto max-w-6xl'

export const coreRouteHeroFrameClassName =
  'relative isolate overflow-hidden rounded-[2rem] border border-white/12 bg-black/45 shadow-[0_30px_90px_-55px_rgba(0,0,0,0.8)]'

export const coreRoutePanelClassName =
  'rounded-[2rem] border border-white/12 bg-black/35'

export const corePrimaryActionClassName =
  'inline-flex min-h-12 items-center gap-2 border-b border-[#f5f0e8] pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#f5f0e8] transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black'

export const coreSecondaryActionClassName =
  'inline-flex min-h-12 items-center justify-center rounded-full border border-white/16 px-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#c9c1b6] transition-colors hover:border-white/30 hover:bg-white/[0.04] hover:text-[#f5f0e8] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black'

type CoreActionLinkProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  label?: string
  location?: string
  target?: string
  rel?: string
}

export function CoreActionLink({
  href,
  children,
  variant = 'primary',
  className,
  label,
  location,
  target,
  rel,
}: CoreActionLinkProps) {
  const actionClassName = cn(
    variant === 'primary'
      ? corePrimaryActionClassName
      : coreSecondaryActionClassName,
    className,
  )

  if (label && location) {
    return (
      <TrackedLink
        href={href}
        label={label}
        location={location}
        className={actionClassName}
        target={target}
        rel={rel}
      >
        {children}
      </TrackedLink>
    )
  }

  return (
    <Link href={href} className={actionClassName} target={target} rel={rel}>
      {children}
    </Link>
  )
}

type CoreSectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  variant?: 'hero' | 'section'
  align?: 'left' | 'center'
  className?: string
  eyebrowClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function CoreSectionHeading({
  eyebrow,
  title,
  description,
  as: HeadingTag = 'h2',
  variant = 'section',
  align = 'left',
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
}: CoreSectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' ? 'items-center text-center' : '',
        className,
      )}
    >
      <p
        className={cn(
          'font-mono text-[11px] font-semibold uppercase tracking-[0.34em] text-[#8f877b]',
          eyebrowClassName,
        )}
      >
        {eyebrow}
      </p>
      <HeadingTag
        className={cn(
          variant === 'hero'
            ? 'max-w-[11ch] text-balance font-sans text-[clamp(2.05rem,4.8vw,3.65rem)] font-medium leading-[1] tracking-[-0.05em] text-[#f5f0e8]'
            : 'max-w-[12ch] text-balance font-sans text-[clamp(1.7rem,3.2vw,2.55rem)] font-medium leading-[1.04] tracking-[-0.045em] text-[#f5f0e8]',
          titleClassName,
        )}
      >
        {title}
      </HeadingTag>
      {description ? (
        <p
          className={cn(
            'max-w-[40rem] text-pretty font-sans text-[1.02rem] leading-7 text-[#b8afa2] sm:text-[1.12rem] sm:leading-8',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
