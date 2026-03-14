import type { Metadata } from "next"
import MichaelNjoDDSCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Michael Njo DDS Case Study",
  description:
    "How Prism built a complete digital presence for Michael Njo DDS — a San Mateo general dental practice. Brand design, custom website, Google Ads, SEO/AEO, local listing optimization, and enterprise analytics.",
  path: "/case-studies/michael-njo-dds",
})

export default function MichaelNjoDDSCaseStudyPage() {
  return <MichaelNjoDDSCaseStudy />
}
