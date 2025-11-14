import Link from "next/link"
import type { Metadata } from "next"

import { SeoHero } from "@/components/seo/seo-hero"
import { SeoSection } from "@/components/seo/seo-section"
import { seoOverviewContent } from "@/content/seo"
import { ServiceSchema } from "@/components/schema-markup"
import SimpleBlogGrid from "@/components/simple-blog-grid"
import SimpleBlogPostCard from "@/components/simple-blog-post-card"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/mdx"
import VideoPlayer from "@/components/video-player"

export const metadata: Metadata = {
  title: "seo that compounds | prism",
  description:
    "prism bakes on-page and off-page seo into every build. see how we structure sites, listings, reviews, and authority signals so local brands outrank competitors.",
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
        <div className="mx-auto max-w-3xl text-left">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">hear from our founder</p>
          <VideoPlayer
            className="mt-4"
            src="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763150128/seo_vsl_prism_website_oqk1xm.mp4"
            title="Founder Enzo Sison on intentional seo that compounds"
            caption="Enzo explains why SEO isn’t about tricks—it’s about becoming the obvious answer when buyers are ready. He covers how Prism builds the foundation (on-page clarity, technical structure, schema, AI-search readiness, and location intent), ties it to the metrics that matter (awareness, conversion, lifetime value), and shares why pairing SEO with dialed-in websites and listings plus month-to-month ownership gives you compounding traffic without hiring a full team."
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
