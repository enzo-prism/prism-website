import type { Metadata } from "next"
import BelizeKidsFoundationCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Belize Kids Foundation Case Study",
  description:
    "How Prism built a warm, conversion-focused digital presence for Belize Kids Foundation — a nonprofit supporting education and opportunity for children in Belize. Brand design, custom website, SEO/AEO, and enterprise analytics.",
  path: "/case-studies/belize-kids-foundation",
})

export default function BelizeKidsFoundationCaseStudyPage() {
  return <BelizeKidsFoundationCaseStudy />
}
