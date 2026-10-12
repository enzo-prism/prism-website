import type { Metadata } from "next"
import { BarChart3, Briefcase, Handshake, LockOpen, MessagesSquare, ShieldCheck, Target } from "lucide-react"

import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import { LandingHero } from "@/components/landing/landing-hero"
import {
  CheckList,
  WhyCaseStudies,
  WhyFeatureGrid,
  WhyHeroVisual,
  WhyIconList,
  WhyJourneyPanel,
  WhyOutcomeBand,
  WhyPanel,
  WhyPlaybook,
  WhySplit,
  type WhyOutcome,
} from "@/components/landing/why/why-kit"
import Navbar from "@/components/navbar"
import { FinalCta } from "@/components/prism/final-cta"
import ScrollToTop from "@/components/scroll-to-top"
import { buildRouteMetadata } from "@/lib/seo/metadata"
import { WAITLIST_CTA } from "@/lib/waitlist"

const LOCATION = "why community founders"

const coreOutcomes: WhyOutcome[] = [
  {
    icon: Target,
    title: "More people hear about your community",
    description: "Launch funnels, content, and SEO that consistently put you in front of the right people.",
  },
  {
    icon: Handshake,
    title: "More people join and stay active",
    description: "Design flows that welcome members, guide them to value fast, and keep engagement high.",
  },
  {
    icon: MessagesSquare,
    title: "More people tell their friends to join",
    description: "Systematize referrals so every delighted member becomes a signal boost for your mission.",
  },
]

const advocateHighlights = [
  "Upgrade free members to your paid course, product, or membership",
  "Capture reviews and testimonials automatically",
  "Incentivize paying members to spread the word and bring in new members",
  "Create smooth, high-trust onboarding experiences for every join path",
]

const deliveryPillars = [
  {
    title: "Cohesive design",
    description: "Every page and touchpoint feels cohesive, human, and true to your mission. We learn your voice, your visuals, and your values.",
  },
  {
    title: "Connected tech",
    description: "SEO, AEO, UX analytics, and AI-driven ad targeting operate together behind the scenes so every visit brings sharper insights.",
  },
  {
    title: "Deep brand alignment",
    description: "We immerse ourselves in your brand and audience to anticipate what they need next and build trust with every interaction.",
  },
  {
    title: "Data-driven iteration",
    description: "Analytics guide every decision, so your platform keeps improving while you sleep. No guesswork, just momentum.",
  },
] as const

const differentiators = [
  "Running a community means juggling content, members, operations, and product, often all at once.",
  "Your highest leverage isn’t in tweaking code or fixing forms. It’s in understanding your members and improving your offer.",
  "Prism handles the systems, automations, and data so you can stay close to your people.",
]

const prismTakesCareOf = [
  "All the tech stack integration",
  "Design that perfectly matches your brand",
  "Every join flow and funnel optimized for clarity and conversion",
  "Key insights and data shared in simple dashboards",
  "Proactive suggestions and auto-applied improvements, without endless approval loops",
]

const segmentWhoItsFor = [
  "Founders of paid or free online communities and membership programs.",
  "Teams growing a movement, course hub, or content‑driven network.",
  "Creators who need a reliable system for onboarding and retention.",
]

const segmentProblemsWeSolve = [
  "Funnels that don’t explain the value fast enough to convert.",
  "Onboarding flows that leave new members unsure what to do next.",
  "Content hubs that aren’t organized for search or discovery.",
  "Growth that relies on manual outreach instead of repeatable loops.",
  "Limited analytics tying marketing to member activation and retention.",
]

const segmentDeliverables = [
  "Conversion‑ready landing pages and membership website.",
  "Onboarding journeys that get members to value in minutes.",
  "SEO + AEO foundations for your topics and offers.",
  "Referral and share loops that scale community growth.",
  "Automations for email, events, and follow‑ups.",
  "Dashboards showing activation, churn, and acquisition quality.",
]

const segmentProcess = [
  { step: "audit the offer + journey", detail: "we map how members find you, join, and stick around." },
  { step: "build the foundation", detail: "launch a fast, branded site with clear onboarding." },
  { step: "layer growth loops", detail: "content, ads, and referrals compound demand." },
  { step: "optimize continuously", detail: "we ship improvements as your community evolves." },
]

const segmentFaqItems = [
  {
    question: "Can Prism work with our existing platform (Circle, Skool, Mighty Networks)?",
    answer:
      "Yes. We integrate with your platform or migrate if needed, while keeping the experience cohesive on the marketing site.",
  },
  {
    question: "How do you improve member onboarding?",
    answer:
      "We design the join flow, welcome sequence, and first‑week journey so members reach value quickly and know what to do next.",
  },
  {
    question: "Do you help with content and SEO?",
    answer:
      "Yes. We structure topics, internal links, and schema so your best ideas rank and get surfaced in AI search too.",
  },
  {
    question: "What metrics do you track?",
    answer:
      "Activation, engagement, retention, referrals, and acquisition channels, tied back to revenue where relevant.",
  },
  {
    question: "How long does a rebuild take?",
    answer:
      "Most community sites ship in 4–8 weeks depending on content and integrations, then improve monthly.",
  },
  {
    question: "Do we own everything?",
    answer:
      "Yes. Your domain, content, and data remain fully yours.",
  },
]

const retentionBenefits = [
  { icon: LockOpen, text: "Pause or cancel anytime, no long contracts" },
  { icon: Briefcase, text: "You fully own every asset we build" },
  { icon: ShieldCheck, text: "Zero downtime, quiet updates, and continuous improvements" },
  { icon: BarChart3, text: "Transparent analytics: see what’s working at a glance" },
] as const

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Growth systems for community founders',
  description: 'Design, funnels, analytics, and automation that help online community founders grow without carrying all the tech and design work themselves.',
  path: "/why-online-community-founders-love-prism",
})

export default function CommunityFoundersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Community growth playbook"
          title="build a thriving community without drowning in tech."
          titleClassName="max-w-[16ch]"
          description="Prism helps community founders grow faster by handling the systems, design, and data so you can stay focused on your people."
          location={`${LOCATION} hero`}
          ctaHref={WAITLIST_CTA.href}
          secondary={{ label: "See case studies", href: "/case-studies", trackingLabel: "see case studies" }}
          glow="violet"
        >
          <WhyHeroVisual
            shots={[
              { slug: "we-are-saplings", url: "wearesaplings.com", alt: "We Are Saplings website by Prism" },
              { slug: "rebellious-aging", url: "rebelwithsuz.com", alt: "Rebellious Aging website by Prism" },
              { slug: "leadership-retreat", url: "dentistretreat.com", alt: "Leadership Retreat website by Prism" },
            ]}
          />
        </LandingHero>

        <WhyOutcomeBand
          id="community-outcomes"
          eyebrow="What changes"
          title="online communities that grow faster and smarter."
          description="Every improvement Prism makes, from your site and funnels to analytics and automation, ladders up to these three outcomes."
          items={coreOutcomes}
        />

        <WhySplit
          id="community-advocates"
          eyebrow="Members into advocates"
          title="free members become paying members. happy members become marketers."
          panel={
            <WhyJourneyPanel
              eyebrow="Member journey"
              stages={["Free", "Paying Member", "Advocate"]}
              caption="Automation, incentives, and messaging guide every step from curious visitor to vocal advocate."
            />
          }
        >
          <CheckList items={advocateHighlights} />
        </WhySplit>

        <WhyFeatureGrid
          id="community-pillars"
          eyebrow="How Prism does it"
          title="design, technology, and data, working together."
          items={deliveryPillars}
          columns={2}
          featuredIndex={1}
        />

        <WhySplit
          id="community-difference"
          eyebrow="What makes Prism different"
          title="we think like founders and act like your in-house growth team."
          description="Online community founders have a lot on their plate. Prism keeps you focused on what matters most."
          reverse
          panel={
            <WhyPanel eyebrow="Prism takes care of">
              <CheckList items={prismTakesCareOf} />
            </WhyPanel>
          }
        >
          <div className="space-y-4 text-pretty text-[15px] leading-relaxed text-muted-foreground">
            {differentiators.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </WhySplit>

        <WhyCaseStudies
          id="community-case-studies"
          title="community-driven brands growing with Prism."
          description="From wellness movements to parenting collectives, Prism powers communities built on connection and impact."
          studies={[{ slug: "rebellious-aging" }, { slug: "we-are-saplings" }, { slug: "leadership-retreat" }]}
          location={LOCATION}
        />

        <WhySplit
          id="community-staying"
          eyebrow="Why founders stay"
          title="flexible. reliable. 100% yours."
          description="Prism keeps your community’s site, funnels, and data improving while everything stays in your name."
          panel={
            <WhyPanel>
              <WhyIconList items={retentionBenefits} />
            </WhyPanel>
          }
        />

        <WhyPlaybook
          id="community-playbook"
          eyebrow="Community playbook"
          title="what Prism delivers for community founders."
          whoItsFor={segmentWhoItsFor}
          problems={segmentProblemsWeSolve}
          deliverables={segmentDeliverables}
          process={segmentProcess}
        />

        <FAQSection
          title="community growth faq."
          subtitle="Questions founders ask about onboarding and retention."
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
