import type { CSSProperties, ReactNode } from 'react'
import { Bell, Mail, Search, Sparkles, Users, Activity } from 'lucide-react'

import { cn } from '@/lib/utils'

import styles from './app-page.module.css'

/**
 * The satellites beside the tour's phone. Each is drawn from the numbers on
 * its capture in the app's demo and plays once when its step arrives.
 * Decorative to assistive tech; the step copy carries the content.
 */

const LEADS_DAILY = [
  0, 2, 3, 0, 1, 2, 0, 0, 1, 2, 3, 0, 1, 0, 0, 0, 1, 2, 3, 0, 0, 0, 3, 0, 1, 2,
  3,
]
const VISITS_DAILY = [64, 70, 74, 78, 82, 50, 46, 66, 76, 80, 84, 90, 54, 48]
const CLICKS_DAILY = [
  14, 18, 19, 17, 20, 12, 11, 15, 19, 20, 18, 21, 13, 12, 16, 20, 21, 19, 22,
  13, 12, 17, 21, 22, 20, 23, 14, 15,
]
const BUSY_HOURS = [22, 20, 24, 21, 26, 30, 72, 100]

function Bars({
  values,
  dimBefore = 0,
}: {
  values: readonly number[]
  dimBefore?: number
}) {
  const peak = Math.max(...values)
  return (
    <div className={styles.instrumentBars}>
      {values.map((value, index) => (
        <span
          key={index}
          className={cn(styles.instrumentBar, index < dimBefore && 'opacity-35')}
          style={
            {
              height: `${Math.max((value / peak) * 100, value ? 8 : 2)}%`,
              '--i': index,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}

function Area({ values }: { values: readonly number[] }) {
  const peak = Math.max(...values)
  const floor = Math.min(...values) * 0.55
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * 100
    const y = 34 - ((value - floor) / (peak - floor)) * 31
    return `${x.toFixed(2)},${y.toFixed(2)}`
  })

  return (
    <div className={styles.instrumentWipe}>
      <div className={styles.instrumentWipeInner}>
        <svg
          viewBox="0 0 100 36"
          preserveAspectRatio="none"
          className="block h-full w-full"
          focusable="false"
        >
          <polygon
            points={`0,36 ${points.join(' ')} 100,36`}
            fill="var(--tone)"
            opacity="0.2"
          />
          <polyline
            points={points.join(' ')}
            fill="none"
            stroke="var(--tone)"
            strokeWidth="1.6"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  )
}

function Split() {
  const rows = [
    { name: 'chatgpt.com', value: 17 },
    { name: 'perplexity.ai', value: 6 },
  ]
  return (
    <div className="flex flex-col gap-2">
      {rows.map((row, index) => (
        <div key={row.name}>
          <p className="flex justify-between gap-2 text-[11px] leading-4 text-muted-foreground">
            <span className="truncate">{row.name}</span>
            <span className="tabular-nums text-foreground">{row.value}</span>
          </p>
          <span className={styles.instrumentTrack}>
            <span
              className={styles.instrumentFill}
              style={
                {
                  width: `${(row.value / 17) * 100}%`,
                  '--i': index * 5,
                } as CSSProperties
              }
            />
          </span>
        </div>
      ))}
    </div>
  )
}

type Spec = {
  icon: ReactNode
  label: string
  count: number
  unit: string
  foot?: string
  live?: boolean
  viz?: ReactNode
}

const ICON = 'size-3.5'

const SPECS: Record<string, Spec> = {
  summary: {
    icon: <Activity aria-hidden="true" className={ICON} />,
    label: 'On your site',
    count: 14,
    unit: 'people',
    foot: 'Right now',
    live: true,
  },
  leads: {
    icon: <Mail aria-hidden="true" className={ICON} />,
    label: 'Leads',
    count: 30,
    unit: 'forms',
    viz: <Bars values={LEADS_DAILY} />,
  },
  visits: {
    icon: <Users aria-hidden="true" className={ICON} />,
    label: 'Visits',
    count: 1223,
    unit: '',
    viz: <Bars values={VISITS_DAILY} dimBefore={7} />,
  },
  search: {
    icon: <Search aria-hidden="true" className={ICON} />,
    label: 'Google Search',
    count: 498,
    unit: 'clicks',
    viz: <Area values={CLICKS_DAILY} />,
  },
  ai: {
    icon: <Sparkles aria-hidden="true" className={ICON} />,
    label: 'AI Assistants',
    count: 23,
    unit: 'visits',
    viz: <Split />,
  },
  updates: {
    icon: <Bell aria-hidden="true" className={ICON} />,
    label: 'Busy right now',
    count: 64,
    unit: 'people',
    viz: <Bars values={BUSY_HOURS} dimBefore={6} />,
  },
}

export function AppInstrument({ id }: { id: string }) {
  const spec = SPECS[id]
  if (!spec) return null

  return (
    <>
      <p className="flex items-center gap-1.5 truncate text-[11px] font-semibold text-[color:var(--tone)]">
        {spec.icon}
        {spec.label}
      </p>
      <p className="mt-2 flex items-baseline gap-1 font-semibold tracking-[-0.03em] text-foreground">
        <span
          data-count={spec.count}
          className="text-[1.75rem] leading-none tabular-nums"
        >
          {spec.count.toLocaleString('en-US')}
        </span>
        {spec.unit ? (
          <span className="text-[12px] font-medium tracking-normal text-muted-foreground">
            {spec.unit}
          </span>
        ) : null}
      </p>
      {spec.live ? (
        <p className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className={styles.instrumentLive} />
          {spec.foot}
        </p>
      ) : null}
      {spec.viz ? <div className="mt-3">{spec.viz}</div> : null}
    </>
  )
}
