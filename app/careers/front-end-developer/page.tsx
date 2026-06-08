import type { Metadata } from "next"
import FrontEndDeveloperPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Contract front-end developer role',
  description: 'Join our lean team building modern web apps with AI-first tooling: Cursor, Replit, Vercel v0, and Lovable. Remote, part-time contract role.',
  path: "/careers/front-end-developer",
  ogImage: "/prism-opengraph.png",
})

export default function FrontEndDeveloperJobPage() {
  return <FrontEndDeveloperPage />
}
