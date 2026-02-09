"use client"

import Link from "next/link"

import PixelishIcon from "@/components/pixelish/PixelishIcon"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { trackCTAClick } from "@/utils/analytics"

export default function AISEOBoostPage() {
  const CONTACT_CTA_TEXT = "email or text us for next steps"

  const services = [
    {
      iconSrc: "/pixelish/lens.svg",
      title: "ai audit",
      description: "find where bots ignore you",
      detail: "discover exactly how chatgpt, gemini & perplexity currently see your brand",
    },
    {
      iconSrc: "/pixelish/arrow-refresh.svg",
      title: "optimization",
      description: "make them recommend you",
      detail: "strategic content & citation optimization for ai search engines",
    },
    {
      iconSrc: "/pixelish/graph-chart-high.svg",
      title: "results",
      description: "2× ai traffic in 90 days",
      detail: "guaranteed increase in ai-generated referrals or we work for free",
    },
  ]

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Dental practice owner",
      content:
        "chatgpt now recommends our practice first when people ask about dentists in our area. we've seen a 300% increase in ai-driven inquiries.",
      rating: 5,
      location: "San Francisco, CA",
    },
    {
      name: "Marcus Rodriguez",
      role: "Tech startup founder",
      content:
        "perplexity mentions our saas tool in 8 out of 10 relevant searches. this has completely transformed our organic acquisition.",
      rating: 5,
      location: "Austin, TX",
    },
    {
      name: "Jennifer Walsh",
      role: "E-commerce owner",
      content:
        "google's ai overview now features our products prominently. our click-through rates from ai search have tripled.",
      rating: 5,
      location: "New York, NY",
    },
  ]

  const problemPoints = [
    {
      iconSrc: "/pixelish/robot.svg",
      title: "ai bots ignore your brand",
      description: "chatgpt, gemini, and perplexity recommend your competitors instead of you",
    },
    {
      iconSrc: "/pixelish/graph-chart-high.svg",
      title: "missing the ai traffic wave",
      description: "more and more searches go through ai, and you're not getting any of it",
    },
    {
      iconSrc: "/pixelish/users.svg",
      title: "your customers ask ai first",
      description: "they trust ai recommendations more than traditional search results",
    },
  ]

  const resultMetrics = [
    { metric: "2-5x", description: "increase in ai-driven traffic" },
    { metric: "90 days", description: "timeline to see results" },
    { metric: "100%", description: "money-back guarantee" },
    { metric: "24/7", description: "ai bots working for you" },
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-foreground">
        {/* Hero */}
        <section className="container mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-16 text-center">
          <div className="mx-auto mb-6 flex items-center justify-center">
            <PixelishIcon src="/pixelish/lens.svg" alt="" size={120} aria-hidden className="opacity-95" />
          </div>
          <p className="text-[10px] font-semibold !uppercase font-pixel tracking-[0.32em] text-muted-foreground">
            offer
          </p>
          <h1 className="mt-4 text-4xl font-pixel tracking-[0.04em] leading-tight lowercase sm:text-5xl md:text-6xl">
            ai seo boost™
          </h1>
          <p className="mt-6 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed sm:text-lg">
            make chatgpt, gemini & perplexity name-drop your brand first. get recommended by ai bots 24/7.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="inverted">
              <Link href="/contact" onClick={() => trackCTAClick(CONTACT_CTA_TEXT, "ai-seo-boost hero")}>
                <PixelishIcon src="/pixelish/mail.svg" alt="" size={16} aria-hidden className="opacity-90" />
                {CONTACT_CTA_TEXT}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/ai-seo-services">learn more</Link>
            </Button>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            90-day results guarantee • no long-term contracts
          </p>
        </section>

        {/* Dream Outcome */}
        <section className="py-14 border-t border-border/60">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-pixel tracking-[0.04em] lowercase sm:text-4xl">
                imagine this: ai bots recommend you first
              </h2>
              <p className="mt-5 text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed sm:text-lg">
                every time someone asks chatgpt, gemini, or perplexity about your industry, your brand gets mentioned
                first. it's like having the world's best referral system working 24/7.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {resultMetrics.map((result) => (
                <div key={result.metric} className="text-center">
                  <div className="text-2xl font-pixel tracking-[0.08em]">{result.metric}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{result.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Most Sites Miss the AI Wave */}
        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-pixel tracking-[0.04em] lowercase sm:text-4xl">
                why most sites miss the ai wave
              </h2>
              <p className="mt-5 text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed sm:text-lg">
                ai engines are changing how people find and choose businesses. if you're not optimized for ai, you're
                invisible when buyers are ready.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {problemPoints.map((problem) => (
                <Card key={problem.title} className="bg-card/40">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex items-center justify-center">
                      <PixelishIcon src={problem.iconSrc} alt="" size={48} aria-hidden className="opacity-90" />
                    </div>
                    <CardTitle className="text-lg">{problem.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription>{problem.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-14 border-t border-border/60">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-pixel tracking-[0.04em] lowercase sm:text-4xl">what you get</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {services.map((service) => (
                <Card key={service.title} className="text-center bg-card/40">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex items-center justify-center">
                      <PixelishIcon src={service.iconSrc} alt="" size={48} aria-hidden className="opacity-90" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="text-sm font-semibold !uppercase font-pixel tracking-[0.18em] text-foreground">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="py-14 border-t border-border/60">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-pixel tracking-[0.04em] lowercase sm:text-4xl">what our clients say</h2>
              <p className="mt-5 text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed sm:text-lg">
                real results from real businesses using ai seo optimization.
              </p>
            </div>

            <Carousel className="max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.name}>
                    <Card className="text-center bg-card/40">
                      <CardHeader>
                        <div className="flex justify-center gap-1 mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <PixelishIcon
                              key={`${testimonial.name}-star-${i}`}
                              src="/pixelish/award.svg"
                              alt=""
                              size={14}
                              aria-hidden
                              className="opacity-90"
                            />
                          ))}
                        </div>
                        <CardDescription className="text-base italic leading-relaxed mb-6 text-foreground">
                          &quot;{testimonial.content}&quot;
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        <div className="text-xs text-muted-foreground/80">{testimonial.location}</div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* Scarcity & CTA */}
        <section className="py-14 border-t border-border/60">
          <div className="container mx-auto px-4 text-center">
            <Badge
              variant="outline"
              className="mx-auto mb-6 inline-flex items-center gap-2 border-border/60 bg-background/40 text-muted-foreground"
            >
              <PixelishIcon src="/pixelish/device-clock.svg" alt="" size={12} aria-hidden className="opacity-85" />
              limited availability
            </Badge>
            <h2 className="text-3xl font-pixel tracking-[0.04em] lowercase sm:text-4xl">
              only 10 spots available this month
            </h2>
            <p className="mt-5 text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed sm:text-lg">
              we limit our ai optimization clients to ensure quality results. don't let your competitors get recommended
              by ai bots while you wait.
            </p>
            <div className="mt-10 space-y-4">
              <Button asChild size="lg" variant="inverted">
                <Link href="/contact" onClick={() => trackCTAClick(CONTACT_CTA_TEXT, "ai-seo-boost scarcity")}>
                  <PixelishIcon src="/pixelish/award-plus.svg" alt="" size={16} aria-hidden className="opacity-90" />
                  {CONTACT_CTA_TEXT}
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground">90-day money-back guarantee • results within 30-60 days</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-14">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-pixel tracking-[0.04em] lowercase sm:text-4xl">
              ready to dominate ai search?
            </h2>
            <p className="mt-5 text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed sm:text-lg">
              email or text our team and we'll respond within one business day with a tailored next step, no obligation.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" variant="inverted">
                <Link href="/contact" onClick={() => trackCTAClick(CONTACT_CTA_TEXT, "ai-seo-boost final cta")}>
                  <PixelishIcon src="/pixelish/mail.svg" alt="" size={16} aria-hidden className="opacity-90" />
                  {CONTACT_CTA_TEXT}
                </Link>
              </Button>
              <p className="mt-4 text-[11px] text-muted-foreground italic">
                free consultation to assess your ai visibility and create a custom strategy.
              </p>
            </div>
          </div>
        </section>

        {/* Back to Offers */}
        <section className="py-10 border-t border-border/60">
          <div className="container mx-auto px-4 text-center">
            <Link href="/offers" className="text-xs font-pixel tracking-[0.22em] !uppercase text-muted-foreground hover:text-foreground transition-colors">
              back to offers
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
