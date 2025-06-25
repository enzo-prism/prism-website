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
            <p className="text-base sm:text-lg text-neutral-600 font-light flex items-center gap-3 flex-wrap">
              we design and build your app, add it to the app store, then grow it.
              <span className="flex items-center gap-2">
                {/* Apple Logo */}
                <svg className="h-5 w-5 text-neutral-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                {/* Android Logo */}
                <svg className="h-5 w-5 text-neutral-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
                </svg>
              </span>
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
