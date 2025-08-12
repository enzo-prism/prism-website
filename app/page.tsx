import SeoTextSection from "@/components/seo-text-section"
import WhatWeDo from "@/components/what-we-do"
import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "prism - beautiful software that grows revenue",
  description: "prism agency creates beautiful websites, apps, and designs that shatter revenue goals for ambitious businesses. ai-powered digital solutions that convert visitors into customers.",
}

export default function Home() {
  return (
    <>
      <ClientPage />

      {/* Move What We Do near the bottom for all breakpoints */}
      <WhatWeDo className="pb-8" />

      {/* SEO supporting copy - visually minimal */}
      <SeoTextSection title="what prism does">
        <p>
          prism designs and builds fast, accessible websites and mobile apps that convert visitors into
          customers. we combine clean design systems with measurement and ai‑assisted workflows, so every
          page loads quickly, reads clearly, and drives outcomes. if you need a new site, an app, or a
          growth program that compounds, we build the stack end‑to‑end.
        </p>
      </SeoTextSection>
    </>
  )
}
