"use client"

import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { trackCTAClick, trackPageView } from "@/utils/analytics"
import { ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect } from "react"
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

export default function AffiliateClientPage() {
  useEffect(() => {
    trackPageView("/affiliate", "Affiliate Program")
  }, [])

  const handleGetStartedClick = () => {
    trackCTAClick("get started with affiliate program", "affiliate_hero")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center max-w-3xl mx-auto">
              <div className="space-y-3">
                <div className="text-4xl">💰</div>
                <h1 className="text-4xl font-bold tracking-tighter lowercase sm:text-5xl md:text-6xl">
                  affiliate program.
                </h1>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase md:text-xl">
                  earn up to $9.6k when someone buys through your referral.
                </p>
                <div className="pt-6">
                  <Button asChild className="rounded-full px-8 py-6 text-lg lowercase">
                    <Link
                      href="https://prism.getrewardful.com/signup?_gl=1*1r9a2n4*_gcl_au*NDE2Njc0OTM5LjE3NDgxODY1MTUuMTkwNDUyMTQzMS4xNzQ4MjAwNzg2LjE3NDgyMDA4NDY.*_ga*MTYxMzMzOTkzMy4xNzQ4MTg2NTE1*_ga_YJYFH7ZS27*czE3NDgyMTIzMDckbzMkZzEkdDE3NDgyMTIzMTYkajUxJGwwJGgwJGR0dE1YcFVzSHlGU25hYVl3ZmFXSElnQVJ4ZEpPMFIzWDh3"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleGetStartedClick}
                    >
                      get affiliate link <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="container mx-auto px-4 md:px-6 mb-20">
          <h2 className="text-2xl font-bold mb-8 lowercase">how it works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { emoji: "🔗", text: "create affiliate account and receive your link" },
              { emoji: "📤", text: "send your link to a friend so they can learn about prism" },
              { emoji: "✅", text: "they decide to buy" },
              { emoji: "💰", text: "you get paid" },
            ].map((step, index) => (
              <Card key={index} className="border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="text-4xl">{step.emoji}</div>
                  </div>
                  <div className="text-3xl font-bold mb-2">{index + 1}</div>
                  <p className="text-sm text-gray-600">{step.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Payment Details */}
        <section className="container mx-auto px-4 md:px-6 mb-20">
          <h2 className="text-2xl font-bold mb-8 lowercase">payment details</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-medium">package 📦</th>
                  <th className="text-left py-4 px-4 font-medium">price 🔖</th>
                  <th className="text-left py-4 px-4 font-medium">affiliate earning 💰</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">starter (monthly)</td>
                  <td className="py-4 px-4">$1k</td>
                  <td className="py-4 px-4 font-semibold">$300</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">starter (annual)</td>
                  <td className="py-4 px-4">$11k</td>
                  <td className="py-4 px-4 font-semibold">$3.3k</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">pro (monthly)</td>
                  <td className="py-4 px-4">$3k</td>
                  <td className="py-4 px-4 font-semibold">$900</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">pro (annual)</td>
                  <td className="py-4 px-4">$32k</td>
                  <td className="py-4 px-4 font-semibold text-green-600">$9.6k</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing Links */}
        <section className="container mx-auto px-4 md:px-6 mb-20">
          <h2 className="text-2xl font-bold mb-8 lowercase">pricing</h2>
          <p className="text-gray-600 mb-6">understand pricing options and value for each</p>
          <div className="space-y-3">
            <Link
              href="/pricing-dental"
              className="flex items-center text-blue-600 hover:underline"
              onClick={() => trackCTAClick("view dental pricing", "affiliate_pricing")}
            >
              • for dentists <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="flex items-center text-blue-600 hover:underline"
              onClick={() => trackCTAClick("view business pricing", "affiliate_pricing")}
            >
              • business owners <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Tools to Sell */}
        <section className="container mx-auto px-4 md:px-6 mb-20">
          <h2 className="text-2xl font-bold mb-8 lowercase">tools to sell</h2>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">• pain points</div>
            <Link
              href="/case-studies"
              className="flex items-center text-blue-600 hover:underline"
              onClick={() => trackCTAClick("view case studies", "affiliate_tools")}
            >
              • case studies <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 md:px-6 mb-20">
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 lowercase">ready to start earning?</h3>
            <p className="text-gray-600 mb-8">join our affiliate program and earn up to $9.6k per referral</p>
            <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800">
              <Link
                href="https://prism.getrewardful.com/signup?_gl=1*1r9a2n4*_gcl_au*NDE2Njc0OTM5LjE3NDgxODY1MTUuMTkwNDUyMTQzMS4xNzQ4MjAwNzg2LjE3NDgyMDA4NDY.*_ga*MTYxMzMzOTkzMy4xNzQ4MTg2NTE1*_ga_YJYFH7ZS27*czE3NDgyMTIzMDckbzMkZzEkdDE3NDgyMTIzMTYkajUxJGwwJGgwJGR0dE1YcFVzSHlGU25hYVl3ZmFXSElnQVJ4ZEpPMFIzWDh3"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleGetStartedClick}
              >
                become an affiliate <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
