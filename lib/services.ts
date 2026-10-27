import {
  ADS_WAITLIST_CTA,
  AEO_WAITLIST_CTA,
  CONTENT_WAITLIST_CTA,
  WEBSITE_WAITLIST_CTA,
} from '@/lib/pricing-model'

export type PrismServiceId = 'website' | 'content' | 'ads' | 'aeo'

export type PrismService = {
  id: PrismServiceId
  label: string
  name: string
  href: string
  description: string
  navDescription: string
  homeTitle: string
  homeCta: string
  primaryCta: {
    label: string
    href: string
  }
}

/**
 * Public service framing: Prism offers four services: Website Design, Content,
 * Ads (2026-10-12), and AEO, answer engine optimization (2026-10-18). The
 * website service was reframed from "Websites" to "Website Design" on
 * 2026-10-19 (canonical page /website-design; /websites 308s there). The same
 * four are the packaged offers on /pricing (lib/pricing-model.ts) and the
 * header Services menu (NAV_SERVICE_ITEMS in lib/constants.ts).
 * Every primary CTA is the waitlist (Prism is at capacity); the focus param
 * pre-selects the service on /waitlist.
 */
export const PRISM_SERVICES: readonly PrismService[] = [
  {
    id: 'website',
    label: 'website design',
    name: 'Website Design',
    href: '/website-design',
    navDescription: 'Custom design that makes choosing you easy.',
    homeTitle: 'Custom design that makes choosing you easy.',
    homeCta: 'Explore website design',
    description:
      'Custom website design for your brand, written around what customers ask and built to load fast on every phone. We design it, build it, and launch it with search foundations and analytics in place.',
    primaryCta: WEBSITE_WAITLIST_CTA,
  },
  {
    id: 'content',
    label: 'content',
    name: 'Content',
    href: '/content',
    navDescription: 'Give people a reason to choose you.',
    homeTitle: 'Give people a reason to choose you.',
    homeCta: 'Explore content',
    description:
      'Useful stories, photos, and videos for your website and social channels. We handle planning, production, and publishing so you can show up consistently.',
    primaryCta: CONTENT_WAITLIST_CTA,
  },
  {
    id: 'ads',
    label: 'ads',
    name: 'Ads',
    href: '/ads',
    navDescription: 'Ads built around better leads.',
    homeTitle: 'Ads built around better leads.',
    homeCta: 'Explore ads',
    description:
      'Reach potential customers on the channels that fit your audience. We build campaigns and track available call, inquiry, and booking data to guide the next improvement.',
    primaryCta: ADS_WAITLIST_CTA,
  },
  {
    id: 'aeo',
    label: 'AEO',
    name: 'AEO',
    href: '/aeo',
    navDescription: 'Be the answer when they ask AI.',
    homeTitle: 'Be the answer when they ask AI.',
    homeCta: 'Explore AEO',
    description:
      'Make your business easy for ChatGPT, Google AI Overviews, Gemini, Claude, and Perplexity to find, understand, and cite. We fix what AI search reads about you and track the questions where you show up.',
    primaryCta: AEO_WAITLIST_CTA,
  },
] as const

export const SERVICE_HREFS = PRISM_SERVICES.map((service) => service.href)

/**
 * Card title from a sentence-case service line: "Be the answer when they ask
 * AI." becomes "be the answer when they ask AI". Only the first letter is
 * lowered, so proper nouns and acronyms (AI, Google) keep their capitals.
 */
export function toServiceCardTitle(value: string): string {
  const trimmed = value.replace(/\.$/, '')
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1)
}

export function getService(id: PrismServiceId): PrismService {
  const service = PRISM_SERVICES.find((item) => item.id === id)
  if (!service) {
    throw new Error(`Unknown Prism service: ${id}`)
  }
  return service
}

export function isServicePath(pathname: string | null): boolean {
  if (!pathname) return false
  return SERVICE_HREFS.some(
    (href) => pathname === href || pathname.startsWith(`${href}/`),
  )
}
