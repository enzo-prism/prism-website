import React from "react"

interface MobileHeroCardProps {
  title: string
  description: string
  category: string
  date: string
  readTime?: string
  author?: string
  gradientClass?: string
  imageUrl?: string
}

export function MobileHeroCard({
  title,
  description,
  category,
  date,
  readTime = "8 min read",
  author = "Prism Team",
}: MobileHeroCardProps) {
  return (
    <div className="my-10 rounded-2xl border border-white/[0.08] bg-card p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] sm:p-7">
      <p className="text-eyebrow mb-3! mt-0! text-subtle">{category}</p>

      <p className="mb-3! mt-0! text-balance text-xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
        {title}
      </p>

      <p className="mb-4! mt-0! text-[15px] leading-7 text-muted-foreground">{description}</p>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-subtle">
        <span>{new Date(date).toLocaleDateString()}</span>
        <span aria-hidden="true">·</span>
        <span>{readTime}</span>
        <span aria-hidden="true">·</span>
        <span>{author}</span>
      </div>
    </div>
  )
}
