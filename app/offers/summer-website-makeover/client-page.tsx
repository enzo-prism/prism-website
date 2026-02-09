"use client"

import Link from "next/link"

import PixelishIcon from "@/components/pixelish/PixelishIcon"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useMobile } from "@/hooks/use-mobile"

const CONTACT_CTA_TEXT = "email or text us for next steps"

const carouselTestimonialsData = [
  {
    quote: "The site’s new design is better than I ever could’ve imagined.",
    name: "Ludmila",
    business: "Mataria Dental Group (Torrance, CA)",
  },
  {
    quote: "We spent a ton on marketing before and never saw good results. We love working with Prism.",
    name: "Michael",
    business: "Exquisite Dentistry (Beverly Hills, CA)",
  },
  {
    quote: "I love it!! Thank you for helping bring my vision to life.",
    name: "Clare",
    business: "We Are Saplings",
  },
  {
    quote: "New customers keep mentioning how beautiful our website is!! Thank you!",
    name: "Renata",
    business: "Coast Periodontics (San Luis Obispo, CA)",
  },
]

const faqItems = [
  {
    question: "How fast can we start?",
    answer: "Kickoff survey + fit call can happen this week. Day 1 starts right after the call.",
  },
  {
    question: "What if I don’t have much traffic yet?",
    answer:
      "We use industry benchmarks to set the 3× target or extend the guarantee period — your upside stays protected.",
  },
  {
    question: "Will I own the site?",
    answer: "Yes. 100 % ownership: domain, code, content, and assets.",
  },
  {
    question: "What platforms do you build on?",
    answer: "Webflow or Vercel (custom React/Next) — chosen to match your growth goals.",
  },
]

function FeatureListItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <PixelishIcon src="/pixelish/checkmark.svg" alt="" size={16} aria-hidden className="mt-[2px] opacity-90" />
      <span className="text-sm text-muted-foreground leading-relaxed">{text}</span>
    </li>
  )
}

export default function SummerWebsiteMakeoverClientPage() {
  const isMobile = useMobile()

  const features = [
    {
      iconSrc: "/pixelish/device-monitor.svg",
      title: "full-stack site rebuild",
      items: [
        "lightning-fast pages (90+ pagespeed)",
        "mobile-first, accessibility-friendly design",
        "crystal-clear copy written for humans + search engines",
      ],
    },
    {
      iconSrc: "/pixelish/graph-chart-high.svg",
      title: "traffic multiplier engine",
      items: [
        "on-page seo, schema, and technical health fixes",
        "google business profile sync (where applicable)",
        "launch-ready blog template + 3 custom content briefs",
      ],
    },
    {
      iconSrc: "/pixelish/award.svg",
      title: "conversion booster suite",
      items: ["a/b-tested hero headline + cta", "streamlined inquiry / checkout flow", "live chat widget installed"],
    },
    {
      iconSrc: "/pixelish/bar-chart-average.svg",
      title: "real-time prism dashboard",
      items: ["track visitors, leads, and sales 24/7", "compare pre- vs. post-launch kpis at a glance"],
    },
  ]

  return (
    <div className="bg-background text-foreground">
      <Navbar />
      {isMobile && <ScrollProgressBar />}

      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 pt-16 pb-14 md:pt-24 md:pb-18 text-center">
          <div className="mx-auto mb-6 flex items-center justify-center">
            <PixelishIcon src="/pixelish/browser.svg" alt="" size={120} aria-hidden className="opacity-95" />
          </div>
          <p className="text-[10px] font-semibold !uppercase font-pixel tracking-[0.32em] text-muted-foreground">
            offer
          </p>
          <h1 className="mt-4 text-4xl font-pixel tracking-[0.04em] lowercase leading-tight sm:text-5xl md:text-6xl">
            summer website makeover
          </h1>
          <p className="mt-6 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed sm:text-lg">
            triple your traffic & conversions in 30 days, guaranteed.
          </p>
          <p className="mt-6 text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            your site shouldn’t feel like a ghost town. let prism turn it into a 24/7 growth engine while you stay
            focused on running your business.
          </p>

          <div className="mt-10">
            <Button asChild size="lg" variant="inverted">
              <Link href="/contact">
                <PixelishIcon src="/pixelish/mail.svg" alt="" size={16} aria-hidden className="opacity-90" />
                {CONTACT_CTA_TEXT}
              </Link>
            </Button>
          </div>
        </section>

        {/* Exactly What You Get */}
        <section className="py-14 border-t border-border/60">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-pixel tracking-[0.04em] lowercase text-center sm:text-4xl">exactly what you get</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {features.map((feature) => (
                <div key={feature.title}>
                  <div className="flex items-center gap-3 mb-5">
                    <PixelishIcon src={feature.iconSrc} alt="" size={22} aria-hidden className="opacity-90" />
                    <h3 className="text-xl font-pixel tracking-[0.06em] lowercase">{feature.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {feature.items.map((item) => (
                      <FeatureListItem key={item} text={item} />
                    ))}
                  </ul>
                </div>
              ))}

              <div className="md:col-span-2 lg:col-span-1">
                <Card className="bg-card/40 border-border/70 shadow-none h-full">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <PixelishIcon src="/pixelish/calendar.svg" alt="" size={22} aria-hidden className="opacity-90" />
                      <h3 className="text-xl font-pixel tracking-[0.06em] lowercase">bonus “summer sizzle” assets</h3>
                    </div>
                    <p className="text-[11px] text-muted-foreground mb-5">(available until july 31)</p>
                    <ul className="space-y-3">
                      <FeatureListItem text="five social posts announcing your makeover" />
                      <FeatureListItem text="branded email blast template to past customers/subscribers" />
                      <FeatureListItem text="one-hour growth-roadmap call with enzo (recorded)" />
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 30-Day 3× Growth Guarantee */}
        <section className="py-14 border-t border-border/60">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto mb-6 flex items-center justify-center">
              <PixelishIcon src="/pixelish/emoji-rocket.svg" alt="" size={72} aria-hidden className="opacity-95" />
            </div>
            <h2 className="text-3xl font-pixel tracking-[0.04em] lowercase sm:text-4xl">30-day 3× growth guarantee</h2>
            <p className="mt-5 text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed sm:text-lg">
              if we don’t hit 300% of your current traffic or conversions within 30 days of launch, we keep optimizing
              free until we do, or refund you. no fine print.
            </p>
          </div>
        </section>

        {/* What Our Clients Say */}
        <section className="py-14 border-t border-border/60">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-pixel tracking-[0.04em] lowercase sm:text-4xl">what our clients say</h2>
              <p className="mt-5 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed sm:text-lg">
                real feedback from businesses we've helped thrive.
              </p>
            </div>

            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto"
            >
              <CarouselContent>
                {carouselTestimonialsData.map((testimonial) => (
                  <CarouselItem key={testimonial.name} className="sm:basis-1/2 lg:basis-1/3">
                    <div className="p-2 h-full">
                      <Card className="h-full flex flex-col bg-card/40 border-border/70 shadow-none hover:border-border transition-colors">
                        <CardContent className="flex flex-col flex-grow items-start justify-between p-6 space-y-4">
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
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
                          <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                            &quot;{testimonial.quote}&quot;
                          </p>
                          <div>
                            <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                            <p className="text-xs text-muted-foreground">{testimonial.business}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </section>

        {/* Investment & Availability */}
        <section className="py-14 border-t border-border/60">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-pixel tracking-[0.04em] lowercase sm:text-4xl mb-6">
              investment & availability
            </h2>
            <p className="text-4xl font-pixel tracking-[0.08em] mb-2">$4,800 all-inclusive</p>
            <p className="text-sm text-muted-foreground mb-8">(or 2 × $2,500)</p>

            <div className="border border-border/60 bg-background/40 p-6 rounded-lg max-w-md mx-auto mb-10">
              <p className="font-pixel tracking-[0.12em] !uppercase text-xs text-foreground">limited slots</p>
              <p className="mt-3 text-sm text-muted-foreground">only 7 summer makeover slots left. next intake opens in october.</p>
            </div>

            <Button asChild size="lg" variant="inverted">
              <Link href="/contact">
                <PixelishIcon src="/pixelish/mail.svg" alt="" size={16} aria-hidden className="opacity-90" />
                {CONTACT_CTA_TEXT}
              </Link>
            </Button>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 border-t border-border/60">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-10">
              <PixelishIcon src="/pixelish/circle-question.svg" alt="" size={22} aria-hidden className="opacity-90" />
              <h2 className="text-3xl font-pixel tracking-[0.04em] lowercase sm:text-4xl">faq</h2>
            </div>

            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              {faqItems.map((item) => (
                <AccordionItem key={item.question} value={item.question} className="border-b border-border/60">
                  <AccordionTrigger className="text-left text-sm font-pixel tracking-[0.08em] !uppercase py-6 hover:no-underline text-foreground hover:text-muted-foreground transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-6 text-sm text-muted-foreground">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-14 border-t border-border/60">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-pixel tracking-[0.04em] lowercase sm:text-4xl max-w-2xl mx-auto">
              ready to turn your website into a sales machine?
            </h2>
            <p className="mt-5 text-base text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed sm:text-lg">
              email or text us to lock in your summer website makeover before the last slots disappear.
            </p>
            <Button asChild size="lg" variant="inverted" className="mb-14">
              <Link href="/contact">
                <PixelishIcon src="/pixelish/mail.svg" alt="" size={16} aria-hidden className="opacity-90" />
                {CONTACT_CTA_TEXT}
              </Link>
            </Button>

            <div className="border-t border-border/60 pt-10 max-w-xl mx-auto">
              <p className="text-[11px] font-pixel tracking-[0.18em] !uppercase text-muted-foreground mb-6">
                need a quick answer first?
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <a
                  href="https://www.instagram.com/the_design_prism/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-pixel tracking-[0.18em] !uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  <PixelishIcon src="/pixelish/socials-instagram.svg" alt="" size={16} aria-hidden className="opacity-90" />
                  dm @the_design_prism
                </a>
                <a
                  href="mailto:support@design-prism.com"
                  className="flex items-center gap-2 text-xs font-pixel tracking-[0.18em] !uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  <PixelishIcon src="/pixelish/mail.svg" alt="" size={16} aria-hidden className="opacity-90" />
                  support@design-prism.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
