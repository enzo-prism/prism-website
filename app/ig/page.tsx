import type { Metadata } from "next"
import InstagramLandingPage from "./instagram-landing-page"

export const metadata: Metadata = {
  title: "instagram community | prism",
  description:
    "discover how prism transforms entrepreneurial insight into growth-ready websites for ambitious businesses who found us on instagram.",
  alternates: {
    canonical: "https://www.design-prism.com/ig",
  },
}

export default function IGPage() {
  return <InstagramLandingPage />
}
