import type { Metadata } from "next"
import GraceDentalSantaRosaCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "Grace Dental Santa Rosa Case Study — Post‑M&A Relaunch",
  description:
    "how we partnered with grace dental (tingjen ji, dds msd) to relaunch the brand and site, and stand up acquisition and tracking.",
  openGraph: {
    title: "Grace Dental Santa Rosa × Prism — Case Study",
    description: "brand, website, acquisition channels, and tracking for an exceptional family dental practice",
    images: [],
  },
  alternates: {
    canonical: "https://www.design-prism.com/case-studies/grace-dental-santa-rosa",
  },
}

export default function GraceDentalSantaRosaCase() {
  return <GraceDentalSantaRosaCaseStudy />
}


