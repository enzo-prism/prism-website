"use client"

import React from "react"

interface MobileStrategyCardProps {
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  timeframe: string
  impact: "Low" | "Medium" | "High"
  steps?: string[]
  tips?: string[]
  icon?: "target" | "users" | "zap" | "message-circle" | "layout-grid" | "gauge" | "scale"
  className?: string
}

export function MobileStrategyCard({
  title,
  description,
  difficulty,
  timeframe,
  impact,
  steps = [],
  tips = [],
  className = ""
}: MobileStrategyCardProps) {
  return (
    <div className={`border-b border-neutral-100 py-8 ${className}`}>
      {/* Title */}
      <h3 className="text-lg font-bold text-neutral-900 mb-3">
        {title}
      </h3>
      
      {/* Meta info */}
      <div className="flex gap-4 text-sm text-neutral-500 mb-4">
        <span>{difficulty}</span>
        <span>•</span>
        <span>{timeframe}</span>
        <span>•</span>
        <span>{impact} impact</span>
      </div>
      
      {/* Description */}
      <p className="text-neutral-600 mb-6 leading-relaxed">
        {description}
      </p>
      
      {/* Steps */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-neutral-900 mb-3">Steps:</h4>
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-xs text-neutral-600 mt-0.5">
                {index + 1}
              </span>
              <span className="text-sm text-neutral-700 leading-relaxed">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
      
      {/* Tips */}
      {tips.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-neutral-900 mb-3">Tips:</h4>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="text-sm text-neutral-600 leading-relaxed">
                • {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
