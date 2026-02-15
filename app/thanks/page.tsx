import type { Metadata } from "next"
import ThanksPageClient from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "payment received | thank you from prism",
  description: "thanks for your payment—our team will send onboarding details and next steps so we can get your project moving.",
  path: "/thanks",
  index: false,
})

export default function ThanksPage() {
  return <ThanksPageClient />
}
