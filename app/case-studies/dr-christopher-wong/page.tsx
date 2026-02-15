import type { Metadata } from "next"
import ChristopherWongCaseStudy from "./client-page"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const cs = CASE_STUDIES.find((cs) => cs.slug === "dr-christopher-wong")
const structured = cs?.structured

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "case study: dr. wong dental m&a relaunch",
  description: "from ownership transition risk to a future-proof, ai-powered dental practice in palo alto.",
  path: "/case-studies/dr-christopher-wong",
  ogImage: structured?.heroImage ?? "/dr-wong-polaroids.png",
})

export default function ChristopherWongCaseStudyPage() {
  return <ChristopherWongCaseStudy />
}
