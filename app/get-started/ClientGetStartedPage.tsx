"use client"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import VideoWithPoster from "@/components/video-with-poster"
import { useMobile } from "@/hooks/use-mobile"
import { trackCTAClick } from "@/utils/analytics"
import {
    fadeInUp,
    pageTransition,
    springScale,
    staggerContainer,
    successPop
} from "@/utils/animation-variants"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle, Clock, Heart, Rocket, Share2, TrendingUp, Users, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface FormData {
  name: string
  email: string
  company: string
  website: string
  growthChallenge: string
  whyPartnerWithPrism: string
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
  const [daysUntilReview, setDaysUntilReview] = useState(6)
  const isMobile = useMobile()
  const videoRef = useRef<HTMLDivElement>(null)

  // Calculate days until next review
  useEffect(() => {
    const calculateDaysUntilReview = () => {
      const today = new Date()
      const targetDate = new Date(today)
      targetDate.setDate(today.getDate() + 6)
      setDaysUntilReview(6)
    }
    calculateDaysUntilReview()
  }, [])

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
    <motion.div 
      className="flex min-h-screen flex-col"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <Navbar />
      <main className="flex-1">
        {/* Hero Section with Video */}
        <motion.section 
          ref={videoRef} 
          className="relative px-4 py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white via-neutral-50 to-white"
        >
          <motion.div 
            className="container mx-auto px-4 md:px-6 max-w-6xl"
            initial="initial"
            animate="animate"
          >
            <div className="flex flex-col items-center space-y-8 text-center">
              {/* Video */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {shouldLoadVideo ? (
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <VideoWithPoster
                      videoId="1097023041"
                      posterSrc="/prism%20get%20started.webp"
                      width={isMobile ? 280 : 400}
                      height={isMobile ? 280 : 400}
                      autoplay={true}
                      loop={true}
                      muted={true}
                      controls={false}
                      posterAlt="Rocket launch animation - Get started with Prism"
                      trackAnalytics={true}
                    />
                  </div>
                ) : (
                  <div className={`${isMobile ? 'w-[280px] h-[280px]' : 'w-[400px] h-[400px]'} bg-neutral-100 rounded-2xl flex items-center justify-center`}>
                    <div className="text-neutral-400 text-sm">Loading video...</div>
                  </div>
                )}
              </motion.div>
              
              {/* Main Headline and Value Prop */}
              <div className="space-y-6 max-w-4xl">
                <motion.h1 
                  className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-neutral-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
                >
                  Elevate Your Brand with Design That Actually Makes Money
                </motion.h1>
                
                <motion.p 
                  className="text-xl sm:text-2xl text-neutral-700 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                >
                  Tired of beautiful websites that look great but don't convert? Or clunky tools that drive revenue but bore your users to tears? At Prism, we fuse stunning design with world-class tech to create digital experiences that skyrocket leads, conversions, and lifetime value (LTV)—no matter your industry.
                </motion.p>
              </div>

              {/* Urgency and Exclusivity */}
              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              >
                <div className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-full text-sm font-medium">
                  <Users className="w-4 h-4" />
                  Only 10 new clients per month
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Clock className="w-4 h-4" />
                  Next application review in {daysUntilReview} days
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Social Proof Section */}
        <motion.section 
          className="relative px-4 py-16 md:py-20 bg-neutral-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="container mx-auto px-4 md:px-6 max-w-6xl"
            variants={staggerContainer}
          >
            <motion.div 
              className="text-center mb-8"
              variants={fadeInUp}
            >
              <p className="text-lg text-neutral-700 leading-relaxed max-w-4xl mx-auto">
                We've powered growth for dental practices (our biggest crew), a ski/bike shop turning seasonal browsers into year-round buyers, an online wellness community building sticky engagement, an alumni program fostering lifelong connections, a leadership consulting firm closing high-ticket deals effortlessly, and an M&A consultancy streamlining complex client journeys.
              </p>
              <p className="text-xl font-semibold text-neutral-900 mt-4">
                Different worlds, same playbook: Beautiful, intuitive interfaces backed by smart tech that deliver measurable wins.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 text-center"
              variants={springScale}
            >
              <p className="text-lg text-neutral-800 font-medium">
                We're not for everyone. We're building an exclusive network of ambitious founders and leaders who want custom UX/UI that solves real problems, delights customers, and cranks up your key metrics.
              </p>
              <p className="text-2xl font-bold text-neutral-900 mt-4">
                If you're ready to invest in design that pays you back 10x, this is your move.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Who We're Looking For Section */}
        <motion.section 
          className="relative px-4 py-16 md:py-24 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="container mx-auto px-4 md:px-6 max-w-6xl"
            variants={staggerContainer}
          >
            <motion.div className="mb-12 text-center" variants={fadeInUp}>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Who We're Looking For (And Why You'd Want In)
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-neutral-700 text-lg">
                We partner with trailblazers who treat design like a revenue machine. Imagine unlocking the same growth hacks we've deployed across industries—tailored to your world:
              </p>
            </motion.div>

            <motion.div 
              className="grid gap-8 md:grid-cols-3"
              variants={staggerContainer}
            >
              {partnerTypes.map((type, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-b from-neutral-50 to-white rounded-xl p-8 shadow-lg border border-neutral-200"
                  variants={springScale}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <motion.div 
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 text-white mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {type.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3">{type.title}</h3>
                  <p className="text-neutral-700 mb-4">{type.description}</p>
                  <p className="text-sm text-neutral-600 italic">{type.example}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="mt-12 text-center"
              variants={fadeInUp}
            >
              <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
                No matter if you're a dental practice packing your schedule, a retail shop crushing e-comm, or a consultancy landing whales—we make it happen with data-backed design that increases leads, nails conversions, and maximizes LTV.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 rounded-full text-sm font-medium text-green-800 mt-6">
                <Heart className="w-4 h-4" />
                Priority access and consultations for the first 50 applicants
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Application Form Section */}
        <motion.section 
          className="px-4 py-16 md:py-24 bg-gradient-to-b from-neutral-50 to-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="container mx-auto px-4 md:px-6"
            variants={staggerContainer}
          >
            <div className="mx-auto max-w-2xl">
              <motion.div className="mb-12 text-center" variants={fadeInUp}>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Apply to Become a Prism Client
                </h2>
                <p className="mx-auto mt-4 max-w-[600px] text-neutral-700 text-lg">
                  This isn't some generic signup. It's your fast-track application to partner with us on a custom project that transforms your digital game. We'll review your info, jump on a no-BS call if it's a fit, and co-build something that crushes your goals.
                </p>
                <p className="text-base font-medium text-neutral-600 mt-4">
                  Tell us a bit about you:
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    variants={successPop}
                    className="text-center py-12"
                  >
                    <motion.div
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Welcome to the Inner Circle!</h3>
                    <p className="text-neutral-700">
                      Your application for exclusive access has been received. We'll personally review it {daysUntilReview === 0 ? 'today' : daysUntilReview === 1 ? 'tomorrow' : `within ${daysUntilReview} days`}.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    variants={staggerContainer}
                  >
                    <motion.div className="grid gap-6 md:grid-cols-2" variants={fadeInUp}>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                          Your Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="john@company.com"
                        />
                      </div>
                    </motion.div>

                    <motion.div className="grid gap-6 md:grid-cols-2" variants={fadeInUp}>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
                          Company Name *
                        </label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          required
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="Acme Inc."
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-neutral-700 mb-2">
                          Current Website (if any)
                        </label>
                        <Input
                          id="website"
                          name="website"
                          type="url"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="https://www.example.com"
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <label htmlFor="growthChallenge" className="block text-sm font-medium text-neutral-700 mb-2">
                        Your Biggest Growth Challenge Right Now (Leads? Conversions? LTV?) *
                      </label>
                      <textarea
                        id="growthChallenge"
                        name="growthChallenge"
                        required
                        value={formData.growthChallenge}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tell us about your biggest growth challenge. Are you struggling to convert visitors to leads? Is your customer lifetime value too low? Be specific so we can tailor our approach."
                      />
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <label htmlFor="whyPartnerWithPrism" className="block text-sm font-medium text-neutral-700 mb-2">
                        Why Partnering with Prism Fires You Up *
                      </label>
                      <textarea
                        id="whyPartnerWithPrism"
                        name="whyPartnerWithPrism"
                        required
                        value={formData.whyPartnerWithPrism}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="What excites you most about partnering with Prism? What results are you hoping to achieve? Dream big—we love ambitious goals."
                      />
                    </motion.div>

                    <motion.div 
                      className="pt-4"
                      variants={fadeInUp}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 text-lg rounded-full bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-neutral-900 hover:to-black text-white font-medium"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            Submitting Your Application...
                          </motion.span>
                        ) : (
                          <>
                            Apply Now to Claim Your Edge
                            <Rocket className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </motion.div>

                    {submitStatus === 'error' && (
                      <motion.p 
                        className="text-red-600 text-sm text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        Something went wrong. Please try again.
                      </motion.p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>

              <motion.div 
                className="mt-12 text-center"
                variants={fadeInUp}
              >
                <p className="text-base text-neutral-700 font-medium">
                  We're picky because we go all-in—curated clients mean deeper dives, faster ROI, and partnerships that last. Apply now to claim your edge.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Are You the Kind of Leader Section */}
        <motion.section 
          className="px-4 py-16 md:py-24 bg-neutral-900 text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="container mx-auto px-4 md:px-6"
            variants={staggerContainer}
          >
            <div className="mx-auto max-w-4xl">
              <motion.div className="text-center mb-12" variants={fadeInUp}>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Are You the Kind of Leader We Geek Out Over?
                </h2>
              </motion.div>

              <motion.div 
                className="bg-white/5 backdrop-blur rounded-xl p-8 md:p-12 border border-white/10"
                variants={springScale}
              >
                <motion.ul 
                  className="space-y-5"
                  variants={staggerContainer}
                >
                  {leaderQualities.map((quality, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      variants={fadeInUp}
                      whileHover={{ x: 5 }}
                    >
                      <CheckCircle className="mr-3 h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/90 text-lg">{quality} {index === 0 && "(we've seen it across dentistry, retail, wellness, and consulting)"}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              <motion.div 
                className="mt-12 text-center"
                variants={fadeInUp}
              >
                <p className="text-xl text-white/80 italic font-light">
                  Born from an obsession to blend beauty and revenue in digital worlds, we're on the hunt for partners ready to dominate.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Social Sharing Section */}
        <motion.section 
          className="px-4 py-12 bg-white border-t border-neutral-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="container mx-auto px-4 md:px-6 text-center"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Share2 className="h-8 w-8 mx-auto mb-4 text-neutral-400" />
              <h3 className="text-xl font-semibold mb-2">Know a Fellow Operator Who'd Thrive Here?</h3>
              <p className="text-base text-neutral-600 mb-6">
                Share the link and unlock exclusive community insights—we're all about rising together.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button 
                  onClick={() => {
                    trackCTAClick('share twitter', 'get started page')
                    window.open('https://twitter.com/intent/tweet?text=Just%20applied%20to%20join%20@prism%27s%20exclusive%20circle%20of%20revenue-driving%20design%20innovators.%20Limited%20to%2010%20partners%20monthly.%20https://design-prism.com/get-started', '_blank')
                  }}
                  className="px-6 py-3 rounded-full text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-all"
                >
                  Share on X
                </button>
                <button 
                  onClick={() => {
                    trackCTAClick('share linkedin', 'get started page')
                    window.open('https://www.linkedin.com/sharing/share-offsite/?url=https://design-prism.com/get-started', '_blank')
                  }}
                  className="px-6 py-3 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
                >
                  Share on LinkedIn
                </button>
                <button 
                  onClick={() => {
                    trackCTAClick('copy link', 'get started page')
                    navigator.clipboard.writeText('https://design-prism.com/get-started')
                    alert('Link copied to clipboard!')
                  }}
                  className="px-6 py-3 rounded-full text-sm font-medium bg-neutral-200 text-neutral-800 hover:bg-neutral-300 transition-all"
                >
                  Copy Link
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
      <Footer />
    </motion.div>
  )
}
