import type { Metadata } from "next"
import FrontEndDeveloperPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "contract front-end developer | prism careers",
  description: "join our lean team building modern web apps with ai-first tooling. work with cursor, replit, vercel v0, and lovable.dev. remote, part-time contract position.",
  path: "/careers/front-end-developer",
  ogImage: "/prism-opengraph.png",
})

export default function FrontEndDeveloperJobPage() {
  return <FrontEndDeveloperPage />
}
