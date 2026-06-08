import type { Metadata } from "next"
import { WebPageSchema } from "@/components/schema-markup"
import ClientPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const PAGE_TITLE = 'One-time custom design for $750'
const PAGE_DESCRIPTION =
  'Get a polished logo, banner, flyer, or single custom design asset crafted by Prism\'s team for a flat $750, with revisions until you love it.'
const CANONICAL_URL = "https://www.design-prism.com/one-time-fee"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/one-time-fee",
  index: false,
  ogImage: "/prism-opengraph.png",
})

export default function OneTimeFee() {
  return (
    <>
      <ClientPage />
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
