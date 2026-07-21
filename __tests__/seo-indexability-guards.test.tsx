jest.mock('server-only', () => ({}), { virtual: true })
jest.mock('@/app/ai/prism-ai-client', () => ({
  __esModule: true,
  default: function MockPrismAiClient() {
    return null
  },
}))
jest.mock('@/app/ai-website-launch/client-page', () => ({
  __esModule: true,
  default: function MockAiWebsiteLaunchClientPage() {
    return null
  },
}))
jest.mock('@/app/models/client-page', () => ({
  __esModule: true,
  default: function MockModelsPageClient() {
    return null
  },
}))
jest.mock('@/app/offers/client-page', () => ({
  __esModule: true,
  default: function MockOffersClientPage() {
    return null
  },
}))
jest.mock('@/app/offers/ai-seo-boost/client-page', () => ({
  __esModule: true,
  default: function MockAiSeoBoostClientPage() {
    return null
  },
}))
jest.mock('@/app/offers/summer-website-makeover/client-page', () => ({
  __esModule: true,
  default: function MockSummerWebsiteMakeoverClientPage() {
    return null
  },
}))
jest.mock('@/app/pricing-dental/client-page', () => ({
  __esModule: true,
  default: function MockPricingDentalClientPage() {
    return null
  },
}))
jest.mock('@/components/social-link-hub', () => ({
  __esModule: true,
  default: function MockSocialLinkHub() {
    return null
  },
}))

import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import sitemap from '@/app/sitemap'
import { metadata as aiMetadata } from '@/app/ai/page'
import { metadata as aiAgentsMetadata } from '@/app/ai-agents/page'
import { metadata as aiWebsiteLaunchMetadata } from '@/app/ai-website-launch/page'
import { metadata as growthMetadata } from '@/app/growth/page'
import { metadata as hottestContentMetadata } from '@/app/hottest-content/page'
import { metadata as igMetadata } from '@/app/ig/page'
import { metadata as modelsMetadata } from '@/app/models/page'
import { metadata as offersMetadata } from '@/app/offers/page'
import { metadata as aiSeoBoostMetadata } from '@/app/offers/ai-seo-boost/page'
import { metadata as summerWebsiteMakeoverMetadata } from '@/app/offers/summer-website-makeover/page'
import { metadata as oneTimeFeeMetadata } from '@/app/one-time-fee/page'
import { metadata as pricingDentalMetadata } from '@/app/pricing-dental/page'
import { metadata as secretPearlPrivacyMetadata } from '@/app/secret-pearl/privacy/page'
import { WebsiteSchema } from '@/components/schema-markup'
import { metadata as tiktokMetadata } from '@/app/tiktok/page'
import { metadata as youtubeMetadata } from '@/app/youtube/page'
import {
  isBlogPostIndexable,
  isRouteIndexable,
} from '@/lib/seo/search-visibility'

const NOINDEX_ROBOTS = { index: false, follow: false }

describe('SEO indexability guards', () => {
  it('keeps community and utility routes out of the index', () => {
    const routeMetadata = [
      aiMetadata,
      aiAgentsMetadata,
      hottestContentMetadata,
      igMetadata,
      modelsMetadata,
      secretPearlPrivacyMetadata,
      tiktokMetadata,
      youtubeMetadata,
    ]

    routeMetadata.forEach((metadata) => {
      expect(metadata.robots).toEqual(NOINDEX_ROBOTS)
    })
  })

  it('keeps legacy redirected marketing routes out of the index', () => {
    const routeMetadata = [
      aiWebsiteLaunchMetadata,
      growthMetadata,
      offersMetadata,
      aiSeoBoostMetadata,
      summerWebsiteMakeoverMetadata,
      oneTimeFeeMetadata,
      pricingDentalMetadata,
    ]

    routeMetadata.forEach((metadata) => {
      expect(metadata.robots).toEqual(NOINDEX_ROBOTS)
    })
  })

  it('excludes non-canonical routes from the sitemap', async () => {
    const urls = (await sitemap()).map((entry) => entry.url)

    const excludedUrls = [
      'https://www.design-prism.com/ai',
      'https://www.design-prism.com/ai-agents',
      'https://www.design-prism.com/ai-website-launch',
      'https://www.design-prism.com/apps',
      'https://www.design-prism.com/careers',
      'https://www.design-prism.com/designs',
      'https://www.design-prism.com/growth',
      'https://www.design-prism.com/hottest-content',
      'https://www.design-prism.com/ig',
      'https://www.design-prism.com/library',
      'https://www.design-prism.com/models',
      'https://www.design-prism.com/offers',
      'https://www.design-prism.com/offers/ai-seo-boost',
      'https://www.design-prism.com/offers/summer-website-makeover',
      'https://www.design-prism.com/one-time-fee',
      'https://www.design-prism.com/openai',
      'https://www.design-prism.com/podcast',
      'https://www.design-prism.com/pricing-dental',
      'https://www.design-prism.com/refer',
      'https://www.design-prism.com/software',
      'https://www.design-prism.com/tiktok',
      'https://www.design-prism.com/youtube',
    ]

    for (const excludedUrl of excludedUrls) {
      expect(urls).not.toContain(excludedUrl)
    }
  })

  it('keeps the shared search policy growth-first with dental specialty routes', () => {
    expect(isRouteIndexable('/dental-website')).toBe(true)
    expect(isRouteIndexable('/dental-practice-seo-expert')).toBe(true)
    expect(isRouteIndexable('/ai-agents/dental')).toBe(true)
    expect(isRouteIndexable('/local-seo-agency')).toBe(true)
    expect(isRouteIndexable('/local-seo-services')).toBe(true)
    expect(isRouteIndexable('/ai')).toBe(false)
    expect(isRouteIndexable('/ai-agents')).toBe(false)
    expect(isRouteIndexable('/apps')).toBe(false)
    expect(isRouteIndexable('/secret-pearl/privacy')).toBe(false)
    expect(isRouteIndexable('/openai/site-rebuild')).toBe(false)
    expect(isRouteIndexable('/why-nonprofits-love-prism')).toBe(false)
  })

  it('curates blog posts for growth, dental, and local search intent', () => {
    expect(isBlogPostIndexable('dental-seo-guide')).toBe(true)
    expect(isBlogPostIndexable('ai-search-for-dental-practice')).toBe(true)
    expect(isBlogPostIndexable('openclaw-manus-codex-scaling-business')).toBe(
      false,
    )
    expect(isBlogPostIndexable('breaking-free-education-psyop')).toBe(false)
  })

  it('does not advertise a broken site search action in website schema', () => {
    const markup = renderToStaticMarkup(<WebsiteSchema />)

    expect(markup).not.toContain('SearchAction')
    expect(markup).not.toContain('potentialAction')
    expect(markup).not.toContain('search_term_string')
  })
})
