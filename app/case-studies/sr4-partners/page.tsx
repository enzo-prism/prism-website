import type { Metadata } from "next"
import Sr4PartnersCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "sr4 partners case study — consulting presence refresh",
  description:
    "discover how prism is shaping a trusted digital presence for sr4 partners with messaging clarity, website foundations, and performance insights.",
  alternates: {
    canonical: "https://www.design-prism.com/case-studies/sr4-partners",
  },
  openGraph: {
    title: "sr4 partners × prism case study",
    description: "consulting brand clarity through modern web design and analytics essentials.",
  },
}

export default function Sr4PartnersCaseStudyPage() {
  return <Sr4PartnersCaseStudy />
}
