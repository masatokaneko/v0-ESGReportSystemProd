"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowRight, Check, AlertCircle, Loader2 } from "lucide-react"

export default function NewYamlPage() {
  const [yamlContent, setYamlContent] = useState(`# ESG Data Gateway Agent Configuration
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
    Content-Type: "application/json"`)

  const [step, setStep] = useState(1)
  const [isValidating, setIsValidating] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [connectionType, setConnectionType] = useState("jdbc")
  const { toast } = useToast()

  const handleValidate = () => {
    setIsValidating(true)

    // 実際の実装ではAPIエンドポイントでYAMLの検証を行う
    setTimeout(() => {
      setIsValidating(false)
      setIsValid(true)
      toast({
        title: "検証成功",
        description: "YAMLの構文が正常に検証されました",
      })
    }, 1500)
  }

  const handleSave = () => {
    toast({
      title: "保存完了",
      description: "コネクタ設定が保存されました",
    })
    window.location.href = "/settings/connectors"
  }

  return (
    <DashboardLayout allowedRoles={["admin"]}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">YAMLコネクタウィザード</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-primary text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              <div className={`w-8 h-1 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`} />
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-primary text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <div className={`w-8 h-1 ${step >= 3 ? "bg-primary" : "bg-gray-200"}`} />
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? "bg-primary text-white" : "bg-gray-200"}`}
              >
                3
              </div>
            </div>
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>接続タイプの選択</CardTitle>
              <CardDescription>データソースへの接続方法を選択してください</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: "jdbc", label: "データベース (JDBC)", description: "JDBCを使用してデータベースに接続" },
                  { value: "odbc", label: "データベース (ODBC)", description: "ODBCを使用してデータベースに接続" },
                  { value: "sftp", label: "SFTP", description: "SFTPを使用してファイルを取得" },
                  { value: "filewatch", label: "ファイル監視", description: "ローカルファイルシステムを監視" },
                  { value: "mqtt", label: "MQTT", description: "MQTTブローカーからデータを取得" },
                  { value: "opcua", label: "OPC UA", description: "OPC UAサーバーからデータを取得" },
                  { value: "modbus_tcp", label: "Modbus TCP", description: "Modbus TCPデバイスからデータを取得" },
                  { value: "rest_pull", label: "REST API", description: "REST APIからデータを取得" },
                  {
                    value: "scada_socket",
                    label: "SCADAソケット",
                    description: "SCADAシステムからソケット経由でデータを取得",
                  },
                ].map((type) => (
                  <div
                    key={type.value}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      connectionType === type.value ? "border-primary bg-primary/5" : "hover:border-gray-400"
                    }`}
                    onClick={() => setConnectionType(type.value)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{type.label}</h3>
                      {connectionType === type.value && <Check className="h-4 w-4 text-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => setStep(2)}>
                次へ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>YAML設定</CardTitle>
              <CardDescription>YAMLファイルを編集してデータ接続を設定します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">コネクタ名</label>
                    <Input placeholder="コネクタ名" defaultValue="Database Connector" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">接続タイプ</label>
                    <Select defaultValue={connectionType}>
                      <SelectTrigger>
                        <SelectValue placeholder="接続タイプを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jdbc">データベース (JDBC)</SelectItem>
                        <SelectItem value="odbc">データベース (ODBC)</SelectItem>
                        <SelectItem value="sftp">SFTP</SelectItem>
                        <SelectItem value="filewatch">ファイル監視</SelectItem>
                        <SelectItem value="mqtt">MQTT</SelectItem>
                        <SelectItem value="opcua">OPC UA</SelectItem>
                        <SelectItem value="modbus_tcp">Modbus TCP</SelectItem>
                        <SelectItem value="rest_pull">REST API</SelectItem>
                        <SelectItem value="scada_socket">SCADAソケット</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">YAML設定</label>
                  <Textarea
                    value={yamlContent}
                    onChange={(e) => setYamlContent(e.target.value)}
                    className="font-mono text-sm h-[400px]"
                  />
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" onClick={handleValidate} disabled={isValidating}>
                    {isValidating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        検証中...
                      </>
                    ) : (
                      <>
                        {isValid === true && <Check className="mr-2 h-4 w-4 text-green-500" />}
                        {isValid === false && <AlertCircle className="mr-2 h-4 w-4 text-red-500" />}
                        YAMLを検証
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                戻る
              </Button>
              <Button onClick={() => setStep(3)} disabled={isValid !== true}>
                次へ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>接続テストと保存</CardTitle>
              <CardDescription>設定を確認し、接続テストを実行してから保存します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-secondary p-4 rounded-md">
                  <h3 className="font-medium mb-2">接続情報</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">コネクタ名:</p>
                      <p className="text-sm">Database Connector</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">接続タイプ:</p>
                      <p className="text-sm">データベース (JDBC)</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">ホスト:</p>
                      <p className="text-sm">localhost:5432</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">データベース:</p>
                      <p className="text-sm">esg_data</p>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary p-4 rounded-md">
                  <h3 className="font-medium mb-2">スケジュール</h3>
                  <div>
                    <p className="text-sm text-muted-foreground">実行頻度:</p>
                    <p className="text-sm">毎日 00:00 (cron: 0 0 * * * ?)</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    className="w-full max-w-md"
                    onClick={() => {
                      toast({
                        title: "接続テスト成功",
                        description: "データベースへの接続に成功しました",
                      })
                    }}
                  >
                    接続テスト実行
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                戻る
              </Button>
              <Button onClick={handleSave}>保存</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
