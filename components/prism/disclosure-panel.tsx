import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

type DisclosurePanelProps = {
  id?: string
  /** Optional small mono eyebrow shown beside or above the trigger label. */
  eyebrow?: string
  /** Optional primary heading for richer disclosures; falls back to summary. */
  title?: string
  /** Visible trigger label (or secondary caption when `title` is provided). */
  summary: string
  /** Optional short count or hint pill on the right (e.g. "5 areas", "7 rows"). */
  meta?: string
  /** Optional action cue shown when closed (e.g. "Read details"). */
  openLabel?: string
  /** Optional action cue shown when open (e.g. "Hide details"). */
  closeLabel?: string
  /** Start expanded when needed; defaults to collapsed for a visual-first surface. */
  defaultOpen?: boolean
  children: ReactNode
  className?: string
  contentClassName?: string
}

/**
 * Progressive-disclosure drawer built on native <details>/<summary>.
 * Zero client JS. Content stays in the server-rendered HTML for search engines
 * and AI crawlers while keeping the human visual canvas clean and uncluttered.
 */
export function DisclosurePanel({
  id,
  eyebrow,
  title,
  summary,
  meta,
  openLabel,
  closeLabel,
  defaultOpen = false,
  children,
  className,
  contentClassName,
}: DisclosurePanelProps) {
  const pillMeta = meta
  return (
    <details
      id={id}
      open={defaultOpen || undefined}
      className={cn(
        'group/disclosure overflow-hidden rounded-2xl border border-white/[0.08] bg-card/60 transition-colors hover:border-white/[0.14]',
        className,
      )}
    >
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.025] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 sm:px-7 [&::-webkit-details-marker]:hidden">
        {title ? (
          <span className="flex min-w-0 flex-col gap-1">
            {eyebrow ? (
              <span className="text-eyebrow text-subtle">{eyebrow}</span>
            ) : null}
            <span className="text-[16px] font-semibold tracking-[-0.015em] text-foreground">
              {title}
            </span>
            <span className="text-[13px] text-muted-foreground">
              {summary}
            </span>
          </span>
        ) : (
          <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
            {eyebrow ? (
              <span className="text-eyebrow text-subtle">{eyebrow}</span>
            ) : null}
            <span className="text-[15px] font-medium tracking-[-0.01em] text-foreground">
              {summary}
            </span>
          </span>
        )}
        <span className="flex shrink-0 items-center gap-3">
          {pillMeta ? (
            <span className="hidden rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-subtle sm:inline-flex">
              {pillMeta}
            </span>
          ) : null}
          {openLabel ? (
            <span className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-muted-foreground sm:inline-flex">
              <span className="group-open/disclosure:hidden">{openLabel}</span>
              <span className="hidden group-open/disclosure:inline">
                {closeLabel ?? 'Close'}
              </span>
            </span>
          ) : null}
          <ChevronDown
            aria-hidden="true"
            className="size-4 shrink-0 text-subtle transition-transform duration-200 group-open/disclosure:rotate-180"
          />
        </span>
      </summary>
      <div
        className={cn(
          'border-t border-white/[0.07] px-5 py-6 sm:px-7 sm:py-8',
          contentClassName,
        )}
      >
        {children}
      </div>
    </details>
  )
}

export default DisclosurePanel
