"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
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

      <motion.div className="flex flex-col sm:flex-row gap-2 mb-6" variants={fadeInUp}>
        <button
          onClick={() => setActiveView('timeline')}
          className={`px-4 py-3 sm:py-2 rounded-md text-sm font-medium transition-colors touch-feedback min-h-[44px] ${
            activeView === 'timeline'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          Timeline View
        </button>
        <button
          onClick={() => setActiveView('industry')}
          className={`px-4 py-3 sm:py-2 rounded-md text-sm font-medium transition-colors touch-feedback min-h-[44px] ${
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
          <div className="h-64 sm:h-72 md:h-80 chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 15, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 10 }}
                  stroke="#374151"
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  stroke="#374151"
                  domain={[65, 105]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    zIndex: 9999
                  }}
                  labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                  itemStyle={{ color: '#374151' }}
                  formatter={(value, name) => {
                    const safeValue = value ?? 0
                    const safeName = name ?? "Value"
                    if (safeName === "Traditional Organic") {
                      return [`${safeValue}%`, "Traditional Organic Search"]
                    }
                    if (safeName === "With AI Features") {
                      return [`${safeValue}%`, "With AI Search Features"]
                    }
                    return [`${safeValue}%`, safeName]
                  }}
                  labelFormatter={(label) => `Period: ${label}`}
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
                />
                <ReferenceLine y={85} stroke="#f59e0b" strokeDasharray="5 5" label="15% Decline" />
                <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="5 5" label="30% Decline" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="space-y-3">
            {industryData.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-neutral-50 rounded-lg gap-3"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{ backgroundColor: industry.color }}
                  />
                  <span className="font-medium text-neutral-900 text-sm sm:text-base">{industry.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 sm:w-24 bg-neutral-200 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: industry.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(industry.decline / 30) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-neutral-700 min-w-[2rem] text-right">
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
