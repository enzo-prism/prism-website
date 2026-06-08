import type { Metadata } from "next"
import { buildRouteMetadata } from "@/lib/seo/metadata"
export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Business growth systems",
  description:
    "Prism builds websites, search visibility, proof, ads, content, tracking, and AI-ready growth systems for founders, owners, and operators.",
  path: "/",
})

import ClientPage from "./client-page"

export default function Home() {
  return <ClientPage />
}
