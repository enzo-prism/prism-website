import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import MinimalAppsList from "@/components/minimal-apps-list"

export const metadata: Metadata = {
  title: "mobile app development portfolio & services | prism",
  description:
    "view our portfolio of custom mobile apps for restaurants, healthcare, and small businesses. interactive demos showcase native ios and android apps that boost customer engagement and streamline operations.",
  openGraph: {
    title: "mobile app development portfolio & services | prism",
    description:
      "view our portfolio of custom mobile apps for restaurants, healthcare, and small businesses. interactive demos showcase native ios and android apps that boost customer engagement and streamline operations.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://design-prism.com/apps",
  },
}

const appProjects = [
  {
    id: "1",
    title: "prism dashboard",
    url: "https://growthprism.app",
    description: "real-time analytics and insights for growing businesses",
    category: "business",
  },
  {
    id: "2",
    title: "peak surf",
    url: "https://peaksurf.club",
    description: "surf forecasts, tide data, and community features",
    category: "lifestyle",
  },
  {
    id: "3",
    title: "track & field",
    url: "https://pv-schedule.com",
    description: "athletic performance tracking and event scheduling",
    category: "sports",
  },
  {
    id: "4",
    title: "sison yum",
    url: "https://sisonyum.com",
    description: "private restaurant reviews and dining recommendations",
    category: "food",
  },
  {
    id: "5",
    title: "grind deck",
    url: "https://www.grinddeck.com/",
    description: "gamified productivity with rewards and achievements",
    category: "productivity",
  },
]

export default function AppsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollProgressBar />
      <PageViewTracker title="Mobile Apps Portfolio & Services" />
      <Navbar />
      
      <main className="flex-1">
        {/* Hero - Ultra minimal */}
        <section className="px-4 pt-24 pb-8 sm:pt-32 sm:pb-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-neutral-900 mb-4">
              apps
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 font-light">
              beautiful interfaces, powerful experiences
            </p>
          </div>
        </section>

        {/* Portfolio List - Minimal and mobile-first */}
        <section className="pb-16 sm:pb-20">
          <div className="max-w-3xl mx-auto">
            <MinimalAppsList projects={appProjects} />
          </div>
        </section>

        {/* Process - Minimal list */}
        <section className="px-4 py-16 sm:py-20 border-t border-neutral-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 mb-8">
              our process
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-xs text-neutral-400 font-mono mt-0.5">01</span>
                <div>
                  <h3 className="text-base sm:text-lg font-light text-neutral-900 mb-1">
                    discovery & strategy
                  </h3>
                  <p className="text-sm text-neutral-600 font-light">
                    understanding your users and defining the app's purpose
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xs text-neutral-400 font-mono mt-0.5">02</span>
                <div>
                  <h3 className="text-base sm:text-lg font-light text-neutral-900 mb-1">
                    design & prototype
                  </h3>
                  <p className="text-sm text-neutral-600 font-light">
                    creating beautiful interfaces and intuitive user flows
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xs text-neutral-400 font-mono mt-0.5">03</span>
                <div>
                  <h3 className="text-base sm:text-lg font-light text-neutral-900 mb-1">
                    develop & test
                  </h3>
                  <p className="text-sm text-neutral-600 font-light">
                    building robust code with rigorous quality assurance
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xs text-neutral-400 font-mono mt-0.5">04</span>
                <div>
                  <h3 className="text-base sm:text-lg font-light text-neutral-900 mb-1">
                    launch & grow
                  </h3>
                  <p className="text-sm text-neutral-600 font-light">
                    app store optimization and ongoing support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Clean and simple */}
        <section className="px-4 py-20 sm:py-24 border-t border-neutral-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 mb-6">
              ready to build?
            </h2>
            <Link href="/get-started?service=app-development">
              <Button
                size="lg"
                className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-none px-8 py-3 text-sm font-light transition-all duration-200 hover:scale-[1.02]"
              >
                start your app
              </Button>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
