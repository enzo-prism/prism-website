import type { Metadata } from 'next'

import { WebPageSchema } from '@/components/schema-markup'
import SocialLinkHub from '@/components/social-link-hub'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'Prism on YouTube'
const PAGE_DESCRIPTION =
  'The studio behind the channel. Get a PRO website, or refer a friend and earn $100 when they become a client.'
const CANONICAL_URL = 'https://www.design-prism.com/youtube'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/youtube',
  index: false,
  ogImage: '/prism-opengraph.png',
})

export default function YouTubePage() {
  return (
    <>
      <SocialLinkHub platform="youtube" />
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
