"use client"

import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts"
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart"

const chartConfig = {
  pre: { label: "Pre Launch", color: "hsl(var(--chart-1))" },
  post: { label: "Post Launch", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig

const maxValue = 5

const data = [
  { key: "pre", value: 4.2 },
  { key: "post", value: 2.1 },
]

export function ExquisiteSpeedGauge() {
  return (
    <div className="flex justify-center gap-6 flex-wrap">
      {data.map((item) => (
        <div key={item.key} className="flex flex-col items-center gap-2">
          <ChartContainer config={chartConfig} className="w-32 aspect-square">
            <RadialBarChart
              startAngle={180}
              endAngle={0}
              innerRadius="70%"
              outerRadius="100%"
              barSize={10}
              data={[item]}
            >
              <PolarAngleAxis type="number" domain={[0, maxValue]} tick={false} />
              <RadialBar
                dataKey="value"
                cornerRadius={10}
                fill={`var(--color-${item.key})`}
                background={{ fill: "hsl(var(--muted))" }}
              />
            </RadialBarChart>
          </ChartContainer>
          <div className="text-center text-sm">
            <div className="font-mono font-bold">{item.value}s</div>
            <div>{chartConfig[item.key as keyof typeof chartConfig].label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExquisiteSpeedGauge
