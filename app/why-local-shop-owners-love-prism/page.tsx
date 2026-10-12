import type { Metadata } from "next"
import {
  BarChart3,
  Brain,
  Briefcase,
  DoorOpen,
  LockOpen,
  MapPin,
  MessagesSquare,
  Repeat,
  Server,
} from "lucide-react"

import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import { LandingHero } from "@/components/landing/landing-hero"
import {
  CheckList,
  InlineLink,
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

const LOCATION = "why local shops"

const coreOutcomes: WhyOutcome[] = [
  {
    icon: MapPin,
    title: "More people finding you online",
    description: "Accurate listings, fresh reviews, and local SEO that keeps you visible on Google, Apple, and beyond.",
  },
  {
    icon: DoorOpen,
    title: "More customers walking in",
    description: "Smarter ads and stronger visibility turn online interest into in-store visits.",
  },
  {
    icon: Repeat,
    title: "More repeat business",
    description: "Automated follow-ups, reminders, and offers keep customers coming back.",
  },
]

const handledThemes = [
  {
    title: "Be found everywhere",
    bullets: [
      "Google Business Profile optimization and management",
      "Local SEO + AEO to rank in map packs and AI answers",
      "Consistent listings across 50+ directories (Apple Maps, Yelp, Bing, etc.)",
    ],
  },
  {
    title: "Look great online",
    bullets: [
      "Custom websites that reflect your shop’s style and expertise",
      "Fast, mobile-first design that builds trust and drives visits",
      "Simple forms and CTAs that turn browsers into buyers",
    ],
  },
  {
    title: "Convert and keep customers",
    bullets: [
      "Review collection and reputation management",
      "Targeted local ads on Google, Meta, and Instagram",
      "Automated reminders, offers, and updates that bring people back",
    ],
  },
] as const

const transitionPoints = [
  "We communicate directly with your old provider on your behalf.",
  "We ensure your domain, listings, and data transfer perfectly, with no downtime or missing assets.",
  "You’ll never have to chase anyone or manage the switch yourself.",
]

const transitionChecklist = [
  "Intro call to collect logins and goals",
  "Direct outreach to your current provider",
  "Domain, hosting, and listings secured",
  "Website and content audit completed",
  "Launch plan shared, reviewed, and executed",
]

const innovationHighlights = [
  "We continuously improve your website, listings, and ads with the latest tools and strategies.",
  "AI-driven analytics and AEO keep your business ahead of search and platform changes.",
  "Every improvement is backed by data, not guesswork.",
]

const alwaysOnImprovements = [
  "Quarterly website refreshes with new offers",
  "Monthly analytics reviews and insight reports",
  "Campaign experiments to test new channels",
  "AEO monitoring to capture AI search demand",
]

const segmentWhoItsFor = [
  "Local retail shops, studios, and service businesses that rely on nearby customers.",
  "Owners who want more foot traffic without learning marketing tech.",
  "Teams adding new locations, products, or seasonal promotions.",
]

const segmentProblemsWeSolve = [
  "Low visibility in Google Maps and local search.",
  "Outdated sites that don’t show what’s new or why you’re different.",
  "Listings that drift out of sync across Apple, Yelp, and niche directories.",
  "Ad spend that doesn’t translate into real visits or orders.",
  "No repeat‑visit engine, so customers buy once and disappear.",
]

const segmentDeliverables = [
  "A fast, mobile‑first website that reflects your shop and converts visitors.",
  "Local SEO + AEO structure so you show up when people search nearby.",
  "Listings and review engine kept accurate across major platforms.",
  "Google/Meta/Yelp campaigns tied to calls, directions, and sales.",
  "Simple follow‑ups and offer loops to bring customers back.",
  "Reporting dashboards that show what’s driving revenue.",
]

const segmentProcess = [
  { step: "visibility audit", detail: "we clean up your website, listings, and map presence first." },
  { step: "convert the demand", detail: "refresh your site and offers so browsers become buyers." },
  { step: "add growth loops", detail: "ads, reviews, and retention campaigns layer in next." },
  { step: "optimize monthly", detail: "we keep improving as your products and seasons change." },
]

const segmentFaqItems = [
  {
    question: "Will you work with my existing website platform?",
    answer:
      "Yes. We can rebuild on Next.js for speed or migrate from Squarespace/WordPress if your current stack is holding you back.",
  },
  {
    question: "How fast can we see more local visibility?",
    answer:
      "Listings fixes and profile updates often lift map engagement within weeks. Rankings compound as reviews and content stack up.",
  },
  {
    question: "Do you handle promotions and seasonal updates?",
    answer:
      "Yes. We keep your homepage, offers, and listings fresh so customers always see what’s new.",
  },
  {
    question: "Can you track in‑store results?",
    answer:
      "We track calls, direction requests, form fills, and promo redemptions where possible, then review trends with you monthly.",
  },
  {
    question: "What if I don’t want to run ads?",
    answer:
      "That’s fine. Many shops start with website + local presence and add ads only when the foundation is ready.",
  },
  {
    question: "Do I own my domain and data?",
    answer:
      "Always. Prism works inside your accounts and keeps everything transferable.",
  },
]

const stayingReasons = [
  { icon: LockOpen, text: "Pause or cancel anytime, no long contracts" },
  { icon: Briefcase, text: "You own all your assets and data" },
  { icon: Brain, text: "Ongoing updates and optimizations" },
  { icon: Server, text: "Reliable uptime and fast hosting" },
  { icon: BarChart3, text: "Clear monthly reports on what’s working" },
  { icon: MessagesSquare, text: "Direct line to the founder for support" },
] as const

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Websites & local marketing for shops',
  description: 'Website design, local SEO, ads, and automation that help local shop owners bring in more customers without the usual tech headaches.',
  path: "/why-local-shop-owners-love-prism",
})

export default function LocalShopOwnersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Local growth playbook"
          title="more customers. less tech stress."
          titleClassName="max-w-[13ch]"
          description="Prism helps local shops stand out online, bring more people through the door, and run smoother than ever, without you having to deal with complicated tech or marketing systems."
          location={`${LOCATION} hero`}
          ctaHref={WAITLIST_CTA.href}
          secondary={{ label: "See case studies", href: "/case-studies", trackingLabel: "see case studies" }}
          glow="warm"
        >
          <WhyHeroVisual
            shots={[
              { slug: "canary-cove", url: "canarycove.com", alt: "Canary Cove website by Prism" },
              { slug: "olympic-bootworks", url: "olympicbootworks.com", alt: "Olympic Bootworks website by Prism" },
              { slug: "dr-christopher-wong", url: "chriswongdds.com", alt: "Dr. Christopher Wong website by Prism" },
            ]}
          />
        </LandingHero>

        <WhyOutcomeBand
          id="local-outcomes"
          eyebrow="What changes"
          title="we help local businesses grow, online and offline."
          description="Prism brings design, technology, and data together, so you can focus on running your shop, not managing your website."
          items={coreOutcomes}
        />

        <WhyFeatureGrid
          id="local-themes"
          eyebrow="What Prism handles"
          title="everything that connects you to your customers."
          items={handledThemes}
          featuredIndex={0}
          footer={
            <p className="max-w-3xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Explore our <InlineLink href="/local-seo-services">local seo services</InlineLink> or work with Prism as
              your <InlineLink href="/local-seo-agency">local seo agency</InlineLink>.
            </p>
          }
        />

        <WhySplit
          id="local-transition"
          eyebrow="Switching providers"
          title="switching from your old provider? we make it effortless."
          description="Most local business owners dread changing website or marketing vendors. It feels risky and confusing. Prism makes the transition smooth, secure, and stress-free."
          panel={
            <WhyPanel eyebrow="Transition checklist">
              <CheckList items={transitionChecklist} />
            </WhyPanel>
          }
        >
          <CheckList items={transitionPoints} />
        </WhySplit>

        <WhyStatement
          id="local-communication"
          eyebrow="Communication"
          title="you’ll always know what’s happening, and who to call."
        >
          <p>
            You get direct access to Prism’s founder, Enzo, by call, text, or email anytime. We pride ourselves on communication, transparency, and trust: three things local business owners say are missing from most agencies.
          </p>
          <p className="mt-4 text-base text-subtle">
            We don’t hide behind tickets or dashboards. We show up, explain things clearly, and move fast when you need help.
          </p>
        </WhyStatement>

        <WhySplit
          id="local-innovation"
          eyebrow="Always improving"
          title="the world changes fast, and your marketing should too."
          description="Most agencies use cookie-cutter systems that haven’t evolved in years. Prism is built differently."
          reverse
          panel={
            <WhyPanel eyebrow="Always-on improvements">
              <CheckList items={alwaysOnImprovements} />
            </WhyPanel>
          }
        >
          <CheckList items={innovationHighlights} />
        </WhySplit>

        <WhyCaseStudies
          id="local-case-studies"
          title="trusted by local businesses across California and beyond."
          description="From custom ski boot shops to dental practices, Prism helps local business owners grow with confidence and ease."
          studies={[
            { slug: "olympic-bootworks" },
            { slug: "canary-cove" },
            { slug: "dr-christopher-wong" },
            { slug: "exquisite-dentistry" },
            { slug: "family-first-smile-care" },
            { slug: "coast-periodontics-and-laser-surgery" },
          ]}
          location={LOCATION}
        />

        <WhySplit
          id="local-staying"
          eyebrow="Why businesses stay"
          title="simple, reliable, and built for the long haul."
          description="Prism stays by your side as you grow, keeping your marketing, technology, and customer experience tight and up-to-date."
          panel={
            <WhyPanel>
              <WhyIconList items={stayingReasons} />
            </WhyPanel>
          }
        />

        <WhyPlaybook
          id="local-playbook"
          eyebrow="Local business playbook"
          title="what Prism delivers for local shop owners."
          whoItsFor={segmentWhoItsFor}
          problems={segmentProblemsWeSolve}
          deliverables={segmentDeliverables}
          process={segmentProcess}
        />

        <FAQSection
          title="local business faq."
          subtitle="Questions owners ask before they hand off growth."
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
