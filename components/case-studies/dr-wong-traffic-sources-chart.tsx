"use client"

import * as React from "react"
import { Pie, PieChart, Cell, ResponsiveContainer, Sector } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

const trafficData = [
  { source: "Organic Search", sessions: 1400, fill: "var(--color-organic)" },
  { source: "Direct", sessions: 1300, fill: "var(--color-direct)" },
  { source: "Referrals", sessions: 733, fill: "var(--color-referrals)" },
  { source: "Paid Search", sessions: 694, fill: "var(--color-paid)" },
]

const chartConfig = {
  sessions: {
    label: "Sessions",
  },
  organic: {
    label: "Organic Search",
    color: "hsl(var(--chart-1))",
  },
  direct: {
    label: "Direct",
    color: "hsl(var(--chart-2))",
  },
  referrals: {
    label: "Referrals",
    color: "hsl(var(--chart-3))",
  },
  paid: {
    label: "Paid Search",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function DrWongTrafficSourcesChart() {
  const totalSessions = React.useMemo(() => {
    return trafficData.reduce((acc, curr) => acc + curr.sessions, 0)
  }, [])

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <ChartTooltip
            cursor={true}
            content={
              <ChartTooltipContent
                hideLabel
                nameKey="source"
                className="rounded-lg shadow-lg bg-background/95 backdrop-blur-sm"
              />
            }
          />
          <Pie
            data={trafficData}
            dataKey="sessions"
            nameKey="source"
            innerRadius="60%"
            strokeWidth={3}
            stroke="hsl(var(--background))"
            activeShape={(props) => {
              const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props
              return (
                <g>
                  <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 4}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                    stroke={fill}
                  />
                </g>
              )
            }}
          >
            {trafficData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <ChartLegend
            content={<ChartLegendContent nameKey="source" className="lowercase text-sm" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
