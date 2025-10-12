import type { Metadata } from "next"
import BelizeKidsFoundationCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "Belize Kids Foundation Case Study — Nonprofit Story Hub",
  description:
    "follow how prism is supporting belize kids foundation with a refreshed website, donor pathways, and local visibility groundwork.",
  openGraph: {
    title: "Belize Kids Foundation × Prism Case Study",
    description: "nonprofit storytelling infrastructure with website design and local presence support.",
  },
}

export default function BelizeKidsFoundationCaseStudyPage() {
  return <BelizeKidsFoundationCaseStudy />
}
