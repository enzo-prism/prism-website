import type { Metadata } from "next"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const coreOutcomes = [
  {
    icon: "💡",
    title: "More qualified leads who already trust you before the first call",
    description: "Messaging, design, and proof points that build credibility the moment prospects land on your site."
  },
  {
    icon: "💬",
    title: "Clearer communication of your value and expertise",
    description: "Story-driven pages translate complex services into benefits that resonate with decision-makers."
  },
  {
    icon: "🚀",
    title: "Systems that help your business scale without added complexity",
    description: "Automations and integrations reduce manual effort so you can take on more clients without burning out."
  }
]

const deliveryPillars = [
  {
    title: "Professional design that earns trust",
    description: "Every page, form, and deck feels refined and consistent — crafted for consultants who compete on expertise."
  },
  {
    title: "Advanced automation & integrations",
    description: "CRM, scheduling, email automation, analytics — fully connected and quietly working behind the scenes."
  },
  {
    title: "SEO + AEO for authority building",
    description: "Show up in Google and AI search for your specialties so prospects find you before they build internal solutions."
  },
  {
    title: "Data-driven iteration",
    description: "Prism tracks what converts and ships improvements automatically, giving you a smarter site every month."
  }
]

const growthEngineHighlights = [
  "Clarify your firm’s positioning and key differentiators",
  "Publish insights, case studies, and thought leadership that attract clients",
  "Create streamlined inquiry and onboarding flows that save time",
  "Automate lead qualification, follow-ups, and calendar scheduling",
  "Integrate CRM and analytics to show exactly where your best leads come from"
]

const prismCoverage = [
  "Your website and landing pages",
  "Your analytics and CRM",
  "Your email automations and booking flows",
  "Your testimonials, case studies, and thought leadership content"
]

const retentionBenefits = [
  { icon: "🔓", text: "Pause or cancel anytime — no long-term contracts" },
  { icon: "💼", text: "You own all your assets and data" },
  { icon: "🧠", text: "Continuous optimization powered by analytics and AI" },
  { icon: "🧾", text: "Transparent reports showing what’s working" },
  { icon: "🛠️", text: "Worry-free hosting, uptime, and updates" }
]

const consultingExamples = [
  {
    name: "SR4 Partners",
    description: "Empowering leaders through coaching, strategy, and transformation consulting.",
    bg: "from-blue-100 via-white to-blue-50"
  },
  {
    name: "Practice Transitions Institute",
    description: "Helping dental professionals navigate smooth practice transitions and build long-term success.",
    bg: "from-amber-100 via-white to-amber-50"
  }
]

export const metadata: Metadata = {
  title: "Why Consulting Companies Love Prism",
  description: "Discover how Prism helps consulting firms earn trust online, convert qualified leads, and automate growth while they focus on clients.",
  alternates: {
    canonical: "https://www.design-prism.com/why-consulting-companies-love-prism"
  },
  openGraph: {
    title: "Why Consulting Companies Love Prism",
    description: "Build trust, attract clients, and scale your impact without worrying about your website. Prism keeps your digital engine running.",
    url: "https://www.design-prism.com/why-consulting-companies-love-prism",
    siteName: "Prism",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Consulting Companies Love Prism",
    description: "Prism helps consulting firms stand out online, capture qualified leads, and turn insights into measurable growth.",
    creator: "@designprism"
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function ConsultingCompaniesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-white" aria-hidden />
          <div className="container relative mx-auto px-4 py-24 md:py-32">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <span className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
                consulting growth playbook
              </span>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                Build trust, attract clients, and scale your impact — without worrying about your website.
              </h1>
              <p className="mt-6 text-base text-neutral-600 md:text-lg">
                Prism helps consulting firms stand out online, capture more qualified leads, and turn insights into measurable growth — while you focus on serving clients.
              </p>
              <div className="mt-10 flex justify-center">
                <Link href="/get-started">
                  <Button size="lg" className="group rounded-full px-8 py-3 text-base">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Core Outcomes */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                We help consulting companies grow through clarity, credibility, and connection.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Prism combines design, automation, and data so your consulting business attracts better-fit clients — and runs smoother than ever.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {coreOutcomes.map((outcome) => (
                <div
                  key={outcome.title}
                  className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-neutral-50/60 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-3xl" aria-hidden>{outcome.icon}</span>
                  <h3 className="mt-6 text-lg font-semibold text-neutral-900">{outcome.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{outcome.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Turn Expertise into Growth */}
        <section className="border-t border-neutral-100 bg-neutral-900 text-white">
          <div className="container mx-auto grid gap-12 px-4 py-24 md:grid-cols-[1.25fr_1fr] md:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                We make your expertise visible, shareable, and scalable.
              </h2>
              <ul className="mt-8 space-y-4 text-base leading-relaxed text-neutral-200">
                {growthEngineHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-primary/25 via-primary/10 to-transparent p-8">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <div className="text-sm uppercase tracking-[0.45em] text-neutral-300">
                  trust pipeline
                </div>
                <div className="mt-6 space-y-5">
                  {["Visitor", "Trust", "Inquiry", "Client"].map((label, index) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-lg font-semibold text-white">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-medium text-white">{label}</p>
                        <div className="mt-1 h-px w-full bg-white/20" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-xl bg-white/10 px-4 py-3 text-sm text-neutral-200">
                  Automations nurture visitors, qualify leads, and keep your calendar full of right-fit clients.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: How Prism Does It */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Smart systems, standout design, and strategy built for credibility.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {deliveryPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="flex flex-col rounded-2xl border border-neutral-100 bg-neutral-50/70 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-xl font-semibold text-neutral-900">{pillar.title}</h3>
                  <p className="mt-4 text-sm text-neutral-600">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: What Makes Prism Different */}
        <section className="border-t border-neutral-100 bg-neutral-50/80">
          <div className="container mx-auto grid gap-10 px-4 py-24 md:grid-cols-[1.1fr_1fr] md:items-start">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                We act like your growth partner — not just your web team.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Boutique consulting firms move fast. You need a partner who can keep up.
              </p>
              <p className="mt-4 text-sm text-neutral-600">
                Your team’s focus should stay on clients, strategy, and delivery — not debugging integrations or redesigning slides. Prism gives you a single, unified system that works across:
              </p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-600">
                {prismCoverage.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-neutral-600">
                You get speed, reliability, and insight — all without needing to manage another vendor.
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900">What you keep:</h3>
              <ul className="mt-6 space-y-4 text-sm text-neutral-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Consistent brand storytelling without the bottlenecks</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Dashboards that surface the metrics your partners care about</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Room to experiment with new offers without spinning up new tooling</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Why Firms Stay */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Built for growth, not maintenance.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {retentionBenefits.map((benefit) => (
                <div
                  key={benefit.text}
                  className="flex items-start gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-2xl" aria-hidden>{benefit.icon}</span>
                  <p className="text-sm text-neutral-700">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Examples */}
        <section className="border-t border-neutral-100 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Consulting firms growing with Prism
              </h2>
              <p className="mt-4 text-base text-neutral-300">
                We partner with forward-thinking consulting companies who combine strategy, relationships, and real impact.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {consultingExamples.map((example) => (
                <article
                  key={example.name}
                  className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${example.bg} p-8 text-neutral-900 shadow-lg`}
                >
                  <div className="absolute inset-0 bg-white/20 mix-blend-overlay" aria-hidden />
                  <div className="relative">
                    <h3 className="text-2xl font-semibold">{example.name}</h3>
                    <p className="mt-4 text-sm text-neutral-700">{example.description}</p>
                    <div className="mt-6 text-sm font-medium text-neutral-600">
                      Case studies coming soon →
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Closing CTA */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Ready to modernize your consulting business with Prism?
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Let’s elevate your digital presence so you can focus on delivering results, not managing tech.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full px-8 py-3 text-base">
                    talk to prism
                  </Button>
                </Link>
                <Link href="/get-started">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 py-3 text-base"
                  >
                    free audit + report
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
