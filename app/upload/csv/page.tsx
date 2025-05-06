"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Upload,
  FileSpreadsheet,
  FileDown,
  ChevronDown,
  ArrowRight,
  Check,
  X,
  AlertTriangle,
  Trash2,
} from "lucide-react"

export default function CsvUploadPage() {
  const [activeTab, setActiveTab] = useState("upload")
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isMappingDialogOpen, setIsMappingDialogOpen] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const { toast } = useToast()

  // モックデータ - インポート履歴
  const importHistory = [
    {
      id: "1",
      filename: "energy_data_2023Q1.csv",
      uploadedAt: "2023-05-01 10:23",
      records: 156,
      status: "success",
      sourceSystem: "手動アップロード",
    },
    {
      id: "2",
      filename: "water_usage_2023Q1.csv",
      uploadedAt: "2023-04-15 14:30",
      records: 42,
      status: "success",
      sourceSystem: "手動アップロード",
    },
    {
      id: "3",
      filename: "waste_data_2023Q1.csv",
      uploadedAt: "2023-04-10 09:15",
      records: 78,
      status: "partial",
      sourceSystem: "手動アップロード",
    },
    {
      id: "4",
      filename: "transport_emissions_2023Q1.csv",
      uploadedAt: "2023-04-05 16:45",
      records: 0,
      status: "error",
      sourceSystem: "手動アップロード",
    },
    {
      id: "5",
      filename: "energy_data_2022Q4.csv",
      uploadedAt: "2023-01-10 11:20",
      records: 148,
      status: "success",
      sourceSystem: "SAP S/4HANA",
    },
  ]

  // モックデータ - CSVプレビュー
  const csvPreviewData = {
    headers: ["日付", "拠点", "カテゴリ", "数値", "単位", "備考"],
    rows: [
      ["2023-01-15", "東京本社", "電力", "45000", "kWh", ""],
      ["2023-01-31", "大阪支社", "ガス", "2500", "m3", ""],
      ["2023-02-15", "東京本社", "電力", "42000", "kWh", ""],
      ["2023-02-28", "大阪支社", "ガス", "2300", "m3", ""],
      ["2023-03-15", "東京本社", "電力", "48000", "kWh", ""],
      ["2023-03-31", "大阪支社", "ガス", "2700", "m3", ""],
    ],
  }

  // モックデータ - マッピング
  const mappingFields = [
    { source: "日付", target: "date", required: true },
    { source: "拠点", target: "location", required: true },
    { source: "カテゴリ", target: "category", required: true },
    { source: "数値", target: "value", required: true },
    { source: "単位", target: "unit", required: true },
    { source: "備考", target: "notes", required: false },
  ]

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    // CSVファイルのみ許可
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      toast({
        variant: "destructive",
        title: "ファイル形式エラー",
        description: "CSVファイルのみアップロード可能です",
      })
      return
    }

    setSelectedFile(file)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleUpload = () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    // アップロード進捗のシミュレーション
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setIsMappingDialogOpen(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleConfirmMapping = () => {
    setIsMappingDialogOpen(false)
    setIsConfirmDialogOpen(true)
  }

  const handleConfirmImport = () => {
    setIsConfirmDialogOpen(false)

    toast({
      title: "インポート完了",
      description: "CSVデータが正常にインポートされました",
    })

    setSelectedFile(null)
    setUploadProgress(0)
    setActiveTab("history")
  }

  const handleCancelImport = () => {
    setIsConfirmDialogOpen(false)
    setSelectedFile(null)
    setUploadProgress(0)
  }

  const handleDeleteImport = (id: string) => {
    toast({
      title: "インポート削除",
      description: "選択したインポート履歴が削除されました",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            成功
          </Badge>
        )
      case "partial":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            部分成功
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            エラー
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">CSVアップロード</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <FileDown className="h-4 w-4" />
                テンプレートをダウンロード
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                汎用テンプレート
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                エネルギーテンプレート
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                水使用量テンプレート
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                廃棄物テンプレート
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                GHG排出量テンプレート
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="upload">アップロード</TabsTrigger>
            <TabsTrigger value="history">インポート履歴</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>CSVファイルのアップロード</CardTitle>
                <CardDescription>ESGデータを含むCSVファイルをアップロードして一括登録します</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      isDragging
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 hover:border-primary hover:bg-primary/5"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Upload className="h-10 w-10 text-gray-400" />
                      <p className="text-sm font-medium">
                        CSVファイルをドラッグ＆ドロップするか、クリックして選択してください
                      </p>
                      <p className="text-xs text-gray-500">CSVファイル（最大10MB）</p>
                      <Button variant="outline" onClick={() => document.getElementById("file-input")?.click()}>
                        ファイルを選択
                      </Button>
                      <input
                        id="file-input"
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={handleFileInputChange}
                      />
                    </div>
                  </div>

                  {selectedFile && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-md bg-secondary">
                        <div className="flex items-center">
                          <FileSpreadsheet className="h-5 w-5 text-primary mr-2" />
                          <div>
                            <p className="text-sm font-medium">{selectedFile.name}</p>
                            <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(0)}KB</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {isUploading ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>アップロード中...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} />
                        </div>
                      ) : (
                        <div className="flex justify-end">
                          <Button onClick={handleUpload}>アップロード</Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>インポート履歴</CardTitle>
                <CardDescription>過去にインポートしたCSVファイルの履歴を表示します</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ファイル名</TableHead>
                      <TableHead>アップロード日時</TableHead>
                      <TableHead>レコード数</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead>ソースシステム</TableHead>
                      <TableHead className="text-right">アクション</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {importHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <FileSpreadsheet className="h-4 w-4 mr-2 text-primary" />
                            {item.filename}
                          </div>
                        </TableCell>
                        <TableCell>{item.uploadedAt}</TableCell>
                        <TableCell>{item.records}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>{item.sourceSystem}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteImport(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
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

      {/* マッピングダイアログ */}
      <Dialog open={isMappingDialogOpen} onOpenChange={setIsMappingDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>CSVマッピング</DialogTitle>
            <DialogDescription>CSVの列とシステムのフィールドをマッピングしてください</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    {csvPreviewData.headers.map((header, index) => (
                      <TableHead key={index}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {csvPreviewData.rows.slice(0, 3).map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">フィールドマッピング</h3>
              {mappingFields.map((field, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1/3">
                    <div className="flex items-center p-2 border rounded-md bg-secondary">
                      <span className="text-sm">{field.source}</span>
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <Select defaultValue={field.target}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">日付</SelectItem>
                        <SelectItem value="location">拠点</SelectItem>
                        <SelectItem value="category">カテゴリ</SelectItem>
                        <SelectItem value="value">数値</SelectItem>
                        <SelectItem value="unit">単位</SelectItem>
                        <SelectItem value="notes">備考</SelectItem>
                        <SelectItem value="ignore">無視する</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMappingDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleConfirmMapping}>マッピングを確認</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 確認ダイアログ */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>インポート確認</DialogTitle>
            <DialogDescription>以下の内容でCSVデータをインポートします</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-secondary">
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="font-medium">検証結果</span>
              </div>
              <div className="space-y-2 pl-7">
                <p className="text-sm">
                  <span className="font-medium">合計レコード数:</span> 156
                </p>
                <p className="text-sm">
                  <span className="font-medium">有効レコード数:</span> 152
                </p>
                <p className="text-sm">
                  <span className="font-medium">エラーレコード数:</span> 4
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-md bg-yellow-50">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">警告</span>
              </div>
              <p className="text-sm pl-7">4件のレコードにエラーがあります。エラーのあるレコードはスキップされます。</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancelImport}>
              キャンセル
            </Button>
            <Button onClick={handleConfirmImport}>インポート実行</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
