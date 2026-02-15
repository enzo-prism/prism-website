import type { Metadata } from "next"
import LeadershipRetreatCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "leadership retreat case study — digital presence",
  description: "how we built a conversion-friendly retreat site with clear agenda, speakers, and booking paths.",
  path: "/case-studies/leadership-retreat",
})

export default function LeadershipRetreatCaseStudyPage() {
  return <LeadershipRetreatCaseStudy />
}

