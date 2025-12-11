import type { Metadata } from "next"
import MatariaDentalGroupCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "mataria dental group case study",
  description: "Modern, trusted web presence with clear services and booking paths.",
}

export default function MatariaDentalGroupPage() {
  return <MatariaDentalGroupCaseStudy />
}
