import type { Metadata } from "next"
import ThanksCallPageClient from "./client-page"

export const metadata: Metadata = {
  title: "call scheduled - thank you",
  description: "your call has been scheduled successfully. join our instagram community while you wait.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThanksCallPage() {
  return <ThanksCallPageClient />
}
