"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { trackCTAClick } from "@/utils/analytics"

const FounderImpactGraph = dynamic(
  () => import("@/components/case-studies/FounderImpactGraph").then((m) => m.FounderImpactGraph),
  { ssr: false, loading: () => <Skeleton className="h-[620px] w-full rounded-3xl md:h-[660px]" /> }
)

function useNearViewport<T extends Element>(options?: IntersectionObserverInit) {
  const ref = React.useRef<T | null>(null)
  const [isNearViewport, setIsNearViewport] = React.useState(false)

  React.useEffect(() => {
    if (isNearViewport) return
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === "undefined") {
      setIsNearViewport(true)
      return
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setIsNearViewport(true)
        observer.disconnect()
      }
    }, options)

    observer.observe(node)
    return () => observer.disconnect()
  }, [isNearViewport, options])

  return { ref, isNearViewport }
}

export default function ImpactGraphSection() {
  const observerOptions = React.useMemo(
    () => ({
      root: null,
      rootMargin: "240px 0px",
      threshold: 0.1,
    }),
    []
  )
  const calloutCopy = React.useMemo(
    () => ({
      withoutPrism: (
        <div className="space-y-1">
          <p>your effort stays high.</p>
          <p>results stay “fine.” (until you burn out and rebuild again)</p>
        </div>
      ),
    }),
    []
  )

  const { ref: graphRef, isNearViewport } = useNearViewport<HTMLDivElement>(observerOptions)

  return (
    <section className="relative overflow-hidden bg-neutral-50 py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.05),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(0,0,0,0.04),transparent_45%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              buy back time
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight lowercase sm:text-4xl">
              buy back time.
            </h2>
            <p className="text-balance text-sm text-neutral-600 lowercase sm:text-base">
              you didn't start a business to:
            </p>
            <ul className="grid list-disc gap-2 pl-5 text-sm text-neutral-600 lowercase sm:text-base">
              <li>duct-tape marketing tools together</li>
              <li>chase freelancers for updates</li>
              <li>guess at seo and ads</li>
              <li>rebuild a “pretty website” that doesn’t bring customers</li>
              <li>spend nights + weekends on marketing</li>
            </ul>
            <p className="text-balance text-sm text-neutral-600 lowercase sm:text-base">
              prism owns the whole growth system — so your workload drops while inbound compounds.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="w-full rounded-full lowercase sm:w-auto">
                <Link
                  href="/case-studies"
                  onClick={() => trackCTAClick("explore case studies", "homepage impact graph")}
                >
                  explore case studies
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full rounded-full lowercase sm:w-auto">
                <Link href="/pricing" onClick={() => trackCTAClick("see pricing", "homepage impact graph")}>
                  see pricing
                </Link>
              </Button>
            </div>
          </div>

          <div className="w-full space-y-6">
            <div ref={graphRef}>
              {isNearViewport ? (
                <FounderImpactGraph
                  className="rounded-3xl overflow-hidden"
                  calloutCopy={calloutCopy}
                />
              ) : (
                <Skeleton className="h-[620px] w-full rounded-3xl md:h-[660px]" />
              )}
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                with prism
              </p>
              <p className="mt-3 text-sm text-neutral-600 lowercase">we own:</p>
              <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm text-neutral-700 lowercase">
                <li>a fast website that turns visits into calls + bookings</li>
                <li>your google business profile + local seo (so you show up in maps)</li>
                <li>content that answers customer questions (and wins the click)</li>
                <li>ads that bring in ready-to-buy leads (with tracking)</li>
              </ul>
              <div className="mt-4 grid gap-2 text-sm text-neutral-600 lowercase">
                <p>you don’t manage the project.</p>
                <p>you don’t chase updates.</p>
                <p>
                  you message us when you want a status check — we reply with what’s done, what’s
                  next, and timing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
