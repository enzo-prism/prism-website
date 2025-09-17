import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import SeoTextSection from "@/components/seo-text-section"
import type { Metadata } from "next"
import SMBClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Small Business AI Services | GPT-5 Solutions by Prism",
  description:
    "Leverage GPT-5 across marketing, operations, and support. Prism sets up, trains, and tunes AI workflows tailored to your small business.",
  openGraph: {
    title: "Small Business AI Services | GPT-5 Solutions by Prism",
    description:
      "Leverage GPT-5 across marketing, operations, and support. Prism sets up, trains, and tunes AI workflows tailored to your small business.",
    url: "https://design-prism.com/smb",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism — Small Business AI (GPT‑5)",
      },
    ],
  },
}

export default function SMBPage() {
  return (
    <>
      <Navbar />
      <main>
        <SeoTextSection
          title="ai that supports the humans on your team"
          subtitle="we tailor gpt-5 and automation workflows to your business so every response, follow-up, and analysis feels on-brand and compliant."
          variant="compact"
          showDivider={false}
        >
          <p>
            From lead handling to support and operations, we design lightweight agents and systems that plug into your existing stack. We collect proprietary context, write governance rules, and stand up dashboards that measure time saved and revenue won—keeping you in control while giving staff superpowers.
          </p>
          <ul>
            <li><strong>Implementation:</strong> data clean-up, prompt libraries, and API integrations that launch quickly without heavy engineering.</li>
            <li><strong>Training:</strong> team onboarding, playbooks, and QA rituals so output stays accurate as your offers evolve.</li>
            <li><strong>Iteration:</strong> monthly experiments and reporting to expand use cases and compound the ROI.</li>
          </ul>
        </SeoTextSection>
        <SMBClientPage />
        <SeoTextSection title="small business ai setup">
          <p>
            we implement practical ai into small business workflows—lead handling, support replies,
            content drafting, and measurement. our approach favors accuracy, governance, and simple
            automations that save hours every week without adding risk.
          </p>
        </SeoTextSection>
      </main>
      <Footer />
    </>
  )
}
