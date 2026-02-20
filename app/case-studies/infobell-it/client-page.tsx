import MinimalCaseStudyPage from "@/components/case-study-minimal"

const quickFacts = [
  { label: "segment", value: "it services" },
  { label: "location", value: "to be announced" },
  { label: "client since", value: "october 2025" },
  { label: "services", value: "website" },
  { label: "website", value: "infobellit.com", href: "https://www.infobellit.com" },
]

const sections = [
  {
    id: "positioning",
    title: "positioning the platform",
    description: "infobell it delivers managed solutions for growing companies. we began by clarifying the offer.",
    bullets: [
      "interviewed stakeholders to translate technical capabilities into benefit-led language",
      "organized service tiers and industries to guide prospects to the right solution quickly",
      "mapped a conversion path for outbound, inbound, and partner-driven leads",
    ],
  },
  {
    id: "experience-foundations",
    title: "experience foundations",
    description: "the first release focuses on clarity, credibility, and measurement.",
    bullets: [
      "designed a clean, modular website system that scales with new product lines",
      "implemented lightweight motion and iconography to reinforce reliability without clutter",
      "embedded analytics checkpoints to watch demo requests, support calls, and knowledge-base usage",
    ],
  },
]

const comingSoon = {
  title: "performance highlights coming soon",
  description:
    "conversion lifts, customer spotlights, and a walkthrough of the support center are in progress and will be added shortly.",
  bullets: ["video overview", "traffic-to-demo insights", "client testimonials"],
}

const cta = {
  title: "translate complex it services into clear stories",
  body: "we help it firms express their value in plain language and set up the systems that prove results.",
  trackLabel: "infobell it case study cta",
}

const share = {
  url: "https://www.design-prism.com/case-studies/infobell-it",
  title: "infobell it × prism case study",
  description: "it services storytelling through modern web design and analytics setup.",
}

const schema = {
  title: "infobell it — saas enablement foundations",
  description:
    "how we are partnering with infobell it to build a modern website, clarify offerings, and set up performance tracking.",
  url: "https://www.design-prism.com/case-studies/infobell-it",
  clientName: "Infobell IT",
  outcome: "delivered positioning, modular web design, and analytics groundwork for it services growth.",
  datePublished: "2025-10-01T00:00:00.000Z",
  dateModified: "2025-10-01T00:00:00.000Z",
}

export default function InfobellItCaseStudy() {
  return (
    <MinimalCaseStudyPage
      caseStudySlug="infobell-it"
      pageTrackingTitle="Infobell IT Case Study"
      heroTitle="infobell it — saas enablement foundations"
      heroSubtitle="clarifying a technical offer with a modern, modular web home"
      summary="infobell it tapped prism to translate their managed it solutions into an approachable digital experience with clear messaging and trackable results."
      quickFacts={quickFacts}
      sections={sections}
      comingSoon={comingSoon}
      share={share}
      schema={schema}
      cta={cta}
    />
  )
}
