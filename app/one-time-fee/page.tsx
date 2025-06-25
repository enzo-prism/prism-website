import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "one-time design for $600 | prism",
  description: "get a perfect business card, logo, flyer, or any single design crafted by prism's pros for $600. unlimited iterations until you love it.",
}

export default function OneTimeFee() {
  return <ClientPage />
}