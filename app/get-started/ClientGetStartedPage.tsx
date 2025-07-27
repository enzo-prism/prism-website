"use client"
import AnimatedBackground from "@/components/animated-background"
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
import { CheckCircle, Clock, Share2, Shield, Sparkles, Star, Users, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface FormData {
  name: string
  email: string
  company: string
  website: string
  message: string
  whyPrismExcites: string
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
    message: '',
    whyPrismExcites: ''
  })
  const isMobile = useMobile()
  const videoRef = useRef<HTMLDivElement>(null)

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
          source: 'exclusive-waitlist',
          timestamp: new Date().toISOString()
        }),
      })

      setSubmitStatus('success')
      trackCTAClick('exclusive waitlist application submitted', 'get started page')
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          website: '',
          message: '',
          whyPrismExcites: ''
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

  const clientTypes = [
    {
      icon: <Star className="h-5 w-5" />,
      title: "Visionary Startups",
      description: "Tech pioneers ready to redefine their industry through design excellence"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Healthcare Innovators",
      description: "Medical leaders transforming patient experiences with premium digital solutions"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Growth Trailblazers",
      description: "Ambitious brands investing in design that drives measurable revenue"
    }
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
        {/* Hero Section */}
        <motion.section 
          ref={videoRef} 
          className="relative px-4 py-12 md:py-24 lg:py-32 overflow-hidden"
        >
          <AnimatedBackground />
          
          <motion.div 
            className="container mx-auto px-4 md:px-6 relative z-10"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <div className="flex flex-col items-center space-y-6 text-center">
              <motion.div
                className="space-y-3"
                variants={fadeInUp}
              >
                {/* Video frame */}
                <motion.div 
                  className="mb-2 flex justify-center"
                  variants={springScale}
                  whileHover={{ scale: 1.02 }}
                >
                  {shouldLoadVideo ? (
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <VideoWithPoster
                        videoId="1097023041"
                        posterSrc="/prism%20get%20started.webp"
                        width={isMobile ? 200 : 360}
                        height={isMobile ? 200 : 360}
                        autoplay={true}
                        loop={true}
                        muted={true}
                        controls={false}
                        posterAlt="Rocket launch animation - Get started with Prism"
                        trackAnalytics={true}
                      />
                    </motion.div>
                  ) : (
                    <motion.div 
                      className={`${isMobile ? 'w-[200px] h-[200px]' : 'w-[360px] h-[360px]'} bg-gray-100 rounded-lg shadow-md border border-neutral-200 flex items-center justify-center`}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="text-gray-400 text-sm">Loading video...</div>
                    </motion.div>
                  )}
                </motion.div>
                
                <motion.h1 
                  className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl md:text-5xl lg:text-6xl"
                  variants={fadeInUp}
                >
                  elevate your brand
                </motion.h1>
                
                <motion.h2 
                  className="text-xl font-medium tracking-tight lowercase sm:text-2xl md:text-3xl text-neutral-700"
                  variants={fadeInUp}
                >
                  secure early access to prism's revenue-driving design innovations
                </motion.h2>
                
                <motion.p 
                  className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase text-base sm:text-lg md:text-xl px-4"
                  variants={fadeInUp}
                >
                  tired of generic digital tools that stall growth? prism crafts bespoke experiences for visionary startups and healthcare leaders.
                </motion.p>

                {/* Urgency indicators */}
                <motion.div 
                  className="flex flex-wrap items-center justify-center gap-4 mt-6"
                  variants={fadeInUp}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
                    <Shield className="w-4 h-4" />
                    limited to 10 partners monthly
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full text-sm font-medium text-neutral-700">
                    <Clock className="w-4 h-4 animate-pulse" />
                    next review in 5 days
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Who We Work With Section */}
        <motion.section 
          className="relative px-4 py-16 md:py-24 bg-neutral-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="container mx-auto px-4 md:px-6"
            variants={staggerContainer}
          >
            <div className="mx-auto max-w-5xl">
              <motion.div className="mb-12 text-center" variants={fadeInUp}>
                <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl md:text-5xl">
                  who joins our exclusive circle
                </h2>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase text-lg">
                  born from a drive to fuse beauty and revenue in digital worlds, we're seeking collaborators ready to pioneer.
                </p>
              </motion.div>

              <motion.div 
                className="grid gap-8 md:grid-cols-3"
                variants={staggerContainer}
              >
                {clientTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
                    variants={springScale}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <motion.div 
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100 mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {type.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold lowercase mb-2">{type.title}</h3>
                    <p className="text-neutral-600 lowercase">{type.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="mt-12 text-center"
                variants={fadeInUp}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-neutral-700">
                  <Sparkles className="w-4 h-4" />
                  priority consultations for first 50 applicants
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Application Form Section */}
        <motion.section 
          className="px-4 py-16 md:py-24 bg-white"
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
                <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                  claim your spot in prism's exclusive circle
                </h2>
                <p className="mx-auto mt-4 max-w-[600px] text-neutral-600 lowercase">
                  imagine a custom ux that boosts patient inquiries by solving real-world friction—join to see how we'll tailor it for you.
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
                    <h3 className="text-2xl font-bold lowercase mb-2">welcome to the inner circle!</h3>
                    <p className="text-neutral-600 lowercase">
                      your application for exclusive access has been received. we'll personally review it within 5 days.
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
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 lowercase mb-2">
                          your name *
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
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 lowercase mb-2">
                          email address *
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
                        <label htmlFor="company" className="block text-sm font-medium text-neutral-700 lowercase mb-2">
                          company name *
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
                        <label htmlFor="website" className="block text-sm font-medium text-neutral-700 lowercase mb-2">
                          current website (if any)
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
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-700 lowercase mb-2">
                        your growth challenge *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="What's the biggest growth challenge your business faces right now?"
                      />
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <label htmlFor="whyPrismExcites" className="block text-sm font-medium text-neutral-700 lowercase mb-2">
                        why prism excites you *
                      </label>
                      <textarea
                        id="whyPrismExcites"
                        name="whyPrismExcites"
                        required
                        value={formData.whyPrismExcites}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="What excites you most about joining Prism's exclusive circle of innovators?"
                      />
                    </motion.div>

                    <motion.div 
                      className="pt-4"
                      variants={fadeInUp}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 text-lg lowercase rounded-full bg-black hover:bg-neutral-800"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            submitting...
                          </motion.span>
                        ) : (
                          <>
                            claim your spot
                            <Sparkles className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </motion.div>

                    {submitStatus === 'error' && (
                      <motion.p 
                        className="text-red-600 text-sm text-center lowercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        something went wrong. please try again.
                      </motion.p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>

              <motion.div 
                className="mt-12 text-center"
                variants={fadeInUp}
              >
                <p className="text-sm text-neutral-500 lowercase">
                  curated access for 10 visionary partners monthly—apply to co-create excellence.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* What Makes a Great Fit Section */}
        <motion.section 
          className="px-4 py-16 md:py-24 bg-neutral-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="container mx-auto px-4 md:px-6"
            variants={staggerContainer}
          >
            <div className="mx-auto max-w-3xl">
              <motion.div className="text-center mb-12" variants={fadeInUp}>
                <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
                  are you ready to pioneer?
                </h2>
                <p className="mx-auto mt-4 max-w-[600px] text-neutral-600 lowercase">
                  for trailblazers in tech and health poised to invest in design that redefines growth.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200"
                variants={springScale}
                whileHover={{ y: -5 }}
              >
                <motion.ul 
                  className="space-y-4"
                  variants={staggerContainer}
                >
                  {[
                    "You're solving real problems with a product the world needs",
                    "Excellence isn't just a goal—it's your standard",
                    "You see design as an investment in exponential growth", 
                    "You're ready to commit to a transformative digital presence",
                    "You value deep partnerships over quick transactions",
                    "You're excited to be part of something groundbreaking from day one"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      variants={fadeInUp}
                      whileHover={{ x: 5 }}
                    >
                      <CheckCircle className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700 lowercase">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              <motion.div 
                className="mt-8 text-center"
                variants={fadeInUp}
              >
                <p className="text-sm text-neutral-600 lowercase italic">
                  "born from a drive to fuse beauty and revenue in digital worlds, we're seeking collaborators ready to pioneer."
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
              <Share2 className="h-6 w-6 mx-auto mb-3 text-neutral-400" />
              <h3 className="text-lg font-medium lowercase mb-2">share with fellow innovators</h3>
              <p className="text-sm text-neutral-500 lowercase mb-4">
                know someone who'd be perfect for prism? share to unlock community insights.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button 
                  onClick={() => {
                    trackCTAClick('share twitter', 'get started page')
                    window.open('https://twitter.com/intent/tweet?text=Just%20applied%20to%20join%20@prism%27s%20exclusive%20circle%20of%20design%20innovators.%20Limited%20to%2010%20partners%20monthly.%20https://design-prism.com/get-started', '_blank')
                  }}
                  className="share-button-premium px-4 py-2 rounded-full text-sm font-medium lowercase transition-all"
                >
                  share on x
                </button>
                <button 
                  onClick={() => {
                    trackCTAClick('share linkedin', 'get started page')
                    window.open('https://www.linkedin.com/sharing/share-offsite/?url=https://design-prism.com/get-started', '_blank')
                  }}
                  className="share-button-premium px-4 py-2 rounded-full text-sm font-medium lowercase transition-all"
                >
                  share on linkedin
                </button>
                <button 
                  onClick={() => {
                    trackCTAClick('copy link', 'get started page')
                    navigator.clipboard.writeText('https://design-prism.com/get-started')
                    alert('Link copied to clipboard!')
                  }}
                  className="share-button-premium px-4 py-2 rounded-full text-sm font-medium lowercase transition-all"
                >
                  copy link
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
