import type { Metadata } from "next"
import SaorsaGrowthPartnersCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "saorsa growth partners case study",
  description: "Clarity, credibility, and lead capture for a focused advisory firm.",
  path: "/case-studies/saorsa-growth-partners",
})

export default function SaorsaGrowthPartnersPage() {
  return <SaorsaGrowthPartnersCaseStudy />
}
