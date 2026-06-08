import type { Metadata } from "next"
import ThanksCallPageClient from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Your call is scheduled',
  description: 'Your call with Prism is booked. Watch for the calendar invite, and join our Instagram community for founder growth tips while you wait.',
  path: "/thanks-call",
  index: false,
})

export default function ThanksCallPage() {
  return <ThanksCallPageClient />
}
