import type { Metadata } from "next"
import ToolsPageClient from "./ToolsPageClient"

export const metadata: Metadata = {
  title: "Free Business Tools - ROI Calculator | Prism Agency",
  description: "Free business tools including a website ROI calculator. Discover how much revenue a professionally designed website could generate for your business.",
  openGraph: {
    title: "Free Business Tools - Prism Agency",
    description: "Free ROI calculator and business tools to help you understand the potential return on investment from professional web design.",
    url: "https://design-prism.com/tools",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism Agency Business Tools",
      },
    ],
  },
}

export default function ToolsPage() {
  return <ToolsPageClient />
}