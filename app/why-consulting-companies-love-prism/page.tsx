import type { Metadata } from "next"
import {
  BarChart3,
  Brain,
  Briefcase,
  Lightbulb,
  LockOpen,
  MessagesSquare,
  Rocket,
  Wrench,
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

const LOCATION = "why consulting"

const coreOutcomes: WhyOutcome[] = [
  {
    icon: Lightbulb,
    title: "More qualified leads who already trust you before the first call",
    description: "Messaging, design, and proof points that build credibility the moment prospects land on your site.",
  },
  {
    icon: MessagesSquare,
    title: "Clearer communication of your value and expertise",
    description: "Story-driven pages translate complex services into benefits that resonate with decision-makers.",
  },
  {
    icon: Rocket,
    title: "Systems that help your business scale without added complexity",
    description: "Automations and integrations reduce manual effort so you can take on more clients without burning out.",
  },
]

const deliveryPillars = [
  {
    title: "Professional design that earns trust",
    description: "Every page, form, and deck feels refined and consistent, crafted for consultants who compete on expertise.",
  },
  {
    title: "Advanced automation & integrations",
    description: "CRM, scheduling, email automation, and analytics, all fully connected and quietly working behind the scenes.",
  },
  {
    title: "SEO + AEO for authority building",
    description: "Show up in Google and AI search for your specialties so prospects find you before they build internal solutions.",
  },
  {
    title: "Data-driven iteration",
    description: "Prism tracks what converts and ships improvements automatically, giving you a smarter site every month.",
  },
] as const

const growthEngineHighlights = [
  "Clarify your firm’s positioning and key differentiators",
  "Publish insights, case studies, and thought leadership that attract clients",
  "Create streamlined inquiry and onboarding flows that save time",
  "Automate lead qualification, follow-ups, and calendar scheduling",
  "Integrate CRM and analytics to show exactly where your best leads come from",
]

const prismCoverage = [
  "Your website and landing pages",
  "Your analytics and CRM",
  "Your email automations and booking flows",
  "Your testimonials, case studies, and thought leadership content",
]

const whatYouKeep = [
  "Consistent brand storytelling without the bottlenecks",
  "Dashboards that surface the metrics your partners care about",
  "Room to experiment with new offers without spinning up new tooling",
]

const segmentWhoItsFor = [
  "Boutique and mid‑size consulting firms selling high‑consideration services.",
  "Professional services teams that need clearer positioning and proof online.",
  "Founders running lean who want a reliable growth system without more vendors.",
]

const segmentProblemsWeSolve = [
  "Websites that explain services but don’t build trust fast enough.",
  "Case studies buried in PDFs instead of a conversion flow.",
  "Thought leadership that’s hard to publish or doesn’t rank.",
  "Leads that slip through because intake and follow‑up are manual.",
  "Analytics that don’t connect marketing to pipeline quality.",
]

const segmentDeliverables = [
  "Authority‑driven website and modular service pages.",
  "Case study and proof system that scales with new wins.",
  "SEO + AEO structure for your core offers and niches.",
  "Lead capture, qualification, and onboarding automations.",
  "CRM + analytics dashboards tying content to revenue.",
]

const segmentProcess = [
  { step: "audit + positioning map", detail: "we clarify who you serve, why you win, and where leads get stuck." },
  { step: "architect the funnel", detail: "sitemap, messaging, proof, and CTAs aligned to buyer intent." },
  { step: "design + build", detail: "a refined, fast site with governance so your team can ship updates." },
  { step: "publish + optimize", detail: "content, experiments, and reporting that compound over time." },
]

const segmentFaqItems = [
  {
    question: "Do you work with consulting firms outside tech?",
    answer:
      "Yes. We’ve built systems for strategy, operations, education, and specialist consulting teams. The playbook adapts to your buyers.",
  },
  {
    question: "Can you migrate our existing site and content?",
    answer:
      "Absolutely. We’ll audit what’s working, refresh what’s outdated, and migrate pages into a cleaner structure.",
  },
  {
    question: "How do you handle case studies and proof?",
    answer:
      "We turn wins into modular stories with clear outcomes, then place them where buyers need reassurance most.",
  },
  {
    question: "Will this help us rank in AI search results too?",
    answer:
      "Yes. We structure pages, schema, and internal links so both Google and AI engines can surface your expertise.",
  },
  {
    question: "What’s the typical timeline?",
    answer:
      "Most consulting sites ship in 6–8 weeks, then iterate monthly as new offers and insights emerge.",
  },
  {
    question: "Do we keep ownership of everything?",
    answer:
      "Yes. You own the domain, site, and data. Prism runs the system with full transparency.",
  },
]

const retentionBenefits = [
  { icon: LockOpen, text: "Pause or cancel anytime, no long-term contracts" },
  { icon: Briefcase, text: "You own all your assets and data" },
  { icon: Brain, text: "Continuous optimization powered by analytics and AI" },
  { icon: BarChart3, text: "Transparent reports showing what’s working" },
  { icon: Wrench, text: "Worry-free hosting, uptime, and updates" },
] as const

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Consulting websites & lead generation',
  description: 'Website design, authority content, automation, and conversion systems that help consulting firms attract, qualify, and win better clients.',
  path: "/why-consulting-companies-love-prism",
})

export default function ConsultingCompaniesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Consulting growth playbook"
          title="build trust, attract clients, and scale your impact."
          titleClassName="max-w-[16ch]"
          description="Prism helps consulting firms stand out online, capture more qualified leads, and turn insights into measurable growth, while you focus on serving clients."
          location={`${LOCATION} hero`}
          ctaHref={WAITLIST_CTA.href}
          secondary={{ label: "See case studies", href: "/case-studies", trackingLabel: "see case studies" }}
          glow="blue"
        >
          <WhyHeroVisual
            shots={[
              { slug: "infobell-it", url: "infobellit.com", alt: "Infobell IT website by Prism" },
              {
                slug: "practice-transitions-institute",
                url: "practicetransitionsinstitute.com",
                alt: "Practice Transitions Institute website by Prism",
              },
              { slug: "leadership-retreat", url: "dentistretreat.com", alt: "Leadership Retreat website by Prism" },
            ]}
          />
        </LandingHero>

        <WhyOutcomeBand
          id="consulting-outcomes"
          eyebrow="What changes"
          title="grow through clarity, credibility, and connection."
          description="Prism combines design, automation, and data so your consulting business attracts better-fit clients and runs smoother than ever."
          items={coreOutcomes}
        />

        <WhySplit
          id="consulting-growth-engine"
          eyebrow="Turn expertise into growth"
          title="make your expertise visible, shareable, and scalable."
          panel={
            <WhyJourneyPanel
              eyebrow="Trust pipeline"
              stages={["Visitor", "Trust", "Inquiry", "Client"]}
              caption="Automations nurture visitors, qualify leads, and keep your calendar full of right-fit clients."
            />
          }
        >
          <CheckList items={growthEngineHighlights} />
        </WhySplit>

        <WhyFeatureGrid
          id="consulting-pillars"
          eyebrow="How Prism does it"
          title="smart systems, standout design, and strategy built for credibility."
          items={deliveryPillars}
          columns={2}
          featuredIndex={0}
        />

        <WhySplit
          id="consulting-difference"
          eyebrow="What makes Prism different"
          title="your growth partner, not just your web team."
          description="Boutique consulting firms move fast. You need a partner who can keep up. Your team’s focus should stay on clients, strategy, and delivery, not debugging integrations or redesigning slides. Prism gives you a single, unified system that works across:"
          reverse
          panel={
            <WhyPanel eyebrow="What you keep">
              <CheckList items={whatYouKeep} />
            </WhyPanel>
          }
        >
          <CheckList items={prismCoverage} />
          <p className="mt-6 text-pretty text-[15px] leading-relaxed text-muted-foreground">
            You get speed, reliability, and insight, all without needing to manage another vendor.
          </p>
        </WhySplit>

        <WhyCaseStudies
          id="consulting-case-studies"
          title="consulting and professional services firms growing with Prism."
          description="We partner with forward-thinking firms who combine strategy, relationships, and real impact."
          studies={[{ slug: "practice-transitions-institute" }, { slug: "infobell-it" }]}
          location={LOCATION}
        />

        <WhySplit
          id="consulting-staying"
          eyebrow="Why firms stay"
          title="built for growth, not maintenance."
          description="Prism keeps your site, content, and lead flow improving every month, with no long contracts and nothing locked away from you."
          panel={
            <WhyPanel>
              <WhyIconList items={retentionBenefits} />
            </WhyPanel>
          }
        />

        <WhyPlaybook
          id="consulting-playbook"
          eyebrow="Consulting playbook"
          title="what Prism does for consulting firms."
          whoItsFor={segmentWhoItsFor}
          problems={segmentProblemsWeSolve}
          deliverables={segmentDeliverables}
          process={segmentProcess}
        />

        <FAQSection
          title="consulting marketing faq."
          subtitle="Answers about positioning, proof, and collaboration."
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
