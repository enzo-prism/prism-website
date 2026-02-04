import type { Metadata } from "next"
import { WebPageSchema } from "@/components/schema-markup"
import WineCountryRootCanalDesignReview from "./client-page"

const PAGE_TITLE = "Wine Country Root Canal design review | Prism"
const PAGE_DESCRIPTION =
  "Review the live design system, collateral, and next steps for Dr. Anderson. Prism’s design board centralizes feedback, files, and rollout notes."
const CANONICAL_URL = "https://www.design-prism.com/designs/wine-country-root-canal"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description:
      "See every asset Prism is shaping for Wine Country Root Canal—website refresh, patient education, and referral social tiles.",
    images: ["/wine-country-root-canal.webp"],
  },
  alternates: {
    canonical: CANONICAL_URL,
  },
}

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
