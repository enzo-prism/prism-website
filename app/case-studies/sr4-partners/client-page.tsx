import MinimalCaseStudyPage from "@/components/case-study-minimal"

const quickFacts = [
  { label: "segment", value: "consulting" },
  { label: "location", value: "chicago, il" },
  { label: "client since", value: "july 2025" },
  { label: "services", value: "website" },
  { label: "website", value: "sr4partners.com", href: "https://www.sr4partners.com" },
]

const sections = [
  {
    id: "clarity",
    title: "bringing clarity to complex work",
    description: "sr4 partners advises leaders navigating cultural transformation. our first job: clarify the story.",
    bullets: [
      "workshopped positioning statements that translate enterprise language into human, outcomes-led copy",
      "mapped service pillars to clear navigation and modular landing sections for future campaigns",
      "established visual direction that balances executive credibility with approachability",
    ],
  },
  {
    id: "experience",
    title: "experience foundations",
    description: "with the narrative aligned, we turned to the digital experience that supports it.",
    bullets: [
      "built a lightweight, modular site architecture that highlights case narratives and leadership perspectives",
      "implemented analytics guardrails to capture content engagement and inbound lead sources",
      "outlined a publishing rhythm for insights so the website stays active between major launches",
    ],
  },
]

const comingSoon = {
  title: "full results on their way",
  description:
    "analytics benchmarks, testimonial pulls, and a behind-the-scenes conversation with the sr4 partners team are being captured now.",
  bullets: ["video story", "lead funnel performance", "executive testimonials"],
}

const cta = {
  title: "tell the story behind your consulting work",
  body: "we help advisory firms present outcomes, thinking, and credibility in a way that drives the next conversation.",
  trackLabel: "sr4 partners case study cta",
}

const share = {
  url: "https://www.design-prism.com/case-studies/sr4-partners",
  title: "sr4 Partners × Prism Case Study",
  description: "consulting brand clarity through modern web design and analytics essentials.",
}

const schema = {
  title: "sr4 partners — consulting presence refresh",
  description:
    "how we are shaping a trusted digital presence for sr4 partners with messaging clarity, modular web design, and analytics foundations.",
  url: "https://www.design-prism.com/case-studies/sr4-partners",
  clientName: "sr4 Partners",
  outcome: "delivered narrative, design, and measurement groundwork for consulting brand growth.",
  datePublished: "2025-07-01T00:00:00.000Z",
  dateModified: "2025-07-01T00:00:00.000Z",
}

export default function Sr4PartnersCaseStudy() {
  return (
    <MinimalCaseStudyPage
      pageTrackingTitle="sr4 Partners Case Study"
      heroTitle="sr4 partners — consulting presence refresh"
      heroSubtitle="translating culture-first advisory work into a modern digital presence"
      summary="sr4 partners engaged prism to articulate their point of view online and create a modular website that supports enterprise transformation engagements."
      quickFacts={quickFacts}
      sections={sections}
      comingSoon={comingSoon}
      share={share}
      schema={schema}
      cta={cta}
    />
  )
}
