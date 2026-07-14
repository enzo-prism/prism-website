import type { Metadata } from "next"
import AboutClientPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'About',
  description: 'Meet the team behind Prism and learn how we build websites, SEO, ads, and growth systems for local businesses.',
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <AboutClientPage />
    </>
  )
}
