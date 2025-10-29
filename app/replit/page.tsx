import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/mdx"

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
  return BLOG_DATE_FORMATTER.format(parsed)
}

const WORKFLOW_ITEMS = [
  {
    title: "Custom website builds",
    description:
      "Fast, lightweight, SEO-optimized sites built in HTML, CSS, JavaScript, or frameworks like React."
  },
  {
    title: "Live collaboration",
    description: "Clients can review and comment inside Replit in real time."
  },
  {
    title: "AI-assisted development",
    description: "Powered by Replit’s Ghostwriter and Prism’s design systems for speed and consistency."
  },
  {
    title: "Instant deployment",
    description: "Shareable links, automated updates, and analytics integrations built right in."
  }
]

const LEARNING_CHANNELS = [
  {
    title: "Our Blog",
    description: "Detailed guides for Replit web development and design best practices.",
    href: "/blog"
  },
  {
    title: "Our YouTube Channel",
    description: "Walkthroughs, tips, and visual tutorials.",
    href: YOUTUBE_CHANNEL_URL
  }
]

export const metadata: Metadata = {
  title: "Prism × Replit | Build or Learn to Build Websites with Replit",
  description:
    "Prism partners with Replit to design, build, and teach modern website creation. Get a website built for you or start learning with our free Replit guides and tutorials.",
  alternates: {
    canonical: "https://www.design-prism.com/replit"
  },
  openGraph: {
    title: "Prism × Replit | Build or Learn to Build Websites with Replit",
    description:
      "Prism partners with Replit to design, build, and teach modern website creation. Get a website built for you or start learning with our free Replit guides and tutorials.",
    url: "https://www.design-prism.com/replit",
    siteName: "Prism",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Prism × Replit | Build or Learn to Build Websites with Replit",
    description:
      "Prism partners with Replit to design, build, and teach modern website creation. Get a website built for you or start learning with our free Replit guides and tutorials."
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
      <main className="bg-white text-neutral-900">
        <section className="relative overflow-hidden rounded-b-[3rem] bg-neutral-950 text-white">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_rgba(0,0,0,0.85))]"
          />
          <div className="absolute inset-0 opacity-50 mix-blend-screen">
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_rgba(129,140,248,0.35),_rgba(67,56,202,0))]" />
          </div>
          <div className="relative">
            <div className="container mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-24 text-center md:gap-8 md:px-6 md:py-32">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
                <Sparkles className="h-4 w-4" aria-hidden />
                Prism × Replit
              </span>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                Prism × Replit — Building the Next Generation of Websites
              </h1>
              <p className="text-lg font-medium text-white/90 sm:text-xl">
                Build. Launch. Grow — all on Replit.
              </p>
              <p className="max-w-3xl text-base text-white/80 sm:text-lg">
                Prism partners with Replit to design and build high-performance websites for modern businesses. Whether
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
                    🚀 Get a Website Built in Replit <ArrowRight className="h-5 w-5" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline-inverted"
                  className="h-auto rounded-full px-8 py-4 text-base font-semibold"
                >
                  <Link href={REPLIT_REFERRAL_URL} target="_blank" rel="noopener noreferrer">
                    ✨ Start with Replit <ArrowRight className="h-5 w-5" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-white">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px),_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">Why we use Replit</p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
                A better way to build websites.
              </h2>
            </div>
            <div className="flex flex-col gap-6 text-base text-neutral-600 sm:text-lg">
              <p>
                Replit is one of the fastest, most collaborative platforms for web development — letting us design, build,
                and deploy client websites entirely in the browser. No downloads. No setup. Just a link, and we’re live.
              </p>
              <p>
                Prism uses Replit to streamline everything from design previews to real-time collaboration, so clients can
                see updates, give feedback, and launch faster than ever.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-neutral-950 text-white">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px),_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">How Prism builds</p>
              <h2 className="text-3xl font-semibold md:text-4xl">Our workflow.</h2>
              <p className="text-sm text-white/60">
                We use Replit for:
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
                <Link href="/pricing">
                  See our pricing &amp; website packages <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px),_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Learn to build on Replit
              </p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
                Prefer to build it yourself?
              </h2>
            </div>
            <div className="space-y-6 text-base text-neutral-700 sm:text-lg">
              <p>
                We also publish free tutorials and step-by-step guides for creators who want to learn how to build on
                Replit. You’ll find them on:
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
                  Start with Replit (Referral Link) <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
              {replitBlogPosts.length > 0 && (
                <div className="mt-12 space-y-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-2xl font-semibold text-neutral-900">
                      Dive into our Replit tutorials
                    </h3>
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-600 transition-colors hover:text-neutral-900"
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
                          <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-neutral-600">
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
                            Read post <ArrowRight className="h-4 w-4" aria-hidden />
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

        <section className="border-t border-neutral-200 bg-white">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px),_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Partnership statement
              </p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
                Our partnership with Replit.
              </h2>
            </div>
            <div className="space-y-6 text-base text-neutral-600 sm:text-lg">
              <p>
                Prism is proud to be part of Replit’s creator ecosystem — helping businesses and creators build their
                online presence faster and smarter. Through our partnership, anyone who joins Replit using our referral
                link helps support Prism’s mission to make professional web design accessible to everyone.
              </p>
              <Button
                asChild
                size="lg"
                className="h-auto w-full rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white sm:w-auto"
              >
                <Link href={REPLIT_REFERRAL_URL} target="_blank" rel="noopener noreferrer">
                  Join Replit through our link <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-100">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px),_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-600">
                Explore our work
              </p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
                See the websites we build on Replit.
              </h2>
            </div>
            <div className="space-y-6 text-base text-neutral-700 sm:text-lg">
              <p>
                Visit our dedicated <Link href="/websites" className="underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-900 hover:decoration-neutral-600">websites gallery</Link> to explore launched projects, performance results, and the design systems powering each build.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-world examples of Prism sites built with Replit.",
                  "Detailed launch stories, tech stacks, and design decisions.",
                  "Insights on performance, accessibility, and conversion boosts."
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
                  Explore Prism websites <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-950">
          <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-16 text-center text-white md:px-6 md:py-24">
            <h2 className="text-3xl font-semibold md:text-4xl">Ready to build something?</h2>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                variant="inverted"
                className="h-auto rounded-full px-8 py-4 text-base font-semibold"
              >
                <Link href="/pricing">
                  Get a Website Built by Prism <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline-inverted"
                className="h-auto rounded-full px-8 py-4 text-base font-semibold"
              >
                <Link href={REPLIT_REFERRAL_URL} target="_blank" rel="noopener noreferrer">
                  Start Building on Replit <ArrowRight className="h-5 w-5" aria-hidden />
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
