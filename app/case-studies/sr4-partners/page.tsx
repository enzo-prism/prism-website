import type { Metadata } from "next"
import SR4PartnersCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "SR4 Partners Case Study",
  description:
    "How Prism built a digital presence for SR4 Partners — a human-centered business consultancy. Brand refresh, custom website, SEO/AEO, and enterprise analytics.",
  path: "/case-studies/sr4-partners",
})

export default function SR4PartnersCaseStudyPage() {
  return <SR4PartnersCaseStudy />
}
