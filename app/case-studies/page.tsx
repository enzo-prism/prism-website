import type { Metadata } from "next"
import CaseStudiesPage from "./client-page"

export const metadata: Metadata = {
  title: "case studies: dental & local business growth wins | prism",
  description:
    "discover how prism lifts patient acquisition, retention, and online revenue through strategic redesigns, content systems, and analytics for real clients.",
  alternates: {
    canonical: "https://www.design-prism.com/case-studies",
  },
}

export default function CaseStudies() {
  return <CaseStudiesPage />
}
