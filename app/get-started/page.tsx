import SeoTextSection from "@/components/seo-text-section"
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
  return (
    <>
      <ClientGetStartedPage />
      <SeoTextSection title="our onboarding process">
        <p>
          onboarding is simple: we align on outcomes, define scope, and set milestones. you get a clear
          plan covering research, design, development, content, qa, and launch—with analytics built in.
          most projects ship in tight, weekly cycles so you see progress fast.
        </p>
      </SeoTextSection>
    </>
  )
}
