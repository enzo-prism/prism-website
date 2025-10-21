import type { Metadata } from "next"
import PracticeTransitionsInstituteCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "Practice Transitions Institute | Prism Case Study",
  description:
    "discover how prism is supporting practice transitions institute with a focused website, local presence, and results tracking.",
  openGraph: {
    title: "Practice Transitions Institute × Prism Case Study",
    description: "dental consulting storytelling with modern web design and local search readiness.",
  },
}

export default function PracticeTransitionsInstituteCaseStudyPage() {
  return <PracticeTransitionsInstituteCaseStudy />
}
