import type { Metadata } from "next"
import { buildRouteMetadata } from "@/lib/seo/metadata"
export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Dental practice growth system",
  description: "Premium dental websites, Google visibility, reviews, ads, tracking, and AI search support for owner-dentists who want more booked patients.",
  path: "/",
})

import ClientPage from "./client-page"

export default function Home() {
  return <ClientPage />
}
