import type { Metadata } from 'next'
import { WebPageSchema } from '@/components/schema-markup'
import InstagramLandingPage from './instagram-landing-page'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'instagram clip credits | prism'
const PAGE_DESCRIPTION =
  'A short Prism social page for founders: get inspired, study the patterns, ' +
  'then start with the blog to learn practical AI tools and tactics.'
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
      <InstagramLandingPage />
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
