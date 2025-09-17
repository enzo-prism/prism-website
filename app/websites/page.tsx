import Footer from "@/components/footer"
import MinimalWebsiteList from "@/components/minimal-website-list"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import SeoTextSection from "@/components/seo-text-section"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dental & Small Business Website Portfolio | Prism",
  description:
    "See responsive, SEO-ready sites we launched for dentists, healthcare groups, nonprofits, and retailers, each optimized for AI search and conversions.",
  openGraph: {
    title: "Dental & Small Business Website Portfolio | Prism",
    description:
      "See responsive, SEO-ready sites we launched for dentists, healthcare groups, nonprofits, and retailers, each optimized for AI search and conversions.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://design-prism.com/websites",
  },
}

const websiteProjects = [
  {
    id: "4",
    title: "exquisite dentistry",
    url: "https://exquisitedentistryla.com/",
    category: "healthcare",
    description: "luxury cosmetic dentistry practice in beverly hills",
  },
  {
    id: "9",
    title: "belize kids",
    url: "https://belizekids.org",
    category: "nonprofit",
    description: "empowering children through education and community",
  },
  {
    id: "7",
    title: "laguna beach dental arts",
    url: "https://lagunabeachdentalarts.com",
    category: "healthcare",
    description: "exceptional dental care in coastal california",
  },
  {
    id: "3",
    title: "olympic bootworks",
    url: "https://www.olympicbootworks.com",
    category: "retail",
    description: "performance footwear and repair solutions",
  },
  {
    id: "5",
    title: "dr. christopher wong",
    url: "https://www.chriswongdds.com",
    category: "healthcare",
    description: "modern dental care with a personal touch",
  },
  {
    id: "12",
    title: "fantic bike warehouse",
    url: "https://fanticbikewarehouse.com/",
    category: "retail",
    description: "authorized dealer of premium italian motorcycles and e-bikes",
  },
  {
    id: "11",
    title: "coast periodontics",
    url: "https://www.coastperiodontics.com",
    category: "healthcare",
    description: "expert periodontal and implant care",
  },
  {
    id: "13",
    title: "grace dental santa rosa",
    url: "https://www.tingjenjidds.com/",
    category: "healthcare",
    description: "exceptional family dental care in santa rosa",
  },
  {
    id: "14",
    title: "town centre dental",
    url: "https://towncentredental.net/",
    category: "healthcare",
    description: "family dentistry with dr. gerard banaga in brentwood",
  },
  {
    id: "15",
    title: "family first smile care",
    url: "https://famfirstsmile.com/",
    category: "healthcare",
    description: "family‑focused dental care in los gatos",
  },
  {
    id: "16",
    title: "rebellious aging",
    url: "https://rebelwithsuz.com/",
    category: "wellness",
    description: "age boldly—confidence, style, and plant-based longevity",
  },
  {
    id: "17",
    title: "canary foundation",
    url: "https://www.canaryfoundation.org/",
    category: "nonprofit",
    description: "early cancer detection research nonprofit",
  },
  {
    id: "18",
    title: "wine country root canal",
    url: "https://www.winecountryrootcanal.com/",
    category: "healthcare",
    description: "santa rosa endodontics—gentle root canal therapy",
  },
]

export default function WebsitesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollProgressBar />
      <PageViewTracker title="Websites Portfolio & Services" />
      <Navbar />
      
      <main className="flex-1">
        {/* Hero - Ultra minimal */}
        <section className="px-4 pt-24 pb-8 sm:pt-32 sm:pb-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-neutral-900 mb-4">
              websites
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 font-light">
              clean design, powerful results
            </p>
          </div>
        </section>

        <SeoTextSection
          variant="compact"
          showDivider={false}
          title="built for patients, members, and modern search"
          subtitle="every site we launch blends premium design with measurable performance for dentists, clinics, nonprofits, and local retailers."
          className="pt-2"
        >
          <p>
            We start with audience research and analytics reviews, then rebuild your website around the moments that drive calls, bookings, and purchases. Our team hand-codes responsive layouts, adds structured content for AI search, wires forms and phone tracking, and documents the playbook so your staff can update pages confidently after launch.
          </p>
          <ul>
            <li><strong>Conversion-first UX:</strong> clear service pathways, proof, and CTAs built to guide visitors from curiosity to commitment.</li>
            <li><strong>SEO foundations:</strong> technical cleanup, schema, and performance budgets that keep you visible across Google and emerging AI surfaces.</li>
            <li><strong>Growth enablement:</strong> dashboards, CRM hookups, and content systems that make it easy to iterate without starting from scratch.</li>
          </ul>
        </SeoTextSection>

        {/* Portfolio List - Minimal and mobile-first */}
        <section className="pb-16 sm:pb-20">
          <div className="max-w-3xl mx-auto">
            <MinimalWebsiteList projects={websiteProjects} />
          </div>
        </section>

        {/* Stats - Simple and elegant */}
        <section className="px-4 py-16 sm:py-20 border-t border-neutral-100">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-light text-neutral-900">50+</p>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1">websites launched</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-light text-neutral-900">97%</p>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1">client satisfaction</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-light text-neutral-900">3x</p>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1">average roi</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services - Minimal list */}
        <section className="px-4 py-16 sm:py-20 border-t border-neutral-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 mb-8">
              what we do
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-xs text-neutral-400 font-mono mt-0.5">01</span>
                <div>
                  <h3 className="text-base sm:text-lg font-light text-neutral-900 mb-1">
                    custom design
                  </h3>
                  <p className="text-sm text-neutral-600 font-light">
                    tailored to your brand and optimized for conversion
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xs text-neutral-400 font-mono mt-0.5">02</span>
                <div>
                  <h3 className="text-base sm:text-lg font-light text-neutral-900 mb-1">
                    mobile first
                  </h3>
                  <p className="text-sm text-neutral-600 font-light">
                    responsive design that looks perfect on every device
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xs text-neutral-400 font-mono mt-0.5">03</span>
                <div>
                  <h3 className="text-base sm:text-lg font-light text-neutral-900 mb-1">
                    seo optimized
                  </h3>
                  <p className="text-sm text-neutral-600 font-light">
                    built to rank and drive organic traffic
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xs text-neutral-400 font-mono mt-0.5">04</span>
                <div>
                  <h3 className="text-base sm:text-lg font-light text-neutral-900 mb-1">
                    fast & secure
                  </h3>
                  <p className="text-sm text-neutral-600 font-light">
                    lightning-fast load times with enterprise security
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
              ready to start?
            </h2>
            <Link href="/get-started?service=website-design">
              <Button
                size="lg"
                className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-none px-8 py-3 text-sm font-light transition-all duration-200 hover:scale-[1.02]"
              >
                begin your project
              </Button>
            </Link>
          </div>
        </section>

        {/* SEO supporting copy */}
        <SeoTextSection title="custom website design & development">
          <p>
            we build fast, accessible, search‑friendly websites that turn traffic into pipeline. our
            approach blends brand clarity, information architecture, and technical seo—clean markup,
            semantic headings, structured data, and image performance—to help you rank and convert on
            mobile. made with next.js and a design system you can iterate on.
          </p>
        </SeoTextSection>

      </main>
      <Footer />
    </div>
  )
}
