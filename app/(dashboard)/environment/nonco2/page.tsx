"use client"
import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const sampleData = [
  { year: "2020", N2O: 30, SF6: 10, CH4: 20 },
  { year: "2021", N2O: 32, SF6: 12, CH4: 22 },
  { year: "2022", N2O: 31, SF6: 11, CH4: 21 },
  { year: "2023", N2O: 33, SF6: 13, CH4: 23 },
  { year: "2024", N2O: 35, SF6: 14, CH4: 25 },
]

export default function NonCo2Page() {
  const [year, setYear] = useState("2024")
  const [entity, setEntity] = useState("全社")
  const kpis = [
    { label: "N₂O (t-CO₂e)", value: 35, unit: "t", trend: "+6%", color: "red" },
    { label: "SF₆ (t-CO₂e)", value: 14, unit: "t", trend: "+8%", color: "red" },
    { label: "CH₄ (t-CO₂e)", value: 25, unit: "t", trend: "+4%", color: "yellow" },
  ]
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">非CO₂</h1>
      <div className="flex gap-4 mb-6">
        <select value={year} onChange={e => setYear(e.target.value)} className="border rounded px-3 py-2">
          <option>2024</option><option>2023</option><option>2022</option><option>2021</option><option>2020</option>
        </select>
        <select value={entity} onChange={e => setEntity(e.target.value)} className="border rounded px-3 py-2">
          <option>全社</option><option>工場A</option><option>工場B</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white rounded shadow p-4 flex flex-col items-center border">
            <span className="font-bold text-lg">{kpi.value} {kpi.unit}</span>
            <span className="text-gray-500">{kpi.label}</span>
            <span className={`text-xs mt-1 ${kpi.color === "red" ? "text-red-600" : kpi.color === "yellow" ? "text-yellow-600" : "text-gray-400"}`}>{kpi.trend}</span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="font-bold mb-2">ガス別トレンド</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sampleData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="N2O" stackId="1" stroke="#6366f1" fill="#6366f1" name="N₂O" />
              <Area type="monotone" dataKey="SF6" stackId="1" stroke="#f59e42" fill="#f59e42" name="SF₆" />
              <Area type="monotone" dataKey="CH4" stackId="1" stroke="#10b981" fill="#10b981" name="CH₄" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="font-bold mb-2">設備・工程別排出明細</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2">設備</th>
                <th className="px-4 py-2">工程</th>
                <th className="px-4 py-2">N₂O</th>
                <th className="px-4 py-2">SF₆</th>
                <th className="px-4 py-2">CH₄</th>
                <th className="px-4 py-2">信頼度</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">ボイラーA</td>
                <td className="px-4 py-2">燃焼</td>
                <td className="px-4 py-2">10</td>
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">5</td>
                <td className="px-4 py-2"><span className="bg-green-100 text-green-800 px-2 rounded">97%</span></td>
              </tr>
              <tr>
                <td className="px-4 py-2">変圧器B</td>
                <td className="px-4 py-2">保守</td>
                <td className="px-4 py-2">0</td>
                <td className="px-4 py-2">8</td>
                <td className="px-4 py-2">0</td>
                <td className="px-4 py-2"><span className="bg-yellow-100 text-yellow-800 px-2 rounded">85%</span></td>
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
