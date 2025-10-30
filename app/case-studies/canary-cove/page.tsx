import type { Metadata } from "next"
import CanaryCoveCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "canary cove case study — private retreat storytelling",
  description:
    "see how prism is crafting a refined digital experience for canary cove with immersive visuals, booking clarity, and brand cohesion.",
  openGraph: {
    title: "canary cove × prism case study",
    description: "luxury retreat storytelling with modern web design and guest journey planning.",
  },
}

export default function CanaryCoveCaseStudyPage() {
  return <CanaryCoveCaseStudy />
}
