import type { Metadata } from "next"
import CanaryFoundationCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "Canary Foundation Case Study — Mission-Driven Web Refresh",
  description:
    "learn how prism is partnering with canary foundation to modernize their website, share impact, and support donor journeys.",
  openGraph: {
    title: "Canary Foundation × Prism Case Study",
    description: "nonprofit storytelling with modern web design and supporter experience foundations.",
  },
}

export default function CanaryFoundationCaseStudyPage() {
  return <CanaryFoundationCaseStudy />
}
