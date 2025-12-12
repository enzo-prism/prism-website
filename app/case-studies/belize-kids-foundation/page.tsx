import type { Metadata } from "next"
import BelizeKidsFoundationCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "belize kids foundation case study — nonprofit story hub",
  description:
    "follow how prism is supporting belize kids foundation with a refreshed website, donor pathways, and local visibility groundwork.",
  alternates: {
    canonical:
      "https://www.design-prism.com/case-studies/belize-kids-foundation",
  },
  openGraph: {
    title: "belize kids foundation × prism case study",
    description: "nonprofit storytelling infrastructure with website design and local presence support.",
  },
}

export default function BelizeKidsFoundationCaseStudyPage() {
  return <BelizeKidsFoundationCaseStudy />
}
