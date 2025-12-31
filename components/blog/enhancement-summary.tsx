"use client"

import { motion } from "framer-motion"
import { BarChart3, Users, Zap, Eye, TrendingUp, CheckCircle } from "lucide-react"
import { fadeInUp, staggerContainer, springScale } from "@/utils/animation-variants"

const enhancements = [
  {
    icon: BarChart3,
    title: "Interactive Data Visualizations",
    description: "Dynamic charts showing AI traffic impact and industry breakdowns",
    count: 3
  },
  {
    icon: Users,
    title: "Interactive Tools",
    description: "Tagline generator, AI mention tracker, and strategy timeline",
    count: 3
  },
  {
    icon: Zap,
    title: "Strategy Cards",
    description: "Beautifully designed cards with hover effects and progress tracking",
    count: 7
  },
  {
    icon: Eye,
    title: "Visual Comparisons",
    description: "Side-by-side comparison of traditional vs AI-powered search",
    count: 1
  },
  {
    icon: TrendingUp,
    title: "Scroll Animations",
    description: "Smooth entrance animations and parallax effects",
    count: "∞"
  }
]

export default function EnhancementSummary() {
  return (
    <motion.div
      className="w-full bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 border-2 border-purple-200 rounded-lg shadow-lg p-6 mb-8"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <motion.div className="text-center mb-8" variants={fadeInUp}>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-800 font-medium mb-4">
          <CheckCircle className="w-4 h-4" />
          Enhancement Complete
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
          Blog Post Visual Transformation
        </h3>
        <p className="text-neutral-600">
          This post now features cutting-edge interactive elements and animations to enhance learning
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {enhancements.map((enhancement, index) => {
          const Icon = enhancement.icon
          return (
            <motion.div
              key={index}
              variants={springScale}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-neutral-900 text-sm">{enhancement.title}</h4>
                    <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {enhancement.count}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600">{enhancement.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div 
        className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
        variants={fadeInUp}
      >
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 font-medium">Enhanced Engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-700 font-medium">Better Comprehension</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-purple-700 font-medium">Practical Tools</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}