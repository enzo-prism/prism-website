import type { Metadata } from "next"
import CanaryCoveCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "canary cove case study — private retreat storytelling",
  description: "see how prism is crafting a refined digital experience for canary cove with immersive visuals, booking clarity, and brand cohesion.",
  path: "/case-studies/canary-cove",
})

export default function CanaryCoveCaseStudyPage() {
  return <CanaryCoveCaseStudy />
}
