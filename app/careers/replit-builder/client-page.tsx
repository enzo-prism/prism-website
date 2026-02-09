import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import TrackedAnchor from "@/components/tracked-anchor"
import TrackedLink from "@/components/tracked-link"
import PixelishIcon from "@/components/pixelish/PixelishIcon"
import { Button } from "@/components/ui/button"
import { Briefcase, Clock, Mail, MapPin } from "lucide-react"
import { JobPostingSchema } from "@/components/schema-markup"

export default function ReplitBuilderPage() {
  const responsibilities = [
    "Turn ready-to-build Figma designs and Notion specs into live websites in Replit",
    "Use Replit Agent, Replit DB, and Vercel v0 to ship fast, reliable sites",
    "Ensure every page looks great on mobile and loads lightning-fast",
    "Manage custom domains, metadata, and analytics integrations",
    "Collaborate async with our designer-founder (Enzo) via GitHub and Slack",
    "Continuously refine pages for clarity, UX, and conversion"
  ]

  const requirements = [
    "Work confidently inside Replit, using Agents and the built-in database",
    "Write clean, production-ready HTML, CSS, JavaScript, or React/TypeScript",
    "Care deeply about simplicity, whitespace, and performance",
    "Can follow a clear design system and spot small inconsistencies",
    "Enjoy shipping quickly in short, focused sprints",
    "Communicate clearly and proactively in concise written English"
  ]

  const contractDetails = [
    { label: "Type", value: "1099 contract, part-time (≈ 10–20 hrs/week to start)" },
    { label: "Location", value: "Remote, any time zone" },
    { label: "Duration & rate", value: "Initial 3-month term, extension likely; competitive hourly rate" }
  ]

  const applicationSteps = [
    'Subject line: "replit builder – [your name]"',
    "PDF résumé (max 2 pages)",
    "Links to your Replit profile and at least one live site you’ve built on Replit"
  ]

  const headquarters = {
    "@type": "Place" as const,
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: "548 Market St #62411",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94104",
      addressCountry: "US"
    }
  }

  const applicantLocations = [
    {
      "@type": "Country" as const,
      name: "United States"
    }
  ]

  const datePosted = "2024-11-18T00:00:00.000Z"
  const validThrough = (() => {
    const base = new Date(datePosted)
    base.setMonth(base.getMonth() + 2)
    return base.toISOString()
  })()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-3">
                <div className="flex justify-center" aria-hidden="true">
                  <PixelishIcon src="/pixelish/arrow-refresh.svg" alt="" size={40} invert={false} aria-hidden="true" />
                </div>
                <h1 className="text-4xl font-bold tracking-tighter lowercase sm:text-5xl md:text-6xl">
                  contract replit builder
                </h1>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase md:text-xl">
                  join our lean, fast-moving design and growth studio helping dentists and local businesses modernize their online presence. we design, build, and launch beautiful, fast websites — all inside replit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Job Overview */}
        <section className="px-4 py-16 md:py-24 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 text-center">
                <Briefcase className="h-8 w-8 text-neutral-700 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold lowercase text-neutral-800 mb-2">contract</h3>
                <p className="text-sm text-neutral-600 lowercase">1099 part-time position</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 text-center">
                <MapPin className="h-8 w-8 text-neutral-700 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold lowercase text-neutral-800 mb-2">remote</h3>
                <p className="text-sm text-neutral-600 lowercase">any time zone</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 text-center">
                <Clock className="h-8 w-8 text-neutral-700 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold lowercase text-neutral-800 mb-2">≈ 10–20 hrs/week</h3>
                <p className="text-sm text-neutral-600 lowercase">to start</p>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Do */}
        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                what you'll do
              </h2>
            </div>

            <div className="bg-neutral-50 rounded-xl p-8 md:p-12">
              <ul className="space-y-4">
                {responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-neutral-900 rounded-full mr-4 mt-2 shrink-0"></span>
                    <span className="text-neutral-700 lowercase leading-relaxed">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* You're a Great Fit If */}
        <section className="px-4 py-16 md:py-24 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                you're a great fit if you
              </h2>
            </div>

            <div className="bg-white rounded-xl p-8 md:p-12 border border-neutral-200 shadow-sm">
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-neutral-900 rounded-full mr-4 mt-2 shrink-0"></span>
                    <span className="text-neutral-700 lowercase leading-relaxed">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contract Details */}
        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                contract details
              </h2>
            </div>

            <div className="space-y-4">
              {contractDetails.map((detail, index) => (
                <div key={index} className="bg-neutral-50 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="mb-2 sm:mb-0">
                    <h4 className="font-semibold text-neutral-800 lowercase">{detail.label}:</h4>
                  </div>
                  <div>
                    <p className="text-neutral-600 lowercase">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section className="px-4 py-16 md:py-24 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 to-transparent"></div>
              <div className="absolute top-4 right-4 opacity-10" aria-hidden="true">
                <PixelishIcon src="/pixelish/award-plus.svg" alt="" size={72} aria-hidden="true" />
              </div>
              <div className="absolute bottom-4 left-4 opacity-10" aria-hidden="true">
                <PixelishIcon src="/pixelish/arrow-refresh.svg" alt="" size={52} aria-hidden="true" />
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl mb-4">
                  how to apply
                </h2>
                <p className="mx-auto max-w-[600px] text-neutral-300 lowercase mb-8 md:text-lg">
                  email support@design-prism.com with:
                </p>

                <div className="mb-8 text-left max-w-md mx-auto">
                  <ol className="space-y-3">
                    {applicationSteps.map((step, index) => (
                      <li key={index} className="flex items-start text-neutral-300 lowercase">
                        <span className="bg-white text-neutral-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <TrackedAnchor
                    href="mailto:support@design-prism.com?subject=replit%20builder%20%E2%80%93%20[Your%20Name]"
                    label="apply for job"
                    location="replit-builder"
                  >
                    <Button
                      size="lg"
                      className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-full px-8 py-4 text-sm font-medium lowercase transition-[transform,background-color,color,box-shadow] duration-200 hover:scale-105 shadow-lg"
                    >
                      <Mail className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" />
                      apply now
                    </Button>
                  </TrackedAnchor>

                  <div className="flex items-center gap-2 text-neutral-400 text-sm lowercase">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    we review applications on a rolling basis
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-2">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">other open roles</p>
            <TrackedLink
              href="/careers/front-end-developer"
              label="open role"
              location="open_role_front_end_developer"
              className="mt-3 inline-flex text-sm font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-900"
            >
              contract front-end developer
            </TrackedLink>
          </div>
        </section>

        {/* Back Navigation */}
        <section className="px-4 py-8">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <TrackedLink
              href="/careers"
              label="back to careers"
              location="back_to_careers"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 lowercase transition-colors"
            >
              ← back to careers
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
      <JobPostingSchema
        jobId="replit-builder"
        title="contract replit builder"
        description="help dentists and local businesses launch modern, fast websites entirely inside replit."
        employmentType="CONTRACTOR"
        datePosted={datePosted}
        validThrough={validThrough}
        url="https://www.design-prism.com/careers/replit-builder"
        jobLocation={headquarters}
        applicantLocations={applicantLocations}
        responsibilities={responsibilities}
        qualifications={requirements}
      />
    </div>
  )
}
