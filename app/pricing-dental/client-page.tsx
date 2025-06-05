"use client"

import { useState } from "react"
import { Star, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import CoreImage from "@/components/core-image"
import Link from "next/link"
import { trackNavigation } from "@/utils/analytics"
import { Globe, Calendar, Search, Target, Brain } from "lucide-react"

export default function PricingDentalClient() {
  const [isAnnual, setIsAnnual] = useState(false)

  const handlePricingToggle = () => {
    setIsAnnual(!isAnnual)
  }

  const handleGetStarted = (tier: string) => {
    trackNavigation(`pricing_dental_${tier}_${isAnnual ? "annual" : "monthly"}`, "/get-started")
  }

  // Define feature items with optional subtext
  const starterFeatures = [
    { text: "beautiful website that outshines competitors" },
    { text: "mobile streamlined online scheduling" },
    { text: "more 5-star reviews" },
    { text: "more leads from google search" },
    { text: "more leads from ads" },
    {
      text: "more leads from ai search",
      subtext: "chatgpt, gemini, perplexity, claude, etc.",
    },
  ]

  const proFeatures = [
    { text: "beautiful website that outshines competitors" },
    { text: "mobile streamlined online scheduling" },
    { text: "more 5-star reviews" },
    { text: "more leads from google search" },
    { text: "more leads from ads" },
    {
      text: "more leads from ai search",
      subtext: "chatgpt, gemini, perplexity, claude, etc.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-5xl">pricing for dental practices</h1>
        <p className="mb-6 md:mb-8 text-base md:text-xl text-muted-foreground">
          transparent pricing designed to grow your practice and deliver measurable results.
        </p>

        <div className="mb-8 md:mb-12 flex flex-wrap items-center justify-center space-x-2">
          <Label htmlFor="billing-toggle" className="text-sm font-medium">
            monthly
          </Label>
          <Switch
            id="billing-toggle"
            checked={isAnnual}
            onCheckedChange={handlePricingToggle}
            aria-label="Toggle annual billing"
            className="mx-2 data-[state=checked]:bg-primary"
          />
          <Label htmlFor="billing-toggle" className="flex items-center space-x-2 text-sm font-medium">
            <span>annual</span>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              save
            </Badge>
          </Label>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Starter Plan */}
          <Card className="flex flex-col border-2 border-neutral-200 transition-all hover:border-neutral-300">
            <CardHeader className="pb-4 pt-5 md:pb-6 md:pt-6">
              <CardTitle className="text-xl md:text-2xl">starter</CardTitle>
              <div className="mt-3 md:mt-4 flex items-baseline justify-center">
                <span className="text-3xl md:text-4xl font-bold">${isAnnual ? "11,000" : "1,000"}</span>
                <span className="ml-1 text-muted-foreground">/{isAnnual ? "yr" : "mo"}</span>
                {isAnnual && (
                  <div className="ml-3 inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    <BadgeCheck className="mr-1 h-3 w-3" />
                    save $1,000
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow px-4 md:px-6 pb-0">
              <p className="mb-3 md:mb-4 text-sm md:text-base font-medium text-left">get our playbooks to build:</p>

              <ul className="space-y-2.5 md:space-y-3 text-sm md:text-base mb-6">
                {starterFeatures.map((feature, i) => {
                  const getIcon = (index: number) => {
                    const icons = [Globe, Calendar, Star, Search, Target, Brain]
                    const Icon = icons[index]
                    return <Icon className="h-4 w-4 text-neutral-600" />
                  }

                  return (
                    <li key={i} className="flex items-start text-left">
                      <span className="mr-3 shrink-0 mt-1">{getIcon(i)}</span>
                      <div className="flex-1">
                        <span>{feature.text}</span>
                        {feature.subtext && (
                          <div className="text-xs md:text-sm text-muted-foreground mt-0.5">{feature.subtext}</div>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className="border-t pt-4 pb-2 text-center">
                <p className="font-medium">
                  <span className="font-bold">best for:</span> owners with time to implement
                </p>
              </div>
            </CardContent>
            <CardFooter className="pb-6 pt-4">
              <Button asChild className="w-full" onClick={() => handleGetStarted("starter")}>
                {!isAnnual ? (
                  <Link
                    href="https://buy.stripe.com/aFa00k0o68L08kE0ZNdZ60y"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-rewardful
                    prefetch={false}
                  >
                    get started
                  </Link>
                ) : (
                  <Link
                    href="https://buy.stripe.com/3cI9AU1sa9P47gAdMzdZ60A"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-rewardful
                    prefetch={false}
                  >
                    get started
                  </Link>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="relative flex flex-col border-2 border-primary shadow-lg">
            <div className="absolute -right-1 -top-1 rounded-full bg-primary px-2 py-0.5 md:px-3 md:py-1 text-xs font-medium text-white">
              recommended
            </div>
            <CardHeader className="pb-4 pt-5 md:pb-6 md:pt-6">
              <CardTitle className="text-xl md:text-2xl">pro</CardTitle>
              <div className="mt-3 md:mt-4 flex items-baseline justify-center">
                <span className="text-3xl md:text-4xl font-bold">${isAnnual ? "32,000" : "3,000"}</span>
                <span className="ml-1 text-muted-foreground">/{isAnnual ? "yr" : "mo"}</span>
                {isAnnual && (
                  <div className="ml-3 inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    <BadgeCheck className="mr-1 h-3 w-3" />
                    save $4,000
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow px-4 md:px-6 pb-0">
              <div className="border-t border-b py-3 mb-4 font-medium text-center">
                <span className="font-bold">+75 new patients in 90 days</span>
              </div>

              <p className="mb-3 md:mb-4 text-sm md:text-base font-medium text-left">
                we build the best for you. sit back and relax 🏝️
              </p>

              <ul className="space-y-2.5 md:space-y-3 text-sm md:text-base mb-6">
                {proFeatures.map((feature, i) => {
                  const getIcon = (index: number) => {
                    const icons = [Globe, Calendar, Star, Search, Target, Brain]
                    const Icon = icons[index]
                    return <Icon className="h-4 w-4 text-neutral-600" />
                  }

                  return (
                    <li key={i} className="flex items-start text-left">
                      <span className="mr-3 shrink-0 mt-1">{getIcon(i)}</span>
                      <div className="flex-1">
                        <span>{feature.text}</span>
                        {feature.subtext && (
                          <div className="text-xs md:text-sm text-muted-foreground mt-0.5">{feature.subtext}</div>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className="border-t pt-4 pb-2 text-center">
                <p className="font-medium">
                  <span className="font-bold">best for:</span> busy practices that want speed
                </p>
              </div>
            </CardContent>
            <CardFooter className="pb-6 pt-4">
              <Button asChild className="w-full" onClick={() => handleGetStarted("pro")}>
                {!isAnnual ? (
                  <Link
                    href="https://buy.stripe.com/aFa6oI2webXc58seQDdZ60x"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-rewardful
                    prefetch={false}
                  >
                    get started
                  </Link>
                ) : (
                  <Link
                    href="https://buy.stripe.com/4gM14o0o6bXc8kEaAndZ60z"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-rewardful
                    prefetch={false}
                  >
                    get started
                  </Link>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Results Section */}
      <div className="mx-auto mt-16 md:mt-24 max-w-4xl">
        <h2 className="mb-8 md:mb-12 text-center text-2xl md:text-3xl font-bold">trusted by dental practices</h2>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-lg border bg-white p-4 md:p-6 shadow-sm">
            <div className="mb-3 md:mb-4 flex items-center">
              <div className="relative mr-3 md:mr-4 h-12 w-12 md:h-16 md:w-16 overflow-hidden rounded-full">
                <CoreImage
                  src="/dr-gerard-banaga-headshot.png"
                  alt="dr. gerard banaga"
                  width={64}
                  height={64}
                  className="object-cover"
                  trackingId="pricing_testimonial_1"
                />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold">dr. gerard banaga</h3>
                <p className="text-xs md:text-sm text-muted-foreground">town centre dental</p>
              </div>
            </div>
            <div className="mb-3 flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground">
              "since partnering with prism, we've seen a 40% increase in new patient appointments. their website
              redesign and digital marketing strategy completely transformed our online presence."
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border bg-white p-4 md:p-6 shadow-sm">
            <div className="mb-3 md:mb-4 flex items-center">
              <div className="relative mr-3 md:mr-4 h-12 w-12 md:h-16 md:w-16 overflow-hidden rounded-full">
                <CoreImage
                  src="/dr-christopher-wong.png"
                  alt="dr. christopher wong"
                  width={64}
                  height={64}
                  className="object-cover"
                  trackingId="pricing_testimonial_2"
                />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold">dr. christopher wong</h3>
                <p className="text-xs md:text-sm text-muted-foreground">exquisite dentistry</p>
              </div>
            </div>
            <div className="mb-3 flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground">
              "the pro plan delivered exactly as promised. within 45 days, we were seeing 15+ new patients per month
              directly from our website. the roi has been exceptional."
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mx-auto mt-16 md:mt-24 max-w-3xl">
        <h2 className="mb-6 md:mb-8 text-center text-2xl md:text-3xl font-bold">frequently asked questions</h2>

        <div className="space-y-4 md:space-y-6">
          {[
            {
              question: "what's included in the website redesign?",
              answer:
                "our website redesign includes custom design, mobile optimization, online scheduling integration, seo optimization, and content creation specifically tailored for dental practices.",
            },
            {
              question: "how long until i see results?",
              answer:
                "starter plan clients typically see results within 90 days, while pro plan clients often see significant improvements within 30-60 days. results vary based on your location, competition, and current online presence.",
            },
            {
              question: "do i need to sign a long-term contract?",
              answer:
                "no. our monthly plans are month-to-month with no long-term commitment required. annual plans offer savings but are not mandatory.",
            },
            {
              question: "what makes prism different from other dental marketing agencies?",
              answer:
                "we specialize exclusively in dental practices and have a proven track record of results. our approach combines beautiful design with data-driven marketing strategies specifically optimized for patient acquisition.",
            },
            {
              question: "can i upgrade from starter to pro later?",
              answer:
                "you can upgrade at any time. many practices start with our starter plan and upgrade to pro once they see the initial results.",
            },
          ].map((faq, i) => (
            <div key={i} className="rounded-lg border bg-white p-4 md:p-6">
              <h3 className="mb-1.5 md:mb-2 text-base md:text-lg font-medium">{faq.question}</h3>
              <p className="text-sm md:text-base text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto mt-16 md:mt-24 max-w-3xl rounded-xl bg-primary/5 p-6 md:p-8 text-center">
        <h2 className="mb-3 md:mb-4 text-xl md:text-2xl font-bold">ready to grow your dental practice?</h2>
        <p className="mb-5 md:mb-6 text-base md:text-lg">
          schedule a free consultation to discuss your practice's specific needs and goals.
        </p>
        <Button
          asChild
          size="lg"
          className="w-full md:w-auto px-8 py-6 text-base"
          onClick={() => trackNavigation("pricing_dental_bottom_cta", "/get-started")}
        >
          <Link href="/get-started">get started today</Link>
        </Button>
      </div>
    </div>
  )
}
