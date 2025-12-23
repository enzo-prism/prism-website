"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { useMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { quotesData, renderFormattedText } from "@/content/wall-of-love-data"

const MAX_QUOTES = 12

const buildQuotePool = () => {
  const safeQuotes = quotesData.filter((quote) => !quote.requiresConsent)
  const spotlight = safeQuotes.filter((quote) => quote.heroSpotlight)
  const pinned = safeQuotes.filter((quote) => quote.pinned && !quote.heroSpotlight)
  const remaining = safeQuotes.filter((quote) => !quote.heroSpotlight && !quote.pinned)
  return [...spotlight, ...pinned, ...remaining].slice(0, MAX_QUOTES)
}

const QUOTE_POOL = buildQuotePool()

type WallOfLoveCarouselProps = {
  showCta?: boolean
  showEyebrow?: boolean
  enableMobileArrows?: boolean
  disableSwipeOnMobile?: boolean
}

export default function WallOfLoveCarousel({
  showCta = true,
  showEyebrow = true,
  enableMobileArrows = false,
  disableSwipeOnMobile = false,
}: WallOfLoveCarouselProps) {
  const isMobile = useMobile()
  const isSwipeDisabled = disableSwipeOnMobile && isMobile

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-muted/30">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-muted/50 via-transparent to-transparent" />
      <div className="container relative flex flex-col mx-auto gap-10 px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          {showEyebrow ? (
            <Badge variant="secondary" className="w-fit">
              Wall of Love
            </Badge>
          ) : null}
          <div className="space-y-3">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Founders are already seeing the difference
            </h2>
            <p className="text-balance text-base text-muted-foreground">
              A few notes from the people we have helped build, refine, and scale their online presence.
            </p>
          </div>
          {showCta ? (
            <Button
              asChild
              variant="outline"
              className="rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            >
              <Link href="/wall-of-love">
                View the Wall of Love
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          ) : null}
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              containScroll: "trimSnaps",
              dragFree: !isSwipeDisabled,
              draggable: !isSwipeDisabled,
              loop: false,
            }}
            className="touch-pan-y"
          >
            <CarouselContent className="select-none pr-4 hardware-accelerated">
              {QUOTE_POOL.map((quote) => (
                <CarouselItem
                  key={quote.id}
                  className="basis-full pl-4 sm:basis-[70%] md:basis-[50%] lg:basis-[33%]"
                >
                  <Card className="flex h-full flex-col border-border/60 bg-card/90 shadow-sm">
                    <CardHeader className="space-y-3">
                      <Badge
                        variant="outline"
                        className="w-fit max-w-full truncate"
                        title={quote.company}
                      >
                        {quote.company}
                      </Badge>
                      <p className="text-sm font-semibold text-foreground">
                        "{renderFormattedText(quote.text)}"
                      </p>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <p className="text-sm font-semibold text-foreground">{quote.client}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {enableMobileArrows && isMobile ? (
              <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
                <CarouselPrevious className="static h-10 w-10 translate-y-0" />
                <CarouselNext className="static h-10 w-10 translate-y-0" />
              </div>
            ) : null}
            <CarouselPrevious className="-left-4 hidden sm:flex" />
            <CarouselNext className="-right-4 hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
