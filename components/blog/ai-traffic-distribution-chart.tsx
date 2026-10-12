'use client'

import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import { ChartResponsiveContainer } from '@/components/ui/chart'
import { cn } from '@/lib/utils'

const data = [
  {
    name: 'Traditional Organic',
    value: 70,
    color: 'var(--spectrum-green)',
    description: 'Standard search results',
  },
  {
    name: 'Google AI Overviews',
    value: 25,
    color: 'var(--spectrum-violet)',
    description: 'AI-generated summaries',
  },
  {
    name: 'ChatGPT Search',
    value: 3,
    color: 'var(--spectrum-orange)',
    description: 'Direct AI queries',
  },
  {
    name: 'Other AI Tools',
    value: 2,
    color: 'var(--spectrum-red)',
    description: 'Perplexity, Claude, etc.',
  },
]

export default function AITrafficDistributionChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  return (
    <div className="my-10 w-full rounded-3xl border border-white/[0.08] bg-card p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] sm:p-8">
      <div className="mb-6">
        <p className="text-eyebrow mb-3! mt-0! text-subtle">Chart</p>
        <h3 className="mb-2! mt-0! text-xl! text-foreground">
          Search Traffic Distribution in 2025
        </h3>
        <p className="my-0! text-sm leading-6 text-muted-foreground">
          Where users are finding information and how it impacts your business
        </p>
      </div>

      <div className="grid items-center gap-6 lg:grid-cols-2">
        <div className="relative">
          <div className="relative h-64 sm:h-72">
            <ChartResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={96}
                  paddingAngle={2}
                  cornerRadius={4}
                  dataKey="value"
                  stroke="var(--card)"
                  strokeWidth={2}
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  isAnimationActive={false}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      fillOpacity={
                        activeIndex === null || activeIndex === index ? 0.9 : 0.35
                      }
                      style={{ cursor: 'pointer', transition: 'fill-opacity 200ms' }}
                    />
                  ))}
                </Pie>
                <Tooltip
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
                  formatter={(value, _name, item) => {
                    const description =
                      item.payload?.description ?? 'No description available'
                    const safeValue = value ?? 0
                    return [`${safeValue}%`, description]
                  }}
                  labelFormatter={(label) => `Traffic Source: ${label}`}
                />
              </PieChart>
            </ChartResponsiveContainer>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 grid place-items-center"
          >
            <div className="text-center">
              <p className="my-0! font-mono text-2xl font-semibold tabular-nums text-foreground">
                {activeIndex === null ? '100%' : `${data[activeIndex].value}%`}
              </p>
              <p className="mb-0! mt-1! max-w-[9rem] text-xs leading-4 text-subtle">
                {activeIndex === null ? 'of search traffic' : data[activeIndex].name}
              </p>
            </div>
          </div>
        </div>

        <ul className="my-0! flex list-none! flex-col gap-2 pl-0!">
          {data.map((item, index) => {
            const isActive = activeIndex === index
            return (
              <li key={item.name} className="my-0! pl-0!">
                <button
                  type="button"
                  className={cn(
                    'w-full rounded-2xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                    isActive
                      ? 'border-white/20 bg-white/[0.05]'
                      : 'border-white/[0.08] bg-background/50 hover:border-white/15',
                  )}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  aria-pressed={isActive}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium text-foreground sm:text-base">
                        {item.name}
                      </span>
                    </span>
                    <span className="font-mono text-sm tabular-nums text-foreground">
                      {item.value}%
                    </span>
                  </span>
                  <span className="mt-1.5 block pl-5 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-background/50 p-4 pl-5">
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-spectrum-violet" />
        <p className="my-0! text-sm leading-6 text-muted-foreground">
          <strong>Strategic Takeaway:</strong> Google's AI Overviews are the
          biggest disruptor, not ChatGPT. Focus your optimization efforts on
          appearing in Google's AI summaries.
        </p>
      </div>
    </div>
  )
}
