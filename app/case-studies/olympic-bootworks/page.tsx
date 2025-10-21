import type { Metadata } from "next"
import OlympicBootworksPage from "./client-page"

export const metadata: Metadata = {
  title: "Olympic Bootworks Case Study | Always-Open Revenue",
  description:
    "discover how prism transformed olympic bootworks from a dated squarespace template into a fast e-commerce experience with inventory sync and an always-on booking engine.",
  openGraph: {
    title: "Olympic Bootworks × Prism Case Study",
    description: "from 10/100 online to always-open revenue engine - full digital transformation case study",
    images: [],
  },
}

export default function OlympicBootworksCase() {
  return <OlympicBootworksPage />
}
