"use client"

import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { trackCTAClick, trackNavigation } from "@/utils/analytics"
import { ArrowRight, Briefcase, Clock, Mail, MapPin } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { JobPostingSchema } from "@/components/schema-markup"
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

export default function CareersClientPage() {
  const currentJobs = [
    {
      id: "front-end-developer",
      title: "contract front-end developer",
      type: "Contract",
      location: "Remote",
      duration: "Part-time (10-20 hrs/week)",
      description:
        "join our lean team building modern web apps with ai-first tooling. work with cursor, replit, vercel v0, and lovable.dev.",
      requirements: ["React/TypeScript expertise", "Cursor & Replit experience", "Mobile-first design skills"],
      slug: "front-end-developer",
      datePosted: "2024-11-15"
    },
    {
      id: "replit-builder",
      title: "contract replit builder",
      type: "Contract",
      location: "Remote",
      duration: "Part-time (≈ 10-20 hrs/week)",
      description:
        "help dentists and local businesses launch fast, beautiful websites entirely inside replit using modern ai tooling.",
      requirements: ["Replit Agent & Replit DB experience", "Clean HTML/CSS/JS or React code", "Detail-focused on performance"],
      slug: "replit-builder",
      datePosted: "2024-11-18"
    }
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

  const computeValidThrough = (start: string) => {
    const base = new Date(start || new Date().toISOString())
    base.setMonth(base.getMonth() + 2)
    return base.toISOString()
  }

  const normalizeEmploymentType = (value: string) => {
    if (value.toLowerCase().includes("contract")) return "CONTRACTOR"
    if (value.toLowerCase().includes("part-time")) return "PART_TIME"
    return "FULL_TIME"
  }

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

            <div className="space-y-6">
              {currentJobs.map((job) => (
                <Card key={job.id} className="bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <CardTitle className="text-xl font-semibold lowercase text-neutral-800 mb-2">
                          {job.title}
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span className="lowercase">{job.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span className="lowercase">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span className="lowercase">{job.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-neutral-600 lowercase leading-relaxed">
                      {job.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-neutral-800 lowercase mb-3">key requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="text-sm text-neutral-600 lowercase flex items-center">
                            <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mr-3"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href={`/careers/${job.slug}`}>
                      <Button 
                        className="w-full sm:w-auto rounded-full px-6 py-3 lowercase"
                        onClick={() => trackCTAClick("view job details", `careers-${job.slug}`)}
                      >
                        view details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
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
                    href="mailto:support@design-prism.com"
                    onClick={() => trackCTAClick("careers email", "careers page")}
                  >
                    <Button
                      size="lg"
                      className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-full px-8 py-4 text-sm font-medium lowercase transition-all duration-200 hover:scale-105 shadow-lg"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      support@design-prism.com
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
      {currentJobs.map(job => (
        <JobPostingSchema
          key={`job-posting-${job.id}`}
          jobId={job.id}
          title={job.title}
          description={job.description}
          employmentType={normalizeEmploymentType(job.type)}
          datePosted={`${job.datePosted}T00:00:00.000Z`}
          validThrough={computeValidThrough(job.datePosted)}
          url={`https://www.design-prism.com/careers/${job.slug}`}
          jobLocation={headquarters}
          applicantLocations={applicantLocations}
          qualifications={job.requirements}
        />
      ))}
    </div>
  )
}
