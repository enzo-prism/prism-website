import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { Eyebrow, Section } from '@/components/prism/section'
import TrackedLink from '@/components/tracked-link'

type OwnerDecisionProps = {
  eyebrow: string
  title: string
  /** Optional concise 1-line caption (keep short; visuals carry the page). */
  body?: string
  /** Optional visual slot rendered alongside the decision bar. */
  visual?: ReactNode
  links: readonly { label: string; href: string }[]
}

export function OwnerDecision({
  eyebrow,
  title,
  body,
  visual,
  links,
}: OwnerDecisionProps) {
  return (
    <Section className="py-8 sm:py-10" aria-label={eyebrow}>
      <div className="rounded-2xl border border-white/[0.08] bg-card/60 px-6 py-7 sm:px-8 sm:py-8">
        <div
          className={
            visual
              ? 'grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-12'
              : 'flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10'
          }
        >
          <div className="min-w-0">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="text-heading mt-3 text-balance text-foreground">
              {title}
            </h2>
            {body ? (
              <p className="mt-2 max-w-[52ch] text-pretty text-[15px] leading-6 text-muted-foreground">
                {body}
              </p>
            ) : null}
            {visual ? (
              <div className="mt-5 flex flex-wrap gap-2.5">
                {links.map((link) => (
                  <TrackedLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    location={eyebrow}
                    className="group/link inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-4 text-sm font-medium text-foreground transition-colors hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    {link.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 shrink-0 text-subtle transition-[color,transform] duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-foreground"
                    />
                  </TrackedLink>
                ))}
              </div>
            ) : null}
          </div>

          {visual ? (
            <div className="min-w-0">{visual}</div>
          ) : (
            <div className="flex shrink-0 flex-wrap gap-2.5">
              {links.map((link) => (
                <TrackedLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  location={eyebrow}
                  className="group/link inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-4 text-sm font-medium text-foreground transition-colors hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  {link.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-subtle transition-[color,transform] duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-foreground"
                  />
                </TrackedLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
