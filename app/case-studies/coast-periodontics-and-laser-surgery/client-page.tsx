import MinimalCaseStudyPage from "@/components/case-study-minimal"

const quickFacts = [
  { label: "segment", value: "periodontics" },
  { label: "location", value: "san luis obispo, ca" },
  { label: "client since", value: "september 2024" },
  { label: "services", value: "website, local listing optimization" },
  { label: "website", value: "coastperiodontics.com", href: "https://www.coastperiodontics.com" },
]

const sections = [
  {
    id: "patient-story",
    title: "reassuring the patient story",
    description: "coast periodontics needed a web presence that calms nerves and builds trust instantly.",
    bullets: [
      "identified the questions patients ask after a referral and surfaced answers within two clicks",
      "wrote procedure explainers and recovery guidance in approachable language",
      "highlighted technology, credentials, and comfort-focused experience across the site",
    ],
  },
  {
    id: "foundation",
    title: "foundation we delivered",
    description: "we focused on clarity, access, and measurement—the pillars of a dependable acquisition system.",
    bullets: [
      "designed a calming, mobile-first site with clear appointment and referral prompts",
      "implemented local listing optimization to reinforce expertise across the central coast",
      "stood up analytics guardrails to monitor calls, form submissions, and referral volume",
    ],
  },
]

const comingSoon = {
  title: "deep-dive metrics coming soon",
  description:
    "case acceptance lifts, local visibility trends, and a clinician interview are in production and will be added to this study.",
  bullets: ["video story", "call conversion insights", "referring dentist testimonials"],
}

const cta = {
  title: "build trust for your specialty practice",
  body: "we help dental specialists create digital experiences that calm patients, support referrals, and prove results.",
  trackLabel: "coast periodontics case study cta",
}

const share = {
  url: "https://www.design-prism.com/case-studies/coast-periodontics-and-laser-surgery",
  title: "coast periodontics & laser surgery × prism case study",
  description: "specialty dental growth groundwork with website design and local presence support.",
}

const schema = {
  title: "coast periodontics & laser surgery — specialty dental foundations",
  description:
    "how we are partnering with coast periodontics & laser surgery to deliver a calm website, local visibility, and conversion tracking essentials.",
  url: "https://www.design-prism.com/case-studies/coast-periodontics-and-laser-surgery",
  clientName: "Coast Periodontics and Laser Surgery",
  outcome: "delivered calming website design, local visibility, and analytics groundwork for specialty dental growth.",
  datePublished: "2024-09-01T00:00:00.000Z",
  dateModified: "2024-09-01T00:00:00.000Z",
}

export default function CoastPeriodonticsCaseStudy() {
  return (
    <MinimalCaseStudyPage
      pageTrackingTitle="Coast Periodontics & Laser Surgery Case Study"
      heroTitle="coast periodontics & laser surgery — specialty dental foundations"
      heroSubtitle="giving patients and referring dentists a calm, trustworthy digital home"
      summary="coast periodontics & laser surgery partnered with prism to pair a reassuring website with local visibility and measurement systems that support every referral."
      quickFacts={quickFacts}
      sections={sections}
      comingSoon={comingSoon}
      share={share}
      schema={schema}
      cta={cta}
    />
  )
}
