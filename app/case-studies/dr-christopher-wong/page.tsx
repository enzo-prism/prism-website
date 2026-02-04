import type { Metadata } from "next"
import ChristopherWongCaseStudy from "./client-page"
import { CASE_STUDIES } from "@/lib/case-study-data"

const cs = CASE_STUDIES.find((cs) => cs.slug === "dr-christopher-wong")
const structured = cs?.structured

export const metadata: Metadata = {
  title: "case study: dr. wong dental m&a relaunch",
  description: "from ownership transition risk to a future-proof, ai-powered dental practice in palo alto.",
  alternates: {
    canonical: "https://www.design-prism.com/case-studies/dr-christopher-wong",
  },
  openGraph: {
    title: "case study: dr. wong dental m&a relaunch",
    description: "from ownership transition risk to a future-proof, ai-powered dental practice in palo alto.",
    images: [
      {
        url: structured?.heroImage ?? "/dr-wong-polaroids.png",
        width: 800,
        height: 450,
        alt: "polaroid photos of dr. christopher wong in his dental practice",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "case study: dr. wong dental m&a relaunch",
    description: "from ownership transition risk to a future-proof, ai-powered dental practice in palo alto.",
    images: structured?.heroImage ?? "/dr-wong-polaroids.png",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ChristopherWongCaseStudyPage() {
  return <ChristopherWongCaseStudy />
}
