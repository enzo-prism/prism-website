import type { Metadata } from "next"
import { buildRouteMetadata } from "@/lib/seo/metadata"
export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Website design, Google Maps SEO + ads",
  description: "Done-for-you website design, Google Maps SEO, and paid ads for local brands that want more calls, leads, and booked customers.",
  path: "/",
})

import ClientPage from "./client-page"

export default function Home() {
  return <ClientPage />
}
