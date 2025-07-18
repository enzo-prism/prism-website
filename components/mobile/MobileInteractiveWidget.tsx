"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Share2, 
  Download, 
  Copy, 
  Check,
  Sparkles,
  Lightbulb,
  Target,
  TrendingUp
} from "lucide-react"

interface MobileInteractiveWidgetProps {
  title: string
  description: string
  type?: "quiz" | "calculator" | "generator" | "tracker" | "simulator"
  className?: string
}

export function MobileInteractiveWidget({
  title,
  description,
  type = "quiz",
  className = ""
}: MobileInteractiveWidgetProps) {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [results, setResults] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  
  // Touch interaction
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 })

  const handleStart = () => {
    setIsActive(true)
    setCurrentStep(0)
    controls.start({ scale: 1.02, rotateY: 5 })
  }

  const handleReset = () => {
    setIsActive(false)
    setCurrentStep(0)
    setResults([])
    controls.start({ scale: 1, rotateY: 0 })
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(results.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = (event.clientX - centerX) * 0.05
    const mouseY = (event.clientY - centerY) * 0.05
    
    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  // Widget type specific content
  const getWidgetContent = () => {
    switch (type) {
      case "quiz":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {isActive ? `Step ${currentStep + 1}/3` : "Take Quiz"}
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {isActive ? "Answer the questions to get personalized recommendations" : "Test your knowledge"}
              </p>
            </div>
            
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border">
                  <h4 className="font-medium mb-3">What's your primary business goal?</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {["Increase Traffic", "Generate Leads", "Build Brand Awareness"].map((option) => (
                      <Button
                        key={option}
                        variant="outline"
                        size="sm"
                        className="justify-start h-auto p-3 text-left"
                        onClick={() => {
                          setResults([...results, option])
                          setCurrentStep(currentStep + 1)
                        }}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )
        
      case "calculator":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {isActive ? "Calculate" : "AI Impact Calculator"}
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Estimate your traffic loss from AI search
              </p>
            </div>
            
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border">
                  <label className="block text-sm font-medium mb-2">
                    Monthly Website Traffic
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 10000"
                    className="w-full"
                  />
                </div>
              </motion.div>
            )}
          </div>
        )
        
      case "generator":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {isActive ? "Generate" : "Tagline Generator"}
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Create AI-friendly brand taglines
              </p>
            </div>
            
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border">
                  <Input
                    placeholder="Enter your business type..."
                    className="w-full mb-3"
                  />
                  <Button size="sm" className="w-full">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Taglines
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        )
        
      default:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">
                Interactive Tool
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Tap to get started
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`
        relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-neutral-50 to-neutral-100 
        dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 
        border-2 border-neutral-200 dark:border-neutral-700
        shadow-xl hover:shadow-2xl transition-all duration-300
        p-6 touch-manipulation
        ${className}
      `}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: mouseX,
        y: mouseY,
        // GPU acceleration
        transform: "translateZ(0)",
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
      animate={controls}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500" />
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Badge variant="secondary" className="text-xs">
          Interactive
        </Badge>
        {type === "quiz" && <Target className="h-4 w-4 text-purple-500" />}
        {type === "calculator" && <TrendingUp className="h-4 w-4 text-blue-500" />}
        {type === "generator" && <Lightbulb className="h-4 w-4 text-green-500" />}
      </div>
      
      {/* Header */}
      <div className="relative z-10 mb-6">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl font-bold text-neutral-900 dark:text-white mb-2"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-neutral-600 dark:text-neutral-300 text-sm"
        >
          {description}
        </motion.p>
      </div>
      
      {/* Widget content */}
      <div className="relative z-10 mb-6">
        {getWidgetContent()}
      </div>
      
      {/* Action buttons */}
      <div className="relative z-10 flex flex-wrap gap-2 justify-center">
        {!isActive ? (
          <Button
            onClick={handleStart}
            size="lg"
            className="gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
          >
            <Play className="h-4 w-4" />
            Start Tool
          </Button>
        ) : (
          <>
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            
            {results.length > 0 && (
              <>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </>
            )}
          </>
        )}
      </div>
      
      {/* Progress indicator */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-700"
        >
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </motion.div>
      )}
      
      {/* Glow effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isActive ? 0.3 : 0.1, scale: isActive ? 1.2 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-2xl blur-xl"
      />
    </motion.div>
  )
}