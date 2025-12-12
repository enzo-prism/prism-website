import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/mdx-data"

const REPLIT_REFERRAL_URL = "https://replit.com/refer/enzo78"
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@the_design_prism"

const BLOG_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric"
})

const formatBlogDate = (date: string) => {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) {
    return date
  }
  return BLOG_DATE_FORMATTER.format(parsed).toLowerCase()
}

const WORKFLOW_ITEMS = [
  {
    title: "custom website builds",
    description:
      "fast, lightweight, seo-optimized sites built in html, css, javascript, or frameworks like react."
  },
  {
    title: "live collaboration",
    description: "clients can review and comment inside replit in real time."
  },
  {
    title: "ai-assisted development",
    description: "powered by replit’s ghostwriter and prism’s design systems for speed and consistency."
  },
  {
    title: "instant deployment",
    description: "shareable links, automated updates, and analytics integrations built right in."
  }
]

const LEARNING_CHANNELS = [
  {
    title: "our blog",
    description: "detailed guides for replit web development and design best practices.",
    href: "/blog"
  },
  {
    title: "our youtube channel",
    description: "walkthroughs, tips, and visual tutorials.",
    href: YOUTUBE_CHANNEL_URL
  }
]

export const metadata: Metadata = {
  title: "prism × replit | build or learn to build websites with replit",
  description:
    "prism partners with replit to design, build, and teach modern website creation. get a website built for you or start learning with our free replit guides and tutorials.",
  alternates: {
    canonical: "https://www.design-prism.com/replit"
  },
  openGraph: {
    title: "prism × replit | build or learn to build websites with replit",
    description:
      "prism partners with replit to design, build, and teach modern website creation. get a website built for you or start learning with our free replit guides and tutorials.",
    url: "https://www.design-prism.com/replit",
    siteName: "prism",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "prism × replit | build or learn to build websites with replit",
    description:
      "prism partners with replit to design, build, and teach modern website creation. get a website built for you or start learning with our free replit guides and tutorials."
  },
  robots: {
    index: true,
    follow: true
  }
}

export default async function ReplitPage() {
  const allPosts = await getAllPosts()
  const replitBlogPosts =
    (allPosts ?? [])
      .filter(
        (post) =>
          post.slug.toLowerCase().includes("replit") ||
          post.title.toLowerCase().includes("replit") ||
          post.description.toLowerCase().includes("replit")
      )
      .slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900 lowercase">
        <section className="relative overflow-hidden rounded-b-[3rem] bg-neutral-950 text-white">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_rgba(0,0,0,0.85))]"
          />
          <div className="absolute inset-0 opacity-50 mix-blend-screen">
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_rgba(129,140,248,0.35),_rgba(67,56,202,0))]" />
          </div>
          <div className="relative">
            <div className="container mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-24 text-center lowercase md:gap-8 md:px-6 md:py-32">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.32em] text-white/70">
                <Sparkles className="h-4 w-4" aria-hidden />
                prism × replit
              </span>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                prism × replit — building the next generation of websites
              </h1>
              <p className="text-lg font-medium text-white/90 sm:text-xl">
                build. launch. grow — all on replit.
              </p>
              <p className="max-w-3xl text-base text-white/80 sm:text-lg">
                prism partners with replit to design and build high-performance websites for modern businesses. whether
                you want a custom site built by our team or prefer to learn how to build your own, we’ll help you get started.
              </p>
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="inverted"
                  className="h-auto rounded-full px-8 py-4 text-base font-semibold"
                >
                  <Link href="/pricing">
                    🚀 get a website built in replit <ArrowRight className="h-5 w-5" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline-inverted"
                  className="h-auto rounded-full px-8 py-4 text-base font-semibold"
                >
                  <Link href={REPLIT_REFERRAL_URL} target="_blank" rel="noopener noreferrer">
                    ✨ start with replit <ArrowRight className="h-5 w-5" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-white lowercase">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px),_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-[0.28em] text-neutral-500">why we use replit</p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
                a better way to build websites.
              </h2>
            </div>
            <div className="flex flex-col gap-6 text-base text-neutral-600 sm:text-lg">
              <p>
                replit is one of the fastest, most collaborative platforms for web development — letting us design, build,
                and deploy client websites entirely in the browser. no downloads. no setup. just a link, and we’re live.
              </p>
              <p>
                prism uses replit to streamline everything from design previews to real-time collaboration, so clients can
                see updates, give feedback, and launch faster than ever.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-neutral-950 text-white lowercase">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px),_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-[0.28em] text-white/60">how prism builds</p>
              <h2 className="text-3xl font-semibold md:text-4xl">our workflow.</h2>
              <p className="text-sm text-white/60">
                we use replit for:
              </p>
            </div>
            <ul className="grid gap-6">
              {WORKFLOW_ITEMS.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <span className="mt-0.5 rounded-full bg-emerald-400/20 p-2 text-emerald-300">
                    <CheckCircle2 className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-sm text-white/70 sm:text-base">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="md:col-start-2">
              <Button
                asChild
                size="lg"
                variant="inverted"
                className="mt-4 h-auto w-full rounded-full px-8 py-4 text-base font-semibold sm:w-auto"
              >
                <Link href="/pricing" className="lowercase">
                  see our pricing &amp; website packages <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50 lowercase">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px),_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-[0.28em] text-neutral-500">
                learn to build on replit
              </p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
                prefer to build it yourself?
              </h2>
            </div>
            <div className="space-y-6 text-base text-neutral-700 sm:text-lg">
              <p>
                we also publish free tutorials and step-by-step guides for creators who want to learn how to build on
                replit. you’ll find them on:
              </p>
              <dl className="space-y-4">
                {LEARNING_CHANNELS.map((channel) => {
                  const isExternal = channel.href.startsWith("http")
                  return (
                    <div key={channel.title} className="space-y-2">
                      <dt>
                        <Link
                          href={channel.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-2 text-lg font-semibold text-neutral-900 transition-colors hover:text-neutral-700"
                        >
                          {channel.title} <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                      </dt>
                      <dd className="text-sm text-neutral-600 sm:text-base">{channel.description}</dd>
                    </div>
                  )
                })}
              </dl>
              <Button
                asChild
                size="lg"
                className="h-auto w-full rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white sm:w-auto"
              >
                <Link href={REPLIT_REFERRAL_URL} target="_blank" rel="noopener noreferrer">
                  start with replit (referral link) <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
              {replitBlogPosts.length > 0 && (
                <div className="mt-12 space-y-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-2xl font-semibold text-neutral-900">
                      dive into our replit tutorials
                    </h3>
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.3em] text-neutral-600 transition-colors hover:text-neutral-900"
                    >
                      browse the blog <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {replitBlogPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="space-y-4">
                          <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium tracking-[0.25em] text-neutral-600">
                            {post.category}
                          </span>
                          <h4 className="text-xl font-semibold text-neutral-900 group-hover:text-neutral-700">
                            {post.title}
                          </h4>
                          <p className="text-sm text-neutral-600">{post.description}</p>
                        </div>
                        <div className="mt-6 flex items-center justify-between text-sm font-medium text-neutral-500">
                          <span>{formatBlogDate(post.date)}</span>
                          <span className="inline-flex items-center gap-2 text-neutral-900">
                            read post <ArrowRight className="h-4 w-4" aria-hidden />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-white lowercase">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px),_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-[0.28em] text-neutral-500">
                partnership statement
              </p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
                our partnership with replit.
              </h2>
            </div>
            <div className="space-y-6 text-base text-neutral-600 sm:text-lg">
              <p>
                prism is proud to be part of replit’s creator ecosystem — helping businesses and creators build their
                online presence faster and smarter. through our partnership, anyone who joins replit using our referral
                link helps support prism’s mission to make professional web design accessible to everyone.
              </p>
              <Button
                asChild
                size="lg"
                className="h-auto w-full rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white sm:w-auto"
              >
                <Link href={REPLIT_REFERRAL_URL} target="_blank" rel="noopener noreferrer">
                  join replit through our link <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-100 lowercase">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px),_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-[0.28em] text-neutral-600">
                explore our work
              </p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
                see the websites we build on replit.
              </h2>
            </div>
            <div className="space-y-6 text-base text-neutral-700 sm:text-lg">
              <p>
                visit our dedicated <Link href="/websites" className="underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-900 hover:decoration-neutral-600">websites gallery</Link> to explore launched projects, performance results, and the design systems powering each build.
              </p>
              <ul className="space-y-4">
                {[
                  "real-world examples of prism sites built with replit.",
                  "detailed launch stories, tech stacks, and design decisions.",
                  "insights on performance, accessibility, and conversion boosts."
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-neutral-600 sm:text-base">
                    <span className="mt-1 rounded-full bg-emerald-400/20 p-1.5 text-emerald-500">
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className="h-auto w-full rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white sm:w-auto"
              >
                <Link href="/websites">
                  explore prism websites <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-950 lowercase">
          <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-16 text-center text-white md:px-6 md:py-24">
            <h2 className="text-3xl font-semibold md:text-4xl">ready to build something?</h2>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                variant="inverted"
                className="h-auto rounded-full px-8 py-4 text-base font-semibold"
              >
                <Link href="/pricing">
                  get a website built by prism <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline-inverted"
                className="h-auto rounded-full px-8 py-4 text-base font-semibold"
              >
                <Link href={REPLIT_REFERRAL_URL} target="_blank" rel="noopener noreferrer">
                  start building on replit <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
