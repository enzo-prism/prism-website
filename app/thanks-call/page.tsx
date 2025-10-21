import type { Metadata } from "next"
import ThanksCallPageClient from "./client-page"

export const metadata: Metadata = {
  title: "Call Scheduled | Thanks from Prism",
  description: "Your call has been scheduled successfully. Join our Instagram community while you wait.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThanksCallPage() {
  return <ThanksCallPageClient />
}
