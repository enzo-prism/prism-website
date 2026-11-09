import type { Metadata } from "next"
import AboutClientPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'About Design Prism and Enzo Sison',
  description: 'Meet Enzo Sison, founder of Prism (Design Prism), and the work behind our website design, content, ads, and AEO for small businesses.',
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <AboutClientPage />
    </>
  )
}
