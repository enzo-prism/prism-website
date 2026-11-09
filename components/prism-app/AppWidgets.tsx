'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { ArrowUp, Search, Users } from 'lucide-react'

import { cn } from '@/lib/utils'

import styles from './app-page.module.css'

/**
 * Drawn from apps/ios/PrismWidget/PrismWidget.swift. Widgets need a signed
 * install to show data, so these are illustrations using the demo's numbers
 * and are labeled as such on the page. Decorative to assistive tech; the
 * section copy carries the content. They land once and hold.
 */

const SITE = 'Bayview Dental'
const VISITS = '1,223'
const CLICKS = '498'

/** Fourteen days of demo visits; the last seven are drawn in full color. */
const DAILY_VISITS = [64, 70, 74, 78, 82, 50, 46, 66, 76, 80, 84, 90, 54, 48]

function Change({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      <ArrowUp aria-hidden="true" className="size-3" />
      {value}
    </span>
  )
}

function Drop({
  area,
  delay,
  className,
  children,
}: {
  area: string
  delay: number
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(styles.widgetDrop, className)}
      style={{ gridArea: area, '--d': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}

const SURFACE =
  'rounded-[1.6rem] border border-white/[0.09] bg-muted p-4 shadow-[0_24px_48px_-20px_oklch(0_0_0/90%)]'

function Metric({
  icon,
  title,
  tint,
  value,
  caption,
  change,
}: {
  icon: ReactNode
  title: string
  tint: string
  value: string
  caption: string
  change: string
}) {
  return (
    <div className="shrink-0">
      <p className={cn('inline-flex items-center gap-1 text-[11px] font-semibold', tint)}>
        {icon}
        {title}
      </p>
      <p className="mt-1 text-[1.625rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-foreground sm:text-[1.75rem]">
        {value}
      </p>
      <p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
        {caption} · <Change value={change} />
      </p>
    </div>
  )
}

export function AppWidgets() {
  const rootRef = useRef<HTMLDivElement>(null)
  const peak = Math.max(...DAILY_VISITS)

  useEffect(() => {
    const root = rootRef.current
    if (
      !root ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    root.setAttribute('data-armed', '')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        root.setAttribute('data-in', '')
        observer.disconnect()
      },
      { rootMargin: '0px 0px -18% 0px', threshold: 0.12 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={rootRef} aria-hidden="true" className={styles.widgetPanel}>
      <div className={styles.widgetGrid}>
        <Drop area="time" delay={0} className="text-center">
          <p className="text-[3.75rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-foreground/90 sm:text-[4.5rem]">
            9:41
          </p>
        </Drop>

        <Drop area="lock" delay={140} className="self-center">
          <div className="rounded-2xl bg-white/[0.08] px-3.5 py-2.5 text-xs leading-[1.45] text-foreground/85 sm:px-4">
            <p className="text-[13px] font-semibold text-foreground">{SITE}</p>
            <p className="whitespace-nowrap">{VISITS} visits · 7 days</p>
            <p className="whitespace-nowrap">{CLICKS} clicks · 28 days</p>
          </div>
        </Drop>

        <Drop area="small" delay={260}>
          <div className={cn(SURFACE, 'flex aspect-square w-36 flex-col sm:w-40')}>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-spectrum-blue">
              <Users aria-hidden="true" className="size-3.5" />
              Visits
            </p>
            <p className="mt-auto text-[2.125rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-foreground sm:text-[2.25rem]">
              {VISITS}
            </p>
            <p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
              Last 7 days · <Change value="3%" />
            </p>
            <p className="mt-auto text-[11px] font-medium text-muted-foreground">
              {SITE}
            </p>
          </div>
        </Drop>

        <Drop area="medium" delay={380} className="w-full">
          <div className={cn(SURFACE, 'w-full')}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-xs font-semibold text-foreground">{SITE}</p>
              <p className="text-[11px] text-muted-foreground">Today</p>
            </div>
            <div className="mt-3 flex items-end gap-3 sm:gap-4">
              <Metric
                icon={<Users aria-hidden="true" className="size-3" />}
                title="Visits"
                tint="text-spectrum-blue"
                value={VISITS}
                caption="7 days"
                change="3%"
              />
              <Metric
                icon={<Search aria-hidden="true" className="size-3" />}
                title="Google"
                tint="text-spectrum-orange"
                value={CLICKS}
                caption="28 days"
                change="16%"
              />
              <div className="flex h-14 min-w-0 flex-1 items-end gap-[2px] sm:gap-[3px]">
                {DAILY_VISITS.map((value, index) => (
                  <span
                    key={index}
                    style={
                      {
                        height: `${(value / peak) * 100}%`,
                        '--i': index,
                      } as CSSProperties
                    }
                    className={cn(
                      styles.widgetBar,
                      index < 7 && 'opacity-30',
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </Drop>
      </div>
    </div>
  )
}

export default AppWidgets
