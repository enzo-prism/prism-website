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
      className={`
        relative overflow-hidden rounded-xl bg-white dark:bg-neutral-900 
        border border-neutral-200 dark:border-neutral-800 
        shadow-lg transition-all duration-300 hover:shadow-xl
        ${className}
      `}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        {/* Icon and badges */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <IconComponent className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <Badge className={`text-xs ${difficultyColors[difficulty]}`}>
                  {difficulty}
                </Badge>
                <Badge className={`text-xs ${impactColors[impact]}`}>
                  {impact} Impact
                </Badge>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400"
          >
            <Clock className="h-4 w-4" />
            <span>{timeframe}</span>
          </motion.div>
        </div>
        
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg font-semibold text-neutral-900 dark:text-white mb-3 leading-tight"
        >
          {title}
        </motion.h3>
        
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed"
        >
          {description}
        </motion.p>
        
        {/* Expand button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="ghost"
            size="sm"
            className="w-full justify-between p-3 h-auto text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg"
          >
            <span className="flex items-center gap-2 text-sm font-medium">
              <ArrowRight className="h-4 w-4" />
              {isExpanded ? "Hide Details" : "View Steps & Tips"}
            </span>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
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
            <div className="px-6 pb-6 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              {/* Steps */}
              <div className="mb-6">
                <h4 className="flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white mb-3">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Implementation Steps
                </h4>
                <div className="space-y-3">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`
                        flex items-start gap-3 p-3 rounded-lg border-2 transition-all duration-200
                        ${completedSteps.includes(index) 
                          ? "bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800" 
                          : "bg-neutral-50 border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
                        }
                      `}
                    >
                      <button
                        onClick={() => toggleStep(index)}
                        className={`
                          flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                          ${completedSteps.includes(index)
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-neutral-300 dark:border-neutral-600 hover:border-green-500"
                          }
                        `}
                      >
                        {completedSteps.includes(index) && (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                      </button>
                      <span className={`
                        text-sm leading-relaxed flex-1 transition-all duration-200
                        ${completedSteps.includes(index)
                          ? "text-green-800 dark:text-green-200 line-through opacity-75"
                          : "text-neutral-700 dark:text-neutral-300"
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
                  <h4 className="flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white mb-3">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    Pro Tips
                  </h4>
                  <div className="space-y-2">
                    {tips.map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-800"
                      >
                        <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-yellow-800 dark:text-yellow-200 leading-relaxed">
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