"use client"

import { OfferSchema } from "@/components/schema-markup"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { ArrowRight, BadgeCheck, Check } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useState } from "react"
const ServiceSchemaClient = dynamic(() => import("@/components/schema-markup").then(m => m.ServiceSchema), { ssr: false })

export default function ServicesClient() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    setIsAnnual(!isAnnual)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10" />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Tailored Services for Your Business Growth
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-xl text-muted-foreground">
            Choose from our flexible tiers and add-ons designed to scale with your needs.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="relative mx-auto max-w-md mb-12 md:mb-16">
          <div className="flex items-center justify-center p-1 rounded-full bg-gray-100">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                "relative w-full rounded-full py-2.5 px-4 text-sm font-medium transition-all duration-200",
                !isAnnual ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                "relative w-full rounded-full py-2.5 px-4 text-sm font-medium transition-all duration-200",
                isAnnual ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900",
              )}
            >
              Annual
              <Badge className="absolute -top-2 -right-2 bg-green-100 text-green-800 border-0 text-xs px-1.5 py-0.5">
                Save
              </Badge>
            </button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-3">
            Pricing toggle applies to subscription plans only
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="flex flex-col gap-8 md:grid md:gap-8 lg:gap-12 md:grid-cols-3 max-w-6xl mx-auto">
          {/* Design Sprint */}
          <div className="order-3 md:order-1 flex flex-col gap-8">
            <div className="md:hidden border-t-2 border-dashed border-gray-300 pt-8 -mt-0">
              <div className="text-center mb-8">
                <p className="text-sm font-medium text-gray-900 mb-1">One-Time Service</p>
                <p className="text-sm text-muted-foreground">No subscription required</p>
              </div>
            </div>
            <Card className="relative h-full flex flex-col rounded-xl overflow-hidden border-0 bg-white shadow-md transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pt-8 pb-6 text-center border-b">
              <div className="mb-3">
                <span className="inline-block px-4 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-800">
                  Design Sprint
                </span>
              </div>
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-bold">$750</span>
                <span className="ml-1.5 text-gray-500">/one-off</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-6 space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2" />Custom design assets</li>
                <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2" />Unlimited revisions</li>
                <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2" />Fast turnaround: 3-5 days</li>
              </ul>
              <p className="text-sm text-gray-600">Best for quick branding needs without commitment.</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button asChild variant="outline" className="w-full"> 
                <Link href="/one-time-fee">View Details</Link>
              </Button>
            </CardFooter>
          </Card>
          </div>

          {/* Site Essentials */}
          <Card className="relative h-full flex flex-col rounded-xl overflow-hidden border-0 bg-white shadow-md transition-all duration-300 hover:shadow-lg order-1 md:order-2">
            <CardHeader className="pt-8 pb-6 text-center border-b">
              <div className="mb-3">
                <span className="inline-block px-4 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-800">
                  Site Essentials
                </span>
              </div>
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-bold">${isAnnual ? "12,000" : "1,200"}</span>
                <span className="ml-1.5 text-gray-500">/{isAnnual ? "year" : "month"}</span>
              </div>
              {isAnnual && (
                <div className="mt-2 inline-flex items-center text-sm text-green-600">
                  <BadgeCheck className="mr-1 h-4 w-4" />
                  Save $2,400
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-grow p-6 space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2" />Full website rebuild</li>
                <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2" />Unlimited edits</li>
                <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2" />Basic analytics</li>
              </ul>
              <p className="text-sm text-gray-600">Best for small businesses needing a modern site with ongoing support.</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button asChild variant="outline" className="w-full"> 
                <Link href="/get-started">{FREE_AUDIT_CTA_TEXT}</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Growth Accelerator */}
          <Card className="relative h-full flex flex-col rounded-xl overflow-hidden border-0 bg-gray-900 text-white shadow-xl transition-all duration-300 hover:shadow-2xl order-2 md:order-3">
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <Badge className="bg-white text-gray-900 hover:bg-white">Recommended</Badge>
            </div>
            <CardHeader className="pt-8 pb-6 text-center border-b border-gray-800">
              <div className="mb-3">
                <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-sm font-medium text-white">
                  Growth Accelerator
                </span>
              </div>
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-bold">${isAnnual ? "19,990" : "1,999"}</span>
                <span className="ml-1.5 text-gray-400">/{isAnnual ? "year" : "month"}</span>
              </div>
              {isAnnual && (
                <div className="mt-2 inline-flex items-center text-sm text-green-400">
                  <BadgeCheck className="mr-1 h-4 w-4" />
                  Save ~$4,000
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-grow p-6 space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start"><Check className="h-5 w-5 text-green-400 mr-2" />Everything in Essentials</li>
                <li className="flex items-start"><Check className="h-5 w-5 text-green-400 mr-2" />Advanced SEO & listings</li>
                <li className="flex items-start"><Check className="h-5 w-5 text-green-400 mr-2" />Review boosting & apps</li>
              </ul>
              <p className="text-sm text-gray-400">Best for businesses seeking comprehensive growth.</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button asChild className="w-full bg-white text-gray-900 hover:bg-gray-100">
                <Link href="/get-started">{FREE_AUDIT_CTA_TEXT}</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Detailed Tier Breakdown */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Detailed Tier Breakdown</h2>
            <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
              <AccordionItem value="design-sprint">
                <AccordionTrigger>1. Design Sprint ($750 One-Off)</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">Perfect for testing the waters or handling immediate, non-website needs. This tier delivers high-quality, custom designs without long-term commitment—ideal if you're a solo founder refreshing your branding.</p>
                  <h3 className="font-semibold mb-2">What's Included:</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Custom design requests: Logos, banners, flyers, thumbnails, social graphics, or similar assets.</li>
                    <li>Unlimited revisions until you're 100% satisfied.</li>
                    <li>Fast turnaround: 3-5 business days per request.</li>
                    <li>Delivery via shared drive (e.g., Google Drive or Dropbox) in editable formats (e.g., Figma, PNG, SVG).</li>
                  </ul>
                  <h3 className="font-semibold mb-2">Optional Add-On: Photo Boost (+$499):</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>On-site 2-hour professional photo session (local clients only; e.g., California-based).</li>
                    <li>We guide shots for growth impact (e.g., office interiors, team portraits, product details to build trust and conversions).</li>
                    <li>Professional editing: 20-50 optimized images (color-corrected, resized for web/ads, SEO-tagged).</li>
                    <li>Delivery: High-res files via shared drive, ready for your use.</li>
                    <li>For remote clients: Virtual alternative (+$200)—we provide a detailed photo brief, and you send raw images for us to edit.</li>
                  </ul>
                  <p className="mb-2"><strong>Exclusions:</strong> No website work, SEO, ads, or integrations—upgrade to a subscription for those. One active request at a time.</p>
                  <p className="mb-2"><strong>Guarantees:</strong> 100% satisfaction or full refund. If you love it, get 20% off your first month on any subscription.</p>
                  <p><strong>Best For:</strong> Quick wins, like a dentist needing new flyers or a retailer updating thumbnails.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="site-essentials">
                <AccordionTrigger>2. Site Essentials (${isAnnual ? "12,000/year" : "1,200/mo"})</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">Our entry subscription for businesses ready for a professional online presence. We handle the heavy lifting with a complete rebuild, ensuring no tech debt holds you back—then provide ongoing support to keep things fresh.</p>
                  <h3 className="font-semibold mb-2">What's Included:</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li><strong>Full Website Rebuild:</strong> Month 1 focus—custom site on our AI-powered stack. Typically 5-10 pages, mobile-responsive, fast-loading, and basic SEO-ready.</li>
                    <li>Unlimited post-launch edits and feature adds (e.g., new pages, UI tweaks, simple integrations like forms or calendars).</li>
                    <li>Basic analytics setup (e.g., Google Analytics integration for tracking visitors and behavior).</li>
                    <li>Turnaround: 48-72 hours per request (one active at a time).</li>
                    <li>Pause/cancel anytime with 30-day notice; no long-term contracts.</li>
                  </ul>
                  <h3 className="font-semibold mb-2">Optional Add-On: Photo Boost (+$499):</h3>
                  <p className="mb-4">As described above, with <strong>free integration</strong> into your rebuilt site (e.g., hero images, galleries, team sections) for no extra fee—enhancing visuals to boost engagement.</p>
                  <p className="mb-2"><strong>Exclusions:</strong> Advanced SEO, local listings, review systems, ads, or complex apps (upgrade to Accelerator for those). No heavy custom coding beyond no-code/low-code tools.</p>
                  <p className="mb-2"><strong>Guarantees:</strong> 100% satisfaction on the rebuild (refund first month if not); Monthly check-ins to ensure value.</p>
                  <p><strong>Best For:</strong> Growing small businesses needing a modern site with regular updates.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="growth-accelerator">
                <AccordionTrigger>3. Growth Accelerator (${isAnnual ? "19,990/year" : "1,999/mo"})</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">The premium tier for founders serious about scaling. We rebuild your site as the foundation, then layer on growth tools to maximize leads, conversions, and LTV—perfect for data-driven results.</p>
                  <h3 className="font-semibold mb-2">What's Included:</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Everything in Site Essentials (full rebuild + unlimited edits/analytics).</li>
                    <li><strong>Advanced Optimizations:</strong></li>
                    <ul className="list-disc pl-6">
                      <li>Full SEO: Traditional (on-page, keywords) + AI search.</li>
                      <li>Local listings: Setup/optimization on Google, Yelp, Apple Maps.</li>
                      <li>5-star review boosting: Automated systems to encourage and showcase reviews.</li>
                      <li>App integrations: Custom features like booking calendars, patient portals, or e-commerce tools.</li>
                    </ul>
                    <li>Priority queue: Faster responses (24-48 hours) and dedicated strategy sessions.</li>
                    <li>Monthly ROI reports: Metrics like lead growth, conversion rates, and suggestions.</li>
                  </ul>
                  <h3 className="font-semibold mb-2">Optional Add-On: Photo Boost (+$499):</h3>
                  <p className="mb-4">As above, with <strong>free integration</strong> into your site, listings, ads, and reviews.</p>
                  <h3 className="font-semibold mb-2">Optional Add-On: Ads Management (+$999/mo):</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Hands-off paid ads: We advise on budgets ($500-5k/mo spend, client-funded).</li>
                    <li>Implement/setup (Google Ads, Facebook/Meta), and manage campaigns.</li>
                    <li>Tied to your site: Use rebuild elements for better performance; Aim for 2-3x ROAS.</li>
                    <li>Platforms: Focus on 1-2 (e.g., Google for search, Meta for social).</li>
                  </ul>
                  <p className="mb-2"><strong>Exclusions:</strong> Ad spend (client pays directly); Extremely complex dev.</p>
                  <p className="mb-2"><strong>Guarantees:</strong> Results-focused—e.g., minimum lead improvements or free tweaks.</p>
                  <p><strong>Best For:</strong> Ambitious clients targeting measurable growth.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Why Choose Prism */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Prism?</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <p><strong>Rebuild-First Philosophy:</strong> We never edit old sites—always start fresh to future-proof your online presence and avoid ongoing issues.</p>
              <p><strong>Solo Expertise, Scalable Results:</strong> As a one-person agency, you get personalized attention with AI tools for efficiency.</p>
              <p><strong>Proven Outcomes:</strong> Clients report 2x leads and higher retention.</p>
              <p><strong>Flexible Billing:</strong> Monthly via Stripe; Annual for savings. No hidden fees.</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="multiple" className="w-full max-w-4xl mx-auto">
              <AccordionItem value="get-started">
                <AccordionTrigger>How do I get started?</AccordionTrigger>
                <AccordionContent>Book a free 30-min audit call—we'll review your current setup and recommend a tier.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="photo-boost">
                <AccordionTrigger>What if I'm not local for Photo Boost?</AccordionTrigger>
                <AccordionContent>We offer virtual editing of your photos or can recommend local photographers.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="switch-tiers">
                <AccordionTrigger>Can I switch tiers?</AccordionTrigger>
                <AccordionContent>Yes, upgrade/downgrade anytime (prorated).</AccordionContent>
              </AccordionItem>
              <AccordionItem value="turnaround">
                <AccordionTrigger>Turnaround times?</AccordionTrigger>
                <AccordionContent>Varies by tier, but we prioritize quality—expect clear communication.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="refunds">
                <AccordionTrigger>Refunds/Churn?</AccordionTrigger>
                <AccordionContent>Easy cancellations; Low churn thanks to results (under 5% historically).</AccordionContent>
              </AccordionItem>
              <AccordionItem value="tech-stack">
                <AccordionTrigger>Tech Stack Details?</AccordionTrigger>
                <AccordionContent>Our mix ensures speed: Replit for real-time collab, Vercel v0 for AI deploys, Cursor/Claude/Gemini for code smarts.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 text-center bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Ready to Grow?</h2>
            <Button size="lg" asChild className="px-8">
              <Link href="/get-started">{FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>
      </div>

      {/* Schema Markup (client-only) */}
      <ServiceSchemaClient
        serviceId="design-services"
        name="Design and Growth Services"
        description="Tailored digital solutions for small businesses including websites, apps, and marketing."
        serviceType="Digital Agency Services"
        areaServed={["United States"]}
      />
      <OfferSchema
        offerId="design-sprint"
        name="Design Sprint"
        description="Quick design assets with unlimited revisions"
        businessFunction="http://purl.org/goodrelations/v1#Sell"
        serviceName="Design Services"
        serviceDescription="Custom design requests for logos, banners, etc."
        price="750"
        priceCurrency="USD"
      />
      <OfferSchema
        offerId="site-essentials"
        name="Site Essentials"
        description="Full site rebuild + unlimited edits"
        businessFunction="http://purl.org/goodrelations/v1#Sell"
        serviceName="Website Development"
        serviceDescription="Custom website rebuild and maintenance"
        price={isAnnual ? "12000" : "1200"}
        priceCurrency="USD"
      />
      <OfferSchema
        offerId="growth-accelerator"
        name="Growth Accelerator"
        description="Comprehensive growth package with SEO and more"
        businessFunction="http://purl.org/goodrelations/v1#Sell"
        serviceName="Digital Marketing and Development"
        serviceDescription="Full rebuild, SEO, listings, reviews, and apps"
        price={isAnnual ? "19990" : "1999"}
        priceCurrency="USD"
      />
    </div>
  )
} 
