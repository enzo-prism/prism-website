import type { Metadata } from "next"
import GraceDentalSantaRosaCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "grace dental santa rosa case study — post‑m&a relaunch",
  description: "how we partnered with grace dental (tingjen ji, dds msd) to relaunch the brand and site, and stand up acquisition and tracking.",
  path: "/case-studies/grace-dental-santa-rosa",
})

export default function GraceDentalSantaRosaCase() {
  return <GraceDentalSantaRosaCaseStudy />
}


