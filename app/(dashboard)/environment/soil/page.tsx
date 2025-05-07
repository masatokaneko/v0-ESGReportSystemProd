"use client"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const sampleData = [
  { year: "2020", pcb: 30, waste: 120, cleanup: 60 },
  { year: "2021", pcb: 28, waste: 110, cleanup: 65 },
  { year: "2022", pcb: 25, waste: 100, cleanup: 70 },
  { year: "2023", pcb: 20, waste: 90, cleanup: 80 },
  { year: "2024", pcb: 15, waste: 80, cleanup: 90 },
]

export default function SoilPage() {
  const [year, setYear] = useState("2024")
  const [entity, setEntity] = useState("全社")
  const kpis = [
    { label: "PCB機器数", value: 15, unit: "台", trend: "-25%", color: "green" },
    { label: "廃油排出量", value: 80, unit: "t", trend: "-11%", color: "green" },
    { label: "汚染対策完了率", value: 90, unit: "%", trend: "+10%", color: "green" },
  ]
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">土壌・化学物質</h1>
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
            <span className={`text-xs mt-1 ${kpi.color === "green" ? "text-green-600" : "text-gray-400"}`}>{kpi.trend}</span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="font-bold mb-2">PCB・廃油・対策完了率推移</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pcb" fill="#6366f1" name="PCB機器数" />
              <Bar dataKey="waste" fill="#f59e42" name="廃油排出量" />
              <Bar dataKey="cleanup" fill="#10b981" name="汚染対策完了率" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="font-bold mb-2">化学物質×排出量 明細</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2">化学物質</th>
                <th className="px-4 py-2">排出量 (t)</th>
                <th className="px-4 py-2">拠点</th>
                <th className="px-4 py-2">信頼度</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">PCB</td>
                <td className="px-4 py-2">5</td>
                <td className="px-4 py-2">工場A</td>
                <td className="px-4 py-2"><span className="bg-green-100 text-green-800 px-2 rounded">99%</span></td>
              </tr>
              <tr>
                <td className="px-4 py-2">VOC</td>
                <td className="px-4 py-2">10</td>
                <td className="px-4 py-2">工場B</td>
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
