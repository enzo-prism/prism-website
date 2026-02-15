import type { Metadata } from "next"
import AboutClientPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "about prism | enzo sison & team",
  description: "meet founder enzo sison and the mission behind prism, combining elite design craft, data-driven growth, and an olympic mindset for every client engagement.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <AboutClientPage />
    </>
  )
}
