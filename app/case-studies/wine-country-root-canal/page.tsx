import type { Metadata } from "next"
import WineCountryRootCanalCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "wine country root canal | prism case study",
  description:
    "see how prism is shaping the wine country root canal patient journey with a modern website, local visibility, and tracking foundations.",
  alternates: {
    canonical:
      "https://www.design-prism.com/case-studies/wine-country-root-canal",
  },
  openGraph: {
    title: "wine country root canal × prism case study",
    description: "endodontic practice growth groundwork with website, local presence, and analytics readiness.",
  },
}

export default function WineCountryRootCanalCaseStudyPage() {
  return <WineCountryRootCanalCaseStudy />
}
