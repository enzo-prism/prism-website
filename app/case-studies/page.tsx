import SeoTextSection from "@/components/seo-text-section"
import type { Metadata } from "next"
import CaseStudiesPage from "./client-page"

export const metadata: Metadata = {
  title: "Case Studies: Dental & Local Business Growth Wins | Prism",
  description:
    "Discover how Prism lifts patient acquisition, retention, and online revenue through strategic redesigns, content systems, and analytics for real clients.",
  alternates: {
    canonical: "https://www.design-prism.com/case-studies",
  },
}

export default function CaseStudies() {
  return (
    <>
      <h1 className="sr-only">Case Studies: Dental & Local Business Growth Wins | Prism</h1>
      <CaseStudiesPage />
      <SeoTextSection title="case studies & outcomes">
        <p>
          our projects pair strategy, design, and engineering to solve specific business problems—
          retaining patients during a transition, launching a new brand, or rebuilding a site to recover
          traffic. each study highlights the decisions and systems that created lasting results.
        </p>
      </SeoTextSection>
    </>
  )
}
