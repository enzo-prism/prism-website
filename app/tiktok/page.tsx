import type { Metadata } from 'next'

import { WebPageSchema } from '@/components/schema-markup'
import SocialLinkHub from '@/components/social-link-hub'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'Prism on TikTok'
const PAGE_DESCRIPTION =
  'The studio behind the videos. Premium website design that ranks on ChatGPT and Google, or refer a friend and earn $100.'
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
      <SocialLinkHub platform="tiktok" />
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
