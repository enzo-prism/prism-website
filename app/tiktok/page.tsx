import type { Metadata } from 'next'

import { WebPageSchema } from '@/components/schema-markup'
import SocialThanksPage from '@/components/social-thanks-page'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'Thanks for following Prism on TikTok'
const PAGE_DESCRIPTION =
  'Thanks for supporting Prism on TikTok. Go deeper with founder growth guides on YouTube, download Marble for iOS, or become a client.'
const CANONICAL_URL = 'https://www.design-prism.com/tiktok'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/tiktok',
  index: false,
  ogImage: '/prism-opengraph.png',
})

export default function TikTokPage() {
  return (
    <>
      <SocialThanksPage
        channel={{
          label: 'TikTok',
          handle: '@the_design_prism',
          href: 'https://www.tiktok.com/@the_design_prism',
        }}
      />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </>
  )
}
