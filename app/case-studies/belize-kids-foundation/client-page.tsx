import MinimalCaseStudyPage from "@/components/case-study-minimal"

const quickFacts = [
  { label: "segment", value: "nonprofit" },
  { label: "location", value: "san pedro, belize" },
  { label: "client since", value: "march 2025" },
  { label: "services", value: "website" },
  { label: "website", value: "belizekids.org", href: "https://belizekids.org" },
]

const sections = [
  {
    id: "story-first",
    title: "putting stories first",
    description: "families, volunteers, and donors needed a clear view of programs and immediate ways to help.",
    bullets: [
      "curated program pages that highlight education, wellness, and community projects with consistent layouts",
      "wrote story prompts that keep the focus on families and measurable outcomes",
      "defined volunteer and donor flows so people can commit support within a single visit",
    ],
  },
  {
    id: "digital-foundation",
    title: "the digital foundation",
    description: "we laid the groundwork for a site that is easy to maintain and ready for growth.",
    bullets: [
      "designed an uplifting, mobile-first experience that works across low-bandwidth connections",
      "created reusable campaign blocks for fundraisers, events, and impact updates",
      "stood up analytics dashboards and tagging to connect marketing efforts with donations",
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
  title: "share the impact your nonprofit delivers",
  body: "we build digital spaces that make it simple for supporters to understand the mission and get involved right away.",
  trackLabel: "belize kids foundation case study cta",
}

const share = {
  url: "https://www.design-prism.com/case-studies/belize-kids-foundation",
  title: "belize kids foundation × prism case study",
  description: "nonprofit storytelling infrastructure with website design and local presence support.",
}

const schema = {
  title: "belize kids foundation — nonprofit story hub",
  description:
    "how we are supporting belize kids foundation with a refreshed website, donor pathways, and local visibility groundwork.",
  url: "https://www.design-prism.com/case-studies/belize-kids-foundation",
  clientName: "Belize Kids Foundation",
  outcome: "delivered story-first web design, supporter pathways, and analytics groundwork for mission growth.",
  datePublished: "2025-03-01T00:00:00.000Z",
  dateModified: "2025-03-01T00:00:00.000Z",
}

export default function BelizeKidsFoundationCaseStudy() {
  return (
    <MinimalCaseStudyPage
      pageTrackingTitle="Belize Kids Foundation Case Study"
      heroTitle="belize kids foundation — nonprofit story hub"
      heroSubtitle="amplifying youth programs with a clear, uplifting digital experience"
      summary="belize kids foundation partnered with prism to create a website that highlights programs, shares outcomes, and speeds up the path to giving."
      quickFacts={quickFacts}
      sections={sections}
      comingSoon={comingSoon}
      share={share}
      schema={schema}
      cta={cta}
    />
  )
}
