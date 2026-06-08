import type { Metadata } from "next"
import PrismAIClient from "./prism-ai-client"
import { WebPageSchema } from "@/components/schema-markup"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const PAGE_TITLE = 'Build your website with Prism AI'
const PAGE_DESCRIPTION =
  'Describe your dream website and let Prism AI build the first version for you in minutes, then refine it with our team into a site that converts.'
const CANONICAL_URL = "https://www.design-prism.com/ai"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/ai",
  index: false,
  ogImage: "/og-prism-ai.jpg",
})

export default function PrismAIPage() {
  return (
    <>
      <PrismAIClient />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/og-prism-ai.jpg"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </>
  )
}
