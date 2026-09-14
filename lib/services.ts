import {
  ADS_WAITLIST_CTA,
  CONTENT_WAITLIST_CTA,
  WEBSITE_WAITLIST_CTA,
} from '@/lib/pricing-model'

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
 * Every primary CTA is the waitlist (Prism is at capacity); the focus param
 * pre-selects the service on /waitlist.
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
      'A fast, custom website that explains your value and makes it easy to call or book. Search foundations and analytics help you understand how people find and use it.',
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
