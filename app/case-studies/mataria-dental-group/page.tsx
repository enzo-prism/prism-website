import type { Metadata } from "next"
import MatariaDentalGroupCaseStudy from "./client-page"
import { CASE_STUDIES } from "@/lib/case-study-data"

const cs = CASE_STUDIES.find((item) => item.slug === "mataria-dental-group")

export const metadata: Metadata = {
  title: "case study: mataria dental group m&a launch",
  description: "how prism relaunched mataria dental group in torrance with a new dental website, listings, content, social campaigns, and analytics.",
  alternates: {
    canonical: "/case-studies/mataria-dental-group",
  },
  openGraph: {
    title: "case study: mataria dental group m&a launch",
    description: "how prism relaunched mataria dental group in torrance with a new dental website, listings, content, social campaigns, and analytics.",
    images: [
      {
        url: cs?.structured?.heroImage ?? "/mataria-hero.png",
        width: 1200,
        height: 630,
        alt: "mataria dental group case study hero",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "case study: mataria dental group m&a launch",
    description: "how prism relaunched mataria dental group in torrance with a new dental website, listings, content, social campaigns, and analytics.",
    images: cs?.structured?.heroImage ?? "/mataria-hero.png",
  },
  robots: { index: true, follow: true },
}

export default function MatariaDentalGroupCaseStudyPage() {
  return (
    <>
      <MatariaDentalGroupCaseStudy />
    </>
  )
}
