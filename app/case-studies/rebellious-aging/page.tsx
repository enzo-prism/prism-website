import type { Metadata } from "next"
import RebelliousAgingCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "rebellious aging case study — community platform foundations",
  description:
    "how prism is building a welcoming digital home for rebellious aging with a refreshed website, clear journeys, and local discovery groundwork.",
  openGraph: {
    title: "rebellious aging × prism case study",
    description: "community-first digital foundations with website and local visibility essentials.",
  },
}

export default function RebelliousAgingCaseStudyPage() {
  return <RebelliousAgingCaseStudy />
}
