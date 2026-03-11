import type { Metadata } from "next"
import CaseStudiesPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Dental + local business case studies",
  description: "See how Prism improves patient acquisition, local visibility, and revenue through website redesigns, SEO, content systems, and analytics.",
  path: "/case-studies",
  ogImage: "/prism-opengraph.png",
})

export default function CaseStudies() {
  return <CaseStudiesPage />
}
