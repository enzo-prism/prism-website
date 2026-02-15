import type { Metadata } from "next"
import WeAreSaplingsCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "we are saplings case study — education platform foundations",
  description: "see how prism is helping we are saplings launch a modern educational platform with clear storytelling and parent-friendly journeys.",
  path: "/case-studies/we-are-saplings",
})

export default function WeAreSaplingsCaseStudyPage() {
  return <WeAreSaplingsCaseStudy />
}
