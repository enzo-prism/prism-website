import Link from "next/link"
import type { Metadata } from "next"

import Footer from "@/components/footer"
import GuideTableOfContents from "@/components/guide-table-of-contents"
import Navbar from "@/components/navbar"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import ScrollToTop from "@/components/scroll-to-top"

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
            <div className="space-y-16">
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

              <article id="step-2" className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">step 2</p>
                  <h3 className="text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">
                    download the entire website snapshot
                  </h3>
                  <p className="text-base text-neutral-600">
                    Use <span className="font-semibold text-neutral-800">wget</span> to grab every reachable page and its assets directly to disk.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700 shadow-sm sm:text-base">
                    <p className="font-semibold text-neutral-800">Install wget (if needed):</p>
                    <pre className="mt-3 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-xs text-white sm:text-sm">
                      <code>{`brew install wget`}</code>
                    </pre>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700 shadow-sm sm:text-base">
                    <p className="font-semibold text-neutral-800">Download the live site:</p>
                    <pre className="mt-3 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-xs text-white sm:text-sm">
                      <code>{`wget -r -l inf -p -E -k -nc https://example.com`}</code>
                    </pre>
                    <p className="mt-3 text-sm text-neutral-600">
                      <span className="font-semibold text-neutral-800">Flags in plain English:</span>
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-neutral-600 sm:text-base">
                      <li>
                        <span className="font-semibold text-neutral-800">-r</span> → recursive crawl so linked pages come with it.
                      </li>
                      <li>
                        <span className="font-semibold text-neutral-800">-l inf</span> → crawl depth stays open until links run out.
                      </li>
                      <li>
                        <span className="font-semibold text-neutral-800">-p</span> → pulls required assets like images, styles, and scripts.
                      </li>
                      <li>
                        <span className="font-semibold text-neutral-800">-E</span> → adds <code className="rounded bg-neutral-100 px-1 py-0.5">.html</code> extensions so files open cleanly.
                      </li>
                      <li>
                        <span className="font-semibold text-neutral-800">-k</span> → rewrites links for offline use.
                      </li>
                      <li>
                        <span className="font-semibold text-neutral-800">-nc</span> → skips files you already downloaded.
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-white p-5 text-sm text-neutral-600 shadow-sm sm:text-base">
                    <p className="font-semibold text-neutral-800">Expected structure:</p>
                    <pre className="mt-3 overflow-x-auto rounded-xl bg-neutral-950 p-4 text-xs text-white sm:text-sm">
                      <code>
{`site-rebuild/
 ├── example.com/
 │    ├── index.html
 │    ├── about/
 │    ├── images/
 │    └── ...`}
                      </code>
                    </pre>
                  </div>
                </div>
              </article>

              <article id="step-3" className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">step 3</p>
                  <h3 className="text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">
                    pull the actual copy into plain text
                  </h3>
                  <p className="text-base text-neutral-600">
                    Optional, but it helps Codex keep every headline and paragraph accurate.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700 shadow-sm sm:text-base">
                    <p className="font-semibold text-neutral-800">Install ripgrep:</p>
                    <pre className="mt-3 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-xs text-white sm:text-sm">
                      <code>{`brew install ripgrep`}</code>
                    </pre>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700 shadow-sm sm:text-base">
                    <p className="font-semibold text-neutral-800">Extract headings and paragraphs:</p>
                    <pre className="mt-3 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-xs text-white sm:text-sm">
                      <code>{`rg -o '<p>.*?</p>|<h[1-6]>.*?</h[1-6]>' ./example.com > all_text_raw.html`}</code>
                    </pre>
                    <p className="mt-3 font-semibold text-neutral-800">Strip the HTML tags:</p>
                    <pre className="mt-3 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-xs text-white sm:text-sm">
                      <code>{`sed -E 's/<[^>]+>//g' all_text_raw.html > all_text_raw.txt`}</code>
                    </pre>
                    <p className="mt-3 text-sm text-neutral-600">
                      Result: a clean <code className="rounded bg-neutral-100 px-1 py-0.5">all_text_raw.txt</code> file ready for Codex context.
                    </p>
                  </div>
                </div>
              </article>

              <article id="step-4" className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">step 4</p>
                  <h3 className="text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">
                    grab the sitemap (if one exists)
                  </h3>
                  <p className="text-base text-neutral-600">
                    A live <code className="rounded bg-neutral-100 px-1 py-0.5">sitemap.xml</code> gives Codex a definitive page list.
                  </p>
                </div>
                <pre className="overflow-x-auto rounded-2xl bg-neutral-950 p-5 text-sm text-white shadow-sm">
                  <code>{`curl -O https://example.com/sitemap.xml`}</code>
                </pre>
              </article>

              <article id="step-5" className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">step 5</p>
                  <h3 className="text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">
                    prep the codex context folder
                  </h3>
                  <p className="text-base text-neutral-600">
                    Codex reads context from the <span className="font-semibold text-neutral-800">.codex</span> directory — keep instructions and source text here.
                  </p>
                </div>
                <div className="space-y-4">
                  <pre className="overflow-x-auto rounded-2xl bg-neutral-950 p-5 text-sm text-white shadow-sm">
                    <code>{`mkdir .codex`}</code>
                  </pre>
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700 shadow-sm sm:text-base">
                    <p className="font-semibold text-neutral-800">Add project instructions:</p>
                    <pre className="mt-3 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-xs text-white sm:text-sm">
                      <code>
{`echo "Website rebuild project for https://example.com
- Use Next.js + Tailwind
- Keep copy identical to original
- Modernize layout only" > .codex/instructions.md`}
                      </code>
                    </pre>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700 shadow-sm sm:text-base">
                    <p className="font-semibold text-neutral-800">Copy extracted text for Codex:</p>
                    <pre className="mt-3 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-xs text-white sm:text-sm">
                      <code>{`cp all_text_raw.txt .codex/current-site.md`}</code>
                    </pre>
                  </div>
                </div>
              </article>

              <article id="step-6" className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">step 6</p>
                  <h3 className="text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">run codex locally</h3>
                  <p className="text-base text-neutral-600">
                    With context in place, let Codex generate the rebuild in a fresh Next.js project.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700 shadow-sm sm:text-base">
                    <p className="font-semibold text-neutral-800">Export your OpenAI key first:</p>
                    <pre className="mt-3 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-xs text-white sm:text-sm">
                      <code>{`export OPENAI_API_KEY="your_api_key_here"`}</code>
                    </pre>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700 shadow-sm sm:text-base">
                    <p className="font-semibold text-neutral-800">Ask Codex for the rebuild:</p>
                    <pre className="mt-3 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-xs text-white sm:text-sm">
                      <code>
{`codex ask "Rebuild this website locally with the same text and structure using Next.js and Tailwind." \\
  --with .codex/instructions.md .codex/current-site.md`}
                      </code>
                    </pre>
                    <p className="mt-3 text-sm text-neutral-600">
                      Codex writes directly into the current folder — expect directories like <code className="rounded bg-neutral-100 px-1 py-0.5">pages/</code>,{" "}
                      <code className="rounded bg-neutral-100 px-1 py-0.5">components/</code>, and <code className="rounded bg-neutral-100 px-1 py-0.5">public/</code>.
                    </p>
                  </div>
                </div>
              </article>

              <article id="step-7" className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">step 7</p>
                  <h3 className="text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">
                    preview the rebuilt site on localhost
                  </h3>
                  <p className="text-base text-neutral-600">
                    Run the usual Next.js dev workflow and confirm the copy, layout, and routes match the original.
                  </p>
                </div>
                <pre className="overflow-x-auto rounded-2xl bg-neutral-950 p-5 text-sm text-white shadow-sm">
                  <code>
{`npm install
npm run dev`}
                  </code>
                </pre>
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700 shadow-sm sm:text-base">
                  <p className="font-semibold text-neutral-800">Visit the local build:</p>
                  <pre className="mt-3 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-xs text-white sm:text-sm">
                    <code>{`http://localhost:3000`}</code>
                  </pre>
                </div>
              </article>

              <article id="folder-overview" className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">reference</p>
                  <h3 className="text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">
                    folder layout when you’re done
                  </h3>
                  <p className="text-base text-neutral-600">
                    Keep this snapshot intact — it&apos;s the fastest way to iterate on the rebuild, hand assets to teammates, or version control the work.
                  </p>
                </div>
                <pre className="overflow-x-auto rounded-2xl bg-neutral-950 p-5 text-sm text-white shadow-sm">
                  <code>
{`site-rebuild/
 ├── example.com/          ← downloaded site
 ├── all_text_raw.txt      ← readable copy for Codex
 ├── sitemap.xml           ← structure map (optional)
 ├── .codex/
 │    ├── instructions.md
 │    └── current-site.md
 ├── package.json          ← generated by Codex
 ├── pages/
 ├── components/
 └── public/`}
                  </code>
                </pre>
              </article>

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
            </div>
            <GuideTableOfContents sections={guideSections} />
          </div>
        </section>
      </main>
      <ScrollToTop />
      <Footer />
    </>
  )
}
