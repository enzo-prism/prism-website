import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "one-time design for $750 | prism",
  description: "get a perfect logo, banner, flyer, or any single custom design asset crafted by prism's pros for $750. unlimited revisions until you love it.",
}

export default function OneTimeFee() {
  return <ClientPage />
}