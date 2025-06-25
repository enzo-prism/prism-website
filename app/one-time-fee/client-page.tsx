"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle, CreditCard, FileText, Globe, Palette, Printer, Share2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useMobile } from "@/hooks/use-mobile"
import ScrollProgressBar from "@/components/scroll-progress-bar"

import { trackCTAClick, trackNavigation } from "@/utils/analytics"
import PageViewTracker from "@/components/page-view-tracker"

const services = [
  { name: "business card", icon: CreditCard },
  { name: "logo or wordmark", icon: Palette },
  { name: "social media banner or post set", icon: Share2 },
  { name: "print flyer / brochure / menu", icon: Printer },
  { name: "landing page mock-up", icon: Globe },
  { name: "merch / apparel graphic", icon: User },
]

const steps = [
  {
    number: 1,
    title: "pick your design",
    description: "tell us what you need",
  },
  {
    number: 2,
    title: "secure your spot",
    description: "checkout instantly via stripe",
  },
  {
    number: 3,
    title: "collaborate & iterate",
    description: "hop on calls, drop comments, and watch your design evolve until it's spot-on",
  },
]

export default function OneTimeFeeClientPage() {
  const isMobile = useMobile()

  return (
    <div className="flex min-h-screen flex-col">
      {isMobile && <ScrollProgressBar />}
      <PageViewTracker title="One-Time Design Fee - Prism" />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h1 className="text-4xl font-bold tracking-tighter lowercase sm:text-5xl md:text-6xl">
                one perfect design, one flat fee
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-neutral-600 lowercase md:text-2xl">
                a single business card, logo, flyer—or whatever you need—crafted by prism's pros for $600. unlimited iterations until you love it.
              </p>
              <div className="pt-6">
                <Button
                  className="rounded-full px-8 py-6 text-lg lowercase"
                  onClick={() => trackCTAClick("start my design", "hero section")}
                  asChild
                >
                  <a
                    href="https://buy.stripe.com/one-time-design-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    start my design <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What You Can Get Section */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                what you can get for $600
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              {services.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <div key={index} className="flex items-center space-x-4 bg-white rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-neutral-600" strokeWidth={1.5} />
                    </div>
                    <span className="text-lg font-medium lowercase text-neutral-900">
                      {service.name}
                    </span>
                  </div>
                )
              })}
              <div className="flex items-center space-x-4 bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-neutral-600" strokeWidth={1.5} />
                </div>
                <span className="text-lg font-medium lowercase text-neutral-900">
                  …or any one design you've got in mind
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl mb-4">
                the prism guarantee
              </h2>
              <h3 className="text-xl font-semibold text-neutral-900 lowercase mb-4">
                love-it-or-we-fix-it
              </h3>
              <p className="text-lg text-neutral-600 lowercase">
                unlimited revisions and direct access to our designers until the final file makes you say, "perfect." no extra fees, ever.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                how it works
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold">{step.number}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold lowercase mb-3">{step.title}</h3>
                  <p className="text-neutral-600 lowercase">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upsell Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                need more than one design?
              </h2>
              <p className="text-lg text-neutral-600 lowercase">
                growing fast or launching something big? switch to our unlimited design & tech subscription—all-you-can-eat creative and growth work, month-to-month.
              </p>
              <div className="pt-4">
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-3 text-base lowercase"
                  onClick={() => trackNavigation("view unlimited plan", "/get-started")}
                  asChild
                >
                  <Link href="/get-started">
                    view unlimited plan <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                ready to get your perfect design?
              </h2>
              <p className="text-lg text-neutral-600 lowercase">
                one flat fee, unlimited revisions, until you love it
              </p>
              <div className="pt-6">
                <Button
                  className="rounded-full px-8 py-6 text-lg lowercase"
                  onClick={() => trackCTAClick("start my design", "final cta")}
                  asChild
                >
                  <a
                    href="https://buy.stripe.com/one-time-design-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    start my design <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}