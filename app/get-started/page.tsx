import type { Metadata } from "next"
import ClientGetStartedPage from "./ClientGetStartedPage"
// removed Typeform embed script; page now links out to Typeform

export const metadata: Metadata = {
  title: "Apply to Work with Prism | Limited Spots for Growth Partners",
  description:
    "24-hour response to your application. Free audit on your website, ads, or local listing—keep the insights even if we don’t work together.",
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
