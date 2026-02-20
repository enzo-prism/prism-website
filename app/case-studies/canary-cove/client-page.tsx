import MinimalCaseStudyPage from "@/components/case-study-minimal"

const quickFacts = [
  { label: "segment", value: "private vacation property" },
  { label: "location", value: "san pedro, belize" },
  { label: "client since", value: "march 2025" },
  { label: "services", value: "website" },
  { label: "website", value: "canarycove.com", href: "https://canarycove.com" },
]

const sections = [
  {
    id: "vision",
    title: "translating the retreat experience",
    description: "we set out to capture canary cove’s sense of place across every screen.",
    bullets: [
      "crafted storytelling around the private island residence, experiences, and concierge services",
      "planned a media library that balances cinematic imagery with fast-loading performance",
      "built itineraries and amenity highlights that help guests visualize their stay day by day",
    ],
  },
  {
    id: "digital-journey",
    title: "designing the digital journey",
    description: "from discovery to booking, every touchpoint needed to feel personal and effortless.",
    bullets: [
      "designed a polished, mobile-first site with clear inquiry paths for families, retreats, and celebrations",
      "connected the booking conversation to crm and concierge workflows for quick follow-up",
      "set up analytics to understand which experiences and visuals spark the most interest",
    ],
  },
]

const comingSoon = {
  title: "current outcomes snapshot",
  description:
    "this page now captures the strategic foundation, launch scope, and measurable signals available today. we will continue to append deeper metrics and stories as new reporting windows close.",
  bullets: ["strategy and positioning complete", "launch and tracking foundations live", "ongoing optimization cadence in motion"],
}

const cta = {
  title: "elevate your destination’s digital welcome",
  body: "we help hospitality brands translate on-site experiences into online storytelling that converts inquiries into stays.",
  trackLabel: "canary cove case study cta",
}

const share = {
  url: "https://www.design-prism.com/case-studies/canary-cove",
  title: "canary cove × prism case study",
  description: "luxury retreat storytelling with modern web design and guest journey planning.",
}

const schema = {
  title: "canary cove — private retreat storytelling",
  description:
    "how we are crafting a refined digital experience for canary cove with immersive visuals, booking clarity, and brand cohesion.",
  url: "https://www.design-prism.com/case-studies/canary-cove",
  clientName: "Canary Cove",
  outcome: "delivered storytelling, booking flows, and analytics groundwork for a private retreat experience.",
  datePublished: "2025-03-01T00:00:00.000Z",
  dateModified: "2025-03-01T00:00:00.000Z",
}

export default function CanaryCoveCaseStudy() {
  return (
    <MinimalCaseStudyPage
      pageTrackingTitle="Canary Cove Case Study"
      heroTitle="canary cove — private retreat storytelling"
      heroSubtitle="capturing a private belize retreat with an elegant, conversion-ready web experience"
      summary="canary cove partnered with prism to translate their secluded luxury experience into an online journey that feels personal from the first glance."
      quickFacts={quickFacts}
      sections={sections}
      comingSoon={comingSoon}
      share={share}
      schema={schema}
      cta={cta}
    />
  )
}
