import type { Metadata } from "next"
import OlympicBootworksPage from "./client-page"

export const metadata: Metadata = {
  title: "olympic bootworks case study | always-open revenue",
  description:
    "discover how prism transformed olympic bootworks from a dated squarespace template into a fast e-commerce experience with inventory sync and an always-on booking engine.",
  openGraph: {
    title: "olympic bootworks × prism case study",
    description: "from 10/100 online to always-open revenue engine - full digital transformation case study",
    images: [],
  },
}

export default function OlympicBootworksCase() {
  return <OlympicBootworksPage />
}
