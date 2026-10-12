import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { cn } from '@/lib/utils'

export type ServiceBentoItem = {
  title: string
  body: string
  icon: LucideIcon
  /** Grid span classes on the 6-column desktop grid, e.g. "md:col-span-4". */
  className?: string
  /** Decorative illustration under the copy (aria-hidden). */
  visual?: ReactNode
  /** Short bullet points under the body. */
  points?: readonly string[]
  /** Adds the rationed spectrum beam (one card per section). */
  beam?: boolean
}

type ServiceBentoProps = {
  idPrefix: string
  eyebrow?: string
  title: string
  description?: string
  items: readonly ServiceBentoItem[]
  id?: string
}

/** "What you get" as a bento grid of SpotlightCards on a 6-column grid. */
export function ServiceBento({
  idPrefix,
  eyebrow = 'What you get',
  title,
  description,
  items,
  id,
}: ServiceBentoProps) {
  const headingId = `${idPrefix}-bento-title`

  return (
    <Section id={id} aria-labelledby={headingId} className="scroll-mt-20">
      <Reveal>
        <SectionHeader
          id={headingId}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-6">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <Reveal
              key={item.title}
              delay={(index % 3) * 70}
              className={cn('flex min-w-0 md:col-span-2', item.className)}
            >
              <SpotlightCard beam={item.beam} className="flex w-full flex-col">
                <div className="relative z-10 flex flex-col gap-3 p-6 sm:p-7">
                  <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground">
                    <Icon
                      aria-hidden="true"
                      className="size-[18px]"
                      strokeWidth={1.7}
                    />
                  </span>
                  <h3 className="text-heading mt-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="max-w-[46ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                    {item.body}
                  </p>
                  {item.points?.length ? (
                    <ul className="mt-2 flex flex-col gap-2">
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[9px] size-1 shrink-0 rounded-full bg-foreground/50"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                {item.visual ? (
                  <div aria-hidden="true" className="relative mt-auto">
                    {item.visual}
                  </div>
                ) : null}
              </SpotlightCard>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

export default ServiceBento
