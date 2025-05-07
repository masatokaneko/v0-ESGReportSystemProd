"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface VisualizationData {
  name: string
  category: string
  unit: string
  data: {
    year: number
    value: number
  }[]
}

export default function DataVisualizationPage() {
  const [data, setData] = useState<VisualizationData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [startYear, setStartYear] = useState<number>(2022)
  const [endYear, setEndYear] = useState<number>(2023)

  useEffect(() => {
    fetchData()
  }, [selectedCategory, startYear, endYear])

  const fetchData = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedCategory) params.append("categoryId", selectedCategory)
      params.append("startYear", startYear.toString())
      params.append("endYear", endYear.toString())

      const response = await fetch(`/api/visualization?${params}`)
      if (!response.ok) throw new Error("データの取得に失敗しました")
      const result = await response.json()
      setData(result.data)
      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました")
      setIsLoading(false)
    }
  }

  const handleExport = async (format: "csv" | "json") => {
    try {
      const params = new URLSearchParams()
      if (selectedCategory) params.append("category", selectedCategory)
      params.append("format", format)

      const response = await fetch(`/api/export?${params}`)
      if (!response.ok) throw new Error("データのエクスポートに失敗しました")

      if (format === "csv") {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `esg_data_${new Date().toISOString().split("T")[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        const result = await response.json()
        const blob = new Blob([JSON.stringify(result.data, null, 2)], {
          type: "application/json",
        })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `esg_data_${new Date().toISOString().split("T")[0]}.json`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました")
    }
  }

  if (isLoading) return <div className="p-8">読み込み中...</div>
  if (error) return <div className="p-8 text-red-600">{error}</div>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">データ可視化</h1>
        <div className="space-x-2">
          <button
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            onClick={() => handleExport("csv")}
          >
            CSVエクスポート
          </button>
          <button
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            onClick={() => handleExport("json")}
          >
            JSONエクスポート
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            カテゴリ
          </label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">すべて</option>
            <option value="ENV">環境</option>
            <option value="SOC">社会</option>
            <option value="GOV">ガバナンス</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            開始年度
          </label>
          <input
            type="number"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={startYear}
            onChange={(e) => setStartYear(parseInt(e.target.value))}
            min={2022}
            max={endYear}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            終了年度
          </label>
          <input
            type="number"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={endYear}
            onChange={(e) => setEndYear(parseInt(e.target.value))}
            min={startYear}
            max={2023}
          />
        </div>
      </div>

      <div className="space-y-8">
        {data.map((item) => (
          <div key={item.name} className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold mb-2">{item.name}</h2>
            <p className="text-sm text-gray-500 mb-4">
              {item.category} - 単位: {item.unit}
            </p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={item.data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    label={{
                      value: "年度",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: item.unit,
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name={item.name}
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 