import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import MinimalWebsiteList from "@/components/minimal-website-list"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import ScrollToTop from "@/components/scroll-to-top"
import SeoTextSection from "@/components/seo-text-section"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"

export const metadata: Metadata = {
  title: "small business website portfolio & local seo wins | prism",
  description:
    "explore the small business websites and local presence optimizations we launch to attract qualified leads and convert more local customers for clients like you.",
  openGraph: {
    title: "small business website portfolio & local seo wins | prism",
    description:
      "explore the small business websites and local presence optimizations we launch to attract qualified leads and convert more local customers for clients like you.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://design-prism.com/websites",
  },
}

const websiteProjects = [
  {
    id: "4",
    title: "exquisite dentistry",
    url: "https://exquisitedentistryla.com/",
    category: "healthcare",
    description: "luxury cosmetic dentistry practice in beverly hills",
  },
  {
    id: "9",
    title: "belize kids",
    url: "https://belizekids.org",
    category: "nonprofit",
    description: "empowering children through education and community",
  },
  {
    id: "7",
    title: "laguna beach dental arts",
    url: "https://lagunabeachdentalarts.com",
    category: "healthcare",
    description: "exceptional dental care in coastal california",
  },
  {
    id: "3",
    title: "olympic bootworks",
    url: "https://www.olympicbootworks.com",
    category: "retail",
    description: "performance footwear and repair solutions",
  },
  {
    id: "5",
    title: "dr. christopher wong",
    url: "https://www.chriswongdds.com",
    category: "healthcare",
    description: "modern dental care with a personal touch",
  },
  {
    id: "12",
    title: "fantic bike warehouse",
    url: "https://fanticbikewarehouse.com/",
    category: "retail",
    description: "authorized dealer of premium italian motorcycles and e-bikes",
  },
  {
    id: "11",
    title: "coast periodontics",
    url: "https://www.coastperiodontics.com",
    category: "healthcare",
    description: "expert periodontal and implant care",
  },
  {
    id: "13",
    title: "grace dental santa rosa",
    url: "https://www.tingjenjidds.com/",
    category: "healthcare",
    description: "exceptional family dental care in santa rosa",
  },
  {
    id: "14",
    title: "town centre dental",
    url: "https://towncentredental.net/",
    category: "healthcare",
    description: "family dentistry with dr. gerard banaga in brentwood",
  },
  {
    id: "15",
    title: "family first smile care",
    url: "https://famfirstsmile.com/",
    category: "healthcare",
    description: "family-focused dental care in los gatos",
  },
  {
    id: "16",
    title: "rebellious aging",
    url: "https://rebelwithsuz.com/",
    category: "wellness",
    description: "age boldly—confidence, style, and plant-based longevity",
  },
  {
    id: "17",
    title: "canary foundation",
    url: "https://www.canaryfoundation.org/",
    category: "nonprofit",
    description: "early cancer detection research nonprofit",
  },
  {
    id: "18",
    title: "wine country root canal",
    url: "https://www.winecountryrootcanal.com/",
    category: "healthcare",
    description: "santa rosa endodontics—gentle root canal therapy",
  },
]

const whatWeDeliver = [
  {
    title: "brand-calibrated design",
    description: "modern ui that matches your visual identity and keeps every page cohesive.",
  },
  {
    title: "conversion-first architecture",
    description: "clear flows, persuasive copy, and ctas tuned to move visitors forward.",
  },
  {
    title: "content & positioning",
    description: "messaging that explains what you do fast and differentiates your offers.",
  },
  {
    title: "technical seo built in",
    description: "schema, semantic markup, and internal linking ready for organic and ai search.",
  },
  {
    title: "speed & accessibility",
    description: "core web vitals optimized with fast hosting, compressed media, and wcag-aware layouts.",
  },
  {
    title: "launch & handoff",
    description: "analytics, automations, and training so your team can confidently run the site day one.",
  },
]

const audienceSegments = [
  {
    name: "Dental & medical teams",
    description: "conversion-backed treatment pages, patient journeys, and ada-aware design to fill operatories.",
    href: "/why-dental-practices-love-prism",
  },
  {
    name: "Local shop owners",
    description: "product storytelling, local seo structure, and promo blocks that drive in-store and online sales.",
    href: "/why-local-shop-owners-love-prism",
  },
  {
    name: "Consulting & professional services",
    description: "case-study rich sites with thought leadership hubs and lead capture that start bigger engagements.",
    href: "/why-consulting-companies-love-prism",
  },
  {
    name: "Online community founders",
    description: "member onboarding, paywall-ready content, and event funnels that keep engagement high.",
    href: "/why-online-community-founders-love-prism",
  },
  {
    name: "Nonprofits & education",
    description: "mission-first storytelling, donation flows, and program pages that mobilize supporters.",
    href: "/why-nonprofits-love-prism",
  },
]

const processSteps = [
  {
    step: "Discover",
    description: "deep dive into goals, brand, users, and the content needed to win trust.",
  },
  {
    step: "Architect",
    description: "sitemap, wireframes, and messaging mapped to journeys across devices.",
  },
  {
    step: "Design",
    description: "high-fidelity layouts, component library, and motion cues refined with your feedback.",
  },
  {
    step: "Build",
    description: "next.js development, cms setup, qa, and integrations tested in staging.",
  },
  {
    step: "Launch",
    description: "analytics, automations, training, and a punch list to keep improving post-launch.",
  },
]

const performanceWins = [
  "Faster load times that reduce bounce rate and lift engagement.",
  "Clear offers and CTAs that turn more visitors into booked calls and form fills.",
  "Accessible, mobile-first layouts that meet buyers where they research.",
  "SEO-ready structure that supports long-term rankings and future campaigns.",
]

const handledForYou = [
  "Research & brand positioning",
  "Sitemap and information architecture",
  "Copy briefs and conversion messaging",
  "Custom UI kit and component library",
  "CMS setup and content migration",
  "Technical SEO and schema",
  "Form, CRM, and automation wiring",
  "Analytics, dashboards, and tagging",
  "Post-launch support and training",
]

const featuredArticle = {
  title: "from broken wordpress site to a high-converting dental experience",
  href: "/blog/from-broken-to-beautiful-dental-website-transformation",
  summary:
    "See how Prism rebuilt a dental practice’s neglected site into a calm, conversion-ready experience using Lovable for structure and Codex for engineering.",
  insights: [
    "Design principles that replaced clutter with clarity and storytelling.",
    "SEO + AEO architecture so Google and AI engines surface the practice.",
    "Operational mindset shifts that keep the site evolving after launch.",
  ],
}

const faqItems = [
  {
    question: "How long does a website project take?",
    answer:
      "Most builds take 6–10 weeks depending on scope, revisions, and content readiness. We set milestones up front so you always know what comes next.",
  },
  {
    question: "Can you work with our existing branding or platform?",
    answer:
      "Yes. We can refresh within your current brand system, migrate from platforms like Squarespace or WordPress, or launch net-new design systems.",
  },
  {
    question: "Do you write the copy and provide photography?",
    answer:
      "We collaborate on messaging using structured briefs, provide conversion copy support, and can manage photo sourcing or direct your team on what to capture.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We handle QA, analytics, automations, and training. Many clients keep us on retainer for CRO tests, content updates, or ongoing SEO.",
  },
]

export default function WebsitesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageViewTracker title="Websites Portfolio & Services" />
      <Navbar />

      <main className="flex-1">
        <section className="px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
              website design & development
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Websites engineered to convert and stay sharp long-term
            </h1>
            <p className="mt-6 text-base text-neutral-600 sm:text-lg">
              We plan, design, and build sites that reflect your brand, explain what you do fast, and turn
              the right visitors into booked calls, patients, customers, and donors.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/get-started?service=website-design">
                  {FREE_AUDIT_CTA_TEXT}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="#recent-work">See recent launches</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">what you get</h2>
            <p className="mt-3 text-neutral-600">
              Everything you need to launch a high-performing site with zero guesswork.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {whatWeDeliver.map(item => (
              <div key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm">
                <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="recent-work" className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">recent launches</h2>
              <p className="mt-3 text-neutral-600">
                A sampling of sites we designed, wrote, and built for teams across healthcare, retail,
                nonprofit, and professional services.
              </p>
            </div>
            <MinimalWebsiteList projects={websiteProjects} />
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-white px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">deep dive</span>
            <div className="mt-4 rounded-3xl border border-neutral-200 bg-neutral-50 p-8 shadow-sm sm:p-10">
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">{featuredArticle.title}</h2>
              <p className="mt-4 text-sm leading-6 text-neutral-600 sm:text-base">{featuredArticle.summary}</p>
              <ul className="mt-6 space-y-2 text-sm text-neutral-600">
                {featuredArticle.insights.map(point => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-neutral-900" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-8 rounded-full px-8">
                <Link href={featuredArticle.href}>
                  Read the full transformation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">who we help</h2>
            <p className="mt-3 text-neutral-600">
              Growth-minded local teams across verticals that need a site built to convert, rank, and evolve fast.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {audienceSegments.map(segment => (
              <Link
                key={segment.name}
                href={segment.href}
                className="group block rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-50"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">segment</span>
                <div className="mt-2">
                  <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-neutral-800">{segment.name}</h3>
                  <p className="mt-2 text-sm text-neutral-600 group-hover:text-neutral-700">{segment.description}</p>
                </div>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-neutral-900/70 group-hover:text-neutral-900">
                  Explore why this works
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-neutral-200 bg-white p-8 text-left shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">referral program</span>
              <h3 className="mt-3 text-2xl font-semibold lowercase text-neutral-900">know a team who needs a better website?</h3>
              <p className="mt-3 text-sm text-neutral-600">
                Share Prism’s referral program and we’ll send them a free analysis. If they launch with us, you earn a payout for the intro.
              </p>
            </div>
            <Button asChild size="lg" className="mt-6 rounded-full px-8 sm:mt-0">
              <Link href="/refer">refer a business</Link>
            </Button>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">our simple process</h2>
            <p className="mt-3 text-neutral-600">
              Fast to launch, collaborative through revisions, and clear about responsibilities.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl space-y-4">
            {processSteps.map((stage, index) => (
              <div
                key={stage.step}
                className="flex flex-col gap-3 rounded-2xl border border-neutral-200 p-6 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">{stage.step}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-900 px-4 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold lowercase sm:text-4xl">performance wins you can see</h2>
            <p className="mt-3 text-neutral-300">
              Impact that shows up in analytics, search rankings, and how fast prospects choose you.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {performanceWins.map(item => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
                <div className="mt-1 rounded-full bg-white/10 p-1">
                  <Check className="h-4 w-4" />
                </div>
                <p className="text-sm text-neutral-100">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">what we handle for you</h2>
            <p className="mt-3 text-neutral-600">Full-service delivery so your team can focus on running the business.</p>
          </div>
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {handledForYou.map(item => (
              <span key={item} className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700">
                {item}
              </span>
            ))}
          </div>
        </section>

        <FAQSection
          title="website design faq"
          subtitle="Straight answers about scope, timeline, and what collaboration looks like."
          items={faqItems}
          className="bg-neutral-50"
        />

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Ready to launch a better website?
            </h2>
            <p className="mt-4 text-neutral-600 sm:text-lg">
              We’ll map a clear plan, design the system, and build a site that keeps working long after launch.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/get-started?service=website-design">
                  {FREE_AUDIT_CTA_TEXT}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/contact">Talk to a strategist</Link>
              </Button>
            </div>
          </div>
        </section>

        <SeoTextSection title="custom website design & development">
          <p>
            we build fast, accessible, search-friendly websites that turn traffic into pipeline. our approach
            blends brand clarity, information architecture, and technical seo—clean markup, semantic headings,
            structured data, and image performance—to help you rank and convert on mobile. made with next.js
            and a design system you can iterate on.
          </p>
        </SeoTextSection>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
