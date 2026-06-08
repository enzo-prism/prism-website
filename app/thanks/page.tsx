import type { Metadata } from "next"
import ThanksPageClient from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Payment received: thank you',
  description: 'Thanks for your payment. The Prism team will send onboarding details and clear next steps so we can get your project moving right away.',
  path: "/thanks",
  index: false,
})

export default function ThanksPage() {
  return <ThanksPageClient />
}
