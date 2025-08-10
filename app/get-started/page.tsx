import type { Metadata } from "next"
import ClientGetStartedPage from "./ClientGetStartedPage"

export const metadata: Metadata = {
  title: "Beautiful work. Measurable growth. | Prism",
  description: "Prism fuses world-class design with engineering and analytics to lift leads, conversion rate, and LTV. Limited new client openings monthly. Applications reviewed on the 1st.",
  alternates: {
    canonical: "https://www.design-prism.com/get-started",
  },
}

export default function GetStartedPage() {
  return <ClientGetStartedPage />
}
