import type { Metadata } from "next"
import SaorsaGrowthPartnersCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "saorsa growth partners case study",
  description: "Clarity, credibility, and lead capture for a focused advisory firm.",
  alternates: {
    canonical:
      "https://www.design-prism.com/case-studies/saorsa-growth-partners",
  },
}

export default function SaorsaGrowthPartnersPage() {
  return <SaorsaGrowthPartnersCaseStudy />
}
