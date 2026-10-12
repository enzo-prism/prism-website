"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Camera } from "lucide-react"

import { ArrowLink } from "@/components/landing/dental/primitives"
import { Section, SectionHeader } from "@/components/prism/section"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { WAITLIST_FOCUS_HREFS } from "@/lib/waitlist"

type ShootShot = {
  src: string
  alt: string
}

type Shoot = {
  practice: string
  location: string
  date: string
  summary: string
  shots: ShootShot[]
  website?: string
}

type RecentShootsSectionProps = {
  shoots: Shoot[]
}

function ShootCarouselCard({ shoot }: { shoot: Shoot }) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const totalSlides = shoot.shots.length
  const progress = totalSlides ? ((currentIndex + 1) / totalSlides) * 100 : 0

  useEffect(() => {
    if (!api) {
      return
    }

    const handleSelect = () => {
      setCurrentIndex(api.selectedScrollSnap())
    }

    handleSelect()
    api.on("select", handleSelect)
    api.on("reInit", handleSelect)

    return () => {
      api.off("select", handleSelect)
      api.off("reInit", handleSelect)
    }
  }, [api])

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-card p-5 sm:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="flex items-center gap-2 text-eyebrow text-subtle">
            <Camera className="size-3.5" aria-hidden />
            On-location · {shoot.date}
          </p>
          <h3 className="text-heading mt-3 text-foreground">{shoot.practice}</h3>
          <p className="mt-2 max-w-[56ch] text-[15px] leading-7 text-muted-foreground">{shoot.summary}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          {shoot.website ? (
            <a
              href={shoot.website}
              target="_blank"
              rel="noreferrer"
              className="group/site inline-flex min-h-10 items-center gap-1.5 rounded-sm text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              visit website
              <ArrowUpRight
                className="size-4 text-muted-foreground transition-transform duration-200 group-hover/site:-translate-y-0.5 group-hover/site:translate-x-0.5"
                aria-hidden
              />
            </a>
          ) : null}
          <ArrowLink href={WAITLIST_FOCUS_HREFS.content}>join the waitlist</ArrowLink>
        </div>
      </div>

      <Carousel
        className="mt-8"
        opts={{
          align: "start",
          dragFree: true,
          containScroll: "trimSnaps",
        }}
        setApi={setApi}
      >
        <CarouselContent className="-ml-3">
          {shoot.shots.map((shot, index) => (
            <CarouselItem key={`${shoot.practice}-${index}`} className="basis-[85%] pl-3 sm:basis-1/2 lg:basis-1/3">
              <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-popover">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={1200}
                  height={800}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 80vw"
                  className="h-60 w-full object-cover sm:h-64"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 hidden size-10 bg-background/80 backdrop-blur sm:flex" />
        <CarouselNext className="right-3 hidden size-10 bg-background/80 backdrop-blur sm:flex" />
      </Carousel>

      <div className="mt-5 flex items-center gap-3 sm:hidden">
        <div
          className="h-1 flex-1 rounded-full bg-white/[0.08]"
          role="progressbar"
          aria-label="carousel progress"
          aria-valuemin={1}
          aria-valuemax={totalSlides}
          aria-valuenow={currentIndex + 1}
        >
          <div
            className="h-1 rounded-full bg-foreground transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          />
        </div>
        <span className="font-mono text-[11px] text-subtle">
          {currentIndex + 1}/{totalSlides}
        </span>
      </div>
    </div>
  )
}

export default function RecentShootsSection({ shoots }: RecentShootsSectionProps) {
  return (
    <Section aria-labelledby="recent-shoots-title">
      <SectionHeader
        id="recent-shoots-title"
        eyebrow="Recent shoots"
        title="see what practices walk away with."
        description="swipe through the latest office & team sessions. Everything below is already live on websites, listings, and socials."
      />
      <div className="mt-12 space-y-8">
        {shoots.map((shoot) => (
          <ShootCarouselCard key={shoot.practice} shoot={shoot} />
        ))}
      </div>
    </Section>
  )
}
