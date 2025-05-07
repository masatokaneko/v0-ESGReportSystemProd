"use client"
import { useState } from "react"

const SCOPE_OPTIONS = ["Scope 1（直接排出）", "Scope 2（間接排出）", "Scope 3（その他間接排出）"];
const CATEGORY_OPTIONS = ["燃料使用", "電力使用", "水道使用", "廃棄物", "社用車", "その他"];
const LOCATION_OPTIONS = ["本社", "工場A", "工場B", "支店"];
const PERIOD_OPTIONS = ["2024年1月", "2024年2月", "2024年3月", "2024年第1四半期"];
const UNIT_OPTIONS = ["kWh", "m³", "kg", "t", "km"];

export default function OcrPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("0.00 t-CO2");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">ESGデータ登録</h1>
      <div className="bg-white rounded-lg shadow border p-8">
        <h2 className="text-xl font-bold mb-2">新規データ入力</h2>
        <p className="mb-6 text-gray-500">ESG関連データを入力し、承認プロセスに送信します</p>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">タイトル</label>
              <input className="w-full border rounded px-3 py-2" placeholder="データタイトル" />
            </div>
            <div>
              <label className="block mb-1 font-medium">カテゴリ</label>
              <select className="w-full border rounded px-3 py-2">
                <option>カテゴリを選択</option>
                {CATEGORY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">対象期間</label>
              <select className="w-full border rounded px-3 py-2">
                <option>対象期間を選択</option>
                {PERIOD_OPTIONS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">単位</label>
              <select className="w-full border rounded px-3 py-2">
                <option>単位を選択</option>
                {UNIT_OPTIONS.map((u) => <option key={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">計算結果</label>
              <input className="w-full border rounded px-3 py-2 bg-gray-50" value={result} readOnly />
            </div>
            <div>
              <label className="block mb-1 font-medium">備考</label>
              <textarea className="w-full border rounded px-3 py-2" rows={3} placeholder="補足情報があれば入力してください" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Scope</label>
              <select className="w-full border rounded px-3 py-2">
                {SCOPE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">拠点</label>
              <select className="w-full border rounded px-3 py-2">
                <option>拠点を選択</option>
                {LOCATION_OPTIONS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">数値</label>
              <input className="w-full border rounded px-3 py-2" type="number" defaultValue={0} />
            </div>
            <div>
              <label className="block mb-1 font-medium">排出係数</label>
              <input className="w-full border rounded px-3 py-2" type="number" defaultValue={0} />
              <span className="text-xs text-gray-400">単位あたりのCO2排出係数（t-CO2/単位）</span>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">添付ファイル</label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center text-gray-400 flex flex-col items-center justify-center min-h-[120px]">
              <input type="file" className="hidden" id="file-upload" onChange={e => setFile(e.target.files?.[0] || null)} />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto mb-2"><path d="M12 16V4m0 0l-4 4m4-4l4 4" strokeWidth="1.5"/><rect x="4" y="16" width="16" height="4" rx="2" strokeWidth="1.5"/></svg>
                {file ? <span>{file.name}</span> : <span>ファイルをドラッグ＆ドロップするか、クリックして選択してください<br />PDFファイル（最大10MB）</span>}
              </label>
            </div>
          </div>
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button type="button" className="px-6 py-2 bg-gray-100 text-gray-700 rounded font-semibold">下書き保存</button>
            <button type="submit" className="px-6 py-2 bg-blue-700 text-white rounded font-semibold">承認依頼</button>
          </div>
        </form>
      </div>
    </div>
  )
} 