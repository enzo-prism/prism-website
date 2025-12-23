"use client"

import { Sankey, ResponsiveContainer } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const data = {
  nodes: [
    { name: "Bespoke Website Rebuild" },
    { name: "UX First" },
    { name: "Content Remix" },
    { name: "Listing Clean-Up" },
    { name: "Ad Campaigns" },
    { name: "Systems Integration" },
    { name: "AI-Ready Schema" },
    { name: "Load Time" },
    { name: "Mobile CTR" },
    { name: "Pages/Session" },
    { name: "Clicks" },
    { name: "Local Pack" },
    { name: "Leads" },
    { name: "PMS" },
    { name: "AI Search" },
  ],
  links: [
    { source: 0, target: 7, value: 50 },
    { source: 0, target: 8, value: 1 },
    { source: 1, target: 9, value: 2 },
    { source: 2, target: 10, value: 68 },
    { source: 3, target: 11, value: 1 },
    { source: 4, target: 12, value: 1 },
    { source: 5, target: 13, value: 1 },
    { source: 6, target: 14, value: 1 },
  ],
}

const chartConfig = {
  bespoke: { label: "Bespoke Website Rebuild", color: "var(--chart-1)" },
  ux: { label: "UX First", color: "var(--chart-2)" },
  content: { label: "Content Remix", color: "var(--chart-3)" },
  listings: { label: "Listing Clean-Up", color: "var(--chart-4)" },
  ads: { label: "Ad Campaigns", color: "var(--chart-5)" },
  systems: { label: "Systems Integration", color: "var(--chart-6)" },
  schema: { label: "AI-Ready Schema", color: "var(--chart-7)" },
} satisfies ChartConfig

export function ExquisitePillarKPIChart() {
  return (
    <ChartContainer config={chartConfig} className="w-full aspect-video md:h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={data}
          nodePadding={30}
          node={{ stroke: "var(--muted-foreground)", strokeWidth: 1 }}
          link={{ stroke: "var(--chart-1)", strokeOpacity: 0.5 }}
        >
          <ChartTooltip
            content={
              <ChartTooltipContent className="rounded-lg shadow-lg bg-background/95 backdrop-blur-sm" />
            }
          />
        </Sankey>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default ExquisitePillarKPIChart
