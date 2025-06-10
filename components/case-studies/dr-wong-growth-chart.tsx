"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
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
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: -20, // Adjust to pull Y-axis labels closer if needed
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.3)" />
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
            tickFormatter={(value) => (value >= 1000 ? `${value / 1000}k` : value.toString())}
            domain={["dataMin - 200", "dataMax + 200"]} // Add some padding to min/max
          />
          <ChartTooltip
            cursor={true}
            content={
              <ChartTooltipContent
                indicator="line"
                labelClassName="font-semibold"
                className="rounded-lg shadow-lg bg-background/95 backdrop-blur-sm"
              />
            }
          />
          <Line
            dataKey="sessions"
            type="monotone"
            stroke="var(--color-sessions)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 7, fill: "var(--color-sessions)", strokeWidth: 2, stroke: "hsl(var(--background))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
