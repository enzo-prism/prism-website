"use client"

import { CaseStudySectionNav } from "@/components/case-studies/CaseStudySectionNav"
import Footer from "@/components/footer"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import YouTubeVideoEmbed from "@/components/youtube-video-embed"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { trackCTAClick } from "@/utils/analytics"
import { ArrowLeft, ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ReactNode, useEffect } from "react"

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })
const FounderImpactGraph = dynamic(
  () => import("@/components/case-studies/FounderImpactGraph").then((m) => m.FounderImpactGraph),
  { ssr: false, loading: () => <Skeleton className="h-64 w-full rounded-2xl" /> }
)

const HERO_VIDEO_ID = "Cgi7CZHMYQ0"

const cs = CASE_STUDIES.find((item) => item.slug === "olympic-bootworks")

type ListItem = {
  title: string
  description: ReactNode
}

type StackItem = {
  heading: string
  body: ReactNode
  bullets?: ReactNode[]
}

type StoryStep = {
  id: string
  title: string
  content: ReactNode
}

const quickFacts = [
  { label: "Location", value: "Tahoe, CA" },
  { label: "Focus", value: "Ecommerce + multi-site launch" },
  { label: "Practice", value: "Olympic Bootworks" },
  { label: "Scope", value: "Website rebuild, ecommerce, POS-linked catalog, multi-site, analytics, workspace" },
]

const jumpLinks = [
  { id: "products", label: "Products & Services" },
  { id: "technology", label: "Technology" },
  { id: "story", label: "Story" },
  { id: "outcomes", label: "Outcomes" },
  { id: "meaning", label: "Lessons" },
  { id: "cta", label: "CTA" },
]

const designServices: ListItem[] = [
  {
    title: "Website UX & layout design",
    description: (
      <>
        Designing a new site experience to replace the old, bare-bones Squarespace website and support full ecommerce ({" "}
        <Link href="/websites" className="font-medium text-neutral-900 underline underline-offset-4">
          websites
        </Link>
        ,{" "}
        <Link href="/services" className="font-medium text-neutral-900 underline underline-offset-4">
          services
        </Link>
        ).
      </>
    ),
  },
  {
    title: "Brand asset formatting",
    description: (
      <>Using Figma to reformat existing logo and brand assets for navigation logos, favicons, open graph images, and product imagery treatments.</>
    ),
  },
  {
    title: "Video editing & content packaging",
    description: (
      <>
        Editing raw videos from Olympians and winter-sport athletes into hero/story content, Fantic promos, and reusable assets ({" "}
        <Link href="/hottest-content" className="font-medium text-neutral-900 underline underline-offset-4">
          hottest-content
        </Link>
        ,{" "}
        <Link href="/youtube" className="font-medium text-neutral-900 underline underline-offset-4">
          youtube
        </Link>
        ).
      </>
    ),
  },
]

const engineeringServices: ListItem[] = [
  {
    title: "Full website rebuild",
    description: (
      <>
        Replacing the legacy Squarespace site with a modern, mobile-first{" "}
        <Link href="/websites" className="font-medium text-neutral-900 underline underline-offset-4">
          website
        </Link>{" "}
        built to support ecommerce and local search.
      </>
    ),
  },
  {
    title: "Ecommerce implementation",
    description: (
      <>Integrating the existing POS-linked ecommerce provider (non-Shopify) into the new site, including catalog, SKUs, inventory sync, and purchasing flow.</>
    ),
  },
  {
    title: "Multi-site architecture",
    description: (
      <>Launching a new Olympic Bootworks site with ecommerce plus a dedicated "Fantic Warehouse" microsite focused on Tahoe mountain bikes and Fantic inventory.</>
    ),
  },
  {
    title: "Platform migrations",
    description: (
      <>
        Starting with an early{" "}
        <Link href="/ai-website-launch" className="font-medium text-neutral-900 underline underline-offset-4">
          AI website launch
        </Link>{" "}
        using Vercel v0, then migrating both sites onto{" "}
        <Link href="/replit" className="font-medium text-neutral-900 underline underline-offset-4">
          Replit
        </Link>{" "}
        for long-term development and stability.
      </>
    ),
  },
  {
    title: "Analytics & SEO stack",
    description: (
      <>
        Implementing Google Analytics, Google Search Console, Semrush, and Hotjar feeding into Prism&apos;s{" "}
        <Link href="/seo" className="font-medium text-neutral-900 underline underline-offset-4">
          SEO
        </Link>{" "}
        and{" "}
        <Link href="/growth" className="font-medium text-neutral-900 underline underline-offset-4">
          growth
        </Link>{" "}
        workflows.
      </>
    ),
  },
  {
    title: "Forms & lead capture",
    description: (
      <>
        Using Typeform for contact and order-related forms, integrated directly into both sites ({" "}
        <Link href="/apps" className="font-medium text-neutral-900 underline underline-offset-4">
          apps
        </Link>
        ).
      </>
    ),
  },
  {
    title: "Google Ads + Workspace setup",
    description: (
      <>
        Working with the shop manager to set up and refine{" "}
        <Link href="/google" className="font-medium text-neutral-900 underline underline-offset-4">
          Google Ads
        </Link>{" "}
        campaigns, stand up Google Workspace, and configure custom emails with reliable DNS.
      </>
    ),
  },
]

const productsDelivered: ListItem[] = [
  {
    title: "New Olympic Bootworks website",
    description: (
      <>
        Modern, mobile-first{" "}
        <Link href="/smb" className="font-medium text-neutral-900 underline underline-offset-4">
          SMB website
        </Link>{" "}
        with ecommerce capabilities.
      </>
    ),
  },
  {
    title: "Fantic Warehouse microsite",
    description: <>Dedicated ecommerce site focused on Fantic e-bikes, optimized for Tahoe riders searching online.</>,
  },
  {
    title: "Video content library",
    description: <>Edited athlete testimonials and product footage used across the sites and future campaigns.</>,
  },
  {
    title: "Clean email + domain setup",
    description: <>Properly owned and configured domain and Workspace stack, free from legacy provider lock-in.</>,
  },
]

const engineeringStack: StackItem[] = [
  {
    heading: "Phase 1 - Legacy to first upgrade",
    body: (
      <>
        Started from a basic Squarespace site with a simple contact form. Moved to a Next.js-style build via Vercel v0 as an early{" "}
        <Link href="/ai-website-launch" className="font-medium text-neutral-900 underline underline-offset-4">
          AI-assisted website build
        </Link>
        .
      </>
    ),
  },
  {
    heading: "Phase 2 - Multi-site and POS-linked ecommerce",
    body: (
      <>Integrated a third-party ecommerce system bolted onto the existing POS (non-Shopify), keeping online inventory in sync with in-store sales.</>
    ),
  },
  {
    heading: "Phase 3 - Replit + AI CLI",
    body: (
      <>
        Migrated both the main Olympic Bootworks site and the Fantic Warehouse microsite onto{" "}
        <Link href="/replit" className="font-medium text-neutral-900 underline underline-offset-4">
          Replit
        </Link>
        , using Git + AI CLIs (OpenAI Codex, Claude Code, Cursor) for faster, safer iteration ({" "}
        <Link href="/ai" className="font-medium text-neutral-900 underline underline-offset-4">
          ai
        </Link>
        ,{" "}
        <Link href="/openai" className="font-medium text-neutral-900 underline underline-offset-4">
          openai
        </Link>
        ).
      </>
    ),
  },
]

const analyticsStack: StackItem[] = [
  {
    heading: "Analytics / SEO",
    body: (
      <>
        Google Analytics, Google Search Console, Semrush, and Hotjar feeding into the{" "}
        <Link href="/growth" className="font-medium text-neutral-900 underline underline-offset-4">
          growth
        </Link>{" "}
        process and{" "}
        <Link href="/seo" className="font-medium text-neutral-900 underline underline-offset-4">
          SEO
        </Link>
        improvements over time.
      </>
    ),
  },
  {
    heading: "Apps & forms",
    body: (
      <>
        Typeform for structured, mobile-friendly forms integrated across both sites ({" "}
        <Link href="/apps" className="font-medium text-neutral-900 underline underline-offset-4">
          apps
        </Link>
        ).
      </>
    ),
  },
  {
    heading: "Google Workspace & email",
    body: (
      <>
        Domain and email moved off an old provider into a properly owned Google Workspace with clean DNS ({" "}
        <Link href="/google" className="font-medium text-neutral-900 underline underline-offset-4">
          google
        </Link>
        ).
      </>
    ),
  },
]

const designStack: StackItem[] = [
  {
    heading: "Design",
    body: (
      <>
        Figma for layout, component design, and adapting the Olympic Bootworks brand to modern digital surfaces ({" "}
        <Link href="/designs" className="font-medium text-neutral-900 underline underline-offset-4">
          designs
        </Link>
        ).
      </>
    ),
  },
  {
    heading: "Media",
    body: (
      <>Editing client-provided footage and high-quality assets sourced from Fantic&apos;s European dealer dashboard for each bike SKU.</>
    ),
  },
]

const storySteps: StoryStep[] = [
  {
    id: "story-1",
    title: "1. A Legendary Brand with an Outdated Website",
    content: (
      <>
        <p className="text-neutral-700">Olympic Bootworks is not a typical local shop:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>Two locations in Tahoe</li>
          <li>Famous in the Bay Area and among serious skiers</li>
          <li>Serves Olympians and elite winter-sport athletes</li>
          <li>Founded by Buck Brown, an engineer who invented a heel-lock bootfitting technology</li>
        </ul>
        <p className="text-neutral-700">Offline, they were the trusted place. Online, they had a basic Squarespace site, a single form, and no real SEO or local optimization.</p>
        <p className="text-neutral-700">Buck stocked a warehouse full of Fantic e-bikes and needed an online channel to move inventory. That was the starting point.</p>
      </>
    ),
  },
  {
    id: "story-2",
    title: "2. Building the First Ecommerce Experience",
    content: (
      <>
        <p className="text-neutral-700">Mandate: help sell high-end Fantic e-bikes online.</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>Designed a new site experience worthy of the brand.</li>
          <li>Built ecommerce flow on their POS-linked provider (catalog, SKU data, inventory sync, checkout).</li>
          <li>Optimized for mobile, search, and local discovery ({" "}
            <Link href="/websites" className="font-medium text-neutral-900 underline underline-offset-4">
              websites
            </Link>
            ,{" "}
            <Link href="/seo" className="font-medium text-neutral-900 underline underline-offset-4">
              seo
            </Link>
            ).
          </li>
        </ul>
        <p className="text-neutral-700">This was Prism&apos;s first real ecommerce build - fulfillment, POS sync, inventory accuracy, and sales-focused UX.</p>
      </>
    ),
  },
  {
    id: "story-3",
    title: "3. Dealing with Real-World Constraints",
    content: (
      <>
        <p className="text-neutral-700">Constraints: non-Shopify POS-linked ecommerce, clunky admin, early Vercel v0 integration challenges.</p>
        <p className="text-neutral-700">Prism had to wire the POS ecommerce into the site without breaking UX, using early AI tools to navigate admin, sync inventory, and configure products.</p>
        <p className="text-neutral-700">Design compromises were made where the vendor&apos;s ecommerce layer limited implementation.</p>
      </>
    ),
  },
  {
    id: "story-4",
    title: "4. Creating a Dedicated Fantic Warehouse Microsite",
    content: (
      <>
        <p className="text-neutral-700">Fantic deserved its own experience.</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>Launched a second site: Fantic Warehouse, focused on Fantic e-bikes in Tahoe.</li>
          <li>Full ecommerce tailored to riders searching specifically for e-bikes.</li>
          <li>Two-site structure: brand site for bootfitting/services + product site optimized for inventory turnover and search.</li>
        </ul>
      </>
    ),
  },
  {
    id: "story-5",
    title: "5. Migrating Everything to Replit + AI",
    content: (
      <>
        <p className="text-neutral-700">Moved the main site off Vercel v0 and onto Replit; kept Fantic Warehouse on Replit.</p>
        <p className="text-neutral-700">Standardized on Git + AI CLIs (OpenAI Codex, Claude Code, Cursor) for faster, safer iteration ({" "}
          <Link href="/ai" className="font-medium text-neutral-900 underline underline-offset-4">
            ai
          </Link>
          ,{" "}
          <Link href="/openai" className="font-medium text-neutral-900 underline underline-offset-4">
            openai
          </Link>
          ).</p>
        <p className="text-neutral-700">Result: faster edits, fewer lingering bugs, maintainable codebase, weekly shipping cadence.</p>
      </>
    ),
  },
  {
    id: "story-6",
    title: "6. The DNS / Email Fire and Google Workspace Setup",
    content: (
      <>
        <p className="text-neutral-700">Domain lived on an old GoDaddy account; moved into a founder-owned Squarespace domain.</p>
        <p className="text-neutral-700">Hidden DNS powered email; breakage occurred after grace period. Prism reverse-engineered DNS, coordinated with the old provider, recreated records, and stood up Google Workspace with stable custom email ({" "}
          <Link href="/google" className="font-medium text-neutral-900 underline underline-offset-4">
            google
          </Link>
          ).</p>
        <p className="text-neutral-700">Outcome: owned domain, modern email stack, no more provider lock-in.</p>
      </>
    ),
  },
  {
    id: "story-7",
    title: "7. Using AI as a Real Co-Pilot",
    content: (
      <>
        <p className="text-neutral-700">Prism leaned on AI as an accelerant:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>Used GPT-3.x to navigate the ecommerce vendor&apos;s confusing dashboard and integration model.</li>
          <li>Used Codex and later Claude Code to implement and refactor code in Replit.</li>
          <li>Used Semrush and analytics to guide SEO/content improvements ({" "}
            <Link href="/seo" className="font-medium text-neutral-900 underline underline-offset-4">
              seo
            </Link>
            ,{" "}
            <Link href="/growth" className="font-medium text-neutral-900 underline underline-offset-4">
              growth
            </Link>
            ).
          </li>
        </ul>
        <p className="text-neutral-700">Pattern: human judgment + AI tools + tight collaboration with the Olympic Bootworks team.</p>
      </>
    ),
  },
]

const outcomes = [
  "Traffic, search impressions, and online engagement have compounded over time.",
  "Olympic Bootworks went from great store, weak website to a two-site system for brand and ecommerce.",
  "Fantic inventory gained a real online sales channel instead of sitting on the floor for walk-ins.",
  "The business escaped technical debt on website and email, moving to owned infrastructure.",
  "Prism gained deep ecommerce and POS integration experience feeding the Prism flywheel.",
]

const meaningBullets = [
  "You already have a brand, loyal customers, and product-market fit.",
  "You don&apos;t have time to untangle domains, POS + ecommerce, modern analytics, and AI tooling.",
  "Patients/clients need clear reasons to stay; new buyers need clear reasons to try you.",
]

const meaningList = [
  "Prism owns your website, SEO, analytics + growth engine, and Google integration.",
  "We work inside your constraints (existing POS, legacy vendors) and still ship real outcomes.",
  (
    <>
      We help local or specialty shops punch above their weight online ({" "}
      <Link href="/why-local-shop-owners-love-prism" className="font-medium text-neutral-900 underline underline-offset-4">
        why-local-shop-owners-love-prism
      </Link>
      ).
    </>
  ),
]

export default function OlympicBootworksCaseStudy() {
  useEffect(() => {
    const hero = document.getElementById("static-olympic-hero")
    if (hero) {
      hero.setAttribute("data-hydrated-hidden", "true")
      hero.setAttribute("aria-hidden", "true")
      hero.style.display = "none"
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
	        {/* Hero Block */}
	        <section className="border-b bg-neutral-50 px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-5xl space-y-12 px-4 md:px-6">
            <div className="space-y-4 max-w-3xl">
              <span className="inline-flex w-fit items-center rounded-full bg-neutral-900 px-4 py-1 text-sm font-medium text-white">
                Case study
              </span>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Case Study: Olympic Bootworks - Turning a Legendary Ski Shop into an AI-Powered Ecommerce Engine
              </h1>
              <p className="text-lg text-neutral-700">From legendary bootfitting shop to modern multi-site ecommerce machine in Tahoe.</p>
              <p className="text-neutral-700">
                Prism partnered with Olympic Bootworks, a two-location ski shop in Tahoe led by engineer and inventor Buck Brown, to rebuild their web presence from a basic Squarespace page into a full ecommerce system for selling Fantic e-bikes and showcasing their heel-lock bootfitting tech.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-700">
                    <span className="font-medium text-neutral-900">{fact.label}:</span> {fact.value}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <YouTubeVideoEmbed
                  videoId={HERO_VIDEO_ID}
                  title="Olympic Bootworks Case Study Interview"
                  className="w-full"
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-3 rounded-xl border bg-white p-6 shadow-sm">
                  <p className="text-neutral-700">Snapshot of the new Olympic Bootworks + Fantic Warehouse experience.</p>
                  <p className="text-neutral-700">Scroll for products, stack, story, and outcomes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CaseStudySectionNav sections={jumpLinks} containerClassName="max-w-5xl" ariaLabel="olympic bootworks case study sections" />

        {/* Products & Services */}
        <section id="products" data-case-study-section className="px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-10 px-4 md:px-6">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Products &amp; Services Delivered by Prism for Olympic Bootworks</h2>
              <p className="text-neutral-700">
                Olympic Bootworks already had fanatical customers, Olympians as clients, and a real engineering invention. They needed a modern web stack and a way to move serious bike inventory online. Prism stepped in.
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="text-2xl font-semibold tracking-tight">Design Services</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {designServices.map((item) => (
                    <div key={item.title} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                      <p className="font-semibold text-neutral-900">{item.title}</p>
                      <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="text-2xl font-semibold tracking-tight">Engineering Services</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {engineeringServices.map((item) => (
                    <div key={item.title} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                      <p className="font-semibold text-neutral-900">{item.title}</p>
                      <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="text-2xl font-semibold tracking-tight">Products Delivered</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {productsDelivered.map((item) => (
                    <div key={item.title} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                      <p className="font-semibold text-neutral-900">{item.title}</p>
                      <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Applied */}
        <section id="technology" data-case-study-section className="border-t bg-neutral-50 px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-8 px-4 md:px-6">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Technology Applied</h2>
              <p className="text-neutral-700">Where Prism cut its teeth on ecommerce, POS integration, and multi-site architecture under real constraints.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:col-span-2">
                <div className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-600">
                  Engineering stack evolution
                </div>
                <div className="space-y-4">
                  {engineeringStack.map((item) => (
                    <div key={item.heading} className="rounded-lg border border-neutral-100 bg-neutral-50/70 p-4">
                      <p className="font-semibold text-neutral-900">{item.heading}</p>
                      <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{item.body}</p>
                      {item.bullets && (
                        <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                          {item.bullets.map((bullet, idx) => (
                            <li key={`${item.heading}-${idx}`} className="flex gap-2">
                              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-600">
                  Analytics & apps
                </div>
                <div className="space-y-4">
                  {analyticsStack.map((item) => (
                    <div key={item.heading} className="rounded-lg border border-neutral-100 bg-neutral-50/70 p-4">
                      <p className="font-semibold text-neutral-900">{item.heading}</p>
                      <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                  <p className="font-semibold text-neutral-900">Design stack</p>
                  {designStack.map((item) => (
                    <div key={item.heading} className="space-y-2 rounded-md border border-neutral-100 bg-white p-3">
                      <p className="font-semibold text-neutral-900">{item.heading}</p>
                      <p className="text-sm text-neutral-700 leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section id="story" data-case-study-section className="px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-8 px-4 md:px-6">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">The Story: How Prism Helped Olympic Bootworks Go from Legendary Offline to Serious Online</h2>
            </div>
            <div className="relative space-y-8">
              <div className="absolute left-4 top-0 h-full w-px bg-neutral-200 md:left-6" aria-hidden="true" />
              {storySteps.map((step, idx) => (
                <div key={step.id} id={step.id} className="relative grid gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:grid-cols-[auto,1fr]">
                  <div className="relative flex h-full items-start justify-start">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold tracking-tight text-neutral-900">{step.title}</h3>
                    <div className="space-y-3 text-sm leading-relaxed">{step.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section id="outcomes" data-case-study-section className="border-t bg-neutral-50 px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-6 px-4 md:px-6">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Outcomes &amp; Impact (Qualitative)</h2>
            <FounderImpactGraph />
            <div className="grid gap-4 md:grid-cols-2">
              {outcomes.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                  <p className="text-sm leading-relaxed text-neutral-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lessons / What This Means */}
        <section id="meaning" data-case-study-section className="px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-6 px-4 md:px-6">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Lessons for Other Local Shops &amp; SMBs</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <p className="text-neutral-700">If you have brand and product-market fit but limited bandwidth for digital:</p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {meaningBullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <p className="text-neutral-700">Prism&apos;s role:</p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {meaningList.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA / Next Steps */}
        <section id="cta" data-case-study-section className="border-t bg-neutral-50 px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-8 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">CTA / Next Steps</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>
                  See more{" "}
                  <Link href="/case-studies" className="font-medium text-neutral-900 underline underline-offset-4">
                    case studies
                  </Link>{" "}
                  and{" "}
                  <Link href="/proof" className="font-medium text-neutral-900 underline underline-offset-4">
                    proof
                  </Link>
                  .
                </li>
                <li>
                  Learn{" "}
                  <Link href="/why-local-shop-owners-love-prism" className="font-medium text-neutral-900 underline underline-offset-4">
                    why local shop owners love Prism
                  </Link>
                  .
                </li>
                <li>
                  Get a{" "}
                  <Link href="/free-analysis" className="font-medium text-neutral-900 underline underline-offset-4">
                    free analysis
                  </Link>{" "}
                  of your current website, ecommerce setup, and local presence.
                </li>
                <li>
                  Or go straight to{" "}
                  <Link href="/get-started" className="font-medium text-neutral-900 underline underline-offset-4">
                    get started
                  </Link>{" "}
                  or{" "}
                  <Link href="/contact" className="font-medium text-neutral-900 underline underline-offset-4">
                    contact
                  </Link>{" "}
                  to talk about your shop.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-neutral-900">Ready to upgrade your shop&apos;s online engine?</p>
                  <p className="text-sm text-neutral-700">Apply the Olympic Bootworks playbook to your ecommerce and local presence.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/get-started">
                    <Button className="rounded-full px-6 py-3 text-base" onClick={() => trackCTAClick(FREE_AUDIT_CTA_TEXT, "olympic case study cta")}>
                      {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="rounded-full px-6 py-3 text-base">
                      Talk with us <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/case-studies">
                  <Button variant="outline" className="rounded-full">
                    <ArrowLeft className="mr-2 h-4 w-4" /> All case studies
                  </Button>
                </Link>
                <Link href="/get-started">
                  <Button variant="ghost" className="rounded-full">
                    Get started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <CaseStudySchema
        title="Case Study: Olympic Bootworks - Turning a Legendary Ski Shop into an AI-Powered Ecommerce Engine"
        description="Prism transformed Olympic Bootworks from a basic site into a multi-site ecommerce system for Fantic bikes and heel-lock bootfitting tech."
        url={cs?.structured?.canonicalUrl ?? "https://www.design-prism.com/case-studies/olympic-bootworks"}
        imageUrl={cs?.structured?.heroImage ?? "https://www.design-prism.com/olympic-bootworks-hero.png"}
        datePublished={cs?.structured?.datePublished ?? "2025-02-15T00:00:00.000Z"}
        dateModified={cs?.structured?.dateModified ?? "2025-02-15T00:00:00.000Z"}
	        clientName="Olympic Bootworks"
	        outcome="Modern ecommerce and multi-site system for a legendary Tahoe ski shop and Fantic bike inventory."
	        breadcrumbs={[
	          { name: "Home", url: "https://www.design-prism.com" },
	          { name: "Case Studies", url: "https://www.design-prism.com/case-studies" },
	          { name: "Olympic Bootworks", url: "https://www.design-prism.com/case-studies/olympic-bootworks" },
	        ]}
        organization={{
          name: "Prism",
          url: "https://www.design-prism.com",
          logo: "https://www.design-prism.com/logo.png",
          sameAs: ["https://www.linkedin.com/company/prism-digital", "https://www.youtube.com/@designprism"],
        }}
        video={{
          name: "Olympic Bootworks Case Study Interview",
          description:
            "A quick interview walkthrough of how Prism rebuilt Olympic Bootworks' website and launched a POS-linked ecommerce system for Fantic bikes.",
          embedUrl: `https://www.youtube.com/embed/${HERO_VIDEO_ID}`,
          uploadDate: cs?.structured?.datePublished ?? "2025-02-15T00:00:00.000Z",
          thumbnailUrl: cs?.structured?.heroImage ?? "https://www.design-prism.com/olympic-bootworks-hero.png",
        }}
        faq={[
          {
            question: "What did Prism deliver for Olympic Bootworks?",
            answer:
              "Full site rebuild, POS-linked ecommerce, multi-site architecture with Fantic Warehouse, analytics stack, Typeform flows, Google Ads, and Workspace setup.",
          },
          {
            question: "What technology stack was used?",
            answer:
              "Figma, Vercel v0 early build, POS-linked ecommerce, later migrated to Replit with AI CLIs (Codex, Claude, Cursor), plus GA/GSC/Semrush/Hotjar and Typeform.",
          },
          {
            question: "How did Prism handle legacy DNS and email?",
            answer:
              "Moved the domain into founder ownership, recreated missing DNS records, and stood up Google Workspace with reliable custom email.",
          },
          {
            question: "What were the outcomes?",
            answer:
              "A modern two-site system, real online channel for Fantic bikes, improved search and engagement, and freed from legacy provider lock-in.",
          },
        ]}
      />
      <div className="mt-12">
        <SocialShare
          url="https://www.design-prism.com/case-studies/olympic-bootworks"
          imageUrl={cs?.structured?.heroImage ?? "https://www.design-prism.com/olympic-bootworks-hero.png"}
          title="Case Study: Olympic Bootworks"
          description="How Prism turned an iconic Tahoe ski shop into a modern ecommerce and growth system."
        />
      </div>
    </div>
  )
}
