import type { CSSProperties } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, BookOpen, Home, LayoutGrid } from "lucide-react"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Eyebrow } from "@/components/prism/section"
import { WaitlistButton } from "@/components/prism/waitlist-button"
import { Button } from "@/components/ui/button"

const RAYS = [
  { color: "var(--spectrum-red)", angle: -13, length: 92 },
  { color: "var(--spectrum-orange)", angle: -8, length: 78 },
  { color: "var(--spectrum-yellow)", angle: -3, length: 100 },
  { color: "var(--spectrum-green)", angle: 3, length: 70 },
  { color: "var(--spectrum-blue)", angle: 8.5, length: 96 },
  { color: "var(--spectrum-violet)", angle: 14, length: 82 },
] as const

const DESTINATIONS = [
  {
    href: "/",
    label: "Home",
    description: "Start where the light is brightest.",
    icon: Home,
  },
  {
    href: "/case-studies",
    label: "The work",
    description: "Real client sites, every one live.",
    icon: LayoutGrid,
  },
  {
    href: "/blog",
    label: "The journal",
    description: "Notes on websites, search, and ads.",
    icon: BookOpen,
  },
] as const

function rise(delay: number): CSSProperties {
  return { "--rise-delay": `${delay}ms` } as CSSProperties
}

/** The 404: a beam of light enters the prism and scatters off the page. */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative isolate flex-1 overflow-x-clip">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-x-0 top-0 h-[720px] opacity-50" />
          <div className="absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(36%_40%_at_50%_34%,oklch(0.66_0.16_258/14%),transparent_70%),radial-gradient(30%_36%_at_64%_40%,oklch(0.66_0.21_29/10%),transparent_70%)] blur-2xl" />
          <div className="bg-noise absolute inset-0 opacity-[0.05]" />
        </div>

        <section aria-labelledby="not-found-title" className="pb-20 pt-10 sm:pb-28 sm:pt-16">
          <div className="prism-container">
            {/* Refraction scene: decorative. */}
            <div
              aria-hidden="true"
              className="prism-rise relative mx-auto h-[150px] w-full max-w-3xl sm:h-[210px]"
              style={rise(0)}
            >
              <span className="absolute inset-0 grid place-items-center select-none text-[clamp(7rem,4rem+16vw,15rem)] font-semibold leading-none tracking-[-0.07em] text-white/[0.035]">
                404
              </span>
              {/* incoming white beam */}
              <span className="absolute left-0 top-1/2 h-px w-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/40 to-white/90" />
              {/* scattered spectrum */}
              <span className="absolute left-1/2 top-1/2 h-0 w-1/2">
                {RAYS.map((ray) => (
                  <span
                    key={ray.color}
                    className="absolute left-0 top-0 h-[2px] origin-left rounded-full opacity-90 blur-[0.4px]"
                    style={{
                      width: `${ray.length}%`,
                      transform: `rotate(${ray.angle}deg)`,
                      backgroundImage: `linear-gradient(90deg, ${ray.color}, color-mix(in oklch, ${ray.color} 40%, transparent) 55%, transparent)`,
                      boxShadow: `0 0 14px color-mix(in oklch, ${ray.color} 55%, transparent)`,
                    }}
                  />
                ))}
              </span>
              {/* the prism */}
              <svg
                viewBox="0 0 120 104"
                className="absolute left-1/2 top-1/2 h-[92px] w-[106px] -translate-x-1/2 -translate-y-[58%] drop-shadow-[0_0_24px_oklch(1_0_0/18%)] sm:h-[120px] sm:w-[138px]"
              >
                <defs>
                  <linearGradient id="nf-glass" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="white" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="white" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <path
                  d="M60 4 L116 100 L4 100 Z"
                  fill="url(#nf-glass)"
                  stroke="white"
                  strokeOpacity="0.85"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center text-center sm:mt-14">
              <div className="prism-rise" style={rise(80)}>
                <Eyebrow>Error 404</Eyebrow>
              </div>
              <h1
                id="not-found-title"
                className="prism-rise text-display mt-5 max-w-[12ch] text-balance pb-2"
                style={rise(140)}
              >
                <span className="text-gradient">lost in the </span>
                <span className="text-spectrum">spectrum.</span>
              </h1>
              <p
                className="prism-rise text-lead mt-6 max-w-[46ch] text-pretty text-muted-foreground"
                style={rise(220)}
              >
                This page split off somewhere we can&apos;t follow. It may have moved, or the link
                may be mistyped. Here is where the light still lands.
              </p>
              <div
                className="prism-rise mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
                style={rise(300)}
              >
                <WaitlistButton location="404 hero" size="xl" />
                <Button asChild size="xl" variant="outline">
                  <Link href="/case-studies">
                    See the work
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>

            <nav
              aria-label="Popular pages"
              className="prism-rise mx-auto mt-16 max-w-4xl sm:mt-20"
              style={rise(380)}
            >
              <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                {DESTINATIONS.map(({ href, label, description, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group/dest flex h-full items-start gap-4 rounded-2xl border border-white/[0.08] bg-card p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/[0.16] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:hover:translate-y-0"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                        <Icon aria-hidden="true" className="size-4 text-foreground" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2 font-medium text-foreground">
                          {label}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-4 text-subtle transition-[color,transform] duration-200 group-hover/dest:-translate-y-px group-hover/dest:translate-x-px group-hover/dest:text-foreground"
                          />
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                          {description}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
