import type { Metadata } from "next"
import RebelliousAgingCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "rebellious aging case study — community platform foundations",
  description: "how prism is building a welcoming digital home for rebellious aging with a refreshed website, clear journeys, and local discovery groundwork.",
  path: "/case-studies/rebellious-aging",
})

export default function RebelliousAgingCaseStudyPage() {
  return <RebelliousAgingCaseStudy />
}
