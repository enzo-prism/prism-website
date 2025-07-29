import type { Metadata } from "next"
import ClientGetStartedPage from "./ClientGetStartedPage"

export const metadata: Metadata = {
  title: "Elevate Your Brand with Design That Makes Money | Prism",
  description: "Tired of websites that don't convert? Prism fuses stunning design with world-class tech to skyrocket leads, conversions, and LTV. Limited to 10 new clients monthly.",
}

export default function GetStartedPage() {
  return <ClientGetStartedPage />
}
