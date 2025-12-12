import type { Metadata } from "next"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import FAQSection from "@/components/faq-section"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { CASE_STUDIES } from "@/lib/case-study-data"

const coreOutcomes = [
  {
    icon: "🎯",
    title: "more people hear about your community",
    description: "launch funnels, content, and seo that consistently put you in front of the right people."
  },
  {
    icon: "🤝",
    title: "more people join and stay active",
    description: "design flows that welcome members, guide them to value fast, and keep engagement high."
  },
  {
    icon: "💬",
    title: "more people tell their friends to join",
    description: "systematize referrals so every delighted member becomes a signal boost for your mission."
  }
]

const deliveryPillars = [
  {
    title: "world-class design",
    description: "every page and touchpoint feels cohesive, human, and true to your mission. we learn your voice, your visuals, and your values."
  },
  {
    title: "world-class tech",
    description: "seo, aeo, ux analytics, and ai-driven ad targeting operate together behind the scenes so every visit brings sharper insights."
  },
  {
    title: "deep brand alignment",
    description: "we immerse ourselves in your brand and audience to anticipate what they need next and build trust with every interaction."
  },
  {
    title: "data-driven iteration",
    description: "analytics guide every decision, so your platform keeps improving while you sleep — no guesswork, just momentum."
  }
]

const differentiators = [
  "Running a community means juggling content, members, operations, and product — often all at once.",
  "Your highest leverage isn’t in tweaking code or fixing forms — it’s in understanding your members and improving your offer.",
  "Prism handles the systems, automations, and data so you can stay close to your people."
]

const prismTakesCareOf = [
  "All the tech stack integration",
  "Design that perfectly matches your brand",
  "Every join flow and funnel optimized for clarity and conversion",
  "Key insights and data shared in simple dashboards",
  "Proactive suggestions and auto-applied improvements — without endless approval loops"
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
      "Activation, engagement, retention, referrals, and acquisition channels—tied back to revenue where relevant.",
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
  { icon: "🔓", text: "Pause or cancel anytime — no long contracts" },
  { icon: "🧾", text: "You fully own every asset we build" },
  { icon: "🛡️", text: "Zero downtime, seamless updates, and continuous improvements" },
  { icon: "📊", text: "Transparent analytics — see what’s working at a glance" }
]

const communityCaseStudies = CASE_STUDIES.filter((study) => study.segments.includes("community"))
const communityGradientClasses = ["from-rose-100 via-white to-rose-50", "from-emerald-100 via-white to-emerald-50"]

export const metadata: Metadata = {
  title: "why online community founders love prism",
  description: "see how prism helps online community founders grow faster by uniting design, technology, and data so you can focus on your members.",
  alternates: {
    canonical: "https://www.design-prism.com/why-online-community-founders-love-prism"
  },
  openGraph: {
    title: "why online community founders love prism",
    description: "build a thriving community without drowning in tech or design work. prism handles systems, design, and data so you can stay focused on people.",
    url: "https://www.design-prism.com/why-online-community-founders-love-prism",
    siteName: "Prism",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "why online community founders love prism",
    description: "prism helps community founders grow faster by handling systems, design, and data.",
    creator: "@designprism"
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function CommunityFoundersPage() {
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
                community growth playbook
              </span>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                Build a thriving community — without drowning in tech or design work.
              </h1>
              <p className="mt-6 text-base text-neutral-600 md:text-lg">
                Prism helps community founders grow faster by handling the systems, design, and data so you can stay focused on your people.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/get-started">
                  <Button size="lg" className="group rounded-full px-7 py-3 text-base">
                    {FREE_AUDIT_CTA_TEXT}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                We help online communities grow — faster and smarter.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Every improvement Prism makes — from your site and funnels to analytics and automation — ladders up to these three outcomes.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {coreOutcomes.map((outcome) => (
                <div
                  key={outcome.title}
                  className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-neutral-50/60 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-3xl">{outcome.icon}</span>
                  <h3 className="mt-6 text-lg font-semibold text-neutral-900">{outcome.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{outcome.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Turning Members into Advocates */}
        <section className="border-t border-neutral-100 bg-neutral-900 text-white">
          <div className="container mx-auto grid gap-12 px-4 py-24 md:grid-cols-[1.25fr_1fr] md:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                We help free members become paying members — and happy customers become your best marketers.
              </h2>
              <ul className="mt-8 space-y-4 text-base leading-relaxed text-neutral-200">
                <li>Upgrade free members to your paid course, product, or membership</li>
                <li>Capture reviews and testimonials automatically</li>
                <li>Incentivize paying members to spread the word and bring in new members</li>
                <li>Create smooth, high-trust onboarding experiences for every join path</li>
              </ul>
            </div>
            <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <div className="text-sm uppercase tracking-[0.45em] text-neutral-300">
                  member journey
                </div>
                <div className="mt-6 space-y-5">
                  {["Free", "Paying Member", "Advocate"].map((label, index) => (
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
                  Automation, incentives, and messaging guide every step from curious visitor to vocal advocate.
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
                Design, technology, and data — working seamlessly together.
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
                We think like founders — and act like your in-house growth team.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Online community founders have a lot on their plate. Prism keeps you focused on what matters most.
              </p>
              <div className="mt-6 space-y-4 text-sm text-neutral-600">
                {differentiators.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900">Prism takes care of:</h3>
              <ul className="mt-6 space-y-4 text-sm text-neutral-600">
                {prismTakesCareOf.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Why Founders Stay with Prism */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Flexible. Reliable. 100% yours.
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
                Community-driven brands growing with Prism
              </h2>
              <p className="mt-4 text-base text-neutral-300">
                From wellness movements to parenting collectives, Prism powers communities built on connection and impact.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {communityCaseStudies.map((study, index) => (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className={`group relative block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${communityGradientClasses[index % communityGradientClasses.length]} p-8 text-neutral-900 shadow-lg transition hover:-translate-y-1`}
                >
                  <div className="absolute inset-0 bg-white/20 mix-blend-overlay" aria-hidden />
                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                      {study.industry}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold">{study.client}</h3>
                    <p className="mt-4 text-sm text-neutral-700">{study.description}</p>
                    <span className="mt-6 inline-flex items-center text-sm font-medium text-neutral-800">
                      read the case study <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50/70">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">community playbook</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                what prism delivers for community founders
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-neutral-900">who it&apos;s for</h3>
                <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                  {segmentWhoItsFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-neutral-900">problems we solve</h3>
                <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                  {segmentProblemsWeSolve.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900">what you get</h3>
              <ul className="mt-4 grid gap-3 text-sm text-neutral-600 md:grid-cols-2">
                {segmentDeliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900">how it works</h3>
              <ol className="mt-4 space-y-4 text-sm text-neutral-600">
                {segmentProcess.map((item, index) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-neutral-900">{item.step}</p>
                      <p className="mt-1">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <FAQSection
          title="community growth faq"
          subtitle="questions founders ask about onboarding and retention."
          items={segmentFaqItems}
          className="bg-neutral-50/70"
        />

        {/* Section 7: Closing CTA */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Ready to grow your community with Prism?
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                We’ll handle the tech and design. You focus on your members.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full px-8 py-3 text-base">
                    Talk to Prism
                  </Button>
                </Link>
                <Link href="/get-started">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 py-3 text-base"
                  >
                    {FREE_AUDIT_CTA_TEXT}
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
