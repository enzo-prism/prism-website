import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export type SeoSectionProps = {
  eyebrow?: string
  title: string
  description?: string
  kicker?: string
  children?: ReactNode
  className?: string
}

export function SeoSection({ eyebrow, title, description, kicker, children, className }: SeoSectionProps) {
  return (
    <section className={cn("border-b border-neutral-100 py-16 sm:py-20", className)}>
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">{eyebrow}</p>
        ) : null}
        <h2 className="mt-4 text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">{title}</h2>
        {description ? <p className="mt-4 text-base text-neutral-600">{description}</p> : null}
        {children ? <div className="mt-8 space-y-6 text-neutral-700">{children}</div> : null}
        {kicker ? <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">{kicker}</p> : null}
      </div>
    </section>
  )
}
