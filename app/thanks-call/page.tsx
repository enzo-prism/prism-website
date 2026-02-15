import type { Metadata } from "next"
import ThanksCallPageClient from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "call scheduled | thanks from prism",
  description: "your call has been scheduled successfully. join our instagram community while you wait.",
  path: "/thanks-call",
  index: false,
})

export default function ThanksCallPage() {
  return <ThanksCallPageClient />
}
