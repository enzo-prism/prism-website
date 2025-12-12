import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "one-time design for $750 | prism",
  description: "get a perfect logo, banner, flyer, or any single custom design asset crafted by prism's pros for $750. unlimited revisions until you love it.",
  alternates: {
    canonical: "https://www.design-prism.com/one-time-fee",
  },
}

export default function OneTimeFee() {
  return <ClientPage />
}
