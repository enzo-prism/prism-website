import type { Metadata } from "next"
import InfobellItCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "Infobell IT Case Study — SaaS Enablement Foundations",
  description:
    "explore how prism is partnering with infobell it to craft a modern website, clarify offerings, and set up performance tracking.",
  openGraph: {
    title: "Infobell IT × Prism Case Study",
    description: "it services storytelling through modern web design and analytics setup.",
  },
}

export default function InfobellItCaseStudyPage() {
  return <InfobellItCaseStudy />
}
