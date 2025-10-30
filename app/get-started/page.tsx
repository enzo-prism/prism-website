import type { Metadata } from "next"
import ClientGetStartedPage from "./ClientGetStartedPage"

export const metadata: Metadata = {
  title: "claim your free online presence report | prism",
  description:
    "get a custom online presence report within 48 hours. fill out a 2 minute form so prism can analyze your website, listings, ads, and ai search visibility.",
  alternates: {
    canonical: "https://www.design-prism.com/get-started",
  },
}

export default function GetStartedPage() {
  return (
    <>
      <ClientGetStartedPage />
    </>
  )
}
