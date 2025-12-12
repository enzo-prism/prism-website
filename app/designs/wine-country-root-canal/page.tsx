import type { Metadata } from "next"
import WineCountryRootCanalDesignReview from "./client-page"

export const metadata: Metadata = {
  title: "Wine Country Root Canal design review | Prism",
  description:
    "Review the live design system, collateral, and next steps for Dr. Anderson. Prism’s design board centralizes feedback, files, and rollout notes.",
  openGraph: {
    title: "Wine Country Root Canal design review | Prism",
    description:
      "See every asset Prism is shaping for Wine Country Root Canal—website refresh, patient education, and referral social tiles.",
    images: ["/wine-country-root-canal.webp"],
  },
  alternates: {
    canonical: "https://www.design-prism.com/designs/wine-country-root-canal",
  },
}

export default function WineCountryRootCanalDesignReviewPage() {
  return <WineCountryRootCanalDesignReview />
}
