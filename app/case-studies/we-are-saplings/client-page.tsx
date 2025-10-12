import MinimalCaseStudyPage from "@/components/case-study-minimal"

const quickFacts = [
  { label: "segment", value: "education" },
  { label: "location", value: "to be announced" },
  { label: "client since", value: "march 2025" },
  { label: "services", value: "website" },
  { label: "website", value: "wearesaplings.com", href: "https://wearesaplings.com" },
]

const sections = [
  {
    id: "story",
    title: "shaping the story",
    description: "we are saplings inspires early learners through curiosity-led curriculum.",
    bullets: [
      "distilled the brand voice into parent-friendly messaging anchored by outcomes, not jargon",
      "organized program tiers so families can compare learning paths at a glance",
      "mapped a future-ready blog and resources hub to share lesson ideas and family activities",
    ],
  },
  {
    id: "experience",
    title: "designing the experience",
    description: "we are crafting a joyful, accessible digital home for parents and educators alike.",
    bullets: [
      "designed a bright, friendly interface with clear calls to explore curriculum, schedule tours, or enroll",
      "outlined onboarding flows that collect student needs while respecting parent time",
      "implemented analytics guardrails to track interest by program, age group, and content category",
    ],
  },
]

const comingSoon = {
  title: "classroom stories coming soon",
  description:
    "video spotlights, enrollment metrics, and new curriculum sneak peeks will join this case study shortly.",
  bullets: ["video story", "enrollment performance", "curriculum highlights"],
}

const cta = {
  title: "bring your education brand to life online",
  body: "we build joyful, conversion-ready experiences that make it easy for families to choose your programs.",
  trackLabel: "we are saplings case study cta",
}

const share = {
  url: "https://www.design-prism.com/case-studies/we-are-saplings",
  title: "We Are Saplings × Prism Case Study",
  description: "education brand clarity with website design and onboarding pathways.",
}

const schema = {
  title: "we are saplings — education platform foundations",
  description:
    "how we are helping we are saplings launch a modern educational platform with clear storytelling and parent-friendly journeys.",
  url: "https://www.design-prism.com/case-studies/we-are-saplings",
  clientName: "We Are Saplings",
  outcome: "delivered joyful website design, enrollment flows, and analytics groundwork for education growth.",
  datePublished: "2025-03-01T00:00:00.000Z",
  dateModified: "2025-03-01T00:00:00.000Z",
}

export default function WeAreSaplingsCaseStudy() {
  return (
    <MinimalCaseStudyPage
      pageTrackingTitle="We Are Saplings Case Study"
      heroTitle="we are saplings — education platform foundations"
      heroSubtitle="pairing joyful storytelling with a modern enrollment journey"
      summary="we are saplings asked prism to create a welcoming digital space that introduces their curiosity-led curriculum and guides families into the right program."
      quickFacts={quickFacts}
      sections={sections}
      comingSoon={comingSoon}
      share={share}
      schema={schema}
      cta={cta}
    />
  )
}
