"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { fadeInUp, staggerContainer } from "@/utils/animation-variants"

const data = [
  {
    month: "Jan 2024",
    organic: 100,
    withAI: 100,
    industry: "General"
  },
  {
    month: "Mar 2024",
    organic: 95,
    withAI: 90,
    industry: "General"
  },
  {
    month: "May 2024",
    organic: 88,
    withAI: 82,
    industry: "General"
  },
  {
    month: "Jul 2024",
    organic: 85,
    withAI: 75,
    industry: "General"
  },
  {
    month: "Sep 2024",
    organic: 85,
    withAI: 70,
    industry: "Health & Wellness"
  },
  {
    month: "Nov 2024",
    organic: 85,
    withAI: 70,
    industry: "Health & Wellness"
  },
  {
    month: "Jan 2025",
    organic: 85,
    withAI: 70,
    industry: "Health & Wellness"
  }
]

const industryData = [
  { name: "General Business", decline: 15, color: "#8b5cf6" },
  { name: "Health & Wellness", decline: 30, color: "#ef4444" },
  { name: "E-commerce", decline: 20, color: "#f59e0b" },
  { name: "Local Services", decline: 18, color: "#10b981" },
  { name: "Technology", decline: 12, color: "#3b82f6" }
]

export default function AITrafficDeclineChart() {
  const [activeView, setActiveView] = useState<'timeline' | 'industry'>('timeline')
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="w-full bg-white border border-neutral-200 rounded-lg shadow-sm p-6 mb-8"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <motion.div className="mb-6" variants={fadeInUp}>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">
          AI Impact on Organic Traffic
        </h3>
        <p className="text-neutral-600 text-sm">
          How AI-powered search features are affecting click-through rates across industries
        </p>
      </motion.div>

      <motion.div className="flex gap-2 mb-6" variants={fadeInUp}>
        <button
          onClick={() => setActiveView('timeline')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeView === 'timeline'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          Timeline View
        </button>
        <button
          onClick={() => setActiveView('industry')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeView === 'industry'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          Industry Breakdown
        </button>
      </motion.div>

      <motion.div variants={fadeInUp}>
        {activeView === 'timeline' ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                  domain={[65, 105]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="organic"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  name="Traditional Organic"
                  animationDuration={animationComplete ? 0 : 2000}
                />
                <Line
                  type="monotone"
                  dataKey="withAI"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  name="With AI Features"
                  animationDuration={animationComplete ? 0 : 2000}
                  animationDelay={500}
                />
                <ReferenceLine y={85} stroke="#f59e0b" strokeDasharray="5 5" label="15% Decline" />
                <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="5 5" label="30% Decline" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="space-y-4">
            {industryData.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: industry.color }}
                  />
                  <span className="font-medium text-neutral-900">{industry.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-neutral-200 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: industry.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(industry.decline / 30) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-neutral-700 w-8">
                    -{industry.decline}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div 
        className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500"
        variants={fadeInUp}
      >
        <p className="text-sm text-blue-800">
          <strong>Key Insight:</strong> While general business sees a 15% decline, health & wellness 
          businesses are hit hardest with up to 30% traffic loss due to AI answering medical queries directly.
        </p>
      </motion.div>
    </motion.div>
  )
}