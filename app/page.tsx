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
    </>
  )
}
