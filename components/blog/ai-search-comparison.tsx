"use client"

import { motion } from "framer-motion"
import { User, Bot, ArrowRight, Search, Globe, Sparkles } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/utils/animation-variants"

const traditionalFlow = [
  {
    step: 1,
    title: "User Query",
    description: "User searches for \"best coffee roasters\"",
    icon: Search,
    color: "bg-blue-500"
  },
  {
    step: 2,
    title: "Search Results",
    description: "Google shows 10 blue links",
    icon: Globe,
    color: "bg-green-500"
  },
  {
    step: 3,
    title: "Click Through",
    description: "User clicks on your website",
    icon: ArrowRight,
    color: "bg-purple-500"
  },
  {
    step: 4,
    title: "Engagement",
    description: "User reads your content",
    icon: User,
    color: "bg-orange-500"
  }
]

const aiFlow = [
  {
    step: 1,
    title: "User Query",
    description: "User searches for \"best coffee roasters\"",
    icon: Search,
    color: "bg-blue-500"
  },
  {
    step: 2,
    title: "AI Processing",
    description: "AI analyzes multiple sources",
    icon: Bot,
    color: "bg-purple-500"
  },
  {
    step: 3,
    title: "Direct Answer",
    description: "AI provides summary on results page",
    icon: Sparkles,
    color: "bg-yellow-500"
  },
  {
    step: 4,
    title: "No Click",
    description: "User gets answer without visiting sites",
    icon: User,
    color: "bg-red-500"
  }
]

export default function AISearchComparison() {
  return (
    <motion.div
      className="w-full bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 rounded-lg shadow-sm p-6 mb-8"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <motion.div className="mb-8 text-center" variants={fadeInUp}>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">
          The Search Experience Evolution
        </h3>
        <p className="text-neutral-600 text-sm">
          How AI is changing the way users find and consume information
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Traditional Search */}
        <motion.div variants={fadeInUp}>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-800 font-medium">
              <User className="w-4 h-4" />
              Traditional Search
            </div>
            <p className="text-sm text-neutral-600 mt-2">The old way (pre-AI)</p>
          </div>
          
          <div className="space-y-4">
            {traditionalFlow.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg border border-neutral-200 shadow-sm"
                >
                  <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-neutral-900">{step.title}</h4>
                    <p className="text-sm text-neutral-600">{step.description}</p>
                  </div>
                  <div className="text-xs font-bold text-neutral-400">
                    {step.step}
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              <strong>Result:</strong> Your website gets traffic and engagement
            </p>
          </div>
        </motion.div>

        {/* AI Search */}
        <motion.div variants={fadeInUp}>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-800 font-medium">
              <Bot className="w-4 h-4" />
              AI-Powered Search
            </div>
            <p className="text-sm text-neutral-600 mt-2">The new reality (2024+)</p>
          </div>
          
          <div className="space-y-4">
            {aiFlow.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg border border-neutral-200 shadow-sm"
                >
                  <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-neutral-900">{step.title}</h4>
                    <p className="text-sm text-neutral-600">{step.description}</p>
                  </div>
                  <div className="text-xs font-bold text-neutral-400">
                    {step.step}
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-800">
              <strong>Result:</strong> Your website loses traffic and visibility
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-blue-200"
        variants={fadeInUp}
      >
        <div className="text-center">
          <h4 className="font-bold text-neutral-900 mb-2">The Solution: AI-First Optimization</h4>
          <p className="text-sm text-neutral-600 mb-4">
            Instead of fighting AI, work with it. Make your brand the obvious choice for AI to mention.
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-700">Consistent branding</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-blue-700">Quality content</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-purple-700">Authority building</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}