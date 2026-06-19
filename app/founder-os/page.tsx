import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  CircleSlash,
  Eye,
  Gauge,
  KeyRound,
  Layers,
  LineChart,
  Lock,
  type LucideIcon,
  MessagesSquare,
  PenLine,
  Radar,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'

import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const CANONICAL_URL = 'https://www.design-prism.com/founder-os'
const APPLY_HREF = '/contact?topic=founder-os'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Founder OS: a managed AI operating layer',
  description:
    'Prism connects the systems that run your company and builds a managed team of AI agents around the way you work. Know what is happening, decide what matters, and approve execution from your phone.',
  path: '/founder-os',
  ogImage: '/prism-opengraph.png',
})

/* ------------------------------------------------------------------ */
/* Content                                                            */
/* ------------------------------------------------------------------ */

const TRIAD = [
  {
    word: 'Know',
    body: 'A reliable, current view of the business — reconciled across systems, with a source and a freshness time on every claim.',
    icon: Eye,
  },
  {
    word: 'Decide',
    body: 'Prioritized recommendations with evidence and tradeoffs. The agent surfaces only what genuinely needs you.',
    icon: BrainCircuit,
  },
  {
    word: 'Approve',
    body: 'Controlled execution through one interface. You approve a plan and its limits — never an opaque “go do it.”',
    icon: BadgeCheck,
  },
] as const

const CONTEXT_ITEMS = [
  'Company goals and current priorities',
  'Offers, customers, positioning, and brand voice',
  'KPI definitions and the authoritative source for each',
  'Systems, data owners, and freshness expectations',
  'Standard operating procedures and decision rules',
  'Approval thresholds and customer-message policies',
  'Agent identities, permissions, and escalation rules',
  'Action history, decision memory, and evaluations',
] as const

const LOOP_STEPS = [
  {
    step: '01',
    title: 'Observe',
    body: 'Monitors the connected sources and identifies what changed.',
    icon: Radar,
  },
  {
    step: '02',
    title: 'Explain',
    body: 'Reconciles multiple sources, explains likely causes, and cites where the information came from.',
    icon: LineChart,
  },
  {
    step: '03',
    title: 'Decide',
    body: 'Ranks possible actions, explains tradeoffs, and surfaces only the decisions that need you.',
    icon: BrainCircuit,
  },
  {
    step: '04',
    title: 'Execute',
    body: 'Drafts or performs approved actions through controlled tools — nothing more.',
    icon: Workflow,
  },
  {
    step: '05',
    title: 'Learn',
    body: 'Measures results, records corrections, and updates what good performance looks like.',
    icon: Gauge,
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
    example: 'Draft an email, page, or customer response',
    tone: 'neutral',
  },
  {
    level: '3',
    name: 'Execute with approval',
    capability: 'Act only after explicit approval',
    example: 'Publish approved copy or send approved follow-ups',
    tone: 'accent',
  },
  {
    level: '4',
    name: 'Bounded autonomy',
    capability: 'Perform pre-authorized, low-risk actions',
    example: 'Tag leads or pause ads above an agreed stop-loss',
    tone: 'accent',
  },
  {
    level: '—',
    name: 'Prohibited',
    capability: 'Never autonomous',
    example: 'Move money, sign contracts, make clinical decisions',
    tone: 'danger',
  },
] as const

const AGENTS = [
  {
    name: 'Chief of Staff',
    role: 'Command agent',
    body: 'Produces the daily brief, answers cross-company questions, holds decision memory, and routes work to specialists.',
    icon: Layers,
  },
  {
    name: 'Growth Analyst',
    role: 'Specialist',
    body: 'Watches ads, analytics, search, site behavior, CRM movement, and reviews. Detects anomalies and prepares source-backed recommendations.',
    icon: LineChart,
  },
  {
    name: 'Content & Website',
    role: 'Specialist',
    body: 'Uses your positioning and voice to draft content, campaigns, pages, and emails — staged for review, never auto-published.',
    icon: PenLine,
  },
  {
    name: 'Customer Pipeline',
    role: 'Specialist',
    body: 'Finds unresponded inquiries, stalled deals, and missed follow-ups. Drafts responses and routes them by your policies.',
    icon: MessagesSquare,
  },
] as const

const INSTALL_SCOPE = [
  'One supported primary chat channel',
  'Five to eight core systems connected',
  'One command agent + three specialist agents',
  'Three production-grade workflows',
  'Company context and KPI source-of-truth layer',
  'Approval policies and isolated client environment',
  'One mobile approval and audit surface',
  'Ninety days of staged deployment and stabilization',
] as const

const WORKFLOWS = [
  {
    name: 'Executive brief',
    body: 'Every morning, reconcile yesterday’s growth, pipeline, website, and customer activity and surface only meaningful exceptions.',
  },
  {
    name: 'Campaign optimization',
    body: 'Review advertising and funnel performance, find the highest-leverage problem, and prepare a controlled test.',
  },
  {
    name: 'Lead recovery',
    body: 'Identify high-value leads that have gone cold, draft contextual follow-ups, and send them only after approval.',
  },
] as const

const PHASES = [
  {
    label: 'Days 0–30',
    title: 'Read-only',
    body: 'Connect the systems that matter and define authoritative sources. Agents observe and explain. No write access until accuracy is verified.',
  },
  {
    label: 'Days 31–60',
    title: 'Draft',
    body: 'Agents prepare work — briefs, recommendations, content, follow-ups — staged for your review. Evaluation thresholds and rollback are proven.',
  },
  {
    label: 'Days 61–90',
    title: 'Approved execution',
    body: 'Controlled, approved actions go live. You approve plans and limits from your phone; every change is recorded and measured.',
  },
] as const

const FIT = [
  'Founder-led with product-market fit',
  '~$5M–$30M revenue, or equivalent operational complexity',
  'Roughly 10–100 employees',
  'At least five important business systems',
  'A founder or operator who is a recurring decision bottleneck',
  '20+ team-hours a week lost to reporting and coordination',
  'Reasonably trustworthy tracking already in place',
  'Willing to standardize workflows instead of preserving chaos',
] as const

const NOT_FIT = [
  'Pre-product-market-fit startups',
  'Solopreneurs with three simple tools',
  'Companies that cannot define their KPIs',
  'Founders unwilling to grant systems access',
  'Anyone expecting a bot to repair dysfunctional management',
  'Buyers shopping primarily on price',
  'Companies demanding unrestricted autonomy on day one',
] as const

const SECURITY = [
  {
    title: 'Dedicated and isolated',
    body: 'One isolated environment per client — never a shared multi-tenant gateway. Strict container or VM boundaries.',
    icon: Lock,
  },
  {
    title: 'Vaulted credentials',
    body: 'Secrets live in a vault or credential proxy, never in prompts or memories. Read access is separated from write access.',
    icon: KeyRound,
  },
  {
    title: 'Audited and reversible',
    body: 'Every consequential tool call is logged with a plan, an approval record, and a rollback path. An immediate pause control is always available.',
    icon: ShieldCheck,
  },
  {
    title: 'PHI excluded by default',
    body: 'Healthcare deployments begin with marketing-only, non-PHI data. Regulated work requires a separately scoped architecture and legal review.',
    icon: CircleSlash,
  },
] as const

const STAGES = [
  {
    stage: 'Stage 1',
    name: 'Founder Systems Blueprint',
    price: '$10,000',
    cadence: 'two weeks · credited toward installation',
    body: 'A paid diagnostic that maps your systems, KPIs and sources, workflows, value and risk — plus a working prototype on one narrow dataset and a 90-day roadmap.',
    featured: false,
  },
  {
    stage: 'Stage 2',
    name: 'Installation',
    price: 'from $50,000',
    cadence: 'eight to twelve weeks',
    body: 'Five to eight integrations, a command agent and three specialists, three production workflows, the context and approval layer, and an isolated, audited environment.',
    featured: true,
  },
  {
    stage: 'Stage 3',
    name: 'Managed Command',
    price: 'from $10,000',
    cadence: 'per month · 6–12 month term',
    body: 'Monitoring, evaluation, model and harness upgrades, Prism operator oversight, workflow maintenance and improvements, and defined response times.',
    featured: false,
  },
] as const

const FAQ_ITEMS = [
  {
    question: 'Is this an AI that runs my company by itself?',
    answer:
      'No — and that is the point. Founder OS gives you a source-backed view, prioritized recommendations, and controlled execution. Autonomy expands one staged level at a time, only after measured reliability, and you approve the plan and its limits.',
  },
  {
    question: 'What does it cost?',
    answer:
      'It starts with a $10,000 Founder Systems Blueprint, credited toward an installation that starts at $50,000. Ongoing Managed Command starts at $10,000 per month. Deeper operate-for-you and regulated engagements are scoped separately.',
  },
  {
    question: 'Will it work with the tools I already use?',
    answer:
      'We connect the systems that matter and run a supported primary channel like Slack or WhatsApp. The first installation connects five to eight core systems; more are added as the system proves out.',
  },
  {
    question: 'How do you handle my data and security?',
    answer:
      'Every client gets a dedicated, isolated environment with vaulted credentials, separated read and write access, full audit logging, and an immediate pause control. PHI is excluded by default; regulated deployments require a separately scoped architecture and legal review.',
  },
  {
    question: 'Which AI models power it?',
    answer:
      'A model-agnostic architecture routes work across frontier models from leading providers and is continuously tested and upgraded, so your system improves as the underlying technology advances. We commit to capabilities and service levels — not one model version.',
  },
] as const

/* ------------------------------------------------------------------ */
/* Primitives (light Geist system, scoped to this route)               */
/* ------------------------------------------------------------------ */

const EASE = 'ease-[cubic-bezier(0.175,0.885,0.32,1.1)]'

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[#8f8f8f]">
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
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0a0a0a] px-5 text-[0.95rem] font-medium text-white transition-[background-color,transform,box-shadow] duration-200 ${EASE} hover:bg-[#262626] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070f3] focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
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
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#d4d4d4] bg-white px-5 text-[0.95rem] font-medium text-[#0a0a0a] transition-[background-color,border-color] duration-200 ${EASE} hover:border-[#a3a3a3] hover:bg-[#fafafa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070f3] focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
    >
      {children}
    </Link>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}) {
  return (
    <div
      className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-4 text-balance text-[clamp(1.85rem,3.6vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0a0a0a]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-[1.05rem] leading-7 text-[#525252]">
          {description}
        </p>
      ) : null}
    </div>
  )
}

function IconBadge({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#ededed] bg-[#fafafa] text-[#0a0a0a]"
    >
      <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} />
    </span>
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
            ? 'max-w-[85%] rounded-2xl rounded-br-md bg-[#0a0a0a] px-4 py-2.5 text-[0.92rem] leading-6 text-white'
            : 'max-w-[92%] rounded-2xl rounded-bl-md border border-[#ededed] bg-[#fafafa] px-4 py-3 text-[0.92rem] leading-6 text-[#262626]'
        }
      >
        {children}
      </div>
    </div>
  )
}

function SourceChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[#e2e2e2] bg-white px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-[#737373]">
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function FounderOsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0a0a0a] antialiased [color-scheme:light] selection:bg-[#0a0a0a] selection:text-white">
      {/* Header — self-contained light chrome */}
      <header className="sticky top-0 z-50 border-b border-[#ededed] bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[0.95rem] font-semibold tracking-[-0.01em] text-[#0a0a0a] transition-colors hover:text-[#0070f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070f3] focus-visible:ring-offset-2"
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
            <a className="transition-colors hover:text-[#0a0a0a]" href="#how">
              How it works
            </a>
            <a className="transition-colors hover:text-[#0a0a0a]" href="#control">
              Control
            </a>
            <a className="transition-colors hover:text-[#0a0a0a]" href="#pricing">
              Pricing
            </a>
            <a className="transition-colors hover:text-[#0a0a0a]" href="#security">
              Security
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
              className={`inline-flex min-h-9 items-center rounded-lg bg-[#0a0a0a] px-3.5 text-[0.82rem] font-medium text-white transition-colors duration-200 ${EASE} hover:bg-[#262626] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070f3] focus-visible:ring-offset-2`}
            >
              Apply
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* Hero */}
        <section className="border-b border-[#ededed] px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e2e2e2] bg-[#fafafa] px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#737373]">
              <Sparkles className="h-3.5 w-3.5 text-[#0070f3]" aria-hidden="true" />
              A managed AI operating layer
            </span>
            <h1 className="mt-6 text-balance text-[clamp(2.6rem,6.4vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-[#0a0a0a]">
              Your business, in one conversation.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-[1.12rem] leading-8 text-[#525252]">
              Prism connects the systems that run your company and builds a
              managed team of AI agents around the way you work. Know what is
              happening, understand why, and approve what happens next — from
              Slack or WhatsApp.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PrimaryButton href={APPLY_HREF}>
                Apply for a Founder Systems Blueprint
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </PrimaryButton>
              <SecondaryButton href="#demo">
                Watch the command demo
              </SecondaryButton>
            </div>
            <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[#8f8f8f]">
              Powered by frontier models · Controlled by your permissions ·
              Managed by Prism
            </p>
          </div>

          {/* Know / Decide / Approve */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-[#ededed] bg-[#ededed] sm:grid-cols-3">
            {TRIAD.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.word} className="bg-white p-6 sm:p-7">
                  <IconBadge icon={Icon} />
                  <h3 className="mt-4 text-[1.35rem] font-semibold tracking-[-0.02em] text-[#0a0a0a]">
                    {item.word}.
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-6 text-[#525252]">
                    {item.body}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Phone demonstration */}
        <section
          id="demo"
          className="scroll-mt-20 border-b border-[#ededed] bg-[#fafafa] px-5 py-20 sm:px-8 sm:py-28"
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="The command demo"
                title="“What needs me today?”"
                description="Ask in plain language. The command agent reconciles every connected system, explains why, and acts only on what you approve. This conversation is the product."
              />
              <dl className="mt-8 space-y-4 border-t border-[#ededed] pt-6">
                {[
                  ['Source-backed', 'Every claim carries where it came from and how fresh it is.'],
                  ['Cross-system', 'It traces a number across ads, site, forms, and CRM — not one dashboard.'],
                  ['Approval-gated', 'Drafts everything; publishes only what you approve.'],
                ].map(([term, def]) => (
                  <div key={term} className="flex gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#0070f3]"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-[0.95rem] font-medium text-[#0a0a0a]">
                        {term}
                      </dt>
                      <dd className="text-[0.92rem] leading-6 text-[#525252]">
                        {def}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            {/* Chat mock */}
            <div className="rounded-2xl border border-[#e2e2e2] bg-white p-3 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.25)] sm:p-4">
              <div className="flex items-center justify-between border-b border-[#f0f0f0] px-2 pb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#0a0a0a] text-white">
                    <BrainCircuit className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-[0.85rem] font-medium text-[#0a0a0a]">
                    Founder OS
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#737373]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a] motion-safe:animate-pulse" />
                  Live
                </span>
              </div>

              <div className="space-y-3 px-1 py-4">
                <ChatLine who="founder">What needs me today?</ChatLine>
                <ChatLine who="system">
                  <p className="font-medium text-[#0a0a0a]">3 decisions, 2 anomalies.</p>
                  <ul className="mt-2 space-y-1.5 text-[#404040]">
                    <li>· Approve the paused “Spring” ad set or let it resume.</li>
                    <li>· Qualified leads down 18% week-over-week.</li>
                    <li>· 4 high-value inquiries unanswered &gt; 24h.</li>
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <SourceChip>GA4 · 2m ago</SourceChip>
                    <SourceChip>CRM · 9m ago</SourceChip>
                    <SourceChip>Ads · 5m ago</SourceChip>
                  </div>
                </ChatLine>
                <ChatLine who="founder">Why did qualified leads fall this week?</ChatLine>
                <ChatLine who="system">
                  Spend held steady, but landing-page form starts dropped 22%
                  after Tuesday’s headline change. Ad clicks are fine; the
                  conversion step regressed.
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <SourceChip>Ads</SourceChip>
                    <SourceChip>Page analytics</SourceChip>
                    <SourceChip>Forms</SourceChip>
                  </div>
                </ChatLine>
                <ChatLine who="founder">
                  Draft a recovery plan and 3 new headlines. Don’t publish
                  anything.
                </ChatLine>
                <ChatLine who="system">
                  Drafted a recovery plan + 3 headline options, held for your
                  review. Nothing is live.
                </ChatLine>
                <ChatLine who="founder">
                  Approve plan one and headline three. Hold the rest.
                </ChatLine>
                <ChatLine who="system">
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#16a34a]">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Done.
                  </span>{' '}
                  Headline three is live, plan one is scheduled, and a
                  measurement check is set for Friday. Change logged.
                </ChatLine>
              </div>
            </div>
          </div>
        </section>

        {/* The founder problem */}
        <section className="border-b border-[#ededed] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>The founder problem</Eyebrow>
            <h2 className="mt-4 text-balance text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-[#0a0a0a]">
              You have become the integration layer.
            </h2>
            <div className="mt-6 space-y-5 text-[1.08rem] leading-8 text-[#525252]">
              <p>
                Every person, dashboard, inbox, and application routes through
                you. You move information between systems, reconcile numbers
                that disagree, chase the follow-up that slipped, and hold the
                context no tool has in one place.
              </p>
              <p className="text-[#0a0a0a]">
                Founder OS removes the founder as the human integration between
                everything — without removing the founder from the decisions
                that matter.
              </p>
            </div>
          </div>
        </section>

        {/* What it knows */}
        <section className="border-b border-[#ededed] bg-[#fafafa] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="What it knows"
              title="A managed Company Operating Context."
              description="The durable product isn’t a chatbot or a model subscription — those are replaceable. It’s a living context that Prism builds and maintains so every agent works from the same source of truth."
            />
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[#ededed] bg-[#ededed] sm:grid-cols-2 lg:grid-cols-4">
              {CONTEXT_ITEMS.map((item) => (
                <div
                  key={item}
                  className="flex min-h-28 flex-col justify-between gap-4 bg-white p-5"
                >
                  <Boxes
                    className="h-5 w-5 text-[#0070f3]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <p className="text-[0.92rem] leading-6 text-[#262626]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What it does — the command loop */}
        <section
          id="how"
          className="scroll-mt-20 border-b border-[#ededed] px-5 py-20 sm:px-8 sm:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="What it does"
              title="The Command Loop."
              description="Not “chat with your data” — that’s one feature. This is an operating loop that turns information into decisions and controlled action, then learns from the result."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-5">
              {LOOP_STEPS.map((step) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.title}
                    className="flex flex-col rounded-xl border border-[#ededed] bg-white p-5"
                  >
                    <div className="flex items-center justify-between">
                      <IconBadge icon={Icon} />
                      <span className="font-mono text-[0.7rem] tracking-[0.1em] text-[#bdbdbd]">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="mt-4 text-[1.05rem] font-semibold tracking-[-0.01em] text-[#0a0a0a]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[0.88rem] leading-6 text-[#525252]">
                      {step.body}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* How control works */}
        <section
          id="control"
          className="scroll-mt-20 border-b border-[#ededed] bg-[#0a0a0a] px-5 py-20 text-white sm:px-8 sm:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[#8f8f8f]">
                How control works
              </p>
              <h2 className="mt-4 text-balance text-[clamp(1.85rem,3.6vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
                Power without loss of control.
              </h2>
              <p className="mt-4 text-[1.05rem] leading-7 text-[#bdbdbd]">
                Autonomy expands one explicit level at a time — and only after
                measured reliability. You approve a plan and its limits, never an
                opaque instruction to “go do it.”
              </p>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-white/12">
              {PERMISSION_LADDER.map((row, index) => (
                <div
                  key={row.name}
                  className={`grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[3rem_1fr_1.4fr] sm:items-center sm:gap-5 ${
                    index === 0 ? '' : 'border-t border-white/10'
                  } ${row.tone === 'danger' ? 'bg-[#e5484d]/10' : ''}`}
                >
                  <span
                    className={`font-mono text-sm ${
                      row.tone === 'danger' ? 'text-[#ff6b70]' : 'text-[#8f8f8f]'
                    }`}
                  >
                    {row.level}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[0.98rem] font-medium ${
                        row.tone === 'danger' ? 'text-[#ff8a8d]' : 'text-white'
                      }`}
                    >
                      {row.name}
                    </span>
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-[#8f8f8f]">
                      {row.capability}
                    </span>
                  </div>
                  <span className="text-[0.9rem] leading-6 text-[#bdbdbd]">
                    {row.example}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/12 bg-white/[0.03] p-5">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#8f8f8f]">
                  Every answer carries
                </p>
                <p className="mt-2 text-[0.95rem] leading-6 text-[#e5e5e5]">
                  Source · last-updated time · confidence · assumptions · what’s
                  missing.
                </p>
              </div>
              <div className="rounded-xl border border-white/12 bg-white/[0.03] p-5">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#8f8f8f]">
                  Every action carries
                </p>
                <p className="mt-2 text-[0.95rem] leading-6 text-[#e5e5e5]">
                  Proposed plan · systems changed · expected outcome · approval
                  record · rollback path.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What gets installed */}
        <section className="border-b border-[#ededed] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <SectionHeading
                eyebrow="What gets installed"
                title="Bounded — not small."
                description="V1 doesn’t promise every department. It installs a dependable core: one command agent, three specialists, and three production workflows that prove the concept end to end."
              />
              <ul className="grid gap-px overflow-hidden rounded-2xl border border-[#ededed] bg-[#ededed] sm:grid-cols-2">
                {INSTALL_SCOPE.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 bg-white p-4 text-[0.92rem] leading-6 text-[#262626]"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-[1.05rem] w-[1.05rem] shrink-0 text-[#0070f3]"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14">
              <Eyebrow>The first agent team</Eyebrow>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {AGENTS.map((agent) => {
                  const Icon = agent.icon
                  return (
                    <div
                      key={agent.name}
                      className="flex flex-col rounded-xl border border-[#ededed] bg-white p-5"
                    >
                      <IconBadge icon={Icon} />
                      <p className="mt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#0070f3]">
                        {agent.role}
                      </p>
                      <h3 className="mt-1 text-[1.05rem] font-semibold tracking-[-0.01em] text-[#0a0a0a]">
                        {agent.name}
                      </h3>
                      <p className="mt-2 text-[0.88rem] leading-6 text-[#525252]">
                        {agent.body}
                      </p>
                    </div>
                  )
                })}
              </div>
              <p className="mt-5 max-w-3xl text-[0.9rem] leading-6 text-[#737373]">
                Finance, legal, HR, and sensitive healthcare operations stay
                outside the initial product — or strictly read-only — until the
                core system is proven.
              </p>
            </div>

            <div className="mt-14">
              <Eyebrow>The first three workflows</Eyebrow>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {WORKFLOWS.map((wf) => (
                  <div
                    key={wf.name}
                    className="rounded-xl border border-[#ededed] bg-[#fafafa] p-5"
                  >
                    <h3 className="text-[1.02rem] font-semibold tracking-[-0.01em] text-[#0a0a0a]">
                      {wf.name}
                    </h3>
                    <p className="mt-2 text-[0.9rem] leading-6 text-[#525252]">
                      {wf.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 90-day process */}
        <section className="border-b border-[#ededed] bg-[#fafafa] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="The 90-day process"
              title="Visibility, then recommendations, then approved execution."
              description="Every installation is staged. Agents earn write access — they don’t start with it."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {PHASES.map((phase) => (
                <div
                  key={phase.title}
                  className="relative rounded-2xl border border-[#ededed] bg-white p-6"
                >
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#0070f3]">
                    {phase.label}
                  </span>
                  <h3 className="mt-3 flex items-center gap-2 text-[1.25rem] font-semibold tracking-[-0.02em] text-[#0a0a0a]">
                    <CalendarClock
                      className="h-5 w-5 text-[#8f8f8f]"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-6 text-[#525252]">
                    {phase.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-[#0070f3]/25 bg-[#0070f3]/[0.05] p-6">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#0070f3]">
                The installation guarantee
              </p>
              <p className="mt-3 max-w-3xl text-[1.02rem] leading-7 text-[#262626]">
                By day 90, your source-backed executive brief, cross-system
                command agent, and three controlled workflows are live — or Prism
                continues the implementation, with no additional build fees,
                until those agreed deliverables are operating.
              </p>
            </div>
          </div>
        </section>

        {/* Security & ownership */}
        <section
          id="security"
          className="scroll-mt-20 border-b border-[#ededed] px-5 py-20 sm:px-8 sm:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Security & ownership"
              title="At this level, security is part of the product."
              description="A buyer evaluating a $50,000 installation will investigate hard. Every deployment is dedicated, isolated, audited, and reversible — and ships with a security packet."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {SECURITY.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-xl border border-[#ededed] bg-white p-6"
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
            <p className="mt-6 max-w-3xl text-[0.88rem] leading-6 text-[#737373]">
              We don’t describe the system as “HIPAA compliant” because one model
              provider can sign a BAA. A regulated deployment is evaluated as a
              whole: data-flow analysis, subprocessor agreements, access
              controls, retention rules, and a security risk assessment.
            </p>
          </div>
        </section>

        {/* Fit / non-fit */}
        <section className="border-b border-[#ededed] bg-[#fafafa] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Who it’s for"
              title="Founder OS amplifies an operating system. It won’t create one where none exists."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#ededed] bg-white p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#16a34a]" aria-hidden="true" />
                  <h3 className="text-[1.1rem] font-semibold tracking-[-0.01em] text-[#0a0a0a]">
                    A fit if…
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
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#16a34a]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[#ededed] bg-white p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <CircleSlash className="h-5 w-5 text-[#a3a3a3]" aria-hidden="true" />
                  <h3 className="text-[1.1rem] font-semibold tracking-[-0.01em] text-[#0a0a0a]">
                    Not yet if…
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
          </div>
        </section>

        {/* Architecture / model-agnostic */}
        <section className="border-b border-[#ededed] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <SectionHeading
                eyebrow="Architecture"
                title="Model-agnostic by design."
                description="Work is routed across frontier models from leading providers and continuously tested and upgraded — so your system improves as the technology advances. We commit to capabilities and service levels, not one model version. OpenClaw and Hermes are replaceable components; Prism owns the context, connectors, permissions, workflows, and evaluations."
              />
              <div className="overflow-hidden rounded-2xl border border-[#ededed] bg-[#fafafa]">
                {[
                  'Business systems',
                  'Source registry & context layer',
                  'Command orchestrator & specialist agents',
                  'Model router',
                  'Controlled tools & workflows',
                  'Approval & policy engine',
                  'Chat interface & command center',
                  'Tracing, evaluation & audit logs',
                ].map((layer, index, arr) => (
                  <div
                    key={layer}
                    className={`flex items-center gap-3 px-5 py-3.5 ${
                      index === 0 ? '' : 'border-t border-[#ededed]'
                    } ${index === arr.length - 1 ? 'bg-white' : ''}`}
                  >
                    <span className="font-mono text-[0.66rem] text-[#bdbdbd]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[0.92rem] text-[#262626]">{layer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="scroll-mt-20 border-b border-[#ededed] bg-[#fafafa] px-5 py-20 sm:px-8 sm:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Engagement"
              title="A paid path that selects serious operators."
              description="This doesn’t run through a free audit. It starts with a paid diagnostic that earns its keep and de-risks the build for both sides."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {STAGES.map((stage) => (
                <div
                  key={stage.name}
                  className={`flex flex-col rounded-2xl border p-6 sm:p-7 ${
                    stage.featured
                      ? 'border-[#0a0a0a] bg-white shadow-[0_24px_60px_-36px_rgba(0,0,0,0.4)]'
                      : 'border-[#ededed] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#8f8f8f]">
                      {stage.stage}
                    </span>
                    {stage.featured ? (
                      <span className="rounded-full bg-[#0a0a0a] px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white">
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
                  <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-[#8f8f8f]">
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
              customer journeys on top of the command layer? That’s{' '}
              <span className="text-[#262626]">Command + Operate</span>, from
              $15,000/month. Regulated or enterprise installations with multiple
              departments and custom SLAs start at $100,000.
            </p>
          </div>
        </section>

        {/* Proof — honest */}
        <section className="border-b border-[#ededed] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>Proof</Eyebrow>
            <h2 className="mt-4 text-balance text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0a0a0a]">
              Prism is its own first customer.
            </h2>
            <p className="mt-5 text-[1.05rem] leading-8 text-[#525252]">
              We’re building Founder OS on Prism before we sell it — connecting
              our own analytics, search, advertising, pipeline, and content, and
              running the daily brief ourselves every morning. We’d rather show a
              measured deployment than promise a number we can’t yet prove.
            </p>
            <p className="mt-4 text-[1.05rem] leading-8 text-[#525252]">
              A small founding cohort is forming now. Measured results — founder
              hours reclaimed, decision-cycle time, workflow reliability — will be
              published here as they’re verified, not estimated.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {['Founder hours reclaimed', 'Decision cycle time', 'Workflow reliability', 'Human correction rate'].map(
                (metric) => (
                  <span
                    key={metric}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#e2e2e2] bg-[#fafafa] px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-[#737373]"
                  >
                    <Gauge className="h-3 w-3" aria-hidden="true" />
                    {metric}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-[#ededed] bg-[#fafafa] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <SectionHeading eyebrow="FAQ" title="Before you apply." />
            <div className="mt-8 divide-y divide-[#ededed] border-y border-[#ededed]">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-[1.05rem] font-medium tracking-[-0.01em] text-[#0a0a0a]">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="text-[#0070f3] transition-transform duration-200 group-open:rotate-45"
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
        </section>

        {/* Final CTA */}
        <section className="px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-[#0a0a0a]">
              Run less of the business. Command more of it.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[1.08rem] leading-8 text-[#525252]">
              Start with a Founder Systems Blueprint: a two-week paid diagnostic
              that maps your systems, proves a narrow prototype, and returns a
              fixed 90-day plan.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PrimaryButton href={APPLY_HREF}>
                Apply for a Founder Systems Blueprint
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </PrimaryButton>
              <SecondaryButton href="#demo">See the command demo</SecondaryButton>
            </div>
            <p className="mt-6 font-mono text-[0.78rem] uppercase tracking-[0.16em] text-[#8f8f8f]">
              Know. Decide. Approve.
            </p>
          </div>
        </section>
      </main>

      {/* Footer — self-contained light chrome */}
      <footer className="border-t border-[#ededed] bg-white px-5 py-12 sm:px-8">
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
            <p className="mt-2 max-w-md text-[0.85rem] leading-6 text-[#8f8f8f]">
              A managed AI operating layer for founder-led companies — governed
              by the founder, improved by frontier models, operated by Prism.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.85rem] text-[#525252]"
          >
            <a className="transition-colors hover:text-[#0a0a0a]" href="#how">
              How it works
            </a>
            <a className="transition-colors hover:text-[#0a0a0a]" href="#pricing">
              Pricing
            </a>
            <Link className="transition-colors hover:text-[#0a0a0a]" href={APPLY_HREF}>
              Apply
            </Link>
            <Link className="transition-colors hover:text-[#0a0a0a]" href="/">
              Prism site
            </Link>
          </nav>
        </div>
        <div className="mx-auto mt-8 max-w-6xl border-t border-[#f0f0f0] pt-6">
          <p className="text-[0.75rem] text-[#a3a3a3]">
            © {2026} Prism. Founder OS connects the systems that matter and runs
            controlled, approved execution. It does not provide financial, legal,
            or clinical decisions.
          </p>
        </div>
      </footer>

      <ServiceSchema
        serviceId="founder-os"
        name="Founder OS — managed AI operating layer"
        description="A managed AI operating layer for founder-led companies. Prism connects core systems, builds a command agent plus specialist agents, and progresses from visibility to recommendations to approved execution over 90 days."
        serviceType="AI operations and managed automation"
        areaServed="United States"
        offerDetails={{
          name: 'Founder Systems Blueprint',
          description:
            'A two-week paid diagnostic that maps systems, KPIs and sources, and workflows, delivers a working prototype, and returns a fixed 90-day implementation plan. Credited toward installation.',
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
