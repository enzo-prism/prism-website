import type { Metadata } from "next"
import { buildRouteMetadata } from "@/lib/seo/metadata"
export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Websites, SEO & ads for local growth',
  description:
    'Prism builds AI-ready websites, local SEO, ads, reviews, and tracking into one growth system for founders, owners, and local operators.',
  path: "/",
})

import ClientPage from "./client-page"

export default function Home() {
  return <ClientPage />
}
