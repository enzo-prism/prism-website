'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  getCaseStudyWorkProfileForCase,
  normalizeCaseStudyWorkProfile,
} from '@/lib/case-study-work-highlights'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Apple,
  ArrowLeftRight,
  BotMessageSquare,
  Brain,
  ChartLine,
  Database,
  Figma,
  GitBranch,
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
  X,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import {
  BrandLogo,
  type BrandLogoKey,
  type BrandLogoTheme,
} from '@/components/brand-logo'

// Services with a dedicated marketing page get a deep link in the dialog.
const SERVICE_ROUTE_MAP: Record<string, { href: string; label: string }> = {
  'Website design': { href: '/websites', label: 'Explore Prism websites' },
  'SEO/AEO': { href: '/seo', label: 'Explore Prism SEO' },
  'Google Ads': { href: '/ads', label: 'Explore Prism ads' },
  'Local listing optimization': {
    href: '/local-listings',
    label: 'Explore Prism local listings',
  },
}

type CaseStudyWorkHighlightsProps = {
  caseStudySlug: string
}

type BrandLogoSpec = {
  brand: BrandLogoKey
  theme?: BrandLogoTheme
  dialogTheme?: BrandLogoTheme
}

const SERVICE_TILE_COLORS = [
  { bg: '#e6fbff', text: '#38bdf8', border: '#b3e5f8' },
  { bg: '#eaffea', text: '#34d399', border: '#b5e6b7' },
  { bg: '#fff0f4', text: '#fb7185', border: '#f9bfce' },
  { bg: '#fff5e1', text: '#fbbf24', border: '#ffd89a' },
  { bg: '#ece9ff', text: '#a78bfa', border: '#c7c0ff' },
  { bg: '#f8e9ff', text: '#d946ef', border: '#e0b6ff' },
  { bg: '#e8fcf4', text: '#2dd4bf', border: '#a9ead9' },
  { bg: '#e8f3ff', text: '#60a5fa', border: '#b5d9ff' },
  { bg: '#fff4e6', text: '#f97316', border: '#ffc985' },
  { bg: '#f0f5ff', text: '#818cf8', border: '#c4d0ff' },
  { bg: '#f5f8ff', text: '#64748b', border: '#bcc2f4' },
  { bg: '#ffedf7', text: '#f472b6', border: '#ffbed4' },
]

const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  'Website transfer': ArrowLeftRight,
  'Website design': LayoutDashboard,
  'Brand design': Palette,
  'SEO/AEO': Search,
  'Local listing optimization': MapPin,
  'Google Ads': Megaphone,
  'Meta ads': Share2,
  'LinkedIn ads': SendHorizontal,
  'CRM integration': Database,
  'Formspree form system': Database,
  'AI assistant setup': BotMessageSquare,
  'Enterprise analytics setup and optimization': ChartLine,
  'Video editing': Video,
}

const TECH_ICON_MAP: Record<string, LucideIcon> = {
  Codex: Sparkles,
  'Claude Code': BotMessageSquare,
  Vercel: Rocket,
  Figma: Figma,
  'GPT-5.3 Codex': Brain,
  'GPT-5.5 xhigh': Brain,
  'Opus 4.6': Music2,
  'Gemini 3.1': Radar,
  'Google Analytics': ChartLine,
  'Next.js': Globe,
  Replit: Rocket,
  Git: GitBranch,
  Cursor: Sparkles,
  Webflow: Globe,
  'Meta Business Suite': Share2,
  'Meta Pixel': Share2,
  'Hotjar analytics': Activity,
  'Google Search Console': SearchCheck,
  Formspree: Database,
  ElevenLabs: BotMessageSquare,
  Semrush: Globe,
  'Google Business Profile': Building2,
  'Apple Business Connect': Apple,
  'Yelp for Business': Store,
}

const TECH_LOGO_MAP: Partial<Record<string, BrandLogoSpec>> = {
  Codex: { brand: 'openai', theme: 'dark', dialogTheme: 'light' },
  'Claude Code': { brand: 'claude' },
  Vercel: { brand: 'vercel', theme: 'dark', dialogTheme: 'light' },
  Figma: { brand: 'figma' },
  'GPT-5.3 Codex': {
    brand: 'openai',
    theme: 'dark',
    dialogTheme: 'light',
  },
  'GPT-5.5 xhigh': {
    brand: 'openai',
    theme: 'dark',
    dialogTheme: 'light',
  },
  'Opus 4.6': { brand: 'anthropic', theme: 'dark', dialogTheme: 'light' },
  'Gemini 3.1': { brand: 'gemini' },
  'Google Analytics': { brand: 'googleAnalytics' },
  Replit: { brand: 'replit' },
  Git: { brand: 'git' },
  Cursor: { brand: 'cursor', theme: 'dark', dialogTheme: 'light' },
  Webflow: { brand: 'webflow' },
  'Meta Business Suite': { brand: 'meta' },
  'Meta Pixel': { brand: 'meta' },
}

const SERVICE_LOGO_MAP: Partial<Record<string, BrandLogoSpec>> = {
  'Meta ads': { brand: 'meta' },
  'LinkedIn ads': { brand: 'linkedin' },
}

const FALLBACK_SERVICE_ICON: LucideIcon = Search
const FALLBACK_TECH_ICON: LucideIcon = Sparkles
const FALLBACK_TECH_ICON_COLOR = '#9ca3af'
const FALLBACK_SERVICE_COLOR = '#f8fafc'

const TECH_ICON_COLOR_MAP: Record<string, string> = {
  Codex: '#f0abfc',
  'Claude Code': '#38bdf8',
  Vercel: '#ffffff',
  Figma: '#f24e1e',
  'GPT-5.3 Codex': '#a78bfa',
  'GPT-5.5 xhigh': '#c084fc',
  'Opus 4.6': '#f97316',
  'Gemini 3.1': '#3b82f6',
  'Google Analytics': '#f59e0b',
  'Next.js': '#ffffff',
  'Hotjar analytics': '#ff6b4d',
  'Google Search Console': '#34a853',
  Formspree: '#22c55e',
  ElevenLabs: '#f8fafc',
  'Meta Pixel': '#60a5fa',
  Semrush: '#f97316',
  'Google Business Profile': '#4285f4',
  'Apple Business Connect': '#6e7681',
  'Yelp for Business': '#d93025',
}

const WORK_HIGHLIGHT_COPY: Record<
  string,
  {
    type: 'service' | 'tech'
    whatItIs: string
    whyPrism: string
  }
> = {
  'Website transfer': {
    type: 'service',
    whatItIs:
      'A planned migration of a live website and its supporting systems to a faster, safer, and more scalable stack.',
    whyPrism:
      'Prism protects search rankings, traffic, and lead quality with careful inventory, URL mapping, redirects, and launch safeguards.',
  },
  'Website design': {
    type: 'service',
    whatItIs:
      'The strategic build of layout, hierarchy, visual language, and user flow for an intuitive conversion experience.',
    whyPrism:
      'Prism delivers clean interfaces that reduce friction at every step and improve trust in a way that increases inquiry-to-conversion momentum.',
  },
  'Brand design': {
    type: 'service',
    whatItIs:
      'Identity systems for how a business appears across websites, profiles, social, and outreach assets.',
    whyPrism:
      'Prism makes brand expression consistent and memorable, so prospects feel the same credibility from first click to first call.',
  },
  'SEO/AEO': {
    type: 'service',
    whatItIs:
      'Optimizing a site so it is discoverable by search engines and AI assistants with strong topical clarity and intent coverage.',
    whyPrism:
      'Prism combines technical health, content authority, and local intent mapping to make organic growth systems compound over time.',
  },
  'Local listing optimization': {
    type: 'service',
    whatItIs:
      'Alignment and optimization of location-based profiles so local intent is captured consistently where users search first.',
    whyPrism:
      'Prism keeps core business signals consistent across ecosystems, helping local customers choose faster and with greater confidence.',
  },
  'Google Ads': {
    type: 'service',
    whatItIs:
      'Performance media strategy and campaign execution across Google properties to capture high-intent demand.',
    whyPrism:
      'Prism pairs granular intent mapping with disciplined creative testing and optimization loops to improve cost per result.',
  },
  'Meta ads': {
    type: 'service',
    whatItIs:
      'A paid social growth stack using audience segmentation, creative testing, and funnel alignment across Meta channels.',
    whyPrism:
      'Prism turns social content into growth experiments with clear signal tracking and faster cutover between what works and what does not.',
  },
  'LinkedIn ads': {
    type: 'service',
    whatItIs:
      'B2B-focused paid media for decision-makers through professional audience targeting and intent-oriented messaging.',
    whyPrism:
      'Prism uses precise audience signals and message ladders to make outreach scalable without sacrificing quality.',
  },
  'CRM integration': {
    type: 'service',
    whatItIs:
      'Connecting lead sources, forms, and communication tools into a system that supports consistent follow-through.',
    whyPrism:
      'Prism minimizes lead leakage by building workflows where every inquiry is routed, tracked, and followed up with disciplined consistency.',
  },
  'Formspree form system': {
    type: 'service',
    whatItIs:
      'A lightweight form backend for routing inquiries securely without forcing a client into a heavy custom application.',
    whyPrism:
      'Prism uses it when speed, reliability, and clean lead handoff matter more than adding unnecessary platform complexity.',
  },
  'AI assistant setup': {
    type: 'service',
    whatItIs:
      'A conversational assistant layer that helps answer common questions and qualify interest before a human follow-up.',
    whyPrism:
      'Prism fits AI into the conversion path where it reduces friction, preserves context, and keeps the primary business goal clear.',
  },
  'Enterprise analytics setup and optimization': {
    type: 'service',
    whatItIs:
      'Designing and maintaining measurement architecture to track behavior, conversions, and business outcomes across channels.',
    whyPrism:
      'Prism applies this to move teams from guesswork to execution, where decisions are driven by clear signal and clear outcomes.',
  },
  'Video editing': {
    type: 'service',
    whatItIs:
      'Editing and packaging video content so message, pacing, captions, and calls-to-action are aligned for conversion.',
    whyPrism:
      'Prism produces high-impact content that communicates authority quickly and supports both organic and paid channel performance.',
  },
  Codex: {
    type: 'tech',
    whatItIs:
      'An execution framework for AI-assisted engineering and operations loops that accelerate repetitive but critical tasks.',
    whyPrism:
      'Prism uses it to compress production timelines while protecting quality through repeatable system patterns.',
  },
  'Claude Code': {
    type: 'tech',
    whatItIs:
      'Developer-focused AI tooling for fast implementation, refactoring, debugging, and code-level experimentation.',
    whyPrism:
      'Prism pairs human-led architecture decisions with fast AI coding iterations to move client launches and improvements forward.',
  },
  Vercel: {
    type: 'tech',
    whatItIs:
      'A scalable hosting and edge platform for reliable performance, fast releases, and modern web distribution.',
    whyPrism:
      'Prism uses this stack to keep client sites performant while iterating quickly between experiments and launches.',
  },
  Figma: {
    type: 'tech',
    whatItIs:
      'Collaborative design system workspace for interfaces, assets, and visual standards across teams and deliverables.',
    whyPrism:
      'Prism keeps brand and product intent synchronized across web, ad creative, and editorial outputs with less visual drift.',
  },
  'GPT-5.3 Codex': {
    type: 'tech',
    whatItIs:
      'A high-capability model layer used for strategy synthesis, drafting, and high-volume ideation support.',
    whyPrism:
      'Prism uses it to maintain output velocity while preserving editorial quality and specific client voice across campaigns.',
  },
  'GPT-5.5 xhigh': {
    type: 'tech',
    whatItIs:
      'A high-reasoning AI configuration used inside Codex for planning, implementation, QA analysis, and long-context build decisions.',
    whyPrism:
      'Prism uses it to compress complex production work into tighter loops while still checking claims against the shipped source.',
  },
  'Opus 4.6': {
    type: 'tech',
    whatItIs:
      'A language model system focused on precision drafting, reasoning, and high-fidelity written output.',
    whyPrism:
      'Prism integrates Opus into strategic content pipelines where nuance and accuracy materially affect conversion and trust.',
  },
  'Gemini 3.1': {
    type: 'tech',
    whatItIs:
      'A multimodal AI platform used for analysis and ideation across strategy, operations, and content support.',
    whyPrism:
      'Prism applies Gemini to compare perspectives, accelerate synthesis, and keep delivery cycles competitive.',
  },
  'Google Analytics': {
    type: 'tech',
    whatItIs:
      'A central data layer for behavior, conversion funnels, campaign impact, and website performance insights.',
    whyPrism:
      'Prism turns this into a practical decision system with dashboards and alerts focused on business outcomes.',
  },
  'Next.js': {
    type: 'tech',
    whatItIs:
      'A React framework for production websites that need routing, metadata, performance controls, and reliable deployment behavior.',
    whyPrism:
      'Prism uses it to make marketing sites maintainable as software instead of leaving them trapped in one-off page builders.',
  },
  Replit: {
    type: 'tech',
    whatItIs:
      'A browser-based development and deployment platform used to ship web experiences with a tighter iteration loop.',
    whyPrism:
      'Prism uses it when a client build benefits from fast collaboration, visible progress, and fewer handoffs between idea and launch.',
  },
  Git: {
    type: 'tech',
    whatItIs:
      'A version control system for preserving code history, coordinating releases, and rolling back changes when needed.',
    whyPrism:
      'Prism keeps client sites auditable and easier to evolve by treating even fast marketing builds like real software.',
  },
  Cursor: {
    type: 'tech',
    whatItIs:
      'An AI-assisted code editor used for implementation, refactoring, and quick iteration across production codebases.',
    whyPrism:
      'Prism uses Cursor as one part of an AI-native engineering workflow, with human review and design judgment still directing the work.',
  },
  Webflow: {
    type: 'tech',
    whatItIs:
      'A visual CMS and site builder used for responsive marketing sites, content publishing, and design-led web management.',
    whyPrism:
      'Prism applies Webflow where a client needs a polished handoff, manageable content, and fast marketing iteration inside a familiar admin surface.',
  },
  'Meta Business Suite': {
    type: 'tech',
    whatItIs:
      'Meta’s operating layer for connected Facebook and Instagram profiles, content management, and paid social campaign execution.',
    whyPrism:
      'Prism uses it to keep campaign creative, social proof, and landing-page performance tied into one practical growth loop.',
  },
  'Meta Pixel': {
    type: 'tech',
    whatItIs:
      'A Meta attribution signal used to connect website behavior with Facebook and Instagram campaign measurement.',
    whyPrism:
      'Prism treats pixel data as one part of a broader attribution system, so paid social decisions are not made in isolation.',
  },
  'Hotjar analytics': {
    type: 'tech',
    whatItIs:
      'Behavior and feedback instrumentation to reveal friction points from clicks, scrolls, and visitor reactions.',
    whyPrism:
      'Prism uses direct behavior signals to prioritize fixes that produce immediate UX and conversion gains.',
  },
  'Google Search Console': {
    type: 'tech',
    whatItIs:
      'Search indexing and query performance tooling that surfaces visibility issues and optimization opportunities.',
    whyPrism:
      'Prism connects this data to SEO priorities so teams fix what matters before those issues become ranking drag.',
  },
  Formspree: {
    type: 'tech',
    whatItIs:
      'A managed form backend for handling website submissions, notifications, and spam-resistant lead capture.',
    whyPrism:
      'Prism uses it to ship dependable lead forms quickly while keeping the front-end experience custom and conversion-focused.',
  },
  ElevenLabs: {
    type: 'tech',
    whatItIs:
      'A conversational AI platform used to create voice and assistant experiences for website visitors.',
    whyPrism:
      'Prism connects it to the business journey only where it can answer real questions, qualify intent, and support faster follow-up.',
  },
  Semrush: {
    type: 'tech',
    whatItIs:
      'Competitive and keyword intelligence used to benchmark opportunities and pressure-test market positioning.',
    whyPrism:
      'Prism uses it to discover high-velocity growth opportunities and build strategy from real competitive intent.',
  },
  'Google Business Profile': {
    type: 'tech',
    whatItIs:
      'The local search and reputation surface for business visibility, reviews, and service search intent.',
    whyPrism:
      'Prism keeps local business assets clear, fresh, and conversion-ready so local trust turns into appointment flow.',
  },
  'Apple Business Connect': {
    type: 'tech',
    whatItIs:
      'An Apple ecosystem local presence layer that supports map search visibility and profile integrity.',
    whyPrism:
      'Prism uses this for broader local surface coverage and consistent trust signals across devices and platforms.',
  },
  'Yelp for Business': {
    type: 'tech',
    whatItIs:
      'A local review and discovery platform that heavily influences first-contact trust for service businesses.',
    whyPrism:
      'Prism activates this channel as part of a reputation system that helps new clients trust recommendations before reaching out.',
  },
}

type WorkHighlightItem = {
  name: string
  type: 'service' | 'tech'
}

const getWorkHighlightCopy = (name: string, type: 'service' | 'tech') => {
  const data = WORK_HIGHLIGHT_COPY[name]
  if (data && data.type === type) return data

  return type === 'service'
    ? {
        whatItIs:
          'A specific service used in this engagement to strengthen growth outcomes.',
        whyPrism:
          'Prism applies this with execution discipline to maximize client impact and repeatability.',
      }
    : {
        whatItIs:
          'A client systems component used to support efficient growth execution.',
        whyPrism:
          'Prism layers this into client workflows where faster decisions and better measurement are the biggest differentiators.',
      }
}

const getServiceIcon = (service: string): LucideIcon =>
  SERVICE_ICON_MAP[service] ?? FALLBACK_SERVICE_ICON

const getTechIcon = (tech: string): LucideIcon =>
  TECH_ICON_MAP[tech] ?? FALLBACK_TECH_ICON

const getTechLogo = (tech: string): BrandLogoSpec | undefined =>
  TECH_LOGO_MAP[tech]

const getServiceLogo = (service: string): BrandLogoSpec | undefined =>
  SERVICE_LOGO_MAP[service]

const getTechIconColor = (tech: string): string =>
  TECH_ICON_COLOR_MAP[tech] ?? FALLBACK_TECH_ICON_COLOR

const getServiceColor = (profile: CaseStudyWorkProfile, service: string) => {
  const index = profile.services.indexOf(service)
  if (index >= 0)
    return SERVICE_TILE_COLORS[index % SERVICE_TILE_COLORS.length].text
  return FALLBACK_SERVICE_COLOR
}

const getTechColor = (tech: string) => getTechIconColor(tech)

type CaseStudyWorkProfile = {
  services: string[]
  techStack: string[]
}

export function CaseStudyWorkHighlights({
  caseStudySlug,
}: CaseStudyWorkHighlightsProps) {
  const [selectedItem, setSelectedItem] = useState<WorkHighlightItem | null>(
    null,
  )
  const profile = normalizeCaseStudyWorkProfile(
    getCaseStudyWorkProfileForCase(caseStudySlug),
  )
  const selectedCopy = selectedItem
    ? getWorkHighlightCopy(selectedItem.name, selectedItem.type)
    : null
  const selectedIconColor = selectedItem
    ? selectedItem.type === 'tech'
      ? getTechColor(selectedItem.name)
      : getServiceColor(profile, selectedItem.name)
    : undefined
  const SelectedIcon = selectedItem
    ? selectedItem.type === 'service'
      ? getServiceIcon(selectedItem.name)
      : getTechIcon(selectedItem.name)
    : FALLBACK_SERVICE_ICON
  const selectedLogo = selectedItem
    ? selectedItem.type === 'tech'
      ? getTechLogo(selectedItem.name)
      : getServiceLogo(selectedItem.name)
    : undefined

  if (!profile.services.length && !profile.techStack.length) {
    return null
  }

  return (
    <section className="border-b border-border/60 bg-muted/40 px-4 py-10">
      <Dialog
        open={Boolean(selectedItem)}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null)
        }}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader className="text-left sm:text-left">
            <DialogTitle className="flex items-start justify-between gap-2 pr-8">
              <span>{selectedItem?.name}</span>
              <DialogClose asChild>
                <button
                  type="button"
                  aria-label="Close details"
                  className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted/60 hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <X className="size-4" />
                  <span className="sr-only">Close</span>
                </button>
              </DialogClose>
            </DialogTitle>
            {selectedItem ? (
              <>
                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  {selectedLogo ? (
                    <span className="inline-flex size-4 shrink-0 items-center justify-center">
                      <BrandLogo
                        brand={selectedLogo.brand}
                        theme={selectedLogo.dialogTheme ?? selectedLogo.theme}
                        decorative
                        className="max-h-4 max-w-4"
                      />
                    </span>
                  ) : (
                    <SelectedIcon
                      className="size-4 shrink-0"
                      style={{ color: selectedIconColor }}
                    />
                  )}
                  <span className="font-medium text-foreground/85">
                    What it is
                  </span>
                </div>
                <DialogDescription className="text-sm text-foreground/85">
                  {selectedCopy?.whatItIs}
                </DialogDescription>
                <div className="mt-4 rounded-md border border-border/60 bg-muted/30 px-3 py-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Why Prism is world-class with this
                  </p>
                  <p className="mt-2 text-sm text-foreground/90">
                    {selectedCopy?.whyPrism}
                  </p>
                </div>
                {selectedItem.type === 'service' &&
                SERVICE_ROUTE_MAP[selectedItem.name] ? (
                  <Link
                    href={SERVICE_ROUTE_MAP[selectedItem.name].href}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
                  >
                    {SERVICE_ROUTE_MAP[selectedItem.name].label} →
                  </Link>
                ) : null}
              </>
            ) : null}
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              work highlights
            </p>
            <CardTitle className="text-2xl tracking-tight sm:text-3xl">
              What we delivered for this case
            </CardTitle>
            <CardDescription>
              Switch between the core service work and the systems stack used to
              execute it.
            </CardDescription>
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
                    const color =
                      SERVICE_TILE_COLORS[index % SERVICE_TILE_COLORS.length]
                    const ServiceIcon = getServiceIcon(service)
                    const serviceColor = color.text
                    const serviceLogo = getServiceLogo(service)

                    return (
                      <button
                        key={service}
                        type="button"
                        className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-left transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-white/60"
                        onClick={() =>
                          setSelectedItem({ name: service, type: 'service' })
                        }
                      >
                        <div className="flex min-h-[28px] items-start gap-3">
                          {serviceLogo ? (
                            <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center">
                              <BrandLogo
                                brand={serviceLogo.brand}
                                theme={serviceLogo.theme}
                                decorative
                                className="max-h-4 max-w-4"
                              />
                            </span>
                          ) : (
                            <ServiceIcon
                              className="mt-0.5 size-4 shrink-0"
                              style={{ color: serviceColor }}
                            />
                          )}
                          <span className="text-sm font-semibold leading-tight text-white">
                            {service}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="tech-stack" className="mt-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  {profile.techStack.map((tech) => {
                    const TechIcon = getTechIcon(tech)
                    const techColor = getTechIconColor(tech)
                    const techLogo = getTechLogo(tech)

                    return (
                      <button
                        key={tech}
                        type="button"
                        className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-left transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-white/60"
                        onClick={() =>
                          setSelectedItem({ name: tech, type: 'tech' })
                        }
                      >
                        <div className="flex min-h-[28px] items-start gap-3">
                          {techLogo ? (
                            <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center">
                              <BrandLogo
                                brand={techLogo.brand}
                                theme={techLogo.theme}
                                decorative
                                className="max-h-4 max-w-4"
                              />
                            </span>
                          ) : (
                            <TechIcon
                              className="size-4 shrink-0"
                              style={{ color: techColor }}
                            />
                          )}
                          <span className="text-sm font-medium leading-tight text-zinc-300">
                            {tech}
                          </span>
                        </div>
                      </button>
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
