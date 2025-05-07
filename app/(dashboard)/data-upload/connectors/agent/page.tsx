"use client"

const AGENT_CONNECTIONS = [
  { name: "SCADA_FuelFlow", type: "OPC UA", schedule: "rate(5 minutes)", status: "オンライン", last: "2023/5/1 21:34:56", statusColor: "green" },
  { name: "Factory_EnergyMeter", type: "Modbus TCP", schedule: "rate(15 minutes)", status: "オンライン", last: "2023/5/1 21:30:00", statusColor: "green" },
  { name: "WarehouseDB", type: "JDBC", schedule: "cron(0 0 * * *)", status: "オフライン", last: "2023/5/1 8:45:12", statusColor: "red" },
];

export default function AgentConnectorPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">外部データ取込</h1>
      <div className="flex gap-4 mb-6">
        <button className="px-6 py-2 rounded bg-gray-100 text-gray-600 font-semibold">クラウドSaaS</button>
        <button className="px-6 py-2 rounded border-2 border-blue-700 bg-white text-blue-700 font-semibold">オンプレミスエージェント</button>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded shadow text-sm font-medium">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="1.5"/><path d="M8 12h8M12 8v8" strokeWidth="1.5"/></svg>
          YAML設定を追加
        </button>
        <div className="flex-1" />
        <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded shadow text-sm font-medium">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 4h16v16H4z" strokeWidth="1.5"/><path d="M12 8v8M8 12h8" strokeWidth="1.5"/></svg>
          状態を更新
        </button>
      </div>
      <div className="bg-white rounded-lg shadow border mb-8">
        <h2 className="text-xl font-bold px-6 pt-6 pb-2">オンプレミスエージェント接続</h2>
        <p className="text-gray-500 px-6 pb-2">オンプレミス環境のデータソースに接続します</p>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500 text-left">
              <th className="px-6 py-3 font-semibold">接続名</th>
              <th className="px-6 py-3 font-semibold">接続タイプ</th>
              <th className="px-6 py-3 font-semibold">スケジュール</th>
              <th className="px-6 py-3 font-semibold">ステータス</th>
              <th className="px-6 py-3 font-semibold">最終ハートビート</th>
              <th className="px-6 py-3 font-semibold">操作</th>
            </tr>
          </thead>
          <tbody>
            {AGENT_CONNECTIONS.map((c) => (
              <tr key={c.name} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{c.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{c.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{c.schedule}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs ${c.statusColor === "green" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{c.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{c.last}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="hover:bg-gray-100 rounded-full p-2">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="1.5"/><path d="M12 8v4l2 2" strokeWidth="1.5"/></svg>
                  </button>
                  <button className="hover:bg-gray-100 rounded-full p-2">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16M4 12h16" strokeWidth="1.5"/></svg>
                  </button>
                  <button className="hover:bg-gray-100 rounded-full p-2">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/><circle cx="12" cy="5" r="1.5"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="text-lg font-bold mb-2">DataGatewayAgentのダウンロード</h2>
        <p className="text-gray-500 mb-4">オンプレミス環境からデータを安全に取得するためのツールです</p>
        <button className="px-6 py-2 bg-blue-700 text-white rounded font-semibold">ダウンロード</button>
      </div>
    </div>
  );
} 