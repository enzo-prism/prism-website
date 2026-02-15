import type { Metadata } from "next"
import MichaelNjoCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "michael njo, dds case study — modern dental presence",
  description: "how we launched a credibility-first website with clear services, patient flows, and tracking.",
  path: "/case-studies/michael-njo-dds",
})

export default function MichaelNjoCaseStudyPage() {
  return <MichaelNjoCaseStudy />
}

