import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { buildAbsoluteTitle } from '@/lib/seo/rules'

describe('priority article search titles', () => {
  it.each([
    [
      'google-ads-destination-not-working',
      'Google Ads: destination not working | Prism',
    ],
    [
      'prism-approach-small-business-growth',
      "Small business growth: Prism's approach | Prism",
    ],
    [
      'generate-thousands-leads-without-more-ads',
      'More leads without more ad spend | Prism',
    ],
  ])('preserves the complete intent of %s', (slug, expected) => {
    const { data } = matter(
      fs.readFileSync(
        path.join(process.cwd(), 'content/blog', `${slug}.mdx`),
        'utf8',
      ),
    )
    expect(buildAbsoluteTitle(data.seoTitle)).toBe(expected)
  })
})
