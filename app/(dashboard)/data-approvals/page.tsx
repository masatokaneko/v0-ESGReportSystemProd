"use client"
import { useState } from "react"

// データ構造例
const MOCK_DATA = [
  {
    id: "ESG-2023-001",
    date: "2023-04-01",
    location: "東京本社",
    department: "総務部",
    activityType: "電力使用量",
    emission: 5287.5,
    status: "承認待ち",
    submitter: "山田太郎",
  },
  {
    id: "ESG-2023-002",
    date: "2023-04-01",
    location: "大阪支社",
    department: "営業部",
    activityType: "ガス使用量",
    emission: 1003.5,
    status: "承認待ち",
    submitter: "佐藤花子",
  },
  {
    id: "ESG-2023-003",
    date: "2023-04-01",
    location: "名古屋支社",
    department: "製造部",
    activityType: "燃料消費量",
    emission: 825.6,
    status: "承認待ち",
    submitter: "鈴木一郎",
  },
]

export default function DataApprovalsPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("承認待ち")
  const [department, setDepartment] = useState("")

  // フィルタリング処理
  const filtered = MOCK_DATA.filter(row => {
    return (
      (search === "" || row.id.includes(search) || row.location.includes(search) || row.department.includes(search) || row.activityType.includes(search) || row.submitter.includes(search)) &&
      (status === "" || row.status === status) &&
      (department === "" || row.department === department)
    )
  })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">データ承認</h1>
      <div className="mb-4">
        <h2 className="font-bold mb-1">承認待ちデータ一覧</h2>
        <p className="text-sm text-gray-500 mb-2">登録されたESGデータを確認し、承認または差戻しを行います。</p>
        <div className="flex flex-wrap gap-2 mb-2">
          <input className="border rounded px-3 py-2 w-64" placeholder="キーワード検索..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="border rounded px-3 py-2" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">すべて</option>
            <option value="承認待ち">承認待ち</option>
            <option value="承認済み">承認済み</option>
            <option value="差戻し">差戻し</option>
          </select>
          <select className="border rounded px-3 py-2" value={department} onChange={e => setDepartment(e.target.value)}>
            <option value="">すべて</option>
            <option value="総務部">総務部</option>
            <option value="営業部">営業部</option>
            <option value="製造部">製造部</option>
          </select>
          <button className="border rounded px-4 py-2 bg-blue-600 text-white">フィルター適用</button>
        </div>
      </div>
      <div className="bg-white rounded shadow border">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">日付</th>
              <th className="px-4 py-2">拠点</th>
              <th className="px-4 py-2">部門</th>
              <th className="px-4 py-2">活動種類</th>
              <th className="px-4 py-2">排出量(kg-CO2)</th>
              <th className="px-4 py-2">ステータス</th>
              <th className="px-4 py-2">登録者</th>
              <th className="px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9} className="text-center py-8">データがありません</td></tr>
            ) : (
              filtered.map(row => (
                <tr key={row.id}>
                  <td className="px-4 py-2">{row.id}</td>
                  <td className="px-4 py-2">{row.date}</td>
                  <td className="px-4 py-2">{row.location}</td>
                  <td className="px-4 py-2">{row.department}</td>
                  <td className="px-4 py-2">{row.activityType}</td>
                  <td className="px-4 py-2 text-right">{row.emission.toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">{row.status}</span>
                  </td>
                  <td className="px-4 py-2">{row.submitter}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <button title="詳細" className="text-gray-500 hover:text-blue-600"><span role="img" aria-label="詳細">📄</span></button>
                    <button title="承認" className="text-green-600 hover:underline"><span role="img" aria-label="承認">✔️</span></button>
                    <button title="差戻し" className="text-red-600 hover:underline"><span role="img" aria-label="差戻し">❌</span></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
} 