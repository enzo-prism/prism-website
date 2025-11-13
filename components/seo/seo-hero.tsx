import Link from "next/link"

import { cn } from "@/lib/utils"

export type SeoHeroProps = {
  eyebrow: string
  title: string
  subtitle: string
  kicker?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  className?: string
}

export function SeoHero({ eyebrow, title, subtitle, kicker, primaryCta, secondaryCta, className }: SeoHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-neutral-800 bg-neutral-950 text-white",
        "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_rgba(0,0,0,0.9))] before:opacity-70 before:content-['']",
        className
      )}
    >
      <div className="relative">
        <div className="container mx-auto max-w-5xl px-4 py-20 text-center sm:py-24 md:px-6 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-semibold lowercase tracking-tight sm:text-5xl md:text-6xl">{title}</h1>
          <p className="mt-5 text-base text-white/80 sm:text-lg">{subtitle}</p>
          {kicker ? <p className="mt-4 text-sm uppercase tracking-[0.35em] text-white/60">{kicker}</p> : null}
          {(primaryCta || secondaryCta) && (
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold lowercase text-neutral-900 transition hover:bg-neutral-200"
                >
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold lowercase text-white transition hover:border-white hover:bg-white/10"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
