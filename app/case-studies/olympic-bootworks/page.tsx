import type { Metadata } from "next"
import OlympicBootworksPage from "./client-page"

export const metadata: Metadata = {
  title: "Olympic Bootworks Case Study — Always-Open Revenue Engine",
  description:
    "discover how prism transformed olympic bootworks from a dated squarespace template to a lightning-fast e-commerce powerhouse with real-time inventory sync and 24/7 booking engine.",
  openGraph: {
    title: "Olympic Bootworks × Prism Case Study",
    description: "from 10/100 online to always-open revenue engine - full digital transformation case study",
    images: [],
  },
}

export default function OlympicBootworksCase() {
  return <OlympicBootworksPage />
}
