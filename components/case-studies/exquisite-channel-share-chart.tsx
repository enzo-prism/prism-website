"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

const data = [
  { channel: "Organic", value: 64, fill: "var(--color-organic)" },
  { channel: "Direct", value: 32, fill: "var(--color-direct)" },
  { channel: "Other", value: 4, fill: "var(--color-other)" },
]

const chartConfig = {
  organic: { label: "Organic", color: "hsl(var(--chart-1))" },
  direct: { label: "Direct", color: "hsl(var(--chart-2))" },
  other: { label: "Other", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig

export function ExquisiteChannelShareChart() {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel className="rounded-lg shadow-lg bg-background/95 backdrop-blur-sm" />} />
          <Pie data={data} dataKey="value" nameKey="channel" innerRadius="60%" strokeWidth={3} stroke="hsl(var(--background))">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <ChartLegend content={<ChartLegendContent nameKey="channel" className="lowercase text-sm" />} className="-translate-y-2 flex-wrap gap-2" />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
