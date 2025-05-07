"use client"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const sampleData = [
  { year: "2020", ccr: 5000, recycle: 40 },
  { year: "2021", ccr: 4800, recycle: 45 },
  { year: "2022", ccr: 4700, recycle: 50 },
  { year: "2023", ccr: 4600, recycle: 55 },
  { year: "2024", ccr: 4500, recycle: 60 },
]

export default function WastePage() {
  const [year, setYear] = useState("2024")
  const [entity, setEntity] = useState("全社")
  const kpis = [
    { label: "総発生量", value: 4500, unit: "t", trend: "-2%", color: "green" },
    { label: "再資源化率", value: 60, unit: "%", trend: "+5%", color: "green" },
    { label: "堆積池数", value: 8, unit: "", trend: "0", color: "gray" },
    { label: "危険度高ダム数", value: 1, unit: "", trend: "0", color: "red" },
  ]
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">廃棄物・石炭灰</h1>
      <div className="flex gap-4 mb-6">
        <select value={year} onChange={e => setYear(e.target.value)} className="border rounded px-3 py-2">
          <option>2024</option><option>2023</option><option>2022</option><option>2021</option><option>2020</option>
        </select>
        <select value={entity} onChange={e => setEntity(e.target.value)} className="border rounded px-3 py-2">
          <option>全社</option><option>工場A</option><option>工場B</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white rounded shadow p-4 flex flex-col items-center border">
            <span className="font-bold text-lg">{kpi.value} {kpi.unit}</span>
            <span className="text-gray-500">{kpi.label}</span>
            <span className={`text-xs mt-1 ${kpi.color === "red" ? "text-red-600" : kpi.color === "green" ? "text-green-600" : "text-gray-400"}`}>{kpi.trend}</span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="font-bold mb-2">CCR量・再資源化率推移</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="ccr" fill="#6366f1" name="CCR量" />
              <Bar yAxisId="right" dataKey="recycle" fill="#10b981" name="再資源化率" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="font-bold mb-2">品目×処分方法×拠点 明細</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2">品目</th>
                <th className="px-4 py-2">処分方法</th>
                <th className="px-4 py-2">拠点</th>
                <th className="px-4 py-2">量</th>
                <th className="px-4 py-2">信頼度</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">石炭灰</td>
                <td className="px-4 py-2">再資源化</td>
                <td className="px-4 py-2">工場A</td>
                <td className="px-4 py-2">2000</td>
                <td className="px-4 py-2"><span className="bg-green-100 text-green-800 px-2 rounded">99%</span></td>
              </tr>
              <tr>
                <td className="px-4 py-2">石膏</td>
                <td className="px-4 py-2">埋立</td>
                <td className="px-4 py-2">工場B</td>
                <td className="px-4 py-2">500</td>
                <td className="px-4 py-2"><span className="bg-yellow-100 text-yellow-800 px-2 rounded">80%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-blue-700 text-white rounded">データインポート</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded">CSVエクスポート</button>
      </div>
    </div>
  )
}
