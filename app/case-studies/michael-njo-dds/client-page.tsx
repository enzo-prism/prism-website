import MinimalCaseStudyPage from "@/components/case-study-minimal"

const quickFacts = [
  { label: "segment", value: "dentistry" },
  { label: "location", value: "bay area, ca" },
  { label: "client since", value: "april 2025" },
  { label: "services", value: "website, local listing optimization, analytics" },
  { label: "website", value: "michaelnjodds.com", href: "https://michaelnjodds.com" },
]

const sections = [
  {
    id: "starting-point",
    title: "where we started",
    description: "dr. njo needed a modern site that instantly communicates trust and drives inquiries.",
    bullets: [
      "audited existing pages and rewrote services to highlight expertise and patient outcomes",
      "structured navigation for preventive, cosmetic, and restorative care with clear ctas",
      "captured photography and reviews to reinforce credibility above the fold",
    ],
  },
  {
    id: "foundation",
    title: "what we launched",
    description: "a credibility-first experience backed by measurement.",
    bullets: [
      "custom, mobile-first site with primary calls to call or request an appointment",
      "local listing optimization and on-page schema for high-intent services",
      "analytics events for calls, forms, and directions to attribute growth by channel",
    ],
  },
]

const comingSoon = {
  title: "metrics and testimonials coming soon",
  description: "detailed performance lifts, patient feedback, and channel metrics will be added after the next quarter.",
  bullets: ["organic traffic lift", "call conversion", "review velocity"],
}

const cta = {
  title: "want a credibility-first dental site?",
  body: "we pair fast, modern design with tracking so every visit can turn into a patient relationship.",
  trackLabel: "michael njo case study cta",
}

const share = {
  url: "https://www.design-prism.com/case-studies/michael-njo-dds",
  title: "michael njo, dds × prism case study",
  description: "credibility-first dental site with service clarity, patient flows, and analytics.",
}

const schema = {
  title: "michael njo, dds — modern dental presence",
  description: "how we launched a credibility-first website with clear services, patient flows, and tracking.",
  url: "https://www.design-prism.com/case-studies/michael-njo-dds",
  clientName: "Michael Njo, DDS",
  outcome: "delivered a modern dental site with clear service paths, local optimization, and analytics.",
  datePublished: "2025-04-10T00:00:00.000Z",
  dateModified: "2025-04-10T00:00:00.000Z",
}

export default function MichaelNjoCaseStudy() {
  return (
    <MinimalCaseStudyPage
      pageTrackingTitle="Michael Njo, DDS Case Study"
      heroTitle="michael njo, dds — modern dental presence"
      heroSubtitle="credibility-first website with clear services, patient flows, and tracking"
      summary="dr. michael njo partnered with prism to relaunch his digital presence with service clarity, trust signals, and measurement that ties calls and form fills back to marketing channels."
      showDentalWebsiteSystemLink
      quickFacts={quickFacts}
      sections={sections}
      comingSoon={comingSoon}
      share={share}
      schema={schema}
      cta={cta}
    />
  )
}
