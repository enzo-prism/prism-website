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

export const metadata: Metadata = {
  title: "Small Business Website Portfolio & Local SEO Wins | Prism",
  description:
    "Explore the small business websites and local presence optimizations we launch to attract qualified leads and convert more local customers for clients like you.",
  openGraph: {
    title: "Small Business Website Portfolio & Local SEO Wins | Prism",
    description:
      "Explore the small business websites and local presence optimizations we launch to attract qualified leads and convert more local customers for clients like you.",
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
    title: "Brand-calibrated design",
    description: "Modern UI that matches your visual identity and keeps every page cohesive.",
  },
  {
    title: "Conversion-first architecture",
    description: "Clear flows, persuasive copy, and CTAs tuned to move visitors forward.",
  },
  {
    title: "Content & positioning",
    description: "Messaging that explains what you do fast and differentiates your offers.",
  },
  {
    title: "Technical SEO built in",
    description: "Schema, semantic markup, and internal linking ready for organic and AI search.",
  },
  {
    title: "Speed & accessibility",
    description: "Core Web Vitals optimized with fast hosting, compressed media, and WCAG-aware layouts.",
  },
  {
    title: "Launch & handoff",
    description: "Analytics, automations, and training so your team can confidently run the site day one.",
  },
]

const industriesServed = [
  {
    name: "Dental & medical groups",
    why: "Trust-building design, treatment pages, and HIPAA-minded conversions for patient growth.",
  },
  {
    name: "Home & field services",
    why: "Quote, booking, and service area pages that help you win the local comparison shopper.",
  },
  {
    name: "Professional services",
    why: "Clear expertise, case studies, and lead capture that support high-consideration sales cycles.",
  },
  {
    name: "Retail & ecommerce",
    why: "Narrative-rich product storytelling plus fast PDPs that convert lookers into buyers.",
  },
  {
    name: "Nonprofits & education",
    why: "Impact-driven storytelling, donation funnels, and event promotion that mobilize supporters.",
  },
  {
    name: "Multi-location brands",
    why: "Modular systems so each location stays on-brand while highlighting local proof and offers.",
  },
]

const processSteps = [
  {
    step: "Discover",
    description: "Deep dive into goals, brand, users, and the content needed to win trust.",
  },
  {
    step: "Architect",
    description: "Sitemap, wireframes, and messaging mapped to journeys across devices.",
  },
  {
    step: "Design",
    description: "High-fidelity layouts, component library, and motion cues refined with your feedback.",
  },
  {
    step: "Build",
    description: "Next.js development, CMS setup, QA, and integrations tested in staging.",
  },
  {
    step: "Launch",
    description: "Analytics, automations, training, and a punch list to keep improving post-launch.",
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
                  Get a custom site plan
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

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">who we build for (and why)</h2>
            <p className="mt-3 text-neutral-600">
              Modular systems built for teams that need credibility, clarity, and measurable growth.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {industriesServed.map(industry => (
              <div key={industry.name} className="rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm">
                <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">industry</span>
                <h3 className="mt-2 text-xl font-semibold text-neutral-900">{industry.name}</h3>
                <p className="mt-2 text-sm text-neutral-600">{industry.why}</p>
              </div>
            ))}
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
                  Get a custom site plan
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
