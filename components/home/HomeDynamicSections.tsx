"use client"

import dynamic from "next/dynamic"

type SearchConsoleSlide = {
  src: string
  alt: string
  width: number
  height: number
}

type FAQBlock =
  | { type: "paragraph"; content: string }
  | { type: "list"; items: string[] }

type FAQItem = {
  question: string
  answer: FAQBlock[]
}

type HeroSceneProps = {
  className?: string
}

type SearchConsoleRailProps = {
  slides: SearchConsoleSlide[]
  iconSrc: string
}

type FAQSectionProps = {
  faqItems: FAQItem[]
}

type WallOfLoveCarouselProps = {
  enableMobileArrows?: boolean
}

const SECTION_SPACING =
  "min-h-screen min-h-[100svh] py-24 sm:py-32 lg:py-40 xl:py-48"

const DynamicUnicornHeroScene = dynamic(() => import("@/components/home/UnicornHeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(0,0,0,0.12),transparent_60%),radial-gradient(60%_60%_at_20%_80%,rgba(0,0,0,0.08),transparent_65%)]" />
  ),
})

const DynamicSearchConsoleSnapshotsRail = dynamic(
  () => import("@/components/home/SearchConsoleSnapshotsRail"),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-3xl border border-border/60 bg-card/90 p-4 sm:p-5">
        <div className="h-8 w-52 rounded-full border border-border/50 bg-background/80" />
      </div>
    ),
  },
)

const DynamicWallOfLoveCarousel = dynamic(() => import("@/components/home/WallOfLoveCarousel"), {
  ssr: false,
  loading: () => <div className="min-h-screen min-h-[100svh] bg-muted/30" />,
})

const DynamicHomeFAQSection = dynamic(() => import("@/components/home/home-faq-section"), {
  ssr: false,
  loading: () => (
    <section className={`${SECTION_SPACING} bg-background`}>
      <div className="container mx-auto space-y-3 px-4 sm:px-6">
        <div className="space-y-3 text-center">
          <div className="h-5 w-16 rounded-full border border-border/60 bg-muted/30" />
          <div className="mx-auto h-10 w-72 rounded-full border border-border/60 bg-muted/30" />
        </div>
        <div className="h-80 rounded-lg border border-border/60 bg-card/90" />
      </div>
    </section>
  ),
})

const DynamicScalingRoadmapForm = dynamic(
  () => import("@/components/forms/ScalingRoadmapForm"),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="h-12 rounded-full bg-muted/40" />
        <div className="h-12 w-full rounded-full bg-muted/40 sm:w-28" />
      </div>
    ),
  },
)

export function HomeHeroScene({ className }: HeroSceneProps) {
  return <DynamicUnicornHeroScene className={className} />
}

export function HomeSearchConsoleRail({ slides, iconSrc }: SearchConsoleRailProps) {
  return <DynamicSearchConsoleSnapshotsRail slides={slides} iconSrc={iconSrc} />
}

export function HomeFAQSection({ faqItems }: FAQSectionProps) {
  return <DynamicHomeFAQSection faqItems={faqItems} />
}

export function HomeScalingRoadmapForm() {
  return <DynamicScalingRoadmapForm />
}

export function HomeWallOfLoveCarousel({ enableMobileArrows }: WallOfLoveCarouselProps = {}) {
  return <DynamicWallOfLoveCarousel enableMobileArrows={enableMobileArrows} />
}
