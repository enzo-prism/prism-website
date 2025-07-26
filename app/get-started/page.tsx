import type { Metadata } from "next"
import ClientGetStartedPage from "./ClientGetStartedPage"

export const metadata: Metadata = {
  title: "join the waitlist",
  description: "prism is at capacity but accepting applications from exceptional companies. apply to join our exclusive waitlist.",
}

export default function GetStartedPage() {
  return <ClientGetStartedPage />
}
