import type { Metadata } from "next"
import ReplitBuilderPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Replit builder contract role',
  description: 'Join our lean studio shipping fast, beautiful sites inside Replit, using Replit Agent, Replit DB, and Vercel v0 in a remote contract role.',
  path: "/careers/replit-builder",
  ogImage: "/prism-opengraph.png",
})

export default function ReplitBuilderJobPage() {
  return <ReplitBuilderPage />
}
