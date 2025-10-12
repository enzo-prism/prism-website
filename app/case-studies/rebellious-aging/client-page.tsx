import MinimalCaseStudyPage from "@/components/case-study-minimal"

const quickFacts = [
  { label: "segment", value: "online community" },
  { label: "location", value: "los gatos, ca" },
  { label: "client since", value: "march 2025" },
  { label: "services", value: "website, local listing optimization" },
  { label: "website", value: "rebelwithsuz.com", href: "https://rebelwithsuz.com" },
]

const sections = [
  {
    id: "starting-point",
    title: "where we started",
    description: "setting the table for a community-led space meant understanding how members already gather.",
    bullets: [
      "audited the existing site, mailing list, and social touchpoints to uncover gaps in the journey",
      "mapped stories, programs, and events to clear entry points for curious visitors and long-time members",
      "outlined a content structure that can scale with future resources, guides, and event recaps",
    ],
  },
  {
    id: "first-moves",
    title: "first moves",
    description: "with priorities aligned, we focused on the foundations that invite people back again and again.",
    bullets: [
      "wireframed a refreshed website with welcoming copy, community pillars, and frictionless sign-up paths",
      "organized local listing data to anchor credibility and improve discovery in bay area searches",
      "established analytics, conversion checkpoints, and a content cadence to measure engagement over time",
    ],
  },
]

const comingSoon = {
  title: "next, we document the momentum",
  description:
    "member stories, analytics lifts, and a filmed founder interview are in production. check back soon for the full narrative and performance metrics.",
  bullets: ["video story", "engagement highlights", "member testimonials"],
}

const cta = {
  title: "design a digital home that mirrors your community",
  body: "whether you host meetups or run a global forum, we can create the flows that welcome, orient, and retain members.",
  trackLabel: "rebellious aging case study cta",
}

const share = {
  url: "https://www.design-prism.com/case-studies/rebellious-aging",
  title: "Rebellious Aging × Prism Case Study",
  description: "community platform foundations with website refresh and local discovery groundwork.",
}

const schema = {
  title: "rebellious aging — community platform foundations",
  description:
    "how we are rebuilding the rebellious aging digital home with clear journeys, member spotlights, and local discovery.",
  url: "https://www.design-prism.com/case-studies/rebellious-aging",
  clientName: "Rebellious Aging",
  outcome: "established refreshed website architecture and discovery groundwork for community growth.",
  datePublished: "2025-03-01T00:00:00.000Z",
  dateModified: "2025-03-01T00:00:00.000Z",
}

export default function RebelliousAgingCaseStudy() {
  return (
    <MinimalCaseStudyPage
      pageTrackingTitle="Rebellious Aging Case Study"
      heroTitle="rebellious aging — community platform foundations"
      heroSubtitle="building a welcoming digital home for every stage of the journey"
      summary="rebellious aging invited prism to modernize their web presence and create clear, repeatable paths for members discovering resources, events, and support."
      quickFacts={quickFacts}
      sections={sections}
      comingSoon={comingSoon}
      share={share}
      schema={schema}
      cta={cta}
    />
  )
}
