import type { ReactNode } from "react"

import { Reveal } from "@/components/prism/reveal"
import { Section, SectionHeader } from "@/components/prism/section"
import { cn } from "@/lib/utils"

export type SeoSectionProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  kicker?: string
  children?: ReactNode
  className?: string
  id?: string
  /**
   * "split" (default): sticky header on the left, content on the right.
   * "stack": header above full-width content (grids, galleries).
   */
  layout?: "split" | "stack"
  align?: "left" | "center"
}

/**
 * Section shell for the /seo family on the dark system. Titles render as
 * lowercase `text-title` headings; content gets the full container width in
 * "stack" mode or a reading column beside a sticky header in "split" mode.
 */
export function SeoSection({
  eyebrow,
  title,
  description,
  kicker,
  children,
  className,
  id,
  layout = "split",
  align = "left",
}: SeoSectionProps) {
  const headingId = id ? `${id}-title` : undefined

  if (layout === "stack") {
    return (
      <Section id={id} className={className} aria-labelledby={headingId}>
        <Reveal>
          <SectionHeader
            id={headingId}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align={align}
          />
        </Reveal>
        {children ? <div className="mt-12 sm:mt-14">{children}</div> : null}
        {kicker ? <p className="mt-8 text-eyebrow text-subtle">{kicker}</p> : null}
      </Section>
    )
  }

  return (
    <Section id={id} className={className} aria-labelledby={headingId}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            id={headingId}
            eyebrow={eyebrow}
            title={title}
            description={description}
            titleClassName="max-w-[14ch] text-[clamp(2rem,1.45rem+2.2vw,3.25rem)] font-semibold leading-[1] tracking-[-0.045em]"
            descriptionClassName="text-base leading-7 sm:text-[1.0625rem] sm:leading-8"
          />
        </Reveal>
        <Reveal delay={80} className={cn("min-w-0 space-y-6", !children && "hidden lg:block")}>
          {children}
          {kicker ? <p className="text-eyebrow text-subtle">{kicker}</p> : null}
        </Reveal>
      </div>
    </Section>
  )
}
