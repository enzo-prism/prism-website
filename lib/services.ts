import { BOOK_A_CALL_CTA, WEBSITE_START_CTA } from '@/lib/pricing-model'

export type PrismServiceId = 'website' | 'content' | 'ads'

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
 * Public service framing: Prism helps with three things.
 * Packaged offers (Dental OS, Infinity) stay on /pricing, not in the header.
 */
export const PRISM_SERVICES: readonly PrismService[] = [
  {
    id: 'website',
    label: 'website',
    name: 'Website',
    href: '/websites',
    navDescription: 'A site that makes choosing you easy.',
    homeTitle: 'A site that makes choosing you easy.',
    homeCta: 'Explore websites',
    description:
      'An ultra-premium PRO website: a bespoke design system, software-grade engineering, analytics from day one, and foundations for Google and AI discovery.',
    primaryCta: WEBSITE_START_CTA,
  },
  {
    id: 'content',
    label: 'content',
    name: 'Content',
    href: '/content',
    navDescription: 'Content that gets found and shared.',
    homeTitle: 'Content that gets found and shared.',
    homeCta: 'Explore content',
    description:
      'A system that plans, produces, and publishes content across your website and every social platform. Implemented over 3 months, then optimized every month.',
    primaryCta: BOOK_A_CALL_CTA,
  },
  {
    id: 'ads',
    label: 'ads',
    name: 'Ads',
    href: '/ads',
    navDescription: 'Paid demand without wasted spend.',
    homeTitle: 'Paid demand without wasted spend.',
    homeCta: 'Explore ads',
    description:
      'Google, Meta, TikTok, and Yelp ads built to drive qualified calls, form fills, and booked appointments, with tracking that shows what actually worked.',
    primaryCta: BOOK_A_CALL_CTA,
  },
] as const

export const SERVICE_HREFS = PRISM_SERVICES.map((service) => service.href)

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
