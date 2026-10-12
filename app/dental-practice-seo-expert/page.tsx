import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Search } from "lucide-react"

import Footer from "@/components/footer"
import {
  ArrowLink,
  Callout,
  CheckList,
  DentalFaq,
  DentalProofStat,
  StepRail,
  TextLink,
} from "@/components/landing/dental/primitives"
import { LandingHero } from "@/components/landing/landing-hero"
import Navbar from "@/components/navbar"
import { BrowserFrame } from "@/components/prism/browser-frame"
import { FinalCta } from "@/components/prism/final-cta"
import { Reveal } from "@/components/prism/reveal"
import { Section, SectionHeader } from "@/components/prism/section"
import { SpotlightCard } from "@/components/prism/spotlight-card"
import { WaitlistButton } from "@/components/prism/waitlist-button"
import { FAQSchema, HowToSchema, PersonSchema, ServiceSchema } from "@/components/schema-markup"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { buildRouteMetadata } from "@/lib/seo/metadata"
import { WAITLIST_CTA } from "@/lib/waitlist"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Dental SEO',
  description: 'Improve Google Maps visibility, treatment pages, and organic search with dental SEO tied to patient calls.',
  path: "/dental-practice-seo-expert",
  ogImage: "/prism-opengraph.png",
})

const primaryCta = {
  label: WAITLIST_CTA.label,
  href: WAITLIST_CTA.href,
} as const

const secondaryCta = {
  label: "See case studies",
  href: "/case-studies",
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
      "categories, services, attributes, photos, posts, and q&a aligned so your listings reinforce your website, and your website reinforces your listings.",
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
      "Dentist SEO (SEO for dentists) is improving your visibility in Google Maps/local pack and local organic rankings so nearby patients find you, trust you, and book. It is driven by Google Business Profile relevance, reviews, citations/NAP consistency, and patient-ready treatment pages.",
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
      "It depends on your market and starting point. Most practices need an initial audit + cleanup, then ongoing monthly work for reviews, listings, content updates, and technical maintenance, priced around the scope you actually need, not a one-size retainer.",
  },
  {
    question: "Do dentists need location pages for SEO?",
    answer:
      "If you operate from real locations, yes. One clear page per location is usually helpful. Avoid dozens of near-duplicate “dentist in {city}” pages with the same copy (doorway patterns). For service-area coverage, pair correct GBP settings with content that clearly explains where you serve.",
  },
  {
    question: "Should dentists focus on Google Maps or organic search first?",
    answer:
      "Maps is often the fastest lever for local demand, but organic is the long-term moat. The best approach ships both together: tighten listings + reviews while improving one or two high-value treatment pages at a time.",
  },
  {
    question: "Are you an SEO consultant for dentists or an agency?",
    answer:
      "Prism is founder-led and consultant-driven. You can hire us for strategy-only consulting, consultant-led implementation, or full done-for-you delivery. It is the same roadmap either way, just different levels of hands-on execution.",
  },
  {
    question: "Do you guarantee #1 rankings?",
    answer:
      "No, and you should be skeptical of anyone who does. We focus on controllable levers: site structure, content quality, performance, listings consistency, and reputation systems that earn durable visibility.",
  },
  {
    question: "What should dentists look for in an SEO partner?",
    answer:
      "A consultant who talks in patient intent (treatments + location), ties work to calls and forms, understands Maps and listings, and can translate strategy into a real implementation backlog, not vague reports.",
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

const rankingSignals = [
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
    description: "be eligible in the geos that matter, accurately.",
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
]

const wontDo = [
  "keyword-stuff your business name in google business profile",
  "buy fake reviews, links, or citation packages",
  "publish thin “dentist in [city]” doorway pages",
  "ship structured data that doesn’t match visible content",
]

const engagementOptions = [
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
    description: "we execute the work with your practice, end to end.",
  },
]

export default function DentalPracticeSeoExpertPage() {
  const caseStudies = getDentalCaseStudies()

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Dentist SEO"
          title="dentist seo."
          description="dentist seo (seo for dentists) helps your practice show up when nearby patients search in google maps (the local pack), organic results, and ai-powered search."
          location="dentist seo hero"
          ctaHref={primaryCta.href}
          secondary={{ label: secondaryCta.label, href: secondaryCta.href }}
          glow="green"
        >
          <div className="mx-auto grid max-w-5xl gap-4 text-left md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <Card className="p-6 sm:p-8">
              <p className="text-[15px] leading-7 text-muted-foreground">
                prism runs a consultant-led dentist seo system built around high-intent treatments, clean technical structure, and compounding trust signals across local + organic.
              </p>
              <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
                consultant-led. built for owner-dentists, specialty practices, and multi-location groups. expect clearer treatment pages, stronger
                maps visibility, and a roadmap tied to calls and bookings.
              </p>
            </Card>
            <Card className="p-6 sm:p-8">
              <p className="text-eyebrow text-subtle">Read the guides</p>
              <ul className="mt-4 space-y-3 text-[15px] leading-6 text-muted-foreground">
                <li>
                  want the full guide? read <TextLink href="/blog/dental-seo-guide">dental seo guide</TextLink>.
                </li>
                <li>
                  want the dentist-specific ai overviews checklist? read{" "}
                  <TextLink href="/blog/ai-search-for-dental-practice">ai search for dental practice</TextLink>.
                </li>
                <li>
                  want the step-by-step checklist to rank higher in google? read{" "}
                  <TextLink href="/blog/dental-practice-rank-higher-google-search">
                    dental practice rank higher in google search
                  </TextLink>
                  .
                </li>
              </ul>
            </Card>
          </div>
        </LandingHero>

        <Section aria-labelledby="dseo-maps-title">
          <Reveal>
            <SectionHeader
              id="dseo-maps-title"
              eyebrow="Google Maps"
              title="dentist seo: how google decides who shows up."
              description="local rankings are a scoring system built around three signals: relevance, distance, and prominence. dentist seo makes those signals unambiguous, with clean listings, strong reviews, and pages that corroborate what you do and where you do it."
              titleClassName="max-w-[20ch]"
            />
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {rankingSignals.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <Card className="h-full p-6 sm:p-7">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-heading mt-4 text-foreground">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{item.description}</p>
                  <CheckList marker="dot" className="mt-5 border-t border-white/[0.07] pt-5" items={item.bullets} />
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-4">
            <Callout tone="warn" title="what we won’t do">
              <CheckList marker="dot" className="mt-1 grid gap-x-10 space-y-0 gap-y-2 sm:grid-cols-2" items={wontDo} />
              <p className="mt-5">
                want the maps checklist? read{" "}
                <TextLink href="/blog/google-maps-visibility-playbook-2025">google maps visibility checklist</TextLink>.
                need listings cleanup? start with <TextLink href="/local-listings">local listings</TextLink>.
              </p>
            </Callout>
          </Reveal>
        </Section>

        <Section aria-labelledby="dseo-includes-title">
          <Reveal>
            <SectionHeader
              id="dseo-includes-title"
              eyebrow="Deliverables"
              title="what dentist seo includes."
              description="dental seo is two systems working together: maps trust + website clarity. no tricks, just a repeatable process that makes your practice easier to understand, easier to trust, and easier to choose. these are the core dentist seo deliverables we ship."
            />
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <Reveal>
              <SpotlightCard beam className="h-full p-6 sm:p-8">
                <p className="text-eyebrow text-subtle">Google Maps</p>
                <h3 className="text-heading mt-3 text-foreground">maps + local pack visibility</h3>
                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                  improve relevance, distance eligibility, and prominence signals, then track actions like calls and direction requests.
                </p>
                <CheckList
                  className="mt-6"
                  items={[
                    "google business profile categories, services, attributes, and photos",
                    "review velocity and response systems",
                    "listings/citations consistency (NAP cleanup)",
                    "spam-safe improvement (no name stuffing, no fake reviews)",
                  ]}
                />
                <p className="mt-6 text-[15px] text-muted-foreground">
                  need the listings subsystem? start with <TextLink href="/local-listings">local listings</TextLink>.
                </p>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={100}>
              <Card className="h-full p-6 sm:p-8">
                <p className="text-eyebrow text-subtle">Organic</p>
                <h3 className="text-heading mt-3 text-foreground">treatment pages that convert</h3>
                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                  become the clearest answer for the services patients actually search, and make the next step obvious.
                </p>
                <CheckList
                  className="mt-6"
                  items={[
                    "intent-mapped service pages (implants, invisalign, emergency, etc.)",
                    "internal linking that clarifies hierarchy (treatments, locations, providers, faqs)",
                    "technical hygiene: indexation, canonicals, performance, and schema",
                    "patient-ready answers: pricing context, timelines, and booking paths",
                  ]}
                />
                <p className="mt-6 text-[15px] text-muted-foreground">
                  want a faster site foundation for compounding rankings? explore{" "}
                  <TextLink href="/dental-website">a dental practice website</TextLink>.
                </p>
              </Card>
            </Reveal>
          </div>

          <Reveal delay={120} className="mt-4">
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] md:grid-cols-2 lg:grid-cols-3">
              {whatYouGet.map((item) => (
                <li key={item.title} className="bg-card p-6">
                  <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{item.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        <Section aria-labelledby="dseo-engagement-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
            <Reveal>
              <Card className="p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <Image
                    src="/enzo-avatar.png"
                    alt="Enzo Sison headshot"
                    width={80}
                    height={80}
                    className="size-16 rounded-2xl border border-white/10 object-cover"
                  />
                  <div>
                    <p className="text-eyebrow text-subtle">Meet your consultant</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">Enzo Sison</p>
                    <p className="text-sm text-muted-foreground">Founder, Prism</p>
                  </div>
                </div>
                <p className="mt-6 text-[15px] leading-7 text-muted-foreground">
                  Enzo works directly with dental teams on SEO strategy and implementation: intent-mapped pages, technical cleanup, listings
                  systems, and reporting tied to calls and forms.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <ArrowLink href="/why-dental-practices-love-prism">see dental proof</ArrowLink>
                  <ArrowLink href={primaryCta.href}>join the waitlist</ArrowLink>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={100} className="flex flex-col gap-8">
              <SectionHeader
                id="dseo-engagement-title"
                eyebrow="Engagement options"
                title="dentist seo, your way."
                description="hire prism for consulting-only, consultant-led implementation, or full done-for-you delivery. The same roadmap either way, just different levels of hands-on execution."
              />
              <ol className="divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.08] bg-card">
                {engagementOptions.map((item, index) => (
                  <li key={item.title} className="flex gap-5 p-5 sm:p-6">
                    <span className="font-mono text-[11px] leading-6 tracking-[0.18em] text-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">{item.title}</p>
                      <p className="mt-1 text-[15px] leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Section>

        <Section aria-labelledby="dseo-searches-title">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-12 text-center sm:px-12 sm:py-16">
            <div aria-hidden="true" className="bg-dots mask-fade-y absolute inset-0 -z-10 opacity-50" />
            <SectionHeader
              id="dseo-searches-title"
              align="center"
              eyebrow="High-intent searches"
              title="rank for the treatments that pay."
              description="we build around service lines and local intent, so search engines connect the dots and patients find the exact page they need."
            />
            <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
              {searches.map((term) => (
                <li
                  key={term}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[14px] text-foreground"
                >
                  <Search aria-hidden="true" className="size-3.5 text-subtle" />
                  {term}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section aria-labelledby="dseo-process-title">
          <Reveal>
            <SectionHeader
              id="dseo-process-title"
              eyebrow="The process"
              title="how prism runs dentist seo."
              description="start with clarity, then earn trust. that’s how you get durable rankings and steady patient demand."
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <StepRail
              columns={5}
              steps={processSteps.map((item) => ({ title: item.step.toLowerCase(), description: item.description }))}
            />
          </Reveal>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WaitlistButton location="dentist seo process" href={primaryCta.href} />
            <Button asChild size="lg" variant="outline">
              <Link href="/seo">See the SEO overview</Link>
            </Button>
          </div>
        </Section>

        {caseStudies.length > 0 ? (
          <Section aria-labelledby="dseo-proof-title">
            <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                id="dseo-proof-title"
                eyebrow="Proof"
                title="dental case studies."
                description="see how prism supports real practices with modern websites, local presence, and growth systems."
              />
              <DentalProofStat className="w-full lg:max-w-sm" />
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {caseStudies.map((study, index) => (
                <Reveal key={study.slug} delay={index * 70}>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="group/study block rounded-xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    <BrowserFrame
                      src={`/case-studies/${study.slug}-home-desktop.jpg`}
                      alt={`${study.client} website built by Prism`}
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 92vw"
                      className="transition-transform duration-300 group-hover/study:-translate-y-0.5"
                    />
                    <span className="mt-4 block text-[17px] font-semibold tracking-[-0.02em] text-foreground">
                      {study.client}
                    </span>
                    <span className="mt-1 block font-mono text-[11px] text-subtle">{study.location}</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Section>
        ) : null}

        <DentalFaq
          idPrefix="dentist-seo"
          title="dentist seo questions."
          description="what most dentists want to know before hiring an seo partner."
          items={faqItems}
        />

        <FinalCta
          location="dentist seo final cta"
          href={primaryCta.href}
          secondary={{ label: "Dental practice website blueprint", href: "/dental-website" }}
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
        offerDetails={{
          name: "Dentist SEO",
          description:
            "Dentist SEO, including Google Maps optimization, listings, reviews, on-page structure, and technical cleanup tied to calls and bookings.",
          businessFunction: "http://purl.org/goodrelations/v1#ProvideService",
          availability: "https://schema.org/InStock",
          url: "https://www.design-prism.com/pricing",
        }}
      />
      <FAQSchema questions={faqItems} />
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
        ]}
      />
    </div>
  )
}
