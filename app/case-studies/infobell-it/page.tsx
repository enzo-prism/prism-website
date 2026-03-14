import type { Metadata } from "next"
import InfobellITCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Infobell IT Case Study",
  description:
    "How Prism built a credible digital presence for Infobell IT — a managed services provider and cybersecurity firm. Brand design, custom website, SEO/AEO, and enterprise analytics.",
  path: "/case-studies/infobell-it",
})

export default function InfobellITCaseStudyPage() {
  return <InfobellITCaseStudy />
}
