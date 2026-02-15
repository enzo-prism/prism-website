import type { Metadata } from "next"
import { WebPageSchema } from "@/components/schema-markup"
import SummerWebsiteMakeoverClientPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const PAGE_TITLE = "summer website makeover offer | prism"
const PAGE_DESCRIPTION =
  "triple your traffic and conversions in 30 days with prism's summer website makeover—full-stack rebuild, seo, and cro with guaranteed results."
const CANONICAL_URL = "https://www.design-prism.com/offers/summer-website-makeover"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/offers/summer-website-makeover",
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
