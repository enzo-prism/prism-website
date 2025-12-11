import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "prism growth engine for local businesses",
  description:
    "launch high-converting websites, paid ads, and local seo with one partner so your small business gets found, trusted, and chosen.",
  alternates: {
    canonical: "/",
  },
}

import ClientPage from "./client-page"

export default function Home() {
  return <ClientPage />
}
