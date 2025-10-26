import type { Metadata } from "next"
import YouTubeLandingPage from "./youtube-landing-page"

export const metadata: Metadata = {
  title: "YouTube Community | Prism",
  description:
    "Explore the exact YouTube tactics Prism uses to build modern growth systems for ambitious brands and business owners.",
}

export default function YouTubePage() {
  return <YouTubeLandingPage />
}
