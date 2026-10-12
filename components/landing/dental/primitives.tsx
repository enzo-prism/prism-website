import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'

import { BrowserFrame } from '@/components/prism/browser-frame'
import { Marquee } from '@/components/prism/marquee'
import { FaqList } from '@/components/prism/faq-list'
import { Section, SectionHeader } from '@/components/prism/section'
import { getCaseStudyMetric } from '@/lib/case-study-data'
import { cn } from '@/lib/utils'

/* --------------------------------------------------------------------------
   Small shared pieces for the dental landers (dental-website, dentist SEO,
   ads, photography, Workspace guides). Server components only.
   -------------------------------------------------------------------------- */

type CheckListProps = {
  items: ReactNode[]
  className?: string
  itemClassName?: string
  /** "dot" for quieter lists, "check" for deliverables. */
  marker?: 'check' | 'dot'
}

export function CheckList({ items, className, itemClassName, marker = 'check' }: CheckListProps) {
  return (
    <ul className={cn('space-y-3', className)}>
      {items.map((item, index) => (
        <li
          key={index}
          className={cn('flex gap-3 text-[15px] leading-7 text-muted-foreground', itemClassName)}
        >
          {marker === 'check' ? (
            <span
              aria-hidden="true"
              className="mt-[5px] grid size-[18px] shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.05]"
            >
              <Check className="size-3 text-foreground" strokeWidth={2.5} />
            </span>
          ) : (
            <span aria-hidden="true" className="mt-[11px] size-1.5 shrink-0 rounded-full bg-white/40" />
          )}
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  )
}

type TextLinkProps = {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
}

/** Inline underlined link for body copy. */
export function TextLink({ href, children, className, external }: TextLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href)
  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        'rounded-[2px] font-medium text-foreground underline decoration-white/25 underline-offset-[5px] transition-colors hover:decoration-white/70 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        className,
      )}
    >
      {children}
    </Link>
  )
}

type ArrowLinkProps = {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
}

/** Standalone "read more" link with a trailing arrow. */
export function ArrowLink({ href, children, className, external }: ArrowLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href)
  const Icon = isExternal ? ArrowUpRight : ArrowRight
  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        'group/arrow inline-flex min-h-10 items-center gap-1.5 rounded-sm text-sm font-medium text-foreground transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        className,
      )}
    >
      {children}
      <Icon
        aria-hidden="true"
        className="size-4 text-muted-foreground transition-transform duration-200 group-hover/arrow:translate-x-0.5 group-hover/arrow:text-foreground"
      />
    </Link>
  )
}

export type RailStep = {
  step?: string
  title: string
  description?: ReactNode
}

type StepRailProps = {
  steps: RailStep[]
  className?: string
  /** Desktop column count (rows wrap). */
  columns?: 3 | 4 | 5
}

/** Numbered process rail: one hairline panel, steps divided by rules. */
export function StepRail({ steps, className, columns = 3 }: StepRailProps) {
  return (
    <ol
      className={cn(
        'grid overflow-hidden rounded-2xl border border-white/[0.08] bg-card sm:grid-cols-2',
        columns === 3 && 'lg:grid-cols-3',
        columns === 4 && 'lg:grid-cols-4',
        columns === 5 && 'lg:grid-cols-5',
        className,
      )}
    >
      {steps.map((item, index) => (
        <li
          key={item.title}
          className="relative -mb-px -mr-px flex flex-col gap-3 border-b border-r border-white/[0.07] p-6 sm:p-7"
        >
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-subtle">
            {item.step ?? String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.02em] text-foreground">
            {item.title}
          </h3>
          {item.description ? (
            <p className="text-[14px] leading-6 text-muted-foreground">{item.description}</p>
          ) : null}
        </li>
      ))}
    </ol>
  )
}

type CalloutProps = {
  title?: ReactNode
  children: ReactNode
  tone?: 'note' | 'warn' | 'good'
  icon?: ReactNode
  className?: string
}

/** Quiet side note. The tone only tints the left rule. */
export function Callout({ title, children, tone = 'note', icon, className }: CalloutProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 pl-7',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-y-0 left-0 w-[3px]',
          tone === 'note' && 'bg-spectrum-blue/70',
          tone === 'warn' && 'bg-spectrum-orange/80',
          tone === 'good' && 'bg-spectrum-green/70',
        )}
      />
      {title ? (
        <p className="flex items-center gap-2 text-[15px] font-semibold text-foreground">
          {icon}
          {title}
        </p>
      ) : null}
      <div className={cn('text-[15px] leading-7 text-muted-foreground', title ? 'mt-3' : null)}>
        {children}
      </div>
    </div>
  )
}

/* ----------------------------- real dental work ---------------------------- */

export type DentalShot = {
  slug: string
  name: string
  location: string
  host: string
}

/** Current dental clients with captured homepages (no former clients). */
export const DENTAL_SHOTS: DentalShot[] = [
  { slug: 'dr-christopher-wong', name: 'Dr. Christopher B. Wong', location: 'Palo Alto, CA', host: 'chriswongdds.com' },
  { slug: 'exquisite-dentistry', name: 'Exquisite Dentistry', location: 'Los Angeles, CA', host: 'exquisitedentistryla.com' },
  { slug: 'family-first-smile-care', name: 'Family First Smile Care', location: 'Los Gatos, CA', host: 'famfirstsmile.com' },
  { slug: 'town-centre-dental', name: 'Town Centre Dental', location: 'Brentwood, CA', host: 'towncentredental.net' },
  { slug: 'wine-country-root-canal', name: 'Wine Country Root Canal', location: 'Santa Rosa, CA', host: 'winecountryrootcanal.com' },
  { slug: 'grace-dental-santa-rosa', name: 'Grace Dental', location: 'Santa Rosa, CA', host: 'tingjenjidds.com' },
  { slug: 'coast-periodontics-and-laser-surgery', name: 'Coast Periodontics', location: 'San Luis Obispo, CA', host: 'coastperiodontics.com' },
  { slug: 'mataria-dental-group', name: 'Mataria Dental Group', location: 'Torrance, CA', host: 'matariadentalgroup.com' },
  { slug: 'waikiki-dental', name: 'Waikiki Dental', location: 'Roseville, CA', host: 'waikikidental.com' },
  { slug: 'sacramento-dental-medicine', name: 'Sacramento Dental Medicine', location: 'Antelope, CA', host: 'sacramentodentalmedicine.com' },
]

type DentalWorkMarqueeProps = {
  slugs?: string[]
  className?: string
  duration?: number
}

/** Full-bleed rail of real dental client homepages, each linking to its case study. */
export function DentalWorkMarquee({ slugs, className, duration = 70 }: DentalWorkMarqueeProps) {
  const shots = slugs
    ? slugs
        .map((slug) => DENTAL_SHOTS.find((shot) => shot.slug === slug))
        .filter((shot): shot is DentalShot => Boolean(shot))
    : DENTAL_SHOTS

  return (
    <Marquee
      duration={duration}
      gap="1.25rem"
      label="Dental websites built by Prism"
      className={cn('py-2', className)}
    >
      {shots.map((shot) => (
        <Link
          key={shot.slug}
          href={`/case-studies/${shot.slug}`}
          className="group/shot block w-[280px] shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:w-[380px]"
        >
          <BrowserFrame
            src={`/case-studies/${shot.slug}-home-desktop.jpg`}
            alt={`${shot.name} website homepage built by Prism`}
            sizes="380px"
            className="transition-transform duration-300 group-hover/shot:-translate-y-0.5"
          />
          <span className="mt-3 flex items-baseline justify-between gap-3 px-1">
            <span className="truncate text-sm font-medium text-foreground">{shot.name}</span>
            <span className="shrink-0 font-mono text-[11px] text-subtle">{shot.location}</span>
          </span>
        </Link>
      ))}
    </Marquee>
  )
}

type DentalProofStatProps = {
  className?: string
}

/** Dr. Wong's verified Search Console result, with source and window. */
export function DentalProofStat({ className }: DentalProofStatProps) {
  const metric = getCaseStudyMetric('dr-christopher-wong')
  return (
    <Link
      href="/case-studies/dr-christopher-wong"
      className={cn(
        'group/proof spectrum-rule relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-card p-6 transition-colors hover:border-white/[0.16] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:p-8',
        className,
      )}
    >
      <span className="flex items-start justify-between gap-4">
        <span className="text-[clamp(3rem,2.2rem+3vw,4.5rem)] font-semibold leading-none tracking-[-0.055em] text-foreground tabular-nums">
          {metric.value}
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="mt-1 size-4 text-subtle transition-[color,transform] duration-200 group-hover/proof:-translate-y-0.5 group-hover/proof:translate-x-0.5 group-hover/proof:text-foreground"
        />
      </span>
      <span className="max-w-[34ch] text-[15px] leading-6 text-muted-foreground">
        {metric.label} for Dr. Christopher B. Wong, Palo Alto.
      </span>
      <span className="text-[12px] leading-relaxed text-subtle">
        Source: {metric.sourceName}, {metric.dateRange}.
      </span>
    </Link>
  )
}

/* ----------------------------------- FAQ ---------------------------------- */

export type DentalFaqItem = {
  question: string
  answer: string
}

type DentalFaqProps = {
  items: DentalFaqItem[]
  idPrefix: string
  title?: ReactNode
  description?: ReactNode
  eyebrow?: ReactNode
}

/**
 * Split FAQ without its own JSON-LD (the pages already ship FAQSchema with
 * the same items). Sticky header left, native-details FaqList right, so every
 * answer stays in the server HTML for search engines and AI crawlers.
 */
export function DentalFaq({
  items,
  idPrefix,
  title = 'questions, answered.',
  description,
  eyebrow = 'FAQ',
}: DentalFaqProps) {
  const headingId = `${idPrefix}-faq-title`
  return (
    <Section id={`${idPrefix}-faq`} aria-labelledby={headingId}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            id={headingId}
            eyebrow={eyebrow}
            title={title}
            description={description}
            titleClassName="max-w-[13ch]"
          />
        </div>
        <FaqList items={items} name={`${idPrefix}-faq`} defaultOpen={0} />
      </div>
    </Section>
  )
}

/* ---------------------------- case study grid ----------------------------- */

export type DentalStudyCard = {
  slug: string
  client: string
  location?: string
}

type DentalCaseStudyGridProps = {
  studies: DentalStudyCard[]
  className?: string
}

/** Real dental client homepages linking to their case studies. */
export function DentalCaseStudyGrid({ studies, className }: DentalCaseStudyGridProps) {
  return (
    <ul className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {studies.map((study) => (
        <li key={study.slug}>
          <Link
            href={`/case-studies/${study.slug}`}
            className="group/study block rounded-xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <BrowserFrame
              src={`/case-studies/${study.slug}-home-desktop.jpg`}
              alt={`${study.client} website built by Prism`}
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 92vw"
              className="transition-transform duration-300 group-hover/study:-translate-y-0.5"
            />
            <span className="mt-4 flex items-center justify-between gap-3">
              <span className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">{study.client}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 shrink-0 text-subtle transition-[color,transform] duration-200 group-hover/study:-translate-y-0.5 group-hover/study:translate-x-0.5 group-hover/study:text-foreground"
              />
            </span>
            {study.location ? (
              <span className="mt-1 block font-mono text-[11px] text-subtle">{study.location}</span>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  )
}
