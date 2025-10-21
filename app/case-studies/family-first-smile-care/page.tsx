import type { Metadata } from "next"
import FamilyFirstSmileCareCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "Family First Smile Care Case Study | Dental Website",
  description:
    "how we created a modern, patient‑friendly website for family first smile care with clear services, comfort highlights, and conversion paths.",
  openGraph: {
    title: "Family First Smile Care × Prism — Case Study",
    description: "family‑focused website: services clarity, office amenities, and measurable conversion flows",
    images: [],
  },
  alternates: {
    canonical: "https://www.design-prism.com/case-studies/family-first-smile-care",
  },
}

export default function FamilyFirstSmileCareCase() {
  return <FamilyFirstSmileCareCaseStudy />
}

