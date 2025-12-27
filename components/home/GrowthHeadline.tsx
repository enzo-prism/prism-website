"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/utils/analytics"

const SERVICE_PILLS = [
  { icon: "📱", label: "websites" },
  { icon: "⚙️", label: "content systems" },
  { icon: "📣", label: "ads" },
]

export default function GrowthHeadline() {
  return (
    <section className="relative overflow-hidden bg-black py-16 text-white sm:py-20 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.05),transparent_45%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="flex flex-wrap justify-center gap-2">
            {SERVICE_PILLS.map((service) => (
              <span
                key={service.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80"
              >
                <span className="text-lg" aria-hidden>
                  {service.icon}
                </span>
                <span>{service.label}</span>
              </span>
            ))}
          </div>

          <div className="space-y-3">
            <h2 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl md:text-[clamp(2.4rem,4vw,3.4rem)]">
              websites, content, and ads that grow your business.
            </h2>
            <p className="text-balance text-base text-white/70 md:text-lg">
              world class design and engineering that puts growth on easy mode.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Button
              asChild
              variant="inverted"
              className="rounded-full px-5 py-3 text-base font-semibold"
            >
              <Link href="/get-started" onClick={() => trackCTAClick("start your build", "growth headline")}>
                start your build <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
