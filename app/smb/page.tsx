import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import SeoTextSection from "@/components/seo-text-section"
import type { Metadata } from "next"
import SMBClientPage from "./client-page"

export const metadata: Metadata = {
  title: "small business ai — gpt‑5 by prism",
  description:
    "leverage gpt‑5 across marketing, ops, and support. prism sets up, trains, and tunes ai tailored to your small business.",
  openGraph: {
    title: "small business ai — gpt‑5 by prism",
    description:
      "leverage gpt‑5 across marketing, ops, and support. prism sets up, trains, and tunes ai tailored to your small business.",
    url: "https://design-prism.com/smb",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism — Small Business AI (GPT‑5)",
      },
    ],
  },
}

export default function SMBPage() {
  return (
    <>
      <Navbar />
      <main>
        <SMBClientPage />
        <SeoTextSection title="small business ai setup">
          <p>
            we implement practical ai into small business workflows—lead handling, support replies,
            content drafting, and measurement. our approach favors accuracy, governance, and simple
            automations that save hours every week without adding risk.
          </p>
        </SeoTextSection>
      </main>
      <Footer />
    </>
  )
}


