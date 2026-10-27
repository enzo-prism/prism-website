import type { Metadata } from "next"
import AboutClientPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'About',
  description: 'Meet Prism founder Enzo Sison and learn about the work behind our website design, content, ads, and AEO for small businesses.',
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <AboutClientPage />
    </>
  )
}
