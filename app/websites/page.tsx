import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import SeoTextSection from "@/components/seo-text-section"
import SimpleBlogGrid from "@/components/simple-blog-grid"
import SimpleBlogPostCard from "@/components/simple-blog-post-card"
import WebsiteProjectsShowcase from "@/components/website-projects-showcase"
import VideoPlayer from "@/components/video-player"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Check } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import ServiceIllustration from "@/components/animated/ServiceIllustration"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { getAllPosts } from "@/lib/mdx-data"
import { ServiceSchema } from "@/components/schema-markup"
import Image from "next/image"
import { websiteProjects } from "@/lib/website-projects"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Small Business Website Design & Builds | Prism",
  description: "Websites engineered to convert and stay sharp long-term. Strategy, design, development, and SEO-ready foundations.",
  path: "/websites",
  ogImage: "/prism-opengraph.png",
})

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

const segmentPlaybooks = [
  {
    id: "dental",
    name: "Dental & medical teams",
    tagline: "conversion-backed patient journeys across services, providers, and locations.",
    bullets: [
      "service pages tuned for local intent, schema, and treatment differentiators.",
      "pre-qualifying intake flows that sync with practice management software.",
      "before-and-after galleries optimized for accessibility and speed.",
    ],
    spotlight: "fills schedule gaps and lifts case acceptance",
    summary: "we blend education, automation, and reassurance so new and returning patients know which treatment to book and how to move forward.",
    href: "/why-dental-practices-love-prism",
    ctaLabel: "see dental playbook",
  },
  {
    id: "retail",
    name: "Local shop owners",
    tagline: "blend in-store storytelling with local seo to drive repeat visits.",
    bullets: [
      "campaign-ready promo blocks that keep seasonal offers fresh.",
      "location, hours, and review modules that reinforce trust in maps and search.",
      "sms and email capture loops that turn browsers into loyal shoppers.",
    ],
    spotlight: "drives foot traffic and repeat purchases",
    summary: "merchandising, content, and local signals work together so shoppers see what is new, where to find you, and why to choose you first.",
    href: "/why-local-shop-owners-love-prism",
    ctaLabel: "see retail approach",
  },
  {
    id: "consulting",
    name: "Consulting & services",
    tagline: "stand up authority hubs and conversion paths for high-consideration work.",
    bullets: [
      "modular case study narratives that surface the transformation fast.",
      "thought leadership hubs organized by offer, industry, and buyer role.",
      "crm-integrated lead capture that triages inbound opportunities.",
    ],
    spotlight: "improves lead quality and close rates",
    summary: "we showcase proof, frameworks, and expertise while routing every request into the right follow-up workflow for your team.",
    href: "/why-consulting-companies-love-prism",
    ctaLabel: "see consulting playbook",
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

export default async function WebsitesPage() {
  const heroImage = {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763934373/Generated_Image_November_23_2025_-_1_45PM_m55vhg.webp",
    alt: "Prism website portfolio preview",
  }
  const aggregateRating = {
    "@type": "AggregateRating" as const,
    ratingValue: "4.9",
    reviewCount: "200",
    bestRating: "5",
    worstRating: "1",
  }
  const allPosts = (await getAllPosts()) ?? []
  const websiteBlogPosts = allPosts
    .filter(post => {
      const slug = post.slug.toLowerCase()
      const category = (post.category ?? "").toLowerCase()
      const description = (post.description ?? "").toLowerCase()
      return (
        slug.includes("website") ||
        description.includes("website") ||
        category.includes("website") ||
        category.includes("web development") ||
        category.includes("web design")
      )
    })
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Navbar />

      <main className="flex-1">
        <section className="px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">
              website design & development
            </p>
            <h1 className="mt-4 text-5xl font-semibold sm:text-6xl lg:text-7xl">
              Websites engineered to convert and stay sharp long-term
            </h1>
            <p className="mt-6 text-base text-muted-foreground sm:text-lg">
              We plan, design, and build sites that reflect your brand, explain what you do fast, and turn
              the right visitors into booked calls, patients, customers, and donors.
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
              <div>
                <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <Button asChild size="lg" className="rounded-md px-8">
                    <Link href="/get-started">
                      Get started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-md px-8">
                    <Link href="#recent-work">See recent launches</Link>
                  </Button>
                </div>
              </div>
              <div
                tabIndex={0}
                role="group"
                className="group mx-auto flex h-52 w-full max-w-[20rem] items-center justify-center rounded-3xl border border-border/60 bg-card/20 px-6 py-4 shadow-sm transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-orange-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-300/60"
              >
                <ServiceIllustration
                  variant="websites"
                  className="h-full w-full text-neutral-500 transition-colors group-hover:text-orange-500 group-focus-visible:text-orange-500 group-active:text-orange-600"
                />
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              limited-time build option:{" "}
              <Link href="/offers/summer-website-makeover" className="font-semibold text-foreground underline decoration-border/60 underline-offset-4 hover:decoration-border">
                summer website makeover offer
              </Link>
              .
            </p>
            <div className="mt-10 overflow-hidden rounded-md border border-border/60 bg-card/20 shadow-none">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  sizes="(min-width: 1280px) 1024px, (min-width: 768px) 768px, 100vw"
                  className="object-cover transition duration-300 hover:scale-[1.01]"
                  priority
                />
              </div>
            </div>
            <div id="websites-founder-vsl" className="mx-auto mt-12 max-w-3xl text-left">
              <p className="text-center text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">hear from our founder</p>
              <VideoPlayer
                className="mt-4"
                src="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763160814/prism_websites_vsl_2_ojqiku.mp4"
                poster="https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/prism_websites_vsl_2_ojqiku.jpg"
                title="Founder Enzo Sison explains Prism Websites"
                caption="Enzo explains how slow load times, unclear messaging, and disorganized SEO choke growth—and how Prism’s fast, conversion-ready websites boost visibility, drive more inquiries, and keep customers coming back."
                schema={{
                  id: "https://www.design-prism.com/websites#founder-vsl",
                  name: "Founder Enzo Sison explains Prism Websites",
                  description:
                    "Enzo Sison explains why most small-business websites leave money on the table and how Prism’s fast, conversion-focused builds improve discovery, conversion, and retention.",
                  thumbnailUrl: "https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/prism_websites_vsl_2_ojqiku.jpg",
                  uploadDate: "2025-01-24T00:00:00Z",
                  duration: "PT60S",
                  contentUrl: "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763160814/prism_websites_vsl_2_ojqiku.mp4",
                  embedUrl: "https://www.design-prism.com/websites#founder-vsl",
                  width: 1920,
                  height: 1080,
                  creatorName: "Enzo Sison",
                }}
              />
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 bg-card/15 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-4xl font-semibold sm:text-5xl">what you get</h2>
            <p className="mt-3 text-muted-foreground">
              Everything you need to launch a high-performing site with zero guesswork.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {whatWeDeliver.map(item => (
              <div key={item.title} className="rounded-md border border-border/60 bg-card/30 p-6 text-left shadow-none backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="recent-work" className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-semibold sm:text-5xl">recent launches</h2>
              <p className="mt-3 text-muted-foreground">
                A sampling of sites we designed, wrote, and built across healthcare, retail, nonprofit, and services—toggle the industries to see the matches.
              </p>
            </div>
            <WebsiteProjectsShowcase projects={websiteProjects} />
          </div>
        </section>

        <section className="border-t border-border/60 bg-transparent px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">deep dive</span>
            <div className="mt-4 rounded-md border border-border/60 bg-card/30 p-8 shadow-none backdrop-blur-sm sm:p-10">
              <h2 className="text-4xl font-semibold sm:text-5xl">{featuredArticle.title}</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">{featuredArticle.summary}</p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                {featuredArticle.insights.map(point => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-foreground/80" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-8 rounded-md px-8">
                <Link href={featuredArticle.href}>
                  Read the full transformation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 bg-card/15 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-4xl font-semibold sm:text-5xl">who we help</h2>
            <p className="mt-3 text-muted-foreground">
              Growth-minded local teams across verticals that need a site built to convert, rank, and evolve fast.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {audienceSegments.map(segment => (
              <Link
                key={segment.name}
                href={segment.href}
                className="group block rounded-md border border-border/60 bg-card/30 p-6 text-left shadow-none backdrop-blur-sm transition-colors hover:bg-card/45"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">segment</span>
                <div className="mt-2">
                  <h3 className="text-xl font-semibold text-foreground">{segment.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{segment.description}</p>
                </div>
                <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80 font-pixel">
                  Explore why this works
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-5xl rounded-md border border-border/60 bg-card/30 p-6 text-left shadow-none backdrop-blur-sm sm:p-8">
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">vertical playbooks</span>
              <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">
                see how we tailor each launch
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                switch tabs to explore the modules, messaging, and automations we prioritize for different business models.
              </p>
            </div>
            <Tabs defaultValue={segmentPlaybooks[0]?.id} className="mt-6">
              <TabsList className="mx-auto flex w-full flex-wrap justify-center gap-2 sm:justify-start">
                {segmentPlaybooks.map(playbook => (
                  <TabsTrigger
                    key={playbook.id}
                    value={playbook.id}
                  >
                    {playbook.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {segmentPlaybooks.map(playbook => (
                <TabsContent key={playbook.id} value={playbook.id} className="mt-6 focus-visible:outline-hidden">
                  <div className="grid gap-6 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] sm:gap-8">
                    <div>
                      <p className="text-sm text-muted-foreground">{playbook.tagline}</p>
                      <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                        {playbook.bullets.map(point => (
                          <li key={point} className="flex items-start gap-3">
                            <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-md border border-border/60 bg-muted/30">
                              <Check className="h-3 w-3" />
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex h-full flex-col justify-between rounded-md border border-border/60 bg-card/20 p-6">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">
                          impact focus
                        </span>
                        <p className="mt-3 text-sm font-semibold text-foreground">{playbook.spotlight}</p>
                        <p className="mt-3 text-sm text-muted-foreground">{playbook.summary}</p>
                        {playbook.id === "dental" ? (
                          <p className="mt-4 text-sm text-muted-foreground">
                            need{" "}
                            <Link
                              href="/dental-website"
                              className="font-semibold text-foreground underline decoration-border/60 underline-offset-4 hover:decoration-border"
                            >
                              a dental practice website
                            </Link>
                            ? see the dental practice website blueprint.
                          </p>
                        ) : null}
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        className="mt-6 inline-flex items-center justify-center rounded-md px-6"
                      >
                        <Link href={playbook.href}>
                          {playbook.ctaLabel}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          <div className="mx-auto mt-12 max-w-4xl rounded-md border border-border/60 bg-card/30 p-8 text-left shadow-none backdrop-blur-sm sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">referral program</span>
              <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">know a team who needs a better website?</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Share Prism’s referral program and we’ll send them a free analysis. If they launch with us, you earn a payout for the intro.
              </p>
            </div>
            <Button asChild size="lg" className="mt-6 rounded-md px-8 sm:mt-0">
              <Link href="/refer">refer a business</Link>
            </Button>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-semibold sm:text-5xl">our simple process</h2>
            <p className="mt-3 text-muted-foreground">
              Fast to launch, collaborative through revisions, and clear about responsibilities.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl space-y-4">
            {processSteps.map((stage, index) => (
              <div
                key={stage.step}
                className="flex flex-col gap-3 rounded-md border border-border/60 bg-card/20 p-6 shadow-none backdrop-blur-sm sm:flex-row sm:items-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-[10px] font-semibold text-primary-foreground font-pixel tracking-[0.16em]">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{stage.step}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border/60 bg-card/20 px-4 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-semibold sm:text-5xl">performance wins you can see</h2>
            <p className="mt-3 text-muted-foreground">
              Impact that shows up in analytics, search rankings, and how fast prospects choose you.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {performanceWins.map(item => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
                <div className="mt-1 rounded-full bg-white/10 p-1">
                  <Check className="h-4 w-4" />
                </div>
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-semibold sm:text-5xl">what we handle for you</h2>
            <p className="mt-3 text-muted-foreground">Full-service delivery so your team can focus on running the business.</p>
          </div>
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {handledForYou.map(item => (
              <span key={item} className="rounded-md border border-border/60 bg-muted/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground font-pixel">
                {item}
              </span>
            ))}
          </div>
        </section>

        {websiteBlogPosts.length > 0 ? (
          <section className="border-t border-border/60 bg-card/15 px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">from the blog</span>
              <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
                website strategy notes
              </h2>
              <p className="mt-3 text-muted-foreground">
                Fresh playbooks on architecting, writing, and maintaining sites that convert.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-6xl">
              <SimpleBlogGrid posts={websiteBlogPosts}>
                {websiteBlogPosts.map(post => (
                  <SimpleBlogPostCard
                    key={post.slug}
                    title={post.title}
                    category={post.category}
                    date={post.date}
                    author={post.author}
                    description={post.description}
                    slug={post.slug}
                    image={post.image}
                    gradientClass={post.gradientClass}
                  />
                ))}
              </SimpleBlogGrid>
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="outline" className="rounded-md px-8">
                <Link href="/blog">browse all articles</Link>
              </Button>
            </div>
          </section>
        ) : null}

        <FAQSection
          title="website design faq"
          subtitle="Straight answers about scope, timeline, and what collaboration looks like."
          items={faqItems}
          className="bg-card/15"
        />

        <section className="border-t border-border/60 bg-card/15 px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-semibold sm:text-5xl">
              Ready to launch a better website?
            </h2>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              We’ll map a clear plan, design the system, and build a site that keeps working long after launch.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-md px-8">
                <Link href="/get-started?service=website-design">
                  {FREE_AUDIT_CTA_TEXT}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-md px-8">
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
          <p>
            looking specifically for{" "}
            <Link href="/local-seo-services" className="font-semibold text-foreground underline decoration-border/60 underline-offset-4 hover:decoration-border">
              local seo services
            </Link>
            {" "}or a{" "}
            <Link href="/local-seo-agency" className="font-semibold text-foreground underline decoration-border/60 underline-offset-4 hover:decoration-border">
              local seo agency
            </Link>{" "}
            partner? see what prism ships beyond the website: listings, reviews, and local content systems that compound.
          </p>
        </SeoTextSection>
      </main>

      <Footer />
      <ScrollToTop />
      <ServiceSchema
        serviceId="websites-service"
        name="Website design & development"
        description="strategy, copy, and custom development for small business websites that convert local demand."
        serviceType="Website design"
        areaServed="United States"
        offerDetails={{
          name: "Website service bundles",
          description: "Launch packages that include design, build, hosting, analytics, and CRO support.",
          businessFunction: "http://purl.org/goodrelations/v1#ProvideService",
          priceRange: "$4,000 - $25,000",
        }}
        aggregateRating={aggregateRating}
      />
    </div>
  )
}
