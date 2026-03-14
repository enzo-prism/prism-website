import type { Metadata } from "next"
import CanarycoveCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Canary Cove Case Study",
  description:
    "How Prism built a property brand and digital presence for Canary Cove — a boutique residential development in coastal California. Brand design, custom website, SEO/AEO, and enterprise analytics.",
  path: "/case-studies/canary-cove",
})

export default function CanarycoveCaseStudyPage() {
  return <CanarycoveCaseStudy />
}
