"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const data = [
  { keyword: "veneers", pre: 48, post: 37 },
  { keyword: "teeth whitening", pre: 45, post: 33 },
  { keyword: "beverly hills dentist", pre: 55, post: 42 },
  { keyword: "smile makeover", pre: 50, post: 39 },
  { keyword: "cosmetic dentistry", pre: 47, post: 35 },
]

const chartConfig = {
  pre: { label: "Pre Launch", color: "hsl(var(--chart-1))" },
  post: { label: "Post Launch", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig

export function ExquisiteRankLiftChart() {
  return (
    <ChartContainer config={chartConfig} className="w-full aspect-video md:h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
          <XAxis dataKey="keyword" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} interval={0} angle={-15} textAnchor="end" height={60} />
          <YAxis reversed tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <ChartTooltip content={<ChartTooltipContent className="rounded-lg shadow-lg bg-background/95 backdrop-blur-sm" />} />
          <Bar dataKey="pre" fill="var(--color-pre)" radius={[4,4,0,0]} barSize={20} />
          <Bar dataKey="post" fill="var(--color-post)" radius={[4,4,0,0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
