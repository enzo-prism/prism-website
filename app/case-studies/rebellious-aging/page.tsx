import type { Metadata } from "next"
import RebelliousAgingCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "Rebellious Aging Case Study — Community Platform Foundations",
  description:
    "how prism is building a welcoming digital home for rebellious aging with a refreshed website, clear journeys, and local discovery groundwork.",
  openGraph: {
    title: "Rebellious Aging × Prism Case Study",
    description: "community-first digital foundations with website and local visibility essentials.",
  },
}

export default function RebelliousAgingCaseStudyPage() {
  return <RebelliousAgingCaseStudy />
}
