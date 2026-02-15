import type { Metadata } from "next"
import ReplitBuilderPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "replit builder contract role | prism careers",
  description: "join our lean studio shipping fast, beautiful sites inside replit. use replit agent, replit db, and vercel v0 in a remote contract role.",
  path: "/careers/replit-builder",
  ogImage: "/prism-opengraph.png",
})

export default function ReplitBuilderJobPage() {
  return <ReplitBuilderPage />
}
