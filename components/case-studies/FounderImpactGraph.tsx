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
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type FounderImpactGraphProps = {
  className?: string
  slug?: string
}

const chartConfig = {
  customers: { label: "customers coming in" },
  effort: { label: "founder time + energy" },
} satisfies ChartConfig

type ScenarioKey = "with-prism" | "without-prism"

type ResolvedChartColors = {
  customers: string
  effort: string
  axis: string
  grid: string
}

function levelLabel(value: number) {
  if (value >= 70) return "high"
  if (value >= 40) return "medium"
  return "low"
}

function parseHslTriplet(value: string) {
  const parts = value.replace(/\s+/g, " ").trim().split(" ")
  if (parts.length < 3) return null

  const [h, s, l] = parts
  if (!h || !s || !l) return null

  return { h, s, l }
}

function toHsl(triplet: { h: string; s: string; l: string }) {
  return `hsl(${triplet.h}, ${triplet.s}, ${triplet.l})`
}

function toHsla(triplet: { h: string; s: string; l: string }, alpha: number) {
  return `hsla(${triplet.h}, ${triplet.s}, ${triplet.l}, ${alpha})`
}

function resolveChartColors(): ResolvedChartColors {
  const fallbackChart1 = parseHslTriplet("12 76% 61%")!
  const fallbackChart2 = parseHslTriplet("173 58% 39%")!
  const fallbackMuted = parseHslTriplet("0 0% 45.1%")!

  if (typeof window === "undefined") {
    return {
      customers: toHsl(fallbackChart1),
      effort: toHsl(fallbackChart2),
      axis: toHsl(fallbackMuted),
      grid: toHsla(fallbackMuted, 0.2),
    }
  }

  const styles = getComputedStyle(document.documentElement)
  const chart1 = parseHslTriplet(styles.getPropertyValue("--chart-1")) ?? fallbackChart1
  const chart2 = parseHslTriplet(styles.getPropertyValue("--chart-2")) ?? fallbackChart2
  const muted = parseHslTriplet(styles.getPropertyValue("--muted-foreground")) ?? fallbackMuted

  return {
    customers: toHsl(chart1),
    effort: toHsl(chart2),
    axis: toHsl(muted),
    grid: toHsla(muted, 0.2),
  }
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

function ScenarioLegend({ colors }: { colors: ResolvedChartColors }) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600">
      <span className="inline-flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colors.customers }} />
        customers coming in
      </span>
      <span className="inline-flex items-center gap-2">
        <span
          className="h-0 w-5 border-t-2 border-dashed"
          style={{ borderColor: colors.effort }}
        />
        founder time + energy
      </span>
    </div>
  )
}

function ScenarioChart({
  points,
  colors,
}: {
  points: CaseStudyImpactPoint[]
  colors: ResolvedChartColors
}) {
  const lastMonth = points[points.length - 1]?.month ?? 0
  const ticks = lastMonth >= 6 ? [0, Math.round(lastMonth / 2), lastMonth] : [0, lastMonth]

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[280px] w-full md:h-[320px]"
    >
      <LineChart data={points} margin={{ top: 12, right: 12, left: 4, bottom: 8 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={colors.grid} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          stroke={colors.axis}
          fontSize={12}
          ticks={ticks}
          interval="preserveStartEnd"
          minTickGap={24}
          tickFormatter={(value: number) => (value === 0 ? "start" : `m${value}`)}
        />
        <YAxis
          domain={[-5, 105]}
          ticks={[0, 50, 100]}
          tickLine={false}
          axisLine={false}
          stroke={colors.axis}
          fontSize={12}
          tickFormatter={(value: number) =>
            value === 0 ? "low" : value === 50 ? "medium" : value === 100 ? "high" : ""
          }
        />
        <ChartTooltip cursor={{ strokeDasharray: "3 3" }} content={<ImpactTooltip />} />
        <Line
          type="monotone"
          dataKey="customers"
          stroke={colors.customers}
          strokeWidth={2.5}
          dot={false}
          isAnimationActive={false}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="effort"
          stroke={colors.effort}
          strokeWidth={2.5}
          strokeDasharray="6 4"
          dot={false}
          isAnimationActive={false}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ChartContainer>
  )
}

function ScenarioPanel({
  scenario,
  points,
  colors,
}: {
  scenario: ScenarioKey
  points: CaseStudyImpactPoint[]
  colors: ResolvedChartColors
}) {
  const isWithPrism = scenario === "with-prism"

  return (
    <div className="space-y-4">
      <ScenarioLegend colors={colors} />
      <ScenarioChart points={points} colors={colors} />
      <CaseStudyCallout title={isWithPrism ? "with prism" : "without prism"}>
        {isWithPrism ? (
          <div className="space-y-1">
            <p>customers go up. your effort goes down.</p>
            <p>we build it, run it, and keep improving it.</p>
          </div>
        ) : (
          <div className="space-y-1">
            <p>your effort stays high.</p>
            <p>results stay "fine." (until you burn out and rebuild again)</p>
          </div>
        )}
      </CaseStudyCallout>
    </div>
  )
}

export function FounderImpactGraph({ className, slug }: FounderImpactGraphProps) {
  const colors = React.useMemo(() => resolveChartColors(), [])
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
          toggle to compare what happens over time.
        </CardTitle>
        <CardDescription className="text-sm text-neutral-600">
          customers coming in vs founder time + energy.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="with-prism" className="gap-3">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="with-prism">with prism</TabsTrigger>
            <TabsTrigger value="without-prism">without prism</TabsTrigger>
          </TabsList>

          <TabsContent value="with-prism" className="mt-2">
            <ScenarioPanel scenario="with-prism" points={withPrismPoints} colors={colors} />
          </TabsContent>

          <TabsContent value="without-prism" className="mt-2">
            <ScenarioPanel scenario="without-prism" points={withoutPrismPoints} colors={colors} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
