import type { Metadata } from "next"
import LeadershipRetreatCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "leadership retreat case study — digital presence",
  description: "how we built a conversion-friendly retreat site with clear agenda, speakers, and booking paths.",
  alternates: {
    canonical: "https://www.design-prism.com/case-studies/leadership-retreat",
  },
  openGraph: {
    title: "leadership retreat × prism — case study",
    description: "conversion-friendly retreat site with clear agenda, speakers, and booking paths.",
  },
}

export default function LeadershipRetreatCaseStudyPage() {
  return <LeadershipRetreatCaseStudy />
}

