import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "prism growth engine for local businesses",
  description:
    "launch high-converting websites, paid ads, and local seo with one partner so your small business gets found, trusted, and chosen.",
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return (
    <>
      <h1 className="sr-only lowercase">prism growth engine for local businesses</h1>
      <ClientPage />
    </>
  )
}
