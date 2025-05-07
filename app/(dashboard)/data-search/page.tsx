"use client"
import { useState, useEffect } from "react"

interface DataRow {
  id: string
  title: string
  category: string
  entityName: string
  kpiName: string
  unit: string
  value: string
  fiscalYear: number
  sourceType: string
  createdAt: string
}

interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
}

interface Option { id: string; code?: string; name: string; }

export default function DataSearchPage() {
  const [keyword, setKeyword] = useState("")
  const [category, setCategory] = useState("")
  const [entityId, setEntityId] = useState("")
  const [fiscalYear, setFiscalYear] = useState("")
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([])
  const [entityOptions, setEntityOptions] = useState<Option[]>([])
  const [yearOptions, setYearOptions] = useState<number[]>([])
  const [data, setData] = useState<DataRow[]>([])
  const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: 10, totalPages: 1 })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // limit, page
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchOptions()
  }, [])

  const fetchOptions = async () => {
    const res = await fetch("/api/data-search/options")
    const data = await res.json()
    setCategoryOptions(data.categories)
    setEntityOptions(data.entities)
    setYearOptions(data.years)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [keyword, category, entityId, fiscalYear, limit, page])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (keyword) params.append("keyword", keyword)
      if (category) params.append("category", category)
      if (entityId) params.append("entityId", entityId)
      if (fiscalYear) params.append("fiscalYear", fiscalYear)
      params.append("limit", limit.toString())
      params.append("page", page.toString())
      const res = await fetch(`/api/data-search?${params}`)
      if (!res.ok) throw new Error("データの取得に失敗しました")
      const result = await res.json()
      setData(result.data)
      setPagination(result.pagination)
      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました")
      setIsLoading(false)
    }
  }

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value))
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return
    setPage(newPage)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">データ検索</h1>
      <div className="bg-white rounded-lg shadow border p-6 mb-6">
        <h2 className="font-bold mb-4">検索条件</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <input className="border rounded px-3 py-2 col-span-2" placeholder="タイトル、KPI名、拠点名などで検索..." value={keyword} onChange={e => { setKeyword(e.target.value); setPage(1); }} />
          <select className="border rounded px-3 py-2" value={category} onChange={e => { setCategory(e.target.value); setPage(1); }}>
            <option value="">カテゴリを選択</option>
            {categoryOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
          </select>
          <select className="border rounded px-3 py-2" value={entityId} onChange={e => { setEntityId(e.target.value); setPage(1); }}>
            <option value="">拠点を選択</option>
            {entityOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
          </select>
          <select className="border rounded px-3 py-2" value={fiscalYear} onChange={e => { setFiscalYear(e.target.value); setPage(1); }}>
            <option value="">年度を選択</option>
            {yearOptions.map(y => <option key={y} value={y}>{y}年度</option>)}
          </select>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow border p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-2">
          <span>
            {isLoading ? "検索中..." : `${pagination.total}件のデータが見つかりました`}
            {pagination.total > 0 && (
              <span className="ml-2 text-gray-500 text-xs">( {pagination.page} / {pagination.totalPages} ページ )</span>
            )}
          </span>
          <div className="flex items-center gap-2">
            <label className="text-sm">表示件数</label>
            <select className="border rounded px-2 py-1" value={limit} onChange={handleLimitChange}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <button
              className="px-4 py-2 bg-white border rounded shadow text-sm font-medium flex items-center gap-2"
              onClick={async () => {
                // CSVエクスポート
                const params = new URLSearchParams()
                if (keyword) params.append("keyword", keyword)
                params.append("limit", pagination.total.toString())
                params.append("page", "1")
                params.append("format", "csv")
                const res = await fetch(`/api/export?${params}`)
                const blob = await res.blob()
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = `esg_data_${new Date().toISOString().split("T")[0]}.csv`
                document.body.appendChild(a)
                a.click()
                window.URL.revokeObjectURL(url)
                document.body.removeChild(a)
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 4h16v16H4z" strokeWidth="1.5"/><path d="M12 8v8M8 12h8" strokeWidth="1.5"/></svg>
              CSVエクスポート
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2">タイトル</th>
                <th className="px-4 py-2">カテゴリ</th>
                <th className="px-4 py-2">拠点</th>
                <th className="px-4 py-2">KPI</th>
                <th className="px-4 py-2">値</th>
                <th className="px-4 py-2">単位</th>
                <th className="px-4 py-2">年度</th>
                <th className="px-4 py-2">データソース</th>
                <th className="px-4 py-2">作成日時</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={9} className="text-center py-8">読み込み中...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-8">データがありません</td></tr>
              ) : (
                data.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-2">{row.title}</td>
                    <td className="px-4 py-2">{row.category}</td>
                    <td className="px-4 py-2">{row.entityName}</td>
                    <td className="px-4 py-2">{row.kpiName}</td>
                    <td className="px-4 py-2 text-right">{row.value}</td>
                    <td className="px-4 py-2">{row.unit}</td>
                    <td className="px-4 py-2">{row.fiscalYear}</td>
                    <td className="px-4 py-2">{row.sourceType}</td>
                    <td className="px-4 py-2">{row.createdAt ? new Date(row.createdAt).toLocaleString() : ""}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* ページネーション */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            className="px-3 py-1 border rounded bg-gray-50"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >&lt; 前へ</button>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`px-3 py-1 border rounded ${p === page ? "bg-blue-50 text-blue-700 font-bold" : "bg-gray-50"}`}
              onClick={() => handlePageChange(p)}
            >{p}</button>
          ))}
          <button
            className="px-3 py-1 border rounded bg-gray-50"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === pagination.totalPages}
          >次へ &gt;</button>
        </div>
      </div>
    </div>
  )
} 