import type { Metadata } from "next"
import WineCountryRootCanalCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "wine country root canal | prism case study",
  description: "see how prism is shaping the wine country root canal patient journey with a modern website, local visibility, and tracking foundations.",
  path: "/case-studies/wine-country-root-canal",
})

export default function WineCountryRootCanalCaseStudyPage() {
  return <WineCountryRootCanalCaseStudy />
}
