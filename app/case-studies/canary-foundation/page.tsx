import type { Metadata } from "next"
import CanaryFoundationCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "canary foundation case study — mission-driven web refresh",
  description:
    "learn how prism is partnering with canary foundation to modernize their website, share impact, and support donor journeys.",
  openGraph: {
    title: "canary foundation × prism case study",
    description: "nonprofit storytelling with modern web design and supporter experience foundations.",
  },
}

export default function CanaryFoundationCaseStudyPage() {
  return <CanaryFoundationCaseStudy />
}
