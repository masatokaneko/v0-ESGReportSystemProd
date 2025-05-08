"use client";

import { useState } from "react";
// import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MoreHorizontal,
  Plus,
  RefreshCw,
  Download,
  Settings,
  FileCode,
  AlertCircle,
} from "lucide-react";

// クラウドSaaSコネクタのモックデータ
const DEFAULT_CONNECTORS = [
  {
    name: "SAP S/4HANA Cloud",
    category: "FinanceERP",
    sampleData: ["JournalEntry", "FuelExpense", "Asset"],
  },
  {
    name: "Oracle Fusion ERP",
    category: "FinanceERP",
    sampleData: ["GL", "PO", "Inventory"],
  },
  {
    name: "Microsoft Dynamics 365 Finance",
    category: "FinanceERP",
    sampleData: ["Voucher", "VendorInvoice"],
  },
  {
    name: "NetSuite",
    category: "FinanceERP",
    sampleData: ["Transaction", "ItemFulfillment"],
  },
  {
    name: "Freee",
    category: "Accounting",
    sampleData: ["勘定科目", "取引", "請求書"],
  },
  {
    name: "QuickBooks Online",
    category: "Accounting",
    sampleData: ["Journal", "Invoice", "Bill"],
  },
  {
    name: "Xero",
    category: "Accounting",
    sampleData: ["Accounts", "Payments"],
  },
  {
    name: "Salesforce",
    category: "CRM",
    sampleData: ["Opportunity", "Contract", "UsageQuantity"],
  },
  { name: "HubSpot", category: "CRM", sampleData: ["Deal", "Quote"] },
  { name: "ServiceNow", category: "CRM", sampleData: ["Asset", "WorkOrder"] },
  {
    name: "SAP Ariba",
    category: "SCM",
    sampleData: ["PurchaseOrder", "GR/IR", "Supplier"],
  },
  {
    name: "Coupa",
    category: "SCM",
    sampleData: ["Invoice", "Spend", "Supplier"],
  },
  {
    name: "Ivalua",
    category: "SCM",
    sampleData: ["Commodity", "PO", "Contract"],
  },
  {
    name: "EnergyCAP",
    category: "EnergyEMS",
    sampleData: ["MeterReading", "Cost", "FuelType"],
  },
  {
    name: "EcoStruxure Resource Advisor",
    category: "EnergyEMS",
    sampleData: ["SiteEnergy", "GHGFactor"],
  },
  {
    name: "EnOS",
    category: "EnergyEMS",
    sampleData: ["PowerGeneration", "FuelMix"],
  },
  {
    name: "Workday",
    category: "HRSafety",
    sampleData: ["Headcount", "SafetyIncident"],
  },
  {
    name: "SAP SuccessFactors",
    category: "HRSafety",
    sampleData: ["Employee", "Accident"],
  },
  {
    name: "Watershed",
    category: "Sustainability",
    sampleData: ["GHGInventory", "ReductionPlan"],
  },
  {
    name: "Persefoni",
    category: "Sustainability",
    sampleData: ["EmissionFactor", "AuditLog"],
  },
  { name: "Box", category: "Document", sampleData: ["PDF", "CSV"] },
  {
    name: "Google Drive",
    category: "Document",
    sampleData: ["PDF", "Spreadsheet"],
  },
];

// 接続済みコネクタのモックデータ
const CONNECTED_CONNECTORS = [
  {
    name: "SAP S/4HANA Cloud",
    category: "FinanceERP",
    sampleData: ["JournalEntry", "FuelExpense", "Asset"],
    status: "未接続",
    schedule: "未設定",
  },
  {
    name: "Oracle Fusion ERP",
    category: "FinanceERP",
    sampleData: ["GL", "PO", "Inventory"],
    status: "未接続",
    schedule: "未設定",
  },
  {
    name: "Microsoft Dynamics 365 Finance",
    category: "FinanceERP",
    sampleData: ["Voucher", "VendorInvoice"],
    status: "接続済み",
    schedule: "未設定",
  },
  {
    name: "NetSuite",
    category: "FinanceERP",
    sampleData: ["Transaction", "ItemFulfillment"],
    status: "接続済み",
    schedule: "未設定",
  },
  {
    name: "Freee",
    category: "Accounting",
    sampleData: ["勘定科目", "取引", "請求書"],
    status: "接続済み",
    schedule: "未設定",
  },
  {
    name: "QuickBooks Online",
    category: "Accounting",
    sampleData: ["Journal", "Invoice", "Bill"],
    status: "未接続",
    schedule: "毎日 00:00",
  },
  {
    name: "Xero",
    category: "Accounting",
    sampleData: ["Accounts", "Payments"],
    status: "接続済み",
    schedule: "未設定",
  },
];

// オンプレミスエージェントのモックデータ
const ONPREMISE_AGENTS = [
  {
    name: "SCADA_FuelFlow",
    type: "OPC UA",
    schedule: "rate(5 minutes)",
    status: "オンライン",
    lastHeartbeat: "2023/5/1 21:34:56",
  },
  {
    name: "Factory_EnergyMeter",
    type: "Modbus TCP",
    schedule: "rate(15 minutes)",
    status: "オンライン",
    lastHeartbeat: "2023/5/1 21:30:00",
  },
  {
    name: "WarehouseDB",
    type: "JDBC",
    schedule: "cron(0 0 * * *)",
    status: "オフライン",
    lastHeartbeat: "2023/5/1 8:45:12",
  },
];

export default function ConnectorsPage() {
  const [activeTab, setActiveTab] = useState("cloud");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isYamlDialogOpen, setIsYamlDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddConnector = () => {
    setIsAddDialogOpen(false);
    toast({
      title: "コネクタ追加",
      description:
        "新しいコネクタの追加を開始しました。設定を完了してください。",
    });
  };

  const handleRunNow = (name: string) => {
    toast({
      title: "同期開始",
      description: `${name}のデータ同期を開始しました。完了までしばらくお待ちください。`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "接続済み":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-200"
          >
            接続済み
          </Badge>
        );
      case "オンライン":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-200"
          >
            オンライン
          </Badge>
        );
      case "オフライン":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-200"
          >
            オフライン
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-800 border-gray-200"
          >
            未接続
          </Badge>
        );
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">外部データ取込</h1>

        <Tabs
          defaultValue="cloud"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cloud">クラウドSaaS</TabsTrigger>
            <TabsTrigger value="onpremise">
              オンプレミスエージェント
            </TabsTrigger>
          </TabsList>

          {/* クラウドSaaSタブ */}
          <TabsContent value="cloud" className="space-y-4">
            <div className="flex justify-end">
              <Button
                className="gap-1"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                新規接続
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>クラウドSaaSコネクタ</CardTitle>
                <CardDescription>
                  クラウドサービスからESGデータを自動取得します
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>名前</TableHead>
                      <TableHead>カテゴリ</TableHead>
                      <TableHead>サンプルデータ</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead>同期スケジュール</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {CONNECTED_CONNECTORS.map((connector) => (
                      <TableRow key={connector.name}>
                        <TableCell className="font-medium">
                          {connector.name}
                        </TableCell>
                        <TableCell>{connector.category}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {connector.sampleData.map((data, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold"
                              >
                                {data}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(connector.status)}
                        </TableCell>
                        <TableCell>{connector.schedule}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleRunNow(connector.name)}
                              >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                今すぐ実行
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                設定
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* オンプレミスエージェントタブ */}
          <TabsContent value="onpremise" className="space-y-4">
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="gap-1"
                onClick={() => setIsYamlDialogOpen(true)}
              >
                <FileCode className="h-4 w-4" />
                YAML設定を追加
              </Button>
              <Button variant="outline" className="gap-1">
                <RefreshCw className="h-4 w-4" />
                状態を更新
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>オンプレミスエージェント接続</CardTitle>
                <CardDescription>
                  オンプレミス環境のデータソースに接続します
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>接続名</TableHead>
                      <TableHead>接続タイプ</TableHead>
                      <TableHead>スケジュール</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead>最終ハートビート</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ONPREMISE_AGENTS.map((agent) => (
                      <TableRow key={agent.name}>
                        <TableCell className="font-medium">
                          {agent.name}
                        </TableCell>
                        <TableCell>{agent.type}</TableCell>
                        <TableCell>{agent.schedule}</TableCell>
                        <TableCell>{getStatusBadge(agent.status)}</TableCell>
                        <TableCell>{agent.lastHeartbeat}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500"
                            >
                              <AlertCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>DataGatewayAgentのダウンロード</CardTitle>
                <CardDescription>
                  オンプレミス環境からデータを安全に取得するためのツールです
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    DataGatewayAgentはオンプレミス環境からデータを安全に取得するためのツールです。
                    DockerコンテナまたはWindowsサービスとして実行できます。
                  </p>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    エージェントをダウンロード
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 新規接続ダイアログ */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>新規コネクタ接続</DialogTitle>
            <DialogDescription>
              接続するクラウドサービスを選択してください
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="コネクタを選択" />
              </SelectTrigger>
              <SelectContent>
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
            <Button onClick={handleAddConnector}>次へ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* YAML設定ダイアログ */}
      <Dialog open={isYamlDialogOpen} onOpenChange={setIsYamlDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>YAML設定の追加</DialogTitle>
            <DialogDescription>
              オンプレミスエージェントの設定をYAML形式で追加します
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">接続名</label>
                <Input placeholder="接続名を入力" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">
                  接続タイプ
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="接続タイプを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jdbc">JDBC</SelectItem>
                    <SelectItem value="opcua">OPC UA</SelectItem>
                    <SelectItem value="modbus">Modbus TCP</SelectItem>
                    <SelectItem value="rest">REST API</SelectItem>
                    <SelectItem value="file">ファイル監視</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">
                  YAML設定
                </label>
                <textarea
                  className="w-full h-64 p-2 border rounded-md font-mono text-sm"
                  placeholder="# YAML設定を入力"
                  defaultValue={`# ESG Data Gateway Agent Configuration
name: "Database Connector"
description: "Connect to on-premise database for ESG data"
version: "1.0"

connection:
  type: "jdbc"
  driver: "org.postgresql.Driver"
  url: "jdbc:postgresql://localhost:5432/esg_data"
  username: "esg_user"
  password: "********"
  
queries:
  - name: "energy_consumption"
    description: "Extract energy consumption data"
    sql: "SELECT facility_id, timestamp, energy_type, consumption, unit FROM energy_data WHERE timestamp >= ? AND timestamp <= ?"
    parameters:
      - name: "start_date"
        type: "timestamp"
      - name: "end_date"
        type: "timestamp"
    mapping:
      facility_id: "location_id"
      timestamp: "date"
      energy_type: "category"
      consumption: "value"
      unit: "unit"
      
schedule:
  type: "cron"
  expression: "0 0 * * * ?"  # Run daily at midnight
  
output:
  format: "json"
  destination: "api"
  endpoint: "https://esg-platform.example.com/api/data-gateway/ingest"
  headers:
    Authorization: "Bearer {{agent_token}}"
    Content-Type: "application/json"`}
                ></textarea>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsYamlDialogOpen(false)}
            >
              キャンセル
            </Button>
            <Button
              onClick={() => {
                setIsYamlDialogOpen(false);
                toast({
                  title: "YAML設定追加",
                  description: "YAML設定が正常に追加されました",
                });
              }}
            >
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
