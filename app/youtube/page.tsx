import type { Metadata } from "next"
import YouTubeLandingPage from "./youtube-landing-page"

export const metadata: Metadata = {
  title: "youtube community | prism",
  description:
    "explore the exact youtube tactics prism uses to build modern growth systems for ambitious brands and business owners.",
  alternates: {
    canonical: "https://www.design-prism.com/youtube",
  },
}

export default function YouTubePage() {
  return <YouTubeLandingPage />
}
