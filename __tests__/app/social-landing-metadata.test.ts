import { render } from '@testing-library/react'

import InstagramPage, { metadata as instagramMetadata } from '@/app/ig/page'
import TikTokPage, { metadata as tiktokMetadata } from '@/app/tiktok/page'
import YouTubePage, { metadata as youtubeMetadata } from '@/app/youtube/page'
import { DESCRIPTION_MAX_LENGTH } from '@/lib/seo/rules'

const SOCIAL_METADATA = [
  ['Instagram', instagramMetadata, InstagramPage],
  ['TikTok', tiktokMetadata, TikTokPage],
  ['YouTube', youtubeMetadata, YouTubePage],
] as const

describe('social landing metadata', () => {
  it.each(SOCIAL_METADATA)(
    '%s promotes only Website and Prism Infinity in metadata and schema',
    (_platform, metadata, Page) => {
      const description = String(metadata.description)
      const openGraphDescription = String(metadata.openGraph?.description)
      const twitterDescription = String(metadata.twitter?.description)

      const { container } = render(Page())
      const schema = Array.from(
        container.querySelectorAll<HTMLScriptElement>(
          'script[type="application/ld+json"]',
        ),
      )
        .map((script) => script.textContent ?? '')
        .join(' ')

      for (const surface of [
        description,
        openGraphDescription,
        twitterDescription,
        schema,
      ]) {
        expect(surface).toMatch(/website design/i)
        expect(surface).toMatch(/prism infinity/i)
        expect(surface).not.toMatch(/refer|referral|\$100/i)
      }

      expect(openGraphDescription).toBe(description)
      expect(twitterDescription).toBe(description)
      expect(description.length).toBeLessThanOrEqual(DESCRIPTION_MAX_LENGTH)
    },
  )
})
