import type { Metadata } from "next"
import PracticeTransitionsInstituteCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "practice transitions institute | prism case study",
  description: "discover how prism is supporting practice transitions institute with a focused website, local presence, and results tracking.",
  path: "/case-studies/practice-transitions-institute",
})

export default function PracticeTransitionsInstituteCaseStudyPage() {
  return <PracticeTransitionsInstituteCaseStudy />
}
