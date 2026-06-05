import type { Metadata } from 'next'
import { WebPageSchema } from '@/components/schema-markup'
import SocialThanksPage from '@/components/social-thanks-page'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'Thanks for supporting Prism on Instagram'
const PAGE_DESCRIPTION =
  'Thanks for supporting Prism on Instagram. Go deeper with Prism guides ' +
  'for founders on YouTube, download Marble for iOS, or become a client.'
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
      <SocialThanksPage
        channel={{
          label: 'Instagram',
          handle: '@the_design_prism',
          href: 'https://www.instagram.com/the_design_prism/',
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
