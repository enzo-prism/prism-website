import type { Metadata } from "next"
import InstagramLandingPage from "./instagram-landing-page"

export const metadata: Metadata = {
  title: "Instagram Community | Prism",
  description:
    "Discover how Prism transforms entrepreneurial insight into growth-ready websites for ambitious businesses who found us on Instagram.",
}

export default function IGPage() {
  return <InstagramLandingPage />
}
