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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

const CASE_STUDY_TITLE = "case study: dr. chris wong — rebuilding trust and growth after a practice handoff"
const CASE_STUDY_DESCRIPTION =
  "a before-and-after case study of how prism supported a dental practice transition with measurable, data-backed growth systems."
const CLIENT_SITE = "https://www.chriswongdds.com"

const summaryCards = [
  { label: "Growth framework", value: "3-phase", note: "trust → systems → scale" },
  { label: "Measurement stack", value: "GA + GSC + Ads", note: "single operating rhythm" },
  { label: "Partnership status", value: "ongoing", note: "monthly optimization continues" },
  { label: "Client journey", value: "long-term", note: "we stay in the loop now" },
]

const phaseMap = [
  {
    id: "before",
    title: "Before Prism",
    points: [
      "ownership transition created uncertainty in patient trust signaling",
      "local maps, website, and listing identity were mixed in discovery",
      "growth data was captured in separate places, not one operating rhythm",
    ],
  },
  {
    id: "during",
    title: "How prism helped",
    points: [
      "made ownership messaging explicit and easy to understand",
      "aligned local presence, review capture, and message systems to dr. wong",
      "rebuilt core infrastructure so SEO, website, and acquisition could compound safely",
    ],
  },
  {
    id: "now",
    title: "Now",
    points: [
      "online trust and discovery signals are coherent for transition patients",
      "every change is tied to measurable outcomes from GA + GSC + ads",
      "we continue tuning with Chris together for long-term growth",
    ],
  },
]

const trendConfig = {
  sessions: {
    label: "sessions",
    color: "var(--chart-1)",
  },
  users: {
    label: "users",
    color: "var(--chart-2)",
  },
  pageviews: {
    label: "pageviews",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const landingConfig = {
  sessions: {
    label: "Sessions",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const queryConfig = {
  clicks: {
    label: "Clicks",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig
const trendData = [
  { period: "prior 30d", sessions: 323, users: 263, pageviews: 516 },
  { period: "last 30d", sessions: 258, users: 221, pageviews: 431 },
]

const landingData = [
  { path: "/", sessions: 191 },
  { path: "/schedule", sessions: 58 },
  { path: "/about", sessions: 71 },
]

const queryShareData = [
  { query: "christopher wong dds", clicks: 7, fill: "var(--chart-1)" },
  { query: "chris wong dds", clicks: 4, fill: "var(--chart-2)" },
  { query: "kris hamamoto", clicks: 3, fill: "var(--chart-3)" },
  { query: "other", clicks: 34, fill: "var(--chart-4)" },
]

const proofRows = [
  {
    hypothesis: "Stabilize trust signals before scaling spend",
    action: "Reframed ownership messaging + aligned local listings and review flow",
    signal: "clearer local discovery path and reduced mismatch across touchpoints",
    outcome: "transition friction became easier for patients to trust",
  },
  {
    hypothesis: "Build one measurement source of truth",
    action: "Linked GA/GSC/ads reporting and standardized updates",
    signal: "dashboards now track same date windows + campaign outcomes",
    outcome: "optimization no longer depends on guesswork",
  },
  {
    hypothesis: "Scale only after confidence is restored",
    action: "Ran a controlled paid strategy tied to updated landing pages",
    signal: "$135.59 spend, 8 conversions, $16.95 cost/conversion",
    outcome: "efficient baseline established for future controlled growth",
  },
]

const tableHeaders = ["Hypothesis", "Action", "Signal", "Outcome"]

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
              <strong>from handoff risk to measurable growth systems</strong>
            </p>
            <p>
              dr. chris wong purchased a well-established palo alto practice. the highest-risk moment was not the clinical handoff — it was patient
              trust continuity across the online journey.
            </p>
            <p>
              prism partnered with him long-term to make that transition easier: align the website, local search presence, and acquisition around one
              clear story and one measurable operating framework.
            </p>

            <div className="not-prose">
              <Button asChild variant="outline" className="rounded-full">
                <Link href={CLIENT_SITE} target="_blank" rel="noopener noreferrer">
                  visit chriswongdds.com
                </Link>
              </Button>
            </div>

            <p>
              <strong>industry:</strong> dentistry · <strong>location:</strong> palo alto, ca · <strong>scope:</strong> website, seo, local
              listings, ads, analytics
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

            <h2>the story arc: before prism → prism in practice → now</h2>
            <Tabs defaultValue="before" className="not-prose">
              <TabsList>
                {phaseMap.map((phase) => (
                  <TabsTrigger key={phase.id} value={phase.id}>
                    {phase.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {phaseMap.map((phase) => (
                <TabsContent key={phase.id} value={phase.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{phase.title}</CardTitle>
                      <CardDescription>
                        {phase.id === "before"
                          ? "what was happening before structured growth work"
                          : phase.id === "during"
                            ? "what Prism implemented together"
                            : "where the practice stands today"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.points.map((point) => (
                          <li key={point}>• {point}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            <h2>performance dashboard: what we’re measuring and why it matters</h2>
            <p>
              <strong>measurement window:</strong> 2026-01-19 → 2026-02-17 (last 30 days). this is a truthful baseline, not a vanity snapshot.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>website behavior trend</CardTitle>
                  <CardDescription>sessions, users, and pageviews across two periods</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={trendConfig} className="h-64 w-full">
                    <LineChart data={trendData} margin={{ left: 12, right: 16, top: 10, bottom: 4 }}>
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
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} />
                      <Line type="monotone" dataKey="pageviews" stroke="var(--color-pageviews)" strokeWidth={2} />
                    </LineChart>
                  </ChartContainer>
                  <p className="mt-3 text-sm text-muted-foreground">
                    all three are down in this short window, which is why Prism keeps treating this as a foundation-strengthening phase before aggressive scale.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>top landing-path activity</CardTitle>
                  <CardDescription>where current traffic is strongest for controlled optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={landingConfig} className="h-64 w-full">
                    <BarChart data={landingData} margin={{ left: 6, right: 6, top: 10, bottom: 5 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="path" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent indicator="line" className="rounded-md border border-border/50" />}
                      />
                      <Bar dataKey="sessions" fill="var(--color-sessions)" radius={6} />
                    </BarChart>
                  </ChartContainer>
                  <p className="mt-3 text-sm text-muted-foreground">
                    this gives our next roadmap: optimize homepage-to-schedule flow and preserve the /about page trust lane.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>gsc query share (clicks)</CardTitle>
                  <CardDescription>where trust-search demand currently lands</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={queryConfig} className="h-64 w-full">
                    <PieChart>
                      <Pie
                        data={queryShareData}
                        dataKey="clicks"
                        nameKey="query"
                        innerRadius={50}
                        cx="50%"
                        cy="50%"
                        outerRadius={95}
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
                  <p className="mt-3 text-sm text-muted-foreground">
                    48 clicks, 1.75% CTR, and a 21.8 average position show room to scale service-intent pages.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>search + paid performance</CardTitle>
                  <CardDescription>high-trust baseline to scale from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <div className="rounded-md border border-border/50 p-3">
                      <p className="font-medium">Google Search Console</p>
                      <p className="text-sm text-muted-foreground">clicks: 48 (−4.0%), impressions: 2,740 (−6.3%), CTR: 1.75%</p>
                    </div>
                    <div className="rounded-md border border-border/50 p-3">
                      <p className="font-medium">Google Ads</p>
                      <p className="text-sm text-muted-foreground">spend: $135.59 · conversions: 8 · cost/conversion: $16.95</p>
                    </div>
                    <div className="rounded-md border border-border/50 p-3">
                      <p className="font-medium">Truth check</p>
                      <p className="text-sm text-muted-foreground">
                        metrics are not all "up" yet; they are stable and clean enough for controlled scaling with better intent targeting.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2>proof matrix: hypothesis → action → signal → result</h2>
            <div className="not-prose overflow-hidden rounded-md border border-border/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    {tableHeaders.map((header) => (
                      <TableHead key={header}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {proofRows.map((row) => (
                    <TableRow key={row.hypothesis}>
                      <TableCell>{row.hypothesis}</TableCell>
                      <TableCell>{row.action}</TableCell>
                      <TableCell>{row.signal}</TableCell>
                      <TableCell>{row.outcome}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <h2>what this means for other practices in transition</h2>
            <p>
              if you are inheriting or buying a practice, the winning move is not just better ads. it is building a trustworthy digital story and the systems that
              prove it.
            </p>
            <p>we have done that with dr. wong:</p>
            <ol>
              <li>stabilize trust signals first</li>
              <li>align local and paid systems around one identity</li>
              <li>run growth on evidence, not vibes</li>
            </ol>

            <p>
              we still work closely with dr. wong today because our job here is not one-and-done. the real win is the system improving month after month.
            </p>

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
        outcome="trust continuity strengthened, systems aligned, and marketing now runs on measurable growth inputs"
      />
    </div>
  )
}
