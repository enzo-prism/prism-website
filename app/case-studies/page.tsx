import SeoTextSection from "@/components/seo-text-section"
import type { Metadata } from "next"
import CaseStudiesPage from "./client-page"

export const metadata: Metadata = {
  title: "case studies",
  description: "explore how prism has helped businesses achieve remarkable growth through strategic digital solutions.",
  alternates: {
    canonical: "https://www.design-prism.com/case-studies",
  },
}

export default function CaseStudies() {
  return (
    <>
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
