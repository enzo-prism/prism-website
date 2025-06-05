import type { Metadata } from "next"
import ThanksPageClient from "./client-page"

export const metadata: Metadata = {
  title: "thank you",
  description: "thank you for your payment. let's get started on your project.",
}

export default function ThanksPage() {
  return <ThanksPageClient />
}
