"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Camera } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"

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
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            <Camera className="h-4 w-4" aria-hidden />
            on-location
          </div>
          <h3 className="mt-2 text-2xl font-semibold text-neutral-900">{shoot.practice}</h3>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          {shoot.website ? (
            <Button asChild variant="ghost" className="w-full rounded-full px-6 py-2 text-sm lowercase sm:w-auto">
              <Link href={shoot.website} target="_blank" rel="noreferrer">
                visit website
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          ) : null}
          <Button asChild variant="outline" className="w-full rounded-full px-6 py-2 text-sm lowercase sm:w-auto">
            <Link href="/book-a-shoot">
              book something like this
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>

      <Carousel
        className="mt-8 px-1 sm:px-0"
        opts={{
          align: "start",
          dragFree: true,
          containScroll: "trimSnaps"
        }}
        setApi={setApi}
      >
        <CarouselContent className="-ml-2">
          {shoot.shots.map((shot, index) => (
            <CarouselItem key={`${shoot.practice}-${index}`} className="pl-2 sm:basis-1/2 lg:basis-1/3">
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={1200}
                  height={800}
                  className="h-60 w-full object-cover sm:h-64"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex text-neutral-600 hover:text-neutral-900" />
        <CarouselNext className="hidden sm:flex text-neutral-600 hover:text-neutral-900" />
      </Carousel>

      <div className="mt-5 flex items-center gap-3 sm:hidden">
        <div
          className="flex-1 rounded-full bg-neutral-100"
          role="progressbar"
          aria-label="carousel progress"
          aria-valuemin={1}
          aria-valuemax={totalSlides}
          aria-valuenow={currentIndex + 1}
        >
          <div
            className="h-1 rounded-full bg-neutral-900 transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          />
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          {currentIndex + 1}/{totalSlides}
        </span>
      </div>
    </div>
  )
}

export default function RecentShootsSection({ shoots }: RecentShootsSectionProps) {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-500">recent shoots</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">see what practices walk away with</h2>
          <p className="mt-4 text-base text-neutral-600">
            swipe through the latest office &amp; team sessions—everything below is already live on websites, listings, and socials.
          </p>
        </div>

        <div className="space-y-10">
          {shoots.map((shoot) => (
            <ShootCarouselCard key={shoot.practice} shoot={shoot} />
          ))}
        </div>
      </div>
    </section>
  )
}
