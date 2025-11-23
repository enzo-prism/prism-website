import type { Metadata } from "next"
import MichaelNjoCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "michael njo, dds case study — modern dental presence",
  description: "how we launched a credibility-first website with clear services, patient flows, and tracking.",
  alternates: {
    canonical: "https://www.design-prism.com/case-studies/michael-njo-dds",
  },
  openGraph: {
    title: "michael njo, dds × prism — case study",
    description: "credibility-first dental site with service clarity, patient flows, and analytics.",
  },
}

export default function MichaelNjoCaseStudyPage() {
  return <MichaelNjoCaseStudy />
}

