import type { Metadata } from 'next'

import { WebPageSchema } from '@/components/schema-markup'
import TikTokLandingPage from './tiktok-landing-page'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'prism on tiktok | prism'
const PAGE_DESCRIPTION =
  'A TikTok landing page for Prism viewers: audit, proof, pricing, and the credit list behind the clips.'
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
      <TikTokLandingPage />
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
