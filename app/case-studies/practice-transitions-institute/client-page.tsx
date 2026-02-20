import MinimalCaseStudyPage from "@/components/case-study-minimal"

const quickFacts = [
  { label: "segment", value: "consulting" },
  { label: "location", value: "san mateo, ca" },
  { label: "client since", value: "june 2025" },
  { label: "services", value: "website, local listing optimization" },
  { label: "website", value: "practicetransitionsinstitute.com", href: "https://practicetransitionsinstitute.com" },
]

const sections = [
  {
    id: "mission",
    title: "aligning message with mission",
    description: "practice transitions institute guides dentists through mergers, acquisitions, and ownership shifts.",
    bullets: [
      "developed narrative pillars around readiness, valuation, and leadership alignment",
      "structured service pages for buyers, sellers, and advisors with clear next steps",
      "captured proof points and testimonials to build trust with both solo and group practices",
    ],
  },
  {
    id: "digital-rollout",
    title: "digital rollout foundations",
    description: "our first milestone delivered clarity, credibility, and a way to measure interest.",
    bullets: [
      "launched a modern, mobile-first website that directs dentists to resources and consultations",
      "optimized local presence and directory listings to reinforce authority in the bay area",
      "implemented analytics to track lead quality by service line and referral source",
    ],
  },
]

const comingSoon = {
  title: "deal stories and metrics coming soon",
  description:
    "detailed transition playbooks, client spotlights, and pipeline metrics are being produced and will be layered into this study.",
  bullets: ["video case story", "lead pipeline insights", "client testimonials"],
}

const cta = {
  title: "showcase your consulting expertise online",
  body: "we help advisory teams explain complex services, prove outcomes, and guide prospects toward the right engagement.",
  trackLabel: "practice transitions institute case study cta",
}

const heroButton = {
  label: "visit practicetransitionsinstitute.com",
  href: "https://practicetransitionsinstitute.com",
  trackLabel: "practice transitions institute website",
}

const share = {
  url: "https://www.design-prism.com/case-studies/practice-transitions-institute",
  title: "practice transitions institute × prism case study",
  description: "dental consulting storytelling with modern web design and local search readiness.",
}

const schema = {
  title: "practice transitions institute — consulting launchpad",
  description:
    "how we are supporting practice transitions institute with a focused website, local presence, and results tracking.",
  url: "https://www.design-prism.com/case-studies/practice-transitions-institute",
  clientName: "Practice Transitions Institute",
  outcome: "delivered narrative, modern web design, and analytics groundwork for dental consulting growth.",
  datePublished: "2025-06-01T00:00:00.000Z",
  dateModified: "2025-06-01T00:00:00.000Z",
}

export default function PracticeTransitionsInstituteCaseStudy() {
  return (
    <MinimalCaseStudyPage
      caseStudySlug="practice-transitions-institute"
      pageTrackingTitle="Practice Transitions Institute Case Study"
      heroTitle="practice transitions institute — consulting launchpad"
      heroSubtitle="making complex practice transitions easy to understand online"
      summary="practice transitions institute partnered with prism to articulate their transition playbook, elevate credibility, and set up measurement across every lead source."
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
