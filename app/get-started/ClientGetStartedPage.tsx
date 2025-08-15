"use client"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import VideoWithPoster from "@/components/video-with-poster"
import { useMobile } from "@/hooks/use-mobile"
import { useMobileAnimations } from "@/hooks/use-mobile-animations"
import { trackCTAClick } from "@/utils/analytics"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Plan = 'CORE' | 'PLUS' | null

interface ContactData {
  name: string
  email: string
  company: string
  website: string
  phone: string
}

// Simplified animation variants for elegant transitions
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
}

const fadeInY = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function ClientGetStartedPage() {
  const { getViewportConfig } = useMobileAnimations()
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [selectedPlan, setSelectedPlan] = useState<Plan>(null)
  const [searchSurge, setSearchSurge] = useState(false)
  const [contact, setContact] = useState<ContactData>({
    name: '',
    email: '',
    company: '',
    website: '',
    phone: ''
  })
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  // Calculate days until the next monthly review (on the 1st)
  const calculateDaysUntilNextFirst = () => {
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // If today is the 1st, review is today
    if (now.getDate() === 1) return 0

    // Otherwise, compute the next month's 1st
    const nextMonth = now.getMonth() + 1
    const nextMonthYear = now.getFullYear() + (nextMonth > 11 ? 1 : 0)
    const nextMonthIndex = nextMonth % 12
    const nextFirst = new Date(nextMonthYear, nextMonthIndex, 1)

    const msPerDay = 24 * 60 * 60 * 1000
    const diffDays = Math.round((nextFirst.getTime() - startOfToday.getTime()) / msPerDay)
    return Math.max(diffDays, 0)
  }

  const [daysUntilReview] = useState<number>(calculateDaysUntilNextFirst)
  const formatNextFirstDate = () => {
    const now = new Date()
    const isFirstToday = now.getDate() === 1
    const targetMonthIndex = isFirstToday ? now.getMonth() : (now.getMonth() === 11 ? 0 : now.getMonth() + 1)
    const targetYear = isFirstToday ? now.getFullYear() : (now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear())
    const nextFirst = new Date(targetYear, targetMonthIndex, 1)
    return nextFirst.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  }
  const nextReviewDate = formatNextFirstDate()
  const isMobile = useMobile()
  const videoRef = useRef<HTMLDivElement>(null)
  const formSectionRef = useRef<HTMLDivElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // No effect needed; we compute once on mount using the user's local timezone

  // Lazy load video
  useEffect(() => {
    if (!videoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadVideo) {
            setShouldLoadVideo(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: "200px",
        threshold: 0.1,
      }
    )

    observer.observe(videoRef.current)
    return () => observer.disconnect()
  }, [shouldLoadVideo])

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setContact(prev => ({ ...prev, [name]: value }))
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-\._~:\/?#\[\]@!$&'()*+,;=.]+)?$/i

  const isStep1Valid = () => selectedPlan !== null
  const isStep2Valid = () => (
    contact.name.trim().length > 1 &&
    emailRegex.test(contact.email.trim()) &&
    contact.company.trim().length > 1 &&
    urlRegex.test(contact.website.trim())
  )

  // Persist form progress locally (mobile-friendly safety)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('prism_checkout_form')
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<ContactData> & { plan?: Plan, searchSurge?: boolean }
        setContact(prev => ({ ...prev, ...parsed }))
        if (parsed.plan === 'CORE' || parsed.plan === 'PLUS') setSelectedPlan(parsed.plan)
        if (typeof parsed.searchSurge === 'boolean') setSearchSurge(parsed.searchSurge)
      }
    } catch {}
    // Focus first field for convenience
    setTimeout(() => nameInputRef.current?.focus(), 300)
  }, [])

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem('prism_checkout_form', JSON.stringify({ ...contact, plan: selectedPlan, searchSurge }))
      } catch {}
    }, 300)
    return () => clearTimeout(id)
  }, [contact, selectedPlan, searchSurge])

  // Sticky CTA removed for a simpler mobile experience

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send to store-email endpoint
      const response = await fetch('/api/store-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: contact.email }),
      })

      if (!response.ok) throw new Error('Failed to submit')

      // Send to Prism leads endpoint
      const res2 = await fetch('/api/prism-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'get-started-checkout',
          plan: selectedPlan,
          addon_search_surge: searchSurge,
          monthly_price: (selectedPlan === 'CORE' ? 1500 : selectedPlan === 'PLUS' ? 2500 : 0) + (searchSurge ? 1500 : 0),
          name: contact.name,
          email: contact.email,
          company: contact.company,
          website: contact.website,
          phone: contact.phone,
        }),
      })

      if (!res2.ok) throw new Error('Failed to submit')

      setSubmitStatus('success')
      trackCTAClick('checkout submitted', 'get started page')
      
      // Reset form after success
      setTimeout(() => {
        setSelectedPlan(null)
        setSearchSurge(false)
        setContact({ name: '', email: '', company: '', website: '', phone: '' })
        try { localStorage.removeItem('prism_checkout_form') } catch {}
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  const basePrice = selectedPlan === 'CORE' ? 1500 : selectedPlan === 'PLUS' ? 2500 : 0
  const totalPrice = basePrice + (searchSurge ? 1500 : 0)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section with Video - Minimalist approach */}
        <section
          ref={videoRef}
          className="relative px-4 py-12 sm:py-16 md:py-20 lg:py-24"
        >
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col items-center">
              {/* Video - Cleaner presentation */}
              <motion.div 
                className="relative mb-8 sm:mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'transform, opacity' }}
              >
                {shouldLoadVideo ? (
                  <div className="rounded-lg sm:rounded-xl overflow-hidden">
                    <VideoWithPoster
                      videoId="1097023041"
                      posterSrc="/prism%20get%20started.webp"
                      width={isMobile ? 320 : 420}
                      height={isMobile ? 320 : 420}
                      autoplay={true}
                      loop={true}
                      muted={true}
                      controls={false}
                      posterAlt="Rocket launch animation - Get started with Prism"
                      trackAnalytics={true}
                    />
                  </div>
                ) : (
                  <div className={`${isMobile ? 'w-[320px] h-[320px]' : 'w-[420px] h-[420px]'} bg-neutral-50 rounded-lg sm:rounded-xl flex items-center justify-center`}>
                    <div className="text-neutral-400 text-sm">Loading...</div>
                  </div>
                )}
              </motion.div>
              
              {/* Typography - Clean and minimal */}
              <div className="text-center space-y-6 max-w-[68ch] mx-auto">
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-neutral-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  More leads. <span className="font-normal">Less effort.</span>
                </motion.h1>
                
                <motion.p 
                  className="text-base sm:text-lg md:text-xl text-neutral-600 mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  We fix the foundation in 30 days, then compound results every month—without adding to your to‑do list.
                </motion.p>

                {/* Simplified CTA */}
                <motion.div 
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <Button onClick={scrollToForm} className="h-11 px-6 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white">
                    View plans — Core & Plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      trackCTAClick('see case studies', 'get started page')
                      window.location.href = '/case-studies'
                    }}
                    className="h-11 px-6 rounded-full border-neutral-300 text-neutral-900 hover:bg-neutral-50"
                  >
                    See case studies
                  </Button>
                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <span>Month‑to‑month</span>
                    <span className="hidden sm:block w-px h-4 bg-neutral-300" />
                    <span>You own everything</span>
                    <span className="hidden sm:block w-px h-4 bg-neutral-300" />
                    <span>Requests reviewed on the 1st</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Plan selection + checkout flow */}
        <section ref={formSectionRef} className="px-4 py-12 sm:py-16 md:py-20 bg-neutral-50 border-t border-neutral-100">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={getViewportConfig()}
              variants={staggerChildren}
            >
              <motion.div className="text-center mb-10 space-y-4" variants={fadeInY}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
                  Choose your pace. Then checkout.
                </h2>
                <p className="text-base sm:text-lg text-neutral-700 max-w-[70ch] mx-auto leading-relaxed">
                  Here’s the clean, no‑jargon split. Think of Core vs Plus as how fast we push—not what we do.
                </p>
                <div className="mx-auto max-w-[70ch] text-left text-neutral-700 bg-white border border-neutral-100 rounded-xl">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="included" className="px-6">
                      <AccordionTrigger className="no-underline py-5 text-neutral-900">
                        <span className="font-medium">What’s always included (both plans)</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            <span className="font-medium">30‑day Launch (one‑time project):</span> we fix the foundation—fast website, clean analytics, complete Google/Apple/Yelp profiles—then give you a simple dashboard and a 90‑day plan.
                          </li>
                          <li>
                            <span className="font-medium">Autopilot each month:</span> you get a 1‑page plan to approve; we ship the work. Month‑to‑month. You own everything.
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </motion.div>

              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-12"
                    role="status" aria-live="polite"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-6">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-medium mb-2">Thanks — we’ve got your request.</h3>
                    <p className="text-neutral-600">Reviewed on the 1st. Next review: {nextReviewDate}</p>
                  </motion.div>
                ) : (
                  <motion.div key="form" variants={fadeInY} style={{ willChange: 'transform, opacity' }}>
                    {/* Step indicator */}
                    <div className="flex justify-center mb-6 text-sm text-neutral-600">
                      <div className="inline-flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full ${currentStep === 1 ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-700'}`}>1</span>
                        <span>Select plan</span>
                        <span className="mx-2">/</span>
                        <span className={`px-2 py-1 rounded-full ${currentStep === 2 ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-700'}`}>2</span>
                        <span>Contact</span>
                        <span className="mx-2">/</span>
                        <span className={`px-2 py-1 rounded-full ${currentStep === 3 ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-700'}`}>3</span>
                        <span>Review</span>
                      </div>
                    </div>

                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="grid gap-4">
                          {/* Plan Cards */}
                          <Card className={`border ${selectedPlan === 'CORE' ? 'border-neutral-900' : 'border-neutral-200'} transition-colors`}>
                            <CardHeader>
                              <CardTitle className="flex items-center justify-between">
                                <span>CORE — steady compounding</span>
                                <span className="text-neutral-700 text-lg">$1.5k/mo</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <p className="text-neutral-700">Best for: “Make it modern and keep it growing without taking over my life.”</p>
                              <Accordion type="single" collapsible>
                                <AccordionItem value="core-pace">
                                  <AccordionTrigger className="no-underline py-3 text-neutral-900">Pace (each month)</AccordionTrigger>
                                  <AccordionContent>
                                    <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                                      <li>3–4 meaningful moves shipped (content, conversion, listings, speed/crawl).</li>
                                      <li>1–2 small experiments (e.g., headline/offer test).</li>
                                      <li>Content cadence: 1 useful update or mini‑piece + local listings post weekly.</li>
                                      <li>Review care: new reviews prompted; replies within 72 hours.</li>
                                      <li>Checks: monthly KPI snapshot + “what we shipped & why.”</li>
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="core-month">
                                  <AccordionTrigger className="no-underline py-3 text-neutral-900">A typical CORE month</AccordionTrigger>
                                  <AccordionContent>
                                    <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                                      <li>Refresh a service page + add testimonials</li>
                                      <li>Weekly Google Business Profile post + Apple showcase update</li>
                                      <li>Fix a form friction point</li>
                                      <li>Run a simple hero A/B test</li>
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </CardContent>
                            <CardFooter>
                              <Button onClick={() => setSelectedPlan('CORE')} className="w-full h-11 bg-neutral-900 hover:bg-neutral-800 text-white">
                                {selectedPlan === 'CORE' ? 'Selected' : 'Choose CORE'}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>

                          <Card className={`border ${selectedPlan === 'PLUS' ? 'border-neutral-900' : 'border-neutral-200'} transition-colors`}>
                            <CardHeader>
                              <CardTitle className="flex items-center justify-between">
                                <span>PLUS — faster compounding</span>
                                <span className="text-neutral-700 text-lg">$2.5k/mo</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <p className="text-neutral-700">Best for: “We want momentum now—fill the schedule or push a high‑value service.”</p>
                              <Accordion type="single" collapsible>
                                <AccordionItem value="plus-pace">
                                  <AccordionTrigger className="no-underline py-3 text-neutral-900">Pace (each month)</AccordionTrigger>
                                  <AccordionContent>
                                    <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                                      <li>5–7 meaningful moves shipped (more surface area, done sooner).</li>
                                      <li>2–3 experiments (continuously testing copy/offers/landing variants).</li>
                                      <li>Content cadence: 1 flagship asset most months (e.g., a full service page or case study) plus derivatives for site & listings.</li>
                                      <li>Listings: 2× weekly posting rhythm + more photo/showcase updates.</li>
                                      <li>Review care: replies within 48 hours; active Q&A seeding.</li>
                                      <li>Priority: quicker turnaround on fixes, first dibs on on‑site days.</li>
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="plus-month">
                                  <AccordionTrigger className="no-underline py-3 text-neutral-900">A typical PLUS month</AccordionTrigger>
                                  <AccordionContent>
                                    <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                                      <li>New “Dental Implants” page with FAQs, pricing/financing clarity, before/after proof</li>
                                      <li>Two listing posts per week + fresh photo set and booking deep‑links</li>
                                      <li>Landing/hero test and a follow‑up variant based on results</li>
                                      <li>Internal‑links pass + speed tune to protect gains</li>
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </CardContent>
                            <CardFooter>
                              <Button onClick={() => setSelectedPlan('PLUS')} className="w-full h-11 bg-neutral-900 hover:bg-neutral-800 text-white">
                                {selectedPlan === 'PLUS' ? 'Selected' : 'Choose PLUS'}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </div>

                        {/* Add-on toggle */}
                        <div className="bg-white border border-neutral-100 rounded-xl p-6">
                          <div className="space-y-4">
                            <p className="font-medium text-neutral-900">Optional add‑on (either plan)</p>

                            {/* Mobile-first stacked layout */}
                            <div className={`rounded-lg border ${searchSurge ? 'border-neutral-900' : 'border-neutral-200'} bg-neutral-50 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}>
                              <div className="flex-1 min-w-0">
                                <div id="surge-title" className="text-neutral-900 font-medium">Search Surge</div>
                                <div className="text-neutral-600 text-sm mt-1">
                                  Google Ads managed + monthly landing test
                                  <span className="ml-1 text-neutral-500">(ad spend separate)</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between sm:justify-end gap-3">
                                <span className={`text-xs px-2 py-1 rounded-full ${searchSurge ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-800'}`}>+$1.5k/mo</span>
                                <Switch
                                  id="surge"
                                  aria-labelledby="surge-title"
                                  aria-describedby="surge-help"
                                  checked={searchSurge}
                                  onCheckedChange={(checked) => setSearchSurge(!!checked)}
                                />
                              </div>
                            </div>

                            {/* Details dropdown for those who want more context */}
                            <div className="rounded-lg border border-neutral-100 bg-white">
                              <Accordion type="single" collapsible>
                                <AccordionItem value="surge-details" className="px-4">
                                  <AccordionTrigger className="no-underline py-3 text-neutral-900 text-sm">Details</AccordionTrigger>
                                  <AccordionContent>
                                    <p id="surge-help" className="text-neutral-700 text-sm leading-relaxed">
                                      Search Surge (Google Ads) adds hands‑on campaign management and at least one landing test each month to accelerate qualified demand. Ad spend is billed separately.
                                    </p>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </div>
                          </div>
                        </div>

                        {/* How to choose quickly */}
                        <div className="bg-white border border-neutral-100 rounded-xl">
                          <Accordion type="single" collapsible>
                            <AccordionItem value="choose-quickly" className="px-6">
                              <AccordionTrigger className="no-underline py-5 text-neutral-900">
                                <span className="font-medium">How to choose quickly</span>
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                                  <li>Pick CORE if you want dependable progress with minimal time from you.</li>
                                  <li>Pick PLUS if you want to accelerate (new service push, seasonal demand, new location) and you’re okay with us moving faster and testing more.</li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>

                        {/* Simple promises */}
                        <div className="bg-white border border-neutral-100 rounded-xl">
                          <Accordion type="single" collapsible>
                            <AccordionItem value="promises" className="px-6">
                              <AccordionTrigger className="no-underline py-5 text-neutral-900">
                                <span className="font-medium">Simple promises (both plans)</span>
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                                  <li>30‑Day Clarity: foundation fixed + baseline dashboard—or Month 2 is free.</li>
                                  <li>90‑Day Lift: if no lift in two leading indicators (e.g., calls, profile actions, site conversion), we add an extra month of lift work at no charge.</li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>

                        <div className="pt-2">
                          <Button disabled={!isStep1Valid()} onClick={() => setCurrentStep(2)} className="w-full h-12 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors">
                            Continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                          <p className="mt-3 text-center text-xs text-neutral-500">Step 1 of 3</p>
                        </div>
                          </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6 bg-white rounded-xl p-6 border border-neutral-100">
                        <div className="grid gap-6">
                          <div>
                            <Label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">Your name</Label>
                            <Input id="name" name="name" type="text" autoComplete="name" ref={nameInputRef} required value={contact.name} onChange={handleContactChange} className="w-full h-11 text-base border-neutral-200 focus:border-neutral-900 focus:ring-0" placeholder="Jane Smith" />
                          </div>
                          <div>
                            <Label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Email</Label>
                            <Input id="email" name="email" type="email" autoComplete="email" inputMode="email" required value={contact.email} onChange={handleContactChange} className="w-full h-11 text-base border-neutral-200 focus:border-neutral-900 focus:ring-0" placeholder="jane@company.com" />
                          </div>
                          <div>
                            <Label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">Company</Label>
                            <Input id="company" name="company" type="text" autoComplete="organization" required value={contact.company} onChange={handleContactChange} className="w-full h-11 text-base border-neutral-200 focus:border-neutral-900 focus:ring-0" placeholder="Acme Inc." />
                          </div>
                          <div>
                            <Label htmlFor="website" className="block text-sm font-medium text-neutral-700 mb-2">Website (URL)</Label>
                            <Input id="website" name="website" type="url" autoComplete="url" inputMode="url" required value={contact.website} onChange={handleContactChange} className="w-full h-11 text-base border-neutral-200 focus:border-neutral-900 focus:ring-0" placeholder="https://example.com" />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">Phone (optional)</Label>
                            <Input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={contact.phone} onChange={handleContactChange} className="w-full h-11 text-base border-neutral-200 focus:border-neutral-900 focus:ring-0" placeholder="+1 555 123 4567" />
                          </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                          <Button type="button" onClick={() => setCurrentStep(1)} className="h-12 bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50 font-medium rounded-md w-1/2">Back</Button>
                          <Button type="button" onClick={() => setCurrentStep(3)} disabled={!isStep2Valid()} className="h-12 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-md w-1/2 disabled:bg-neutral-300 disabled:cursor-not-allowed">Continue</Button>
                        </div>
                        <p className="mt-3 text-center text-xs text-neutral-500">Step 2 of 3</p>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl p-6 border border-neutral-100">
                        <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                          <p className="font-medium text-neutral-900 mb-2">Review</p>
                          <ul className="text-neutral-700 text-sm space-y-1">
                            <li>Plan: <span className="font-medium">{selectedPlan || '-'}</span></li>
                            <li>Add‑on: <span className="font-medium">Search Surge {searchSurge ? 'ON (+$1.5k/mo)' : 'OFF'}</span></li>
                            <li>Total monthly: <span className="font-medium">${totalPrice.toLocaleString()}/mo</span></li>
                          </ul>
                          <hr className="my-3 border-neutral-200" />
                          <ul className="text-neutral-700 text-sm space-y-1">
                            <li>Name: <span className="font-medium">{contact.name}</span></li>
                            <li>Email: <span className="font-medium">{contact.email}</span></li>
                            <li>Company: <span className="font-medium">{contact.company}</span></li>
                            <li>Website: <span className="font-medium">{contact.website}</span></li>
                            {contact.phone && <li>Phone: <span className="font-medium">{contact.phone}</span></li>}
                          </ul>
                        </div>
                        <div className="flex gap-3 pt-2">
                          <Button type="button" onClick={() => setCurrentStep(2)} className="h-12 bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50 font-medium rounded-md w-1/2">Back</Button>
                          <Button type="submit" disabled={isSubmitting} className="h-12 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-md w-1/2">
                            {isSubmitting ? 'Submitting…' : 'Submit request'}
                          </Button>
                        </div>
                        {submitStatus === 'error' && (
                          <p className="text-red-600 text-sm text-center">Something went wrong. Please try again.</p>
                        )}
                        <p className="mt-3 text-center text-xs text-neutral-500">Step 3 of 3</p>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.p 
                className="text-sm text-neutral-600 text-center mt-8"
                variants={fadeInY}
                style={{ willChange: 'transform, opacity' }}
              >
                We review all requests on the 1st. If there’s a strong fit, we’ll invite you to a 20‑minute discovery call. If not, we’ll share useful next steps.
              </motion.p>
            </motion.div>
          </div>
        </section>
        {/* Footer spacing CTA removed to keep flow minimal */}
      </main>
      {/* Sticky mobile CTA removed */}
      <Footer />
    </div>
  )
}
