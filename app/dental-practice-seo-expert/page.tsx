import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { HowToSchema, PersonSchema, ServiceSchema } from "@/components/schema-markup"
import { Button } from "@/components/ui/button"
import { CASE_STUDIES } from "@/lib/case-study-data"

export const metadata: Metadata = {
  title: {
    absolute: "Dentist SEO | Prism",
  },
  description:
    "Dentist SEO that helps dental practices rank higher in Google Maps (local pack) and organic search with listings, reviews, treatment pages, and technical cleanup tied to calls and bookings.",
  openGraph: {
    title: "Dentist SEO | Prism",
    description:
      "Dentist SEO that helps dental practices rank higher in Google Maps and organic search with listings, reviews, treatment pages, and ongoing optimization.",
    url: "https://www.design-prism.com/dental-practice-seo-expert",
    siteName: "prism",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism dental SEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dentist SEO | Prism",
    description:
      "Dentist SEO that helps dental practices rank higher in Google Maps and organic search with listings, reviews, treatment pages, and ongoing optimization.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://www.design-prism.com/dental-practice-seo-expert",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const primaryCta = {
  label: "Get a free analysis",
  href: "/free-analysis",
} as const

const secondaryCta = {
  label: "Talk to Prism",
  href: "/contact",
} as const

const whatYouGet = [
  {
    title: "audit + roadmap (first 7–14 days)",
    description:
      "we crawl your site, review your local presence, and ship a prioritized plan so you know exactly what to fix first and what compounds over time.",
  },
  {
    title: "treatment + location intent map",
    description:
      "we map pages to the searches patients actually make (implants, invisalign, emergency dentistry, etc.) so each page is the clearest possible answer.",
  },
  {
    title: "content briefs + on-page upgrades",
    description:
      "clear service explanations, financing and insurance expectations, and the right next step so traffic turns into calls, forms, and booked demand.",
  },
  {
    title: "maps + google business profile plan",
    description:
      "categories, services, attributes, photos, posts, and q&a aligned so your listings reinforce your website — and your website reinforces your listings.",
  },
  {
    title: "technical seo backlog + implementation",
    description:
      "speed, clean indexation, internal linking, schema, and canonical hygiene so engines can crawl, understand, and trust your practice.",
  },
  {
    title: "plain-english reporting tied to outcomes",
    description:
      "we track visibility against calls and forms so you always know what’s working and what we’re improving next.",
  },
]

const searches = [
  "dental implants",
  "invisalign",
  "emergency dentist",
  "root canal",
  "teeth whitening",
  "pediatric dentist",
  "cosmetic dentist",
  "dentist near me (maps + organic)",
]

const processSteps = [
  {
    step: "Audit",
    description: "crawl your site, map your listings, and identify the fastest wins plus the long-term plan.",
  },
  {
    step: "Architecture",
    description: "design the page map for treatments, locations, providers, and FAQs so relevance is unambiguous.",
  },
  {
    step: "Implementation",
    description: "ship the on-page and technical changes that improve crawlability, clarity, and conversion.",
  },
  {
    step: "Trust graph",
    description: "tighten listings + reviews + citations so google sees consistent, real-world proof.",
  },
  {
    step: "Iterate",
    description: "publish improvements and compound momentum with monthly strategy checkpoints.",
  },
]

const faqItems = [
  {
    question: "What is dentist SEO?",
    answer:
      "Dentist SEO (SEO for dentists) is improving your visibility in Google Maps/local pack and local organic rankings so nearby patients find you, trust you, and book — driven by Google Business Profile relevance, reviews, citations/NAP consistency, and patient-ready treatment pages.",
  },
  {
    question: "What does dentist SEO include?",
    answer:
      "Typically: Google Business Profile optimization, listings/citations cleanup, review strategy, treatment and location pages, technical SEO (indexation, speed, schema), and reporting tied to calls and bookings.",
  },
  {
    question: "How do you rank a dentist in Google Maps (the local pack)?",
    answer:
      "Start with accurate Google Business Profile categories/services, consistent NAP across directories, steady review velocity (and responses), correct address/service-area settings, and website pages that corroborate treatments and location. Avoid name stuffing and fake reviews.",
  },
  {
    question: "How long does dentist SEO take to work?",
    answer:
      "Quick wins can show up in weeks (fixing listings, technical issues, and page clarity). Competitive treatments and multi-location markets compound over months as trust and content depth grow.",
  },
  {
    question: "How much does dentist SEO cost?",
    answer:
      "It depends on your market and starting point. Most practices need an initial audit + cleanup, then ongoing monthly work for reviews, listings, content updates, and technical maintenance — priced around the scope you actually need, not a one-size retainer.",
  },
  {
    question: "Do dentists need location pages for SEO?",
    answer:
      "If you operate from real locations, yes — one clear page per location is usually helpful. Avoid dozens of near-duplicate “dentist in {city}” pages with the same copy (doorway patterns). For service-area coverage, pair correct GBP settings with content that clearly explains where you serve.",
  },
  {
    question: "Should dentists focus on Google Maps or organic search first?",
    answer:
      "Maps is often the fastest lever for local demand, but organic is the long-term moat. The best approach ships both together: tighten listings + reviews while improving one or two high-value treatment pages at a time.",
  },
  {
    question: "Are you an SEO consultant for dentists or an agency?",
    answer:
      "Prism is founder-led and consultant-driven. You can hire us for strategy-only consulting, consultant-led implementation, or full done-for-you delivery — the same roadmap either way, just different levels of hands-on execution.",
  },
  {
    question: "Do you guarantee #1 rankings?",
    answer:
      "No — and you should be skeptical of anyone who does. We focus on controllable levers: site structure, content quality, performance, listings consistency, and reputation systems that earn durable visibility.",
  },
  {
    question: "What should dentists look for in an SEO partner?",
    answer:
      "A consultant who talks in patient intent (treatments + location), ties work to calls and forms, understands Maps and listings, and can translate strategy into a real implementation backlog — not vague reports.",
  },
  {
    question: "What’s different about dental SEO vs. generic SEO?",
    answer:
      "Dentistry is high-trust and hyperlocal. You need clarity on treatments, strong review velocity, accurate listings, and pages that remove anxiety and friction for new patients.",
  },
  {
    question: "Can you help multi-location dental groups?",
    answer:
      "Yes. We standardize data and templates across locations while keeping unique local signals (service areas, provider pages, reviews, photos, and community proof).",
  },
  {
    question: "Will this help Google AI Overviews and chat-based search?",
    answer:
      "We build pages to be easily understood: clear headings, FAQs, structured data, and consistent off-site signals. That improves how engines summarize and cite your practice across modern search surfaces.",
  },
]

function getDentalCaseStudies() {
  const prioritySlugs = [
    "dr-christopher-wong",
    "town-centre-dental",
    "exquisite-dentistry",
    "wine-country-root-canal",
  ]

  const priority = prioritySlugs
    .map((slug) => CASE_STUDIES.find((study) => study.slug === slug))
    .filter((study): study is (typeof CASE_STUDIES)[number] => Boolean(study))

  const fallback = CASE_STUDIES.filter((study) => study.segments.includes("dental")).slice(0, 4)

  const unique = new Map<string, (typeof CASE_STUDIES)[number]>()

  for (const study of [...priority, ...fallback]) {
    unique.set(study.slug, study)
  }

  return Array.from(unique.values()).slice(0, 4)
}

export default function DentalPracticeSeoExpertPage() {
  const caseStudies = getDentalCaseStudies()

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-neutral-100 px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">dentist seo</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              dentist seo
            </h1>
            <p className="mt-6 text-base text-neutral-600 sm:text-lg">
              dentist seo (seo for dentists) helps your practice show up when nearby patients search — in google maps (the local pack), organic results, and ai-powered search.
              prism runs a consultant-led dentist seo system built around high-intent treatments, clean technical structure, and compounding trust signals across local + organic.
            </p>
            <p className="mt-6 text-sm text-neutral-500">
              want the full guide? read{" "}
              <Link
                href="/blog/dental-seo-guide"
                className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4"
              >
                dental seo guide
              </Link>
              .{" "}
              want the dentist-specific ai overviews checklist? read{" "}
              <Link
                href="/blog/ai-search-for-dental-practice"
                className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4"
              >
                ai search for dental practice
              </Link>
              . want the step-by-step checklist to rank higher in google? read{" "}
              <Link
                href="/blog/dental-practice-rank-higher-google-search"
                className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4"
              >
                dental practice rank higher in google search
              </Link>
              .
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-neutral-500">
              consultant-led. built for owner-dentists, specialty practices, and multi-location groups. expect clearer treatment pages, stronger
              maps visibility, and a roadmap tied to calls and bookings.
            </p>
          </div>
        </section>

        <section className="border-b border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">google maps</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                dentist seo: how google decides who shows up
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                local rankings are a scoring system built around three signals: relevance, distance, and prominence. dentist seo makes
                those signals unambiguous — with clean listings, strong reviews, and pages that corroborate what you do and where you do it.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "relevance",
                  description: "match the exact treatment + location intent behind searches.",
                  bullets: [
                    "google business profile categories + services reflect your real treatments",
                    "treatment pages mirror how patients search (implants, invisalign, emergency)",
                    "clear contact and location signals on-site",
                  ],
                },
                {
                  title: "distance (proximity)",
                  description: "be eligible in the geos that matter — accurately.",
                  bullets: [
                    "correct address or service-area settings (no “fake” locations)",
                    "one page per real location when you have multiple offices",
                    "consistent NAP across the web so google can match entities",
                  ],
                },
                {
                  title: "prominence",
                  description: "prove you’re trusted with steady real-world signals.",
                  bullets: [
                    "review velocity + specific patient feedback",
                    "citations and local mentions that corroborate your practice",
                    "engagement signals: calls, direction requests, website clicks",
                  ],
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold lowercase text-neutral-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">what we won’t do</p>
              <ul className="mt-4 space-y-2">
                {[
                  "keyword-stuff your business name in google business profile",
                  "buy fake reviews, links, or citation packages",
                  "publish thin “dentist in [city]” doorway pages",
                  "ship structured data that doesn’t match visible content",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-neutral-600">
                want the maps checklist? read{" "}
                <Link
                  href="/blog/google-maps-visibility-playbook-2025"
                  className="font-semibold text-neutral-900 underline underline-offset-4"
                >
                  google maps visibility checklist
                </Link>
                . need listings cleanup? start with{" "}
                <Link href="/local-listings" className="font-semibold text-neutral-900 underline underline-offset-4">
                  local listings
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                what dentist seo includes
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                dental seo is two systems working together: maps trust + website clarity. no tricks — just a repeatable process that makes your
                practice easier to understand, easier to trust, and easier to choose. these are the core dentist seo deliverables we ship.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">google maps</p>
                <h3 className="mt-3 text-lg font-semibold lowercase text-neutral-900">maps + local pack visibility</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  improve relevance, distance eligibility, and prominence signals — then track actions like calls and direction requests.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                  {[
                    "google business profile categories, services, attributes, and photos",
                    "review velocity and response systems",
                    "listings/citations consistency (NAP cleanup)",
                    "spam-safe improvement (no name stuffing, no fake reviews)",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-neutral-600">
                  need the listings subsystem? start with{" "}
                  <Link href="/local-listings" className="font-semibold text-neutral-900 underline underline-offset-4">
                    local listings
                  </Link>
                  .
                </p>
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">organic</p>
                <h3 className="mt-3 text-lg font-semibold lowercase text-neutral-900">treatment pages that convert</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  become the clearest answer for the services patients actually search — and make the next step obvious.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                  {[
                    "intent-mapped service pages (implants, invisalign, emergency, etc.)",
                    "internal linking that clarifies hierarchy (treatments, locations, providers, faqs)",
                    "technical hygiene: indexation, canonicals, performance, and schema",
                    "patient-ready answers: pricing context, timelines, and booking paths",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-neutral-600">
                  want a faster site foundation for compounding rankings? explore{" "}
                  <Link href="/dental-website" className="font-semibold text-neutral-900 underline underline-offset-4">
                    a dental practice website
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {whatYouGet.map((item) => (
                <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold lowercase text-neutral-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-white px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-center">
              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <Image
                    src="/enzo-avatar.png"
                    alt="Enzo Sison headshot"
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-2xl border border-neutral-200 bg-white object-cover"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">meet your consultant</p>
                    <p className="mt-2 text-lg font-semibold text-neutral-900">Enzo Sison</p>
                    <p className="mt-1 text-sm text-neutral-600">Founder, Prism</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-neutral-600">
                  Enzo works directly with dental teams on SEO strategy and implementation: intent-mapped pages, technical cleanup, listings
                  systems, and reporting tied to calls and forms.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild size="sm" className="rounded-full px-5">
                    <Link href="/why-dental-practices-love-prism">see dental proof</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="rounded-full px-5">
                    <Link href={secondaryCta.href}>talk to prism</Link>
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">engagement options</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                  dentist seo, your way
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  hire prism for consulting-only, consultant-led implementation, or full done-for-you delivery. the same roadmap either way —
                  just different levels of hands-on execution.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      title: "audit + roadmap",
                      description: "clear priorities, fast wins, and a 90-day plan.",
                    },
                    {
                      title: "monthly consulting",
                      description: "reviews, content direction, and a technical backlog your team can ship.",
                    },
                    {
                      title: "consultant-led delivery",
                      description: "we execute the work with your practice — end to end.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                      <p className="text-base font-semibold lowercase text-neutral-900">{item.title}</p>
                      <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">high-intent searches</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                rank for the treatments that pay
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                we build around service lines and local intent — so search engines connect the dots and patients find the
                exact page they need.
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {searches.map((term) => (
                <div
                  key={term}
                  className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-sm font-medium text-neutral-800 shadow-sm"
                >
                  {term}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">the process</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                how prism runs dentist seo
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                start with clarity, then earn trust. that’s how you get durable rankings and steady patient demand.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-5">
              {processSteps.map((item) => (
                <div key={item.step} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">{item.step}</p>
                  <h3 className="mt-3 text-base font-semibold lowercase text-neutral-900">{item.step.toLowerCase()}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/seo">see the seo overview</Link>
              </Button>
            </div>
          </div>
        </section>

        {caseStudies.length > 0 ? (
          <section className="border-t border-neutral-100 bg-white px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-5xl">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">proof</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                  dental case studies
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  see how prism supports real practices with modern websites, local presence, and growth systems.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {caseStudies.map((study) => (
                  <Link
                    key={study.slug}
                    href={`/case-studies/${study.slug}`}
                    className="block rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                      {study.category}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold lowercase text-neutral-900">{study.client}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{study.location}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="border-t border-neutral-100 bg-neutral-950 px-4 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">want more visibility this quarter?</h2>
            <p className="mt-4 text-base text-white/80 sm:text-lg">
              get a free analysis and a clear roadmap for rankings, listings, and patient conversion.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-white px-8 text-neutral-900 hover:bg-neutral-200">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-white/30 bg-transparent px-8 text-white hover:bg-white/10"
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/70">
              also exploring a website rebuild? start here:{" "}
              <Link href="/dental-website" className="font-medium text-white underline underline-offset-4">
                dental practice website blueprint
              </Link>
            </p>
          </div>
        </section>

        <FAQSection
          title="dentist seo questions"
          subtitle="what most dentists want to know before hiring an seo partner."
          items={faqItems}
        />

        <ScrollToTop />
      </main>

      <Footer />

      <ServiceSchema
        serviceId="dental-practice-seo-expert"
        name="Dentist SEO"
        description="Dentist SEO, including Google Maps optimization, listings, reviews, on-page structure, and technical cleanup tied to calls and bookings."
        serviceType="Dentist SEO services"
        areaServed="United States"
      />
      <HowToSchema
        name="Dentist SEO process"
        description="A repeatable dentist SEO system: audit, architecture, implementation, trust, and iteration."
        steps={processSteps.map((step) => ({
          name: step.step,
          text: step.description,
        }))}
      />

      <PersonSchema
        personId="enzo-sison"
        name="Enzo Sison"
        jobTitle="Founder & CEO"
        description="Founder of Prism, helping dental practices grow with SEO consulting, modern websites, and local visibility systems."
        image="https://www.design-prism.com/enzo-avatar.png"
        url="https://www.design-prism.com/dental-practice-seo-expert"
        sameAs={[
          "https://x.com/NosisTheGod",
          "https://www.linkedin.com/in/enzo-sison",
          "https://www.instagram.com/the_design_prism/",
        ]}
      />
    </div>
  )
}
