"use client"

import { useState } from "react"
import StepIndicator from "@/components/ui/step-indicator"
import { ArrowRight, Clock, Users, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

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

  return (
    <div className="relative">
      {/* Connecting line - hidden on mobile */}
      <div className="absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 hidden md:block" />
      
      <div className="grid gap-8 md:gap-12 md:grid-cols-3 relative">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={cn(
              "group relative",
              "transition-all duration-500 ease-out",
              "hover:scale-105 hover:-translate-y-2"
            )}
            onMouseEnter={() => setActiveStep(step.number)}
            onMouseLeave={() => setActiveStep(null)}
          >
            {/* Card background with gradient */}
            <div
              className={cn(
                "relative bg-gradient-to-br from-white to-neutral-50/50",
                "border border-neutral-200/50 rounded-2xl",
                "shadow-sm hover:shadow-xl transition-all duration-500",
                "p-6 md:p-8",
                "backdrop-blur-sm",
                activeStep === step.number && "shadow-2xl border-neutral-300/50 bg-gradient-to-br from-white to-blue-50/30"
              )}
            >
              {/* Step indicator */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="mb-6">
                  <StepIndicator
                    number={step.number}
                    isActive={activeStep === step.number}
                    size="lg"
                    variant="default"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Title with icon */}
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {step.icon && (
                      <div className="text-neutral-500 group-hover:text-neutral-700 transition-colors">
                        {step.icon}
                      </div>
                    )}
                    <h3 className="text-xl md:text-2xl font-bold lowercase text-neutral-900">
                      {step.title}
                    </h3>
                  </div>

                  {/* Estimated time */}
                  {step.estimatedTime && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-600">
                      <Clock className="h-3 w-3" />
                      {step.estimatedTime}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-neutral-600 lowercase leading-relaxed">
                    {step.description}
                  </p>

                  {/* Expandable details */}
                  <div
                    className={cn(
                      "transition-all duration-300 overflow-hidden",
                      activeStep === step.number 
                        ? "max-h-24 opacity-100 mt-4" 
                        : "max-h-0 opacity-0 mt-0"
                    )}
                  >
                    <div className="pt-4 border-t border-neutral-200">
                      <p className="text-sm text-neutral-500 lowercase">
                        {step.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-neutral-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Step number indicator in corner */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white text-xs font-bold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                {step.number}
              </div>
            </div>

            {/* Arrow connector - desktop only */}
            {index < steps.length - 1 && (
              <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 hidden md:block">
                <div className="flex items-center justify-center w-12 h-12 bg-white border border-neutral-200 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                  <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress dots - mobile only */}
      <div className="flex justify-center gap-2 mt-8 md:hidden">
        {steps.map((step) => (
          <div
            key={step.number}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              activeStep === step.number
                ? "bg-black w-8"
                : "bg-neutral-300"
            )}
          />
        ))}
      </div>
    </div>
  )
}