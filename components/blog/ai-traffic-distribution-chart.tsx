"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { fadeInUp, springScale } from "@/utils/animation-variants"

const data = [
  { name: "Traditional Organic", value: 70, color: "#10b981", description: "Standard search results" },
  { name: "Google AI Overviews", value: 25, color: "#8b5cf6", description: "AI-generated summaries" },
  { name: "ChatGPT Search", value: 3, color: "#f59e0b", description: "Direct AI queries" },
  { name: "Other AI Tools", value: 2, color: "#ef4444", description: "Perplexity, Claude, etc." }
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-xs font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function AITrafficDistributionChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  return (
    <motion.div
      className="w-full bg-white border border-neutral-200 rounded-lg shadow-sm p-6 mb-8"
      initial="initial"
      animate="animate"
      variants={springScale}
    >
      <motion.div className="mb-6" variants={fadeInUp}>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">
          Search Traffic Distribution in 2025
        </h3>
        <p className="text-neutral-600 text-sm">
          Where users are finding information and how it impacts your business
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div variants={fadeInUp}>
          <div className="h-80 chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  animationDuration={1500}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke={activeIndex === index ? "#374151" : "none"}
                      strokeWidth={activeIndex === index ? 2 : 0}
                      style={{
                        filter: activeIndex === index ? "brightness(1.1)" : "none",
                        cursor: "pointer"
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    zIndex: 9999
                  }}
                  labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                  itemStyle={{ color: '#6b7280' }}
                  formatter={(value: any, name: any, props: any) => [
                    `${value}%`,
                    props.payload.description
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div className="space-y-4" variants={fadeInUp}>
          {data.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                activeIndex === index
                  ? 'border-neutral-300 bg-neutral-50'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <h4 className="font-semibold text-neutral-900">{item.name}</h4>
                <span className="text-sm font-bold text-neutral-600">{item.value}%</span>
              </div>
              <p className="text-sm text-neutral-600">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="mt-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500"
        variants={fadeInUp}
      >
        <p className="text-sm text-purple-800">
          <strong>Strategic Takeaway:</strong> Google's AI Overviews are the biggest disruptor, 
          not ChatGPT. Focus your optimization efforts on appearing in Google's AI summaries.
        </p>
      </motion.div>
    </motion.div>
  )
}