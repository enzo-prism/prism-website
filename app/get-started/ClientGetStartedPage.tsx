"use client"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import VideoWithPoster from "@/components/video-with-poster"
import { useMobile } from "@/hooks/use-mobile"
import { useMobileAnimations } from "@/hooks/use-mobile-animations"
import { trackCTAClick } from "@/utils/analytics"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, CheckCircle, Clock, Rocket, Share2, TrendingUp, Users, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface FormData {
  name: string
  email: string
  company: string
  website: string
  primaryGoal: string
  timeline: string
  budgetRange: string
  growthChallenge: string
  whyPartnerWithPrism: string
  anythingElse: string
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
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    website: '',
    primaryGoal: '',
    timeline: '',
    budgetRange: '',
    growthChallenge: '',
    whyPartnerWithPrism: '',
    anythingElse: ''
  })
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

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
        body: JSON.stringify({ email: formData.email }),
      })

      if (!response.ok) throw new Error('Failed to submit')

      // Send to Prism leads endpoint
      await fetch('/api/prism-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'exclusive-partnership-application',
          timestamp: new Date().toISOString()
        }),
      })

      setSubmitStatus('success')
      trackCTAClick('exclusive partnership application submitted', 'get started page')
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          website: '',
          primaryGoal: '',
          timeline: '',
          budgetRange: '',
          growthChallenge: '',
          whyPartnerWithPrism: '',
          anythingElse: ''
        })
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  const partnerTypes = [
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "Visionary Startups",
      description: "You're disrupting your space, but your site feels half-baked. We'll build a sleek, conversion-optimized machine that turns traffic into leads on autopilot.",
      example: "Like the online wellness community we helped hit 2x sign-ups in months."
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Service Innovators", 
      description: "You're delivering premium value, but your digital flow is leaking money. We redesign for seamless experiences that boost inquiries and repeat business.",
      example: "Think: The leadership consultants who saw 40% more bookings after our overhaul."
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Growth Trailblazers",
      description: "Scaling hurts without the right tech backbone. We implement world-class tools wrapped in beautiful design to drive LTV through the roof.",
      example: "Our M&A firm client? 3x conversions on their deal pipeline."
    }
  ]

  const leaderQualities = [
    "You're solving real problems with a service or product people actually crave",
    "Excellence is your baseline—you obsess over details because they stack into massive gains",
    "You view design and tech as high-ROI investments, not costs",
    "You're committed to a digital presence that scales and sells, not just \"looks nice\"",
    "You want true collaboration: Long-haul wins over quick fixes",
    "You're hyped to join a crew pioneering beautiful, profitable tech—starting today"
  ]

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
                  Beautiful work. <span className="font-normal">Measurable growth.</span>
                </motion.h1>
                
                <motion.p 
                  className="text-base sm:text-lg md:text-xl text-neutral-600 mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  Tired of pretty sites that don’t perform—or clunky tools that hurt your brand? Prism fuses world-class design with engineering and analytics to lift leads, conversion rate, and LTV. Clean builds. Clear dashboards. Results you can point to.
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
                    Apply to work with Prism
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      trackCTAClick('how we work', 'get started page')
                      window.location.href = '/prism-flywheel'
                    }}
                    className="h-11 px-6 rounded-full border-neutral-300 text-neutral-900 hover:bg-neutral-50"
                  >
                    How we work
                  </Button>
                  <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>Limited new client openings monthly</span></div>
                    <div className="hidden sm:block w-px h-4 bg-neutral-300" />
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>Applications reviewed on the 1st</span></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section - Light and concise */}
        <section className="px-4 py-12 sm:py-16 md:py-20 bg-neutral-50 border-t border-neutral-100">
          <div className="container mx-auto max-w-3xl">
            <motion.div 
              className="space-y-8"
              initial="initial"
              whileInView="animate"
              viewport={getViewportConfig()}
              variants={staggerChildren}
            >
              <motion.p
                className="text-base sm:text-lg text-neutral-700 leading-relaxed text-center"
                variants={fadeInY}
              >
                We build calm, fast experiences that convert.
                <br />
                Clarity that reduces friction. Speed that earns trust. Conversion journeys tied to real metrics.
              </motion.p>

              <motion.div 
                className="bg-white rounded-xl p-8 text-center border border-neutral-100"
                variants={fadeInY}
                style={{ willChange: 'transform, opacity' }}
              >
                <p className="text-lg sm:text-xl font-medium text-neutral-900">
                  We partner with leaders who value clarity, craft, and compounding ROI.
                </p>
                <p className="text-base text-neutral-600 mt-3">
                  A small, focused roster so every build gets elite attention.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Who We're Looking For Section - Minimal grid */}
        <section className="px-4 py-12 sm:py-16 md:py-20 bg-white border-t border-neutral-100">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={getViewportConfig()}
              variants={staggerChildren}
            >
              <motion.div className="text-center mb-12" variants={fadeInY}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-neutral-900 mb-3">
                  Who We Partner With
                </h2>
                <p className="text-base sm:text-lg text-neutral-600 max-w-[70ch] mx-auto">
                  Across industries, the playbook stays simple: clarity, speed, conversion.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-3 mb-8">
                {partnerTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-neutral-100 hover:border-neutral-200 transition-colors"
                    variants={fadeInY}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100 mb-6">
                      {type.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-medium mb-2">{type.title}</h3>
                    <p className="text-sm sm:text-base text-neutral-600">{type.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Playbook */}
              <motion.div className="mt-8" variants={fadeInY}>
                <div className="bg-white rounded-xl p-6 md:p-8 border border-neutral-100">
                  <h3 className="text-xl sm:text-2xl font-medium mb-4 text-neutral-900">The Prism Playbook</h3>
                  <ol className="space-y-3 text-neutral-700 list-decimal list-inside">
                    <li><span className="font-medium">Diagnose</span> — Audit UX, tech, data. Find the real bottlenecks.</li>
                    <li><span className="font-medium">Design</span> — High-trust interfaces that make the next step obvious.</li>
                    <li><span className="font-medium">Build</span> — Modern, scalable stack with performance baked in.</li>
                    <li><span className="font-medium">Instrument</span> — GA/GSC + heatmaps + event tracking for visibility.</li>
                    <li><span className="font-medium">Iterate</span> — Ship, measure, and compound gains monthly.</li>
                  </ol>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <Button onClick={scrollToForm} className="h-10 px-5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white">
                      See if we’re a fit → Apply
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Why Prism */}
        <section className="px-4 py-12 sm:py-16 md:py-20 bg-white border-t border-neutral-100">
          <div className="container mx-auto max-w-4xl">
            <motion.p
              className="text-center text-base sm:text-lg text-neutral-700"
              initial="initial"
              whileInView="animate"
              viewport={getViewportConfig()}
              variants={fadeInY}
            >
              <span className="font-medium">Why Prism</span> — Design as a revenue engine • Engineering you can scale on • Measurement by default • A small, focused roster so every build gets elite attention
            </motion.p>
          </div>
        </section>

        {/* Intake Timing */}
        <section className="px-4 py-12 sm:py-16 md:py-20 bg-neutral-50 border-t border-neutral-100">
          <div className="container mx-auto max-w-3xl">
            <motion.div initial="initial" whileInView="animate" viewport={getViewportConfig()} variants={staggerChildren}>
              <motion.div className="text-center space-y-2" variants={fadeInY}>
                <h3 className="text-xl sm:text-2xl font-medium text-neutral-900">Intake Timing</h3>
                <p className="text-neutral-700">We accept a limited number of new projects each month.</p>
                <p className="text-neutral-700">Applications are reviewed on the 1st. Apply now to be considered in the next cycle.</p>
                <p className="text-neutral-600 text-sm">Next review: {nextReviewDate}</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Application Form Section - Clean and minimal (Two-step) */}
        <section ref={formSectionRef} className="px-4 py-12 sm:py-16 md:py-20 bg-neutral-50 border-t border-neutral-100">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={getViewportConfig()}
              variants={staggerChildren}
            >
              <motion.div className="text-center mb-10" variants={fadeInY}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-neutral-900 mb-2">
                  Apply to Work with Prism
                </h2>
                <p className="text-base sm:text-lg text-neutral-600">
                  A short, two-step application to ensure we’re the right fit.
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-12"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-6">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-medium mb-2">Thanks — we’ve got your application.</h3>
                    <p className="text-neutral-600">
                      We review all applications on the 1st. Next review: {nextReviewDate}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" variants={fadeInY} style={{ willChange: 'transform, opacity' }}>
                    {/* Step indicator */}
                    <div className="flex justify-center mb-6 text-sm text-neutral-600">
                      <div className="inline-flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full ${currentStep === 1 ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-700'}`}>1</span>
                        <span>Quick Fit</span>
                        <span className="mx-2">/</span>
                        <span className={`px-2 py-1 rounded-full ${currentStep === 2 ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-700'}`}>2</span>
                        <span>Context</span>
                      </div>
                    </div>

                    {currentStep === 1 ? (
                      <form
                        className="space-y-6 bg-white rounded-xl p-6 border border-neutral-100"
                        onSubmit={(e) => {
                          e.preventDefault()
                          // Basic validation for required Step 1 fields
                          if (!formData.name || !formData.email || !formData.company || !formData.website || !formData.primaryGoal || !formData.timeline || !formData.budgetRange) {
                            alert('Please complete all fields to continue.')
                            return
                          }
                          setCurrentStep(2)
                          formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                      >
                        <div className="grid gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">Your name</label>
                            <Input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} className="w-full h-11 text-base border-neutral-200 focus:border-neutral-900 focus:ring-0" placeholder="John Doe" />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                            <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} className="w-full h-11 text-base border-neutral-200 focus:border-neutral-900 focus:ring-0" placeholder="john@company.com" />
                          </div>
                          <div>
                            <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">Company</label>
                            <Input id="company" name="company" type="text" required value={formData.company} onChange={handleInputChange} className="w-full h-11 text-base border-neutral-200 focus:border-neutral-900 focus:ring-0" placeholder="Acme Inc." />
                          </div>
                          <div>
                            <label htmlFor="website" className="block text-sm font-medium text-neutral-700 mb-2">Website (URL)</label>
                            <Input id="website" name="website" type="url" required value={formData.website} onChange={handleInputChange} className="w-full h-11 text-base border-neutral-200 focus:border-neutral-900 focus:ring-0" placeholder="https://example.com" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Primary goal</label>
                            <select name="primaryGoal" value={formData.primaryGoal} onChange={handleInputChange} required className="w-full h-11 rounded-md border border-neutral-200 bg-white px-3 text-base focus:border-neutral-900 focus:outline-none focus:ring-0">
                              <option value="" disabled>Select one</option>
                              <option>More qualified leads</option>
                              <option>Higher conversion</option>
                              <option>Lift LTV</option>
                              <option>Full rebuild</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Timeline</label>
                            <select name="timeline" value={formData.timeline} onChange={handleInputChange} required className="w-full h-11 rounded-md border border-neutral-200 bg-white px-3 text-base focus:border-neutral-900 focus:outline-none focus:ring-0">
                              <option value="" disabled>Select one</option>
                              <option>ASAP</option>
                              <option>30–60 days</option>
                              <option>60–90 days</option>
                              <option>Exploring</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Budget range</label>
                            <select name="budgetRange" value={formData.budgetRange} onChange={handleInputChange} required className="w-full h-11 rounded-md border border-neutral-200 bg-white px-3 text-base focus:border-neutral-900 focus:outline-none focus:ring-0">
                              <option value="" disabled>Select one</option>
                              <option>Starter</option>
                              <option>Growth</option>
                              <option>Scale</option>
                            </select>
                          </div>
                        </div>
                        <div className="pt-2">
                          <Button type="submit" className="w-full h-12 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-md transition-colors">
                            Submit & continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                          <p className="mt-3 text-center text-xs text-neutral-500">Step 1 of 2 — 60–90 seconds</p>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl p-6 border border-neutral-100">
                        <div>
                          <label htmlFor="growthChallenge" className="block text-sm font-medium text-neutral-700 mb-2">Your biggest growth challenge (short paragraph)</label>
                          <textarea id="growthChallenge" name="growthChallenge" value={formData.growthChallenge} onChange={handleInputChange} rows={4} className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-0 transition-colors" placeholder="Where does the funnel leak today?" />
                        </div>
                        <div>
                          <label htmlFor="whyPartnerWithPrism" className="block text-sm font-medium text-neutral-700 mb-2">What excites you about partnering with Prism?</label>
                          <textarea id="whyPartnerWithPrism" name="whyPartnerWithPrism" value={formData.whyPartnerWithPrism} onChange={handleInputChange} rows={4} className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-0 transition-colors" placeholder="Share what great looks like." />
                        </div>
                        <div>
                          <label htmlFor="anythingElse" className="block text-sm font-medium text-neutral-700 mb-2">Anything else we should know? (integrations, constraints, must-haves)</label>
                          <textarea id="anythingElse" name="anythingElse" value={formData.anythingElse} onChange={handleInputChange} rows={3} className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-0 transition-colors" placeholder="Optional" />
                        </div>
                        <div className="flex gap-3 pt-2">
                          <Button type="button" onClick={() => setCurrentStep(1)} className="h-12 bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50 font-medium rounded-md w-1/2">Back</Button>
                          <Button type="submit" disabled={isSubmitting} className="h-12 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-md w-1/2">
                            {isSubmitting ? 'Submitting…' : 'Submit application'}
                          </Button>
                        </div>
                        <p className="mt-3 text-center text-xs text-neutral-500">We review applications on the 1st of every month.</p>
                        {submitStatus === 'error' && (
                          <p className="text-red-600 text-sm text-center">Something went wrong. Please try again.</p>
                        )}
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
                We review all applications on the 1st. If there’s a strong fit, we’ll invite you to a 20-minute discovery call. If not, we’ll share useful next steps.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* FAQs */}
        <section className="px-4 py-12 sm:py-16 md:py-20 bg-white border-t border-neutral-100">
          <div className="container mx-auto max-w-3xl">
            <div className="space-y-4">
              <details className="bg-neutral-50 rounded-lg border border-neutral-200 p-4" open>
                <summary className="cursor-pointer text-neutral-900 font-medium">What kind of results should we expect?</summary>
                <p className="mt-2 text-neutral-700">We target measurable lifts in qualified leads, conversion rate, and LTV. Exact outcomes depend on your starting point, traffic quality, and offer.</p>
              </details>
              <details className="bg-neutral-50 rounded-lg border border-neutral-200 p-4">
                <summary className="cursor-pointer text-neutral-900 font-medium">What does working together look like?</summary>
                <p className="mt-2 text-neutral-700">Audit → design → build → instrument → iterate. Clear milestones, weekly updates, and dashboards you can check anytime.</p>
              </details>
              <details className="bg-neutral-50 rounded-lg border border-neutral-200 p-4">
                <summary className="cursor-pointer text-neutral-900 font-medium">Do you take maintenance-only work?</summary>
                <p className="mt-2 text-neutral-700">When the fit is right—especially if we’ve done the initial build.</p>
              </details>
              <details className="bg-neutral-50 rounded-lg border border-neutral-200 p-4">
                <summary className="cursor-pointer text-neutral-900 font-medium">What if we’re not a fit?</summary>
                <p className="mt-2 text-neutral-700">We’ll let you know quickly and share a short, actionable plan.</p>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-12 bg-neutral-50 border-t border-neutral-100">
          <div className="container mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-light tracking-tight text-neutral-900 mb-4">Ready to claim your edge?</h3>
            <div className="flex justify-center mb-3">
              <Button onClick={scrollToForm} className="h-11 px-6 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white">
                Apply to work with Prism
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-neutral-600">Limited openings • Next review on the 1st</p>
          </div>
        </section>
        {/* Social Sharing Section - Minimal */}
        <section className="px-4 py-10 bg-white border-t border-neutral-100">
          <div className="container mx-auto max-w-2xl text-center">
            <Share2 className="h-6 w-6 mx-auto mb-3 text-neutral-400" />
            <h3 className="text-lg font-medium mb-4">Know Someone Who'd Thrive Here?</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <button 
                onClick={() => {
                  trackCTAClick('share twitter', 'get started page')
                  window.open('https://twitter.com/intent/tweet?text=Just%20applied%20to%20join%20@prism%27s%20exclusive%20circle%20of%20revenue-driving%20design%20innovators.%20Limited%20to%2010%20partners%20monthly.%20https://design-prism.com/get-started', '_blank')
                }}
                className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                Share on X
              </button>
              <button 
                onClick={() => {
                  trackCTAClick('share linkedin', 'get started page')
                  window.open('https://www.linkedin.com/sharing/share-offsite/?url=https://design-prism.com/get-started', '_blank')
                }}
                className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                Share on LinkedIn
              </button>
              <button 
                onClick={() => {
                  trackCTAClick('copy link', 'get started page')
                  navigator.clipboard.writeText('https://design-prism.com/get-started')
                  alert('Link copied!')
                }}
                className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                Copy Link
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
