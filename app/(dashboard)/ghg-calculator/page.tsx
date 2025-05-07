"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function GHGCalculatorPage() {
  const [emissionType, setEmissionType] = useState("")
  const [amount, setAmount] = useState("")
  const [unit, setUnit] = useState("")
  const { toast } = useToast()

  const handleCalculate = () => {
    // 実際の計算ロジックは後で実装
    toast({
      title: "計算完了",
      description: "GHG排出量の計算が完了しました",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">GHG計算機</h1>

      <Card>
        <CardHeader>
          <CardTitle>GHG排出量計算</CardTitle>
          <CardDescription>
            活動データを入力して、温室効果ガス（GHG）の排出量を計算します。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="emission-type">排出源</Label>
              <Select value={emissionType} onValueChange={setEmissionType}>
                <SelectTrigger id="emission-type">
                  <SelectValue placeholder="排出源を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electricity">電力使用</SelectItem>
                  <SelectItem value="gas">都市ガス使用</SelectItem>
                  <SelectItem value="water">水道使用</SelectItem>
                  <SelectItem value="waste">廃棄物</SelectItem>
                  <SelectItem value="transportation">社用車</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount">使用量</Label>
              <Input
                id="amount"
                type="number"
                placeholder="数値を入力"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="unit">単位</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger id="unit">
                  <SelectValue placeholder="単位を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kwh">kWh</SelectItem>
                  <SelectItem value="m3">m³</SelectItem>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="km">km</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleCalculate} className="mt-4">
              計算する
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>計算結果</CardTitle>
          <CardDescription>GHG排出量の計算結果がここに表示されます。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">CO₂排出量</span>
              <span className="text-sm">0.00 t-CO₂</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">CH₄排出量</span>
              <span className="text-sm">0.00 t-CO₂e</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">N₂O排出量</span>
              <span className="text-sm">0.00 t-CO₂e</span>
            </div>
            <div className="flex items-center justify-between border-t pt-2">
              <span className="text-sm font-medium">合計排出量</span>
              <span className="text-sm font-bold">0.00 t-CO₂e</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
