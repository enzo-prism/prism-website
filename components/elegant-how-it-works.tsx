"use client"

import { useState, useEffect, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"
import EnhancedProcessSteps from "@/components/enhanced-process-steps"
import StepIndicator from "@/components/ui/step-indicator"
import { Users, Clock, Rocket, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { fadeInUp, springScale, staggerContainer, card3D } from "@/utils/animation-variants"

interface Step {
  number: number
  title: string
  description: string
  icon: React.ReactNode
  estimatedTime: string
  details: string
}

function MobileElegantSteps() {
  const [activeStep, setActiveStep] = useState<number>(1)
  const [isInView, setIsInView] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const steps: Step[] = [
    {
      number: 1,
      title: "consultation",
      description: "we meet for 30 minutes to discuss your goals and challenges.",
      icon: <Users className="h-5 w-5" />,
      estimatedTime: "30 min",
      details: "During our consultation, we'll understand your vision, discuss your target audience, and explore how we can help achieve your goals."
    },
    {
      number: 2,
      title: "proposal",
      description: "if we're a good fit, we'll create a custom proposal for your project.",
      icon: <Clock className="h-5 w-5" />,
      estimatedTime: "2-3 days",
      details: "We'll craft a detailed proposal outlining the scope, timeline, and investment required to bring your project to life."
    },
    {
      number: 3,
      title: "kickoff",
      description: "once approved, we begin work on your website, app, or designs.",
      icon: <Rocket className="h-5 w-5" />,
      estimatedTime: "1-2 weeks",
      details: "Time to bring your vision to life! We'll start the design and development process with regular updates and collaborative feedback."
    },
  ]

  // Intersection Observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Swipe gesture detection
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && activeStep < steps.length) {
      setActiveStep(activeStep + 1)
    }
    if (isRightSwipe && activeStep > 1) {
      setActiveStep(activeStep - 1)
    }
  }

  return (
    <motion.div 
      ref={sectionRef} 
      className="space-y-6"
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={staggerContainer}
    >
      {/* Progress indicator */}
      <motion.div 
        className="flex justify-center gap-3 mb-8"
        variants={fadeInUp}
      >
        {steps.map((step, index) => (
          <motion.button
            key={step.number}
            onClick={() => setActiveStep(step.number)}
            className="focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <StepIndicator
              number={step.number}
              isActive={activeStep === step.number}
              size="sm"
              variant="minimal"
            />
          </motion.button>
        ))}
      </motion.div>

      {/* Steps container with swipe support */}
      <div 
        className="relative overflow-hidden" 
        style={{ perspective: 1000 }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          {steps.map((step, index) => (
            activeStep === step.number && (
              <motion.div
                key={step.number}
                initial={{ 
                  opacity: 0, 
                  y: 50, 
                  rotateX: -15,
                  scale: 0.9
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  scale: 1
                }}
                exit={{ 
                  opacity: 0, 
                  y: -50, 
                  rotateX: 15,
                  scale: 0.9
                }}
                transition={{ 
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity"
                }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-white to-neutral-50/50 border border-neutral-200/50 rounded-2xl p-6 shadow-sm"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  variants={card3D}
                  style={{
                    transform: "translateZ(0)",
                    willChange: "transform"
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div 
                      className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl"
                    >
                      {step.icon}
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold lowercase text-neutral-900">
                          {step.title}
                        </h3>
                        <motion.div 
                          className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-600"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                        >
                          <Clock className="h-3 w-3" />
                          {step.estimatedTime}
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <motion.div 
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-neutral-600 lowercase leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Expandable details */}
                    <details className="group">
                      <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-neutral-700 hover:text-black transition-colors">
                        <span>learn more</span>
                        <motion.div
                          initial={false}
                          animate={{ rotate: activeStep === step.number ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </summary>
                      <motion.div 
                        className="mt-3 pt-3 border-t border-neutral-200"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <p className="text-sm text-neutral-500 lowercase leading-relaxed">
                          {step.details}
                        </p>
                      </motion.div>
                    </details>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <motion.div 
        className="flex justify-center gap-2 mt-6"
        variants={fadeInUp}
      >
        {steps.map((step, index) => (
          <motion.button
            key={step.number}
            onClick={() => setActiveStep(step.number)}
            className={cn(
              "rounded-full transition-all duration-300",
              activeStep === step.number
                ? "bg-black"
                : "bg-neutral-300 hover:bg-neutral-400"
            )}
            initial={{ scale: 0, width: "0.5rem", height: "0.5rem" }}
            animate={{ 
              scale: 1,
              width: activeStep === step.number ? "2rem" : "0.5rem",
              height: "0.5rem"
            }}
            transition={{ delay: index * 0.05, type: "spring" }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            aria-label={`Go to step ${step.number}`}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function ElegantHowItWorks() {
  const isMobile = useMobile()

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background decoration */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-transparent via-neutral-50/30 to-transparent opacity-60 pointer-events-none"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: "200% 200%",
          transform: "translateZ(0)",
          willChange: "background-position"
        }}
      />
      
      {/* Content */}
      <div className="relative">
        {isMobile ? <MobileElegantSteps /> : <EnhancedProcessSteps />}
      </div>
    </motion.div>
  )
}