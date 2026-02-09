"use client"

import Footer from "@/components/footer"
import VideoPlayer from "@/components/video-player"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Navbar from "@/components/navbar"
import { useMobile } from "@/hooks/use-mobile"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import PixelishImg from "@/components/pixelish/PixelishImg"
import { pixelishForEmoji } from "@/lib/pixelish-emoji"

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
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 pt-20 pb-12 sm:pt-28 sm:pb-16">
          <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center">
            <div className="w-full space-y-6 lg:max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">design at prism</p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
                how design works at prism
              </h1>
              <figure className="space-y-3">
                <blockquote className="text-2xl font-light leading-snug text-neutral-900 sm:text-3xl italic">
                  &ldquo;design isn&rsquo;t just how something looks, it&rsquo;s how it works.&rdquo;
                </blockquote>
                <figcaption className="text-sm font-medium uppercase tracking-[0.35em] text-neutral-500">
                  &mdash; steve jobs
                </figcaption>
              </figure>
              <div className="space-y-4 text-base leading-relaxed text-neutral-700 sm:text-lg">
                <p>design is the backbone of everything we do at prism — it connects every part of your business.</p>
                <p>from websites and ads to video, analytics, and automation, great design shapes how it all works together.</p>
                <p>we design with purpose — blending beauty, performance, and precision to create outcomes that move your brand forward.</p>
              </div>
            </div>

            <aside className="relative w-full overflow-hidden rounded-[28px] border border-neutral-200 bg-neutral-900 text-white shadow-[0_32px_80px_-40px_rgba(15,23,42,0.55)]">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-400/15 via-sky-500/10 to-indigo-400/20 opacity-90"
                aria-hidden="true"
              />
              <div className="relative flex flex-col gap-6 p-8 sm:p-10">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-800">
                  <Image
                    src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763935789/Generated_Image_November_23_2025_-_2_08PM_fvriub.webp"
                    alt="Design hero preview"
                    fill
                    sizes="(min-width: 1280px) 640px, (min-width: 768px) 520px, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/70">connected by design</p>
                  <p className="text-lg font-light text-white/90">
                    every surface we ship is part of a linked system that keeps your story consistent and measurable.
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {[
                      { label: "websites", icon: "🖥️" },
                      { label: "ads", icon: "📢" },
                      { label: "video", icon: "🎥" },
                      { label: "analytics", icon: "📊" },
                      { label: "automation", icon: "⚙️" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/90"
                      >
                        <PixelishImg
                          src={pixelishForEmoji(item.icon).src}
                          alt=""
                          size={16}
                          aria-hidden="true"
                        />
                        <span className="leading-tight">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-white/75">
                    every element is crafted to move in sync, so your brand feels intentional across channels and devices.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div id="designs-founder-vsl" className="mx-auto max-w-3xl text-left">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">hear from our founder</p>
            <VideoPlayer
              className="mt-4"
              src="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763152551/design-1_ftpmsw.mp4"
              poster="https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/design-1_ftpmsw.jpg"
              title="Founder Enzo Sison on design as the silent multiplier"
              caption="Enzo explains why inconsistent design erodes trust, how Prism builds cohesive systems across every touchpoint, and how sharper visuals lift awareness, conversion, and loyalty without hiring an internal team."
              schema={{
                id: "https://www.design-prism.com/designs#founder-vsl",
                name: "Founder Enzo Sison on design as the silent multiplier",
                description:
                  "Enzo Sison shares why design is the silent multiplier, how Prism creates cohesive, premium systems across sites, listings, ads, and assets, and how that elevates awareness, conversion, and lifetime value.",
                thumbnailUrl: "https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/design-1_ftpmsw.jpg",
                uploadDate: "2025-01-24T00:00:00Z",
                duration: "PT60S",
                contentUrl: "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763152551/design-1_ftpmsw.mp4",
                embedUrl: "https://www.design-prism.com/designs#founder-vsl",
                width: 1920,
                height: 1080,
                creatorName: "Enzo Sison",
              }}
            />
          </div>
        </section>

        {/* What We Design */}
        <section className="px-4 py-16 sm:py-20 bg-neutral-50">
          <div className="mx-auto max-w-5xl space-y-10">
            <div className="space-y-4 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">what we design</p>
              <h2 className="text-3xl font-semibold leading-tight text-neutral-900 sm:text-4xl">
                Cohesive visuals that work everywhere
              </h2>
              <p className="text-base leading-relaxed text-neutral-700 sm:text-lg">
                Great design ties everything together. We build visual systems that keep your brand consistent across every touchpoint.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "websites", desc: "Conversion-first sites that turn visitors into loyal clients", icon: "🖥️" },
                { title: "ads", desc: "Attention-grabbing creatives that drive measurable results", icon: "📢" },
                { title: "social", desc: "Branded posts and profiles that stay true to your voice", icon: "💬" },
                { title: "print", desc: "Business cards, brochures, and collateral that leave a mark", icon: "🖨️" },
                { title: "internal assets", desc: "Decks, docs, and templates that keep teams aligned", icon: "📑" },
                { title: "systems", desc: "Reusable components and guidelines to keep everything cohesive", icon: "🧭" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
                >
                  <span className="mt-0.5 inline-flex" aria-hidden="true">
                    <PixelishImg
                      src={pixelishForEmoji(item.icon).src}
                      alt=""
                      size={18}
                      invert={false}
                      aria-hidden="true"
                    />
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold uppercase tracking-wide text-neutral-900">{item.title}</p>
                    <p className="text-sm text-neutral-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-sm leading-relaxed text-neutral-600 sm:text-base sm:text-left">
              Each piece is crafted to blend seamlessly, so your message looks — and feels — unified everywhere your brand lives.
            </p>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">featured design</p>
              <h3 className="mt-3 text-2xl font-semibold text-neutral-900">Wine Country Root Canal</h3>
              <p className="mt-3 text-sm text-neutral-600">
                See the full design review and deliverables for this endodontic brand refresh.
              </p>
              <Link
                href="/designs/wine-country-root-canal"
                className="mt-4 inline-flex text-sm font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
              >
                view the design review
              </Link>
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
                      className={`h-2 rounded-full transition-[width,background-color] duration-200 ${
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
                className="group flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white text-neutral-900 px-6 py-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="text-lg font-semibold">get started</span>
                <span className="text-sm text-neutral-600 group-hover:text-neutral-800">
                  kick off your transformation plan
                </span>
              </Link>
              <Link
                href="/contact"
                className="group flex flex-col items-center justify-center rounded-2xl border border-white/40 bg-transparent px-6 py-6 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-1 hover:border-white hover:bg-white/10"
              >
                <span className="text-lg font-semibold text-white">contact</span>
                <span className="text-sm text-white/70 group-hover:text-white">
                  talk with our team about your design needs
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
