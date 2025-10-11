import type { Metadata } from "next"
import ReplitBuilderPage from "./client-page"

export const metadata: Metadata = {
  title: "contract replit builder | prism careers",
  description:
    "join our lean studio shipping fast, beautiful websites entirely inside replit. work with replit agent, replit db, and vercel v0. remote, part-time contract role.",
  openGraph: {
    title: "contract replit builder | prism careers",
    description:
      "join our lean studio shipping fast, beautiful websites entirely inside replit. work with replit agent, replit db, and vercel v0. remote, part-time contract role.",
    images: ["/prism-opengraph.png"]
  },
  alternates: {
    canonical: "https://design-prism.com/careers/replit-builder"
  }
}

export default function ReplitBuilderJobPage() {
  return <ReplitBuilderPage />
}
