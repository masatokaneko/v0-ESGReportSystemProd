"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Database, Cloud, Server, FileCode, RefreshCw, Edit } from "lucide-react"

// モックデータ
const DEFAULT_CONNECTORS = [
  { name: "SAP S/4HANA Cloud", category: "FinanceERP", sampleData: ["JournalEntry", "FuelExpense", "Asset"] },
  { name: "Oracle Fusion ERP", category: "FinanceERP", sampleData: ["GL", "PO", "Inventory"] },
  { name: "Microsoft Dynamics 365 Finance", category: "FinanceERP", sampleData: ["Voucher", "VendorInvoice"] },
  { name: "NetSuite", category: "FinanceERP", sampleData: ["Transaction", "ItemFulfillment"] },
  { name: "Freee", category: "Accounting", sampleData: ["勘定科目", "取引", "請求書"] },
  { name: "QuickBooks Online", category: "Accounting", sampleData: ["Journal", "Invoice", "Bill"] },
  { name: "Xero", category: "Accounting", sampleData: ["Accounts", "Payments"] },
  { name: "Salesforce", category: "CRM", sampleData: ["Opportunity", "Contract", "UsageQuantity"] },
  { name: "HubSpot", category: "CRM", sampleData: ["Deal", "Quote"] },
  { name: "ServiceNow", category: "CRM", sampleData: ["Asset", "WorkOrder"] },
  { name: "SAP Ariba", category: "SCM", sampleData: ["PurchaseOrder", "GR/IR", "Supplier"] },
  { name: "Coupa", category: "SCM", sampleData: ["Invoice", "Spend", "Supplier"] },
  { name: "Ivalua", category: "SCM", sampleData: ["Commodity", "PO", "Contract"] },
  { name: "EnergyCAP", category: "EnergyEMS", sampleData: ["MeterReading", "Cost", "FuelType"] },
  { name: "EcoStruxure Resource Advisor", category: "EnergyEMS", sampleData: ["SiteEnergy", "GHGFactor"] },
  { name: "EnOS", category: "EnergyEMS", sampleData: ["PowerGeneration", "FuelMix"] },
  { name: "Workday", category: "HRSafety", sampleData: ["Headcount", "SafetyIncident"] },
  { name: "SAP SuccessFactors", category: "HRSafety", sampleData: ["Employee", "Accident"] },
  { name: "Watershed", category: "Sustainability", sampleData: ["GHGInventory", "ReductionPlan"] },
  { name: "Persefoni", category: "Sustainability", sampleData: ["EmissionFactor", "AuditLog"] },
  { name: "Box", category: "Document", sampleData: ["PDF", "CSV"] },
  { name: "Google Drive", category: "Document", sampleData: ["PDF", "Spreadsheet"] },
]

// 接続済みコネクタのモックデータ
const CONNECTED_CONNECTORS = [
  {
    id: "1",
    name: "SAP S/4HANA Cloud",
    category: "FinanceERP",
    sampleData: ["JournalEntry", "FuelExpense", "Asset"],
    status: "connected",
    lastSync: "2023-05-01 10:23",
    schedule: "daily",
  },
  {
    id: "2",
    name: "Salesforce",
    category: "CRM",
    sampleData: ["Opportunity", "Contract", "UsageQuantity"],
    status: "connected",
    lastSync: "2023-05-01 09:15",
    schedule: "hourly",
  },
  {
    id: "3",
    name: "EnergyCAP",
    category: "EnergyEMS",
    sampleData: ["MeterReading", "Cost", "FuelType"],
    status: "error",
    lastSync: "2023-04-30 16:45",
    schedule: "daily",
  },
  {
    id: "4",
    name: "Google Drive",
    category: "Document",
    sampleData: ["PDF", "Spreadsheet"],
    status: "connected",
    lastSync: "2023-04-29 14:30",
    schedule: "weekly",
  },
]

export default function ConnectorsPage() {
  const [connectedConnectors, setConnectedConnectors] = useState(CONNECTED_CONNECTORS)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null)
  const [isAgentDialogOpen, setIsAgentDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleAddConnector = () => {
    if (!selectedConnector) return

    const connectorToAdd = DEFAULT_CONNECTORS.find((c) => c.name === selectedConnector)
    if (!connectorToAdd) return

    const newConnector = {
      id: `${connectedConnectors.length + 1}`,
      ...connectorToAdd,
      status: "connected",
      lastSync: "未同期",
      schedule: "daily",
    }

    setConnectedConnectors([...connectedConnectors, newConnector])
    setIsAddDialogOpen(false)
    setSelectedConnector(null)

    toast({
      title: "コネクタ追加完了",
      description: `${connectorToAdd.name}が正常に追加されました`,
    })
  }

  const handleRunNow = (id: string) => {
    toast({
      title: "同期開始",
      description: "データの同期を開始しました。完了までしばらくお待ちください。",
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "FinanceERP":
        return <Database className="h-4 w-4 text-blue-500" />
      case "Accounting":
        return <Database className="h-4 w-4 text-indigo-500" />
      case "CRM":
        return <Database className="h-4 w-4 text-green-500" />
      case "SCM":
        return <Database className="h-4 w-4 text-orange-500" />
      case "EnergyEMS":
        return <Database className="h-4 w-4 text-yellow-500" />
      case "HRSafety":
        return <Database className="h-4 w-4 text-red-500" />
      case "Sustainability":
        return <Database className="h-4 w-4 text-emerald-500" />
      case "Document":
        return <Database className="h-4 w-4 text-purple-500" />
      default:
        return <Database className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            接続済み
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            エラー
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            未接続
          </Badge>
        )
    }
  }

  const getScheduleText = (schedule: string) => {
    switch (schedule) {
      case "hourly":
        return "毎時"
      case "daily":
        return "毎日 00:00"
      case "weekly":
        return "毎週月曜 09:00"
      default:
        return schedule
    }
  }

  return (
    <DashboardLayout allowedRoles={["admin"]}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">データコネクタ</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="gap-1" onClick={() => setIsAgentDialogOpen(true)}>
              <Server className="h-4 w-4" />
              On-Premエージェント
            </Button>
            <Button
              variant="outline"
              className="gap-1"
              onClick={() => (window.location.href = "/settings/connectors/new-yaml")}
            >
              <FileCode className="h-4 w-4" />
              YAMLウィザード
            </Button>
            <Button className="gap-1" onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              コネクタ追加
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>接続済みコネクタ</CardTitle>
            <CardDescription>外部システムとの連携設定を管理します</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>名前</TableHead>
                  <TableHead>カテゴリ</TableHead>
                  <TableHead>サンプルデータ</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>最終同期</TableHead>
                  <TableHead>同期スケジュール</TableHead>
                  <TableHead className="text-right">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {connectedConnectors.map((connector) => (
                  <TableRow key={connector.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {getCategoryIcon(connector.category)}
                        <span className="ml-2">{connector.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{connector.category}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {connector.sampleData.map((data, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                          >
                            {data}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(connector.status)}</TableCell>
                    <TableCell>{connector.lastSync}</TableCell>
                    <TableCell>{getScheduleText(connector.schedule)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <Edit className="h-4 w-4" />
                          編集
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1"
                          onClick={() => handleRunNow(connector.id)}
                        >
                          <RefreshCw className="h-4 w-4" />
                          今すぐ実行
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {connectedConnectors.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      接続済みのコネクタがありません
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>コネクタの追加</DialogTitle>
            <DialogDescription>接続するデータソースを選択してください</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={selectedConnector || ""} onValueChange={setSelectedConnector}>
              <SelectTrigger>
                <SelectValue placeholder="コネクタを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">選択してください</SelectItem>
                {DEFAULT_CONNECTORS.map((connector) => (
                  <SelectItem key={connector.name} value={connector.name}>
                    {connector.name} ({connector.category})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleAddConnector} disabled={!selectedConnector}>
              追加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAgentDialogOpen} onOpenChange={setIsAgentDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>On-Premエージェント</DialogTitle>
            <DialogDescription>
              オンプレミス環境のデータソースに接続するためのエージェントをダウンロードします
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Tabs defaultValue="download">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="download">ダウンロード</TabsTrigger>
                <TabsTrigger value="token">エージェントトークン</TabsTrigger>
                <TabsTrigger value="status">ステータス</TabsTrigger>
              </TabsList>
              <TabsContent value="download" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">
                  環境に合わせたエージェントをダウンロードしてインストールしてください。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                    <Cloud className="h-8 w-8" />
                    <span>Windows版</span>
                    <span className="text-xs text-muted-foreground">v1.2.3</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                    <Cloud className="h-8 w-8" />
                    <span>Linux版</span>
                    <span className="text-xs text-muted-foreground">v1.2.3</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                    <Cloud className="h-8 w-8" />
                    <span>Docker版</span>
                    <span className="text-xs text-muted-foreground">v1.2.3</span>
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="token" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">このトークンをエージェント設定時に使用してください。</p>
                <div className="flex items-center gap-2">
                  <Input value="esg-agent-token-12345-abcde-67890-fghij" readOnly />
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText("esg-agent-token-12345-abcde-67890-fghij")
                      toast({
                        title: "コピー完了",
                        description: "トークンがクリップボードにコピーされました",
                      })
                    }}
                  >
                    コピー
                  </Button>
                </div>
                <div className="flex justify-center p-4">
                  <div className="border p-4 rounded-md bg-white">
                    {/* QRコードの代わりに表示するプレースホルダー */}
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-sm text-gray-500">QRコード</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="status" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">接続済みエージェントのステータスを確認できます。</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>エージェントID</TableHead>
                      <TableHead>ホスト名</TableHead>
                      <TableHead>IPアドレス</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead>最終ハートビート</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>agent-001</TableCell>
                      <TableCell>db-server-1</TableCell>
                      <TableCell>192.168.1.100</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          接続中
                        </Badge>
                      </TableCell>
                      <TableCell>2分前</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>agent-002</TableCell>
                      <TableCell>erp-server</TableCell>
                      <TableCell>192.168.1.101</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                          切断
                        </Badge>
                      </TableCell>
                      <TableCell>30分前</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsAgentDialogOpen(false)}>閉じる</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
