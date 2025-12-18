"use client"

import Footer from "@/components/footer"
import { CaseStudySectionNav } from "@/components/case-studies/CaseStudySectionNav"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { trackCTAClick } from "@/utils/analytics"
import { ArrowLeft, ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })
const CLIENT_SITE = "https://exquisitedentistryla.com/"

const ExquisiteChannelShareChart = dynamic(
  () => import("@/components/case-studies/exquisite-channel-share-chart").then((m) => m.ExquisiteChannelShareChart),
  { ssr: false, loading: () => <Skeleton className="h-32 w-full rounded-lg" /> }
)
const ExquisiteSessionsGrowthChart = dynamic(
  () => import("@/components/case-studies/exquisite-sessions-growth-chart").then((m) => m.ExquisiteSessionsGrowthChart),
  { ssr: false, loading: () => <Skeleton className="h-48 w-full rounded-lg" /> }
)
const ExquisiteSpeedGauge = dynamic(
  () => import("@/components/case-studies/exquisite-speed-gauge").then((m) => m.ExquisiteSpeedGauge),
  { ssr: false, loading: () => <Skeleton className="h-32 w-full rounded-lg" /> }
)
const FounderImpactGraph = dynamic(
  () => import("@/components/case-studies/FounderImpactGraph").then((m) => m.FounderImpactGraph),
  { ssr: false, loading: () => <Skeleton className="h-64 w-full rounded-2xl" /> }
)

const sectionNav = [
  { id: "overview", label: "Overview" },
  { id: "opportunity", label: "The Opportunity" },
  { id: "approach", label: "Our Approach" },
  { id: "transformation", label: "Transformation" },
  { id: "results", label: "Results" },
  { id: "insights", label: "Insights" },
] as const

export default function ExquisiteDentistryCaseStudy() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-white">
        {/* Hero */}
        <section className="border-b px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 bg-neutral-100 rounded-full text-sm lowercase">case study</div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Aligning Digital Excellence with Luxury Care</h1>
              <p className="text-xl text-neutral-600">How Prism elevated Beverly Hills' Exquisite Dentistry's online presence to match their premium in-person experience.</p>
              <p className="text-neutral-500">Practice owner: <strong>Dr. Alexie Aguil</strong></p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" className="rounded-full lowercase">
                  <Link href={CLIENT_SITE} target="_blank" rel="noreferrer">
                    visit exquisitedentistryla.com
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mt-10 mb-6">
              <Image src="/exquisite-dentistry-consultation.png" alt="Exquisite Dentistry consultation" width={800} height={450} className="rounded-md w-full h-auto" priority />
            </div>
          </div>
        </section>

        <CaseStudySectionNav sections={[...sectionNav]} containerClassName="max-w-3xl" />

        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="col-span-1 lg:col-span-4">
              {/* Overview */}
              <section className="py-8 border-t" data-section="overview">
                <h2 className="text-2xl font-bold tracking-tighter mb-6">Overview</h2>
                <div className="rounded-xl border border-neutral-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-neutral-200">
                        <TableHead className="px-3 py-2 text-neutral-600">At-a-Glance KPI</TableHead>
                        <TableHead className="px-3 py-2 text-neutral-600">Last 12 Months*</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">Search Clicks</TableCell>
                        <TableCell className="px-3 py-2">9.3 K</TableCell>
                      </TableRow>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">Search Impressions</TableCell>
                        <TableCell className="px-3 py-2">1.67 M</TableCell>
                      </TableRow>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">New Users (GA4)</TableCell>
                        <TableCell className="px-3 py-2">2.9 K</TableCell>
                      </TableRow>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">Organic-Search Share of Sessions</TableCell>
                        <TableCell className="px-3 py-2">64 %</TableCell>
                      </TableRow>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">Avg. Engagement Rate (Organic)</TableCell>
                        <TableCell className="px-3 py-2">60.7 %</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <p className="text-xs text-neutral-500 mt-2">*Google Search Console & Google Analytics 4, Jun 2024 – Jun 2025.</p>
              </section>

              {/* Opportunity */}
              <section className="py-8 border-t" data-section="opportunity">
                <h2 className="text-2xl font-bold tracking-tighter mb-6">The Opportunity — Bridging the Digital–Physical Divide</h2>
                <ol className="list-decimal space-y-4 pl-6">
                  <li><p><strong>Out-of-date mobile experience</strong><br /><em>Mobile CTR sat at just <strong>0.3 %</strong> and average rank hovered near page 5.</em></p></li>
                  <li><p><strong>Brand incongruence</strong><br />High-end photography and celebrity testimonials were hidden behind clunky navigation.</p></li>
                  <li><p><strong>Visibility gaps</strong><br />Directory inconsistencies made it harder for Google to surface the practice locally.</p></li>
                </ol>
              </section>

              {/* Approach */}
              <section className="py-8 border-t" data-section="approach">
                <h2 className="text-2xl font-bold tracking-tighter mb-6">Prism's Approach — Crafting a Patient-Centric Digital Ecosystem</h2>
                <div className="rounded-xl border border-neutral-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-neutral-200">
                        <TableHead className="px-3 py-2 text-neutral-600">Pillar</TableHead>
                        <TableHead className="px-3 py-2 text-neutral-600">What We Did</TableHead>
                        <TableHead className="px-3 py-2 text-neutral-600">Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">Bespoke Website Rebuild</TableCell>
                        <TableCell className="px-3 py-2">Hand-coded, mobile-first framework (2.1 s LCP).</TableCell>
                        <TableCell className="px-3 py-2">
                          Load time cut <strong>50 %</strong>; mobile CTR rose to <strong>0.7 %</strong>.
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">UX First</TableCell>
                        <TableCell className="px-3 py-2">Instagram-style navigation, thumb-zone CTAs.</TableCell>
                        <TableCell className="px-3 py-2">Avg. pages per mobile session doubled.</TableCell>
                      </TableRow>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">Content Remix</TableCell>
                        <TableCell className="px-3 py-2">Integrated pro photos &amp; video testimonials across service pages.</TableCell>
                        <TableCell className="px-3 py-2">
                          <strong>+68 %</strong> clicks on &quot;veneers&quot; &amp; &quot;teeth-whitening&quot; queries.
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">Listing Clean-Up</TableCell>
                        <TableCell className="px-3 py-2">Synced NAP data across 40+ directories.</TableCell>
                        <TableCell className="px-3 py-2">Consistent local-pack visibility.</TableCell>
                      </TableRow>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">Ad Campaigns</TableCell>
                        <TableCell className="px-3 py-2">High-intent Instagram retargeting.</TableCell>
                        <TableCell className="px-3 py-2">Funnel filled while organic traffic ramped.</TableCell>
                      </TableRow>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">Systems Integration</TableCell>
                        <TableCell className="px-3 py-2">Connected online scheduling &amp; VOIP tracking.</TableCell>
                        <TableCell className="px-3 py-2">Leads drop straight into the PMS.</TableCell>
                      </TableRow>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">AI-Ready Schema</TableCell>
                        <TableCell className="px-3 py-2">Added FAQ &amp; Review markup.</TableCell>
                        <TableCell className="px-3 py-2">Prepares site for Google SGE &amp; chat-based search.</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                {/* Removed interactive KPI chart per latest update */}
              </section>

              {/* Transformation */}
              <section className="py-8 border-t" data-section="transformation">
                <h2 className="text-2xl font-bold tracking-tighter mb-6">The Transformation — 90-Day Pre- vs Post-Launch <span className="block text-sm font-normal">(Jan 1 – Mar 31 vs Apr 1 – Jun 30 2025)</span></h2>
                <div className="rounded-xl border border-neutral-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-neutral-200">
                        <TableHead className="px-3 py-2 text-neutral-600">Metric</TableHead>
                        <TableHead className="px-3 py-2 text-neutral-600">Pre</TableHead>
                        <TableHead className="px-3 py-2 text-neutral-600">Post</TableHead>
                        <TableHead className="px-3 py-2 text-neutral-600">Δ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">Avg. Google Rank (all queries)</TableCell>
                        <TableCell className="px-3 py-2">48.2</TableCell>
                        <TableCell className="px-3 py-2">37.0</TableCell>
                        <TableCell className="px-3 py-2 font-medium">▲ 11.2</TableCell>
                      </TableRow>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">Organic Click-Through Rate</TableCell>
                        <TableCell className="px-3 py-2">0.32 %</TableCell>
                        <TableCell className="px-3 py-2">0.71 %</TableCell>
                        <TableCell className="px-3 py-2 font-medium">▲ 119 %</TableCell>
                      </TableRow>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">Organic Sessions</TableCell>
                        <TableCell className="px-3 py-2">1,134</TableCell>
                        <TableCell className="px-3 py-2">2,195</TableCell>
                        <TableCell className="px-3 py-2 font-medium">▲ 93 %</TableCell>
                      </TableRow>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">Engagement Rate</TableCell>
                        <TableCell className="px-3 py-2">52.4 %</TableCell>
                        <TableCell className="px-3 py-2">60.7 %</TableCell>
                        <TableCell className="px-3 py-2 font-medium">▲ 8.3 pp</TableCell>
                      </TableRow>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">Events / Session</TableCell>
                        <TableCell className="px-3 py-2">3.98</TableCell>
                        <TableCell className="px-3 py-2">4.64</TableCell>
                        <TableCell className="px-3 py-2 font-medium">▲ 16 %</TableCell>
                      </TableRow>
                      <TableRow className="border-neutral-200">
                        <TableCell className="px-3 py-2 font-medium">Avg. Page Load (LCP)</TableCell>
                        <TableCell className="px-3 py-2">4.2 s</TableCell>
                        <TableCell className="px-3 py-2">2.1 s</TableCell>
                        <TableCell className="px-3 py-2 font-medium">▼ 50 %</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <p className="text-sm text-neutral-600 mt-4">Practice staff note a clear uptick in veneer and whitening consultations, confirming the quality of incoming leads.</p>
                <div className="mt-6 space-y-6">
                  <ExquisiteSessionsGrowthChart />
                  <ExquisiteSpeedGauge />
                </div>
              </section>

              {/* Results */}
              <section className="py-8 border-t" data-section="results">
                <h2 className="text-2xl font-bold tracking-tighter mb-6">Results That Matter</h2>
                <div className="mb-8">
                  <FounderImpactGraph />
                </div>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Luxury Brand Cohesion – The website now mirrors the spa-like, white-glove in-office feel.</li>
                  <li>High-Value Lead Surge – Form-fills and phone clicks up <strong>71 %</strong> (internal PMS).</li>
                  <li>Market Precision – <strong>46 %</strong> of new visitors originate from the LA metro (GA4 city heat map).</li>
                  <li>Future-Ready Foundation – Structured data and analytics wiring position the practice for AI-driven growth.</li>
                </ul>
                <div className="mt-8">
                  <ExquisiteChannelShareChart />
                </div>
              </section>

              {/* Partner Insights */}
              <section className="py-8 border-t" data-section="insights">
                <h2 className="text-2xl font-bold tracking-tighter mb-6">Partner Insights</h2>
                <p>Dr. Alexie Aguil and team now view the website as an authentic extension of their signature luxury experience—and prospective patients agree.</p>
              </section>

              {/* CTA */}
              <section className="py-12 border-t border-b my-8" data-section="cta">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold tracking-tighter">Ready to Close the Digital Gap?</h2>
                  <p>If your offline experience screams five-star but your website whispers two-star, let's talk.<br />➡ <strong>Book a 15-min strategy call</strong> or explore more success stories.</p>
                  <p className="text-sm text-neutral-600">
                    Built with Prism’s{" "}
                    <Link href="/dental-website" className="font-semibold text-neutral-900 underline underline-offset-4">
                      dental practice website system
                    </Link>
                    .
                  </p>
                  <div className="pt-6">
                    <Link href="/free-analysis">
                      <Button
                        className="rounded-full px-8 py-6 text-lg"
                        onClick={() => trackCTAClick(FREE_AUDIT_CTA_TEXT, "case study bottom")}
                      >
                        {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>

              {/* Data Note */}
              <section className="py-8" data-section="data-note">
                <h3 className="font-medium mb-2">Data Note</h3>
                <p>Figures sourced from Google Search Console & GA4 for Exquisite Dentistry, Jun 2024 – Jun 2025. Improvement percentages compare 90-day windows before and after the Mar 2025 relaunch.</p>
                <p className="mt-2">Need the raw numbers or custom charts? Let us know—Prism can spin up an embeddable Looker Studio view in minutes.</p>
              </section>

              {/* Navigation */}
              <div className="flex justify-between py-8">
                <Link href="/case-studies">
                  <Button variant="outline" className="rounded-full"><ArrowLeft className="mr-2 h-4 w-4" /> all case studies</Button>
                </Link>
                <Link href="/free-analysis">
                  <Button variant="outline" className="rounded-full">
                    {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <SocialShare url="https://www.design-prism.com/case-studies/exquisite-dentistry" imageUrl="https://www.design-prism.com/exquisite-dentistry-consultation.png" title="Exquisite Dentistry Case Study" description="How Prism elevated Beverly Hills' Exquisite Dentistry's online presence." />
        </div>
      </main>
      <Footer />
      <CaseStudySchema
        title="aligning digital excellence with luxury care | exquisite dentistry case study"
        description="how prism elevated beverly hills' exquisite dentistry's online presence to match their premium in-person experience."
        url="https://www.design-prism.com/case-studies/exquisite-dentistry"
        imageUrl="https://www.design-prism.com/exquisite-dentistry-consultation.png"
        datePublished="2025-06-01T00:00:00.000Z"
        dateModified="2025-06-01T00:00:00.000Z"
        clientName="Exquisite Dentistry"
        outcome="higher-quality leads and luxury brand cohesion"
      />
    </div>
  )
}
