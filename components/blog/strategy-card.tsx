"use client"

import { motion } from "framer-motion"
import { Target, Users, Zap, MessageCircle, LayoutGrid, Gauge, Scale } from "lucide-react"
import { fadeInUp, card3D } from "@/utils/animation-variants"

interface StrategyCardProps {
  icon: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  timeframe: string
  impact: "High" | "Medium" | "Low"
  steps: string[]
  tips?: string[]
  className?: string
}

export default function StrategyCard({
  icon,
  title,
  description,
  difficulty,
  timeframe,
  impact,
  steps,
  tips,
  className = ""
}: StrategyCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'target': return Target
      case 'users': return Users
      case 'zap': return Zap
      case 'message-circle': return MessageCircle
      case 'layout-grid': return LayoutGrid
      case 'gauge': return Gauge
      case 'scale': return Scale
      default: return Target
    }
  }
  
  const Icon = getIcon(icon)
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Medium': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Low': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <motion.div
      className={`bg-white border-2 border-neutral-200 rounded-lg shadow-sm p-6 mb-6 ${className}`}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={card3D}
      whileHover="hover"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div variants={fadeInUp}>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
            <p className="text-neutral-600 mb-3">{description}</p>
            <div className="flex gap-2 flex-wrap">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(difficulty)}`}>
                {difficulty}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(impact)}`}>
                {impact} Impact
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 border border-neutral-200">
                {timeframe}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <h4 className="font-semibold text-neutral-900 mb-3">Implementation Steps:</h4>
        <div className="space-y-2 mb-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-700">{index + 1}</span>
              </div>
              <p className="text-sm text-neutral-700">{step}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {tips && tips.length > 0 && (
        <motion.div 
          className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500"
          variants={fadeInUp}
        >
          <h5 className="font-semibold text-blue-900 mb-2">Pro Tips:</h5>
          <div className="space-y-1">
            {tips.map((tip, index) => (
              <p key={index} className="text-sm text-blue-800">
                • {tip}
              </p>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}