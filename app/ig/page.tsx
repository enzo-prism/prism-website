import type { Metadata } from 'next'

import { WebPageSchema } from '@/components/schema-markup'
import SocialLinkHub from '@/components/social-link-hub'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'Prism on Instagram'
const PAGE_DESCRIPTION =
  'The studio behind the feed. Order a $300 flat website, see 22 verified case studies, or explore Content OS and Prism Infinity.'
const CANONICAL_URL = 'https://www.design-prism.com/ig'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/ig',
  index: false,
  ogImage: '/prism-opengraph.png',
})

export default function IGPage() {
  return (
    <>
      <SocialLinkHub platform="instagram" />
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
