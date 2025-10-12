import type { Metadata } from "next"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"

const coreOutcomes = [
  {
    icon: "🎯",
    title: "More people hear about your community",
    description: "Launch funnels, content, and SEO that consistently put you in front of the right people."
  },
  {
    icon: "🤝",
    title: "More people join and stay active",
    description: "Design flows that welcome members, guide them to value fast, and keep engagement high."
  },
  {
    icon: "💬",
    title: "More people tell their friends to join",
    description: "Systematize referrals so every delighted member becomes a signal boost for your mission."
  }
]

const deliveryPillars = [
  {
    title: "World-class design",
    description: "Every page and touchpoint feels cohesive, human, and true to your mission. We learn your voice, your visuals, and your values."
  },
  {
    title: "World-class tech",
    description: "SEO, AEO, UX analytics, and AI-driven ad targeting operate together behind the scenes so every visit brings sharper insights."
  },
  {
    title: "Deep brand alignment",
    description: "We immerse ourselves in your brand and audience to anticipate what they need next and build trust with every interaction."
  },
  {
    title: "Data-driven iteration",
    description: "Analytics guide every decision, so your platform keeps improving while you sleep — no guesswork, just momentum."
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

const retentionBenefits = [
  { icon: "🔓", text: "Pause or cancel anytime — no long contracts" },
  { icon: "🧾", text: "You fully own every asset we build" },
  { icon: "🛡️", text: "Zero downtime, seamless updates, and continuous improvements" },
  { icon: "📊", text: "Transparent analytics — see what’s working at a glance" }
]

const communityExamples = [
  {
    name: "Rebellious Aging",
    description: "Empowering people to live boldly through mindset and health.",
    bg: "from-rose-100 via-white to-rose-50"
  },
  {
    name: "We Are Saplings",
    description: "Helping families raise resilient kids through mindfulness and storytelling.",
    bg: "from-emerald-100 via-white to-emerald-50"
  }
]

export const metadata: Metadata = {
  title: "Why Online Community Founders Love Prism",
  description: "See how Prism helps online community founders grow faster by uniting design, technology, and data so you can focus on your members.",
  alternates: {
    canonical: "https://www.design-prism.com/why-online-community-founders-love-prism"
  },
  openGraph: {
    title: "Why Online Community Founders Love Prism",
    description: "Build a thriving community without drowning in tech or design work. Prism handles systems, design, and data so you can stay focused on people.",
    url: "https://www.design-prism.com/why-online-community-founders-love-prism",
    siteName: "Prism",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Online Community Founders Love Prism",
    description: "Prism helps community founders grow faster by handling systems, design, and data.",
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
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-7 py-3 text-base"
                  >
                    View Pricing
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
              {communityExamples.map((example) => (
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
