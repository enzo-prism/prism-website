import MinimalCaseStudyPage from "@/components/case-study-minimal"

const quickFacts = [
  { label: "segment", value: "endodontics" },
  { label: "location", value: "santa rosa, ca" },
  { label: "client since", value: "june 2025" },
  { label: "services", value: "website, local listing optimization" },
  { label: "website", value: "winecountryrootcanal.com", href: "https://www.winecountryrootcanal.com" },
]

const sections = [
  {
    id: "practice-needs",
    title: "what the practice needed first",
    description: "a specialty dental team needed a digital experience that matched their chairside care.",
    bullets: [
      "captured the differentiators of advanced endodontic treatment for anxious and referral-based patients",
      "structured treatment pages and faq content to answer urgent questions before the first call",
      "outlined referral workflows so partner dentists can send cases with confidence",
    ],
  },
  {
    id: "foundations-laid",
    title: "foundations laid",
    description: "we focused on the essentials that keep high-intent patients moving forward.",
    bullets: [
      "designed a clean, calming website with clear service navigation and rapid contact access",
      "built localized landing blocks and schema to lift visibility across sonoma county searches",
      "implemented measurement guardrails to track calls, forms, and referral sources from day one",
    ],
  },
]

const comingSoon = {
  title: "metrics and patient stories on the way",
  description:
    "call conversion rates, search visibility trends, and an inside look at the treatment day experience are in production.",
  bullets: ["video walk-through", "performance dashboard snapshots", "referring dentist testimonials"],
}

const cta = {
  title: "elevate your specialty practice online",
  body: "we build calm, credible websites and local search systems that earn trust before a patient ever walks in.",
  trackLabel: "wine country root canal case study cta",
}

const heroButton = {
  label: "visit winecountryrootcanal.com",
  href: "https://www.winecountryrootcanal.com",
  trackLabel: "wine country root canal website",
}

const share = {
  url: "https://www.design-prism.com/case-studies/wine-country-root-canal",
  title: "wine country root canal × prism case study",
  description: "endodontic growth groundwork with website, local presence, and analytics readiness.",
}

const schema = {
  title: "wine country root canal — endodontic growth system",
  description:
    "how we are shaping the wine country root canal patient journey with a modern website, localized presence, and analytics foundation.",
  url: "https://www.design-prism.com/case-studies/wine-country-root-canal",
  clientName: "Wine Country Root Canal",
  outcome: "delivered calming website design, local visibility tactics, and measurement rollout for specialty care.",
  datePublished: "2025-06-01T00:00:00.000Z",
  dateModified: "2025-06-01T00:00:00.000Z",
}

export default function WineCountryRootCanalCaseStudy() {
  return (
    <MinimalCaseStudyPage
      pageTrackingTitle="Wine Country Root Canal Case Study"
      heroTitle="wine country root canal — endodontic growth system"
      heroSubtitle="pairing specialty credibility with a smooth patient journey"
      summary="wine country root canal turned to prism for a calm, trustworthy website and local search presence that reflect the precision of their endodontic care."
      showDentalWebsiteSystemLink
      heroButton={heroButton}
      quickFacts={quickFacts}
      sections={sections}
      comingSoon={comingSoon}
      share={share}
      schema={schema}
      cta={cta}
    />
  )
}
