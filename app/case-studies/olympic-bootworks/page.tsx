import type { Metadata } from "next"
import OlympicBootworksCaseStudy from "./client-page"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const cs = CASE_STUDIES.find((item) => item.slug === "olympic-bootworks")

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Olympic Bootworks: the Tahoe shop that finally sells online",
  description: "Olympic Bootworks already had the hard part: a legendary reputation, Olympians in the fitting room, and customers who drive hours to get it done right.",
  path: "/case-studies/olympic-bootworks",
  ogImage: cs?.structured?.heroImage ?? "/olympic-bootworks-hero.png",
})

export default function OlympicBootworksCaseStudyPage() {
  return (
    <>
      <OlympicBootworksCaseStudy />
    </>
  )
}
