"use client"
import { useRef, useState } from "react"

export default function CsvImportPage() {
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">CSVアップロード</h1>
        <button className="px-4 py-2 bg-white border rounded shadow text-sm font-medium flex items-center gap-2">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 4h16v16H4z" strokeWidth="1.5"/><path d="M12 8v8M8 12h8" strokeWidth="1.5"/></svg>
          テンプレートをダウンロード
        </button>
      </div>
      <div className="flex gap-4 mb-6">
        <button className="flex-1 px-6 py-2 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-700">アップロード</button>
        <button className="flex-1 px-6 py-2 rounded bg-gray-100 text-gray-600 font-semibold">インポート履歴</button>
      </div>
      <div className="bg-white rounded-lg shadow border p-8">
        <h2 className="text-lg font-bold mb-2">CSVファイルのアップロード</h2>
        <p className="text-gray-500 mb-6">ESGデータを含むCSVファイルをアップロードして一括登録します</p>
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center text-gray-400 flex flex-col items-center justify-center min-h-[120px]"
          onClick={() => inputRef.current?.click()}
          style={{ cursor: 'pointer' }}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={e => setFile(e.target.files?.[0] || null)}
          />
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto mb-2"><path d="M12 16V4m0 0l-4 4m4-4l4 4" strokeWidth="1.5"/><rect x="4" y="16" width="16" height="4" rx="2" strokeWidth="1.5"/></svg>
          {file ? (
            <span>{file.name}</span>
          ) : (
            <span>CSVファイルをドラッグ＆ドロップするか、クリックして選択してください<br />CSVファイル（最大10MB）</span>
          )}
          <button
            className="mt-4 px-6 py-2 bg-blue-700 text-white rounded font-semibold"
            onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
          >
            ファイルを選択
          </button>
        </div>
      </div>
    </div>
  )
} 