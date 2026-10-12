import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import type { Metadata } from "next"
import WallOfLoveClientPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Wall of Love',
  description: 'Notes from Prism website clients, plus comments from the community that watches Prism videos on Instagram.',
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
