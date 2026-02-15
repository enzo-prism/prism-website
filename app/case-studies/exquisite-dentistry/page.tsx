import type { Metadata } from "next"
import ExquisiteDentistryCaseStudy from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Case Study: Exquisite Dentistry brand relaunch",
  description: "Turning a legacy Beverly Hills brand into a modern, trackable growth engine.",
  path: "/case-studies/exquisite-dentistry",
  ogImage: "/exquisite-dentistry-consultation.png",
})

export default function ExquisiteDentistryCaseStudyPage() {
  return <ExquisiteDentistryCaseStudy />
}
