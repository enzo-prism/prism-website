"use client"

import Link from "next/link"
import { Mail } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { Button } from "@/components/ui/button"
import { trackCTAClick, trackNavigation } from "@/utils/analytics"

export default function CareersClientPage() {

  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="Careers at Prism" />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-3">
                <div className="text-4xl">🚀</div>
                <h1 className="text-4xl font-bold tracking-tighter lowercase sm:text-5xl md:text-6xl">
                  join our team
                </h1>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase md:text-xl">
                  help us create digital experiences that drive real business results
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Current Openings Section */}
        <section className="px-4 py-16 md:py-24 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                current openings
              </h2>
              <p className="mx-auto mt-4 max-w-[600px] text-neutral-600 lowercase">
                we're always looking for talented individuals who share our passion for digital excellence
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 md:p-12 text-center border border-neutral-200 shadow-sm">
              <div className="text-5xl mb-6">💼</div>
              <h3 className="text-xl font-semibold lowercase text-neutral-800 mb-4">
                no current openings
              </h3>
              <p className="text-neutral-600 lowercase mb-8 max-w-md mx-auto">
                we don't have any open positions right now, but we're always interested in meeting talented people.
              </p>
              
              <div className="space-y-4">
                <p className="text-sm text-neutral-500 lowercase">
                  send us your portfolio and let us know how you'd like to contribute
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 to-transparent"></div>
              <div className="absolute top-4 right-4 text-6xl opacity-10">✨</div>
              <div className="absolute bottom-4 left-4 text-4xl opacity-10">💼</div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl mb-4">
                  interested in joining us?
                </h2>
                <p className="mx-auto max-w-[600px] text-neutral-300 lowercase mb-8 md:text-lg">
                  we'd love to hear from you. send us your portfolio and tell us about your passion for digital design.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="mailto:careers@design-prism.com"
                    onClick={() => trackCTAClick("careers email", "careers page")}
                  >
                    <Button
                      size="lg"
                      className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-full px-8 py-4 text-sm font-medium lowercase transition-all duration-200 hover:scale-105 shadow-lg"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      careers@design-prism.com
                    </Button>
                  </a>

                  <div className="flex items-center gap-2 text-neutral-400 text-sm lowercase">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    we respond within 48 hours
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <section className="px-4 py-8">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 lowercase transition-colors"
              onClick={() => trackNavigation("careers_back_home", "/")}
            >
              ← back to home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}