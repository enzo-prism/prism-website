import type { Metadata } from "next"
import WeAreSaplingsCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "we are saplings case study — education platform foundations",
  description:
    "see how prism is helping we are saplings launch a modern educational platform with clear storytelling and parent-friendly journeys.",
  openGraph: {
    title: "we are saplings × prism case study",
    description: "education brand clarity with website design and onboarding pathways.",
  },
}

export default function WeAreSaplingsCaseStudyPage() {
  return <WeAreSaplingsCaseStudy />
}
