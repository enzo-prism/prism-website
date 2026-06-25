import fs from 'node:fs'
import path from 'node:path'

import {
  isBlogPostIndexable,
  isRouteIndexable,
} from '@/lib/seo/search-visibility'

const extractDesignPrismUrls = (content: string) =>
  Array.from(content.matchAll(/https:\/\/www\.design-prism\.com\/?[^\s)]*/g))
    .map((match) => match[0].replace(/[.,;:]+$/, ''))
    .filter(Boolean)

describe('llms.txt', () => {
  it('references canonical on-site URLs and avoids noindex or off-site detours', () => {
    const llms = fs.readFileSync(
      path.join(process.cwd(), 'public/llms.txt'),
      'utf8',
    )
    const urls = extractDesignPrismUrls(llms)

    expect(urls).toEqual(
      expect.arrayContaining([
        'https://www.design-prism.com/pricing',
        'https://www.design-prism.com/free-analysis',
        'https://www.design-prism.com/contact',
        'https://www.design-prism.com/websites',
        'https://www.design-prism.com/seo',
        'https://www.design-prism.com/seo/audit',
        'https://www.design-prism.com/local-seo-agency',
        'https://www.design-prism.com/local-seo-services',
        'https://www.design-prism.com/local-listings',
        'https://www.design-prism.com/ads',
        'https://www.design-prism.com/dental-website',
        'https://www.design-prism.com/ai-agents/dental',
        'https://www.design-prism.com/case-studies/roseville-dental-academy',
        'https://www.design-prism.com/case-studies/saorsa-growth-partners',
        'https://www.design-prism.com/case-studies/belize-kids-foundation',
        'https://www.design-prism.com/blog/dental-seo-guide',
      ]),
    )

    expect(new Set(urls).size).toBe(urls.length)

    for (const url of urls) {
      const { pathname } = new URL(url)
      if (pathname.startsWith('/blog/')) {
        expect(isBlogPostIndexable(pathname.replace('/blog/', ''))).toBe(true)
      } else {
        expect(isRouteIndexable(url)).toBe(true)
      }
    }

    expect(llms).not.toContain('https://www.design-prism.com/hottest-content')
    expect(llms).not.toContain('https://www.design-prism.com/offers')
    expect(llms).not.toContain('https://www.design-prism.com/growth')
    expect(llms).not.toContain('https://www.design-prism.com/apps')
    expect(llms).not.toContain('https://www.design-prism.com/podcast')
    expect(llms).not.toContain('https://www.design-prism.com/openai')
    expect(llms).not.toContain('podcasts.apple.com')
  })
})
