import type { ReactNode } from "react"

import { LandingHero, type LandingHeroGlow } from "@/components/landing/landing-hero"
import { WAITLIST_CTA } from "@/lib/waitlist"

export type SeoHeroProps = {
  eyebrow: string
  /** Lowercase display headline (the page's only h1). */
  title: ReactNode
  subtitle: ReactNode
  /** Analytics location for both hero actions, e.g. "seo hero". */
  location: string
  secondaryCta?: { label: string; href: string }
  glow?: LandingHeroGlow
  /** Visual rendered under the CTAs. */
  children?: ReactNode
  className?: string
  titleClassName?: string
}

/**
 * Hero for the /seo family. The primary action is always the waitlist;
 * the optional secondary action points deeper into the SEO pages.
 */
export function SeoHero({
  eyebrow,
  title,
  subtitle,
  location,
  secondaryCta,
  glow = "blue",
  children,
  className,
  titleClassName,
}: SeoHeroProps) {
  return (
    <LandingHero
      eyebrow={eyebrow}
      title={title}
      description={subtitle}
      location={location}
      ctaHref={WAITLIST_CTA.href}
      secondary={secondaryCta}
      glow={glow}
      className={className}
      titleClassName={titleClassName}
    >
      {children}
    </LandingHero>
  )
}
