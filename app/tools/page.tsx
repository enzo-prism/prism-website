import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ROICalculator from "@/components/roi-calculator"
import GetStartedCTA from "@/components/GetStartedCTA"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Free Business Tools - ROI Calculator | Prism Agency",
  description: "Free business tools including a website ROI calculator. Discover how much revenue a professionally designed website could generate for your business.",
  openGraph: {
    title: "Free Business Tools - Prism Agency",
    description: "Free ROI calculator and business tools to help you understand the potential return on investment from professional web design.",
    url: "https://design-prism.com/tools",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism Agency Business Tools",
      },
    ],
  },
}

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                free business tools
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Calculate your potential ROI, analyze your current performance, and discover growth opportunities with our interactive tools.
              </p>
            </header>

            <div className="mb-16">
              <ROICalculator />
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Why Use Our Tools?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Data-Driven Insights
                  </h3>
                  <p className="text-gray-600">
                    Get accurate projections based on real industry benchmarks and performance data.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    ROI Focused
                  </h3>
                  <p className="text-gray-600">
                    Understand the financial impact of investing in professional web design and development.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Instant Results
                  </h3>
                  <p className="text-gray-600">
                    Get immediate calculations and actionable insights to guide your business decisions.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <GetStartedCTA
              heading="ready to see real results for your business?"
              description="our ROI calculator shows the potential. now let's make it happen with a custom strategy tailored to your goals."
              buttonText="get started"
              analyticsLabel="tools conversion CTA"
              variant="light"
              className="mt-16"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}