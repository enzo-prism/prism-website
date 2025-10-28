import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Prism Growth Engine for Local Businesses",
  description:
    "Launch high-converting websites, paid ads, and local SEO with one partner so your small business gets found, trusted, and chosen.",
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Prism Growth Engine for Local Businesses</h1>
      <ClientPage />
    </>
  )
}
