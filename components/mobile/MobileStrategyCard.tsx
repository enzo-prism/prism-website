"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Target, 
  TrendingUp, 
  CheckCircle2,
  Lightbulb,
  AlertCircle,
  ArrowRight
} from "lucide-react"

interface MobileStrategyCardProps {
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  timeframe: string
  impact: "Low" | "Medium" | "High"
  steps: string[]
  tips?: string[]
  icon?: "target" | "users" | "zap" | "message-circle" | "layout-grid" | "gauge" | "scale"
  className?: string
}

const iconMap = {
  target: Target,
  users: Target,
  zap: TrendingUp,
  "message-circle": Target,
  "layout-grid": Target,
  gauge: TrendingUp,
  scale: Target
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
  Hard: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
}

const impactColors = {
  Low: "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400",
  Medium: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  High: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
}

export function MobileStrategyCard({
  title,
  description,
  difficulty,
  timeframe,
  impact,
  steps,
  tips,
  icon = "target",
  className = ""
}: MobileStrategyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  
  const IconComponent = iconMap[icon]
  
  const toggleStep = (stepIndex: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepIndex) 
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden rounded-lg bg-white 
        border border-neutral-200 shadow-sm 
        mobile-card mx-0 my-4
        ${className}
      `}
    >
      {/* Header - Mobile optimized */}
      <div className="p-4">
        {/* Icon and badges */}
        <div className="flex items-start justify-between mb-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <div className="p-1.5 rounded-md bg-neutral-100">
              <IconComponent className="h-4 w-4 text-neutral-600" />
            </div>
            <div className="flex flex-wrap gap-1">
              <Badge className={`text-xs px-2 py-0.5 ${difficultyColors[difficulty]}`}>
                {difficulty}
              </Badge>
              <Badge className={`text-xs px-2 py-0.5 ${impactColors[impact]}`}>
                {impact}
              </Badge>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-1 text-xs text-neutral-500"
          >
            <Clock className="h-3 w-3" />
            <span>{timeframe}</span>
          </motion.div>
        </div>
        
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base font-bold text-neutral-900 mb-2 leading-tight lowercase"
        >
          {title}
        </motion.h3>
        
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-neutral-600 mb-3 leading-relaxed text-sm line-clamp-3"
        >
          {description}
        </motion.p>
        
        {/* Expand button - Touch optimized */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mobile-button w-full justify-between bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
          >
            <span className="flex items-center gap-2 text-sm font-medium">
              <ArrowRight className="h-4 w-4" />
              {isExpanded ? "hide details" : "view steps"}
            </span>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </motion.div>
      </div>
      
      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-neutral-100">
              {/* Steps */}
              <div className="mb-4">
                <h4 className="flex items-center gap-2 text-sm font-bold text-neutral-900 mb-3 lowercase">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  steps to follow
                </h4>
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`
                        flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 mobile-card
                        ${completedSteps.includes(index) 
                          ? "bg-green-50 border-green-200" 
                          : "bg-neutral-50 border-neutral-200"
                        }
                      `}
                    >
                      <button
                        onClick={() => toggleStep(index)}
                        className={`
                          flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mobile-touch-target
                          ${completedSteps.includes(index)
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-neutral-300 hover:border-green-500"
                          }
                        `}
                      >
                        {completedSteps.includes(index) && (
                          <CheckCircle2 className="h-3 w-3" />
                        )}
                      </button>
                      <span className={`
                        text-sm leading-relaxed flex-1 transition-all duration-200
                        ${completedSteps.includes(index)
                          ? "text-green-800 line-through opacity-75"
                          : "text-neutral-700"
                        }
                      `}>
                        {step}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Tips */}
              {tips && tips.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-neutral-900 mb-3 lowercase">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    pro tips
                  </h4>
                  <div className="space-y-2">
                    {tips.map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200 mobile-card"
                      >
                        <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-yellow-800 leading-relaxed">
                          {tip}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-100 dark:bg-neutral-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
        />
      </div>
    </motion.div>
  )
}