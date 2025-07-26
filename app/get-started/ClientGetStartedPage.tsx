"use client"
import AnimatedBackground from "@/components/animated-background"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { CheckCircle, Send, Star, Users, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface FormData {
  name: string
  email: string
  company: string
  website: string
  message: string
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
    message: ''
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
          source: 'waitlist',
          timestamp: new Date().toISOString()
        }),
      })

      setSubmitStatus('success')
      trackCTAClick('waitlist application submitted', 'get started page')
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          website: '',
          message: ''
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
      title: "Innovative Startups",
      description: "Tech companies with unique products solving real problems"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Healthcare Practices",
      description: "Medical and dental practices focused on patient growth"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Growth-Focused Brands",
      description: "Companies ready to scale with premium digital presence"
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
                  we're at capacity
                </motion.h1>
                
                <motion.p 
                  className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase text-base sm:text-lg md:text-xl px-4"
                  variants={fadeInUp}
                >
                  prism is currently at full capacity, but we're accepting applications from exceptional companies that align with our vision.
                </motion.p>
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
                  who we work with
                </h2>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase text-lg">
                  we partner with companies that share our commitment to excellence and innovation.
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full text-sm font-medium text-neutral-700">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  limited spots available
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
                  apply for the waitlist
                </h2>
                <p className="mx-auto mt-4 max-w-[600px] text-neutral-600 lowercase">
                  tell us about your company and why you'd be a great fit for prism.
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
                    <h3 className="text-2xl font-bold lowercase mb-2">application received!</h3>
                    <p className="text-neutral-600 lowercase">
                      we'll review your application and get back to you if there's a fit.
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
                        why would you be a great fit for prism? *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full"
                        placeholder="Tell us about your business, your goals, and why you think we'd work well together..."
                      />
                    </motion.div>

                    <motion.div 
                      className="pt-4"
                      variants={fadeInUp}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 text-lg lowercase rounded-full"
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
                            submit application
                            <Send className="ml-2 h-5 w-5" />
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
                  we review applications weekly and will contact you if there's a potential fit.
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
                  what makes a great fit
                </h2>
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
                    "You have a unique product or service that solves real problems",
                    "You're committed to excellence and long-term growth",
                    "You value premium design and user experience", 
                    "You're ready to invest in your digital presence",
                    "You appreciate collaborative partnerships over transactional relationships"
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
            </div>
          </motion.div>
        </motion.section>
      </main>
      <Footer />
    </motion.div>
  )
}
