"use client"

import { useState, useEffect } from "react"
import { Star, BadgeCheck, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CoreImage from "@/components/core-image"
import Link from "next/link"
import { trackNavigation } from "@/utils/analytics"
import { cn } from "@/lib/utils"

export default function PricingClient() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePricingToggle = () => {
    setIsAnnual(!isAnnual)
  }

  const handleGetStarted = (tier: string) => {
    trackNavigation(`pricing_${tier}_${isAnnual ? "annual" : "monthly"}`, "/get-started")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[60%] -right-[5%] w-[30%] h-[40%] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            pricing for business owners
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-xl text-muted-foreground">
            transparent pricing designed to grow your business and deliver measurable results.
          </p>
        </div>

        {/* Pricing toggle */}
        <div className="relative mx-auto max-w-md mb-12 md:mb-16">
          <div className="flex items-center justify-center p-1 rounded-full bg-gray-100">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                "relative w-full rounded-full py-2.5 px-4 text-sm font-medium transition-all duration-200",
                !isAnnual ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                "relative w-full rounded-full py-2.5 px-4 text-sm font-medium transition-all duration-200",
                isAnnual ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900",
              )}
            >
              Annual
              <Badge className="absolute -top-2 -right-2 bg-green-100 text-green-800 border-0 text-xs px-1.5 py-0.5">
                Save
              </Badge>
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:gap-12 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <div className="relative group">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 opacity-75 group-hover:opacity-100 transition duration-300 blur-sm"></div>
            <Card className="relative h-full flex flex-col rounded-xl overflow-hidden border-0 bg-white shadow-md transition-all duration-300 group-hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white -z-10" />

              <CardHeader className="pt-8 pb-6 text-center border-b">
                <div className="mb-3">
                  <span className="inline-block px-4 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-800">
                    starter
                  </span>
                </div>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold">${isAnnual ? "11,000" : "1,000"}</span>
                  <span className="ml-1.5 text-gray-500">/{isAnnual ? "year" : "month"}</span>
                </div>
                {isAnnual && (
                  <div className="mt-2 inline-flex items-center text-sm text-green-600">
                    <BadgeCheck className="mr-1 h-4 w-4" />
                    Save $1,000 with annual billing
                  </div>
                )}
              </CardHeader>

              <CardContent className="flex-grow p-6 space-y-6">
                <div>
                  <h3 className="text-base font-semibold mb-3">DIY playbooks:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                        <span className="text-gray-600 text-xs">•</span>
                      </div>
                      <span className="ml-3 text-gray-700">Website makeover</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                        <span className="text-gray-600 text-xs">•</span>
                      </div>
                      <span className="ml-3 text-gray-700">1-tap mobile booking</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                        <span className="text-gray-600 text-xs">•</span>
                      </div>
                      <span className="ml-3 text-gray-700">5-star review engine</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                        <span className="text-gray-600 text-xs">•</span>
                      </div>
                      <span className="ml-3 text-gray-700">Google + ad leads</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                        <span className="text-gray-600 text-xs">•</span>
                      </div>
                      <span className="ml-3 text-gray-700">AI-search visibility</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 text-center border-t">
                  <p className="text-sm text-gray-600">Best if you have time to do the work.</p>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button
                  asChild
                  variant="outline"
                  className="w-full py-6 text-base border-gray-300 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                  onClick={() => handleGetStarted("starter")}
                >
                  {!isAnnual ? (
                    <Link
                      href="https://buy.stripe.com/aFa00k0o68L08kE0ZNdZ60y"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-rewardful
                      prefetch={false}
                      className="flex items-center justify-center"
                    >
                      get started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  ) : (
                    <Link
                      href="https://buy.stripe.com/3cI9AU1sa9P47gAdMzdZ60A"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-rewardful
                      prefetch={false}
                      className="flex items-center justify-center"
                    >
                      get started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Pro Plan */}
          <div className="relative group">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 opacity-90 group-hover:opacity-100 transition duration-300 blur-sm"></div>
            <Card className="relative h-full flex flex-col rounded-xl overflow-hidden border-0 bg-gray-900 text-white shadow-xl transition-all duration-300 group-hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black -z-10" />

              <div className="absolute top-0 right-0 mt-4 mr-4">
                <Badge className="bg-white text-gray-900 hover:bg-white">recommended</Badge>
              </div>

              <CardHeader className="pt-8 pb-6 text-center border-b border-gray-800">
                <div className="mb-3">
                  <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-sm font-medium text-white">
                    pro
                  </span>
                </div>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold">${isAnnual ? "32,000" : "3,000"}</span>
                  <span className="ml-1.5 text-gray-400">/{isAnnual ? "year" : "month"}</span>
                </div>
                {isAnnual && (
                  <div className="mt-2 inline-flex items-center text-sm text-green-400">
                    <BadgeCheck className="mr-1 h-4 w-4" />
                    Save $4,000 with annual billing
                  </div>
                )}
              </CardHeader>

              <CardContent className="flex-grow p-6 space-y-6">
                <div className="p-4 rounded-lg bg-white/10 text-center">
                  <span className="font-bold">2x online sales in 60 days</span>
                </div>

                <div>
                  <h3 className="text-base font-semibold mb-3">Done-for-you: we build everything → you relax 🏖️</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="ml-3 text-gray-300">Website makeover</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="ml-3 text-gray-300">1-tap mobile booking</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="ml-3 text-gray-300">5-star review engine</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="ml-3 text-gray-300">Google + ad leads</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="ml-3 text-gray-300">AI-search visibility</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 text-center border-t border-gray-800">
                  <p className="text-sm text-gray-400">Best if you want speed and zero hassle.</p>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button
                  asChild
                  className="w-full py-6 text-base bg-white text-gray-900 hover:bg-gray-100 transition-all duration-200"
                  onClick={() => handleGetStarted("pro")}
                >
                  {!isAnnual ? (
                    <Link
                      href="https://buy.stripe.com/aFa6oI2webXc58seQDdZ60x"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-rewardful
                      prefetch={false}
                      className="flex items-center justify-center"
                    >
                      get started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  ) : (
                    <Link
                      href="https://buy.stripe.com/4gM14o0o6bXc8kEaAndZ60z"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-rewardful
                      prefetch={false}
                      className="flex items-center justify-center"
                    >
                      get started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mx-auto mt-24 md:mt-32 max-w-4xl">
          <h2 className="mb-10 md:mb-12 text-center text-2xl md:text-3xl font-bold">trusted by business owners</h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="absolute top-0 right-0 h-20 w-20 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-gray-50 opacity-80"></div>

              <div className="mb-4 flex items-center">
                <div className="relative mr-4 h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-sm">
                  <CoreImage
                    src="/buck-brown-olympic-bootworks.jpeg"
                    alt="buck brown"
                    width={56}
                    height={56}
                    className="object-cover"
                    trackingId="pricing_testimonial_1"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">buck brown</h3>
                  <p className="text-sm text-gray-500">olympic bootworks</p>
                </div>
              </div>

              <div className="mb-3 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600">
                "since partnering with prism, we've seen a 40% increase in new customer appointments. their website
                redesign and digital marketing strategy completely transformed our online presence."
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="absolute top-0 right-0 h-20 w-20 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-gray-50 opacity-80"></div>

              <div className="mb-4 flex items-center">
                <div className="relative mr-4 h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-sm">
                  <CoreImage
                    src="/suz-meinhardt.png"
                    alt="suz meinhardt"
                    width={56}
                    height={56}
                    className="object-cover"
                    trackingId="pricing_testimonial_2"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">suz meinhardt</h3>
                  <p className="text-sm text-gray-500">rebellious aging</p>
                </div>
              </div>

              <div className="mb-3 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600">
                "the pro plan delivered exactly as promised. within 45 days, we were seeing 15+ new customers per month
                directly from our website. the roi has been exceptional."
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mx-auto mt-24 md:mt-32 max-w-3xl">
          <h2 className="mb-10 md:mb-12 text-center text-2xl md:text-3xl font-bold">frequently asked questions</h2>

          <div className="space-y-4">
            {[
              {
                question: "what's included in the website redesign?",
                answer:
                  "our website redesign includes custom design, mobile optimization, online booking integration, seo optimization, and content creation specifically tailored for your business type.",
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
                question: "what makes prism different from other marketing agencies?",
                answer:
                  "we specialize in results-driven marketing and have a proven track record of success. our approach combines beautiful design with data-driven marketing strategies specifically optimized for customer acquisition.",
              },
              {
                question: "can i upgrade from starter to pro later?",
                answer:
                  "you can upgrade at any time. many businesses start with our starter plan and upgrade to pro once they see the initial results.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:shadow-md"
              >
                <div className="p-6">
                  <h3 className="mb-3 text-lg font-medium">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto mt-24 md:mt-32 max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-10 text-center text-white shadow-xl">
            <div className="absolute inset-0 bg-[url('/transparent-prism-logo.png')] bg-no-repeat bg-right-bottom opacity-5"></div>

            <h2 className="mb-4 text-2xl md:text-3xl font-bold">ready to grow your business?</h2>
            <p className="mb-8 text-lg text-gray-300">
              schedule a free consultation to discuss your business's specific needs and goals.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-base shadow-lg transition-all duration-200"
              onClick={() => trackNavigation("pricing_bottom_cta", "/get-started")}
            >
              <Link href="/get-started" className="flex items-center">
                get started today <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
