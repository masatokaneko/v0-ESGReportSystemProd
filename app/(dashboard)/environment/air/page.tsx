"use client"
import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const sampleData = [
  { year: "2020", NOx: 110, SOx: 90 },
  { year: "2021", NOx: 115, SOx: 85 },
  { year: "2022", NOx: 118, SOx: 82 },
  { year: "2023", NOx: 120, SOx: 80 },
  { year: "2024", NOx: 122, SOx: 78 },
]

export default function AirPage() {
  const [year, setYear] = useState("2024")
  const [entity, setEntity] = useState("全社")
  const kpis = [
    { label: "NOx排出量", value: 120, unit: "t", trend: "+2%", color: "red" },
    { label: "SOx排出量", value: 80, unit: "t", trend: "-1%", color: "green" },
    { label: "PM", value: 30, unit: "t", trend: "0%", color: "gray" },
    { label: "Pb", value: 0.5, unit: "t", trend: "-5%", color: "green" },
    { label: "Hg", value: 0.01, unit: "t", trend: "+1%", color: "yellow" },
  ]
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">大気質</h1>
      <div className="flex gap-4 mb-6">
        <select value={year} onChange={e => setYear(e.target.value)} className="border rounded px-3 py-2">
          <option>2024</option><option>2023</option><option>2022</option><option>2021</option><option>2020</option>
        </select>
        <select value={entity} onChange={e => setEntity(e.target.value)} className="border rounded px-3 py-2">
          <option>全社</option><option>発電所A</option><option>発電所B</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white rounded shadow p-4 flex flex-col items-center border">
            <span className="font-bold text-lg">{kpi.value} {kpi.unit}</span>
            <span className="text-gray-500">{kpi.label}</span>
            <span className={`text-xs mt-1 ${kpi.color === "red" ? "text-red-600" : kpi.color === "green" ? "text-green-600" : kpi.color === "yellow" ? "text-yellow-600" : "text-gray-400"}`}>{kpi.trend}</span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="font-bold mb-2">NOx & SOx 推移</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="NOx" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="SOx" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="font-bold mb-2">排出明細</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2">発電所</th>
                <th className="px-4 py-2">NOx</th>
                <th className="px-4 py-2">SOx</th>
                <th className="px-4 py-2">信頼度</th>
                <th className="px-4 py-2">アラート</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">発電所A</td>
                <td className="px-4 py-2">50</td>
                <td className="px-4 py-2">30</td>
                <td className="px-4 py-2"><span className="bg-yellow-100 text-yellow-800 px-2 rounded">85%</span></td>
                <td className="px-4 py-2"><span className="bg-red-100 text-red-800 px-2 rounded">超過</span></td>
              </tr>
              <tr>
                <td className="px-4 py-2">発電所B</td>
                <td className="px-4 py-2">70</td>
                <td className="px-4 py-2">50</td>
                <td className="px-4 py-2"><span className="bg-green-100 text-green-800 px-2 rounded">95%</span></td>
                <td className="px-4 py-2"></td>
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
