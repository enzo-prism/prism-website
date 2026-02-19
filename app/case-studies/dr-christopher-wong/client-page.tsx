"use client"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts"
import Link from "next/link"

const linkClassName =
  "font-medium text-foreground underline decoration-border/60 underline-offset-4 hover:decoration-border"

const CASE_STUDY_TITLE = "case study: dr. chris wong — building a trusted growth system for a practice handoff"
const CASE_STUDY_DESCRIPTION =
  "how prism rebuilt trust, aligned channels, and kept the growth stack disciplined from transition start to ongoing optimization."
const CLIENT_SITE = "https://www.chriswongdds.com"

const summaryCards = [
  {
    label: "Partnership timeline",
    value: "2+ years",
    note: "from legacy transition to a modern, performance-forward growth platform",
  },
  {
    label: "Data foundation",
    value: "GA + GSC + Ads",
    note: "multiple channels now measured in one operating rhythm",
  },
  {
    label: "Current phase",
    value: "Scale-ready cleanup",
    note: "stronger demand quality foundation; conversion stability focus",
  },
  {
    label: "Outcome now",
    value: "sustained progress",
    note: "clear baseline, controlled growth, stronger signal quality",
  },
]

const lifecyclePhases = [
  {
    phase: "Legacy to modern foundation",
    period: "2024-10 → 2025",
    points: [
      "prism inherited a fragmented patient-facing story during ownership transition",
      "legacy vendor tools and an old technical stack were slowing updates, reporting, and trust signaling",
      "local and review signals were inconsistent across website, profiles, and campaign messaging",
      "analytics signals were available but disconnected from daily growth decisions",
    ],
  },
  {
    phase: "Modernization phase",
    period: "2025-10 → 2025-12",
    points: [
      "migrated from legacy website/vendor operations to modern hosting and workflow tooling",
      "rebuilt dr. wong branding across website, social clips, and ads with a new image system",
      "designed a contemporary logo direction and refreshed brand language",
      "created a professional photo set to use across web, social, and campaigns",
    ],
  },
  {
    phase: "Growth-ready discipline",
    period: "2026-01 → 2026-02",
    points: [
      "full stack measurement and campaign quality checks became routine",
      "mobile-first pages and conversion flow were finalized for better usability",
      "video interview content and social clips were integrated to strengthen trust and authority",
      "search and ads baseline remained efficient but intentionally de-risked before scaling",
      "prism remains partnered with Chris for monthly optimization and policy cleanup",
    ],
  },
]

const gaConfig = {
  sessions: {
    label: "Sessions",
    color: "var(--chart-1)",
  },
  users: {
    label: "Users",
    color: "var(--chart-2)",
  },
  pageviews: {
    label: "Pageviews",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const gscConfig = {
  clicks: {
    label: "Clicks",
    color: "var(--chart-1)",
  },
  position: {
    label: "Avg position",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const lifecycleGaData = [
  { period: "2025-09", sessions: 298, users: 250, pageviews: 512 },
  { period: "2025-10", sessions: 357, users: 317, pageviews: 668 },
  { period: "2025-11", sessions: 386, users: 302, pageviews: 750 },
  { period: "2025-12", sessions: 341, users: 270, pageviews: 717 },
  { period: "2026-01", sessions: 387, users: 329, pageviews: 608 },
  { period: "2026-02", sessions: 103, users: 89, pageviews: 182 },
]

const gscLifecycleData = [
  { period: "2024-10", clicks: 73, position: 36.9, ctr: "3.27%" },
  { period: "2024-11", clicks: 83, position: 42.4, ctr: "2.60%" },
  { period: "2024-12", clicks: 89, position: 43.0, ctr: "2.91%" },
  { period: "2025-01", clicks: 102, position: 35.3, ctr: "3.88%" },
  { period: "2025-02", clicks: 83, position: 35.6, ctr: "3.00%" },
  { period: "2025-03", clicks: 74, position: 34.2, ctr: "2.41%" },
  { period: "2025-04", clicks: 87, position: 40.7, ctr: "2.61%" },
  { period: "2025-05", clicks: 80, position: 33.2, ctr: "2.83%" },
  { period: "2025-06", clicks: 120, position: 26.3, ctr: "8.60%" },
  { period: "2025-07", clicks: 70, position: 35.6, ctr: "4.11%" },
  { period: "2025-08", clicks: 72, position: 46.4, ctr: "1.14%" },
  { period: "2025-09", clicks: 66, position: 33.5, ctr: "1.08%" },
  { period: "2025-10", clicks: 67, position: 23.6, ctr: "1.31%" },
  { period: "2025-11", clicks: 61, position: 24.0, ctr: "1.24%" },
  { period: "2025-12", clicks: 76, position: 19.9, ctr: "1.84%" },
  { period: "2026-01", clicks: 53, position: 23.8, ctr: "1.57%" },
  { period: "2026-02", clicks: 28, position: 22.2, ctr: "2.07%" },
]

const landingData = [
  { path: "/", sessions: 191 },
  { path: "/schedule", sessions: 58 },
  { path: "/about", sessions: 71 },
  { path: "/services", sessions: 28 },
]

const queryShareData = [
  { query: "christopher wong dds", clicks: 7, fill: "var(--chart-1)" },
  { query: "chris wong dds", clicks: 4, fill: "var(--chart-2)" },
  { query: "kris hamamoto", clicks: 3, fill: "var(--chart-3)" },
  { query: "other branded + service-intent", clicks: 34, fill: "var(--chart-4)" },
]

const proofRows = [
  {
    signal: "Why baseline was unstable at the beginning",
    action: "Reframed transition messaging, unified maps/listings, and created one source-of-truth reporting.",
    result: "Patient trust signals now match across website, profiles, and paid traffic touchpoints.",
  },
  {
    signal: "Why this became compounding",
    action: "Tied SEO + paid actions to the same measurement windows and decision framework.",
    result: "Optimization decisions moved from guesswork to evidence, enabling safer scaling decisions.",
  },
  {
    signal: "Current growth value",
    action: "Kept Wong-DDS spend disciplined and focused on efficiency while policy constraints are cleaned up.",
    result: "Efficiency remains consistent at around $16–17 CPA, giving a controlled platform for future growth.",
  },
]

export default function ChristopherWongCaseStudy() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="container mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <p>case study</p>
            <h1>{CASE_STUDY_TITLE}</h1>
            <p>
              <strong>a long-cycle success story: from handoff uncertainty to disciplined growth infrastructure</strong>
            </p>
            <p>
              dr. chris wong’s case is not a one-time campaign win. it is a long transition partnership where the goal was to protect patient
              trust while replacing fragmented, risky growth signals with one measurable operating system.
            </p>
            <p>
              our job was to show progress from day one through today: improve discoverability, stabilize demand quality, and build a growth rhythm that can
              be safely scaled.
            </p>

            <div className="rounded-md border border-border/50 bg-muted/30 p-4 mt-4">
              <p>
                the technical and brand rebuild was just as important as the marketing layer. the legacy website and operational stack were upgraded from outdated systems,
                giving the team true control over speed, updates, and trust-first messaging.
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>• migrated site operations onto a modern stack to support rapid, reliable updates and cleaner reporting</li>
                <li>• redesigned brand elements, including a new logo direction, to keep the practice positioning modern and premium</li>
                <li>• created new office photo assets that now power the site, social feed, and campaign visuals</li>
                <li>• captured a video interview to humanize the practice story and support trust-building content</li>
                <li>• connected everything to one operating rhythm: website, local listings, Google Ads, and performance analytics</li>
              </ul>
            </div>

            <div className="not-prose">
              <Button asChild variant="outline" className="rounded-full">
                <Link href={CLIENT_SITE} target="_blank" rel="noopener noreferrer">
                  visit chriswongdds.com
                </Link>
              </Button>
            </div>

            <p>
              <strong>industry:</strong> dentistry · <strong>location:</strong> palo alto, ca · <strong>scope:</strong> website, seo, local listings, ads,
              analytics
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {summaryCards.map((card) => (
                <Card key={card.label}>
                  <CardHeader>
                    <CardTitle>{card.label}</CardTitle>
                    <CardDescription>{card.value}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{card.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <hr />

            <h2>how the story actually unfolded (and why this is still a success)</h2>
            <div className="grid gap-4">
              {lifecyclePhases.map((item) => (
                <Card key={item.phase}>
                  <CardHeader>
                    <CardTitle>{item.phase}</CardTitle>
                    <CardDescription>period: {item.period}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {item.points.map((point) => (
                        <li key={point}>• {point}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p>
              this is the key distinction: we are showing the <strong>relationship arc</strong>, not only the last 30-day performance.
            </p>

            <h2>full-cycle performance: GA + GSC trajectory</h2>
            <p>
              below are the relationship metrics we can verify across the longest available historical windows: GA from 2025-09 and GSC from 2024-10.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>GA lifecycle (6-month view)</CardTitle>
                  <CardDescription>sessions, users, and pageviews (last 6 months with GA values)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={gaConfig} className="h-72 w-full">
                    <LineChart data={lifecycleGaData} margin={{ left: 12, right: 16, top: 10, bottom: 4 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="period" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip
                        content={<ChartTooltipContent indicator="dot" className="rounded-md border border-border/50" />}
                      />
                      <Line
                        type="monotone"
                        dataKey="sessions"
                        stroke="var(--color-sessions)"
                        strokeWidth={2.5}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line type="monotone" dataKey="users" stroke="var(--color-users)" />
                      <Line type="monotone" dataKey="pageviews" stroke="var(--color-pageviews)" />
                    </LineChart>
                  </ChartContainer>
                  <p className="mt-3 text-sm text-muted-foreground">
                    the trajectory shows seasonality and a recent traffic dip. instead of “all good” claims, we treat this as a base-build phase and optimize for cleaner,
                    higher-quality growth before expanding spend.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>GSC lifecycle (organic demand signals)</CardTitle>
                  <CardDescription>clicks and average position progression</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={gscConfig} className="h-72 w-full">
                    <LineChart data={gscLifecycleData} margin={{ left: 12, right: 16, top: 10, bottom: 4 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="period" tickLine={false} axisLine={false} />
                      <YAxis yAxisId="left" tickLine={false} axisLine={false} />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[0, 60]}
                        tickFormatter={(value) => `${value}`}
                        tickLine={false}
                        axisLine={false}
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent indicator="line" className="rounded-md border border-border/50" />}
                      />
                      <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="var(--color-clicks)" />
                      <Line yAxisId="right" type="monotone" dataKey="position" stroke="var(--color-position)" />
                    </LineChart>
                  </ChartContainer>
                  <p className="mt-3 text-sm text-muted-foreground">
                    search position improved significantly from the mid-40s period to the low-20s recently, indicating the right direction in visibility even as click volume
                    moved seasonally.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>current search intent mix</CardTitle>
                <CardDescription>most recent query profile with branded + service-intent context</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ clicks: { label: "Clicks", color: "var(--chart-1)" } } satisfies ChartConfig} className="h-56 w-full">
                  <PieChart>
                    <Pie
                      data={queryShareData}
                      dataKey="clicks"
                      nameKey="query"
                      innerRadius={40}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label
                    >
                      {queryShareData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={<ChartTooltipContent hideLabel nameKey="query" className="rounded-md border border-border/50" />}
                    />
                  </PieChart>
                </ChartContainer>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <div className="rounded-md border border-border/50 p-3">
                    <p className="font-medium">Google Search Console (recent)</p>
                    <p className="text-sm text-muted-foreground">1.75% CTR with a strong branded discovery anchor and stronger service intent mix.</p>
                  </div>
                  <div className="rounded-md border border-border/50 p-3">
                    <p className="font-medium">Google Ads benchmark</p>
                    <p className="text-sm text-muted-foreground">$135.59 spend · 8 conversions · $16.95 CPA (recent snapshot)</p>
                  </div>
                  <div className="rounded-md border border-border/50 p-3">
                    <p className="font-medium">What this means</p>
                    <p className="text-sm text-muted-foreground">efficiency is stable; policy cleanup and targeting precision are the biggest next growth levers.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h2>brand and content assets that supported the growth engine</h2>
            <div className="grid gap-3 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>modern brand system</CardTitle>
                  <CardDescription>design + logo + identity refresh</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">new identity direction reduced outdated cues and made web, social, and campaign visuals look coherent and premium.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>content assets</CardTitle>
                  <CardDescription>photo shoot + clinic video interview</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    we built real, high-trust assets from actual office photos and a clinic interview. the full interview is now live on the podcasts page.
                    <Link href="/podcasts" className={linkClassName}> watch the interview</Link>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>mobile-first experience</CardTitle>
                  <CardDescription>better journeys for real patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">site speed, page hierarchy, and conversion paths were rebuilt so patient intent moved to action more reliably.</p>
                </CardContent>
              </Card>
            </div>

            <h2>top landing activity (where optimization is now focused)</h2>
            <Card>
              <CardHeader>
                <CardTitle>landing page concentration</CardTitle>
                <CardDescription>traffic priorities from the latest GA sample</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={gaConfig} className="h-64 w-full">
                  <BarChart data={landingData} margin={{ left: 6, right: 6, top: 10, bottom: 5 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="path" />
                    <YAxis />
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="line" className="rounded-md border border-border/50" />}
                    />
                    <Line dataKey="sessions" />
                    <Bar dataKey="sessions" fill="var(--chart-1)" radius={6} />
                  </BarChart>
                </ChartContainer>
                <p className="mt-3 text-sm text-muted-foreground">
                  homepage-to-schedule remains the main conversion corridor, with /about functioning as the strongest trust-support path.
                </p>
              </CardContent>
            </Card>

            <h2>what actually moved the needle</h2>
            <div className="not-prose overflow-hidden rounded-md border border-border/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Signal</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {proofRows.map((row) => (
                    <TableRow key={row.signal}>
                      <TableCell>{row.signal}</TableCell>
                      <TableCell>{row.action}</TableCell>
                      <TableCell>{row.result}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <h2>the end-state we are building toward</h2>
            <p>
              the current result is clear: prism delivered a reliable digital growth system for a transition client, and it continues to compound month over month as we
              run controlled optimization cycles.
            </p>

            <Card>
              <CardHeader>
                <CardTitle>working with dr. wong, still going strong</CardTitle>
                <CardDescription>not a launch-and-forget project</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  we are still in active partnership mode: improving ranking focus, tightening conversion quality, and preparing the next scaling phase around the strongest
                  service-intent opportunities while continuing the brand evolution work.
                </p>
              </CardContent>
            </Card>

            <h2>next step</h2>
            <ul>
              <li>
                get a <Link href="/free-analysis" className={linkClassName}>
                  free analysis
                </Link>
              </li>
              <li>
                see <Link href="/get-started" className={linkClassName}>
                  get started
                </Link>
              </li>
              <li>
                or <Link href="/contact" className={linkClassName}>
                  contact prism
                </Link>
              </li>
            </ul>
          </article>
        </div>

        <div className="mt-12">
          <SocialShare
            url="https://www.design-prism.com/case-studies/dr-christopher-wong"
            imageUrl="https://www.design-prism.com/dr-wong-polaroids.png"
            title={CASE_STUDY_TITLE}
            description={CASE_STUDY_DESCRIPTION}
          />
        </div>
      </main>
      <Footer />
      <CaseStudySchema
        title={CASE_STUDY_TITLE}
        description={CASE_STUDY_DESCRIPTION}
        url="https://www.design-prism.com/case-studies/dr-christopher-wong"
        imageUrl="https://www.design-prism.com/dr-wong-polaroids.png"
        datePublished="2025-01-15T00:00:00.000Z"
        dateModified="2026-02-19T00:00:00.000Z"
        clientName="Dr. Christopher B. Wong"
        outcome="trust continuity improved, demand quality and channel measurement stabilized, and growth now runs from a sustainable optimization framework"
      />
    </div>
  )
}
