"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingDown, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("概要")

  // モックデータ
  const kpiData = [
    {
      title: "総GHG排出量",
      value: "12,345",
      unit: "t-CO2",
      change: "+2.5%",
      trend: "up",
    },
    {
      title: "Scope 1排出量",
      value: "3,456",
      unit: "t-CO2",
      change: "-1.2%",
      trend: "down",
    },
    {
      title: "Scope 2排出量",
      value: "5,678",
      unit: "t-CO2",
      change: "+4.3%",
      trend: "up",
    },
    {
      title: "削減目標",
      value: "23.5",
      unit: "%",
      change: "+5.2%",
      trend: "up",
    },
  ]

  // 月別排出量データ
  const monthlyEmissionsData = [
    { name: "4月", scope1: 250, scope2: 350, scope3: 400 },
    { name: "5月", scope1: 280, scope2: 380, scope3: 420 },
    { name: "6月", scope1: 270, scope2: 360, scope3: 410 },
    { name: "7月", scope1: 320, scope2: 420, scope3: 450 },
    { name: "8月", scope1: 350, scope2: 450, scope3: 480 },
    { name: "9月", scope1: 330, scope2: 430, scope3: 460 },
    { name: "10月", scope1: 310, scope2: 410, scope3: 440 },
    { name: "11月", scope1: 290, scope2: 390, scope3: 420 },
    { name: "12月", scope1: 300, scope2: 400, scope3: 430 },
    { name: "1月", scope1: 320, scope2: 420, scope3: 450 },
    { name: "2月", scope1: 300, scope2: 400, scope3: 430 },
    { name: "3月", scope1: 310, scope2: 410, scope3: 440 },
  ]

  // 排出源内訳データ
  const emissionSourceData = [
    { name: "電力", value: 46 },
    { name: "ガス", value: 19 },
    { name: "ガソリン", value: 9 },
    { name: "軽油", value: 7 },
    { name: "その他", value: 19 },
  ]

  // Scope別カテゴリ排出量データ
  const scopeCategoryData = [
    { name: "Scope 1", value: 3456 },
    { name: "Scope 2", value: 5678 },
    { name: "Scope 3-1", value: 1200 },
    { name: "Scope 3-2", value: 500 },
    { name: "Scope 3-3", value: 200 },
    { name: "Scope 3-4", value: 700 },
    { name: "Scope 3-5", value: 100 },
  ]

  // 最近の活動データ
  const recentActivities = [
    {
      user: "山田太郎",
      action: "東京本社の電力データを登録しました",
      time: "2分前",
      avatar: "山",
    },
    {
      user: "佐藤花子",
      action: "大阪支社のガスデータを承認しました",
      time: "34分前",
      avatar: "佐",
    },
    {
      user: "鈴木一郎",
      action: "名古屋支社の廃棄物データを登録しました",
      time: "3時間前",
      avatar: "鈴",
    },
    {
      user: "田中誠",
      action: "福岡支社の出張データを承認しました",
      time: "5時間前",
      avatar: "田",
    },
  ]

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">ダッシュボード</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList>
              <TabsTrigger value="概要">概要</TabsTrigger>
              <TabsTrigger value="分析">分析</TabsTrigger>
              <TabsTrigger value="レポート">レポート</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                {kpi.trend === "up" ? (
                  <TrendingUp className={`h-4 w-4 ${index === 3 ? "text-status-approved" : "text-status-rejected"}`} />
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
                  <span
                    className={
                      index === 3
                        ? kpi.trend === "up"
                          ? "text-status-approved"
                          : "text-status-rejected"
                        : kpi.trend === "up"
                          ? "text-status-rejected"
                          : "text-status-approved"
                    }
                  >
                    {kpi.change}
                  </span>
                  <span className="ml-1">前年比</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">排出量推移</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <MonthlyEmissionsChart data={monthlyEmissionsData} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">排出源内訳</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <EmissionSourcePieChart data={emissionSourceData} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">排出量概要</CardTitle>
              <p className="text-sm text-muted-foreground">Scope別・カテゴリ別の排出量</p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ScopeCategoryChart data={scopeCategoryData} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">最近の活動</CardTitle>
              <p className="text-sm text-muted-foreground">最近のデータ登録・承認状況</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm">
                      {activity.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

// 月別排出量チャート
function MonthlyEmissionsChart({ data }) {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col h-full">
        <div className="flex-1 relative">
          {/* Y軸ラベル */}
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground">
            t-CO2
          </div>

          {/* グラフ本体 */}
          <div className="flex items-end h-full w-full">
            {data.map((month, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col-reverse" style={{ height: "calc(100% - 20px)" }}>
                  <div className="w-full bg-[#002B5B]" style={{ height: `${(month.scope1 / 1200) * 100}%` }}></div>
                  <div className="w-full bg-[#0074D9]" style={{ height: `${(month.scope2 / 1200) * 100}%` }}></div>
                  <div className="w-full bg-[#7FDBFF]" style={{ height: `${(month.scope3 / 1200) * 100}%` }}></div>
                </div>
                <div className="text-xs mt-2">{month.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 凡例 */}
        <div className="flex justify-center mt-4 gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#002B5B] mr-1"></div>
            <span className="text-xs">Scope 1</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#0074D9] mr-1"></div>
            <span className="text-xs">Scope 2</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#7FDBFF] mr-1"></div>
            <span className="text-xs">Scope 3</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 排出源内訳円グラフ
function EmissionSourcePieChart({ data }) {
  const colors = ["#002B5B", "#0074D9", "#7FDBFF", "#39CCCC", "#3D9970"]
  const total = data.reduce((sum, item) => sum + item.value, 0)

  // 円グラフの計算
  let cumulativePercent = 0
  const segments = data.map((item, index) => {
    const percent = item.value / total
    const startAngle = 2 * Math.PI * cumulativePercent
    cumulativePercent += percent
    const endAngle = 2 * Math.PI * cumulativePercent

    return {
      ...item,
      percent,
      startAngle,
      endAngle,
      color: colors[index % colors.length],
    }
  })

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {segments.map((segment, index) => {
            const x1 = 50 + 40 * Math.cos(segment.startAngle - Math.PI / 2)
            const y1 = 50 + 40 * Math.sin(segment.startAngle - Math.PI / 2)
            const x2 = 50 + 40 * Math.cos(segment.endAngle - Math.PI / 2)
            const y2 = 50 + 40 * Math.sin(segment.endAngle - Math.PI / 2)

            const largeArcFlag = segment.endAngle - segment.startAngle > Math.PI ? 1 : 0

            const pathData = [`M 50 50`, `L ${x1} ${y1}`, `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`, `Z`].join(" ")

            return <path key={index} d={pathData} fill={segment.color} />
          })}
        </svg>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center">
            <div className="w-3 h-3 mr-1" style={{ backgroundColor: segment.color }}></div>
            <span className="text-xs">
              {segment.name}: {segment.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Scope別カテゴリ排出量チャート
function ScopeCategoryChart({ data }) {
  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <div className="w-full h-full">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          {data.map((item, index) => (
            <div key={index} className="flex items-center h-[14%] mb-2">
              <div className="w-24 text-xs">{item.name}</div>
              <div className="flex-1 h-4">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: index < 2 ? "#002B5B" : "#0074D9",
                  }}
                ></div>
              </div>
              <div className="w-20 text-xs text-right">{item.value} t-CO2</div>
            </div>
          ))}
        </div>

        <div className="mt-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <div>0 t-CO2</div>
            <div>1500 t-CO2</div>
            <div>3000 t-CO2</div>
            <div>4500 t-CO2</div>
            <div>6000 t-CO2</div>
          </div>
          <div className="flex mt-4 gap-4 justify-center">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#002B5B] mr-1"></div>
              <span className="text-xs">直接排出</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#0074D9] mr-1"></div>
              <span className="text-xs">間接排出</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#7FDBFF] mr-1"></div>
              <span className="text-xs">購入した製品・サービス</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
