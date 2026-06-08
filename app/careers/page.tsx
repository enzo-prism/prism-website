import type { Metadata } from "next"
import CareersClientPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Careers at Prism: open roles',
  description: 'Join Prism and help build websites, apps, and designs that drive real results. Explore open roles at our lean, AI-first digital studio.',
  path: "/careers",
  ogImage: "/prism-opengraph.png",
})

export default function CareersPage() {
  return <CareersClientPage />
}
