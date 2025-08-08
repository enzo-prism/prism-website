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
  return <CaseStudiesPage />
}
