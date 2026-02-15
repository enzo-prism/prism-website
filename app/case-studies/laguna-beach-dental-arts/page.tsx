import type { Metadata } from "next"
import LagunaBeachDentalArtsCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "laguna beach dental arts case study — post‑m&a relaunch",
  description: "how we partnered with laguna beach dental arts post‑merger to relaunch the brand, ship a modern website, and stand up full‑funnel acquisition and tracking.",
  path: "/case-studies/laguna-beach-dental-arts",
})

export default function LagunaBeachDentalArtsCase() {
  return <LagunaBeachDentalArtsCaseStudy />
}


