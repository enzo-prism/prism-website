import Link from "next/link"
import type { Metadata } from "next"
import Image from "next/image"

import { SeoHero } from "@/components/seo/seo-hero"
import { SeoSection } from "@/components/seo/seo-section"
import { seoOverviewContent } from "@/content/seo"
import { ServiceSchema } from "@/components/schema-markup"
import SimpleBlogGrid from "@/components/simple-blog-grid"
import SimpleBlogPostCard from "@/components/simple-blog-post-card"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/mdx-data"
import VideoPlayer from "@/components/video-player"

export const metadata: Metadata = {
  title: "seo that compounds | prism",
  description:
    "prism bakes on-page and off-page seo into every build. see how we structure sites, listings, reviews, and authority signals so local brands outrank competitors.",
  alternates: {
    canonical: "https://www.design-prism.com/seo",
  },
  openGraph: {
    title: "seo that compounds | prism",
    description:
      "seo is more than keywords. prism pairs on-page structure with off-page trust so your brand keeps showing up and capturing demand.",
    url: "https://www.design-prism.com/seo",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "prism seo",
      },
    ],
  },
}

export default async function SeoPage() {
  const { hero, scoringQuestions, seoModes, onPagePreview, offPagePreview, packages, benefits } = seoOverviewContent
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

  return (
    <>
      <SeoHero {...hero} />
      <section className="px-4 py-16 sm:py-20">
        <div id="seo-founder-vsl" className="mx-auto max-w-3xl text-left">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">hear from our founder</p>
          <VideoPlayer
            className="mt-4"
            src="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763150128/seo_vsl_prism_website_oqk1xm.mp4"
            poster="https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/seo_vsl_prism_website_oqk1xm.jpg"
            title="Founder Enzo Sison on intentional seo that compounds"
            caption="Enzo explains why SEO isn’t about tricks—it’s about becoming the obvious answer when buyers are ready. He covers how Prism builds the foundation (on-page clarity, technical structure, schema, AI-search readiness, and location intent), ties it to the metrics that matter (awareness, conversion, lifetime value), and shares why pairing SEO with dialed-in websites and listings plus month-to-month ownership gives you compounding traffic without hiring a full team."
            schema={{
              id: "https://www.design-prism.com/seo#founder-vsl",
              name: "Founder Enzo Sison on SEO that compounds",
              description:
                "Enzo Sison explains why SEO is about being the obvious answer when buyers search, how Prism builds the technical and content foundation, and how that work compounds across awareness, conversion, and lifetime value.",
              thumbnailUrl: "https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/seo_vsl_prism_website_oqk1xm.jpg",
              uploadDate: "2025-01-24T00:00:00Z",
              duration: "PT60S",
              contentUrl: "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763150128/seo_vsl_prism_website_oqk1xm.mp4",
              embedUrl: "https://www.design-prism.com/seo#founder-vsl",
              width: 1920,
              height: 1080,
              creatorName: "Enzo Sison",
            }}
          />
        </div>
      </section>

      <SeoSection
        eyebrow="how seo works today"
        title="search engines don’t read — they score"
        description="every algorithm is trying to understand whether your page is the right answer, whether you’re trustworthy, and whether real people engage."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">what they ask</p>
            <ul className="mt-3 space-y-3 text-base text-neutral-700">
              {scoringQuestions.map((question) => (
                <li key={question} className="rounded-2xl bg-neutral-50 p-4 text-sm sm:text-base">
                  {question}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">two levers working together</p>
            <div className="mt-3 space-y-4">
              {seoModes.map((mode) => (
                <div key={mode.title} className="rounded-2xl border border-neutral-200 p-5">
                  <p className="text-base font-semibold lowercase text-neutral-900">{mode.title}</p>
                  <p className="mt-2 text-sm text-neutral-600">{mode.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-neutral-500">
              higher-tier packages simply add more depth, more content, and more ongoing optimization.
            </p>
          </div>
        </div>
      </SeoSection>

      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-neutral-200 shadow-sm">
          <Image
            src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765246263/Gemini_Generated_Image_c2hnwfc2hnwfc2hn_kfn9if.webp"
            alt="SEO strategy infographic"
            width={2752}
            height={1536}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 1024px, 100vw"
          />
        </div>
      </section>

      <SeoSection title={onPagePreview.title}>
        <div className="grid gap-6 md:grid-cols-2">
          <ul className="space-y-3 text-sm text-neutral-700">
            {onPagePreview.bullets.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-600">
              on-page seo is everything you control on your own site — the structure, the content, the performance. we build it so each page feels like the perfect answer.
            </p>
            <Link
              href={onPagePreview.linkHref}
              className="mt-6 inline-flex items-center text-sm font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4"
            >
              {onPagePreview.linkText}
            </Link>
          </div>
        </div>
      </SeoSection>

      <SeoSection title={offPagePreview.title}>
        <div className="grid gap-6 md:grid-cols-2">
          <ul className="space-y-3 text-sm text-neutral-700">
            {offPagePreview.bullets.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-600">
              off-page seo is everything happening beyond your domain — listings, links, reviews, proof. when that ecosystem is tight, google and apple get a clear signal that you’re legit.
            </p>
            <Link
              href={offPagePreview.linkHref}
              className="mt-6 inline-flex items-center text-sm font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4"
            >
              {offPagePreview.linkText}
            </Link>
          </div>
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="how prism builds"
        title="seo is baked into every build"
        description="we don’t bolt seo on later. depending on your package you’ll simply see deeper content, stronger schema, and more ongoing iteration."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">{pkg.title}</p>
              <p className="mt-3 text-sm text-neutral-700">{pkg.description}</p>
            </div>
          ))}
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="what you get"
        title="working with prism"
        description="when prism handles your seo you get a website that reads like a clear answer, listings that reinforce trust, and a foundation you can stack paid, content, and brand on top of."
      >
        <ul className="space-y-4 text-sm text-neutral-700">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-700">
          no gimmicks. no hacks. just a strong, modern seo foundation that compounds over time.
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="audit"
        title="seo audit service"
        description="if you are not sure what is blocking rankings, start with a full audit and a prioritized plan."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-600">
              our seo audit service reviews technical health, on-page intent, internal linking, schema, and trust signals, then maps the fastest
              fixes to measurable outcomes.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/seo/audit"
                className="inline-flex items-center text-sm font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4"
              >
                seo audit service
              </Link>
              <Link
                href="/free-analysis"
                className="inline-flex items-center text-sm font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4"
              >
                free analysis
              </Link>
            </div>
          </div>
          <ul className="space-y-3 text-sm text-neutral-700">
            {[
              "crawlability, canonicals, and indexation issues",
              "title and heading intent match for core pages",
              "internal linking and topic-cluster clarity",
              "structured data accuracy and rich-result readiness",
              "page experience and mobile performance gaps",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="local"
        title="local seo services for small businesses"
        description="if you’re searching for local seo services, the goal is simple: show up when customers search nearby, and turn that visibility into calls and bookings."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-600">
              local visibility is a system: listings + reviews + local pages + clean technical structure. prism runs the system end to end so results compound.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/local-seo-services"
                className="inline-flex items-center text-sm font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4"
              >
                local seo services
              </Link>
              <Link
                href="/local-seo-agency"
                className="inline-flex items-center text-sm font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4"
              >
                local seo agency
              </Link>
            </div>
          </div>
          <ul className="space-y-3 text-sm text-neutral-700">
            {[
              "google business profile optimization and map-pack signals",
              "citations and NAP consistency across directories",
              "review capture + reputation management",
              "service and location pages with schema and internal links",
              "reporting tied to calls, forms, and bookings",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="dental"
        title="seo for dental practices"
        description="dental search is high-trust and hyperlocal. the winners are the practices that are easiest to understand, easiest to trust, and easiest to choose."
      >
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-neutral-600">
            need{" "}
            <Link
              href="/dental-practice-seo-expert"
              className="font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4"
            >
              dentist seo
            </Link>
            {" "}
            (maps + organic)? see how prism maps treatments to intent, tightens listings + reviews, and ships compounding improvements. for a full overview, read{" "}
            <Link
              href="/blog/dental-seo-guide"
              className="font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4"
            >
              dental seo guide
            </Link>
            . for a step-by-step checklist to rank higher in google search, read{" "}
            <Link
              href="/blog/dental-practice-rank-higher-google-search"
              className="font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4"
            >
              dental practice rank higher in google search
            </Link>
            . for a dentist-specific breakdown of ai overviews + assistants, read{" "}
            <Link
              href="/blog/ai-search-for-dental-practice"
              className="font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4"
            >
              ai search for dental practice
            </Link>
            .
          </p>
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="ai"
        title="ai seo services"
        description="ai overviews and assistants are changing how buyers discover brands. the goal is to be easy to cite, easy to corroborate, and easy to choose."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-600">
              if you want prism’s full approach, read{" "}
              <Link
                href="/ai-seo-services"
                className="font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4"
              >
                ai seo services
              </Link>
              . if you’re looking for a focused sprint, see{" "}
              <Link
                href="/offers/ai-seo-boost"
                className="font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4"
              >
                ai seo boost
              </Link>
              .
            </p>
          </div>
          <ul className="space-y-3 text-sm text-neutral-700">
            {[
              "create answer-first page structures that are easy to quote",
              "add corroboration signals (proof, consistency, and structured data)",
              "tighten internal links so crawlers understand topic clusters",
              "measure visibility + leads and iterate with search console",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </SeoSection>

      {seoBlogPosts.length > 0 ? (
        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">from the blog</span>
            <h2 className="mt-3 text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">seo playbooks</h2>
            <p className="mt-3 text-neutral-600">
              Practical breakdowns on ranking in ai search, tightening local signals, and protecting traffic.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-6xl">
            <SimpleBlogGrid posts={seoBlogPosts}>
              {seoBlogPosts.map((post) => (
                <SimpleBlogPostCard
                  key={post.slug}
                  title={post.title}
                  category={post.category}
                  date={post.date}
                  description={post.description}
                  slug={post.slug}
                  image={post.image || "/blog/ai-digital-marketing.png"}
                  gradientClass={post.gradientClass}
                />
              ))}
            </SimpleBlogGrid>
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="rounded-full px-8">
              <Link href="/blog">browse all articles</Link>
            </Button>
          </div>
        </section>
      ) : null}

      <ServiceSchema
        serviceId="seo-service"
        name="SEO systems and management"
        description="Prism pairs on-page structure with off-page authority so your business keeps showing up, earning clicks, and converting."
        serviceType="SEO services"
        areaServed="United States"
        offerDetails={{
          name: "SEO packages",
          description: "Foundation, Growth, and Domination tiers that layer content, schema, and ongoing optimization.",
          businessFunction: "http://purl.org/goodrelations/v1#Sell",
          priceRange: "$300/mo - $3,600/mo",
        }}
      />
    </>
  )
}
