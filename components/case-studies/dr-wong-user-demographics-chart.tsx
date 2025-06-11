"use client"
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { useState } from "react"

const data = [
  { name: "new users", value: 80.9, color: "#6366F1" }, // indigo-500
  { name: "returning users", value: 19.1, color: "#EF4444" }, // red-500
] as const

export function DrWongUserDemographicsChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleEnter = (_: any, index: number) => setActiveIndex(index)
  const handleLeave = () => setActiveIndex(null)

  const activeData = activeIndex !== null ? data[activeIndex] : data[0]

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-full h-52 xs:h-56 sm:h-64 md:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="68%"
              outerRadius="92%"
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              startAngle={90}
              endAngle={450}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  cursor="pointer"
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [`${value}%`, name]}
              contentStyle={{ borderRadius: "0.5rem", backgroundColor: "hsla(var(--background)/0.95)" }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-3xl xs:text-4xl sm:text-5xl font-bold text-neutral-800">
            {activeData.value}%
          </p>
          <p className="text-sm sm:text-base text-neutral-500 lowercase">{activeData.name}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-neutral-600 lowercase">
        {data.map((entry, index) => (
          <button
            key={entry.name}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={handleLeave}
            className="flex items-center focus:outline-none"
          >
            <span
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.color, opacity: activeIndex === null || activeIndex === index ? 1 : 0.4 }}
            />
            {entry.name}
          </button>
        ))}
      </div>
    </div>
  )
}
