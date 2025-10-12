import type { Metadata } from "next"
import Sr4PartnersCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "sr4 Partners Case Study — Consulting Presence Refresh",
  description:
    "discover how prism is shaping a trusted digital presence for sr4 partners with messaging clarity, website foundations, and performance insights.",
  openGraph: {
    title: "sr4 Partners × Prism Case Study",
    description: "consulting brand clarity through modern web design and analytics essentials.",
  },
}

export default function Sr4PartnersCaseStudyPage() {
  return <Sr4PartnersCaseStudy />
}
