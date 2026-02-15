import type { Metadata } from "next"
import CaseStudiesPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "case studies: dental & local business growth wins | prism",
  description: "discover how prism lifts patient acquisition, retention, and online revenue through strategic redesigns, content systems, and analytics for real clients.",
  path: "/case-studies",
  ogImage: "/prism-opengraph.png",
})

export default function CaseStudies() {
  return <CaseStudiesPage />
}
