"use client"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import VideoWithPoster from "@/components/video-with-poster"
import { useMobile } from "@/hooks/use-mobile"
import { trackCTAClick } from "@/utils/analytics"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, CheckCircle, Clock, Heart, Rocket, Share2, TrendingUp, Users, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface FormData {
  name: string
  email: string
  company: string
  website: string
  growthChallenge: string
  whyPartnerWithPrism: string
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
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    website: '',
    growthChallenge: '',
    whyPartnerWithPrism: ''
  })
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          growthChallenge: '',
          whyPartnerWithPrism: ''
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
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  Elevate Your Brand with Design That{" "}
                  <span className="font-normal">Actually Makes Money</span>
                </motion.h1>
                
                <motion.p 
                  className="text-base sm:text-lg md:text-xl text-neutral-600 mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                  Tired of beautiful websites that look great but don't convert? Or clunky tools that drive revenue but bore your users to tears? At Prism, we fuse stunning design with world-class tech to create digital experiences that skyrocket leads, conversions, and lifetime value (LTV)—no matter your industry.
                </motion.p>

                {/* Simplified CTA */}
                <motion.div 
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                  <Button onClick={scrollToForm} className="h-11 px-6 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white">
                    Apply now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>10 new clients monthly</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-neutral-300" />
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {daysUntilReview === 0
                          ? 'Next review today'
                          : `Next review in ${daysUntilReview} ${daysUntilReview === 1 ? 'day' : 'days'}`}
                      </span>
                    </div>
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
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerChildren}
            >
              <motion.p
                className="text-base sm:text-lg text-neutral-700 leading-relaxed text-center"
                variants={fadeInY}
              >
                We build calm, fast experiences that convert. Design that feels effortless. Tech that scales. Outcomes you can measure.
              </motion.p>

              <motion.div 
                className="bg-white rounded-xl p-8 text-center border border-neutral-100"
                variants={fadeInY}
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
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerChildren}
            >
              <motion.div className="text-center mb-12" variants={fadeInY}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-neutral-900 mb-3">
                  Who We Partner With
                </h2>
                <p className="text-base sm:text-lg text-neutral-600 max-w-[70ch] mx-auto">
                  Builders who treat design like a revenue engine and want compounding gains, not one-off fixes.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-3 mb-8">
                {partnerTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-neutral-100 hover:border-neutral-200 transition-colors"
                    variants={fadeInY}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100 mb-6">
                      {type.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-medium mb-2">{type.title}</h3>
                    <p className="text-sm sm:text-base text-neutral-600">{type.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="text-center"
                variants={fadeInY}
              >
                <p className="text-base sm:text-lg text-neutral-700 mb-2 max-w-[70ch] mx-auto">
                  Across industries, our playbook stays simple: clarity, speed, and conversion.
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700">
                  <Heart className="w-4 h-4" />
                  Priority access for early applicants
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Application Form Section - Clean and minimal */}
        <section ref={formSectionRef} className="px-4 py-12 sm:py-16 md:py-20 bg-neutral-50 border-t border-neutral-100">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerChildren}
            >
              <motion.div className="text-center mb-10" variants={fadeInY}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-neutral-900 mb-2">
                  Apply to Work with Prism
                </h2>
                <p className="text-base sm:text-lg text-neutral-600">
                  A short application to ensure we’re the right fit.
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
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-6">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-medium mb-2">Welcome to the Inner Circle!</h3>
                    <p className="text-neutral-600">
                      {daysUntilReview === 0
                        ? "Your application has been received. We'll review it today."
                        : `Your application has been received. We'll review it within ${daysUntilReview} ${daysUntilReview === 1 ? 'day' : 'days'}.`}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-white rounded-xl p-6 border border-neutral-100"
                    variants={fadeInY}
                  >
                    <div className="grid gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full h-11 text-base border-neutral-200 focus:border-neutral-900 focus:ring-0"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full h-11 text-base border-neutral-200 focus:border-neutral-900 focus:ring-0"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
                          Company Name
                        </label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          required
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full h-11 text-base border-neutral-200 focus:border-neutral-900 focus:ring-0"
                          placeholder="Acme Inc."
                        />
                      </div>

                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-neutral-700 mb-2">
                          Current Website
                        </label>
                        <Input
                          id="website"
                          name="website"
                          type="url"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="w-full h-11 text-base border-neutral-200 focus:border-neutral-900 focus:ring-0"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="growthChallenge" className="block text-sm font-medium text-neutral-700 mb-2">
                        Your Biggest Growth Challenge
                      </label>
                      <textarea
                        id="growthChallenge"
                        name="growthChallenge"
                        required
                        value={formData.growthChallenge}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-0 transition-colors"
                        placeholder="Tell us about your biggest growth challenge. Are you struggling to convert visitors to leads? Is your customer lifetime value too low?"
                      />
                    </div>

                    <div>
                      <label htmlFor="whyPartnerWithPrism" className="block text-sm font-medium text-neutral-700 mb-2">
                        Why Partner with Prism?
                      </label>
                      <textarea
                        id="whyPartnerWithPrism"
                        name="whyPartnerWithPrism"
                        required
                        value={formData.whyPartnerWithPrism}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-0 transition-colors"
                        placeholder="What excites you most about partnering with Prism? What results are you hoping to achieve?"
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-md transition-colors"
                      >
                        {isSubmitting ? (
                          <span>Submitting...</span>
                        ) : (
                          <>
                            Submit Application
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                      <p className="mt-3 text-center text-xs text-neutral-500">We review applications on the 1st of every month.</p>
                    </div>

                    {submitStatus === 'error' && (
                      <p className="text-red-600 text-sm text-center">
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>

              <motion.p 
                className="text-sm text-neutral-600 text-center mt-8"
                variants={fadeInY}
              >
                We're selective because we go all-in. Apply now to claim your edge.
              </motion.p>
            </motion.div>
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
