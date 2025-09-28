"use client"

import * as React from "react"
import { 
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  Line,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts"

import { cn } from "@/lib/utils"

interface ChartProps {
  data: any[]
  type: "line" | "bar" | "pie"
  dataKey?: string
  categoryKey?: string
  className?: string
  colors?: string[]
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ data, type, dataKey = "value", categoryKey = "name", className, colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"] }, ref) => {
    const renderChart = () => {
      switch (type) {
        case "line":
          return (
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={categoryKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey={dataKey} 
                  stroke={colors[0]} 
                  activeDot={{ r: 8 }} 
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          )
        case "bar":
          return (
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={categoryKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={dataKey} fill={colors[0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          )
        case "pie":
          return (
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey={dataKey}
                  nameKey={categoryKey}
                  label={({ name, percent }) => `${name} ${(percent as number * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          )
        default:
          return null
      }
    }

    return (
      <div ref={ref} className={cn("w-full h-full", className)}>
        {renderChart()}
      </div>
    )
  }
)

Chart.displayName = "Chart"

export { Chart }