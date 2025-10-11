import type { Metadata } from "next"
import ClientGetStartedPage from "./ClientGetStartedPage"

export const metadata: Metadata = {
  title: "Claim Your Free Online Presence Report | Prism",
  description:
    "Get a custom online presence report within 48 hours. Fill out a 2 minute form so Prism can analyze your website, listings, ads, and AI search visibility.",
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
