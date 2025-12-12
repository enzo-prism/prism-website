import type { Metadata } from "next"
export const metadata: Metadata = {
  title: {
    absolute: "Prism | Websites, Local SEO & Ads for Local Businesses",
  },
  description:
    "Prism builds high-converting websites, local SEO, and paid ads for local businesses. One partner for design, engineering, and growth.",
  alternates: {
    canonical: "/",
  },
}

import ClientPage from "./client-page"

export default function Home() {
  return <ClientPage />
}
