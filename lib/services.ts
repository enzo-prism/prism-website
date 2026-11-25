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
    navDescription: 'Custom sites built to convert.',
    homeTitle: 'Custom design that makes choosing you easy.',
    homeCta: 'Explore website design',
    description:
      'Custom design, mobile engineering, search foundations, and tracking ready on day one.',
    primaryCta: WEBSITE_WAITLIST_CTA,
  },
  {
    id: 'content',
    label: 'content',
    name: 'Content',
    href: '/content',
    navDescription: 'Video, photo, and editorial done for you.',
    homeTitle: 'Give people a reason to choose you.',
    homeCta: 'Explore content',
    description:
      'Video, photo, and editorial planned, produced, and published end to end.',
    primaryCta: CONTENT_WAITLIST_CTA,
  },
  {
    id: 'ads',
    label: 'ads',
    name: 'Ads',
    href: '/ads',
    navDescription: 'Paid campaigns built for leads.',
    homeTitle: 'Ads built around better leads.',
    homeCta: 'Explore ads',
    description:
      'Google, Meta, TikTok, and Yelp ads paired with focused landing pages and tracking.',
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
      'Visibility across ChatGPT, Google AI Overviews, Gemini, Claude, and Perplexity.',
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
