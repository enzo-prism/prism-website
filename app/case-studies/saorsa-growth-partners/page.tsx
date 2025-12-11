import type { Metadata } from "next"
import SaorsaGrowthPartnersCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "saorsa growth partners case study",
  description: "Clarity, credibility, and lead capture for a focused advisory firm.",
}

export default function SaorsaGrowthPartnersPage() {
  return <SaorsaGrowthPartnersCaseStudy />
}
