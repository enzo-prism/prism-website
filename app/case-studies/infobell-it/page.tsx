import type { Metadata } from "next"
import InfobellItCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "infobell it case study — saas enablement foundations",
  description: "explore how prism is partnering with infobell it to craft a modern website, clarify offerings, and set up performance tracking.",
  path: "/case-studies/infobell-it",
})

export default function InfobellItCaseStudyPage() {
  return <InfobellItCaseStudy />
}
