import type { Metadata } from "next"
import OlympicBootworksCaseStudy from "./client-page"
import { CASE_STUDIES } from "@/lib/case-study-data"

const cs = CASE_STUDIES.find((item) => item.slug === "olympic-bootworks")

export const metadata: Metadata = {
  title: "Olympic Bootworks: the Tahoe shop that finally sells online",
  description:
    "Olympic Bootworks already had the hard part: a legendary reputation, Olympians in the fitting room, and customers who drive hours to get it done right.",
  alternates: {
    canonical: "/case-studies/olympic-bootworks",
  },
  openGraph: {
    title: "Olympic Bootworks: the Tahoe shop that finally sells online",
    description:
      "Olympic Bootworks already had the hard part: a legendary reputation, Olympians in the fitting room, and customers who drive hours to get it done right.",
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
    title: "Olympic Bootworks: the Tahoe shop that finally sells online",
    description:
      "Olympic Bootworks already had the hard part: a legendary reputation, Olympians in the fitting room, and customers who drive hours to get it done right.",
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
