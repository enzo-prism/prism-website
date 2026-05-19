import type { ImgHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type BrandLogoSources =
  | string
  | {
      light?: string
      dark?: string
    }

type BrandLogoEntry = {
  label: string
  mark: BrandLogoSources
  wordmark?: BrandLogoSources
}

export const BRAND_LOGOS = {
  anthropic: {
    label: 'Anthropic',
    mark: {
      light: '/logos/svgl/anthropic-light.svg',
      dark: '/logos/svgl/anthropic-dark.svg',
    },
  },
  apple: {
    label: 'Apple',
    mark: {
      light: '/logos/svgl/apple-light.svg',
      dark: '/logos/svgl/apple-dark.svg',
    },
  },
  bing: {
    label: 'Bing',
    mark: '/logos/svgl/bing.svg',
  },
  claude: {
    label: 'Claude AI',
    mark: '/logos/svgl/claude-ai.svg',
  },
  cursor: {
    label: 'Cursor',
    mark: {
      light: '/logos/svgl/cursor-light.svg',
      dark: '/logos/svgl/cursor-dark.svg',
    },
  },
  facebook: {
    label: 'Facebook',
    mark: '/logos/svgl/facebook.svg',
  },
  figma: {
    label: 'Figma',
    mark: '/logos/svgl/figma.svg',
  },
  gemini: {
    label: 'Gemini',
    mark: '/logos/svgl/gemini.svg',
  },
  git: {
    label: 'Git',
    mark: '/logos/svgl/git.svg',
  },
  google: {
    label: 'Google',
    mark: '/logos/svgl/google.svg',
    wordmark: '/logos/svgl/google-wordmark.svg',
  },
  googleAnalytics: {
    label: 'Google Analytics',
    mark: '/logos/svgl/google-analytics.svg',
  },
  googleDrive: {
    label: 'Google Drive',
    mark: '/logos/svgl/google-drive.svg',
  },
  googleMaps: {
    label: 'Google Maps',
    mark: '/logos/svgl/google-maps.svg',
  },
  grok: {
    label: 'Grok',
    mark: {
      light: '/logos/svgl/grok-light.svg',
      dark: '/logos/svgl/grok-dark.svg',
    },
  },
  gmail: {
    label: 'Gmail',
    mark: '/logos/svgl/gmail.svg',
  },
  instagram: {
    label: 'Instagram',
    mark: '/logos/svgl/instagram.svg',
  },
  linkedin: {
    label: 'LinkedIn',
    mark: '/logos/svgl/linkedin.svg',
  },
  meta: {
    label: 'Meta',
    mark: '/logos/svgl/meta.svg',
  },
  openai: {
    label: 'OpenAI',
    mark: {
      light: '/logos/svgl/openai-light.svg',
      dark: '/logos/svgl/openai-dark.svg',
    },
    wordmark: {
      light: '/logos/svgl/openai-wordmark-light.svg',
      dark: '/logos/svgl/openai-wordmark-dark.svg',
    },
  },
  perplexity: {
    label: 'Perplexity AI',
    mark: '/logos/svgl/perplexity-ai.svg',
  },
  replit: {
    label: 'Replit',
    mark: '/logos/svgl/replit.svg',
    wordmark: {
      light: '/logos/svgl/replit-wordmark-light.svg',
      dark: '/logos/svgl/replit-wordmark-dark.svg',
    },
  },
  tiktok: {
    label: 'TikTok',
    mark: {
      light: '/logos/svgl/tiktok-light.svg',
      dark: '/logos/svgl/tiktok-dark.svg',
    },
  },
  vercel: {
    label: 'Vercel',
    mark: {
      light: '/logos/svgl/vercel-light.svg',
      dark: '/logos/svgl/vercel-dark.svg',
    },
  },
  webflow: {
    label: 'Webflow',
    mark: '/logos/svgl/webflow.svg',
  },
  youtube: {
    label: 'YouTube',
    mark: '/logos/svgl/youtube.svg',
  },
} as const satisfies Record<string, BrandLogoEntry>

export type BrandLogoKey = keyof typeof BRAND_LOGOS
export type BrandLogoVariant = 'mark' | 'wordmark'
export type BrandLogoTheme = 'light' | 'dark'

export type BrandLogoReference = {
  brand: BrandLogoKey
  variant?: BrandLogoVariant
  theme?: BrandLogoTheme
}

type BrandLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> &
  BrandLogoReference & {
    decorative?: boolean
    fallback?: ReactNode
    label?: string
  }

const resolveSource = (
  sources: BrandLogoSources | undefined,
  theme: BrandLogoTheme,
) => {
  if (!sources) return undefined
  if (typeof sources === 'string') return sources

  return sources[theme] ?? sources.light ?? sources.dark
}

export function getBrandLogoSource({
  brand,
  variant = 'mark',
  theme = 'light',
}: BrandLogoReference) {
  const logo: BrandLogoEntry = BRAND_LOGOS[brand]
  const requestedSource =
    variant === 'wordmark'
      ? resolveSource(logo.wordmark, theme)
      : resolveSource(logo.mark, theme)

  return requestedSource ?? resolveSource(logo.mark, theme)
}

export function getBrandLogoSrc(
  brand: BrandLogoKey,
  variant: BrandLogoVariant = 'mark',
  theme: BrandLogoTheme = 'light',
) {
  return getBrandLogoSource({ brand, variant, theme })
}

export function BrandLogo({
  brand,
  variant = 'mark',
  theme = 'light',
  decorative = false,
  fallback = null,
  label,
  className,
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  ...props
}: BrandLogoProps) {
  const logo = BRAND_LOGOS[brand]
  const src = getBrandLogoSource({ brand, variant, theme })

  if (!src) return fallback

  const alt = decorative ? '' : (label ?? logo.label)

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      width={width ?? (variant === 'wordmark' ? 104 : 24)}
      height={height ?? 24}
      loading={loading}
      decoding={decoding}
      aria-hidden={decorative ? true : props['aria-hidden']}
      className={cn('shrink-0 object-contain', className)}
    />
  )
}

export default BrandLogo
