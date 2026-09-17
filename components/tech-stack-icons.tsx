import { Store, type LucideIcon } from 'lucide-react'

import BrandLogo, {
  type BrandLogoKey,
  type BrandLogoTheme,
} from '@/components/brand-logo'

/**
 * Shared tech-icon maps for the Ads launch rail and the Websites proof
 * ledger. Every entry resolves through the `BrandLogo` registry; entries
 * with no distinct brand mark pair the parent mark with a visible text
 * label, and `fallback` covers a missing or blocked logo file.
 */
export type TechStackIconSpec = {
  label: string
  brand: BrandLogoKey
  theme?: BrandLogoTheme
  fallback?: LucideIcon
}

// The five Ads STAGES rows: Google, Meta, and TikTok use their own marks;
// Yelp uses the vendored burst (Lucide Store if the file ever fails); the
// invite-only ChatGPT Ads row uses the parent OpenAI mark.
export const ADS_STAGE_ICONS: readonly TechStackIconSpec[] = [
  { label: 'Google', brand: 'google' },
  { label: 'Meta', brand: 'meta' },
  { label: 'TikTok', brand: 'tiktok', theme: 'dark' },
  { label: 'Yelp', brand: 'yelp', fallback: Store },
  { label: 'ChatGPT Ads', brand: 'openai', theme: 'dark' },
]

// The seven Websites search and answer surfaces. Google Search, AI
// Overviews, and ChatGPT have no standalone marks, so they pair the parent
// Google / OpenAI mark with the surface name as visible text.
export const WEBSITE_SURFACE_ICONS: readonly TechStackIconSpec[] = [
  { label: 'Google Search', brand: 'google' },
  { label: 'Google Maps', brand: 'googleMaps' },
  { label: 'AI Overviews', brand: 'google' },
  { label: 'ChatGPT', brand: 'openai', theme: 'dark' },
  { label: 'Gemini', brand: 'gemini' },
  { label: 'Claude', brand: 'claude' },
  { label: 'Perplexity', brand: 'perplexity' },
]

type TechStackIconProps = {
  spec: TechStackIconSpec
  className?: string
}

/**
 * One decorative tech mark. The visible row label always carries the
 * meaning, so the icon itself stays out of the accessibility tree.
 */
export function TechStackIcon({ spec, className }: TechStackIconProps) {
  const FallbackIcon = spec.fallback
  const iconClassName = className ?? 'h-4 w-4'

  return (
    <BrandLogo
      brand={spec.brand}
      theme={spec.theme}
      decorative
      className={iconClassName}
      fallback={
        FallbackIcon ? (
          <FallbackIcon aria-hidden="true" className={iconClassName} />
        ) : undefined
      }
    />
  )
}

export default TechStackIcon
