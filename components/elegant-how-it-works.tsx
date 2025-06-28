"use client"

import { useState, useEffect, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"
import EnhancedProcessSteps from "@/components/enhanced-process-steps"
import StepIndicator from "@/components/ui/step-indicator"
import { Users, Clock, Rocket, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

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

  // Auto-advance steps for engagement (paused on user interaction)
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % steps.length) + 1)
    }, 5000) // Slightly longer for better reading time

    return () => clearInterval(interval)
  }, [isInView, steps.length])

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Progress indicator */}
      <div className="flex justify-center gap-3 mb-8">
        {steps.map((step) => (
          <button
            key={step.number}
            onClick={() => setActiveStep(step.number)}
            className="focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 rounded-full"
          >
            <StepIndicator
              number={step.number}
              isActive={activeStep === step.number}
              size="sm"
              variant="minimal"
            />
          </button>
        ))}
      </div>

      {/* Steps container */}
      <div className="relative overflow-hidden">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={cn(
              "transition-all duration-700 ease-out",
              activeStep === step.number
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4 absolute inset-0 pointer-events-none"
            )}
            style={{
              animationDelay: isInView ? `${index * 200}ms` : "0ms"
            }}
          >
            <div className="bg-gradient-to-br from-white to-neutral-50/50 border border-neutral-200/50 rounded-2xl p-6 shadow-sm">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold lowercase text-neutral-900">
                      {step.title}
                    </h3>
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-600">
                      <Clock className="h-3 w-3" />
                      {step.estimatedTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <p className="text-neutral-600 lowercase leading-relaxed">
                  {step.description}
                </p>
                
                {/* Expandable details */}
                <details className="group">
                  <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-neutral-700 hover:text-black transition-colors">
                    <span>learn more</span>
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="mt-3 pt-3 border-t border-neutral-200">
                    <p className="text-sm text-neutral-500 lowercase leading-relaxed">
                      {step.details}
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-6">
        {steps.map((step) => (
          <button
            key={step.number}
            onClick={() => setActiveStep(step.number)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              activeStep === step.number
                ? "bg-black w-8"
                : "bg-neutral-300 hover:bg-neutral-400"
            )}
            aria-label={`Go to step ${step.number}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function ElegantHowItWorks() {
  const isMobile = useMobile()

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-neutral-50/30 to-transparent opacity-60 pointer-events-none" />
      
      {/* Content */}
      <div className="relative">
        {isMobile ? <MobileElegantSteps /> : <EnhancedProcessSteps />}
      </div>
    </div>
  )
}