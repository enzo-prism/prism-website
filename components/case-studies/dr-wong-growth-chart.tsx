"use client"

import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "Jan '24", sessions: 800 },
  { month: "Feb '24", sessions: 950 },
  { month: "Mar '24", sessions: 1100 },
  { month: "Apr '24", sessions: 1500 }, // Start of surge
  { month: "May '24", sessions: 1800 },
  { month: "Jun '24", sessions: 2200 }, // Peak of surge mentioned
  { month: "Jul '24", sessions: 2100 },
  { month: "Aug '24", sessions: 2400 },
  { month: "Sep '24", sessions: 2700 },
  { month: "Oct '24", sessions: 2950 },
  { month: "Nov '24", sessions: 3200 },
  { month: "Dec '24", sessions: 3600 }, // Corresponds to 3600 active users recently
]

const chartConfig = {
  sessions: {
    label: "Website Sessions",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function DrWongGrowthChart() {
  return (
    <ChartContainer config={chartConfig} className="w-full aspect-video md:h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value: number) => (value >= 1000 ? `${value / 1000}k` : value.toString())}
            domain={["dataMin - 200", "dataMax + 200"]}
          />
          <ChartTooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={
              <ChartTooltipContent
                indicator="area"
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
            fill="url(#colorSessions)"
            activeDot={{ r: 6, style: { filter: "drop-shadow(0 0 3px hsl(var(--chart-1)))" } }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
