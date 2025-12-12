"use client"

import { ArrowRight, CheckCircle, CreditCard, FileText, Globe, Palette, Printer, Share2, User } from "lucide-react"
import Link from "next/link"

import Footer from "@/components/footer"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import dynamic from "next/dynamic"
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

import { trackCTAClick, trackNavigation } from "@/utils/analytics"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"

const services = [
  { name: "logo or wordmark", icon: Palette },
  { name: "social media banner or graphic", icon: Share2 },
  { name: "print flyer / brochure / menu", icon: Printer },
  { name: "thumbnail set", icon: Globe }, // Updated to align
  { name: "business card", icon: CreditCard },
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
    title: "get started",
    description: "schedule a free consultation to discuss details",
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
                a single logo, banner, flyer—or whatever custom design asset you need—crafted by prism's pros for $750. unlimited revisions until you love it.
              </p>
              <div className="pt-6">
                <a
                  href="https://buy.stripe.com/9B6bJ2gn41iy1WgaAndZ60D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-8 py-6 text-lg lowercase border border-black bg-transparent text-black hover:bg-black hover:text-white transition-colors font-medium"
                  onClick={() => trackCTAClick("purchase design sprint", "hero section")}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  purchase design sprint <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Choose Your Path Section */}
        <section className="py-12 md:py-16 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tighter lowercase sm:text-3xl">
                choose your path
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-neutral-600 lowercase">
                not sure which option fits your needs?
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {/* Quick Design Option */}
              <div className="bg-white rounded-xl p-6 border-2 border-black shadow-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold lowercase mb-2">design sprint</h3>
                  <div className="text-3xl font-bold text-black mb-2">$750</div>
                  <p className="text-neutral-600 lowercase text-sm mb-4">
                    perfect for quick branding needs
                  </p>
                  <ul className="text-left text-sm text-neutral-600 lowercase space-y-1 mb-4">
                    <li>• custom design assets</li>
                    <li>• unlimited revisions</li>
                    <li>• ready in 3-5 business days</li>
                  </ul>
                  <div className="mb-4">
                    <a
                      href="https://buy.stripe.com/9B6bJ2gn41iy1WgaAndZ60D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-base lowercase font-medium hover:bg-neutral-800 transition-colors"
                      onClick={() => trackCTAClick("checkout $750 design", "design sprint card")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      checkout
                    </a>
                  </div>
                  <div className="text-xs text-neutral-500 lowercase">👈 you're here</div>
                </div>
              </div>
              
              {/* Custom Project Option */}
              <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="w-12 h-12 bg-neutral-100 text-neutral-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-bold lowercase mb-2">subscription tiers</h3>
                  <div className="text-3xl font-bold text-neutral-900 mb-2">from $1,200/mo</div>
                  <p className="text-neutral-600 lowercase text-sm mb-4">
                    for comprehensive growth solutions
                  </p>
                  <ul className="text-left text-sm text-neutral-600 lowercase space-y-1 mb-4">
                    <li>• full website rebuild</li>
                    <li>• advanced SEO & apps</li>
                    <li>• ongoing support</li>
                  </ul>
                  <Button
                    variant="outline"
                    className="rounded-full text-sm lowercase"
                    onClick={() => trackNavigation("explore services platform", "/services")}
                    asChild
                  >
                    <Link href="/services">
                      explore our service platform <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You Can Get Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                what you can get for $750
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
        <section className="py-16 md:py-24 bg-neutral-50">
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
                unlimited revisions and direct access to our designers until the final file makes you say, "perfect." no extra fees, ever. 100% satisfaction or full refund.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-white">
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

        {/* Decision Helper Section */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center space-y-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl mb-4">
                  still not sure?
                </h2>
                <p className="text-lg text-neutral-600 lowercase">
                  here's how to choose the right option for your business
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 text-left">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold lowercase mb-3 text-green-700">
                    choose $750 design sprint if:
                  </h3>
                  <ul className="space-y-2 text-neutral-600 lowercase text-sm">
                    <li>• you need quick custom design assets</li>
                    <li>• best for branding without commitment</li>
                    <li>• you have a clear idea of what you want</li>
                    <li>• budget under $1,000</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold lowercase mb-3 text-blue-700">
                    choose subscription if:
                  </h3>
                  <ul className="space-y-2 text-neutral-600 lowercase text-sm">
                    <li>• you need a full website or app</li>
                    <li>• you want ongoing edits and growth</li>
                    <li>• advanced features like SEO</li>
                    <li>• budget $1,200+/mo</li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-4">
                <p className="text-neutral-500 lowercase text-sm mb-4">
                  not sure? book a free consultation to explore your options
                </p>
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-3 text-base lowercase"
                  onClick={() => trackNavigation("explore options consultation", "/free-analysis")}
                  asChild
                >
                  <Link href="/free-analysis">
                    {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                ready to get your perfect design?
              </h2>
              <p className="text-lg text-neutral-600 lowercase">
                one flat fee, unlimited revisions, until you love it
              </p>
              <div className="pt-6">
                <a
                  href="https://buy.stripe.com/9B6bJ2gn41iy1WgaAndZ60D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-8 py-6 text-lg lowercase border border-black bg-transparent text-black hover:bg-black hover:text-white transition-colors font-medium"
                  onClick={() => trackCTAClick("purchase design sprint", "final cta")}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  purchase design sprint <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Add new section after How It Works for add-ons and full suite overview */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
              optional add-on: photo boost
            </h2>
          </div>
          <div className="mx-auto max-w-2xl">
            <p className="text-neutral-600 lowercase mb-4">
              for +$499, add a professional photo session or editing to complement your design.
            </p>
            <ul className="text-left text-neutral-600 lowercase space-y-2">
              <li>• on-site 2-hour shoot (local only)</li>
              <li>• 20-50 optimized images</li>
              <li>• remote option available</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
              our full suite of services
            </h2>
            <p className="mt-4 text-neutral-600 lowercase">
              the design sprint is just the beginning. upgrade anytime for more comprehensive support.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="bg-neutral-50 rounded-xl p-6">
              <h3 className="text-xl font-bold lowercase mb-2">site essentials</h3>
              <div className="text-2xl font-bold mb-2">$1,200/mo</div>
              <ul className="space-y-2 text-neutral-600 lowercase">
                <li>• full website rebuild</li>
                <li>• unlimited edits</li>
                <li>• basic analytics</li>
              </ul>
            </div>
            <div className="bg-neutral-50 rounded-xl p-6">
              <h3 className="text-xl font-bold lowercase mb-2">growth accelerator</h3>
              <div className="text-2xl font-bold mb-2">$1,999/mo</div>
              <ul className="space-y-2 text-neutral-600 lowercase">
                <li>• everything in essentials</li>
                <li>• advanced SEO & listings</li>
                <li>• review boosting & apps</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="rounded-full px-6 py-3 text-base lowercase" asChild>
              <Link href="/services">
                view detailed pricing <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
