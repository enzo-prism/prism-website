import type { Metadata } from "next"
import CoastPeriodonticsCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "coast periodontics case study | dental growth",
  description: "see how prism is partnering with coast periodontics & laser surgery to deliver a calm website, local visibility, and conversion tracking essentials.",
  path: "/case-studies/coast-periodontics-and-laser-surgery",
})

export default function CoastPeriodonticsCaseStudyPage() {
  return <CoastPeriodonticsCaseStudy />
}
