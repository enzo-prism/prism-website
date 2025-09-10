import type { Metadata } from "next"
import ClientGetStartedPage from "./ClientGetStartedPage"
// removed Typeform embed script; page now links out to Typeform

export const metadata: Metadata = {
  title: "Apply to Work with Prism | Prism",
  description: "Apply to work with Prism. We take on a limited number of clients to protect quality. Start with a short application; we respond within 24 hours on weekdays.",
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
