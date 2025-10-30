import type { Metadata } from "next"
import LagunaBeachDentalArtsCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "laguna beach dental arts case study — post‑m&a relaunch",
  description:
    "how we partnered with laguna beach dental arts post‑merger to relaunch the brand, ship a modern website, and stand up full‑funnel acquisition and tracking.",
  openGraph: {
    title: "laguna beach dental arts × prism — case study",
    description:
      "post‑m&a relaunch: brand, website, acquisition channels, and tracking — built for measurable growth",
    images: [],
  },
  alternates: {
    canonical: "https://www.design-prism.com/case-studies/laguna-beach-dental-arts",
  },
}

export default function LagunaBeachDentalArtsCase() {
  return <LagunaBeachDentalArtsCaseStudy />
}


