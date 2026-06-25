import type { Metadata } from "next"
import CaseStudiesPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Case studies & measured client results',
  description: 'See how Prism lifts visibility, lead flow, and revenue for local businesses, founders, nonprofits, consultancies, and dental teams through websites, SEO, and analytics.',
  path: "/case-studies",
  ogImage: "/prism-opengraph.png",
})

export default function CaseStudies() {
  return <CaseStudiesPage />
}
