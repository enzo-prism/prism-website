import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import type { Metadata } from "next"
import WallOfLoveClientPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Client reviews',
  description: 'Read real reviews from dental practices, nonprofits, and local brands that work with Prism.',
  path: "/wall-of-love",
  ogImage: "/prism-opengraph.png",
})

export default function WallOfLovePage() {
  return (
    <>
      <Navbar />
      <WallOfLoveClientPage />
      <Footer />
    </>
  )
}
