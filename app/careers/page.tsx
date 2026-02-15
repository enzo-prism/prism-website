import type { Metadata } from "next"
import CareersClientPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "careers at prism | open roles",
  description: "join our team at prism. explore career opportunities at our digital agency creating websites, apps, and designs that drive results.",
  path: "/careers",
  ogImage: "/prism-opengraph.png",
})

export default function CareersPage() {
  return <CareersClientPage />
}
