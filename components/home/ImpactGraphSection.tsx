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
              grow customers while founder effort drops.
            </h2>
            <p className="text-balance text-sm text-neutral-600 lowercase sm:text-base">
              toggle between <span className="font-semibold text-neutral-900">with prism</span> and{" "}
              <span className="font-semibold text-neutral-900">without prism</span> to see how inbound
              compounds while your workload trends toward zero.
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

          <div ref={graphRef} className="w-full">
            {isNearViewport ? (
              <FounderImpactGraph className="rounded-3xl" />
            ) : (
              <Skeleton className="h-[620px] w-full rounded-3xl md:h-[660px]" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
