import type { Metadata } from "next"
import { WebPageSchema } from "@/components/schema-markup"
import WineCountryRootCanalDesignReview from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const PAGE_TITLE = "Wine Country Root Canal design review | Prism"
const PAGE_DESCRIPTION =
  "Review the live design system, collateral, and next steps for Dr. Anderson. Prism’s design board centralizes feedback, files, and rollout notes."
const CANONICAL_URL = "https://www.design-prism.com/designs/wine-country-root-canal"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/designs/wine-country-root-canal",
  ogImage: "/wine-country-root-canal.webp",
})

export default function WineCountryRootCanalDesignReviewPage() {
  return (
    <>
      <WineCountryRootCanalDesignReview />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/wine-country-root-canal.webp"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </>
  )
}
