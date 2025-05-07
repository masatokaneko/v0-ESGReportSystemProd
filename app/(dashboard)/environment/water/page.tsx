"use client"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const sampleData = [
  { year: "2020", intake: 13000, discharge: 9500 },
  { year: "2021", intake: 12500, discharge: 9200 },
  { year: "2022", intake: 12300, discharge: 9100 },
  { year: "2023", intake: 12000, discharge: 9000 },
  { year: "2024", intake: 11800, discharge: 8900 },
]

export default function WaterPage() {
  const [year, setYear] = useState("2024")
  const [entity, setEntity] = useState("全社")
  const kpis = [
    { label: "取水量", value: 12000, unit: "m³", trend: "-3%", color: "green" },
    { label: "排水量", value: 9000, unit: "m³", trend: "+1%", color: "red" },
    { label: "再利用率", value: 25, unit: "%", trend: "+5%", color: "green" },
    { label: "高ストレス地域比率", value: 12, unit: "%", trend: "+2%", color: "yellow" },
  ]
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">水資源</h1>
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
            <span className={`text-xs mt-1 ${kpi.color === "red" ? "text-red-600" : kpi.color === "green" ? "text-green-600" : kpi.color === "yellow" ? "text-yellow-600" : "text-gray-400"}`}>{kpi.trend}</span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="font-bold mb-2">取水・排水推移</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="intake" stackId="a" fill="#3b82f6" name="取水量" />
              <Bar dataKey="discharge" stackId="a" fill="#10b981" name="排水量" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="font-bold mb-2">拠点別・水源別明細</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2">拠点</th>
                <th className="px-4 py-2">水源</th>
                <th className="px-4 py-2">取水量</th>
                <th className="px-4 py-2">排水量</th>
                <th className="px-4 py-2">再利用率</th>
                <th className="px-4 py-2">信頼度</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">工場A</td>
                <td className="px-4 py-2">地下水</td>
                <td className="px-4 py-2">5000</td>
                <td className="px-4 py-2">4000</td>
                <td className="px-4 py-2">20%</td>
                <td className="px-4 py-2"><span className="bg-green-100 text-green-800 px-2 rounded">98%</span></td>
              </tr>
              <tr>
                <td className="px-4 py-2">工場B</td>
                <td className="px-4 py-2">河川</td>
                <td className="px-4 py-2">7000</td>
                <td className="px-4 py-2">5000</td>
                <td className="px-4 py-2">30%</td>
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
