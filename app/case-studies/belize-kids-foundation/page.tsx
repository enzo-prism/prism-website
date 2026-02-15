import type { Metadata } from "next"
import BelizeKidsFoundationCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "belize kids foundation case study — nonprofit story hub",
  description: "follow how prism is supporting belize kids foundation with a refreshed website, donor pathways, and local visibility groundwork.",
  path: "/case-studies/belize-kids-foundation",
})

export default function BelizeKidsFoundationCaseStudyPage() {
  return <BelizeKidsFoundationCaseStudy />
}
