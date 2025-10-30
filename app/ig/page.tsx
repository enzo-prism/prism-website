import type { Metadata } from "next"
import InstagramLandingPage from "./instagram-landing-page"

export const metadata: Metadata = {
  title: "instagram community | prism",
  description:
    "discover how prism transforms entrepreneurial insight into growth-ready websites for ambitious businesses who found us on instagram.",
}

export default function IGPage() {
  return <InstagramLandingPage />
}
