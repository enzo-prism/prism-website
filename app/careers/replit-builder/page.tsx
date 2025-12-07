import type { Metadata } from "next"
import ReplitBuilderPage from "./client-page"

export const metadata: Metadata = {
  title: "replit builder contract role | prism careers",
  description:
    "join our lean studio shipping fast, beautiful sites inside replit. use replit agent, replit db, and vercel v0 in a remote contract role.",
  openGraph: {
    title: "replit builder contract role | prism careers",
    description:
      "join our lean studio shipping fast, beautiful sites inside replit. use replit agent, replit db, and vercel v0 in a remote contract role.",
    images: ["/prism-opengraph.png"]
  },
  alternates: {
    canonical: "https://www.design-prism.com/careers/replit-builder"
  }
}

export default function ReplitBuilderJobPage() {
  return <ReplitBuilderPage />
}
