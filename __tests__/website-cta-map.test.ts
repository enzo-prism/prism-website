import fs from 'node:fs'
import path from 'node:path'

import { PRISM_SERVICES } from '@/lib/services'
import {
  WAITLIST_CTA,
  WAITLIST_FOCUS_HREFS,
  getWaitlistHref,
  parseWaitlistFocus,
} from '@/lib/waitlist'

const read = (relativePath: string) =>
  fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

describe('waitlist CTA map', () => {
  it('keeps one canonical waitlist CTA with service focus variants', () => {
    expect(WAITLIST_CTA).toEqual({
      label: 'Join the waitlist',
      href: '/waitlist',
    })
    expect(WAITLIST_FOCUS_HREFS).toEqual({
      website: '/waitlist?focus=website',
      content: '/waitlist?focus=content',
      ads: '/waitlist?focus=ads',
    })
    expect(getWaitlistHref()).toBe('/waitlist')
    expect(getWaitlistHref('ads')).toBe('/waitlist?focus=ads')
  })

  it('parses focus query values defensively', () => {
    expect(parseWaitlistFocus(undefined)).toEqual([])
    expect(parseWaitlistFocus('website')).toEqual(['website'])
    expect(parseWaitlistFocus('Website,ads,ads')).toEqual(['website', 'ads'])
    expect(parseWaitlistFocus(['content', 'bogus'])).toEqual(['content'])
    expect(parseWaitlistFocus('<script>')).toEqual([])
  })

  it('routes every public service primary CTA to the waitlist with its focus', () => {
    for (const service of PRISM_SERVICES) {
      expect(service.primaryCta.label).toBe(WAITLIST_CTA.label)
      expect(service.primaryCta.href).toBe(WAITLIST_FOCUS_HREFS[service.id])
    }
  })

  it('never leaves a public booking or intake CTA on the core sales surfaces', () => {
    const surfaces = [
      'components/footer.tsx',
      'components/home/HomeOffersSection.tsx',
      'components/home/HomeHeroSection.tsx',
      'components/home/HomeFinalCtaSection.tsx',
      'components/pricing/PricingHero.tsx',
      'components/social-link-hub.tsx',
      'app/pricing/client-page.tsx',
      'app/websites/page.tsx',
      'app/content/page.tsx',
      'app/ads/page.tsx',
      'app/dental-os/page.tsx',
      'app/prism-infinity/page.tsx',
      'app/dental-website/page.tsx',
      'lib/services.ts',
      'lib/pricing-model.ts',
    ]

    for (const relativePath of surfaces) {
      const source = read(relativePath)
      expect(source).not.toMatch(/BOOK_A_CALL_CTA|WEBSITE_START_CTA|BOOKING_URL/)
      expect(source).not.toMatch(/\/(website|content|ads)-intake/)
      expect(source).not.toMatch(/["'`]\/(get-started|apply|free-analysis|contact)["'`]/)
      expect(source).toMatch(/waitlist/i)
    }
  })
})
