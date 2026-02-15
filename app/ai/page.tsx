import type { Metadata } from "next"
import PrismAIClient from "./prism-ai-client"
import { WebPageSchema } from "@/components/schema-markup"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const PAGE_TITLE = "prism ai - build your website with ai | design prism"
const PAGE_DESCRIPTION =
  "describe your dream website and let prism ai build it for you. get started in minutes."
const CANONICAL_URL = "https://www.design-prism.com/ai"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/ai",
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
