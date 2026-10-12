import { Bot, MessageSquareText, Search } from "lucide-react"

import { cn } from "@/lib/utils"

const MODES = [
  {
    key: "seo",
    label: "SEO",
    name: "Search engine optimization",
    surface: "Ranked results in Google and Bing, including the map pack.",
    icon: Search,
    work: [
      "Crawlable pages with clean structure",
      "Service and location pages matched to intent",
      "Internal links and Google Business Profile",
    ],
    check: "Search Console impressions, clicks, and calls",
  },
  {
    key: "aeo",
    label: "AEO",
    name: "Answer engine optimization",
    surface: "Direct answers in Google AI Overviews and featured snippets.",
    icon: MessageSquareText,
    work: [
      "Answer-first sections and real FAQs",
      "Structured data that matches the page",
      "Hours, services, and areas stated plainly",
    ],
    check: "Which customer questions your pages answer",
  },
  {
    key: "geo",
    label: "GEO",
    name: "Generative engine optimization",
    surface: "Mentions and citations in ChatGPT, Gemini, and Perplexity.",
    icon: Bot,
    work: [
      "The same facts on your site, listings, and profiles",
      "Proof pages with real examples and reviews",
      "Mentions on sites that already cover your field",
    ],
    check: "How assistants describe your business today",
  },
] as const

const FOUNDATION = ["Fast, accessible pages", "Accurate business details", "Real proof"] as const

/**
 * SEO, AEO, and GEO as one diagram built from tokens: a customer question
 * branches into three kinds of search, each with what we work on and how we
 * check it, all resting on one shared foundation.
 */
export function SearchModesDiagram({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card p-4 sm:p-8 lg:p-10",
        className,
      )}
    >
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 opacity-40 mask-fade-y" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-56 bg-[radial-gradient(45%_70%_at_50%_0%,oklch(0.66_0.16_258/16%),transparent_70%)]"
      />

      {/* The question every mode starts from. */}
      <div className="flex flex-col items-center">
        <p className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/10 bg-background/70 px-5 text-sm text-muted-foreground shadow-[0_10px_30px_-12px_oklch(0_0_0/80%)]">
          <Search aria-hidden="true" className="size-4 text-foreground" />
          <span>
            <span className="sr-only">A customer asks: </span>
            “best dentist near me open saturday”
          </span>
        </p>
        <div aria-hidden="true" className="h-8 w-px bg-white/15" />
      </div>

      {/* Branch rule: one line splitting into three (desktop only). */}
      <div aria-hidden="true" className="relative mx-auto hidden h-8 w-2/3 md:block">
        <span className="absolute inset-x-0 top-0 h-px bg-white/15" />
        <span className="absolute left-0 top-0 h-full w-px bg-white/15" />
        <span className="absolute left-1/2 top-0 h-full w-px bg-white/15" />
        <span className="absolute right-0 top-0 h-full w-px bg-white/15" />
      </div>

      <ol className="grid gap-3 md:grid-cols-3 md:gap-4">
        {MODES.map((mode) => {
          const Icon = mode.icon
          return (
            <li
              key={mode.key}
              className="flex flex-col rounded-2xl border border-white/[0.08] bg-background/70 p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-2xl font-semibold tracking-[-0.04em] text-foreground">{mode.label}</span>
                <span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon aria-hidden="true" className="size-4 text-foreground" />
                </span>
              </div>
              <p className="mt-1 text-eyebrow text-subtle">{mode.name}</p>
              <p className="mt-4 text-[15px] leading-6 text-foreground/90">{mode.surface}</p>
              <p className="mt-5 text-eyebrow text-subtle">What we work on</p>
              <ul className="mt-3 flex-1 space-y-2">
                {mode.work.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-6 text-muted-foreground">
                    <span aria-hidden="true" className="mt-[9px] size-1 shrink-0 rounded-full bg-white/40" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-white/[0.08] pt-4 text-sm leading-6 text-muted-foreground">
                <span className="text-foreground">How we check: </span>
                {mode.check}
              </p>
            </li>
          )
        })}
      </ol>

      {/* Shared foundation under all three. */}
      <div className="mt-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-4 md:mt-4 sm:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-eyebrow text-subtle">One foundation under all three</p>
          <ul className="flex flex-wrap gap-2">
            {FOUNDATION.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 bg-background/60 px-3 py-1.5 text-[13px] text-foreground/90"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-4 text-center text-[13px] leading-6 text-subtle">
        No one can guarantee a ranking or an AI citation. We build the groundwork all three rely on.
      </p>
    </div>
  )
}

export default SearchModesDiagram
