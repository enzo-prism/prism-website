"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import PixelishImg from "@/components/pixelish/PixelishImg"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/utils/analytics"

const SERVICE_PILLS = [
  { iconSrc: "/pixelish/device-monitor.svg", iconAlt: "Website icon", label: "websites" },
  { iconSrc: "/pixelish/command.svg", iconAlt: "System icon", label: "content systems" },
  { iconSrc: "/pixelish/device-radio.svg", iconAlt: "Broadcast icon", label: "ads" },
]

export default function GrowthHeadline() {
  return (
    <section className="relative overflow-hidden bg-background py-16 text-foreground sm:py-20 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.05),transparent_45%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="flex flex-wrap justify-center gap-2">
            {SERVICE_PILLS.map((service) => (
              <Badge
                key={service.label}
                variant="outline"
                className="gap-2 rounded-full bg-card/40 px-4 py-2 text-[11px] text-foreground/80"
              >
                <PixelishImg
                  src={service.iconSrc}
                  alt=""
                  size={18}
                  invert={false}
                  className="dark:invert"
                  aria-hidden="true"
                />
                <span>{service.label}</span>
              </Badge>
            ))}
          </div>

          <div className="space-y-3">
            <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              websites, content, and ads that grow your business.
            </h2>
            <p className="text-balance text-base text-muted-foreground md:text-lg">
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
