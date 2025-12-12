import type { Metadata } from "next"
import OlympicBootworksCaseStudy from "./client-page"
import { CASE_STUDIES } from "@/lib/case-study-data"

const cs = CASE_STUDIES.find((item) => item.slug === "olympic-bootworks")

export const metadata: Metadata = {
  title: "case study: olympic bootworks - ai-powered ecommerce for a legendary ski shop",
  description: "how prism transformed olympic bootworks from a basic site into a multi-site ecommerce system for fantic bikes and bootfitting tech.",
  alternates: {
    canonical: "/case-studies/olympic-bootworks",
  },
  openGraph: {
    title: "case study: olympic bootworks - ai-powered ecommerce for a legendary ski shop",
    description: "how prism transformed olympic bootworks from a basic site into a multi-site ecommerce system for fantic bikes and bootfitting tech.",
    images: [
      {
        url: cs?.structured?.heroImage ?? "/olympic-bootworks-hero.png",
        width: 1200,
        height: 630,
        alt: "olympic bootworks case study hero",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "case study: olympic bootworks - ai-powered ecommerce for a legendary ski shop",
    description: "how prism transformed olympic bootworks from a basic site into a multi-site ecommerce system for fantic bikes and bootfitting tech.",
    images: cs?.structured?.heroImage ?? "/olympic-bootworks-hero.png",
  },
  robots: { index: true, follow: true },
}

export default function OlympicBootworksCaseStudyPage() {
  return (
    <>
      <OlympicBootworksCaseStudy />
    </>
  )
}
