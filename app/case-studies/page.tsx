import type { Metadata } from "next"
import CaseStudiesPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Client results',
  description: 'Dental practices, nonprofits, founders, and local shops with the same two problems: getting found and getting chosen. See the live sites and verified results.',
  path: "/case-studies",
  ogImage: "/prism-opengraph.png",
})

export default function CaseStudies() {
  return <CaseStudiesPage />
}
