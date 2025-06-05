import type { Metadata } from "next"
import ClientGetStartedPage from "./ClientGetStartedPage"

export const metadata: Metadata = {
  title: "get started",
  description: "schedule a no-commitment consultation with the prism team to discuss your digital goals.",
}

export default function GetStartedPage() {
  return <ClientGetStartedPage />
}
