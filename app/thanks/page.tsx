import type { Metadata } from "next"
import ThanksPageClient from "./client-page"

export const metadata: Metadata = {
  title: "payment received | thank you from prism",
  description: "thanks for your payment—our team will send onboarding details and next steps so we can get your project moving.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.design-prism.com/thanks",
  },
}

export default function ThanksPage() {
  return <ThanksPageClient />
}
