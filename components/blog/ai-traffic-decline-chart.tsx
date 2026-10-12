'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts'
import { ChartResponsiveContainer } from '@/components/ui/chart'
import { cn } from '@/lib/utils'

const data = [
  {
    month: 'Jan 2024',
    organic: 100,
    withAI: 100,
    industry: 'General',
  },
  {
    month: 'Mar 2024',
    organic: 95,
    withAI: 90,
    industry: 'General',
  },
  {
    month: 'May 2024',
    organic: 88,
    withAI: 82,
    industry: 'General',
  },
  {
    month: 'Jul 2024',
    organic: 85,
    withAI: 75,
    industry: 'General',
  },
  {
    month: 'Sep 2024',
    organic: 85,
    withAI: 70,
    industry: 'Health & Wellness',
  },
  {
    month: 'Nov 2024',
    organic: 85,
    withAI: 70,
    industry: 'Health & Wellness',
  },
  {
    month: 'Jan 2025',
    organic: 85,
    withAI: 70,
    industry: 'Health & Wellness',
  },
]

const industryData = [
  { name: 'General Business', decline: 15, color: 'var(--spectrum-violet)' },
  { name: 'Health & Wellness', decline: 30, color: 'var(--spectrum-red)' },
  { name: 'E-commerce', decline: 20, color: 'var(--spectrum-orange)' },
  { name: 'Local Services', decline: 18, color: 'var(--spectrum-green)' },
  { name: 'Technology', decline: 12, color: 'var(--spectrum-blue)' },
]

const GRID_STROKE = 'oklch(1 0 0 / 8%)'
const AXIS_STROKE = 'oklch(1 0 0 / 14%)'
const AXIS_TICK = { fontSize: 10, fill: 'var(--subtle-foreground)' }

const VIEWS = [
  { id: 'timeline', label: 'Timeline View' },
  { id: 'industry', label: 'Industry Breakdown' },
] as const

export default function AITrafficDeclineChart() {
  const [activeView, setActiveView] = useState<'timeline' | 'industry'>(
    'timeline',
  )

  return (
    <div className="my-10 w-full rounded-3xl border border-white/[0.08] bg-card p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] sm:p-8">
      <div className="mb-6">
        <p className="text-eyebrow mb-3! mt-0! text-subtle">Chart</p>
        <h3 className="mb-2! mt-0! text-xl! text-foreground">
          AI Impact on Organic Traffic
        </h3>
        <p className="my-0! text-sm leading-6 text-muted-foreground">
          How AI-powered search features are affecting click-through rates
          across industries
        </p>
      </div>

      <div
        role="group"
        aria-label="Chart view"
        className="mb-6 inline-flex w-full flex-col gap-1 rounded-2xl border border-white/[0.08] bg-background/60 p-1 sm:w-auto sm:flex-row sm:rounded-full"
      >
        {VIEWS.map((view) => {
          const isActive = activeView === view.id
          return (
            <button
              key={view.id}
              type="button"
              onClick={() => setActiveView(view.id)}
              aria-pressed={isActive}
              className={cn(
                'min-h-10 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                isActive
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {view.label}
            </button>
          )
        })}
      </div>

      <div>
        {activeView === 'timeline' ? (
          <>
            <div className="relative h-64 sm:h-72 md:h-80">
              <ChartResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 15, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
                  <XAxis
                    dataKey="month"
                    tick={AXIS_TICK}
                    stroke={AXIS_STROKE}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    tick={AXIS_TICK}
                    stroke={AXIS_STROKE}
                    domain={[65, 105]}
                    width={36}
                  />
                  <Tooltip
                    cursor={{ stroke: 'oklch(1 0 0 / 20%)' }}
                    contentStyle={{
                      backgroundColor: 'var(--popover)',
                      border: '1px solid oklch(1 0 0 / 10%)',
                      borderRadius: '12px',
                      fontSize: '13px',
                      color: 'var(--foreground)',
                      boxShadow: '0 16px 40px -16px oklch(0 0 0 / 80%)',
                      zIndex: 9999,
                    }}
                    labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                    itemStyle={{ color: 'var(--muted-foreground)' }}
                    formatter={(value, name) => {
                      const safeValue = value ?? 0
                      const safeName = name ?? 'Value'
                      if (safeName === 'Traditional Organic') {
                        return [`${safeValue}%`, 'Traditional Organic Search']
                      }
                      if (safeName === 'With AI Features') {
                        return [`${safeValue}%`, 'With AI Search Features']
                      }
                      return [`${safeValue}%`, safeName]
                    }}
                    labelFormatter={(label) => `Period: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="organic"
                    stroke="var(--spectrum-green)"
                    strokeWidth={2}
                    dot={{ fill: 'var(--spectrum-green)', strokeWidth: 0, r: 3.5 }}
                    name="Traditional Organic"
                    isAnimationActive={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="withAI"
                    stroke="var(--spectrum-red)"
                    strokeWidth={2}
                    dot={{ fill: 'var(--spectrum-red)', strokeWidth: 0, r: 3.5 }}
                    name="With AI Features"
                    isAnimationActive={false}
                  />
                  <ReferenceLine
                    y={85}
                    stroke="oklch(1 0 0 / 28%)"
                    strokeDasharray="5 5"
                    label={{
                      value: '15% Decline',
                      fill: 'var(--muted-foreground)',
                      fontSize: 11,
                      position: 'insideTopRight',
                    }}
                  />
                  <ReferenceLine
                    y={70}
                    stroke="oklch(1 0 0 / 28%)"
                    strokeDasharray="5 5"
                    label={{
                      value: '30% Decline',
                      fill: 'var(--muted-foreground)',
                      fontSize: 11,
                      position: 'insideBottomRight',
                    }}
                  />
                </LineChart>
              </ChartResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="h-0.5 w-4 rounded-full bg-spectrum-green" />
                Traditional organic
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="h-0.5 w-4 rounded-full bg-spectrum-red" />
                With AI features
              </span>
            </div>
          </>
        ) : (
          <ul className="my-0! flex list-none! flex-col gap-2 pl-0!">
            {industryData.map((industry) => (
              <li
                key={industry.name}
                className="my-0! flex flex-col justify-between gap-3 rounded-2xl border border-white/[0.06] bg-background/50 p-4 pl-4! sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: industry.color }}
                  />
                  <span className="text-sm font-medium text-foreground sm:text-base">
                    {industry.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/[0.08] sm:w-32">
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: industry.color,
                        width: `${(industry.decline / 30) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="min-w-[2.5rem] text-right font-mono text-sm tabular-nums text-foreground">
                    -{industry.decline}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-background/50 p-4 pl-5">
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-spectrum-blue" />
        <p className="my-0! text-sm leading-6 text-muted-foreground">
          <strong>Key Insight:</strong> While general business sees a 15%
          decline, health & wellness businesses are hit hardest with up to 30%
          traffic loss due to AI answering medical queries directly.
        </p>
      </div>
    </div>
  )
}
