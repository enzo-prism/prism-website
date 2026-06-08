import type { Metadata } from "next"
import AboutClientPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'About Enzo Sison & the Prism team',
  description: 'Meet Enzo Sison and the team behind Prism, and the design, SEO, paid media, and growth-systems work we do for local brands and practices.',
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <AboutClientPage />
    </>
  )
}
