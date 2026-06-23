import type { Metadata } from 'next'
import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BellRing,
  Bolt,
  Boxes,
  BrainCircuit,
  CalendarCheck,
  CalendarClock,
  CheckCircle2,
  CircleSlash,
  ClipboardCheck,
  Clock3,
  DatabaseZap,
  FileSearch,
  Eye,
  FileText,
  Gauge,
  KeyRound,
  Layers,
  LineChart,
  Lock,
  type LucideIcon,
  MessagesSquare,
  PenLine,
  Radar,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Vault,
  Workflow,
} from 'lucide-react'

import FosReveal from '@/components/founder-os/FosReveal'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import { BOOKING_URL } from '@/lib/booking'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const CANONICAL_URL = 'https://www.design-prism.com/founder-os'
const APPLY_HREF = '/founder-os/apply'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Founder OS: a managed AI command layer',
  description:
    'Founder OS connects the systems that run your company, maintains company context, and gives founders one governed place to see what changed, decide what matters, and approve execution.',
  path: '/founder-os',
  ogImage: '/prism-opengraph.png',
})

const HERO_METRICS = [
  {
    value: '5-8',
    label: 'core systems',
    icon: Boxes,
  },
  {
    value: '3',
    label: 'workflows first',
    icon: Workflow,
  },
  {
    value: '90',
    label: 'days to live',
    icon: CalendarClock,
  },
] as const

const HERO_STACK_LOGOS = [
  { name: 'Slack', file: 'slack' },
  { name: 'Google Analytics', file: 'google-analytics' },
  { name: 'Salesforce', file: 'salesforce' },
  { name: 'Notion', file: 'notion' },
  { name: 'OpenAI', file: 'openai' },
  { name: 'Anthropic', file: 'anthropic' },
] as const

const HERO_SIGNAL_RING = [
  { label: 'source', icon: DatabaseZap, angle: 'left-[48%] top-[5%]' },
  { label: 'context', icon: Layers, angle: 'right-[7%] top-[30%]' },
  { label: 'approve', icon: BadgeCheck, angle: 'right-[18%] bottom-[9%]' },
  { label: 'act', icon: Bolt, angle: 'left-[17%] bottom-[10%]' },
  { label: 'learn', icon: Target, angle: 'left-[6%] top-[31%]' },
] as const

const HERO_DECISION_ROWS = [
  { label: 'Approve recovery plan', icon: BadgeCheck },
  { label: 'Review headline test', icon: PenLine },
  { label: 'Route four unanswered leads', icon: MessagesSquare },
] as const

const TRIAD = [
  {
    word: 'Know what changed',
    body: 'A current, source-backed read on the numbers, customers, campaigns, and follow-ups that need attention.',
    icon: Eye,
  },
  {
    word: 'Decide what matters',
    body: 'Ranked recommendations with evidence, tradeoffs, confidence, and the missing context called out clearly.',
    icon: BrainCircuit,
  },
  {
    word: 'Approve what happens next',
    body: 'Drafted plans and bounded actions routed to you for approval, then logged with rollback paths.',
    icon: BadgeCheck,
  },
] as const

const FRICTION_POINTS = [
  {
    title: 'Dashboards disagree',
    body: 'You still reconcile analytics, ads, forms, CRM, finance, and team updates by hand.',
    icon: LineChart,
  },
  {
    title: 'Context lives in you',
    body: 'The team waits because the priorities, tradeoffs, customer nuance, and edge cases are in your head.',
    icon: Layers,
  },
  {
    title: 'Follow-through breaks',
    body: 'Great decisions become scattered tickets, half-sent follow-ups, stale pages, and forgotten checks.',
    icon: Route,
  },
  {
    title: 'AI adds another surface',
    body: 'Generic AI tools answer in isolation. They do not know your sources, rules, permissions, or history.',
    icon: Sparkles,
  },
] as const

const OPERATING_LEDGER = [
  {
    before: 'Founder reconciles reports before every decision',
    after: 'One sourced brief explains what changed',
    signal: 'source',
  },
  {
    before: 'Team asks the same context questions repeatedly',
    after: 'Decisions are ranked by urgency and value',
    signal: 'decide',
  },
  {
    before: 'Important follow-ups depend on memory',
    after: 'Drafts are staged against your rules',
    signal: 'stage',
  },
  {
    before: 'Actions happen without a shared audit trail',
    after: 'Every change is logged, measured, and reversible',
    signal: 'log',
  },
] as const

const BOTTLENECK_INPUTS = [
  { label: 'Ads', icon: LineChart },
  { label: 'CRM', icon: MessagesSquare },
  { label: 'Docs', icon: FileText },
  { label: 'Team', icon: Layers },
] as const

const DAY_FLOW = [
  {
    time: 'Morning',
    title: 'Ask what needs you',
    body: 'Founder OS reads the connected systems, filters noise, and sends the decisions that actually need founder judgment.',
    icon: BellRing,
  },
  {
    time: 'Midday',
    title: 'Understand why it moved',
    body: 'It traces the change across sources, explains the likely cause, and shows what evidence is strong or missing.',
    icon: Radar,
  },
  {
    time: 'Afternoon',
    title: 'Approve the next move',
    body: 'It drafts the recovery plan, holds risky work for approval, and records the result after execution.',
    icon: ClipboardCheck,
  },
] as const

const CONTEXT_ITEMS = [
  'Company goals and current priorities',
  'Offers, customers, positioning, and voice',
  'KPI definitions and source ownership',
  'Systems, access rules, and freshness expectations',
  'Standard workflows and decision rules',
  'Approval thresholds and escalation paths',
  'Agent roles, permissions, and prohibited actions',
  'Decision history, corrections, and evaluations',
] as const

const INSTALL_MODULES = [
  {
    title: 'Company Operating Context',
    body: 'The maintained source of truth that keeps agents aligned to your goals, sources, voice, policies, and decisions.',
    icon: DatabaseZap,
  },
  {
    title: 'Command agent',
    body: 'A chief-of-staff layer that answers cross-company questions, prepares briefs, and routes specialist work.',
    icon: Layers,
  },
  {
    title: 'Specialist agents',
    body: 'Growth, content, website, and pipeline agents that prepare work inside narrow, evaluated scopes.',
    icon: Workflow,
  },
  {
    title: 'Approval and policy engine',
    body: 'Permissions, limits, logs, pause controls, and rollback paths that keep execution governed.',
    icon: SlidersHorizontal,
  },
] as const

const AGENTS = [
  {
    name: 'Chief of Staff',
    role: 'Command agent',
    body: 'Produces the daily brief, answers cross-company questions, holds decision memory, and routes work to specialists.',
    icon: Layers,
    input: 'All systems',
    output: 'Daily brief',
    permission: 'route',
  },
  {
    name: 'Growth Analyst',
    role: 'Specialist',
    body: 'Watches ads, analytics, search, site behavior, CRM movement, and reviews. Flags anomalies and prepares recommendations.',
    icon: LineChart,
    input: 'Ads and analytics',
    output: 'Ranked tests',
    permission: 'recommend',
  },
  {
    name: 'Content and Website',
    role: 'Specialist',
    body: 'Uses your positioning and voice to draft pages, campaigns, emails, and updates, all staged for review.',
    icon: PenLine,
    input: 'Voice and pages',
    output: 'Drafts',
    permission: 'draft',
  },
  {
    name: 'Customer Pipeline',
    role: 'Specialist',
    body: 'Finds unanswered inquiries, stalled deals, and missed follow-ups. Drafts responses according to your policies.',
    icon: MessagesSquare,
    input: 'CRM and inbox',
    output: 'Follow-ups',
    permission: 'approval gated',
  },
] as const

const WORKFLOWS = [
  {
    name: 'Executive brief',
    trigger: 'Every morning',
    evidence: 'Analytics, pipeline, website, customer activity',
    approval: 'Founder sees exceptions only',
    output: 'Source-backed daily brief',
    body: 'Reconcile yesterday’s growth, pipeline, website, customer, and team activity. Surface only meaningful exceptions.',
  },
  {
    name: 'Campaign recovery',
    trigger: 'Metric anomaly',
    evidence: 'Ads, landing page, forms, CRM quality',
    approval: 'Test plan staged first',
    output: 'Approved recovery action',
    body: 'Find the constraint in a campaign or funnel, prepare a test, and stage copy or settings for approval.',
  },
  {
    name: 'Lead recovery',
    trigger: 'Stalled high-value lead',
    evidence: 'CRM status, inquiry source, last response',
    approval: 'Send only after approval',
    output: 'Contextual follow-up',
    body: 'Identify high-value leads that went cold, draft contextual follow-ups, and send only after approval.',
  },
] as const

const PERMISSION_LADDER = [
  {
    level: '0',
    name: 'Observe',
    capability: 'Read and explain',
    example: 'Summarize weekly pipeline movement',
    tone: 'neutral',
  },
  {
    level: '1',
    name: 'Recommend',
    capability: 'Suggest ranked actions',
    example: 'Recommend pausing an underperforming campaign',
    tone: 'neutral',
  },
  {
    level: '2',
    name: 'Draft',
    capability: 'Prepare work without publishing',
    example: 'Draft an email, page update, or customer response',
    tone: 'neutral',
  },
  {
    level: '3',
    name: 'Execute with approval',
    capability: 'Act after explicit approval',
    example: 'Publish approved copy or send approved follow-ups',
    tone: 'accent',
  },
  {
    level: '4',
    name: 'Bounded autonomy',
    capability: 'Perform pre-authorized low-risk actions',
    example: 'Tag leads or pause ads above an agreed stop-loss',
    tone: 'accent',
  },
  {
    level: 'X',
    name: 'Prohibited',
    capability: 'Never autonomous',
    example: 'Move money, sign contracts, make legal or clinical decisions',
    tone: 'danger',
  },
] as const

const BLUEPRINT_DELIVERABLES = [
  'Systems and source-of-truth map',
  'Workflow candidates ranked by value and risk',
  'Permissions and approval model',
  'Risk register and excluded decisions',
  'Narrow prototype on one controlled dataset',
  'Fixed 90-day installation recommendation',
] as const

const PHASES = [
  {
    label: 'Days 0-30',
    title: 'Read-only truth',
    body: 'Connect the systems that matter, define authoritative sources, and prove that answers are accurate before any write access exists.',
  },
  {
    label: 'Days 31-60',
    title: 'Draft and recommend',
    body: 'Agents prepare briefs, recommendations, content, and follow-ups. Evaluation thresholds and rollback paths are tested.',
  },
  {
    label: 'Days 61-90',
    title: 'Approved execution',
    body: 'Scoped actions go live only after approval. The founder approves plans and limits, then the system logs and measures the result.',
  },
] as const

const STACK_GROUPS = [
  {
    label: 'Chat and communication',
    logos: [
      { name: 'Slack', file: 'slack' },
      { name: 'WhatsApp', file: 'whatsapp' },
      { name: 'Microsoft Teams', file: 'microsoft-teams' },
      { name: 'Telegram', file: 'telegram' },
      { name: 'Google Chat', file: 'google-chat' },
      { name: 'Gmail', file: 'gmail' },
      { name: 'Zoom', file: 'zoom' },
      { name: 'Discord', file: 'discord' },
    ],
  },
  {
    label: 'Growth, ads and analytics',
    logos: [
      { name: 'Google Analytics', file: 'google-analytics' },
      { name: 'Google Ads and Search', file: 'google' },
      { name: 'Meta Ads', file: 'meta' },
      { name: 'TikTok', file: 'tiktok' },
      { name: 'LinkedIn', file: 'linkedin' },
      { name: 'Instagram', file: 'instagram' },
      { name: 'Ahrefs', file: 'ahrefs' },
      { name: 'PostHog', file: 'posthog' },
    ],
  },
  {
    label: 'Pipeline, customers and commerce',
    logos: [
      { name: 'Salesforce', file: 'salesforce' },
      { name: 'Stripe', file: 'stripe' },
      { name: 'Shopify', file: 'shopify' },
      { name: 'Calendly', file: 'calendly' },
    ],
  },
  {
    label: 'Content, docs and operations',
    logos: [
      { name: 'Notion', file: 'notion' },
      { name: 'Linear', file: 'linear' },
      { name: 'Google Sheets', file: 'google-sheets' },
      { name: 'Google Drive', file: 'google-drive' },
      { name: 'Asana', file: 'asana' },
      { name: 'Figma', file: 'figma' },
    ],
  },
] as const

const AI_PROVIDERS = [
  { name: 'OpenAI', file: 'openai' },
  { name: 'Anthropic', file: 'anthropic' },
  { name: 'Google Gemini', file: 'gemini' },
  { name: 'Mistral AI', file: 'mistral' },
  { name: 'xAI', file: 'xai' },
  { name: 'Meta Llama', file: 'meta' },
  { name: 'Perplexity', file: 'perplexity' },
] as const

const SECURITY = [
  {
    title: 'Dedicated and isolated',
    body: 'One isolated client environment, never a shared command gateway. Boundaries are explicit and documented.',
    icon: Lock,
  },
  {
    title: 'Vaulted credentials',
    body: 'Secrets live in a vault or credential proxy, not in prompts or memories. Read and write access are separated.',
    icon: KeyRound,
  },
  {
    title: 'Audited and reversible',
    body: 'Consequential actions carry a plan, approval record, systems changed, and rollback path. Pause controls stay available.',
    icon: ShieldCheck,
  },
  {
    title: 'Sensitive work scoped separately',
    body: 'Healthcare, finance, legal, HR, and regulated workflows require separate architecture and review before any write access.',
    icon: CircleSlash,
  },
] as const

const FIT = [
  'Founder-led with product-market fit',
  '$5M-$30M revenue, or comparable operating complexity',
  'Roughly 10-100 employees',
  'At least five important business systems',
  'A founder or operator who is a recurring decision bottleneck',
  '20+ team-hours a week lost to reporting and coordination',
  'Reasonably trustworthy tracking already in place',
  'Willing to standardize workflows instead of preserving chaos',
] as const

const NOT_FIT = [
  'Pre-product-market-fit startups',
  'Solopreneurs with a few simple tools',
  'Companies that cannot define their KPIs',
  'Founders unwilling to grant controlled systems access',
  'Teams expecting AI to repair unclear priorities',
  'Buyers shopping primarily on price',
  'Companies demanding unrestricted autonomy on day one',
] as const

const STAGES = [
  {
    stage: 'Stage 1',
    name: 'Founder Systems Blueprint',
    price: '$10,000',
    cadence: 'two weeks, credited toward installation',
    body: 'Map systems, sources, workflows, value, risk, and readiness. Leave with a narrow prototype and a 90-day build plan.',
    featured: false,
  },
  {
    stage: 'Stage 2',
    name: 'Installation',
    price: 'from $50,000',
    cadence: 'eight to twelve weeks',
    body: 'Install the command agent, three specialists, five to eight integrations, three production workflows, policies, logs, and approval surface.',
    featured: true,
  },
  {
    stage: 'Stage 3',
    name: 'Managed Command',
    price: 'from $10,000',
    cadence: 'per month, 6-12 month term',
    body: 'Keep the system accurate, evaluated, upgraded, governed, and useful with Prism operator oversight and defined response times.',
    featured: false,
  },
] as const

const PROOF_METRICS = [
  {
    metric: 'Founder decision load',
    status: 'baseline captured',
    icon: BrainCircuit,
  },
  {
    metric: 'Issue to approved action',
    status: 'tracking live',
    icon: Clock3,
  },
  {
    metric: 'Workflow reliability',
    status: 'cohort forming',
    icon: Gauge,
  },
  {
    metric: 'Human correction rate',
    status: 'review loop',
    icon: ClipboardCheck,
  },
] as const

const CLIENT_PROOF = [
  {
    value: '+142%',
    label: 'Google Search impressions, year over year',
    detail: 'Dr. Christopher Wong, per Google Search Console.',
  },
  {
    value: '5.3x',
    label: 'monthly Google clicks in five months',
    detail: 'Saorsa Growth Partners, per Google Search Console.',
  },
  {
    value: '14.2k',
    label: 'search impressions in the first full month',
    detail: 'Roseville Dental Academy, per Google Search Console.',
  },
] as const

const ARCHITECTURE_LAYERS = [
  'Business systems',
  'Source registry and context layer',
  'Command orchestrator and specialist agents',
  'Model router',
  'Controlled tools and workflows',
  'Approval and policy engine',
  'Chat interface and command center',
  'Tracing, evaluation, and audit logs',
] as const

const CTA_COMMAND_CHIPS = ['sources', 'context', 'approval', 'audit'] as const

const FAQ_ITEMS = [
  {
    question: 'Is Founder OS an AI that runs my company by itself?',
    answer:
      'No. Founder OS gives you a source-backed view, ranked recommendations, and controlled execution. Autonomy expands only after reliability is measured, and only inside approved limits.',
  },
  {
    question: 'What does it cost?',
    answer:
      'It starts with a $10,000 Founder Systems Blueprint, credited toward an installation that starts at $50,000. Managed Command starts at $10,000 per month. Command + Operate and regulated engagements are scoped separately.',
  },
  {
    question: 'Will it work with the tools we already use?',
    answer:
      'Usually, yes. The first installation connects five to eight important systems and one primary command channel such as Slack or WhatsApp. More tools are added after the first workflows prove reliable.',
  },
  {
    question: 'How do you handle data and security?',
    answer:
      'Each deployment uses an isolated environment, vaulted credentials, separated read and write access, approval records, audit logs, rollback paths, and a pause control. Regulated work is scoped separately.',
  },
  {
    question: 'Which AI models power it?',
    answer:
      'The architecture is model-agnostic. Work can route across frontier model providers, but Prism owns the context, connectors, workflows, permissions, evaluations, and managed operation.',
  },
] as const

const EASE = 'ease-[cubic-bezier(0.175,0.885,0.32,1.1)]'

function heroRiseDelay(ms: number) {
  return { '--hero-rise-delay': `${ms}ms` } as CSSProperties
}

function signalDelay(ms: number) {
  return { '--signal-delay': `${ms}ms` } as CSSProperties
}

function fosFloatDelay(ms: number) {
  return { '--fos-float-delay': `${ms}ms` } as CSSProperties
}

function Eyebrow({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={`font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] ${className || 'text-[#6e6e6e]'}`}
    >
      {children}
    </p>
  )
}

function PrimaryButton({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className={`fos-cta inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0a0a0a] px-5 text-[0.95rem] font-medium text-[#ffffff] transition-[background-color,transform,box-shadow] duration-200 ${EASE} hover:bg-[#262626] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0063d1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ffffff]`}
    >
      {children}
    </Link>
  )
}

function SecondaryButton({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#d4d4d4] bg-[#ffffff] px-5 text-[0.95rem] font-medium text-[#0a0a0a] transition-[background-color,border-color] duration-200 ${EASE} hover:border-[#6e6e6e] hover:bg-[#fafafa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0063d1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ffffff]`}
    >
      {children}
    </Link>
  )
}

function BookCallButton() {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#d4d4d4] bg-[#ffffff] px-5 text-[0.95rem] font-medium text-[#0a0a0a] transition-[background-color,border-color] duration-200 ${EASE} hover:border-[#6e6e6e] hover:bg-[#fafafa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0063d1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ffffff]`}
    >
      Book a 30 minute fit call
      <CalendarCheck className="h-4 w-4" aria-hidden="true" />
    </a>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  inverted = false,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  inverted?: boolean
}) {
  return (
    <div
      className={
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'
      }
    >
      {eyebrow ? (
        <Eyebrow className={inverted ? 'text-[#a8a8a8]' : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={`mt-4 text-balance text-[clamp(1.85rem,3.6vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.03em] ${inverted ? 'text-[#ffffff]' : 'text-[#0a0a0a]'}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-pretty text-[1.05rem] leading-7 ${inverted ? 'text-[#bdbdbd]' : 'text-[#525252]'}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

function IconBadge({
  icon: Icon,
  dark = false,
}: {
  icon: LucideIcon
  dark?: boolean
}) {
  return (
    <span
      aria-hidden="true"
      className={
        dark
          ? 'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#ffffff]/12 bg-[#ffffff]/[0.06] text-[#ffffff]'
          : 'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#ededed] bg-[#fafafa] text-[#0a0a0a]'
      }
    >
      <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} />
    </span>
  )
}

function SourceChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[#e2e2e2] bg-[#ffffff] px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-[#737373]">
      {children}
    </span>
  )
}

function CommandChip({
  children,
  dark = false,
}: {
  children: ReactNode
  dark?: boolean
}) {
  return (
    <span
      className={
        dark
          ? 'inline-flex items-center gap-2 rounded-full border border-[#ffffff]/12 bg-[#ffffff]/[0.05] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#d4d4d4]'
          : 'inline-flex items-center gap-2 rounded-full border border-[#e2e2e2] bg-[#ffffff] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#6e6e6e] shadow-[0_12px_28px_-26px_rgba(10,10,10,0.45)]'
      }
    >
      <span
        aria-hidden="true"
        className={`home-signal-dot h-1.5 w-1.5 rounded-full ${dark ? 'bg-[#ffffff]' : 'bg-[#0063d1]'}`}
      />
      {children}
    </span>
  )
}

function PremiumSection({
  children,
  id,
  tone = 'plain',
  className = '',
}: {
  children: ReactNode
  id?: string
  tone?: 'plain' | 'soft' | 'dark'
  className?: string
}) {
  const toneClassName =
    tone === 'dark'
      ? 'bg-[#0a0a0a] text-[#ffffff]'
      : tone === 'soft'
        ? 'bg-[#fafafa]'
        : 'bg-[#ffffff]'

  return (
    <section
      id={id}
      className={`relative scroll-mt-28 overflow-hidden border-b border-[#ededed] px-5 py-20 sm:px-8 sm:py-28 ${toneClassName} ${className}`}
    >
      {tone !== 'dark' ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(0,99,209,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,99,209,0.045)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:radial-gradient(circle_at_50%_0%,black_0%,transparent_56%)]"
        />
      ) : null}
      <div className="relative mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

function ChatLine({
  who,
  children,
}: {
  who: 'founder' | 'system'
  children: ReactNode
}) {
  const isFounder = who === 'founder'
  return (
    <div className={isFounder ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={
          isFounder
            ? 'max-w-[86%] rounded-2xl rounded-br-md bg-[#0a0a0a] px-4 py-2.5 text-[0.92rem] leading-6 text-[#ffffff]'
            : 'max-w-[94%] rounded-2xl rounded-bl-md border border-[#ededed] bg-[#fafafa] px-4 py-3 text-[0.92rem] leading-6 text-[#262626]'
        }
      >
        {children}
      </div>
    </div>
  )
}

function StackLogo({ name, file }: { name: string; file: string }) {
  return (
    <div className="group flex min-h-[4.25rem] items-center justify-center rounded-xl border border-[#ededed] bg-[#ffffff] p-4 transition-colors duration-200 hover:border-[#d4d4d4]">
      <img
        src={`/logos/founder-os/${file}.svg`}
        alt={name}
        width={32}
        height={32}
        loading="lazy"
        decoding="async"
        className="h-7 w-auto max-w-[6.5rem] object-contain opacity-65 grayscale transition duration-200 ease-out group-hover:opacity-100 group-hover:grayscale-0"
      />
    </div>
  )
}

function CheckItem({
  children,
  muted = false,
}: {
  children: ReactNode
  muted?: boolean
}) {
  return (
    <li
      className={`flex gap-3 text-[0.92rem] leading-6 ${muted ? 'text-[#737373]' : 'text-[#404040]'}`}
    >
      <CheckCircle2
        className="mt-0.5 h-[1.05rem] w-[1.05rem] shrink-0 text-[#0063d1]"
        strokeWidth={1.7}
        aria-hidden="true"
      />
      {children}
    </li>
  )
}

export default function FounderOsPage() {
  return (
    <div
      data-surface="founder-os"
      className="min-h-screen bg-[#ffffff] font-sans text-[#0a0a0a] antialiased [color-scheme:light] selection:bg-[#0a0a0a] selection:text-[#ffffff]"
    >
      <FosReveal />
      <header className="sticky top-0 z-50 border-b border-[#ededed] bg-[#ffffff]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[0.95rem] font-semibold tracking-[-0.01em] text-[#0a0a0a] transition-colors hover:text-[#0063d1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0063d1] focus-visible:ring-offset-2"
              aria-label="Prism home"
            >
              Prism
            </Link>
            <span aria-hidden="true" className="text-[#d4d4d4]">
              /
            </span>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[#737373]">
              Founder OS
            </span>
          </div>
          <nav
            aria-label="Founder OS"
            className="hidden items-center gap-7 text-[0.82rem] text-[#525252] md:flex"
          >
            <a className="transition-colors hover:text-[#0a0a0a]" href="#demo">
              Demo
            </a>
            <a
              className="transition-colors hover:text-[#0a0a0a]"
              href="#install"
            >
              Install
            </a>
            <a
              className="transition-colors hover:text-[#0a0a0a]"
              href="#control"
            >
              Control
            </a>
            <a
              className="transition-colors hover:text-[#0a0a0a]"
              href="#pricing"
            >
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden items-center gap-1 text-[0.8rem] text-[#737373] transition-colors hover:text-[#0a0a0a] sm:inline-flex"
            >
              Prism site
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={APPLY_HREF}
              className={`inline-flex min-h-9 items-center rounded-lg bg-[#0a0a0a] px-3.5 text-[0.82rem] font-medium text-[#ffffff] transition-colors duration-200 ${EASE} hover:bg-[#262626] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0063d1] focus-visible:ring-offset-2`}
            >
              Apply
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="relative isolate overflow-hidden border-b border-[#ededed] px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_26%,rgba(0,99,209,0.18),transparent_31%),radial-gradient(circle_at_18%_12%,rgba(10,10,10,0.08),transparent_24%),linear-gradient(to_bottom,#ffffff,#f7f9fc_72%,#ffffff)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.42] [background-image:linear-gradient(to_right,rgba(0,99,209,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,99,209,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_67%_34%,black_0%,transparent_68%)]"
          />
          <div
            aria-hidden="true"
            className="fos-orbit-glow pointer-events-none absolute left-[58%] top-20 hidden h-[32rem] w-[32rem] -translate-x-1/2 rounded-full border border-[#0063d1]/10 lg:block"
          />

          <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.74fr_1.26fr] lg:items-center">
            <div className="relative z-10">
              <span
                className="home-hero-rise inline-flex items-center gap-2 rounded-full border border-[#e2e2e2] bg-[#ffffff]/90 px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[#737373] shadow-[0_10px_30px_-24px_rgba(10,10,10,0.35)] backdrop-blur"
                style={heroRiseDelay(0)}
              >
                <Sparkles
                  className="h-3.5 w-3.5 text-[#0063d1]"
                  aria-hidden="true"
                />
                Founder OS
              </span>
              <h1 className="mt-5 max-w-[9ch] text-balance text-[clamp(3.2rem,8vw,7rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-[#0a0a0a]">
                {['Command', 'your', 'company.'].map((line, index) => (
                  <span
                    key={line}
                    className="fos-hero-title-rise block"
                    style={heroRiseDelay(90 + index * 95)}
                  >
                    {line}
                  </span>
                ))}
              </h1>
              <p
                className="home-hero-rise mt-6 max-w-md text-pretty text-[1.04rem] leading-7 text-[#525252]"
                style={heroRiseDelay(420)}
              >
                One governed command layer for the systems, decisions, and
                follow-through still routed through you.
              </p>
              <div
                className="home-hero-rise mt-8 flex flex-col gap-3 sm:flex-row"
                style={heroRiseDelay(520)}
              >
                <PrimaryButton href={APPLY_HREF}>
                  Apply for a Blueprint
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </PrimaryButton>
                <BookCallButton />
                <SecondaryButton href="#demo">See demo</SecondaryButton>
              </div>
              <div
                className="home-hero-rise mt-8 grid gap-px overflow-hidden rounded-2xl border border-[#ededed] bg-[#ededed] sm:grid-cols-3"
                style={heroRiseDelay(620)}
              >
                {HERO_METRICS.map((metric) => {
                  const Icon = metric.icon
                  return (
                    <div key={metric.label} className="bg-[#ffffff]/92 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-[1.45rem] font-semibold tracking-[-0.04em] text-[#0a0a0a]">
                          {metric.value}
                        </p>
                        <Icon
                          className="h-4.5 w-4.5 text-[#0063d1]"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      </div>
                      <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#6e6e6e]">
                        {metric.label}
                      </p>
                    </div>
                  )
                })}
              </div>
              <div
                className="home-hero-rise mt-6 border-t border-[#d4d4d4] pt-4"
                style={heroRiseDelay(720)}
              >
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#737373]">
                  connects the stack
                </p>
                <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {HERO_STACK_LOGOS.map((logo) => (
                    <li
                      key={logo.name}
                      className="group flex h-10 items-center justify-center rounded-lg border border-[#ededed] bg-[#ffffff]/85 px-2 shadow-[0_12px_28px_-26px_rgba(10,10,10,0.45)] transition-colors hover:border-[#d4d4d4]"
                    >
                      <img
                        src={`/logos/founder-os/${logo.file}.svg`}
                        alt={logo.name}
                        width={24}
                        height={24}
                        decoding="async"
                        className="h-4.5 w-auto max-w-[3rem] object-contain opacity-55 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="home-hero-rise relative min-h-[34rem] lg:min-h-[39rem]"
              style={heroRiseDelay(260)}
            >
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[31rem] w-[31rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0063d1]/15 bg-[#0063d1]/[0.025] shadow-[inset_0_0_80px_rgba(0,99,209,0.08),0_40px_120px_-70px_rgba(0,99,209,0.7)] sm:h-[35rem] sm:w-[35rem]"
              />
              <div
                aria-hidden="true"
                className="fos-orbit-spin absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#0063d1]/18 sm:h-[30rem] sm:w-[30rem]"
              />
              <div
                aria-hidden="true"
                className="fos-orbit-spin-reverse absolute left-1/2 top-1/2 h-[17rem] w-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0a0a0a]/10 sm:h-[20rem] sm:w-[20rem]"
              />
              <span
                aria-hidden="true"
                className="home-scan-line absolute left-[9%] top-1/2 h-px w-[82%] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#0063d1]/35 to-transparent"
              />
              <span
                aria-hidden="true"
                className="home-scan-line absolute left-1/2 top-[11%] h-[78%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#0063d1]/25 to-transparent [animation-delay:1.4s]"
              />

              {HERO_SIGNAL_RING.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className={`fos-float absolute ${item.angle} z-20 hidden items-center gap-2 rounded-full border border-[#d4d4d4] bg-[#ffffff] px-3 py-2 shadow-[0_16px_34px_-28px_rgba(10,10,10,0.45)] sm:inline-flex`}
                    style={fosFloatDelay(index * 280)}
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0063d1]/10 text-[#0063d1]">
                      <Icon
                        className="h-3.5 w-3.5"
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#525252]">
                      {item.label}
                    </span>
                  </div>
                )
              })}

              <div className="fos-float relative z-10 mx-auto flex min-h-[34rem] max-w-[30rem] items-center justify-center sm:min-h-[38rem]">
                <div className="relative w-full rounded-[2rem] border border-[#d4d4d4] bg-[#ffffff] p-3 shadow-[0_26px_72px_-48px_rgba(10,10,10,0.5)] sm:p-4">
                  <div className="overflow-hidden rounded-[1.5rem] border border-[#ededed] bg-[#fafafa]">
                    <div className="relative flex items-center justify-between border-b border-[#ededed] bg-[#ffffff] px-4 py-4">
                      <span
                        aria-hidden="true"
                        className="home-scan-line absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#0063d1]/12 to-transparent"
                      />
                      <div className="relative flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a0a0a] text-[#ffffff] shadow-[0_16px_32px_-22px_rgba(10,10,10,0.8)]">
                          <BrainCircuit
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                        <div>
                          <p className="text-[0.9rem] font-semibold text-[#0a0a0a]">
                            Founder OS
                          </p>
                          <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#737373]">
                            Live command
                          </p>
                        </div>
                      </div>
                      <span className="relative inline-flex items-center gap-1.5 rounded-full border border-[#d8efe0] bg-[#eefbf2] px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[#15803d]">
                        <span className="home-signal-dot h-1.5 w-1.5 rounded-full bg-[#15803d]" />
                        Online
                      </span>
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="grid gap-3 sm:grid-cols-3">
                        {TRIAD.map((item, index) => {
                          const Icon = item.icon
                          return (
                            <div
                              key={item.word}
                              className="home-hero-rise rounded-2xl border border-[#ededed] bg-[#ffffff] p-4 shadow-[0_16px_34px_-30px_rgba(10,10,10,0.35)]"
                              style={heroRiseDelay(500 + index * 90)}
                            >
                              <Icon
                                className="h-4.5 w-4.5 text-[#0063d1]"
                                strokeWidth={1.7}
                                aria-hidden="true"
                              />
                              <p className="mt-3 text-[0.84rem] font-semibold leading-5 text-[#0a0a0a]">
                                {item.word}
                              </p>
                            </div>
                          )
                        })}
                      </div>

                      <div className="mt-4 rounded-2xl border border-[#ededed] bg-[#ffffff] p-4 shadow-[0_18px_44px_-36px_rgba(10,10,10,0.38)]">
                        <div className="flex flex-wrap gap-2">
                          <SourceChip>GA4, 2m</SourceChip>
                          <SourceChip>CRM, 9m</SourceChip>
                          <SourceChip>Ads, 5m</SourceChip>
                          <SourceChip>Forms, 4m</SourceChip>
                        </div>
                        <p className="mt-4 text-[1.1rem] font-semibold tracking-[-0.03em] text-[#0a0a0a]">
                          3 decisions need you today.
                        </p>
                        <div className="mt-4 grid gap-2">
                          {HERO_DECISION_ROWS.map((row, index) => {
                            const Icon = row.icon
                            return (
                              <div
                                key={row.label}
                                className="home-hero-rise flex items-center justify-between rounded-xl border border-[#ededed] bg-[#fafafa] px-3 py-2.5"
                                style={heroRiseDelay(760 + index * 90)}
                              >
                                <span className="flex items-center gap-2 text-[0.84rem] text-[#404040]">
                                  <Icon
                                    className="h-3.5 w-3.5 text-[#0063d1]"
                                    strokeWidth={1.7}
                                    aria-hidden="true"
                                  />
                                  {row.label}
                                </span>
                                <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#0063d1]">
                                  0{index + 1}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ul
                aria-label="Founder OS command loop"
                className="absolute inset-x-0 bottom-0 z-20 flex flex-wrap justify-center gap-x-6 gap-y-3"
              >
                {['sources', 'context', 'approval', 'audit'].map(
                  (item, index) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#6e6e6e]"
                    >
                      <span
                        aria-hidden="true"
                        className="home-signal-dot h-1.5 w-1.5 rounded-full bg-[#0063d1]"
                        style={signalDelay(index * 260)}
                      />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </section>

        <PremiumSection id="demo" tone="soft">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="The command demo"
                title="Ask the question you already ask yourself."
                description="Founder OS turns scattered operating data into a sourced answer, a proposed decision, and a controlled action. The conversation is the product."
              />
              <div className="mt-8 grid gap-3">
                {DAY_FLOW.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      data-fos-reveal
                      className="relative flex gap-4 rounded-2xl border border-[#ededed] bg-[#ffffff] p-4 shadow-[0_18px_42px_-36px_rgba(10,10,10,0.35)] fos-lift"
                      style={
                        {
                          '--home-reveal-delay': `${index * 90}ms`,
                        } as CSSProperties
                      }
                    >
                      {index < DAY_FLOW.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="absolute left-[2.2rem] top-14 h-[calc(100%+0.75rem)] w-px bg-[#0063d1]/15"
                        />
                      ) : null}
                      <IconBadge icon={Icon} />
                      <div>
                        <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[#0063d1]">
                          {item.time}
                        </p>
                        <h3 className="mt-1 text-[1.02rem] font-semibold tracking-[-0.01em] text-[#0a0a0a]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[0.9rem] leading-6 text-[#525252]">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['source backed', 'approval gated', 'rollback ready'].map(
                  (chip) => (
                    <CommandChip key={chip}>{chip}</CommandChip>
                  ),
                )}
              </div>
            </div>

            <div className="relative rounded-[2rem] border border-[#d4d4d4] bg-[#ffffff] p-3 shadow-[0_30px_80px_-48px_rgba(10,10,10,0.42)] sm:p-4">
              <span
                aria-hidden="true"
                className="home-scan-line pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#0063d1]/35 to-transparent"
              />
              <div className="flex items-center justify-between border-b border-[#f0f0f0] px-2 pb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#0a0a0a] text-[#ffffff]">
                    <BrainCircuit className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-[0.85rem] font-medium text-[#0a0a0a]">
                    Founder OS
                  </span>
                </div>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#737373]">
                  Approval gated
                </span>
              </div>
              <div className="space-y-3 px-1 py-4">
                <ChatLine who="founder">What needs me today?</ChatLine>
                <ChatLine who="system">
                  <p className="font-medium text-[#0a0a0a]">
                    3 decisions, 2 anomalies.
                  </p>
                  <ul className="mt-2 space-y-1.5 text-[#404040]">
                    <li>Lead quality is down 18% week over week.</li>
                    <li>
                      Four high-value inquiries are unanswered for more than 24
                      hours.
                    </li>
                    <li>
                      The spring campaign has enough data for a headline
                      decision.
                    </li>
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <SourceChip>SOURCES</SourceChip>
                    <SourceChip>GA4</SourceChip>
                    <SourceChip>CRM</SourceChip>
                    <SourceChip>Ads</SourceChip>
                  </div>
                </ChatLine>
                <ChatLine who="founder">Why did qualified leads fall?</ChatLine>
                <ChatLine who="system">
                  Spend held steady. The drop starts after Tuesday’s
                  landing-page headline change. Click quality is stable, but
                  form starts fell 22%.
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <SourceChip>DECISION</SourceChip>
                    <SourceChip>Confidence 0.82</SourceChip>
                  </div>
                </ChatLine>
                <ChatLine who="founder">
                  Draft the recovery plan and hold it for review.
                </ChatLine>
                <ChatLine who="system">
                  Drafted. Recommended action: restore the previous headline,
                  test one new variant, and send four follow-ups. Nothing is
                  live.
                </ChatLine>
                <ChatLine who="founder">
                  Approve the recovery plan. Hold the new variant.
                </ChatLine>
                <ChatLine who="system">
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#15803d]">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Approved action complete.
                  </span>{' '}
                  Prior headline restored, follow-ups queued, variant held, and
                  Friday measurement check logged.
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <SourceChip>APPROVAL</SourceChip>
                    <SourceChip>ROLLBACK READY</SourceChip>
                    <SourceChip>LOGGED</SourceChip>
                  </div>
                </ChatLine>
              </div>
            </div>
          </div>
        </PremiumSection>

        <PremiumSection>
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <Eyebrow>The founder problem</Eyebrow>
              <h2 className="mt-4 text-balance text-[clamp(2rem,4.2vw,3.3rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#0a0a0a]">
                You have tools for every function. You still carry the context
                between them.
              </h2>
              <p className="mt-5 text-[1.06rem] leading-8 text-[#525252]">
                The business does not slow down because information is missing.
                It slows down because the information is split across systems,
                people, and half-finished decisions. Founder OS removes the
                founder as the human integration layer without removing the
                founder from judgment.
              </p>
            </div>
            <div className="rounded-[2rem] border border-[#ededed] bg-[#fafafa] p-4 shadow-[0_24px_70px_-52px_rgba(10,10,10,0.42)] sm:p-6">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <div className="grid gap-3">
                  {BOTTLENECK_INPUTS.map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 rounded-2xl border border-[#ededed] bg-[#ffffff] p-3"
                      >
                        <Icon
                          className="h-4 w-4 text-[#0063d1]"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                        <span className="text-[0.9rem] font-medium text-[#262626]">
                          {item.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <div
                  className="hidden h-px w-14 bg-[#0063d1]/25 sm:block"
                  aria-hidden="true"
                />
                <div className="rounded-[1.5rem] border border-[#d4d4d4] bg-[#ffffff] p-5 text-center">
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0a0a0a] text-[#ffffff]">
                    <BrainCircuit className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[#0063d1]">
                    founder bottleneck
                  </p>
                  <p className="mt-2 text-[1.1rem] font-semibold tracking-[-0.02em] text-[#0a0a0a]">
                    Context waits here.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {FRICTION_POINTS.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-[#ededed] bg-[#ffffff] p-4 fos-lift"
                    >
                      <Icon
                        className="h-4.5 w-4.5 text-[#0063d1]"
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                      <h3 className="mt-3 text-[1rem] font-semibold tracking-[-0.01em] text-[#0a0a0a]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[0.86rem] leading-6 text-[#525252]">
                        {item.body}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="mt-14 overflow-hidden rounded-[2rem] border border-[#ededed] bg-[#ffffff] shadow-[0_24px_70px_-54px_rgba(10,10,10,0.35)]">
            <div className="grid border-b border-[#ededed] bg-[#fafafa] px-5 py-3 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[#6e6e6e] sm:grid-cols-[1fr_7rem_1fr]">
              <span>manual operating drag</span>
              <span className="hidden text-center sm:block">signal</span>
              <span className="hidden sm:block">Founder OS loop</span>
            </div>
            {OPERATING_LEDGER.map((row, index) => (
              <div
                key={row.signal}
                className={`grid gap-3 px-5 py-4 sm:grid-cols-[1fr_7rem_1fr] sm:items-center ${index === 0 ? '' : 'border-t border-[#ededed]'}`}
              >
                <p className="text-[0.92rem] leading-6 text-[#737373]">
                  {row.before}
                </p>
                <div className="flex items-center gap-2 sm:justify-center">
                  <span
                    className="home-signal-dot h-1.5 w-1.5 rounded-full bg-[#0063d1]"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#0063d1]">
                    {row.signal}
                  </span>
                </div>
                <p className="text-[0.92rem] font-medium leading-6 text-[#262626]">
                  {row.after}
                </p>
              </div>
            ))}
          </div>
        </PremiumSection>

        <PremiumSection id="install" tone="soft">
          <SectionHeading
            eyebrow="What gets installed"
            title="A command layer, not another dashboard."
            description="The durable asset is not a prompt library or a model subscription. It is maintained operating context, governed agents, and workflows that earn trust before expanding."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div className="relative rounded-[2rem] border border-[#d4d4d4] bg-[#ffffff] p-6 shadow-[0_28px_80px_-56px_rgba(10,10,10,0.45)] sm:p-8">
              <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border border-[#0063d1]/20 bg-[#0063d1]/[0.04] text-center shadow-[inset_0_0_70px_rgba(0,99,209,0.08)]">
                <div>
                  <DatabaseZap
                    className="mx-auto h-8 w-8 text-[#0063d1]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#0063d1]">
                    operating context
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {INSTALL_MODULES.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-[#ededed] bg-[#fafafa] p-4 fos-lift"
                    >
                      <Icon
                        className="h-4.5 w-4.5 text-[#0063d1]"
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                      <h3 className="mt-3 text-[1rem] font-semibold tracking-[-0.01em] text-[#0a0a0a]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[0.84rem] leading-6 text-[#525252]">
                        {item.body}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-[#ededed] bg-[#ffffff] shadow-[0_22px_64px_-50px_rgba(10,10,10,0.35)]">
              <div className="border-b border-[#ededed] bg-[#fafafa] px-5 py-4">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#0063d1]">
                  context registry
                </p>
              </div>
              <div className="divide-y divide-[#ededed]">
                {CONTEXT_ITEMS.map((item, index) => (
                  <div
                    key={item}
                    className="grid gap-2 px-5 py-3.5 sm:grid-cols-[2.5rem_1fr_6rem] sm:items-center"
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-[0.66rem] text-[#6b6b6b]"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[0.9rem] leading-6 text-[#262626]">
                      {item}
                    </span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#0063d1]">
                      tracked
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PremiumSection>

        <PremiumSection>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionHeading
              eyebrow="Agent team"
              title="Small by design. Useful before it grows."
              description="The first installation focuses on one command agent, three specialists, and three workflows. It proves the loop before touching higher-risk systems."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {AGENTS.map((agent) => {
                const Icon = agent.icon
                return (
                  <div
                    key={agent.name}
                    className="rounded-2xl border border-[#ededed] bg-[#ffffff] p-5 shadow-[0_18px_48px_-42px_rgba(10,10,10,0.35)] fos-lift"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <IconBadge icon={Icon} />
                      <span className="rounded-full border border-[#e2e2e2] bg-[#fafafa] px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[#0063d1]">
                        {agent.permission}
                      </span>
                    </div>
                    <p className="mt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#0063d1]">
                      {agent.role}
                    </p>
                    <h3 className="mt-1 text-[1.05rem] font-semibold tracking-[-0.01em] text-[#0a0a0a]">
                      {agent.name}
                    </h3>
                    <p className="mt-2 text-[0.88rem] leading-6 text-[#525252]">
                      {agent.body}
                    </p>
                    <div className="mt-4 grid gap-2 border-t border-[#ededed] pt-4 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[#737373]">
                      <span>input: {agent.input}</span>
                      <span>output: {agent.output}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="mt-14">
            <Eyebrow>The first workflows</Eyebrow>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {WORKFLOWS.map((workflow) => (
                <div
                  key={workflow.name}
                  className="rounded-2xl border border-[#ededed] bg-[#fafafa] p-5 shadow-[0_16px_44px_-40px_rgba(10,10,10,0.3)] fos-lift"
                >
                  <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[#0063d1]">
                    runbook
                  </p>
                  <h3 className="mt-2 text-[1.05rem] font-semibold tracking-[-0.01em] text-[#0a0a0a]">
                    {workflow.name}
                  </h3>
                  <dl className="mt-4 space-y-3 text-[0.84rem] leading-5">
                    {[
                      ['trigger', workflow.trigger],
                      ['evidence', workflow.evidence],
                      ['approval', workflow.approval],
                      ['output', workflow.output],
                    ].map(([term, value]) => (
                      <div
                        key={term}
                        className="grid grid-cols-[5.25rem_1fr] gap-3 border-t border-[#ededed] pt-3 first:border-t-0 first:pt-0"
                      >
                        <dt className="font-mono uppercase tracking-[0.12em] text-[#737373]">
                          {term}
                        </dt>
                        <dd className="text-[#262626]">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </PremiumSection>

        <PremiumSection id="control" tone="dark">
          <span
            aria-hidden="true"
            className="home-scan-line pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#ffffff]/[0.06] to-transparent"
          />
          <div className="relative">
            <SectionHeading
              eyebrow="Control model"
              title="Autonomy is earned, scoped, and reversible."
              description="Founder OS does not start with a permission slip to run the company. It starts read-only, proves accuracy, drafts work, and expands only inside approved limits."
              inverted
            />
            <div className="mt-10 overflow-hidden rounded-2xl border border-[#ffffff]/12">
              {PERMISSION_LADDER.map((row, index) => (
                <div
                  key={row.name}
                  className={`grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[3rem_1fr_1.4fr] sm:items-center sm:gap-5 ${
                    index === 0 ? '' : 'border-t border-[#ffffff]/10'
                  } ${row.tone === 'danger' ? 'bg-[#e5484d]/10' : ''}`}
                >
                  <span
                    className={`font-mono text-sm ${row.tone === 'danger' ? 'text-[#ff6b70]' : 'text-[#a8a8a8]'}`}
                  >
                    {row.level}
                  </span>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span
                      className={`text-[0.98rem] font-medium ${row.tone === 'danger' ? 'text-[#ff8a8d]' : 'text-[#ffffff]'}`}
                    >
                      {row.name}
                    </span>
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-[#a8a8a8]">
                      {row.capability}
                    </span>
                  </div>
                  <span className="text-[0.9rem] leading-6 text-[#bdbdbd]">
                    {row.example}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                [
                  'Every answer carries',
                  'Source, freshness, confidence, assumptions, and what is missing.',
                ],
                [
                  'Every action carries',
                  'Plan, systems changed, expected outcome, approval record, and rollback path.',
                ],
                [
                  'Every expansion carries',
                  'Reliability evidence, permission limits, owner approval, and monitoring rules.',
                ],
              ].map(([title, body]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[#ffffff]/12 bg-[#ffffff]/[0.03] p-5"
                >
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#a8a8a8]">
                    {title}
                  </p>
                  <p className="mt-3 text-[0.95rem] leading-6 text-[#e5e5e5]">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PremiumSection>

        <PremiumSection tone="soft">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <SectionHeading
              eyebrow="Blueprint sample"
              title="Start with the map before you buy the build."
              description="The Blueprint decides what should be connected, what must stay out, which workflow is worth automating first, and what controls are required."
            />
            <div className="rounded-[2rem] border border-[#d4d4d4] bg-[#ffffff] p-3 shadow-[0_22px_56px_-38px_rgba(10,10,10,0.36)]">
              <div className="rounded-[1.5rem] border border-[#ededed] bg-[#fafafa] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-5 border-b border-[#ededed] pb-5">
                  <div>
                    <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#0063d1]">
                      Founder Systems Blueprint
                    </p>
                    <h3 className="mt-2 text-[1.55rem] font-semibold tracking-[-0.035em] text-[#0a0a0a]">
                      What you leave with
                    </h3>
                  </div>
                  <FileSearch
                    className="h-6 w-6 text-[#6e6e6e]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    'systems map',
                    'workflow rank',
                    'risk register',
                    '90-day plan',
                  ].map((tab) => (
                    <CommandChip key={tab}>{tab}</CommandChip>
                  ))}
                </div>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {BLUEPRINT_DELIVERABLES.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-[#ededed] bg-[#ffffff] p-4 text-[0.9rem] leading-6 text-[#262626]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </PremiumSection>

        <PremiumSection>
          <SectionHeading
            eyebrow="The 90-day installation"
            title="Visibility first. Recommendations second. Approved execution third."
            description="The rollout is staged to reduce risk. Agents earn write access through evidence, not optimism."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PHASES.map((phase, index) => (
              <div
                key={phase.title}
                className="relative rounded-2xl border border-[#ededed] bg-[#ffffff] p-6 shadow-[0_18px_48px_-42px_rgba(10,10,10,0.35)] fos-lift"
              >
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#0063d1]">
                  {phase.label}
                </span>
                <h3 className="mt-3 flex items-center gap-2 text-[1.25rem] font-semibold tracking-[-0.02em] text-[#0a0a0a]">
                  <CalendarCheck
                    className="h-5 w-5 text-[#6e6e6e]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  {phase.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-6 text-[#525252]">
                  {phase.body}
                </p>
                <div className="mt-5 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#0063d1]">
                  <span
                    className="home-signal-dot h-1.5 w-1.5 rounded-full bg-[#0063d1]"
                    style={signalDelay(index * 240)}
                    aria-hidden="true"
                  />
                  checkpoint
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-[#0063d1]/25 bg-[#0063d1]/[0.05] p-6 shadow-[0_18px_50px_-42px_rgba(0,99,209,0.45)]">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#0063d1]">
              Installation commitment
            </p>
            <p className="mt-3 max-w-3xl text-[1.02rem] leading-7 text-[#262626]">
              By day 90, your source-backed executive brief, command agent,
              three specialist agents, and three controlled workflows are live.
              If agreed deliverables are not operating, Prism continues
              implementation with no additional build fees until they are.
            </p>
          </div>
        </PremiumSection>

        <PremiumSection id="integrations" tone="soft">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading
              eyebrow="Integrations"
              title="Your tools feed the context. The context feeds command."
              description="Founder OS reads from and acts through the systems your company already uses. The first installation connects five to eight core systems, then expands as reliability is proven."
            />
            <div className="grid gap-3 rounded-[2rem] border border-[#ededed] bg-[#ffffff] p-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center sm:p-6">
              {[
                ['Tools', 'Ads, CRM, analytics, docs'],
                ['Context', 'Sources, rules, memory'],
                ['Command', 'Answers, decisions, approvals'],
              ].map(([title, body], index) => (
                <div key={title} className="contents">
                  <div className="rounded-2xl border border-[#ededed] bg-[#fafafa] p-4">
                    <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[#0063d1]">
                      0{index + 1}
                    </p>
                    <p className="mt-2 text-[1rem] font-semibold text-[#0a0a0a]">
                      {title}
                    </p>
                    <p className="mt-1 text-[0.84rem] leading-5 text-[#6e6e6e]">
                      {body}
                    </p>
                  </div>
                  {index < 2 ? (
                    <ArrowRight
                      className="hidden h-5 w-5 text-[#6b6b6b] sm:block"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 space-y-10">
            {STACK_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#6e6e6e]">
                  {group.label}
                </p>
                <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                  {group.logos.map((logo) => (
                    <li key={logo.name}>
                      <StackLogo name={logo.name} file={logo.file} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-[0.88rem] leading-6 text-[#737373]">
            Plus the systems specific to your company. If a tool has an API or
            reliable export, Founder OS can usually reach it through a
            controlled connector.
          </p>
        </PremiumSection>

        <PremiumSection id="security">
          <SectionHeading
            eyebrow="Security and ownership"
            title="Trust is an implementation detail."
            description="A command layer touches systems that matter. The deployment must be isolated, permissioned, logged, reversible, and honest about what it will not do."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {SECURITY.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-[#ededed] bg-[#ffffff] p-6 fos-lift"
                >
                  <IconBadge icon={Icon} />
                  <div>
                    <h3 className="text-[1.05rem] font-semibold tracking-[-0.01em] text-[#0a0a0a]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.92rem] leading-6 text-[#525252]">
                      {item.body}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-8 rounded-2xl border border-[#ededed] bg-[#fafafa] p-6">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#6e6e6e]">
              What Founder OS will not do
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                'It will not make legal, clinical, or financial decisions.',
                'It will not move money or sign contracts without separately scoped controls.',
                'It will not auto-publish high-risk work on day one.',
              ].map((item) => (
                <p
                  key={item}
                  className="rounded-xl border border-[#ededed] bg-[#ffffff] p-4 text-[0.9rem] leading-6 text-[#404040]"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </PremiumSection>

        <PremiumSection tone="soft">
          <SectionHeading
            eyebrow="Who it is for"
            title="Founder OS amplifies operating clarity. It does not create it from chaos."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#ededed] bg-[#ffffff] p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className="h-5 w-5 text-[#15803d]"
                  aria-hidden="true"
                />
                <h3 className="text-[1.1rem] font-semibold tracking-[-0.01em] text-[#0a0a0a]">
                  A fit if
                </h3>
              </div>
              <ul className="mt-5 space-y-3">
                {FIT.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.92rem] leading-6 text-[#404040]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803d]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#ededed] bg-[#ffffff] p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <CircleSlash
                  className="h-5 w-5 text-[#6e6e6e]"
                  aria-hidden="true"
                />
                <h3 className="text-[1.1rem] font-semibold tracking-[-0.01em] text-[#0a0a0a]">
                  Not yet if
                </h3>
              </div>
              <ul className="mt-5 space-y-3">
                {NOT_FIT.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.92rem] leading-6 text-[#737373]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4d4d4]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PremiumSection>

        <PremiumSection>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading
              eyebrow="Architecture"
              title="Model-agnostic by design. Context-owned by Prism."
              description="Frontier models improve and change. Founder OS is built so models can be routed, tested, and upgraded while the durable assets stay yours: context, connectors, workflows, approvals, evaluations, and logs."
            />
            <div className="overflow-hidden rounded-2xl border border-[#ededed] bg-[#fafafa]">
              {ARCHITECTURE_LAYERS.map((layer, index, arr) => (
                <div
                  key={layer}
                  className={`flex items-center gap-3 px-5 py-3.5 ${index === 0 ? '' : 'border-t border-[#ededed]'} ${index === arr.length - 1 ? 'bg-[#ffffff]' : ''}`}
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.66rem] text-[#6b6b6b]"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[0.92rem] text-[#262626]">{layer}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 border-t border-[#ededed] pt-8">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#6e6e6e]">
              The model router can draw from frontier providers
            </p>
            <ul className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
              {AI_PROVIDERS.map((provider) => (
                <li key={provider.name}>
                  <StackLogo name={provider.name} file={provider.file} />
                </li>
              ))}
            </ul>
          </div>
        </PremiumSection>

        <PremiumSection id="pricing" tone="soft">
          <SectionHeading
            eyebrow="Engagement"
            title="A paid path for serious operators."
            description="This does not run through the free Growth Dashboard funnel. Start with the Blueprint, prove the opportunity, then decide whether the full installation is worth building."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {STAGES.map((stage) => (
              <div
                key={stage.name}
                className={`flex flex-col rounded-2xl border p-6 sm:p-7 fos-lift ${
                  stage.featured
                    ? 'border-[#0a0a0a] bg-[#ffffff] shadow-[0_24px_60px_-36px_rgba(0,0,0,0.4)]'
                    : 'border-[#ededed] bg-[#ffffff]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#6e6e6e]">
                    {stage.stage}
                  </span>
                  {stage.featured ? (
                    <span className="rounded-full bg-[#0a0a0a] px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#ffffff]">
                      Core
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3 text-[1.2rem] font-semibold tracking-[-0.02em] text-[#0a0a0a]">
                  {stage.name}
                </h3>
                <p className="mt-4 text-[2rem] font-semibold tracking-[-0.04em] text-[#0a0a0a]">
                  {stage.price}
                </p>
                <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-[#6e6e6e]">
                  {stage.cadence}
                </p>
                <p className="mt-5 text-[0.92rem] leading-6 text-[#525252]">
                  {stage.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-[0.9rem] leading-6 text-[#737373]">
            Want Prism to continuously operate content, ads, website, and
            customer journeys on top of the command layer? That is{' '}
            <span className="text-[#262626]">Command + Operate</span>, from
            $15,000/month. Regulated or enterprise installations with multiple
            departments and custom SLAs start at $100,000.
          </p>
        </PremiumSection>

        <PremiumSection>
          <div className="max-w-3xl">
            <Eyebrow>Proof</Eyebrow>
            <h2 className="mt-4 text-balance text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0a0a0a]">
              Prism is its own first customer.
            </h2>
            <p className="mt-5 text-[1.05rem] leading-8 text-[#525252]">
              We are building Founder OS on Prism before selling it broadly. We
              connect our own analytics, search, advertising, pipeline, content,
              and operating workflows, then use the daily brief ourselves. We
              would rather publish verified results than invent a number before
              the system earns it.
            </p>
            <p className="mt-4 text-[1.05rem] leading-8 text-[#525252]">
              A small founding cohort is forming now. The measurement framework
              is simple: reduce founder decision load, shorten time from issue
              to approved action, improve workflow reliability, and lower human
              correction rate.
            </p>
            <div className="mt-8 border-t border-[#ededed] pt-6">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#6e6e6e]">
                Verified Prism client results
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {CLIENT_PROOF.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[#ededed] bg-[#ffffff] p-4 shadow-[0_14px_38px_-34px_rgba(10,10,10,0.3)]"
                  >
                    <p className="text-[1.6rem] font-semibold tracking-[-0.04em] text-[#0a0a0a]">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[0.85rem] leading-5 text-[#525252]">
                      {item.label}
                    </p>
                    <p className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[#737373]">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {PROOF_METRICS.map((metric) => {
                const Icon = metric.icon
                return (
                  <div
                    key={metric.metric}
                    className="rounded-2xl border border-[#ededed] bg-[#fafafa] p-4 shadow-[0_14px_38px_-34px_rgba(10,10,10,0.3)]"
                  >
                    <Icon
                      className="h-4 w-4 text-[#0063d1]"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    <p className="mt-3 text-[0.95rem] font-semibold tracking-[-0.01em] text-[#0a0a0a]">
                      {metric.metric}
                    </p>
                    <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#6e6e6e]">
                      {metric.status}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </PremiumSection>

        <PremiumSection tone="soft">
          <div className="max-w-3xl">
            <SectionHeading eyebrow="FAQ" title="Before you apply." />
            <div className="mt-8 divide-y divide-[#ededed] overflow-hidden rounded-2xl border border-[#ededed] bg-[#ffffff] shadow-[0_18px_52px_-44px_rgba(10,10,10,0.35)]">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="group px-5 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-[1.05rem] font-medium tracking-[-0.01em] text-[#0a0a0a]">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="text-[#0063d1] transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[0.95rem] leading-7 text-[#525252]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </PremiumSection>

        <PremiumSection className="border-b-0 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#e2e2e2] bg-[#fafafa] px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#737373]">
              <Clock3
                className="h-3.5 w-3.5 text-[#0063d1]"
                aria-hidden="true"
              />
              Start with the map
            </p>
            <h2 className="mt-5 text-balance text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-[#0a0a0a]">
              Stop carrying the operating system in your head.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[1.08rem] leading-8 text-[#525252]">
              Apply for a Founder Systems Blueprint. Prism will map the systems,
              prove a first workflow, and tell you exactly what a 90-day
              installation should include.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PrimaryButton href={APPLY_HREF}>
                Apply for a Founder Systems Blueprint
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </PrimaryButton>
              <BookCallButton />
              <SecondaryButton href="#demo">
                See the command demo
              </SecondaryButton>
            </div>
            <p className="mt-4 text-[0.85rem] leading-6 text-[#737373]">
              Not ready for the full application? Book a 30 minute fit call
              first.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {CTA_COMMAND_CHIPS.map((chip) => (
                <CommandChip key={chip}>{chip}</CommandChip>
              ))}
            </div>
            <p className="mt-6 font-mono text-[0.78rem] uppercase tracking-[0.16em] text-[#6e6e6e]">
              Know. Decide. Approve.
            </p>
          </div>
        </PremiumSection>
      </main>

      <footer className="border-t border-[#ededed] bg-[#ffffff] px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[0.95rem] font-semibold text-[#0a0a0a]">
                Prism
              </span>
              <span aria-hidden="true" className="text-[#d4d4d4]">
                /
              </span>
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[#737373]">
                Founder OS
              </span>
            </div>
            <p className="mt-2 max-w-md text-[0.85rem] leading-6 text-[#6e6e6e]">
              A managed AI command layer for founder-led companies: governed by
              the founder, improved by frontier models, operated by Prism.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.85rem] text-[#525252]"
          >
            <a
              className="transition-colors hover:text-[#0a0a0a]"
              href="#install"
            >
              Install
            </a>
            <a
              className="transition-colors hover:text-[#0a0a0a]"
              href="#control"
            >
              Control
            </a>
            <a
              className="transition-colors hover:text-[#0a0a0a]"
              href="#pricing"
            >
              Pricing
            </a>
            <Link
              className="transition-colors hover:text-[#0a0a0a]"
              href={APPLY_HREF}
            >
              Apply
            </Link>
            <Link className="transition-colors hover:text-[#0a0a0a]" href="/">
              Prism site
            </Link>
          </nav>
        </div>
        <div className="mx-auto mt-8 max-w-6xl border-t border-[#f0f0f0] pt-6">
          <p className="text-[0.75rem] text-[#6e6e6e]">
            © {2026} Prism. Founder OS connects the systems that matter and runs
            controlled, approved execution. It does not provide financial,
            legal, or clinical decisions.
          </p>
        </div>
      </footer>

      <ServiceSchema
        serviceId="founder-os"
        name="Founder OS: managed AI command layer"
        description="A managed AI command layer for founder-led companies. Prism connects core systems, maintains company operating context, builds a command agent plus specialist agents, and progresses from visibility to recommendations to approved execution over 90 days."
        serviceType="AI operations and managed automation"
        areaServed="United States"
        offerDetails={{
          name: 'Founder Systems Blueprint',
          description:
            'A two-week paid diagnostic that maps systems, KPIs, sources, workflows, value, and risk, delivers a working prototype, and returns a fixed 90-day implementation plan. Credited toward installation.',
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          price: '10000',
          priceCurrency: 'USD',
          url: CANONICAL_URL,
        }}
      />
      <FAQSchema questions={[...FAQ_ITEMS]} />
    </div>
  )
}
