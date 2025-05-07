"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingDown, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("概要")
  const [keyword, setKeyword] = useState("")
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({})

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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  useEffect(() => {
    fetchData()
  }, [keyword, limit, page])

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (keyword) params.append("keyword", keyword)
      params.append("limit", limit.toString())
      params.append("page", page.toString())
      const res = await fetch(`/api/data-search?${params}`)
      if (!res.ok) throw new Error("データの取得に失敗しました")
      const result = await res.json()
      setData(result.data)
      setPagination(result.pagination)
    } catch (err) {
      setError("データ取得エラー: " + (err instanceof Error ? err.message : ""))
    }
    setIsLoading(false)
  }

  return (
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
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyEmissionsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="scope1" stroke="#8884d8" name="Scope 1" />
                  <Line type="monotone" dataKey="scope2" stroke="#82ca9d" name="Scope 2" />
                  <Line type="monotone" dataKey="scope3" stroke="#ffc658" name="Scope 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">排出源内訳</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emissionSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {emissionSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
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
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scopeCategoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" name="排出量" />
                </LineChart>
              </ResponsiveContainer>
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
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {activity.avatar}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {error && <div className="text-red-600 mb-2">{error}</div>}
      {!isLoading && data.length === 0 && (
        <div className="text-gray-500 text-center py-8">
          データがありません。<br />
          サンプルデータを投入するには <code>pnpm dlx prisma db seed</code> を実行してください。
        </div>
      )}
    </div>
  )
}
