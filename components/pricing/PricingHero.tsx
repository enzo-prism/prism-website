"use client"

import Image from "next/image"
import { useState } from "react"

import RevealOnScroll from "@/components/reveal-on-scroll"
import { Button } from "@/components/ui/button"

const HERO_IMAGE = {
  src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763918627/Generated_Image_November_23_2025_-_9_22AM_eobrfp.webp",
  alt: "Prism pricing hero preview",
}

export default function PricingHero() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <>
      <section className="border-b border-black/10 bg-white text-black">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-24 sm:py-32">
          <RevealOnScroll delay={0.1}>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                buy back your time. build growth that compounds.
              </h1>
              <div className="space-y-2">
                <p className="text-lg text-black/70 sm:text-xl">
                  three ways to work with prism: launch (fast site), grow (site + content), scale
                  (site + content + ads).
                </p>
                <p className="text-sm text-black/60 sm:text-base">with prism, impossible is temporary.</p>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full border border-black bg-black px-8 py-6 text-base font-semibold text-white hover:bg-black/90 sm:w-auto"
              >
                <a href="#plans" className="inline-flex items-center gap-2">
                  <span
                    className="inline-block h-0 w-0 translate-y-[1px] border-x-[6px] border-b-[8px] border-x-transparent border-b-white"
                    aria-hidden
                  />
                  <span>see plans + pricing</span>
                </a>
              </Button>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.25}>
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="group relative w-full overflow-hidden rounded-3xl border border-black/10 bg-zinc-50 shadow-[10px_10px_0_0_#00000008] outline-hidden transition focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-label="Open pricing hero image in fullscreen"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  fill
                  sizes="(min-width: 1024px) 960px, (min-width: 768px) 720px, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.01]"
                  priority
                />
              </div>
            </button>
          </RevealOnScroll>
        </div>
      </section>

      {isFullscreen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-10 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Pricing hero image fullscreen"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-sm font-semibold text-white shadow-md transition hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={() => setIsFullscreen(false)}
            >
              Close
            </button>
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-black">
              <Image
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
