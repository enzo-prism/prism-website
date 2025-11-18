import type { Metadata } from "next"
import Link from "next/link"

import Footer from "@/components/footer"
import GuideTableOfContents from "@/components/guide-table-of-contents"
import Navbar from "@/components/navbar"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import ScrollToTop from "@/components/scroll-to-top"
import SiteRebuildDynamicSteps from "@/components/site-rebuild-dynamic-steps"

const guideSections = [
  { id: "overview", label: "Overview", emoji: "🧭" },
  { id: "step-1", label: "Step 1", emoji: "1️⃣" },
  { id: "step-2", label: "Step 2", emoji: "2️⃣" },
  { id: "step-3", label: "Step 3", emoji: "3️⃣" },
  { id: "step-4", label: "Step 4", emoji: "4️⃣" },
  { id: "step-5", label: "Step 5", emoji: "5️⃣" },
  { id: "step-6", label: "Step 6", emoji: "6️⃣" },
  { id: "step-7", label: "Step 7", emoji: "7️⃣" },
  { id: "folder-overview", label: "Folder layout", emoji: "🗂️" },
  { id: "wrap-up", label: "Wrap up", emoji: "✅" },
]

export const metadata: Metadata = {
  title: "rebuild any site locally with codex | prism openai guide",
  description:
    "Follow Prism’s no-fluff playbook to download a live site, extract its content, prep Codex context, and rebuild the experience on your machine.",
  openGraph: {
    title: "rebuild any site locally with codex | prism openai guide",
    description:
      "Seven precise steps to mirror a live website, feed Codex, and launch the Next.js rebuild on your localhost.",
    url: "https://design-prism.com/openai/site-rebuild",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism OpenAI Site Rebuild Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "rebuild any site locally with codex | prism openai guide",
    description:
      "Download the current site, capture the copy, and let Codex rebuild it locally with Next.js and Tailwind.",
    images: ["/prism-opengraph.png"],
  },
}

export default function OpenAISiteRebuildGuidePage() {
  return (
    <>
      <Navbar />
      <ScrollProgressBar />
      <main className="bg-white text-neutral-900">
        <section className="relative overflow-hidden border-b border-neutral-100 bg-neutral-950 text-white">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_rgba(0,0,0,0.92))]"
          />
          <div className="absolute inset-0 opacity-30 mix-blend-screen">
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.22),_rgba(76,29,149,0))]" />
          </div>
          <div className="relative">
            <div className="container mx-auto max-w-4xl px-4 py-20 text-center sm:py-24 md:px-6 md:py-28">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                prism openai implementation guide
              </p>
              <h1 className="mt-5 text-4xl font-semibold lowercase tracking-tight sm:text-5xl md:text-6xl">
                mirror any website and rebuild it with codex
              </h1>
              <p className="mt-5 text-base text-white/80 sm:text-lg">
                No fluff — just the commands that work on macOS to download a live site, prep Codex context, and run the rebuild
                locally so you can ship updates fast.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/openai"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-100"
                >
                  back to openai overview
                </Link>
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/70 hover:text-white"
                >
                  talk with prism
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-white">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:px-6 lg:grid-cols-[minmax(0,_1fr),_minmax(0,_260px)] lg:gap-16 lg:py-24">
            <div className="min-w-0 space-y-16">
              <article id="overview" className="space-y-8">
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">start here</p>
                  <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                    one folder that captures the live site
                  </h2>
                  <p className="text-base text-neutral-600 sm:text-lg">
                    Every step keeps your local rebuild simple: download the current experience, extract the words that convert, and
                    hand Codex a clean brief so the regenerated build matches what&apos;s live today.
                  </p>
                </div>
                <div className="h-px w-full bg-neutral-200" aria-hidden />
                <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">goal</p>
                  <h3 className="mt-3 text-2xl font-semibold lowercase text-neutral-900">ship a portable snapshot</h3>
                  <ol className="mt-4 space-y-3 text-base text-neutral-700 sm:text-lg">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-6 w-6 rounded-full border border-neutral-300 bg-white text-center text-sm font-semibold leading-6 text-neutral-600">
                        1
                      </span>
                      <span>Create a folder that includes the full download of the current site.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-6 w-6 rounded-full border border-neutral-300 bg-white text-center text-sm font-semibold leading-6 text-neutral-600">
                        2
                      </span>
                      <span>Extract all readable text and sitemap clues Codex needs for context.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-6 w-6 rounded-full border border-neutral-300 bg-white text-center text-sm font-semibold leading-6 text-neutral-600">
                        3
                      </span>
                      <span>Run Codex locally so the rebuilt Next.js project is ready to preview on localhost.</span>
                    </li>
                  </ol>
                </div>
              </article>

              <article id="step-1" className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">step 1</p>
                  <h3 className="text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">create a project folder</h3>
                  <p className="text-base text-neutral-600">
                    Keep everything in one spot so assets, text files, and Codex context stay organized.
                  </p>
                </div>
                <pre className="overflow-x-auto rounded-2xl bg-neutral-950 p-5 text-sm text-white shadow-sm">
                  <code>
{`cd ~/Desktop
mkdir site-rebuild && cd site-rebuild`}
                  </code>
                </pre>
              </article>

              <SiteRebuildDynamicSteps />

              <article id="wrap-up" className="space-y-6">
                <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">wrap up</p>
                  <h3 className="mt-3 text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">
                    seven moves, live rebuild
                  </h3>
                  <p className="mt-4 text-base text-neutral-600 sm:text-lg">
                    You now have a local mirror of the live site, Codex-ready context, and a running Next.js build on localhost. From
                    here, you can modernize the design, iterate on copy, or push the rebuild into your repo.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/openai"
                      className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      explore more openai systems
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900"
                    >
                      request implementation help
                    </Link>
                  </div>
                </div>
              </article>

              <article className="space-y-6">
                <div className="rounded-3xl border border-neutral-900 bg-neutral-900 p-6 text-white shadow-lg sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">next experiment</p>
                  <h3 className="mt-3 text-2xl font-semibold lowercase text-white sm:text-3xl">
                    watch gpt-5.1 codex build a dentist site
                  </h3>
                  <p className="mt-4 text-base text-white/80 sm:text-lg">
                    We ran the Model Test Key from this guide through GPT-5.1 Codex (High) and documented the full run: generation
                    time, UI polish, responsive behavior, sitemap completeness, and the live video breakdown.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-white/80 sm:text-base">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 px-2 text-[10px] font-semibold uppercase text-white">
                        speed
                      </span>
                      <span>5 minutes 16 seconds from prompt to exported files, captured end-to-end.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 px-2 text-[10px] font-semibold uppercase text-white">
                        quality
                      </span>
                      <span>Deep dive on gradients, icon styling, blog completeness, and mobile breakpoints.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 px-2 text-[10px] font-semibold uppercase text-white">
                        schema
                      </span>
                      <span>Full structured data plus transcript so you can mirror the benchmark exactly.</span>
                    </li>
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/blog/gpt-5-1-codex-test-dentist-website"
                      className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-100"
                    >
                      read the benchmark
                    </Link>
                    <Link
                      href="https://youtu.be/PZnRkuJ9_S0"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/70"
                    >
                      watch the run
                    </Link>
                  </div>
                </div>
              </article>

            </div>
            <div className="min-w-0">
              <GuideTableOfContents sections={guideSections} />
            </div>
          </div>
        </section>
      </main>
      <ScrollToTop />
      <Footer />
    </>
  )
}
