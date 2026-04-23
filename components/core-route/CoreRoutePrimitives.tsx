import type { ReactNode } from 'react'
import Link from 'next/link'

import TrackedLink from '@/components/tracked-link'
import { cn } from '@/lib/utils'

export const coreRouteSectionClassName =
  'border-b border-white/12 px-4 py-20 sm:px-6 sm:py-24'

export const coreRouteSectionCompactClassName =
  'border-b border-white/12 px-4 py-16 sm:px-6 sm:py-20'

export const coreRouteContainerClassName = 'mx-auto max-w-6xl'

export const coreRouteSplitLayoutClassName =
  'grid gap-10 lg:gap-14 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:items-start'

export const coreRouteContainedSectionClassName =
  'rounded-[2rem] border border-white/12 bg-white/[0.03] p-6 sm:p-8 lg:p-10'

export const coreRouteIntroBandClassName =
  'border-y border-white/12 py-6 sm:py-8'

export const coreRouteHeroFrameClassName =
  'relative isolate overflow-hidden rounded-[2rem] border border-white/12 bg-black/45 shadow-[0_30px_90px_-55px_rgba(0,0,0,0.8)]'

export const coreRoutePanelClassName =
  'rounded-[2rem] border border-white/12 bg-black/35'

export const corePrimaryActionClassName =
  'inline-flex min-h-12 items-center gap-2 border-b border-[#f5f0e8] pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#f5f0e8] transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black'

export const coreSecondaryActionClassName =
  'inline-flex min-h-12 items-center justify-center rounded-full border border-white/16 px-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#c9c1b6] transition-colors hover:border-white/30 hover:bg-white/[0.04] hover:text-[#f5f0e8] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black'

export const coreHeroPrimaryActionClassName =
  'inline-flex min-h-14 w-full items-center justify-center rounded-xl border border-[#f5f0e8]/70 bg-[#f5f0e8] px-6 font-sans text-[0.97rem] font-medium tracking-[-0.01em] text-[#050505] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_20px_40px_-26px_rgba(245,240,232,0.72)] transition-[transform,background-color,border-color,box-shadow] hover:border-white hover:bg-white hover:text-[#050505] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_24px_42px_-24px_rgba(245,240,232,0.82)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#f5f0e8]/35 focus-visible:ring-offset-4 focus-visible:ring-offset-black active:translate-y-px sm:min-w-[12.5rem] sm:w-auto'

export const coreHeroSecondaryActionClassName =
  'inline-flex min-h-14 w-full items-center justify-center rounded-xl border border-white/14 bg-white/[0.03] px-6 font-sans text-[0.97rem] font-medium tracking-[-0.01em] text-[#f5f0e8] transition-[transform,background-color,border-color] hover:border-white/28 hover:bg-white/[0.07] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black active:translate-y-px sm:min-w-[12.5rem] sm:w-auto'

type CoreActionLinkProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'heroPrimary' | 'heroSecondary'
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
      : variant === 'secondary'
        ? coreSecondaryActionClassName
        : variant === 'heroPrimary'
          ? coreHeroPrimaryActionClassName
          : coreHeroSecondaryActionClassName,
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
  eyebrow?: string
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
      {eyebrow ? (
        <p
          className={cn(
            'font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-[#797165]',
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </p>
      ) : null}
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
