import type { Metadata } from "next"
import AboutClientPage from "./client-page"

export const metadata: Metadata = {
  title: "about prism | enzo sison & team",
  description:
    "meet founder enzo sison and the mission behind prism, combining elite design craft, data-driven growth, and an olympic mindset for every client engagement.",
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
