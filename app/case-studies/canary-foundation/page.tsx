import type { Metadata } from "next"
import CanaryFoundationCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "canary foundation case study — mission-driven web refresh",
  description: "learn how prism is partnering with canary foundation to modernize their website, share impact, and support donor journeys.",
  path: "/case-studies/canary-foundation",
})

export default function CanaryFoundationCaseStudyPage() {
  return <CanaryFoundationCaseStudy />
}
