import MinimalCaseStudyPage from "@/components/case-study-minimal"

const quickFacts = [
  { label: "segment", value: "nonprofit" },
  { label: "location", value: "palo alto, ca" },
  { label: "client since", value: "march 2025" },
  { label: "services", value: "website" },
  { label: "website", value: "canaryfoundation.org", href: "https://www.canaryfoundation.org" },
]

const sections = [
  {
    id: "goal",
    title: "the goal",
    description: "early cancer detection needs a digital presence that mobilizes support quickly.",
    bullets: [
      "simplified how research initiatives, events, and donor programs surface across the site",
      "crafted storytelling blocks that spotlight breakthroughs and human impact side by side",
      "outlined contributor journeys for donors, researchers, and advocates with distinct calls to action",
    ],
  },
  {
    id: "build",
    title: "what we are building",
    description: "we focused on clear communication, accessibility, and trust from the very first interaction.",
    bullets: [
      "developed a modern, accessible design system that keeps focus on the mission",
      "implemented modular impact sections so the team can highlight new milestones quickly",
      "set up analytics and crm integrations to connect campaigns with giving outcomes",
    ],
  },
]

const comingSoon = {
  title: "impact highlights on the way",
  description:
    "detailed campaign metrics, supporter spotlights, and a behind-the-scenes walkthrough of the redesign will be added soon.",
  bullets: ["video story", "donor journey analytics", "research partner interviews"],
}

const cta = {
  title: "tell your mission with clarity",
  body: "we help nonprofits translate complex impact into digital experiences that mobilize donors and partners.",
  trackLabel: "canary foundation case study cta",
}

const share = {
  url: "https://www.design-prism.com/case-studies/canary-foundation",
  title: "canary foundation × prism case study",
  description: "nonprofit storytelling with modern web design and supporter experience foundations.",
}

const schema = {
  title: "canary foundation — mission-driven web refresh",
  description:
    "how we are partnering with canary foundation to modernize their website, share impact, and support donor journeys.",
  url: "https://www.design-prism.com/case-studies/canary-foundation",
  clientName: "Canary Foundation",
  outcome: "delivered storytelling structure, modular design, and analytics groundwork for mission growth.",
  datePublished: "2025-03-01T00:00:00.000Z",
  dateModified: "2025-03-01T00:00:00.000Z",
}

export default function CanaryFoundationCaseStudy() {
  return (
    <MinimalCaseStudyPage
      caseStudySlug="canary-foundation"
      pageTrackingTitle="Canary Foundation Case Study"
      heroTitle="canary foundation — mission-driven web refresh"
      heroSubtitle="amplifying early cancer detection efforts with a modern digital presence"
      summary="canary foundation partnered with prism to tell their mission clearly online, highlight research progress, and streamline donor journeys."
      quickFacts={quickFacts}
      sections={sections}
      comingSoon={comingSoon}
      share={share}
      schema={schema}
      cta={cta}
    />
  )
}
