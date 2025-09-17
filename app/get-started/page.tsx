import type { Metadata } from "next"
import ClientGetStartedPage from "./ClientGetStartedPage"
// removed Typeform embed script; page now links out to Typeform

export const metadata: Metadata = {
  title: "Apply to Work with Prism | Limited Spots for Growth Partners",
  description:
    "Share your goals so we can confirm fit. We onboard a handful of dental practices and local brands each month to protect quality and speed.",
  alternates: {
    canonical: "https://www.design-prism.com/get-started",
  },
}

export default function GetStartedPage() {
  return (
    <>
      <ClientGetStartedPage heroOnly />
      {/* Typeform moved to external link via CTA button in the hero */}
    </>
  )
}
