import type { ReactNode } from 'react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'

import { BrowserFrame } from '@/components/prism/browser-frame'
import { Reveal } from '@/components/prism/reveal'
import { Eyebrow, Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import TrackedLink from '@/components/tracked-link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/* Shared building blocks for the "why X love Prism" industry landers.         */
/* -------------------------------------------------------------------------- */

// Overriding the size drops `text-title` in cn(), so restate its voice here.
const SPLIT_TITLE =
  'text-[clamp(2rem,1.45rem+2.2vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] max-w-[20ch]'

export function CheckList({
  items,
  className,
  columns = 1,
}: {
  items: readonly string[]
  className?: string
  columns?: 1 | 2
}) {
  return (
    <ul
      className={cn(
        'grid gap-3 text-[15px] leading-relaxed text-muted-foreground',
        columns === 2 && 'sm:grid-cols-2 sm:gap-x-8',
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-[3px] grid size-[18px] shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.05]"
          >
            <Check className="size-3 text-foreground" strokeWidth={2.5} />
          </span>
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span
      aria-hidden="true"
      className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground shadow-[0_1px_0_0_oklch(1_0_0/6%)_inset]"
    >
      <Icon className="size-[18px]" strokeWidth={1.75} />
    </span>
  )
}

export type WhyOutcome = { icon: LucideIcon; title: string; description: string }

/** Open header over one hairline panel split into columns (not a card grid). */
export function WhyOutcomeBand({
  id,
  eyebrow,
  title,
  description,
  items,
}: {
  id: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  items: readonly WhyOutcome[]
}) {
  return (
    <Section aria-labelledby={id}>
      <Reveal>
        <SectionHeader
          id={id}
          eyebrow={eyebrow}
          title={title}
          description={description}
          titleClassName="max-w-[22ch]"
        />
      </Reveal>
      <Reveal delay={100}>
        <ul
          className={cn(
            'spectrum-rule mt-12 grid overflow-hidden rounded-2xl border border-white/[0.08] bg-card sm:mt-14',
            items.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3',
          )}
        >
          {items.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                'flex flex-col gap-5 border-white/[0.07] p-6 sm:p-8',
                index > 0 && 'border-t md:border-t-0',
                index > 0 && 'md:border-l',
                items.length === 4 && index === 2 && 'md:border-l-0 md:border-t lg:border-l lg:border-t-0',
                items.length === 4 && index === 3 && 'md:border-t lg:border-t-0',
              )}
            >
              <IconTile icon={item.icon} />
              <div>
                <h3 className="text-lg font-semibold leading-snug tracking-[-0.02em] text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}

export type WhyFeature = {
  icon?: LucideIcon
  title: string
  kicker?: string
  description?: string
  bullets?: readonly string[]
}

/** Card grid with optional icon, description, and checklists. */
export function WhyFeatureGrid({
  id,
  eyebrow,
  title,
  description,
  items,
  columns = 3,
  featuredIndex,
  footer,
}: {
  id: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  items: readonly WhyFeature[]
  columns?: 2 | 3 | 4
  /** One card per section may carry the spectrum beam. */
  featuredIndex?: number
  footer?: ReactNode
}) {
  return (
    <Section aria-labelledby={id}>
      <Reveal>
        <SectionHeader
          id={id}
          eyebrow={eyebrow}
          title={title}
          description={description}
          titleClassName="max-w-[22ch]"
        />
      </Reveal>
      <div
        className={cn(
          'mt-12 grid gap-4 sm:mt-14',
          columns === 2 && 'md:grid-cols-2',
          columns === 3 && 'md:grid-cols-2 lg:grid-cols-3',
          columns === 4 && 'md:grid-cols-2 xl:grid-cols-4',
        )}
      >
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 70} className="h-full">
            <SpotlightCard beam={featuredIndex === index} className="flex h-full flex-col p-6 sm:p-8">
              {item.icon ? <IconTile icon={item.icon} /> : null}
              {item.kicker ? (
                <p className={cn('text-eyebrow text-subtle', item.icon && 'mt-6')}>{item.kicker}</p>
              ) : null}
              <h3
                className={cn(
                  'text-xl font-semibold leading-snug tracking-[-0.025em] text-foreground',
                  item.kicker ? 'mt-3' : item.icon ? 'mt-6' : null,
                )}
              >
                {item.title}
              </h3>
              {item.description ? (
                <p className="mt-3 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              ) : null}
              {item.bullets ? <CheckList items={item.bullets} className="mt-6" /> : null}
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
      {footer ? <div className="mt-10">{footer}</div> : null}
    </Section>
  )
}

/** Split section: header + body on one side, a contained panel on the other. */
export function WhySplit({
  id,
  eyebrow,
  title,
  description,
  children,
  panel,
  reverse = false,
}: {
  id: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  panel: ReactNode
  reverse?: boolean
}) {
  return (
    <Section aria-labelledby={id}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className={cn(reverse && 'lg:order-2')}>
          <SectionHeader
            id={id}
            eyebrow={eyebrow}
            title={title}
            description={description}
            titleClassName={SPLIT_TITLE}
          >
            {children ? <div className="mt-2 w-full">{children}</div> : null}
          </SectionHeader>
        </Reveal>
        <Reveal delay={100} className={cn(reverse && 'lg:order-1')}>
          {panel}
        </Reveal>
      </div>
    </Section>
  )
}

/** Contained panel used beside split headers. */
export function WhyPanel({
  eyebrow,
  title,
  children,
  beam = false,
  className,
}: {
  eyebrow?: string
  title?: ReactNode
  children: ReactNode
  beam?: boolean
  className?: string
}) {
  return (
    <SpotlightCard beam={beam} className={cn('rounded-3xl p-6 sm:p-10', className)}>
      {eyebrow ? <p className="text-eyebrow text-subtle">{eyebrow}</p> : null}
      {title ? (
        <h3
          className={cn(
            'text-heading text-balance text-foreground',
            eyebrow && 'mt-4',
          )}
        >
          {title}
        </h3>
      ) : null}
      <div className={cn((eyebrow || title) && 'mt-6')}>{children}</div>
    </SpotlightCard>
  )
}

/** A quiet full-width statement band: one big idea in a lit panel. */
export function WhyStatement({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow?: string
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <Section aria-labelledby={id}>
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-6 py-14 text-center sm:px-16 sm:py-20">
          <div aria-hidden="true" className="bg-dots mask-fade-y absolute inset-0 -z-10 opacity-40" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(50%_70%_at_50%_0%,oklch(0.66_0.16_258/16%),transparent_70%)]"
          />
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h2
              id={id}
              className="text-gradient mt-6 max-w-[24ch] text-balance pb-1 text-[clamp(1.75rem,1.3rem+1.8vw,2.85rem)] font-semibold leading-[1.06] tracking-[-0.04em]"
            >
              {title}
            </h2>
            {children ? (
              <div className="text-lead mt-6 max-w-[56ch] text-pretty text-muted-foreground">
                {children}
              </div>
            ) : null}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export type WhyProcessStep = { step: string; detail: string }

/** Bento: who it's for, problems, deliverables, and the four-step process. */
export function WhyPlaybook({
  id,
  eyebrow,
  title,
  whoItsFor,
  problems,
  deliverables,
  process,
}: {
  id: string
  eyebrow: string
  title: ReactNode
  whoItsFor: readonly string[]
  problems: readonly string[]
  deliverables: readonly string[]
  process: readonly WhyProcessStep[]
}) {
  return (
    <Section aria-labelledby={id}>
      <Reveal>
        <SectionHeader id={id} eyebrow={eyebrow} title={title} titleClassName="max-w-[20ch]" />
      </Reveal>
      <div className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-2">
        <Reveal className="h-full">
          <Card className="h-full p-6 sm:p-8">
            <p className="text-eyebrow text-subtle">Who it&apos;s for</p>
            <CheckList items={whoItsFor} className="mt-6" />
          </Card>
        </Reveal>
        <Reveal delay={70} className="h-full">
          <Card className="h-full p-6 sm:p-8">
            <p className="text-eyebrow text-subtle">Problems we solve</p>
            <CheckList items={problems} className="mt-6" />
          </Card>
        </Reveal>
        <Reveal delay={140} className="lg:col-span-2">
          <Card className="p-6 sm:p-8">
            <p className="text-eyebrow text-subtle">What you get</p>
            <CheckList items={deliverables} columns={2} className="mt-6" />
          </Card>
        </Reveal>
        <Reveal delay={210} className="lg:col-span-2">
          <Card className="overflow-hidden">
            <p className="text-eyebrow px-6 pt-6 text-subtle sm:px-8 sm:pt-8">How it works</p>
            <ol className="mt-6 grid border-t border-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
              {process.map((item, index) => (
                <li
                  key={item.step}
                  className={cn(
                    'flex flex-col gap-3 border-white/[0.07] p-6 sm:p-8',
                    index > 0 && 'border-t sm:border-t-0',
                    index % 2 === 1 && 'sm:border-l',
                    index >= 2 && 'sm:border-t lg:border-t-0',
                    index === 2 && 'lg:border-l',
                  )}
                >
                  <span className="font-mono text-xs tabular-nums text-subtle">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-base font-semibold leading-snug tracking-[-0.015em] text-foreground first-letter:uppercase">
                    {item.step}
                  </p>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground first-letter:uppercase">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ol>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}

export type WhyShot = { slug: string; url: string; alt: string }

/**
 * Real client work under the hero: one large browser frame with two
 * companions fanned behind it on large screens.
 */
export function WhyHeroVisual({ shots }: { shots: readonly [WhyShot, WhyShot, WhyShot] }) {
  const [left, center, right] = shots
  return (
    <div className="relative mx-auto max-w-5xl">
      <div
        aria-hidden="true"
        className="absolute inset-x-[8%] -bottom-10 top-[20%] -z-10 rounded-full bg-[radial-gradient(closest-side,oklch(0.66_0.16_258/22%),transparent)] blur-2xl"
      />
      <BrowserFrame
        src={`/case-studies/${left.slug}-home-desktop.jpg`}
        alt={left.alt}
        url={left.url}
        sizes="(min-width: 1024px) 30vw, 1px"
        className="absolute left-0 top-[14%] hidden w-[40%] -translate-x-[18%] -rotate-[5deg] opacity-55 lg:block"
      />
      <BrowserFrame
        src={`/case-studies/${right.slug}-home-desktop.jpg`}
        alt={right.alt}
        url={right.url}
        sizes="(min-width: 1024px) 30vw, 1px"
        className="absolute right-0 top-[14%] hidden w-[40%] translate-x-[18%] rotate-[5deg] opacity-55 lg:block"
      />
      <BrowserFrame
        src={`/case-studies/${center.slug}-home-desktop.jpg`}
        alt={center.alt}
        url={center.url}
        priority
        sizes="(min-width: 1024px) 680px, 92vw"
        className="relative z-10 mx-auto w-full lg:w-[70%]"
      />
    </div>
  )
}

type CaseStudyPick = { slug: string; highlight?: string }

function hostOf(url?: string) {
  if (!url) return undefined
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return undefined
  }
}

/** Case-study cards with real screenshots. Former clients never render. */
export function WhyCaseStudies({
  id,
  eyebrow = 'Case studies',
  title,
  description,
  studies,
  location,
}: {
  id: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  studies: readonly CaseStudyPick[]
  /** Analytics location prefix, e.g. "why dental". */
  location: string
}) {
  const formerSlugs = new Set<string>(FORMER_CLIENT_SLUGS)
  const resolved = studies
    .filter((pick) => !formerSlugs.has(pick.slug))
    .map((pick) => {
      const study = CASE_STUDIES.find((item) => item.slug === pick.slug)
      return study ? { study, highlight: pick.highlight } : null
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  if (!resolved.length) return null

  return (
    <Section aria-labelledby={id}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <SectionHeader id={id} eyebrow={eyebrow} title={title} description={description} titleClassName="max-w-[20ch]" />
        </Reveal>
        <Reveal delay={60}>
          <TrackedLink
            href="/case-studies"
            label="see every case study"
            location={`${location} case studies`}
            className="group/all inline-flex min-h-10 shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            See every case study
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5"
            />
          </TrackedLink>
        </Reveal>
      </div>
      <div
        className={cn(
          'mt-12 grid gap-4 sm:mt-14 md:grid-cols-2',
          resolved.length >= 3 && 'lg:grid-cols-3',
        )}
      >
        {resolved.map(({ study, highlight }, index) => {
          const metric = study.structured?.results?.[0]
          return (
            <Reveal key={study.slug} delay={(index % 3) * 70} className="h-full">
              <TrackedLink
                href={`/case-studies/${study.slug}`}
                label={`case study: ${study.client}`}
                location={`${location} case studies`}
                className="group/cs block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <Card className="flex h-full flex-col overflow-hidden transition-[border-color,transform] duration-300 group-hover/cs:-translate-y-0.5 group-hover/cs:border-white/[0.16]">
                  <div className="relative overflow-hidden border-b border-white/[0.06] bg-popover px-5 pt-5">
                    <BrowserFrame
                      src={`/case-studies/${study.slug}-home-desktop.jpg`}
                      alt={`${study.client} website home page`}
                      url={hostOf(study.websiteUrl)}
                      sizes="(min-width: 1024px) 26vw, (min-width: 768px) 44vw, 88vw"
                      className="-mb-px rounded-b-none border-b-0 transition-transform duration-500 group-hover/cs:-translate-y-1"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{study.industry}</Badge>
                      <span className="text-xs text-subtle">{study.location}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold tracking-[-0.025em] text-foreground">
                      {study.client}
                    </h3>
                    <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                      {highlight ?? study.description}
                    </p>
                    {metric ? (
                      <div className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                        <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground tabular-nums">
                          {metric.value}
                        </p>
                        <p className="mt-1 text-sm leading-snug text-muted-foreground">{metric.label}</p>
                        {metric.sourceName ? (
                          <p className="mt-2 text-xs leading-snug text-subtle">
                            {metric.sourceName}
                            {metric.dateRange ? `, ${metric.dateRange}` : null}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-foreground">
                      Read the case study
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-subtle transition-[color,transform] duration-200 group-hover/cs:-translate-y-0.5 group-hover/cs:translate-x-0.5 group-hover/cs:text-foreground"
                      />
                    </span>
                  </div>
                </Card>
              </TrackedLink>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

/** Inline text link with an arrow, for internal SEO cross-links. */
export function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-[2px] font-medium text-foreground underline decoration-white/25 underline-offset-[5px] transition-colors hover:decoration-white/70 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      {children}
    </Link>
  )
}

export type WhyIconItem = { icon: LucideIcon; text: string }

/** Icon-led list for "why clients stay" style reassurances. */
export function WhyIconList({ items, className }: { items: readonly WhyIconItem[]; className?: string }) {
  return (
    <ul className={cn('grid gap-5', className)}>
      {items.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-start gap-4 text-[15px] leading-relaxed text-muted-foreground">
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-foreground"
          >
            <Icon className="size-4" strokeWidth={1.75} />
          </span>
          <span className="pt-1.5 text-pretty">{text}</span>
        </li>
      ))}
    </ul>
  )
}

/** Numbered journey (e.g. visitor to client) drawn as a connected rail. */
export function WhyJourneyPanel({
  eyebrow,
  stages,
  caption,
}: {
  eyebrow: string
  stages: readonly string[]
  caption: string
}) {
  return (
    <WhyPanel eyebrow={eyebrow} beam>
      <ol className="relative grid gap-3">
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-[1.375rem] top-6 w-px bg-gradient-to-b from-white/20 via-white/10 to-white/30"
        />
        {stages.map((stage, index) => {
          const last = index === stages.length - 1
          return (
            <li
              key={stage}
              className={cn(
                'relative flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-2.5 pr-4',
                last && 'border-white/[0.14] bg-white/[0.05]',
              )}
            >
              <span
                className={cn(
                  'relative grid size-7 shrink-0 place-items-center rounded-full border border-white/15 bg-background font-mono text-[11px] tabular-nums text-muted-foreground',
                  last && 'border-transparent bg-primary text-primary-foreground',
                )}
              >
                {index + 1}
              </span>
              <span className={cn('text-base font-medium tracking-[-0.015em] text-muted-foreground', last && 'text-foreground')}>
                {stage}
              </span>
            </li>
          )
        })}
      </ol>
      <p className="mt-6 text-pretty text-sm leading-relaxed text-subtle">{caption}</p>
    </WhyPanel>
  )
}

export type WhyAction = { label: string; href: string; trackingLabel?: string }

/** CTA row: the waitlist pill (optional) plus outline links, all tracked. */
export function WhyActions({
  location,
  waitlistHref,
  links = [],
  className,
}: {
  location: string
  /** Pass a waitlist href to include the primary pill. */
  waitlistHref?: string
  links?: readonly WhyAction[]
  className?: string
}) {
  return (
    <div className={cn('mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center', className)}>
      {waitlistHref ? <WaitlistButton location={location} href={waitlistHref} size="lg" /> : null}
      {links.map((link) => (
        <Button key={link.href} asChild size="lg" variant="outline" className="group/link">
          <TrackedLink href={link.href} label={link.trackingLabel ?? link.label} location={location}>
            {link.label}
            <ArrowRight
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/link:translate-x-0.5"
            />
          </TrackedLink>
        </Button>
      ))}
    </div>
  )
}

export type WhyHighlight = { title: string; description: string }

/** Title + description rows separated by hairlines, for use inside a panel. */
export function WhyHighlightList({ items }: { items: readonly WhyHighlight[] }) {
  return (
    <ul className="divide-y divide-white/[0.07]">
      {items.map((item) => (
        <li key={item.title} className="py-5 first:pt-0 last:pb-0">
          <p className="text-lg font-semibold tracking-[-0.02em] text-foreground">{item.title}</p>
          <p className="mt-1.5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  )
}
