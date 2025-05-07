"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, FileText, FileSpreadsheet, Download } from "lucide-react"

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("report")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  // レポート生成用の状態
  const [reportType, setReportType] = useState("")
  const [reportPeriod, setReportPeriod] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [includeGraphs, setIncludeGraphs] = useState(false)
  const [includePrevYearComparison, setIncludePrevYearComparison] = useState(false)

  // データエクスポート用の状態
  const [exportFormat, setExportFormat] = useState("excel")
  const [exportStartDate, setExportStartDate] = useState("")
  const [exportEndDate, setExportEndDate] = useState("")
  const [exportLocations, setExportLocations] = useState<string[]>([])
  const [exportDepartments, setExportDepartments] = useState<string[]>([])
  const [includeRawData, setIncludeRawData] = useState(false)
  const [includeSummarySheet, setIncludeSummarySheet] = useState(false)

  const handleGenerateReport = () => {
    setIsGenerating(true)

    // 実際の実装ではAPIエンドポイントにリクエストを送信
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "レポート生成完了",
        description: "レポートが正常に生成されました",
      })
    }, 2000)
  }

  const handleExportData = () => {
    setIsGenerating(true)

    // 実際の実装ではAPIエンドポイントにリクエストを送信
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "データエクスポート完了",
        description: "データが正常にエクスポートされました",
      })
    }, 2000)
  }

  const toggleLocation = (location: string) => {
    if (activeTab === "report") {
      setSelectedLocations((prev) =>
        prev.includes(location) ? prev.filter((loc) => loc !== location) : [...prev, location],
      )
    } else {
      setExportLocations((prev) =>
        prev.includes(location) ? prev.filter((loc) => loc !== location) : [...prev, location],
      )
    }
  }

  const toggleDepartment = (department: string) => {
    setExportDepartments((prev) =>
      prev.includes(department) ? prev.filter((dep) => dep !== department) : [...prev, department],
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">レポート出力</h1>

      <Tabs defaultValue="report" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="report">レポート生成</TabsTrigger>
          <TabsTrigger value="export">データエクスポート</TabsTrigger>
        </TabsList>

        {/* レポート生成タブ */}
        <TabsContent value="report" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ESGレポート生成</CardTitle>
              <CardDescription>期間や対象範囲を選択して、定型フォーマットのESGレポートを生成します。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">レポートタイプ</label>
                      <Select value={reportType} onValueChange={setReportType}>
                        <SelectTrigger>
                          <SelectValue placeholder="レポートタイプを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="summary">サマリーレポート</SelectItem>
                          <SelectItem value="detailed">詳細レポート</SelectItem>
                          <SelectItem value="investor">投資家向けレポート</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">生成するレポートの種類を選択してください。</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-2">期間</label>
                      <Select value={reportPeriod} onValueChange={setReportPeriod}>
                        <SelectTrigger>
                          <SelectValue placeholder="期間を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="custom">カスタム期間</SelectItem>
                          <SelectItem value="2023Q1">2023年 Q1</SelectItem>
                          <SelectItem value="2023Q2">2023年 Q2</SelectItem>
                          <SelectItem value="2023Q3">2023年 Q3</SelectItem>
                          <SelectItem value="2023Q4">2023年 Q4</SelectItem>
                          <SelectItem value="2023FY">2023年度 通年</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">レポートの対象期間を選択してください。</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium block mb-2">開始日</label>
                        <Input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          disabled={reportPeriod !== "custom"}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">終了日</label>
                        <Input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          disabled={reportPeriod !== "custom"}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">対象拠点</label>
                      <p className="text-xs text-muted-foreground mb-2">レポートに含める拠点を選択してください。</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="tokyo"
                            checked={selectedLocations.includes("tokyo")}
                            onCheckedChange={() => toggleLocation("tokyo")}
                          />
                          <label htmlFor="tokyo" className="text-sm">
                            東京本社
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="osaka"
                            checked={selectedLocations.includes("osaka")}
                            onCheckedChange={() => toggleLocation("osaka")}
                          />
                          <label htmlFor="osaka" className="text-sm">
                            大阪支社
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="nagoya"
                            checked={selectedLocations.includes("nagoya")}
                            onCheckedChange={() => toggleLocation("nagoya")}
                          />
                          <label htmlFor="nagoya" className="text-sm">
                            名古屋支社
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="fukuoka"
                            checked={selectedLocations.includes("fukuoka")}
                            onCheckedChange={() => toggleLocation("fukuoka")}
                          />
                          <label htmlFor="fukuoka" className="text-sm">
                            福岡支社
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="include-graphs"
                          checked={includeGraphs}
                          onCheckedChange={(checked) => setIncludeGraphs(!!checked)}
                        />
                        <div>
                          <label htmlFor="include-graphs" className="text-sm font-medium">
                            グラフを含める
                          </label>
                          <p className="text-xs text-muted-foreground">
                            排出量の推移や内訳を視覚的に表示するグラフを含めます。
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="include-prev-year"
                          checked={includePrevYearComparison}
                          onCheckedChange={(checked) => setIncludePrevYearComparison(!!checked)}
                        />
                        <div>
                          <label htmlFor="include-prev-year" className="text-sm font-medium">
                            前年比較を含める
                          </label>
                          <p className="text-xs text-muted-foreground">前年同期間との比較データを含めます。</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-4">レポートプレビュー</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 flex flex-col items-center justify-center text-center">
                      <FileText className="h-12 w-12 text-primary mb-2" />
                      <h4 className="text-sm font-medium">サマリーレポート</h4>
                      <p className="text-xs text-muted-foreground">PDF形式</p>
                    </div>
                    <div className="border rounded-md p-4 flex flex-col items-center justify-center text-center">
                      <FileText className="h-12 w-12 text-primary mb-2" />
                      <h4 className="text-sm font-medium">詳細レポート</h4>
                      <p className="text-xs text-muted-foreground">PDF形式</p>
                    </div>
                    <div className="border rounded-md p-4 flex flex-col items-center justify-center text-center">
                      <FileText className="h-12 w-12 text-primary mb-2" />
                      <h4 className="text-sm font-medium">投資家向けレポート</h4>
                      <p className="text-xs text-muted-foreground">PDF形式</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateReport} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    レポートを生成
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* データエクスポートタブ */}
        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>データエクスポート</CardTitle>
              <CardDescription>期間や対象範囲を選択して、データをエクスポートします。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">エクスポート形式</label>
                      <Select value={exportFormat} onValueChange={setExportFormat}>
                        <SelectTrigger>
                          <SelectValue placeholder="形式を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">エクスポートするデータの形式を選択してください。</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium block mb-2">開始日</label>
                        <Input
                          type="date"
                          value={exportStartDate}
                          onChange={(e) => setExportStartDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">終了日</label>
                        <Input
                          type="date"
                          value={exportEndDate}
                          onChange={(e) => setExportEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">対象拠点</label>
                      <p className="text-xs text-muted-foreground mb-2">エクスポートに含める拠点を選択してください。</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="export-tokyo"
                            checked={exportLocations.includes("tokyo")}
                            onCheckedChange={() => toggleLocation("tokyo")}
                          />
                          <label htmlFor="export-tokyo" className="text-sm">
                            東京本社
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="export-osaka"
                            checked={exportLocations.includes("osaka")}
                            onCheckedChange={() => toggleLocation("osaka")}
                          />
                          <label htmlFor="export-osaka" className="text-sm">
                            大阪支社
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="export-nagoya"
                            checked={exportLocations.includes("nagoya")}
                            onCheckedChange={() => toggleLocation("nagoya")}
                          />
                          <label htmlFor="export-nagoya" className="text-sm">
                            名古屋支社
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="export-fukuoka"
                            checked={exportLocations.includes("fukuoka")}
                            onCheckedChange={() => toggleLocation("fukuoka")}
                          />
                          <label htmlFor="export-fukuoka" className="text-sm">
                            福岡支社
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="include-raw-data"
                          checked={includeRawData}
                          onCheckedChange={(checked) => setIncludeRawData(!!checked)}
                        />
                        <div>
                          <label htmlFor="include-raw-data" className="text-sm font-medium">
                            生データを含める
                          </label>
                          <p className="text-xs text-muted-foreground">
                            未加工のデータを含めます。データ分析や検証に使用できます。
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="include-summary"
                          checked={includeSummarySheet}
                          onCheckedChange={(checked) => setIncludeSummarySheet(!!checked)}
                        />
                        <div>
                          <label htmlFor="include-summary" className="text-sm font-medium">
                            サマリーシートを含める
                          </label>
                          <p className="text-xs text-muted-foreground">
                            データの概要をまとめたシートを含めます。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleExportData} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    エクスポート中...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    データをエクスポート
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
