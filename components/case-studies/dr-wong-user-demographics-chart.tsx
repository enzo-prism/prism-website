"use client"
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "New users", value: 80.9, color: "#6366F1" }, // indigo-500
  { name: "Returning users", value: 19.1, color: "#EF4444" }, // red-500
]

export function DrWongUserDemographicsChart() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="w-full h-56 sm:h-64">
        {" "}
        {/* Adjusted height for better aspect ratio */}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="70%" // Make the donut thicker
              outerRadius="90%" // Make the donut thicker
              dataKey="value"
              stroke="none"
              startAngle={90} // Start the first segment at the top
              endAngle={90 + 360}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-3xl sm:text-4xl font-bold text-neutral-800">{data[0].value}%</p>
          <p className="text-sm text-neutral-500 lowercase">{data[0].name}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-center space-x-4 text-sm text-neutral-600 lowercase">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
            {entry.name}
          </div>
        ))}
      </div>
    </div>
  )
}
