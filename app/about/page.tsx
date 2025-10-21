import type { Metadata } from "next"
import AboutClientPage from "./client-page"

export const metadata: Metadata = {
  title: "About Prism | Enzo Sison & Team",
  description:
    "Meet founder Enzo Sison and the mission behind Prism, combining elite design craft, data-driven growth, and an Olympic mindset for every client engagement.",
  alternates: {
    canonical: "https://www.design-prism.com/about",
  },
}

export default function AboutPage() {
  return (
    <>
      <AboutClientPage />
    </>
  )
}
