import type { Metadata } from "next"
import ReplitBuilderPage from "./client-page"

export const metadata: Metadata = {
  title: "Replit Builder Contract Role | Prism Careers",
  description:
    "Join our lean studio shipping fast, beautiful sites inside Replit. Use Replit Agent, Replit DB, and Vercel v0 in a remote contract role.",
  openGraph: {
    title: "Replit Builder Contract Role | Prism Careers",
    description:
      "Join our lean studio shipping fast, beautiful sites inside Replit. Use Replit Agent, Replit DB, and Vercel v0 in a remote contract role.",
    images: ["/prism-opengraph.png"]
  },
  alternates: {
    canonical: "https://design-prism.com/careers/replit-builder"
  }
}

export default function ReplitBuilderJobPage() {
  return <ReplitBuilderPage />
}
