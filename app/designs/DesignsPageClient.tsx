'use client'

import VideoPlayer from '@/components/video-player'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Eyebrow, SectionHeader } from '@/components/prism/section'
import { Reveal } from '@/components/prism/reveal'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { useMobile } from '@/hooks/use-mobile'
import {
  ArrowRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Compass,
  FileText,
  Megaphone,
  MessageCircle,
  Monitor,
  Printer,
  Workflow,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { useCallback, useEffect, useState } from 'react'

const CONNECTED_SURFACES = [
  { label: 'Websites', icon: Monitor },
  { label: 'Ads', icon: Megaphone },
  { label: 'Video', icon: Clapperboard },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Automation', icon: Workflow },
] as const

const DESIGN_DELIVERABLES = [
  {
    title: 'websites',
    desc: 'Conversion-first sites that turn visitors into loyal clients',
    icon: Monitor,
  },
  {
    title: 'ads',
    desc: 'Attention-grabbing creatives built to be measured',
    icon: Megaphone,
  },
  {
    title: 'social',
    desc: 'Branded posts and profiles that stay true to your voice',
    icon: MessageCircle,
  },
  {
    title: 'print',
    desc: 'Business cards, brochures, and collateral that leave a mark',
    icon: Printer,
  },
  {
    title: 'internal assets',
    desc: 'Decks, docs, and templates that keep teams aligned',
    icon: FileText,
  },
  {
    title: 'systems',
    desc: 'Reusable components and guidelines to keep everything cohesive',
    icon: Compass,
  },
] as const

// Quotes data
const slides = [
  {
    id: '1',
    image: '/designs/obstacle-way.jpeg',
    quote: '"The obstacle is the way."',
    author: 'Marcus Aurelius',
  },
  {
    id: '2',
    image: '/designs/kobe-soul-eternal.jpeg',
    quote: '"The soul is never born, never dies."',
    author: 'Bhagavad Gita',
  },
  {
    id: '3',
    image: '/designs/la28-logos.png',
    quote: '"The man on top of the mountain didn\'t fall there."',
    author: 'Vince Lombardi',
  },
  {
    id: '4',
    image: '/designs/mountain-stones.jpeg',
    quote:
      '"The man who moves a mountain begins by carrying away small stones."',
    author: 'Confucius',
  },
  {
    id: '5',
    image: '/designs/small-beginnings.jpeg',
    quote: '"Do not despise the day of small beginnings."',
    author: 'Book of Zechariah',
  },
  {
    id: '6',
    image: '/designs/journey-step.jpeg',
    quote: '"A journey of a thousand miles begins with a single step."',
    author: 'Lao Tzu',
  },
  {
    id: '7',
    image: '/designs/the-way-is-training.png',
    quote: '"The way is in training."',
    author: 'Miyamoto Musashi',
  },
  {
    id: '8',
    image: '/designs/hearts-that-bend.png',
    quote:
      '"Blessed are the hearts that can bend; they shall never be broken."',
    author: 'Camus',
  },
  {
    id: '9',
    image: '/designs/dark-side-of-the-moon.png',
    quote: '“Look for what you notice but no one else sees.”',
    author: 'Rick Rubin',
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
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  // Keep current slide index in sync with Embla
  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrentSlide(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)
    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  return (
    <>
      <section
        aria-labelledby="designs-hero-title"
        className="relative isolate overflow-x-clip pb-16 pt-14 sm:pb-24 sm:pt-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="bg-grid mask-fade-b absolute inset-x-0 top-0 h-[640px] opacity-50" />
          <div className="absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(40%_50%_at_25%_40%,oklch(0.63_0.19_295/16%),transparent_70%),radial-gradient(36%_46%_at_75%_44%,oklch(0.66_0.16_258/16%),transparent_70%)] blur-2xl" />
        </div>
        <div className="prism-container grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div className="space-y-7">
            <Eyebrow>Design at Prism</Eyebrow>
            <h1
              id="designs-hero-title"
              className="text-display text-gradient max-w-[12ch] text-balance pb-2"
            >
              how design works at Prism.
            </h1>
            <figure className="border-l-2 border-white/20 pl-5">
              <blockquote className="text-pretty text-xl leading-snug tracking-[-0.015em] text-foreground sm:text-2xl">
                &ldquo;Design isn&rsquo;t just how something looks, it&rsquo;s
                how it works.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-eyebrow text-subtle">
                Steve Jobs
              </figcaption>
            </figure>
            <div className="max-w-[54ch] space-y-4 text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              <p>
                Design is the backbone of everything we do at Prism. It connects
                every part of your business.
              </p>
              <p>
                From websites and ads to video, analytics, and automation, great
                design shapes how it all works together.
              </p>
              <p>
                We design with purpose, blending beauty, performance, and
                precision to create outcomes that move your brand forward.
              </p>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset,0_40px_120px_-60px_oklch(0_0_0/90%)]">
            <div className="relative flex flex-col gap-6 p-5 sm:p-8">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-popover">
                <Image
                  src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763935789/Generated_Image_November_23_2025_-_2_08PM_fvriub.webp"
                  alt="Design hero preview"
                  fill
                  sizes="(min-width: 1280px) 600px, (min-width: 768px) 520px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="space-y-4">
                <p className="text-eyebrow text-subtle">Connected by design</p>
                <p className="text-pretty text-lg leading-7 text-foreground">
                  Every surface we ship is part of a linked system that keeps
                  your story consistent and measurable.
                </p>
                <ul className="flex flex-wrap gap-2">
                  {CONNECTED_SURFACES.map(({ label, icon: Icon }) => (
                    <li
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-muted-foreground"
                    >
                      <Icon
                        aria-hidden="true"
                        className="size-3.5 text-foreground"
                      />
                      {label}
                    </li>
                  ))}
                </ul>
                <p className="text-sm leading-6 text-subtle">
                  Every element is crafted to move in sync, so your brand feels
                  intentional across channels and devices.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section aria-label="Hear from our founder" className="py-16 sm:py-20">
        <div id="designs-founder-vsl" className="prism-container max-w-3xl">
          <div className="flex justify-center">
            <Eyebrow>Hear from our founder</Eyebrow>
          </div>
          <VideoPlayer
            className="mt-6"
            src="https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1763152551/design-1_ftpmsw.mp4"
            poster="https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0,q_auto/design-1_ftpmsw.jpg"
            title="Founder Enzo Sison on design as the silent multiplier"
            caption="Enzo explains why inconsistent design erodes trust, how Prism builds cohesive systems across every touchpoint, and how sharper visuals lift awareness, conversion, and loyalty without hiring an internal team."
            schema={{
              id: 'https://www.design-prism.com/designs#founder-vsl',
              name: 'Founder Enzo Sison on design as the silent multiplier',
              description:
                'Enzo Sison shares why design is the silent multiplier, how Prism creates cohesive, premium systems across sites, listings, ads, and assets, and how that lifts awareness, conversion, and lifetime value.',
              thumbnailUrl:
                'https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0,q_auto/design-1_ftpmsw.jpg',
              uploadDate: '2025-01-24T00:00:00Z',
              duration: 'PT60S',
              contentUrl:
                'https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1763152551/design-1_ftpmsw.mp4',
              embedUrl: 'https://www.design-prism.com/designs#founder-vsl',
              width: 1920,
              height: 1080,
              creatorName: 'Enzo Sison',
            }}
          />
        </div>
      </section>

      <section aria-labelledby="designs-what-title" className="py-20 sm:py-24">
        <div className="prism-container">
          <Reveal>
            <SectionHeader
              id="designs-what-title"
              eyebrow="What we design"
              title="cohesive visuals that work everywhere."
              description="Great design ties everything together. We build visual systems that keep your brand consistent across every touchpoint."
            />
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DESIGN_DELIVERABLES.map(({ title, desc, icon: Icon }, index) => (
              <Reveal as="li" key={title} delay={index * 60} className="h-full">
                <SpotlightCard className="flex h-full flex-col gap-4 p-6">
                  <span className="grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                    <Icon
                      aria-hidden="true"
                      className="size-[18px] text-foreground"
                    />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-7 text-muted-foreground">
                      {desc}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>

          <p className="mt-8 max-w-[60ch] text-pretty text-[15px] leading-7 text-subtle">
            Each piece is crafted to fit together, so your message looks and
            feels unified everywhere your brand lives.
          </p>

          <Reveal className="mt-12">
            <Link
              href="/designs/wine-country-root-canal"
              className="group/featured block rounded-[2rem] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <div className="prism-beam relative flex flex-col gap-6 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
                <div>
                  <p className="text-eyebrow text-subtle">Featured design</p>
                  <h3 className="text-heading mt-3 text-foreground">
                    Wine Country Root Canal
                  </h3>
                  <p className="mt-2 max-w-[52ch] text-[15px] leading-7 text-muted-foreground">
                    See the full design review and deliverables for this
                    endodontic brand refresh.
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground">
                  View the design review
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover/featured:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section aria-label="Design quotes" className="py-16 sm:py-20">
        <div className="prism-container">
          <div className="relative mx-auto w-full max-w-3xl">
            <Carousel
              setApi={setApi}
              opts={{
                loop: true,
                align: 'center',
                containScroll: 'trimSnaps',
              }}
              className="[&_*]:select-none"
            >
              <CarouselContent>
                {shuffledSlides.map((slide) => (
                  <CarouselItem key={slide.id}>
                    <div
                      className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-card"
                      style={{ touchAction: 'pan-x' }}
                    >
                      <Image
                        src={slide.image}
                        alt={`Design slide: ${slide.quote}`}
                        fill
                        sizes="(min-width: 768px) 768px, 100vw"
                        className="pointer-events-none object-contain"
                        draggable="false"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {!isMobile && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>

            <div className="mx-auto mt-8 max-w-xl text-center">
              <p className="text-pretty text-xl leading-snug tracking-[-0.015em] text-foreground md:text-2xl">
                {shuffledSlides[currentSlide].quote}
              </p>
              <p className="mt-3 text-eyebrow text-subtle">
                {shuffledSlides[currentSlide].author}
              </p>
            </div>

            <div className="mt-6 flex justify-center gap-1">
              {shuffledSlides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setCurrentSlide(index)
                    api?.scrollTo(index)
                  }}
                  className="group/dot grid size-6 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentSlide === index ? 'true' : undefined}
                >
                  <span
                    className={`block h-1.5 rounded-full transition-[width,background-color] duration-200 ${
                      currentSlide === index
                        ? 'w-5 bg-foreground'
                        : 'w-1.5 bg-white/25 group-hover/dot:bg-white/50'
                    }`}
                  />
                </button>
              ))}
            </div>

            {isMobile && (
              <div className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-subtle">
                <ChevronLeft aria-hidden="true" className="size-4" />
                <p>Swipe to navigate</p>
                <ChevronRight aria-hidden="true" className="size-4" />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
