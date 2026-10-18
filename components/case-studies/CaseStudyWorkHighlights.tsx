'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Apple,
  ArrowLeftRight,
  ArrowRight,
  BotMessageSquare,
  Brain,
  Building2,
  ChartLine,
  Database,
  Figma,
  GitBranch,
  Globe,
  LayoutDashboard,
  MapPin,
  Megaphone,
  Music2,
  Palette,
  Plus,
  Radar,
  Rocket,
  Search,
  SearchCheck,
  SendHorizontal,
  Share2,
  Sparkles,
  Store,
  Video,
  Wrench,
  X,
} from 'lucide-react'

import {
  BrandLogo,
  type BrandLogoKey,
  type BrandLogoTheme,
} from '@/components/brand-logo'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { Card } from '@/components/ui/card'
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

// Services with a dedicated marketing page get a deep link in the dialog.
const SERVICE_ROUTE_MAP: Record<string, { href: string; label: string }> = {
  'Website design': { href: '/websites', label: 'Explore Prism websites' },
  'SEO/AEO': { href: '/aeo', label: 'Explore Prism AEO' },
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
  /** Variant for the dark tiles and the dark dialog. */
  theme?: BrandLogoTheme
}

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
  'Custom internal tools': Wrench,
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
  Netlify: Rocket,
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

// Every surface here is dark, so mono marks use their dark-surface variant.
const TECH_LOGO_MAP: Partial<Record<string, BrandLogoSpec>> = {
  Codex: { brand: 'openai', theme: 'dark' },
  'Claude Code': { brand: 'claude' },
  Vercel: { brand: 'vercel', theme: 'dark' },
  Figma: { brand: 'figma' },
  'GPT-5.3 Codex': { brand: 'openai', theme: 'dark' },
  'GPT-5.5 xhigh': { brand: 'openai', theme: 'dark' },
  'Opus 4.6': { brand: 'anthropic', theme: 'dark' },
  'Gemini 3.1': { brand: 'gemini' },
  'Google Analytics': { brand: 'googleAnalytics' },
  Replit: { brand: 'replit' },
  Git: { brand: 'git' },
  Cursor: { brand: 'cursor', theme: 'dark' },
  Webflow: { brand: 'webflow' },
  'Meta Business Suite': { brand: 'meta' },
  'Meta Pixel': { brand: 'meta' },
  'Yelp for Business': { brand: 'yelp' },
}

const SERVICE_LOGO_MAP: Partial<Record<string, BrandLogoSpec>> = {
  'Meta ads': { brand: 'meta' },
  'LinkedIn ads': { brand: 'linkedin' },
}

const FALLBACK_SERVICE_ICON: LucideIcon = Search
const FALLBACK_TECH_ICON: LucideIcon = Sparkles

const WORK_HIGHLIGHT_COPY: Record<
  string,
  {
    type: 'service' | 'tech'
    whatItIs: string
    /** Rendered under "Why it matters". */
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
  'Custom internal tools': {
    type: 'service',
    whatItIs:
      'Private web apps built around how a growth team already works: content calendars and analytics, interview libraries, ad review rooms, and planning sites.',
    whyPrism:
      'Prism builds them so the team stops stitching spreadsheets and drives together, and spends its time on the work that grows the business.',
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
  Netlify: {
    type: 'tech',
    whatItIs:
      'A hosting and deployment platform with branch previews, edge headers, and redirects for static and hybrid sites.',
    whyPrism:
      'Prism ships on the client’s own platform when they already run there, with separate preview and production sites so changes are checked before launch.',
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

const getItemLogo = (item: WorkHighlightItem): BrandLogoSpec | undefined =>
  item.type === 'service' ? SERVICE_LOGO_MAP[item.name] : TECH_LOGO_MAP[item.name]

function ItemMark({
  item,
  size = 'sm',
}: {
  item: WorkHighlightItem
  size?: 'sm' | 'lg'
}) {
  const Icon =
    item.type === 'service'
      ? (SERVICE_ICON_MAP[item.name] ?? FALLBACK_SERVICE_ICON)
      : (TECH_ICON_MAP[item.name] ?? FALLBACK_TECH_ICON)
  const logo = getItemLogo(item)
  const iconElement = (
    <Icon
      aria-hidden="true"
      className={size === 'lg' ? 'size-5 text-foreground' : 'size-4 text-muted-foreground'}
    />
  )

  return (
    <span
      data-slot="work-item-mark"
      className={
        size === 'lg'
          ? 'grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-background'
          : 'grid size-8 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-background'
      }
    >
      {logo ? (
        <BrandLogo
          brand={logo.brand}
          theme={logo.theme}
          decorative
          className={size === 'lg' ? 'max-h-5 max-w-5' : 'max-h-4 max-w-4'}
          fallback={iconElement}
        />
      ) : (
        iconElement
      )}
    </span>
  )
}

function ItemTile({
  item,
  onSelect,
}: {
  item: WorkHighlightItem
  onSelect: (item: WorkHighlightItem) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group/tile flex min-h-14 w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 text-left transition-[background-color,border-color] duration-200 hover:border-white/[0.16] hover:bg-white/[0.05] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <ItemMark item={item} />
      <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-foreground">
        {item.name}
      </span>
      <Plus
        aria-hidden="true"
        className="size-4 shrink-0 text-subtle transition-[transform,color] duration-200 group-hover/tile:rotate-90 group-hover/tile:text-foreground"
      />
    </button>
  )
}

export function CaseStudyWorkHighlights({
  caseStudySlug,
}: CaseStudyWorkHighlightsProps) {
  // The item stays set while the dialog animates closed, so the panel never
  // collapses mid-fade.
  const [selectedItem, setSelectedItem] = useState<WorkHighlightItem | null>(
    null,
  )
  const [dialogOpen, setDialogOpen] = useState(false)
  const openItem = (item: WorkHighlightItem) => {
    setSelectedItem(item)
    setDialogOpen(true)
  }
  const profile = normalizeCaseStudyWorkProfile(
    getCaseStudyWorkProfileForCase(caseStudySlug),
  )
  const selectedCopy = selectedItem
    ? getWorkHighlightCopy(selectedItem.name, selectedItem.type)
    : null

  if (!profile.services.length && !profile.techStack.length) {
    return null
  }

  const groups = [
    {
      value: 'services',
      label: 'Services',
      items: profile.services.map((name) => ({ name, type: 'service' as const })),
    },
    {
      value: 'tech-stack',
      label: 'Tech stack',
      items: profile.techStack.map((name) => ({ name, type: 'tech' as const })),
    },
  ].filter((group) => group.items.length > 0)

  return (
    <Section aria-labelledby="case-study-work-title" className="py-12 sm:py-16">
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogContent className="gap-0 p-0 sm:max-w-lg">
          {selectedItem ? (
            <div className="overflow-y-auto p-6 sm:p-7">
              <DialogHeader className="text-left sm:text-left">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3.5">
                    <ItemMark item={selectedItem} size="lg" />
                    <div className="min-w-0">
                      <p className="text-eyebrow text-subtle">
                        {selectedItem.type === 'service' ? 'Service' : 'Tech stack'}
                      </p>
                      <DialogTitle className="mt-1.5 text-xl leading-tight sm:text-2xl">
                        {selectedItem.name}
                      </DialogTitle>
                    </div>
                  </div>
                  <DialogClose asChild>
                    <button
                      type="button"
                      aria-label="Close details"
                      className="-mr-1.5 -mt-1.5 grid size-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      <X aria-hidden="true" className="size-4" />
                      <span className="sr-only">Close</span>
                    </button>
                  </DialogClose>
                </div>
              </DialogHeader>

              <div className="mt-6">
                <p className="text-sm font-medium text-foreground">What it is</p>
                <DialogDescription className="mt-1.5 text-[15px] leading-7 text-muted-foreground">
                  {selectedCopy?.whatItIs}
                </DialogDescription>
              </div>

              <div className="spectrum-rule mt-5 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="text-sm font-medium text-foreground">Why it matters</p>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {selectedCopy?.whyPrism}
                </p>
              </div>

              {selectedItem.type === 'service' &&
              SERVICE_ROUTE_MAP[selectedItem.name] ? (
                <Link
                  href={SERVICE_ROUTE_MAP[selectedItem.name].href}
                  className="group/explore mt-5 inline-flex min-h-10 items-center gap-1.5 rounded-sm text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  {SERVICE_ROUTE_MAP[selectedItem.name].label}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover/explore:translate-x-0.5"
                  />
                </Link>
              ) : null}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-4">
          <SectionHeader
            id="case-study-work-title"
            eyebrow="Work highlights"
            title="what we delivered."
            description="Tap any service or tool to see what it is and why it matters."
          />
        </Reveal>

        <Reveal className="lg:col-span-8" delay={90}>
          <Card className="p-2.5 sm:p-3">
            <Tabs defaultValue={groups[0]?.value} className="gap-3">
              <TabsList className="grid h-auto w-full grid-cols-2 rounded-xl border-white/[0.06] bg-white/[0.03] p-1">
                {groups.map((group) => (
                  <TabsTrigger
                    key={group.value}
                    value={group.value}
                    className="h-10 gap-2 rounded-lg focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-0"
                  >
                    {group.label}
                    <span
                      aria-hidden="true"
                      className="font-mono text-[11px] tabular-nums text-subtle"
                    >
                      {group.items.length}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {groups.map((group) => (
                <TabsContent key={group.value} value={group.value} className="p-0.5">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <ItemTile key={item.name} item={item} onSelect={openItem} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}

export default CaseStudyWorkHighlights
