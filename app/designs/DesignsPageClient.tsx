"use client"

import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { useMobile } from "@/hooks/use-mobile"
import { ChevronLeft, ChevronRight } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

// Quotes data
const slides = [
  {
    id: "1",
    image: "/designs/obstacle-way.jpeg",
    quote: '"the obstacle is the way."',
    author: "– marcus aurelius",
  },
  {
    id: "2",
    image: "/designs/kobe-soul-eternal.jpeg",
    quote: '"the soul is never born, never dies."',
    author: "– bhagavad gita",
  },
  {
    id: "3",
    image: "/designs/la28-logos.png",
    quote: '"the man on top of the mountain didn\'t fall there."',
    author: "— vince lombardi",
  },
  {
    id: "4",
    image: "/designs/mountain-stones.jpeg",
    quote: '"the man who moves a mountain begins by carrying away small stones."',
    author: "— confucius",
  },
  {
    id: "5",
    image: "/designs/small-beginnings.jpeg",
    quote: '"do not despise the day of small beginnings."',
    author: "– book of zechariah",
  },
  {
    id: "6",
    image: "/designs/journey-step.jpeg",
    quote: '"a journey of a thousand miles begins with a single step."',
    author: "– lao tzu",
  },
  {
    id: "7",
    image: "/designs/the-way-is-training.png",
    quote: '"the way is in training."',
    author: "— miyamoto musashi",
  },
  {
    id: "8",
    image: "/designs/hearts-that-bend.png",
    quote: '"blessed are the hearts that can bend; they shall never be broken."',
    author: "— camus",
  },
  {
    id: "9",
    image: "/designs/dark-side-of-the-moon.png",
    quote: "“Look for what you notice but no one else sees.”",
    author: "– Rick Rubin",
  },
]


// Simplified: use Embla via our Carousel instead of custom drag + spring transitions

export default function DesignsPageClient() {
  const isMobile = useMobile()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [shuffledSlides, setShuffledSlides] = useState([...slides])
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    const shuffled = [...slides].sort(() => Math.random() - 0.5)
    setShuffledSlides(shuffled)
  }, [])

  const nextSlide = useCallback(() => api?.scrollNext(), [api])
  const prevSlide = useCallback(() => api?.scrollPrev(), [api])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  // Keep current slide index in sync with Embla
  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrentSlide(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="Captivating Designs" />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 pt-24 pb-12 sm:pt-32 sm:pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-12 lg:gap-16 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-stretch">
              <div className="space-y-8">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-neutral-900">
                  how design works at prism
                </h1>
                <figure className="space-y-3">
                  <blockquote className="text-2xl sm:text-3xl font-light leading-snug text-neutral-900 italic">
                    &ldquo;design isn&rsquo;t just how something looks, it&rsquo;s how it works.&rdquo;
                  </blockquote>
                  <figcaption className="text-sm font-medium uppercase tracking-[0.35em] text-neutral-500">
                    &mdash; steve jobs
                  </figcaption>
                </figure>
                <div className="space-y-5 text-base sm:text-lg leading-relaxed text-neutral-700">
                  <p>
                    design is the backbone of everything we do at prism &mdash; it connects every part of your business.
                  </p>
                  <p>
                    from websites and ads to video, analytics, and automation, great design shapes how it all works together.
                  </p>
                  <p>
                    we design with purpose &mdash; blending beauty, performance, and precision to create outcomes that move your brand forward.
                  </p>
                </div>
              </div>

              <aside className="relative overflow-hidden rounded-[28px] border border-neutral-200 bg-neutral-900 text-white shadow-[0_32px_80px_-40px_rgba(15,23,42,0.55)]">
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-sky-500/10 to-indigo-400/25 opacity-80"
                  aria-hidden="true"
                />
                <div className="relative flex h-full flex-col justify-between gap-8 p-8 sm:p-10 lg:p-12">
                  <div className="space-y-5">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/70">connected by design</p>
                    <p className="text-lg font-light text-white/90">
                      every surface we ship is part of a linked system that keeps your story consistent and measurable.
                    </p>
                    <ul className="space-y-3 text-base sm:text-lg font-light text-white/90">
                      {["websites", "ads", "video", "analytics", "automation"].map((label) => (
                        <li key={label} className="flex items-center gap-3">
                          <span className="h-2 w-2 rounded-full bg-white/60" aria-hidden="true" />
                          <span className="tracking-wide">{label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-white/75">
                    every element is crafted to move in sync, so your brand feels intentional across channels and devices.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* What We Design */}
        <section className="px-4 py-16 sm:py-20 bg-neutral-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-12 lg:gap-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-semibold leading-tight text-neutral-900">
                  what we design
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-neutral-700">
                  great design ties everything together. our team builds visual systems that keep your brand consistent across every touchpoint.
                </p>
                <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">we design:</p>
              </div>
              <div className="space-y-6">
                <ul className="space-y-4 text-base sm:text-lg leading-relaxed text-neutral-800">
                  {[
                    "websites that convert visitors into loyal clients",
                    "ads that attract attention and drive measurable results",
                    "social media branding and posts that stay true to your voice",
                    "business cards, brochures, and print that make a lasting impression",
                    "internal assets like presentation decks and branded templates that keep your team aligned",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-neutral-900/70" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-base sm:text-lg leading-relaxed text-neutral-700">
                  each piece is crafted to blend seamlessly, so your message looks &mdash; and feels &mdash; unified everywhere your brand lives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Slider Section */}
        <section className="px-4 py-16 md:py-24 bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col items-center">
              {/* Image Slider */}
              <div className="w-full max-w-3xl relative">
                <Carousel
                  setApi={setApi}
                  opts={{ loop: true, align: "center", containScroll: "trimSnaps" }}
                  className="[&_*]:select-none"
                >
                  <CarouselContent>
                    {shuffledSlides.map((slide) => (
                      <CarouselItem key={slide.id}>
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white" style={{ touchAction: "pan-x" }}>
                          <img
                            src={slide.image}
                            alt={`Design slide: ${slide.quote}`}
                            className="w-full h-full object-contain pointer-events-none"
                            draggable="false"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Navigation Arrows - Only visible on non-mobile */}
                  {!isMobile && (
                    <>
                      <CarouselPrevious className="bg-white/80 hover:bg-white" />
                      <CarouselNext className="bg-white/80 hover:bg-white" />
                    </>
                  )}
                </Carousel>

                {/* Quote Text */}
                <div className="mt-6 text-center max-w-xl mx-auto">
                  <p className="text-xl md:text-2xl font-light text-gray-800 mb-2 lowercase">
                    {shuffledSlides[currentSlide].quote}
                  </p>
                  <p className="text-sm md:text-base text-gray-600 lowercase">{shuffledSlides[currentSlide].author}</p>
                </div>

                {/* Slide Indicators */}
                <div className="flex justify-center space-x-2 mt-6">
                  {shuffledSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentSlide(index)
                        api?.scrollTo(index)
                      }}
                      className={`h-2 rounded-full transition-all ${
                        currentSlide === index ? "w-6 bg-black" : "w-2 bg-gray-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Swipe Hint - Only visible on mobile */}
                {isMobile && (
                  <div className="flex items-center justify-center space-x-2 text-center text-sm text-gray-500 mt-4">
                    <ChevronLeft className="h-4 w-4" />
                    <p>swipe to navigate</p>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 pb-20 sm:pb-24">
          <div className="max-w-4xl mx-auto rounded-[32px] border border-neutral-200 bg-neutral-900 text-white px-6 py-12 sm:px-10 sm:py-16 shadow-[0_32px_80px_-48px_rgba(15,23,42,0.65)] text-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">ready to elevate your brand?</h2>
              <p className="text-base sm:text-lg leading-relaxed text-white/70">
                whether you&rsquo;re starting fresh or refining what you already have, we&rsquo;ll help you design a system that works as beautifully as it looks.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/get-started"
                className="group flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white text-neutral-900 px-6 py-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="text-lg font-semibold">get started</span>
                <span className="text-sm text-neutral-600 group-hover:text-neutral-800">
                  begin your design journey
                </span>
              </Link>
              <Link
                href="/pricing"
                className="group flex flex-col items-center justify-center rounded-2xl border border-white/40 bg-transparent px-6 py-6 transition-all duration-200 hover:-translate-y-1 hover:border-white hover:bg-white/10"
              >
                <span className="text-lg font-semibold text-white">see pricing</span>
                <span className="text-sm text-white/70 group-hover:text-white">
                  explore packages that fit your goals
                </span>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
