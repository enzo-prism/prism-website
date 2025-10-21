import type { Metadata } from "next"
import ThanksPageClient from "./client-page"

export const metadata: Metadata = {
  title: "Payment Received | Thank You from Prism",
  description: "Thanks for your payment—our team will send onboarding details and next steps so we can get your project moving.",
}

export default function ThanksPage() {
  return <ThanksPageClient />
}
