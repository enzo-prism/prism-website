import type { Metadata } from "next"
import CoastPeriodonticsCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "Coast Periodontics & Laser Surgery Case Study — Specialty Dental Foundations",
  description:
    "see how prism is partnering with coast periodontics & laser surgery to deliver a calm website, local visibility, and conversion tracking essentials.",
  openGraph: {
    title: "Coast Periodontics & Laser Surgery × Prism Case Study",
    description: "specialty dental growth groundwork with website design and local presence support.",
  },
}

export default function CoastPeriodonticsCaseStudyPage() {
  return <CoastPeriodonticsCaseStudy />
}
