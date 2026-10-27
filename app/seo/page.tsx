import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight, FileSearch, MapPin, Sparkles, Stethoscope } from "lucide-react"

import { BulletList } from "@/components/landing/seo/bullet-list"
import { LinkPills } from "@/components/landing/seo/link-pills"
import { TextLink } from "@/components/landing/seo/text-link"
import { BrowserFrame } from "@/components/prism/browser-frame"
import { FaqList } from "@/components/prism/faq-list"
import { FinalCta } from "@/components/prism/final-cta"
import { Reveal } from "@/components/prism/reveal"
import { Section, SectionHeader } from "@/components/prism/section"
import { SpotlightCard } from "@/components/prism/spotlight-card"
import { SeoHero } from "@/components/seo/seo-hero"
import { SeoExpandableImage } from "@/components/seo/seo-expandable-image"
import { SeoSection } from "@/components/seo/seo-section"
import { seoOverviewContent } from "@/content/seo"
import { FAQSchema, ServiceSchema } from "@/components/schema-markup"
import SimpleBlogGrid from "@/components/simple-blog-grid"
import SimpleBlogPostCard from "@/components/simple-blog-post-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { getAllPosts } from "@/lib/mdx-data"
import VideoPlayer from "@/components/video-player"
import { buildRouteMetadata } from "@/lib/seo/metadata"

import { SearchModesDiagram } from "./search-modes-diagram"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Local SEO',
  description: 'Improve local rankings with technical cleanup, clear pages, reviews, listings, and authority building.',
  path: "/seo",
  ogImage: "/prism-opengraph.png",
})

const seoQuestions = [
  {
    question: "What does Prism’s SEO service include?",
    answer: "Prism’s SEO work combines technical cleanup, service-page content, internal links, local listings, reviews, and authority building. We assess the current site and competition, then scope the priorities with you. The work connects search visibility to calls, inquiries, and other useful conversions.",
  },
  {
    question: "What is the difference between SEO and AEO?",
    answer: "SEO helps people find your business through search engines. Answer engine optimization (AEO) focuses on making your business and its answers clear and verifiable for AI search experiences. They share foundations: accessible pages, accurate content, clear business details, and credible evidence. Neither guarantees a ranking or an AI citation.",
  },
  {
    question: "How do you measure whether SEO is working?",
    answer: "We use Google Search Console to review search impressions, clicks, queries, and landing pages, alongside analytics and conversion tracking for inquiries and calls. Results should be compared over stated periods and connected to lead quality, rather than judged by rankings alone.",
  },
  {
    question: "Do I need a new website before starting SEO?",
    answer: "Not always. An audit can identify improvements to the existing site, such as crawl access, page structure, service content, and conversion paths. A rebuild makes sense when the current platform or user experience prevents those changes. The initial review helps determine the right scope.",
  },
] as const

type SeoCaseStudy = {
  slug: string
  summary: string
}

// Dr. Wong and Belize Kids carry the two published Search Console results;
// the metric, source, and window come straight from lib/case-study-data.
const SEO_CASE_STUDIES: SeoCaseStudy[] = [
  {
    slug: "dr-christopher-wong",
    summary: "A post-M&A practice relaunch with SEO foundations, aligned local listings, and review profiles.",
  },
  {
    slug: "belize-kids-foundation",
    summary: "A story-first nonprofit site with search architecture for donors looking for causes to support.",
  },
  {
    slug: "olympic-bootworks",
    summary: "A website rebuild with analytics and SEO, an integrated e-bike catalog, and owned email.",
  },
]

function hostOf(url?: string) {
  if (!url) return undefined
  try {
    return new URL(url).host.replace(/^www\./, "")
  } catch {
    return undefined
  }
}

const seoCaseStudies = SEO_CASE_STUDIES.flatMap(({ slug, summary }) => {
  const study = CASE_STUDIES.find((item) => item.slug === slug)
  if (!study) return []
  return [
    {
      slug,
      title: study.client,
      summary,
      href: `/case-studies/${slug}`,
      image: `/case-studies/${slug}-home-desktop.jpg`,
      url: hostOf(study.websiteUrl),
      metric: study.structured?.results?.[0],
    },
  ]
})

const SCORING_LEVERS = ["your pages", "your reputation", "the experience"] as const

export default async function SeoPage() {
  const { hero, scoringQuestions, onPagePreview, offPagePreview, buildStages, benefits } = seoOverviewContent
  const allPosts = (await getAllPosts()) ?? []
  const seoBlogPosts = allPosts
    .filter((post) => {
      const slug = post.slug.toLowerCase()
      const category = (post.category ?? "").toLowerCase()
      const description = (post.description ?? "").toLowerCase()
      return (
        slug.includes("seo") ||
        slug.includes("search") ||
        category.includes("seo") ||
        category.includes("search") ||
        description.includes("seo") ||
        description.includes("search")
      )
    })
    .slice(0, 3)
  const deeperTopics = [
    {
      icon: FileSearch,
      eyebrow: "audit",
      title: "seo audit service",
      description: "Not sure what is holding your rankings back? Start with a full audit and a prioritized plan.",
      body: "Our SEO audit reviews technical health, on-page intent, internal linking, schema, and trust signals, then ranks the fixes by impact so you know what to do first.",
      bullets: [
        "Crawlability, canonicals, and indexation issues",
        "Title and heading intent match for core pages",
        "Internal linking and topic-cluster clarity",
        "Structured data accuracy and rich-result readiness",
        "Page experience and mobile performance gaps",
      ],
      links: [
        { label: "SEO audit service", href: "/seo/audit" },
        { label: "Join the waitlist", href: "/waitlist" },
      ],
    },
    {
      icon: MapPin,
      eyebrow: "local",
      title: "local seo services for small businesses",
      description: "Looking for local SEO services? The goal is to show up when customers search nearby, and make it easy for them to call or book.",
      body: "Local visibility is a system: listings, reviews, local pages, and a clean technical structure. Prism runs the whole system and reports on it.",
      bullets: [
        "Google Business Profile optimization and map-pack signals",
        "Citations and NAP consistency across directories",
        "Review requests and reputation management",
        "Service and location pages with schema and internal links",
        "Reporting tied to calls, forms, and bookings",
      ],
      links: [
        { label: "Local SEO services", href: "/local-seo-services" },
        { label: "Local SEO agency", href: "/local-seo-agency" },
      ],
    },
    {
      icon: Sparkles,
      eyebrow: "ai",
      title: "ai seo services",
      description: "AI Overviews and assistants are changing how buyers discover businesses. The goal is to be easy to cite, easy to corroborate, and easy to choose.",
      body: null,
      bullets: [
        "Answer-first page structures that are easy to quote",
        "Corroboration signals: proof, consistency, and structured data",
        "Tighter internal links so crawlers understand topic clusters",
        "Visibility and leads measured in Search Console, then iterated",
      ],
      links: [
        { label: "AEO (AI search)", href: "/aeo" },
        { label: "How pricing works", href: "/pricing" },
      ],
    },
  ] as const

  return (
    <>
      <SeoHero
        eyebrow="SEO"
        title="help the right customers find you."
        subtitle={hero.subtitle}
        location="seo hero"
        secondaryCta={{ label: "See on-page SEO", href: "/seo/on-page" }}
      >
        <div className="grid gap-4 md:grid-cols-3">
          <SeoExpandableImage
            src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767372608/search-console-details_omzokl.webp"
            alt="Search Console performance detail screenshot"
            width={1975}
            height={1237}
            caption="search console performance"
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 33vw, 100vw"
          />
          <SeoExpandableImage
            src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767372937/keyword-tracking-semrush_m3aql3.png"
            alt="Keyword tracking performance in Semrush"
            width={1973}
            height={1235}
            caption="keyword tracking"
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 33vw, 100vw"
            className="hidden md:block"
          />
          <SeoExpandableImage
            src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767372936/search-console-details-prism_ffjk5v.png"
            alt="Search Console performance detail for Prism"
            width={1970}
            height={1234}
            caption="search console detail"
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 33vw, 100vw"
            className="hidden md:block"
          />
        </div>
      </SeoHero>

      <SeoSection
        id="seo-founder-vsl"
        eyebrow="hear from our founder"
        title="seo is not about tricks."
        description="Enzo on becoming the clear answer when buyers are ready to choose, and on the foundation that makes it possible."
      >
        <VideoPlayer
          src="https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1763150128/seo_vsl_prism_website_oqk1xm.mp4"
          poster="https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0,q_auto/seo_vsl_prism_website_oqk1xm.jpg"
          title="Founder Enzo Sison on intentional SEO"
          caption="Enzo explains why SEO isn’t about tricks. It’s about becoming a clear answer when buyers are ready. He covers how Prism builds the foundation (on-page clarity, technical structure, schema, AI search readiness, and location intent), the metrics he watches (awareness, conversion, lifetime value), and why SEO works best alongside a strong website and accurate listings."
          schema={{
            id: "https://www.design-prism.com/seo#founder-vsl",
            name: "Founder Enzo Sison on SEO that compounds",
            description:
              "Enzo Sison explains why SEO is about being the obvious answer when buyers search, how Prism builds the technical and content foundation, and how that work connects to awareness, conversion, and lifetime value.",
            thumbnailUrl: "https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0,q_auto/seo_vsl_prism_website_oqk1xm.jpg",
            uploadDate: "2025-01-24T00:00:00Z",
            duration: "PT60S",
            contentUrl: "https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1763150128/seo_vsl_prism_website_oqk1xm.mp4",
            embedUrl: "https://www.design-prism.com/seo#founder-vsl",
            width: 1920,
            height: 1080,
            creatorName: "Enzo Sison",
          }}
        />
      </SeoSection>

      <SeoSection
        layout="stack"
        eyebrow="how seo works today"
        title="search engines don’t read. they score."
        description="Every algorithm is trying to work out whether your page is the right answer, whether you’re trustworthy, and whether real people engage."
      >
        <Reveal>
          <Card className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-eyebrow text-subtle">what they ask</p>
              <p className="hidden text-eyebrow text-subtle sm:block">what answers it</p>
            </div>
            <ol className="mt-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {scoringQuestions.map((question, index) => (
                <li
                  key={question}
                  className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="font-mono text-xs tabular-nums text-subtle">0{index + 1}</span>
                    <span className="text-heading text-foreground">{question}</span>
                  </span>
                  <span className="pl-10 font-mono text-[12px] tracking-[0.06em] text-muted-foreground sm:shrink-0 sm:pl-0">
                    {SCORING_LEVERS[index]}
                  </span>
                </li>
              ))}
            </ol>
          </Card>
        </Reveal>
      </SeoSection>

      <Section aria-labelledby="seo-modes-title">
        <Reveal>
          <SectionHeader
            id="seo-modes-title"
            eyebrow="seo, aeo, geo"
            title="one foundation, three kinds of search."
            description="People now search in Google, read AI Overviews, and ask assistants like ChatGPT. The same groundwork serves all three."
          />
        </Reveal>
        <Reveal delay={80} className="mt-12 sm:mt-14">
          <SearchModesDiagram />
        </Reveal>
      </Section>

      <SeoSection
        eyebrow="competitive analysis"
        title="know exactly where you stand."
        description="We map the rankings, content depth, and trust signals your competitors rely on, so you can see the gaps and what to fix first."
      >
        <SeoExpandableImage
          src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767373072/seo-competitor-analysis_o3w4ks.png"
          alt="SEO competitor analysis overview"
          width={1002}
          height={384}
          caption="competitor visibility map"
          sizes="(min-width: 1024px) 560px, 100vw"
        />
        <BulletList
          items={[
            "See who holds the top spots for your highest-intent searches",
            "Identify the pages, links, and listings behind their visibility",
            "Prioritize the fixes for the next 30 to 90 days",
          ]}
        />
      </SeoSection>

      <SeoSection
        eyebrow="toxic backlink audit"
        title="clean up links that hurt rankings."
        description="We surface spammy, irrelevant, or risky backlinks and build a clear cleanup plan."
      >
        <SeoExpandableImage
          src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767373231/seo-toxic-backlink-audit_audrut.webp"
          alt="Toxic backlink audit overview"
          width={762}
          height={481}
          caption="toxic link risk audit"
          sizes="(min-width: 1024px) 560px, 100vw"
        />
        <BulletList
          items={[
            "Flag suspicious domains, link networks, and spam patterns",
            "Separate harmless noise from links that can suppress rankings",
            "Deliver a remediation plan (cleanup, disavow, or rebuild)",
          ]}
        />
      </SeoSection>

      <Section aria-labelledby="seo-levers-title">
        <Reveal>
          <SectionHeader
            id="seo-levers-title"
            eyebrow="on-page + off-page"
            title="two levers, one system."
            description="Your own pages answer the search. Everything beyond your domain proves you are real."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 sm:mt-14">
          {[
            {
              preview: onPagePreview,
              label: "on-page seo",
              copy: "On-page SEO is everything you control on your own site: the structure, the content, the performance. We build each page to be a clear answer.",
            },
            {
              preview: offPagePreview,
              label: "off-page seo",
              copy: "Off-page SEO is everything beyond your domain: listings, links, reviews, proof. When those agree, Google and Apple get a clear signal that you’re legit.",
            },
          ].map(({ preview, label, copy }, index) => (
            <Reveal key={preview.linkHref} delay={index * 80}>
              <SpotlightCard beam={index === 0} className="flex h-full flex-col p-6 sm:p-8">
                <p className="text-eyebrow text-subtle">{label}</p>
                <h3 className="text-heading mt-4 text-foreground">{preview.title.toLowerCase()}.</h3>
                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{copy}</p>
                <BulletList items={preview.bullets} marker="dot" className="mt-6 flex-1" />
                <TextLink href={preview.linkHref} className="mt-6">
                  {preview.linkText}
                </TextLink>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="seo-build-title">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-12 sm:px-12 sm:py-16">
          <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-50" />
          <Reveal>
            <SectionHeader
              id="seo-build-title"
              eyebrow="how prism builds"
              title="seo is baked into every build."
              description="We don’t bolt SEO on later. The work runs in three stages, and we scope how far to take each one with you."
            />
          </Reveal>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
            {buildStages.map((stage, index) => (
              <li key={stage.title} className="flex flex-col gap-3 bg-card p-6 sm:p-7">
                <span className="font-mono text-xs tabular-nums text-subtle">stage 0{index + 1}</span>
                <h3 className="text-heading text-foreground">{stage.title}</h3>
                <p className="text-[15px] leading-7 text-muted-foreground">{stage.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <SeoSection
        eyebrow="what you get"
        title="working with Prism."
        description="When Prism handles your SEO you get a website that reads like a clear answer, listings that reinforce trust, and a foundation you can build paid, content, and brand work on."
      >
        <BulletList items={benefits} itemClassName="text-base sm:text-[17px]" />
        <p className="border-l-2 border-white/20 pl-5 text-lg leading-8 tracking-[-0.015em] text-foreground">
          No gimmicks, no hacks. A strong, modern SEO foundation that you own.
        </p>
      </SeoSection>

      <Section aria-labelledby="seo-deeper-title">
        <Reveal>
          <SectionHeader
            id="seo-deeper-title"
            eyebrow="go deeper"
            title="pick the search problem you have."
            description="Audits, local visibility, dental search, and AI answers each have their own playbook."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-6">
          {deeperTopics.map((topic, index) => {
            const Icon = topic.icon
            return (
              <Reveal
                key={topic.title}
                delay={index * 60}
                className={index === 0 ? "lg:col-span-6" : "lg:col-span-3"}
              >
                <Card className="h-full p-6 sm:p-8">
                  <div
                    className={
                      index === 0
                        ? "grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12"
                        : "flex h-full flex-col"
                    }
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                          <Icon aria-hidden="true" className="size-4 text-foreground" />
                        </span>
                        <span className="text-eyebrow text-subtle">{topic.eyebrow}</span>
                      </div>
                      <h3 className="text-heading mt-5 text-foreground">{topic.title}</h3>
                      <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{topic.description}</p>
                      {topic.body ? (
                        <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{topic.body}</p>
                      ) : null}
                    </div>
                    <div className={index === 0 ? "" : "mt-6 flex flex-1 flex-col"}>
                      <BulletList items={topic.bullets} marker="dot" className="flex-1" />
                      <LinkPills links={topic.links} label={`${topic.title} links`} className="mt-6" />
                    </div>
                  </div>
                </Card>
              </Reveal>
            )
          })}
          <Reveal delay={200} className="lg:col-span-6">
            <Card className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Stethoscope aria-hidden="true" className="size-4 text-foreground" />
                  </span>
                  <span className="text-eyebrow text-subtle">dental</span>
                </div>
                <h3 className="text-heading mt-5 text-foreground">seo for dental practices</h3>
                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                  Dental search is high-trust and hyperlocal. Patients pick the practices that are easiest to
                  understand, easiest to trust, and easiest to book.
                </p>
                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                  Need{" "}
                  <Link href="/dental-practice-seo-expert" className="font-medium text-foreground underline decoration-white/25 underline-offset-4 hover:decoration-white/70">
                    dentist SEO
                  </Link>{" "}
                  (Maps and organic)? See how Prism maps treatments to search intent, tightens listings and reviews,
                  and ships steady improvements.
                </p>
              </div>
              <LinkPills
                label="Dental SEO guides"
                className="lg:max-w-sm lg:justify-end"
                links={[
                  { label: "Dental SEO guide", href: "/blog/dental-seo-guide" },
                  { label: "How dental practices rank higher in Google", href: "/blog/dental-practice-rank-higher-google-search" },
                  { label: "AI search for dental practices", href: "/blog/ai-search-for-dental-practice" },
                ]}
              />
            </Card>
          </Reveal>
        </div>
      </Section>

      {seoBlogPosts.length > 0 ? (
        <Section aria-labelledby="seo-blog-title">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              id="seo-blog-title"
              eyebrow="from the blog"
              title="seo playbooks."
              description="Practical breakdowns on showing up in AI search, tightening local signals, and protecting traffic."
            />
            <Button asChild variant="outline" size="lg" className="shrink-0">
              <Link href="/blog">
                Browse all articles
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
          <div className="mt-12 sm:mt-14">
            <SimpleBlogGrid posts={seoBlogPosts}>
              {seoBlogPosts.map((post) => (
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
        </Section>
      ) : null}

      <Section aria-labelledby="seo-cases-title">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            id="seo-cases-title"
            eyebrow="case studies"
            title="seo wins in the wild."
            description="Real client sites, with the Search Console results we can publish."
          />
          <Button asChild variant="outline" size="lg" className="shrink-0">
            <Link href="/case-studies">
              Browse all case studies
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-3">
          {seoCaseStudies.map((study, index) => (
            <Reveal key={study.href} delay={index * 80}>
              <Link
                href={study.href}
                className="group/case block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <Card className="flex h-full flex-col overflow-hidden p-3 transition-[border-color,transform] duration-300 group-hover/case:-translate-y-0.5 group-hover/case:border-white/[0.16]">
                  <BrowserFrame
                    src={study.image}
                    alt={`${study.title} website homepage`}
                    url={study.url}
                    sizes="(min-width: 768px) 30vw, 90vw"
                  />
                  <div className="flex flex-1 flex-col p-3 pt-5">
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">{study.title}</h3>
                    {study.metric ? (
                      <div className="mt-4 rounded-xl border border-white/[0.08] bg-background/60 p-4">
                        <p className="flex items-baseline gap-3">
                          <span className="text-[2rem] font-semibold leading-none tracking-[-0.05em] text-foreground tabular-nums">
                            {study.metric.value}
                          </span>
                          <span className="text-[13px] leading-5 text-muted-foreground">{study.metric.label}</span>
                        </p>
                        <p className="mt-3 text-[12px] leading-relaxed text-subtle">
                          Source: {study.metric.sourceName}, {study.metric.dateRange}.
                        </p>
                      </div>
                    ) : null}
                    <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{study.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                      View case study
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-200 group-hover/case:-translate-y-0.5 group-hover/case:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <SeoSection id="seo-questions" eyebrow="common questions" title="before you invest in seo.">
        <FaqList items={seoQuestions} name="seo-questions" />
        <p className="text-sm leading-7 text-muted-foreground">
          Start with an{" "}
          <Link className="font-medium text-foreground underline decoration-white/25 underline-offset-4 hover:decoration-white/70" href="/seo/audit">
            SEO audit
          </Link>
          , explore{" "}
          <Link className="font-medium text-foreground underline decoration-white/25 underline-offset-4 hover:decoration-white/70" href="/aeo">
            AEO for AI search
          </Link>
          , or{" "}
          <Link className="font-medium text-foreground underline decoration-white/25 underline-offset-4 hover:decoration-white/70" href="/waitlist">
            join the waitlist
          </Link>
          .
        </p>
      </SeoSection>
      <FAQSchema questions={[...seoQuestions]} />

      <FinalCta
        location="seo final cta"
        title="get found next."
        secondary={{ label: "See the SEO audit", href: "/seo/audit" }}
      />

      <ServiceSchema
        serviceId="seo-service"
        name="SEO systems and management"
        description="Prism pairs on-page structure with off-page authority so your business is easier to find, understand, and choose."
        serviceType="SEO services"
        areaServed="United States"
        offerDetails={{
          name: "Prism SEO services",
          description:
            "On-page structure, off-page authority, content, and tracking delivered under Prism's productized offers.",
          businessFunction: "http://purl.org/goodrelations/v1#Sell",
          availability: "https://schema.org/LimitedAvailability",
          url: "https://www.design-prism.com/pricing",
        }}
      />
    </>
  )
}
