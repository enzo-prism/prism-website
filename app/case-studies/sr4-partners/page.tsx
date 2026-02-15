import type { Metadata } from "next"
import Sr4PartnersCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "sr4 partners case study — consulting presence refresh",
  description: "discover how prism is shaping a trusted digital presence for sr4 partners with messaging clarity, website foundations, and performance insights.",
  path: "/case-studies/sr4-partners",
})

export default function Sr4PartnersCaseStudyPage() {
  return <Sr4PartnersCaseStudy />
}
