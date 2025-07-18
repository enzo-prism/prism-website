"use client"

import { useState, useRef } from "react"
import StepIndicator from "@/components/ui/step-indicator"
import { ArrowRight, Clock, Users, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { fadeInUp, springScale, staggerContainer, perspective3D } from "@/utils/animation-variants"

interface Step {
  number: number
  title: string
  description: string
  icon?: React.ReactNode
  estimatedTime?: string
  details?: string
}

export default function EnhancedProcessSteps() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Create transform values for all steps at the top level
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10])
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10])
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    mouseX.set(x / 10)
    mouseY.set(y / 10)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div 
      ref={containerRef}
      className="relative"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Animated connecting line */}
      <motion.div 
        className="absolute top-8 left-8 right-8 h-0.5 hidden md:block overflow-hidden"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200"
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: "200% 100%",
          }}
        />
      </motion.div>
      
      <div className="grid gap-8 md:gap-12 md:grid-cols-3 relative">
        {steps.map((step, index) => {
          return (
            <motion.div
              key={step.number}
              className="group relative"
              variants={fadeInUp}
              custom={index}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setActiveStep(step.number)}
              whileHover={{ scale: 1.05, y: -10 }}
              style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
              }}
            >
              {/* 3D Card with parallax effect */}
              <motion.div
                className={cn(
                  "relative bg-gradient-to-br from-white to-neutral-50/50",
                  "border border-neutral-200/50 rounded-2xl",
                  "shadow-sm hover:shadow-xl transition-shadow duration-500",
                  "p-6 md:p-8",
                  "backdrop-blur-sm",
                  activeStep === step.number && "shadow-2xl border-neutral-300/50 bg-gradient-to-br from-white to-blue-50/30"
                )}
                style={{
                  rotateX: activeStep === step.number ? springRotateX : 0,
                  rotateY: activeStep === step.number ? springRotateY : 0,
                  transformStyle: "preserve-3d",
                  transform: "translateZ(0)",
                  willChange: "transform",
                }}
              >
                {/* Floating particles effect */}
                {activeStep === step.number && (
                  <motion.div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-black/20 rounded-full"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${20 + i * 25}%`,
                        }}
                        animate={{
                          y: [-20, 20, -20],
                          x: [-10, 10, -10],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Step indicator */}
                <div className="flex flex-col items-center text-center relative z-10">
                  <motion.div 
                    className="mb-6"
                    animate={{
                      y: activeStep === step.number ? [-2, 2, -2] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <StepIndicator
                      number={step.number}
                      isActive={activeStep === step.number}
                      size="lg"
                      variant="default"
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-4">
                    {/* Title with icon */}
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {step.icon && (
                        <motion.div 
                          className="text-neutral-500 group-hover:text-neutral-700 transition-colors"
                          animate={{
                            rotate: activeStep === step.number ? 360 : 0,
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          {step.icon}
                        </motion.div>
                      )}
                      <h3 className="text-xl md:text-2xl font-bold lowercase text-neutral-900">
                        {step.title}
                      </h3>
                    </div>

                    {/* Estimated time with shimmer effect */}
                    {step.estimatedTime && (
                      <motion.div 
                        className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-600 relative overflow-hidden"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                      >
                        <Clock className="h-3 w-3" />
                        {step.estimatedTime}
                        {activeStep === step.number && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                            animate={{
                              x: ["-100%", "100%"],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        )}
                      </motion.div>
                    )}

                  {/* Description */}
                  <p className="text-neutral-600 lowercase leading-relaxed">
                    {step.description}
                  </p>

                    {/* Expandable details with animation */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: activeStep === step.number ? "auto" : 0,
                        opacity: activeStep === step.number ? 1 : 0,
                        marginTop: activeStep === step.number ? 16 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-neutral-200">
                        <p className="text-sm text-neutral-500 lowercase">
                          {step.details}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Decorative gradient overlay */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-neutral-100/20 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeStep === step.number ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Floating step number */}
                <motion.div 
                  className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white text-xs font-bold rounded-full flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: activeStep === step.number ? 1 : 0,
                    rotate: activeStep === step.number ? 0 : -180,
                  }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {step.number}
                </motion.div>
              </motion.div>

              {/* Animated arrow connector */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="absolute top-1/2 -right-6 transform -translate-y-1/2 hidden md:block"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <motion.div 
                    className="flex items-center justify-center w-12 h-12 bg-white border border-neutral-200 rounded-full shadow-sm"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    animate={{
                      x: activeStep === step.number || activeStep === step.number + 1 ? [0, 5, 0] : 0,
                    }}
                    transition={{
                      x: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Progress dots - mobile only */}
      <motion.div 
        className="flex justify-center gap-2 mt-8 md:hidden"
        variants={fadeInUp}
      >
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            className={cn(
              "rounded-full",
              activeStep === step.number
                ? "bg-black"
                : "bg-neutral-300"
            )}
            initial={{ scale: 0, width: "0.5rem", height: "0.5rem" }}
            animate={{ 
              scale: 1,
              width: activeStep === step.number ? "2rem" : "0.5rem",
              height: "0.5rem"
            }}
            transition={{ delay: index * 0.05, type: "spring" }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}