import type { Metadata } from "next"
import { WebPageSchema } from "@/components/schema-markup"
import ModelsPageClient from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const PAGE_TITLE = 'Prism models: free whitening & photos'
const PAGE_DESCRIPTION =
  'Join Prism models for free teeth whitening, professional photos, and paid creative projects that help dental practices tell real patient stories.'
const CANONICAL_URL = "https://www.design-prism.com/models"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/models",
  index: false,
  ogImage: "/prism-opengraph.png",
})

export default function ModelsPage() {
  return (
    <>
      <ModelsPageClient />
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
