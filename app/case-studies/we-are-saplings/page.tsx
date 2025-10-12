import type { Metadata } from "next"
import WeAreSaplingsCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "We Are Saplings Case Study — Education Platform Foundations",
  description:
    "see how prism is helping we are saplings launch a modern educational platform with clear storytelling and parent-friendly journeys.",
  openGraph: {
    title: "We Are Saplings × Prism Case Study",
    description: "education brand clarity with website design and onboarding pathways.",
  },
}

export default function WeAreSaplingsCaseStudyPage() {
  return <WeAreSaplingsCaseStudy />
}
