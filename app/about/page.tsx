import type { Metadata } from "next"
import AboutClientPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "About Enzo Sison + team",
  description: "Meet Enzo Sison and the Prism team behind our website design, SEO, paid media, and growth systems work for local brands.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <AboutClientPage />
    </>
  )
}
