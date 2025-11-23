import MinimalCaseStudyPage from "@/components/case-study-minimal"

const quickFacts = [
  { label: "segment", value: "professional development" },
  { label: "location", value: "united states" },
  { label: "client since", value: "april 2025" },
  { label: "services", value: "website, conversion flows, analytics" },
  { label: "website", value: "dentistretreat.com", href: "https://dentistretreat.com" },
]

const sections = [
  {
    id: "starting-point",
    title: "where we started",
    description: "the retreat needed a credible, mobile-first site that moved visitors from curiosity to booking.",
    bullets: [
      "mapped the agenda, speaker lineup, and lodging details into scannable sections with anchored navigation",
      "clarified pricing and inclusions to reduce back-and-forth before attendees committed",
      "set up lead capture for both individual bookings and group inquiries",
    ],
  },
  {
    id: "foundation",
    title: "what we launched",
    description: "we focused on clarity, momentum, and measurement so marketing could scale confidently.",
    bullets: [
      "designed a conversion-first landing page with sticky ctas for apply, inquire, and downloadables",
      "structured faq, travel, and schedule content for fast answers on mobile",
      "implemented analytics and event tracking to see which channels drive applications and calls",
    ],
  },
]

const comingSoon = {
  title: "performance highlights on deck",
  description:
    "attendee feedback, channel performance, and funnel metrics will be added as the next retreat cohort wraps.",
  bullets: ["channel roi", "application-to-attendance rate", "attendee testimonials"],
}

const cta = {
  title: "need a high-converting retreat site?",
  body: "we’ll design the storytelling, calls-to-action, and tracking that turn interest into booked seats.",
  trackLabel: "leadership retreat case study cta",
}

const share = {
  url: "https://www.design-prism.com/case-studies/leadership-retreat",
  title: "leadership retreat × prism case study",
  description: "conversion-friendly retreat site with clear agenda, speakers, and booking paths.",
}

const schema = {
  title: "leadership retreat — conversion-first landing experience",
  description:
    "how we built a conversion-friendly retreat site with clear agenda, speakers, and booking paths.",
  url: "https://www.design-prism.com/case-studies/leadership-retreat",
  clientName: "Leadership Retreat",
  outcome: "delivered a mobile-first retreat site with anchored agenda, pricing clarity, and tracked conversions.",
  datePublished: "2025-04-10T00:00:00.000Z",
  dateModified: "2025-04-10T00:00:00.000Z",
}

export default function LeadershipRetreatCaseStudy() {
  return (
    <MinimalCaseStudyPage
      pageTrackingTitle="Leadership Retreat Case Study"
      heroTitle="leadership retreat — conversion-first landing experience"
      heroSubtitle="making it easy to review the agenda, trust the experience, and apply fast"
      summary="leadership retreat partnered with prism to ship a concise, trustworthy landing experience—complete with agenda, speakers, and frictionless apply paths—that converts interest into booked seats."
      quickFacts={quickFacts}
      sections={sections}
      comingSoon={comingSoon}
      share={share}
      schema={schema}
      cta={cta}
    />
  )
}

