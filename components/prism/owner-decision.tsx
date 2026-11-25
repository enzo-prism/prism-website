import { ArrowUpRight } from 'lucide-react'

import { Eyebrow, Section } from '@/components/prism/section'
import TrackedLink from '@/components/tracked-link'

type OwnerDecisionProps = {
  eyebrow: string
  title: string
  body: string
  links: readonly { label: string; href: string }[]
}

export function OwnerDecision({
  eyebrow,
  title,
  body,
  links,
}: OwnerDecisionProps) {
  return (
    <Section className="py-10 sm:py-14" aria-label={eyebrow}>
      <div className="grid gap-6 border-y border-border py-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-heading mt-4 text-balance">{title}</h2>
        </div>
        <div>
          <p className="leading-relaxed text-muted-foreground">{body}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            {links.map((link) => (
              <TrackedLink
                key={link.href}
                href={link.href}
                label={link.label}
                location={eyebrow}
                className="inline-flex min-h-11 items-center gap-1.5 font-medium underline decoration-border underline-offset-4 hover:decoration-current"
              >
                {link.label}
                <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
              </TrackedLink>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
