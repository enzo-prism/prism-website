"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  generateCaseStudyImpactPoints,
  getCaseStudyImpactGraphConfig,
  type CaseStudyImpactPoint,
} from "@/lib/case-study-impact-graph"
import { cn } from "@/lib/utils"

import { CaseStudyCallout } from "@/components/case-studies/CaseStudyCallout"
import { ChartContainer, ChartTooltip, type ChartConfig } from "@/components/ui/chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type FounderImpactGraphProps = {
  className?: string
  slug?: string
}

const chartConfig = {
  customers: { label: "customers coming in", color: "hsl(var(--chart-1))" },
  effort: { label: "founder time + energy", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig

type ScenarioKey = "with-prism" | "without-prism"

function levelLabel(value: number) {
  if (value >= 70) return "high"
  if (value >= 40) return "medium"
  return "low"
}

function tooltipMonthLabel(month: number) {
  if (month === 0) return "start"
  return `month ${month}`
}

function ImpactTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload?: CaseStudyImpactPoint }>
}) {
  if (!active || !payload?.length) return null

  const point = payload[0]?.payload
  if (!point) return null

  return (
    <div className="grid min-w-[12rem] gap-2 rounded-lg border border-border/50 bg-background/95 px-3 py-2 text-xs shadow-xl backdrop-blur-sm">
      <div className="font-medium text-foreground">{tooltipMonthLabel(point.month)}</div>
      <div className="grid gap-1.5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">founder time + energy</span>
          <span className="font-mono font-medium tabular-nums text-foreground">
            {levelLabel(point.effort)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">customers coming in</span>
          <span className="font-mono font-medium tabular-nums text-foreground">
            {levelLabel(point.customers)}
          </span>
        </div>
      </div>
    </div>
  )
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function buildWithoutPrismPoints(months: number): CaseStudyImpactPoint[] {
  const count = clamp(Math.round(months), 2, 24)

  return Array.from({ length: count }, (_, month) => {
    const t = count === 1 ? 1 : month / (count - 1)
    const effort = Math.round(clamp(88 + t * 6 + Math.sin(month * 1.3) * 2, 0, 100))
    const customers = Math.round(clamp(18 + t * 6 + Math.sin(month * 1.2) * 3, 0, 100))

    return { month, effort, customers }
  })
}

function ScenarioLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600">
      <span className="inline-flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: "hsl(var(--chart-1))" }}
        />
        customers coming in
      </span>
      <span className="inline-flex items-center gap-2">
        <span
          className="h-0 w-5 border-t-2 border-dashed"
          style={{ borderColor: "hsl(var(--chart-2))" }}
        />
        founder time + energy
      </span>
    </div>
  )
}

function ScenarioChart({ points }: { points: CaseStudyImpactPoint[] }) {
  const lastMonth = points[points.length - 1]?.month ?? 0
  const ticks = lastMonth >= 6 ? [0, Math.round(lastMonth / 2), lastMonth] : [0, lastMonth]

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[280px] w-full md:h-[320px]"
    >
      <LineChart data={points} margin={{ top: 12, right: 12, left: 4, bottom: 8 }}>
        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          stroke="hsl(var(--muted-foreground) / 0.2)"
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          ticks={ticks}
          interval="preserveStartEnd"
          minTickGap={24}
          tickFormatter={(value: number) => (value === 0 ? "start" : `m${value}`)}
        />
        <YAxis
          domain={[0, 100]}
          ticks={[0, 50, 100]}
          tickLine={false}
          axisLine={false}
	          stroke="hsl(var(--muted-foreground))"
	          fontSize={12}
	          tickFormatter={(value: number) =>
	            value === 0 ? "low" : value === 50 ? "medium" : value === 100 ? "high" : ""
	          }
	        />
        <ChartTooltip cursor={{ strokeDasharray: "3 3" }} content={<ImpactTooltip />} />
        <Line
          type="monotone"
          dataKey="customers"
          stroke="var(--color-customers)"
          strokeWidth={2.5}
          dot={false}
          activeDot={{
            r: 5,
            style: { filter: "drop-shadow(0 0 3px hsl(var(--chart-1)))" },
          }}
        />
        <Line
          type="monotone"
          dataKey="effort"
          stroke="var(--color-effort)"
          strokeWidth={2.5}
          strokeDasharray="6 4"
          dot={false}
          activeDot={{
            r: 5,
            style: { filter: "drop-shadow(0 0 3px hsl(var(--chart-2)))" },
          }}
        />
      </LineChart>
    </ChartContainer>
  )
}

function ScenarioPanel({
  scenario,
  points,
}: {
  scenario: ScenarioKey
  points: CaseStudyImpactPoint[]
}) {
  const isWithPrism = scenario === "with-prism"

  return (
    <div className="space-y-4">
      <ScenarioLegend />
      <ScenarioChart points={points} />
      <CaseStudyCallout title={isWithPrism ? "with prism" : "without prism"}>
        {isWithPrism ? (
          <>
            prism owns the website, content, and ads. founder effort drops over time while customers compound.
          </>
        ) : (
          <>
            the founder stays on the hook for execution and troubleshooting. effort stays high and results stall.
          </>
        )}
      </CaseStudyCallout>
    </div>
  )
}

export function FounderImpactGraph({ className, slug }: FounderImpactGraphProps) {
  const withPrismPoints = React.useMemo(() => {
    const config = getCaseStudyImpactGraphConfig(slug)
    return generateCaseStudyImpactPoints(config)
  }, [slug])

  const withoutPrismPoints = React.useMemo(
    () => buildWithoutPrismPoints(withPrismPoints.length),
    [withPrismPoints.length]
  )

  return (
    <Card className={cn("rounded-2xl border-neutral-200 bg-white shadow-sm", className)}>
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg font-semibold tracking-tight">
          buy back time. grow customers.
        </CardTitle>
        <CardDescription className="text-sm text-neutral-600">
          compare founder effort vs. inbound customers with prism vs. without prism.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="with-prism" className="gap-3">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="with-prism">with prism</TabsTrigger>
            <TabsTrigger value="without-prism">without prism</TabsTrigger>
          </TabsList>

          <TabsContent value="with-prism" className="mt-2">
            <ScenarioPanel scenario="with-prism" points={withPrismPoints} />
          </TabsContent>

          <TabsContent value="without-prism" className="mt-2">
            <ScenarioPanel scenario="without-prism" points={withoutPrismPoints} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-neutral-500">
        illustrative trendlines — the exact curve varies by business.
      </CardFooter>
    </Card>
  )
}
