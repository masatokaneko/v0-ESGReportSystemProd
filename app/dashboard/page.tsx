"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraphCard } from "@/components/ui/graph-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, TrendingDown, TrendingUp, BarChart3, PieChart } from "lucide-react"

export default function DashboardPage() {
  const [scope, setScope] = useState("all")
  const [location, setLocation] = useState("all")

  // モックデータ
  const kpiData = [
    {
      title: "総CO2排出量",
      value: "12,345",
      unit: "t-CO2",
      change: "+5.2%",
      trend: "up",
    },
    {
      title: "エネルギー使用量",
      value: "87,654",
      unit: "MWh",
      change: "-2.1%",
      trend: "down",
    },
    {
      title: "水使用量",
      value: "456,789",
      unit: "m³",
      change: "+1.8%",
      trend: "up",
    },
    {
      title: "廃棄物排出量",
      value: "2,345",
      unit: "t",
      change: "-3.5%",
      trend: "down",
    },
  ]

  const emissionsBySourceData = [
    { name: "Scope 1", value: 4000 },
    { name: "Scope 2", value: 3000 },
    { name: "Scope 3", value: 9000 },
  ]

  const emissionsByLocationData = [
    { name: "東京本社", value: 2500 },
    { name: "大阪支社", value: 1500 },
    { name: "名古屋工場", value: 3500 },
    { name: "福岡営業所", value: 1000 },
    { name: "札幌営業所", value: 800 },
  ]

  const monthlyEmissionsData = [
    { name: "1月", value: 1200 },
    { name: "2月", value: 1100 },
    { name: "3月", value: 1300 },
    { name: "4月", value: 900 },
    { name: "5月", value: 1500 },
    { name: "6月", value: 1700 },
    { name: "7月", value: 1600 },
    { name: "8月", value: 1800 },
    { name: "9月", value: 1400 },
    { name: "10月", value: 1300 },
    { name: "11月", value: 1200 },
    { name: "12月", value: 1100 },
  ]

  const emissionsByCategoryData = [
    { name: "購入した製品・サービス", value: 3500 },
    { name: "資本財", value: 1200 },
    { name: "燃料・エネルギー関連", value: 2300 },
    { name: "輸送・配送（上流）", value: 1800 },
    { name: "事業から出る廃棄物", value: 900 },
  ]

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">ESGダッシュボード</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={scope} onValueChange={setScope}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Scope選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全Scope</SelectItem>
                <SelectItem value="scope1">Scope 1</SelectItem>
                <SelectItem value="scope2">Scope 2</SelectItem>
                <SelectItem value="scope3">Scope 3</SelectItem>
              </SelectContent>
            </Select>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="拠点選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全拠点</SelectItem>
                <SelectItem value="tokyo">東京本社</SelectItem>
                <SelectItem value="osaka">大阪支社</SelectItem>
                <SelectItem value="nagoya">名古屋工場</SelectItem>
                <SelectItem value="fukuoka">福岡営業所</SelectItem>
                <SelectItem value="sapporo">札幌営業所</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                {kpi.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-status-rejected" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-status-approved" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {kpi.value}
                  <span className="text-sm font-normal text-muted-foreground ml-1">{kpi.unit}</span>
                </div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <span className={kpi.trend === "up" ? "text-status-rejected" : "text-status-approved"}>
                    {kpi.change}
                  </span>
                  <span className="ml-1">前年比</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="emissions" className="w-full">
          <TabsList>
            <TabsTrigger value="emissions" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              排出量分析
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center">
              <PieChart className="h-4 w-4 mr-2" />
              カテゴリ分析
            </TabsTrigger>
          </TabsList>
          <TabsContent value="emissions" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <GraphCard title="月別CO2排出量" type="bar" data={monthlyEmissionsData} />
              <GraphCard title="Scope別排出量" type="pie" data={emissionsBySourceData} />
            </div>
            <GraphCard title="拠点別排出量" type="bar" data={emissionsByLocationData} />
          </TabsContent>
          <TabsContent value="categories" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <GraphCard title="Scope3カテゴリ別排出量" type="pie" data={emissionsByCategoryData} />
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">カテゴリ別前年比較</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emissionsByCategoryData.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{
                              backgroundColor: ["#002B5B", "#0074D9", "#7FDBFF", "#39CCCC", "#3D9970"][index % 5],
                            }}
                          />
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">{category.value.toLocaleString()} t-CO2</span>
                          <div
                            className={`flex items-center ${
                              index % 2 === 0 ? "text-status-rejected" : "text-status-approved"
                            }`}
                          >
                            {index % 2 === 0 ? (
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            <span className="text-xs">
                              {index % 2 === 0 ? "+" : "-"}
                              {Math.floor(Math.random() * 10) + 1}.{Math.floor(Math.random() * 10)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
