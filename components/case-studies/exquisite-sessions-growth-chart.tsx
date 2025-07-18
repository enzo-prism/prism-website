"use client"

import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const data = [
  { date: "Mar 15", sessions: 40 },
  { date: "Mar 22", sessions: 42 },
  { date: "Mar 28", sessions: 45 }, // Relaunch
  { date: "Apr 4", sessions: 70 },
  { date: "Apr 11", sessions: 90 },
  { date: "Apr 18", sessions: 110 },
  { date: "Apr 25", sessions: 130 },
  { date: "May 2", sessions: 150 },
]

const chartConfig = {
  sessions: { label: "Sessions per Day", color: "hsl(var(--chart-1))" },
  relaunch: { label: "Relaunch", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig

export function ExquisiteSessionsGrowthChart() {
  return (
    <ChartContainer config={chartConfig} className="w-full aspect-video md:h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="sessionsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
          <XAxis dataKey="date" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis
            tickLine={false}
            axisLine={false}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(v: number) => (v >= 100 ? `${v}` : v.toString())}
          />
          <ReferenceLine
            x="Mar 28"
            stroke="var(--color-relaunch)"
            strokeDasharray="3 3"
            label={{ position: "top", value: "Relaunch" }}
          />
          <ChartTooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={
              <ChartTooltipContent
                indicator="line"
                labelClassName="font-semibold"
                className="rounded-lg shadow-lg bg-background/95 backdrop-blur-sm"
              />
            }
          />
          <Area
            type="monotone"
            dataKey="sessions"
            stroke="var(--color-sessions)"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#sessionsGradient)"
            activeDot={{ r: 6, style: { filter: "drop-shadow(0 0 3px hsl(var(--chart-1)))" } }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default ExquisiteSessionsGrowthChart
