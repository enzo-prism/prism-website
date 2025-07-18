"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Clock, ArrowRight, Zap, Target, TrendingUp, BarChart3 } from "lucide-react"
import { fadeInUp, staggerContainer, springScale } from "@/utils/animation-variants"

const strategies = [
  {
    id: 1,
    title: "Brand Tagline",
    description: "Create a memorable 5-7 word tagline",
    timeframe: "Week 1",
    difficulty: "Easy",
    impact: "High",
    icon: Target,
    color: "bg-green-500",
    steps: [
      "Define your business in 5-7 words",
      "Add to website and social profiles",
      "Use in 20-30 online mentions"
    ]
  },
  {
    id: 2,
    title: "Online Presence Alignment",
    description: "Unify your business description across all platforms",
    timeframe: "Week 2",
    difficulty: "Medium",
    impact: "High",
    icon: TrendingUp,
    color: "bg-blue-500",
    steps: [
      "Audit top 10-20 online mentions",
      "Create 50-word source of truth bio",
      "Update inconsistent information"
    ]
  },
  {
    id: 3,
    title: "Branded Method",
    description: "Coin your own method or approach",
    timeframe: "Week 3",
    difficulty: "Medium",
    impact: "Medium",
    icon: Zap,
    color: "bg-purple-500",
    steps: [
      "Develop unique approach/method",
      "Mention in 40-50 online instances",
      "Encourage customer usage in reviews"
    ]
  },
  {
    id: 4,
    title: "FAQ Optimization",
    description: "Turn customer questions into AI-friendly content",
    timeframe: "Week 4",
    difficulty: "Easy",
    impact: "High",
    icon: BarChart3,
    color: "bg-orange-500",
    steps: [
      "Monitor social threads for questions",
      "Create comprehensive FAQ page",
      "Format as Question > Answer > Link"
    ]
  }
]

export default function StrategyTimelineChart() {
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null)
  const [completedStrategies, setCompletedStrategies] = useState<number[]>([])

  const toggleComplete = (strategyId: number) => {
    setCompletedStrategies(prev => 
      prev.includes(strategyId) 
        ? prev.filter(id => id !== strategyId)
        : [...prev, strategyId]
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-blue-100 text-blue-800'
      case 'Medium': return 'bg-purple-100 text-purple-800'
      case 'Low': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <motion.div
      className="w-full bg-white border border-neutral-200 rounded-lg shadow-sm p-6 mb-8"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <motion.div className="mb-6" variants={fadeInUp}>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">
          4-Week Implementation Timeline
        </h3>
        <p className="text-neutral-600 text-sm">
          Your roadmap to AI search optimization success
        </p>
      </motion.div>

      <div className="space-y-6">
        {strategies.map((strategy, index) => {
          const isCompleted = completedStrategies.includes(strategy.id)
          const isSelected = selectedStrategy === strategy.id
          const Icon = strategy.icon

          return (
            <motion.div
              key={strategy.id}
              variants={fadeInUp}
              className={`relative border-2 rounded-lg transition-all duration-300 ${
                isCompleted 
                  ? 'border-green-500 bg-green-50' 
                  : isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={() => toggleComplete(strategy.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isCompleted 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-neutral-300 hover:border-green-500'
                      }`}
                    >
                      {isCompleted && <CheckCircle className="w-4 h-4" />}
                    </motion.button>
                    
                    <div className={`w-10 h-10 rounded-lg ${strategy.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-neutral-900">{strategy.title}</h4>
                      <p className="text-sm text-neutral-600">{strategy.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(strategy.difficulty)}`}>
                      {strategy.difficulty}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(strategy.impact)}`}>
                      {strategy.impact} Impact
                    </span>
                    <div className="flex items-center gap-1 text-sm text-neutral-500">
                      <Clock className="w-4 h-4" />
                      {strategy.timeframe}
                    </div>
                    <motion.button
                      onClick={() => setSelectedStrategy(isSelected ? null : strategy.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                    >
                      <motion.div
                        animate={{ rotate: isSelected ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.button>
                  </div>
                </div>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-neutral-200"
                    >
                      <h5 className="font-semibold text-neutral-900 mb-3">Implementation Steps:</h5>
                      <div className="space-y-2">
                        {strategy.steps.map((step, stepIndex) => (
                          <motion.div
                            key={stepIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: stepIndex * 0.1 }}
                            className="flex items-start gap-3 p-3 bg-white rounded-lg border border-neutral-200"
                          >
                            <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-semibold text-neutral-700">
                                {stepIndex + 1}
                              </span>
                            </div>
                            <p className="text-sm text-neutral-700">{step}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200"
        variants={fadeInUp}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-neutral-900 mb-1">Progress Tracker</p>
            <p className="text-sm text-neutral-600">
              {completedStrategies.length} of {strategies.length} strategies completed
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 bg-neutral-200 rounded-full h-2">
              <motion.div
                className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completedStrategies.length / strategies.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-sm font-semibold text-neutral-700">
              {Math.round((completedStrategies.length / strategies.length) * 100)}%
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}