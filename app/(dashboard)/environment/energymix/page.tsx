"use client"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const sampleData = [
  { year: "2020", coal: 60, lng: 25, oil: 10, re: 5 },
  { year: "2021", coal: 55, lng: 28, oil: 10, re: 7 },
  { year: "2022", coal: 50, lng: 30, oil: 10, re: 10 },
  { year: "2023", coal: 45, lng: 32, oil: 8, re: 15 },
  { year: "2024", coal: 40, lng: 33, oil: 7, re: 20 },
]

export default function EnergyMixPage() {
  const [year, setYear] = useState("2024")
  const [entity, setEntity] = useState("全社")
  const kpis = [
    { label: "石炭比率", value: 40, unit: "%", trend: "-5%", color: "green" },
    { label: "LNG比率", value: 33, unit: "%", trend: "+1%", color: "yellow" },
    { label: "再エネ比率", value: 20, unit: "%", trend: "+5%", color: "green" },
    { label: "設備容量", value: 1200, unit: "MW", trend: "+2%", color: "green" },
  ]
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">燃料構成</h1>
      <div className="flex gap-4 mb-6">
        <select value={year} onChange={e => setYear(e.target.value)} className="border rounded px-3 py-2">
          <option>2024</option><option>2023</option><option>2022</option><option>2021</option><option>2020</option>
        </select>
        <select value={entity} onChange={e => setEntity(e.target.value)} className="border rounded px-3 py-2">
          <option>全社</option><option>発電所A</option><option>発電所B</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white rounded shadow p-4 flex flex-col items-center border">
            <span className="font-bold text-lg">{kpi.value} {kpi.unit}</span>
            <span className="text-gray-500">{kpi.label}</span>
            <span className={`text-xs mt-1 ${kpi.color === "green" ? "text-green-600" : kpi.color === "yellow" ? "text-yellow-600" : "text-gray-400"}`}>{kpi.trend}</span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="font-bold mb-2">燃料別発電量推移</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="coal" stackId="a" fill="#6366f1" name="石炭" />
              <Bar dataKey="lng" stackId="a" fill="#3b82f6" name="LNG" />
              <Bar dataKey="oil" stackId="a" fill="#f59e42" name="石油" />
              <Bar dataKey="re" stackId="a" fill="#10b981" name="再エネ" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="font-bold mb-2">ユニット別容量・稼働率</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2">ユニット</th>
                <th className="px-4 py-2">容量 (MW)</th>
                <th className="px-4 py-2">稼働率 (%)</th>
                <th className="px-4 py-2">燃料</th>
                <th className="px-4 py-2">信頼度</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">1号機</td>
                <td className="px-4 py-2">500</td>
                <td className="px-4 py-2">85</td>
                <td className="px-4 py-2">石炭</td>
                <td className="px-4 py-2"><span className="bg-green-100 text-green-800 px-2 rounded">99%</span></td>
              </tr>
              <tr>
                <td className="px-4 py-2">2号機</td>
                <td className="px-4 py-2">700</td>
                <td className="px-4 py-2">90</td>
                <td className="px-4 py-2">LNG</td>
                <td className="px-4 py-2"><span className="bg-yellow-100 text-yellow-800 px-2 rounded">88%</span></td>
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
