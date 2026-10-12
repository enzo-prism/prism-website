import type { Metadata } from "next"
import {
  BarChart3,
  Brain,
  Briefcase,
  HandHeart,
  Lightbulb,
  LockOpen,
  MessagesSquare,
  Settings2,
} from "lucide-react"

import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import { LandingHero } from "@/components/landing/landing-hero"
import {
  CheckList,
  WhyCaseStudies,
  WhyFeatureGrid,
  WhyHeroVisual,
  WhyIconList,
  WhyOutcomeBand,
  WhyPanel,
  WhyPlaybook,
  WhySplit,
  WhyStatement,
  type WhyOutcome,
} from "@/components/landing/why/why-kit"
import Navbar from "@/components/navbar"
import { FinalCta } from "@/components/prism/final-cta"
import ScrollToTop from "@/components/scroll-to-top"
import { buildRouteMetadata } from "@/lib/seo/metadata"
import { WAITLIST_CTA } from "@/lib/waitlist"

const LOCATION = "why nonprofits"

const coreOutcomes: WhyOutcome[] = [
  {
    icon: Lightbulb,
    title: "More awareness",
    description: "Reach more people through better design, storytelling, and search visibility.",
  },
  {
    icon: HandHeart,
    title: "More engagement",
    description: "Turn visitors into donors, volunteers, or advocates with thoughtful journeys.",
  },
  {
    icon: Settings2,
    title: "Less overhead",
    description: "Automations and smart integrations reduce manual work for your team.",
  },
]

const nonprofitThemes = [
  {
    title: "Tell your story beautifully",
    bullets: [
      "Custom website design that evokes trust and emotion",
      "Clear storytelling frameworks that connect hearts and minds",
      "Dedicated pages for projects, impact stories, and news updates",
    ],
  },
  {
    title: "Reach and inspire supporters",
    bullets: [
      "SEO + AEO optimization to appear in Google and AI search",
      "Integration with donation platforms like Donorbox, Stripe, or PayPal",
      "Social and ad campaign support to grow awareness",
    ],
  },
  {
    title: "Simplify operations",
    bullets: [
      "Automations for newsletters, donor thank-yous, and updates",
      "Centralized analytics to see what’s working",
      "Continuous improvement: your site gets smarter each month",
    ],
  },
] as const

const transitionSteps = [
  "We handle all communication with your old provider.",
  "We migrate domains, files, and donation systems with zero downtime.",
  "We ensure every piece of data transfers securely and correctly.",
]

const transitionSupport = [
  "Audit of your current systems and content",
  "Secure credential handoff and documentation",
  "Donation and CRM integration testing",
  "Content preservation for archives and impact stories",
  "Launch roadmap shared across your team",
]

const improvementHighlights = [
  "Regular updates and AEO improvements keep your organization visible.",
  "Accessibility and mobile optimization ensure everyone can experience your message.",
  "Monthly insights help your team make data-driven decisions with ease.",
]

const momentumItems = [
  "Accessibility reviews and fixes scheduled quarterly",
  "Storytelling templates for program and impact updates",
  "Donor journey audits to maximize conversions",
  "Experimentation with new channels, formats, and partnerships",
]

const segmentWhoItsFor = [
  "Nonprofits and foundations with small teams and big missions.",
  "Organizations needing clearer donor and volunteer journeys.",
  "Programs expanding into new regions, services, or fundraising campaigns.",
]

const segmentProblemsWeSolve = [
  "Websites that don’t tell the story fast enough to earn trust.",
  "Donation or signup flows that feel clunky on mobile.",
  "Low search visibility for programs, impact, or local chapters.",
  "Fragmented tools for email, analytics, and updates.",
  "Manual follow‑ups that slow down fundraising.",
]

const segmentDeliverables = [
  "Mission‑aligned website with accessible, mobile‑first storytelling.",
  "Impact pages and program templates your team can update.",
  "SEO + AEO foundations so supporters find you first.",
  "Donation and newsletter integrations that actually convert.",
  "Automations for thank‑yous, updates, and recurring gifts.",
  "Dashboards tying campaigns to signups and donations.",
]

const segmentProcess = [
  { step: "impact + funnel audit", detail: "we map supporter journeys and remove friction." },
  { step: "build the foundation", detail: "launch a modern site and donation flows you own." },
  { step: "grow visibility", detail: "content, listings, and campaigns expand awareness." },
  { step: "optimize monthly", detail: "continuous improvements aligned to your mission." },
]

const segmentFaqItems = [
  {
    question: "Can you work with our donation platform?",
    answer:
      "Yes. We integrate Donorbox, Stripe, PayPal, Givebutter, and other platforms while keeping the experience on‑brand.",
  },
  {
    question: "Do you help with accessibility?",
    answer:
      "Absolutely. Accessibility and mobile usability are core to every Prism nonprofit build.",
  },
  {
    question: "How do we update content after launch?",
    answer:
      "We provide templates and light governance so your team can publish impact updates without breaking design.",
  },
  {
    question: "Will this help us show up in AI search too?",
    answer:
      "Yes. We structure pages and schema so AI engines can surface your programs and stories accurately.",
  },
  {
    question: "What does a typical engagement cost?",
    answer:
      "We tailor scope to your budget, starting with the highest‑impact foundation and scaling as fundraising grows.",
  },
  {
    question: "Do we keep ownership of the site and data?",
    answer:
      "Yes. Your domain, content, and analytics stay fully under your control.",
  },
]

const stayingReasons = [
  { icon: Briefcase, text: "You own 100% of your website and data." },
  { icon: LockOpen, text: "Pause or cancel anytime, no long contracts." },
  { icon: Brain, text: "Continuous updates and optimizations at no extra cost." },
  { icon: BarChart3, text: "Clear, jargon-free reports showing what’s working." },
  { icon: MessagesSquare, text: "Direct line to the founder for ongoing support." },
] as const

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Nonprofit websites & donor growth',
  description: 'Story-first websites, campaigns, and automation that help nonprofits attract supporters, simplify their tech, and grow donations.',
  path: "/why-nonprofits-love-prism",
})

export default function NonprofitsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Nonprofit growth playbook"
          title="share your mission. reach more people. simplify your tech."
          titleClassName="max-w-[17ch]"
          description="Prism helps nonprofits tell their story beautifully, attract donors and supporters, and manage technology easily, so their teams can stay focused on the work that matters most."
          location={`${LOCATION} hero`}
          ctaHref={WAITLIST_CTA.href}
          secondary={{ label: "See case studies", href: "/case-studies", trackingLabel: "see case studies" }}
          glow="green"
        >
          <WhyHeroVisual
            shots={[
              { slug: "canary-foundation", url: "canaryfoundation.org", alt: "Canary Foundation website by Prism" },
              { slug: "belize-kids-foundation", url: "belizekids.org", alt: "Belize Kids Foundation website by Prism" },
              { slug: "we-are-saplings", url: "wearesaplings.com", alt: "We Are Saplings website by Prism" },
            ]}
          />
        </LandingHero>

        <WhyOutcomeBand
          id="nonprofit-outcomes"
          eyebrow="What changes"
          title="amplify impact through clarity, credibility, and connection."
          description="Prism gives mission-driven teams modern tools, simple systems, and considered design, built for scale, not stress."
          items={coreOutcomes}
        />

        <WhyFeatureGrid
          id="nonprofit-themes"
          eyebrow="What Prism handles"
          title="share your story and measure your impact."
          items={nonprofitThemes}
          featuredIndex={0}
        />

        <WhySplit
          id="nonprofit-transition"
          eyebrow="Switching to Prism"
          title="switching to Prism is effortless and worry-free."
          description="Many nonprofits inherit outdated websites or systems built by volunteers or legacy vendors. Prism makes it easy to modernize without losing content or history."
          panel={
            <WhyPanel eyebrow="Transition support includes">
              <CheckList items={transitionSupport} />
            </WhyPanel>
          }
        >
          <CheckList items={transitionSteps} />
        </WhySplit>

        <WhyStatement
          id="nonprofit-communication"
          eyebrow="Communication"
          title="you’ll always know what’s happening, and who’s handling it."
        >
          You’ll have direct access to Prism’s founder, Enzo, by call, text, or email anytime. We value communication, transparency, and trust above all else, because mission-driven work deserves partners who care just as much as you do.
        </WhyStatement>

        <WhySplit
          id="nonprofit-improvement"
          eyebrow="After launch"
          title="we don’t just build your website. we help it grow with you."
          description="The world of search, AI, and digital storytelling changes fast, and Prism keeps you ahead of it."
          reverse
          panel={
            <WhyPanel eyebrow="Momentum you can count on">
              <CheckList items={momentumItems} />
            </WhyPanel>
          }
        >
          <CheckList items={improvementHighlights} />
        </WhySplit>

        <WhyCaseStudies
          id="nonprofit-case-studies"
          title="trusted by organizations making a global difference."
          description="From cancer research to child empowerment, Prism supports nonprofits turning purpose into measurable impact. Their missions are too important to be slowed down by tech or communication challenges."
          studies={[{ slug: "belize-kids-foundation" }, { slug: "canary-foundation" }]}
          location={LOCATION}
        />

        <WhySplit
          id="nonprofit-staying"
          eyebrow="Why nonprofits stay"
          title="transparent. reliable. mission-aligned."
          description="Prism stays aligned with your mission, keeping your website, campaigns, and donor systems responsive to what your community needs."
          panel={
            <WhyPanel>
              <WhyIconList items={stayingReasons} />
            </WhyPanel>
          }
        />

        <WhyPlaybook
          id="nonprofit-playbook"
          eyebrow="Nonprofit playbook"
          title="what Prism delivers for nonprofits."
          whoItsFor={segmentWhoItsFor}
          problems={segmentProblemsWeSolve}
          deliverables={segmentDeliverables}
          process={segmentProcess}
        />

        <FAQSection
          title="nonprofit faq."
          subtitle="Fundraising, visibility, and platform questions."
          items={segmentFaqItems}
        />

        <FinalCta
          location={`${LOCATION} final cta`}
          secondary={{ label: "See case studies", href: "/case-studies" }}
        />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
