import SeoTextSection from "@/components/seo-text-section"
import type { Metadata } from "next"
import ClientGetStartedPage from "./ClientGetStartedPage"
// removed Typeform embed script; page now links out to Typeform

export const metadata: Metadata = {
  title: "Apply to Work with Prism | Limited Spots for Growth Partners",
  description:
    "Share your goals so we can confirm fit. We onboard a handful of dental practices and local brands each month to protect quality and speed.",
  alternates: {
    canonical: "https://www.design-prism.com/get-started",
  },
}

export default function GetStartedPage() {
  return (
    <>
      <SeoTextSection
        title="how the application works"
        subtitle="we limit new onboardings each month so that every client gets white-glove attention from the core team."
        variant="compact"
        showDivider={false}
      >
        <p>
          Tell us about your goals, the systems you currently use, and the timeline you’re working toward. We’ll study your site, analytics, and brand before the call so the conversation stays focused on levers that move revenue. If there’s a fit, we outline the engagement, assemble the squad, and start within days—not months.
        </p>
        <ul>
          <li><strong>Step 1:</strong> share context via the short form and pick your preferred kickoff window.</li>
          <li><strong>Step 2:</strong> we respond within one business day with either clarifying questions or a calendar link.</li>
          <li><strong>Step 3:</strong> align on outcomes, locking scope, team, and cadence so you know exactly what ships first.</li>
        </ul>
      </SeoTextSection>
      <ClientGetStartedPage heroOnly />
      {/* Typeform moved to external link via CTA button in the hero */}
    </>
  )
}
