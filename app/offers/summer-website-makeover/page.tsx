import type { Metadata } from "next"
import { WebPageSchema } from "@/components/schema-markup"
import SummerWebsiteMakeoverClientPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const PAGE_TITLE = 'Summer website makeover offer'
const PAGE_DESCRIPTION =
  'Triple your traffic and conversions in 30 days with Prism\'s summer website makeover: a full rebuild, SEO, and CRO with results you can measure.'
const CANONICAL_URL = "https://www.design-prism.com/offers/summer-website-makeover"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/offers/summer-website-makeover",
  index: false,
  ogImage: "/prism-opengraph.png",
})

export default function SummerWebsiteMakeoverPage() {
  return (
    <>
      <SummerWebsiteMakeoverClientPage />
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
