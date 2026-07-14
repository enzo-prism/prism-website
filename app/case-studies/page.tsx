import type { Metadata } from "next"
import CaseStudiesPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Client results',
  description: 'See how Prism improves visibility, lead flow, and revenue through focused websites, SEO, ads, and analytics.',
  path: "/case-studies",
  ogImage: "/prism-opengraph.png",
})

export default function CaseStudies() {
  return <CaseStudiesPage />
}
