"use client"

const DEFAULT_CONNECTORS = [
  { name: "SAP S/4HANA Cloud",  category: "FinanceERP", sample: ["JournalEntry","FuelExpense","Asset"] },
  { name: "Oracle Fusion ERP",  category: "FinanceERP", sample: ["GL","PO","Inventory"] },
  { name: "Microsoft Dynamics 365 Finance", category: "FinanceERP", sample: ["Voucher","VendorInvoice"] },
  { name: "NetSuite",          category: "FinanceERP", sample: ["Transaction","ItemFulfillment"] },
  { name: "Freee",             category: "Accounting", sample: ["勘定科目","取引","請求書"] },
  { name: "Salesforce",        category: "CRM",        sample: ["Opportunity","Contract","UsageQuantity"] },
  { name: "EnergyCAP",         category: "EnergyEMS",  sample: ["MeterReading","Cost","FuelType"] },
  { name: "Workday",           category: "HRSafety",   sample: ["Headcount","SafetyIncident"] },
  { name: "Watershed",         category: "Sustainability", sample: ["GHGInventory","ReductionPlan"] },
  { name: "Box",               category: "Document",   sample: ["PDF","CSV"] }
];

function statusLabel(index: number) {
  // ダミー: 2件だけ接続済み、それ以外は未接続
  if (index === 2 || index === 3) {
    return <span className="rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs">接続済み</span>;
  }
  return <span className="rounded-full bg-gray-100 text-gray-500 px-3 py-1 text-xs">未接続</span>;
}

export default function CloudConnectorPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">クラウドSaaSコネクタ</h1>
      <p className="text-gray-500 mb-6">クラウドサービスからESGデータを自動取得します</p>
      <div className="bg-white rounded-lg shadow border">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500 text-left">
              <th className="px-6 py-3 font-semibold">名前</th>
              <th className="px-6 py-3 font-semibold">カテゴリ</th>
              <th className="px-6 py-3 font-semibold">サンプルデータ</th>
              <th className="px-6 py-3 font-semibold">ステータス</th>
              <th className="px-6 py-3 font-semibold">同期スケジュール</th>
              <th className="px-6 py-3 font-semibold">操作</th>
            </tr>
          </thead>
          <tbody>
            {DEFAULT_CONNECTORS.map((c, i) => (
              <tr key={c.name} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{c.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{c.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    {c.sample.map((s) => (
                      <span key={s} className="bg-gray-100 text-gray-700 rounded px-2 py-0.5 text-xs">{s}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">{statusLabel(i)}</td>
                <td className="px-6 py-4 text-gray-400">未設定</td>
                <td className="px-6 py-4">
                  <button className="rounded-full hover:bg-gray-100 p-2">
                    <span className="sr-only">操作</span>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 