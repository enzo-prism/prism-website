"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCaseStudyWorkProfileForCase, normalizeCaseStudyWorkProfile } from "@/lib/case-study-work-highlights"
import type { LucideIcon } from "lucide-react"
import {
  Activity,
  Apple,
  ArrowLeftRight,
  BotMessageSquare,
  Brain,
  ChartLine,
  Database,
  Figma,
  LayoutDashboard,
  MapPin,
  Megaphone,
  Music2,
  Palette,
  Radar,
  Rocket,
  Search,
  Globe,
  SearchCheck,
  SendHorizontal,
  Share2,
  Sparkles,
  Store,
  Video,
  Building2,
} from "lucide-react"

type CaseStudyWorkHighlightsProps = {
  caseStudySlug: string
}

const SERVICE_TILE_COLORS = [
  { bg: "#e6fbff", text: "#38bdf8", border: "#b3e5f8" },
  { bg: "#eaffea", text: "#34d399", border: "#b5e6b7" },
  { bg: "#fff0f4", text: "#fb7185", border: "#f9bfce" },
  { bg: "#fff5e1", text: "#fbbf24", border: "#ffd89a" },
  { bg: "#ece9ff", text: "#a78bfa", border: "#c7c0ff" },
  { bg: "#f8e9ff", text: "#d946ef", border: "#e0b6ff" },
  { bg: "#e8fcf4", text: "#2dd4bf", border: "#a9ead9" },
  { bg: "#e8f3ff", text: "#60a5fa", border: "#b5d9ff" },
  { bg: "#fff4e6", text: "#f97316", border: "#ffc985" },
  { bg: "#f0f5ff", text: "#818cf8", border: "#c4d0ff" },
  { bg: "#f5f8ff", text: "#64748b", border: "#bcc2f4" },
  { bg: "#ffedf7", text: "#f472b6", border: "#ffbed4" },
]

const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  "Website transfer": ArrowLeftRight,
  "Website design": LayoutDashboard,
  "Brand design": Palette,
  "SEO/AEO": Search,
  "Local listing optimization": MapPin,
  "Google Ads": Megaphone,
  "Meta ads": Share2,
  "LinkedIn ads": SendHorizontal,
  "CRM integration": Database,
  "Enterprise analytics setup and optimization": ChartLine,
  "Video editing": Video,
}

const TECH_ICON_MAP: Record<string, LucideIcon> = {
  Codex: Sparkles,
  "Claude Code": BotMessageSquare,
  Vercel: Rocket,
  Figma: Figma,
  "GPT-5.3 Codex": Brain,
  "Opus 4.6": Music2,
  "Gemini 3.1": Radar,
  "Google Analytics": ChartLine,
  "Hotjar analytics": Activity,
  "Google Search Console": SearchCheck,
  Semrush: Globe,
  "Google Business Profile": Building2,
  "Apple Business Connect": Apple,
  "Yelp for Business": Store,
}

const FALLBACK_SERVICE_ICON: LucideIcon = Search
const FALLBACK_TECH_ICON: LucideIcon = Sparkles
const FALLBACK_TECH_ICON_COLOR = "#9ca3af"

const TECH_ICON_COLOR_MAP: Record<string, string> = {
  Codex: "#f0abfc",
  "Claude Code": "#38bdf8",
  Vercel: "#ffffff",
  Figma: "#f24e1e",
  "GPT-5.3 Codex": "#a78bfa",
  "Opus 4.6": "#f97316",
  "Gemini 3.1": "#3b82f6",
  "Google Analytics": "#f59e0b",
  "Hotjar analytics": "#ff6b4d",
  "Google Search Console": "#34a853",
  Semrush: "#f97316",
  "Google Business Profile": "#4285f4",
  "Apple Business Connect": "#6e7681",
  "Yelp for Business": "#d93025",
}

export function CaseStudyWorkHighlights({ caseStudySlug }: CaseStudyWorkHighlightsProps) {
  const profile = normalizeCaseStudyWorkProfile(getCaseStudyWorkProfileForCase(caseStudySlug))

  if (!profile.services.length && !profile.techStack.length) {
    return null
  }

  return (
    <section className="border-b border-border/60 bg-muted/40 px-4 py-10">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">work highlights</p>
            <CardTitle className="text-2xl tracking-tight sm:text-3xl">What we delivered for this case</CardTitle>
            <CardDescription>Switch between the core service work and the systems stack used to execute it.</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="tech-stack">Tech stack</TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="mt-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  {profile.services.map((service, index) => {
                    const color = SERVICE_TILE_COLORS[index % SERVICE_TILE_COLORS.length]
                    const ServiceIcon = SERVICE_ICON_MAP[service] ?? FALLBACK_SERVICE_ICON

                    return (
                      <div
                        key={service}
                        className="rounded-lg border border-zinc-700 bg-black px-4 py-3"
                      >
                        <div className="flex min-h-[28px] items-start gap-3">
                          <ServiceIcon className="mt-0.5 size-4 shrink-0" style={{ color: color.text }} />
                          <span className="text-sm font-semibold leading-tight text-white">{service}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="tech-stack" className="mt-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  {profile.techStack.map((tech) => {
                    const TechIcon = TECH_ICON_MAP[tech] ?? FALLBACK_TECH_ICON

                    return (
                      <div key={tech} className="rounded-lg border border-zinc-700 bg-black px-4 py-3">
                        <div className="flex min-h-[28px] items-start gap-3">
                          <TechIcon
                            className="size-4"
                            style={{ color: TECH_ICON_COLOR_MAP[tech] ?? FALLBACK_TECH_ICON_COLOR }}
                          />
                          <span className="text-sm font-medium leading-tight text-zinc-300">{tech}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
