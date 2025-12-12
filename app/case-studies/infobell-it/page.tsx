import type { Metadata } from "next"
import InfobellItCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "infobell it case study — saas enablement foundations",
  description:
    "explore how prism is partnering with infobell it to craft a modern website, clarify offerings, and set up performance tracking.",
  alternates: {
    canonical: "https://www.design-prism.com/case-studies/infobell-it",
  },
  openGraph: {
    title: "infobell it × prism case study",
    description: "it services storytelling through modern web design and analytics setup.",
  },
}

export default function InfobellItCaseStudyPage() {
  return <InfobellItCaseStudy />
}
