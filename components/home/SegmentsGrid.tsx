"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type Segment = {
  emoji: string
  title: string
  summary: string
  highlights: string[]
  href: string
}

const segments: Segment[] = [
  {
    emoji: "📱",
    title: "online community founders",
    summary: "Systems, design, and data so you can stay focused on people instead of platforms.",
    highlights: ["More reach, retention, and referrals", "Design, tech, and analytics working in sync"],
    href: "/why-online-community-founders-love-prism",
  },
  {
    emoji: "🤝",
    title: "consulting companies",
    summary: "Build trust, attract better-fit clients, and scale without adding operational drag.",
    highlights: ["Clarity that wins confident inquiries", "Automations that keep your firm running smooth"],
    href: "/why-consulting-companies-love-prism",
  },
  {
    emoji: "🦷",
    title: "dental practices",
    summary: "Bring in more new patients, collect more reviews, and switch providers with zero downtime.",
    highlights: ["Seamless transitions handled end-to-end", "Local SEO, ads, and reviews under one roof"],
    href: "/why-dental-practices-love-prism",
  },
  {
    emoji: "🤍",
    title: "local shop owners",
    summary: "Drive foot traffic and repeat visits while we manage your listings, ads, and tech stack.",
    highlights: ["Listings, SEO, and ads that work together", "Automated follow-ups that bring customers back"],
    href: "/why-local-shop-owners-love-prism",
  },
  {
    emoji: "🕊️",
    title: "nonprofits",
    summary: "Tell your story beautifully, raise support, and keep operations simple for your team.",
    highlights: ["Design and storytelling that inspire action", "Automation and analytics built for mission work"],
    href: "/why-nonprofits-love-prism",
  },
]

export default function SegmentsGrid() {
  return (
    <section className="py-20 md:py-28 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight lowercase sm:text-4xl">
            market segments we support
          </h2>
        </div>

        <div className="mt-14">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              dragFree: true,
            }}
            className="relative"
          >
            <CarouselContent>
              {segments.map((segment) => (
                <CarouselItem
                  key={segment.title}
                  className="pl-4 basis-[92%] sm:basis-[78%] md:basis-[52%] lg:basis-[45%] xl:basis-[38%]"
                >
                  <article className="group flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl" aria-hidden>
                        {segment.emoji}
                      </span>
                      <h3 className="text-xl font-semibold lowercase text-neutral-900">
                        {segment.title}
                      </h3>
                    </div>
                    <Link
                      href={segment.href}
                      className="mt-6 inline-flex items-center text-sm font-semibold text-primary transition group-hover:gap-2"
                    >
                      <span>how we help</span>
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 md:-left-8" />
            <CarouselNext className="hidden sm:flex -right-4 md:-right-8" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
