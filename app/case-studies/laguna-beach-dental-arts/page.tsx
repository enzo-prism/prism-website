import type { Metadata } from "next"
import LagunaBeachDentalArtsCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "Laguna Beach Dental Arts Case Study — Post‑M&A Relaunch",
  description:
    "how we partnered with laguna beach dental arts post‑merger to relaunch the brand, ship a modern website, and stand up full‑funnel acquisition and tracking.",
  openGraph: {
    title: "Laguna Beach Dental Arts × Prism — Case Study",
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


