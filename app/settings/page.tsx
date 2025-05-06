"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Edit, Server, Database } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("emission-factors")

  return (
    <DashboardLayout allowedRoles={["admin"]}>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">システム設定</h1>

        <Tabs defaultValue="emission-factors" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="emission-factors">原単位</TabsTrigger>
            <TabsTrigger value="users">ユーザー</TabsTrigger>
            <TabsTrigger value="locations">拠点</TabsTrigger>
            <TabsTrigger value="connectors">Connectors</TabsTrigger>
          </TabsList>

          <TabsContent value="emission-factors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>排出係数設定</CardTitle>
                <CardDescription>ESG計算に使用する排出係数を管理します</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    新規追加
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>カテゴリ</TableHead>
                      <TableHead>名称</TableHead>
                      <TableHead>単位</TableHead>
                      <TableHead>排出係数</TableHead>
                      <TableHead>更新日</TableHead>
                      <TableHead className="text-right">アクション</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        category: "エネルギー",
                        name: "電力（東京電力）",
                        unit: "kWh",
                        factor: 0.000423,
                        updatedAt: "2023-04-01",
                      },
                      {
                        category: "エネルギー",
                        name: "電力（関西電力）",
                        unit: "kWh",
                        factor: 0.000352,
                        updatedAt: "2023-04-01",
                      },
                      {
                        category: "エネルギー",
                        name: "都市ガス",
                        unit: "m3",
                        factor: 2.21,
                        updatedAt: "2023-04-01",
                      },
                      {
                        category: "輸送",
                        name: "ガソリン",
                        unit: "L",
                        factor: 2.32,
                        updatedAt: "2023-04-01",
                      },
                      {
                        category: "輸送",
                        name: "軽油",
                        unit: "L",
                        factor: 2.58,
                        updatedAt: "2023-04-01",
                      },
                      {
                        category: "水",
                        name: "上水",
                        unit: "m3",
                        factor: 0.23,
                        updatedAt: "2023-04-01",
                      },
                      {
                        category: "廃棄物",
                        name: "一般廃棄物",
                        unit: "kg",
                        factor: 0.0005,
                        updatedAt: "2023-04-01",
                      },
                    ].map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>{item.factor}</TableCell>
                        <TableCell>{item.updatedAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>ユーザー管理</CardTitle>
                <CardDescription>システムユーザーの追加・編集・削除を行います</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    ユーザー追加
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>名前</TableHead>
                      <TableHead>メールアドレス</TableHead>
                      <TableHead>役割</TableHead>
                      <TableHead>拠点</TableHead>
                      <TableHead>最終ログイン</TableHead>
                      <TableHead className="text-right">アクション</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        name: "山田太郎",
                        email: "admin@example.com",
                        role: "admin",
                        location: "東京本社",
                        lastLogin: "2023-05-01 10:23",
                      },
                      {
                        name: "佐藤花子",
                        email: "reviewer@example.com",
                        role: "reviewer",
                        location: "大阪支社",
                        lastLogin: "2023-05-01 09:15",
                      },
                      {
                        name: "鈴木一郎",
                        email: "inputer@example.com",
                        role: "inputer",
                        location: "名古屋工場",
                        lastLogin: "2023-04-30 16:45",
                      },
                      {
                        name: "高橋健太",
                        email: "inputer2@example.com",
                        role: "inputer",
                        location: "福岡営業所",
                        lastLogin: "2023-04-29 14:30",
                      },
                      {
                        name: "伊藤めぐみ",
                        email: "inputer3@example.com",
                        role: "inputer",
                        location: "札幌営業所",
                        lastLogin: "2023-04-28 11:20",
                      },
                    ].map((user, index) => (
                      <TableRow key={index}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.role === "admin" && "管理者"}
                          {user.role === "reviewer" && "レビュアー"}
                          {user.role === "inputer" && "入力者"}
                        </TableCell>
                        <TableCell>{user.location}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>拠点管理</CardTitle>
                <CardDescription>会社の拠点情報を管理します</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    拠点追加
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>拠点名</TableHead>
                      <TableHead>住所</TableHead>
                      <TableHead>従業員数</TableHead>
                      <TableHead>床面積 (m²)</TableHead>
                      <TableHead>拠点タイプ</TableHead>
                      <TableHead className="text-right">アクション</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        name: "東京本社",
                        address: "東京都千代田区丸の内1-1-1",
                        employees: 250,
                        area: 5000,
                        type: "オフィス",
                      },
                      {
                        name: "大阪支社",
                        address: "大阪府大阪市北区梅田2-2-2",
                        employees: 120,
                        area: 2500,
                        type: "オフィス",
                      },
                      {
                        name: "名古屋工場",
                        address: "愛知県名古屋市中区栄3-3-3",
                        employees: 180,
                        area: 8000,
                        type: "工場",
                      },
                      {
                        name: "福岡営業所",
                        address: "福岡県福岡市博多区博多駅前4-4-4",
                        employees: 45,
                        area: 800,
                        type: "オフィス",
                      },
                      {
                        name: "札幌営業所",
                        address: "北海道札幌市中央区北5条西5-5-5",
                        employees: 30,
                        area: 600,
                        type: "オフィス",
                      },
                    ].map((location, index) => (
                      <TableRow key={index}>
                        <TableCell>{location.name}</TableCell>
                        <TableCell>{location.address}</TableCell>
                        <TableCell>{location.employees}人</TableCell>
                        <TableCell>{location.area.toLocaleString()}</TableCell>
                        <TableCell>{location.type}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="connectors" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>データコネクタ</CardTitle>
                  <CardDescription>外部システムとの連携設定を管理します</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-1">
                    <Server className="h-4 w-4" />
                    On-Premエージェント
                  </Button>
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    コネクタ追加
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>名前</TableHead>
                      <TableHead>カテゴリ</TableHead>
                      <TableHead>サンプルデータ</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead>同期スケジュール</TableHead>
                      <TableHead className="text-right">アクション</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        name: "SAP S/4HANA Cloud",
                        category: "FinanceERP",
                        sampleData: ["JournalEntry", "FuelExpense", "Asset"],
                        status: "接続済み",
                        schedule: "毎日 00:00",
                      },
                      {
                        name: "Salesforce",
                        category: "CRM",
                        sampleData: ["Opportunity", "Contract", "UsageQuantity"],
                        status: "接続済み",
                        schedule: "毎時",
                      },
                      {
                        name: "EnergyCAP",
                        category: "EnergyEMS",
                        sampleData: ["MeterReading", "Cost", "FuelType"],
                        status: "未接続",
                        schedule: "-",
                      },
                      {
                        name: "Google Drive",
                        category: "Document",
                        sampleData: ["PDF", "Spreadsheet"],
                        status: "接続済み",
                        schedule: "毎週月曜 09:00",
                      },
                    ].map((connector, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {connector.category === "FinanceERP" && <Database className="h-4 w-4 mr-2 text-blue-500" />}
                            {connector.category === "CRM" && <Database className="h-4 w-4 mr-2 text-green-500" />}
                            {connector.category === "EnergyEMS" && (
                              <Database className="h-4 w-4 mr-2 text-yellow-500" />
                            )}
                            {connector.category === "Document" && <Database className="h-4 w-4 mr-2 text-purple-500" />}
                            {connector.name}
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
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              connector.status === "接続済み"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {connector.status}
                          </span>
                        </TableCell>
                        <TableCell>{connector.schedule}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              編集
                            </Button>
                            <Button variant="ghost" size="sm">
                              今すぐ実行
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
