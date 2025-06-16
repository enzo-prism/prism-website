"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search, Target, TrendingUp, Calendar } from "lucide-react"
import { trackCTAClick } from "@/utils/analytics"

export default function AISEOBoostPage() {
  const services = [
    {
      icon: Search,
      title: "AI Audit",
      description: "Find where bots ignore you",
      detail: "Discover exactly how ChatGPT, Gemini & Perplexity currently see your brand"
    },
    {
      icon: Target,
      title: "Optimization", 
      description: "Make them recommend you",
      detail: "Strategic content & citation optimization for AI search engines"
    },
    {
      icon: TrendingUp,
      title: "Results",
      description: "2× AI traffic in 90 days",
      detail: "Guaranteed increase in AI-generated referrals or we work for free"
    }
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-16 text-center">
          
          {/* Hero Section */}
          <div>
            <div className="text-5xl mb-6" role="img" aria-label="Robot emoji">
              🤖
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl lowercase">
              AI SEO Boost™
            </h1>
            <p className="mt-6 text-xl text-neutral-600 lowercase max-w-lg mx-auto">
              Get recommended by AI bots first.
            </p>
            <div className="mt-10">
              <Link href="/get-started">
                <Button 
                  size="lg"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-8 py-4 text-lg lowercase shadow-lg"
                  onClick={() => trackCTAClick("book discovery call", "ai-seo-boost hero")}
                >
                  <Calendar className="mr-3 h-5 w-5" />
                  Book Discovery Call
                </Button>
              </Link>
            </div>
          </div>

          {/* What You Get */}
          <div className="space-y-10">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="group block w-full max-w-sm p-8 bg-neutral-50 hover:bg-neutral-100 rounded-xl transition-colors duration-150 ease-in-out">
                  <div className="flex flex-col items-center space-y-4">
                    <service.icon className="h-8 w-8 text-neutral-600" />
                    <span className="text-xl font-medium text-neutral-800 lowercase">
                      {service.title}
                    </span>
                    <p className="text-lg text-neutral-600 lowercase font-medium">
                      {service.description}
                    </p>
                    <p className="text-sm text-neutral-500 lowercase leading-relaxed">
                      {service.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Get Started */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lowercase mb-6">
              Get Started
            </h2>
            <p className="text-lg text-neutral-600 lowercase mb-8 max-w-md mx-auto">
              Book a 15-minute call to see if your site qualifies for AI optimization.
            </p>
            <Link href="/get-started">
              <Button 
                size="lg"
                className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-8 py-4 text-lg lowercase shadow-lg"
                onClick={() => trackCTAClick("book discovery call", "ai-seo-boost cta")}
              >
                <Calendar className="mr-3 h-5 w-5" />
                Book Discovery Call
              </Button>
            </Link>
            <p className="text-xs text-neutral-400 mt-4 lowercase italic">
              No pricing on the page—quoted after audit to match your goals.
            </p>
          </div>

          {/* Back to Offers */}
          <div className="mt-16">
            <Link
              href="/offers"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 lowercase transition-colors"
            >
              ← back to offers
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}