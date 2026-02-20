import MinimalCaseStudyPage from "@/components/case-study-minimal"

const quickFacts = [
  { label: "status", value: "coming soon" },
  { label: "client", value: "Wine Country Root Canal" },
  { label: "project", value: "prism case study" },
  { label: "scope", value: "website + growth systems" },
]

const comingSoon = {
  title: "full case study coming soon",
  description:
    "we're finalizing the complete story with verified proof: client context, prism intervention, data windows, live-page artifacts, and outcomes.",
  bullets: ["challenge + context", "prism intervention", "verified outcomes + proof links"],
}

const cta = {
  title: "want this kind of execution for your brand?",
  body: "book a strategy call and we’ll map the highest-leverage path for your website and growth stack.",
  trackLabel: "wine-country-root-canal case study cta",
}

const share = {
  url: "https://www.design-prism.com/case-studies/wine-country-root-canal",
  title: "Wine Country Root Canal × prism case study (coming soon)",
  description: "full case study in progress with verified implementation details and outcomes.",
}

const schema = {
  title: "Wine Country Root Canal — case study coming soon",
  description: "full case study in progress with verified implementation details and outcomes.",
  url: "https://www.design-prism.com/case-studies/wine-country-root-canal",
  clientName: "Wine Country Root Canal",
  outcome: "Full case study narrative and verified evidence are in progress.",
  datePublished: "2026-02-20T00:00:00.000Z",
  dateModified: "2026-02-20T00:00:00.000Z",
}

export default function WineCountryRootCanalCaseStudy() {
  return (
    <MinimalCaseStudyPage
      caseStudySlug="wine-country-root-canal"
      pageTrackingTitle="Wine Country Root Canal Case Study"
      heroTitle="Wine Country Root Canal — case study coming soon"
      heroSubtitle="full breakdown in production"
      summary="we're publishing the full case study soon with validated data, live implementation proof, and clear before/after outcomes."
      quickFacts={quickFacts}
      comingSoon={comingSoon}
      share={share}
      schema={schema}
      cta={cta}
    />
  )
}
