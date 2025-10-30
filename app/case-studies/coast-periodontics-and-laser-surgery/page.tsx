import type { Metadata } from "next"
import CoastPeriodonticsCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "coast periodontics case study | dental growth",
  description:
    "see how prism is partnering with coast periodontics & laser surgery to deliver a calm website, local visibility, and conversion tracking essentials.",
  openGraph: {
    title: "coast periodontics & laser surgery × prism case study",
    description: "specialty dental growth groundwork with website design and local presence support.",
  },
}

export default function CoastPeriodonticsCaseStudyPage() {
  return <CoastPeriodonticsCaseStudy />
}
