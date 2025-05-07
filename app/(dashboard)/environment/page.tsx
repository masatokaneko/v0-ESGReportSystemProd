"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EnvironmentPage() {
  const [year, setYear] = useState("2024")
  const [entity, setEntity] = useState("全社")

  const kpis = [
    { label: "電力使用量", value: "120,000", unit: "kWh", trend: "-5%", color: "green" },
    { label: "水使用量", value: "8,500", unit: "m³", trend: "-3%", color: "green" },
    { label: "廃棄物排出量", value: "450", unit: "t", trend: "-2%", color: "green" },
    { label: "CO₂排出量", value: "2,500", unit: "t", trend: "-4%", color: "green" },
  ]

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">環境データ</h1>

      <div className="flex gap-4">
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="年度を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024年度</SelectItem>
            <SelectItem value="2023">2023年度</SelectItem>
            <SelectItem value="2022">2022年度</SelectItem>
          </SelectContent>
        </Select>

        <Select value={entity} onValueChange={setEntity}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="組織を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="全社">全社</SelectItem>
            <SelectItem value="本社">本社</SelectItem>
            <SelectItem value="工場A">工場A</SelectItem>
            <SelectItem value="工場B">工場B</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value} {kpi.unit}</div>
              <p className={`text-xs ${kpi.color === "green" ? "text-green-600" : "text-red-600"}`}>
                {kpi.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 