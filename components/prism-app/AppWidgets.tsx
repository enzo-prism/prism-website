import type { ReactNode } from 'react'
import { ArrowUp, Search, Users } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * Drawn from apps/ios/PrismWidget/PrismWidget.swift. Widgets need a signed
 * install to show data, so these are illustrations using the demo's numbers
 * and are labeled as such on the page. Decorative to assistive tech; the
 * section copy carries the content.
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

function WidgetSurface({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-[1.6rem] border border-white/[0.08] bg-muted p-4 shadow-[0_24px_48px_-20px_oklch(0_0_0/90%)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

function SmallWidget() {
  return (
    <WidgetSurface className="flex aspect-square w-40 shrink-0 flex-col">
      <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-spectrum-blue">
        <Users aria-hidden="true" className="size-3.5" />
        Visits
      </p>
      <p className="mt-auto text-[2.25rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-foreground">
        {VISITS}
      </p>
      <p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
        Last 7 days · <Change value="3%" />
      </p>
      <p className="mt-auto text-[11px] font-medium text-muted-foreground">
        {SITE}
      </p>
    </WidgetSurface>
  )
}

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
      <p className="mt-1 text-[1.75rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-foreground">
        {value}
      </p>
      <p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
        {caption} · <Change value={change} />
      </p>
    </div>
  )
}

function MediumWidget() {
  const peak = Math.max(...DAILY_VISITS)
  return (
    <WidgetSurface className="w-full max-w-[22.5rem]">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs font-semibold text-foreground">{SITE}</p>
        <p className="text-[11px] text-muted-foreground">Today</p>
      </div>
      <div className="mt-3 flex items-end gap-4">
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
        <div className="flex h-14 min-w-0 flex-1 items-end gap-[3px]">
          {DAILY_VISITS.map((value, index) => (
            <span
              key={index}
              style={{ height: `${(value / peak) * 100}%` }}
              className={cn(
                'min-w-0 flex-1 rounded-[2px] bg-spectrum-blue',
                index < 7 && 'opacity-30',
              )}
            />
          ))}
        </div>
      </div>
    </WidgetSurface>
  )
}

function LockScreenWidget() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[3.5rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-foreground/90">
        9:41
      </p>
      <div className="mt-3 rounded-2xl bg-white/[0.08] px-4 py-2.5 text-xs leading-[1.45] text-foreground/85">
        <p className="text-[13px] font-semibold text-foreground">{SITE}</p>
        <p>{VISITS} visits · 7 days</p>
        <p>{CLICKS} Google clicks · 28 days</p>
      </div>
    </div>
  )
}

export function AppWidgets() {
  return (
    <div
      aria-hidden="true"
      className="relative isolate overflow-hidden rounded-3xl border border-white/[0.08] bg-card p-6 sm:p-10"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_20%_100%,oklch(0.66_0.16_258/22%),transparent_70%),radial-gradient(50%_60%_at_90%_0%,oklch(0.63_0.19_295/16%),transparent_70%)]" />
      <div className="flex flex-col items-center gap-8">
        <LockScreenWidget />
        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-stretch sm:justify-center">
          <SmallWidget />
          <MediumWidget />
        </div>
      </div>
    </div>
  )
}

export default AppWidgets
