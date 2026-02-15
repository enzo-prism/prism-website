import type { Metadata } from "next"
import { WebPageSchema } from "@/components/schema-markup"
import ModelsPageClient from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const PAGE_TITLE = "Prism Models"
const PAGE_DESCRIPTION =
  "join prism models for free whitening, professional photos, and paid creative projects that help dental practices tell real stories."
const CANONICAL_URL = "https://www.design-prism.com/models"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/models",
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
