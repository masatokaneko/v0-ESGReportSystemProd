"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, FileText, FileSpreadsheet, Download, Calendar } from "lucide-react"

export default function ReportsPage() {
  const [reportType, setReportType] = useState("ghg")
  const [reportFormat, setReportFormat] = useState("pdf")
  const [reportPeriod, setReportPeriod] = useState("2023FY")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerateReport = () => {
    setIsGenerating(true)

    // 実際の実装ではAPIエンドポイントにリクエストを送信
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "レポート生成完了",
        description: `${getReportTypeName(reportType)}レポートが正常に生成されました`,
      })
    }, 2000)
  }

  const getReportTypeName = (type: string) => {
    switch (type) {
      case "ghg":
        return "温室効果ガス排出量"
      case "energy":
        return "エネルギー使用量"
      case "water":
        return "水使用量"
      case "waste":
        return "廃棄物排出量"
      case "compliance":
        return "コンプライアンス"
      default:
        return type
    }
  }

  const getReportFormatIcon = (format: string) => {
    switch (format) {
      case "pdf":
        return <FileText className="h-5 w-5" />
      case "excel":
        return <FileSpreadsheet className="h-5 w-5" />
      case "csv":
        return <FileText className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <DashboardLayout allowedRoles={["reviewer", "admin"]}>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">レポート生成</h1>

        <Tabs defaultValue="standard" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="standard">標準レポート</TabsTrigger>
            <TabsTrigger value="custom">カスタムレポート</TabsTrigger>
          </TabsList>
          <TabsContent value="standard" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>温室効果ガス排出量レポート</CardTitle>
                  <CardDescription>Scope 1, 2, 3の温室効果ガス排出量の詳細レポート</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">期間</label>
                      <Select defaultValue="2023FY">
                        <SelectTrigger>
                          <SelectValue placeholder="期間を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2023Q1">2023年 Q1</SelectItem>
                          <SelectItem value="2023Q2">2023年 Q2</SelectItem>
                          <SelectItem value="2023Q3">2023年 Q3</SelectItem>
                          <SelectItem value="2023Q4">2023年 Q4</SelectItem>
                          <SelectItem value="2023FY">2023年度 通年</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">フォーマット</label>
                      <Select defaultValue="pdf">
                        <SelectTrigger>
                          <SelectValue placeholder="フォーマットを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    レポート生成
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>エネルギー使用量レポート</CardTitle>
                  <CardDescription>拠点別・エネルギー種別の使用量レポート</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">期間</label>
                      <Select defaultValue="2023FY">
                        <SelectTrigger>
                          <SelectValue placeholder="期間を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2023Q1">2023年 Q1</SelectItem>
                          <SelectItem value="2023Q2">2023年 Q2</SelectItem>
                          <SelectItem value="2023Q3">2023年 Q3</SelectItem>
                          <SelectItem value="2023Q4">2023年 Q4</SelectItem>
                          <SelectItem value="2023FY">2023年度 通年</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">フォーマット</label>
                      <Select defaultValue="excel">
                        <SelectTrigger>
                          <SelectValue placeholder="フォーマットを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    レポート生成
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>水使用量レポート</CardTitle>
                  <CardDescription>拠点別の水使用量と排水量のレポート</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">期間</label>
                      <Select defaultValue="2023FY">
                        <SelectTrigger>
                          <SelectValue placeholder="期間を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2023Q1">2023年 Q1</SelectItem>
                          <SelectItem value="2023Q2">2023年 Q2</SelectItem>
                          <SelectItem value="2023Q3">2023年 Q3</SelectItem>
                          <SelectItem value="2023Q4">2023年 Q4</SelectItem>
                          <SelectItem value="2023FY">2023年度 通年</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">フォーマット</label>
                      <Select defaultValue="pdf">
                        <SelectTrigger>
                          <SelectValue placeholder="フォーマットを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    レポート生成
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="custom">
            <Card>
              <CardHeader>
                <CardTitle>カスタムレポート生成</CardTitle>
                <CardDescription>必要な情報を選択して、カスタムレポートを生成します</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">レポートタイプ</label>
                      <Select value={reportType} onValueChange={setReportType}>
                        <SelectTrigger>
                          <SelectValue placeholder="レポートタイプを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ghg">温室効果ガス排出量</SelectItem>
                          <SelectItem value="energy">エネルギー使用量</SelectItem>
                          <SelectItem value="water">水使用量</SelectItem>
                          <SelectItem value="waste">廃棄物排出量</SelectItem>
                          <SelectItem value="compliance">コンプライアンス</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">期間</label>
                      <Select value={reportPeriod} onValueChange={setReportPeriod}>
                        <SelectTrigger>
                          <SelectValue placeholder="期間を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2023Q1">2023年 Q1</SelectItem>
                          <SelectItem value="2023Q2">2023年 Q2</SelectItem>
                          <SelectItem value="2023Q3">2023年 Q3</SelectItem>
                          <SelectItem value="2023Q4">2023年 Q4</SelectItem>
                          <SelectItem value="2023FY">2023年度 通年</SelectItem>
                          <SelectItem value="custom">カスタム期間</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">フォーマット</label>
                      <Select value={reportFormat} onValueChange={setReportFormat}>
                        <SelectTrigger>
                          <SelectValue placeholder="フォーマットを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">拠点</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="拠点を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">すべての拠点</SelectItem>
                          <SelectItem value="tokyo">東京本社</SelectItem>
                          <SelectItem value="osaka">大阪支社</SelectItem>
                          <SelectItem value="nagoya">名古屋工場</SelectItem>
                          <SelectItem value="fukuoka">福岡営業所</SelectItem>
                          <SelectItem value="sapporo">札幌営業所</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">グラフ表示</label>
                      <Select defaultValue="include">
                        <SelectTrigger>
                          <SelectValue placeholder="グラフ表示" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="include">グラフを含める</SelectItem>
                          <SelectItem value="exclude">グラフを含めない</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">比較データ</label>
                      <Select defaultValue="previous">
                        <SelectTrigger>
                          <SelectValue placeholder="比較データ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">比較なし</SelectItem>
                          <SelectItem value="previous">前年同期比</SelectItem>
                          <SelectItem value="target">目標値比</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2">
                  {getReportFormatIcon(reportFormat)}
                  <span className="text-sm text-muted-foreground">
                    {getReportTypeName(reportType)}レポート ({reportFormat.toUpperCase()})
                  </span>
                </div>
                <Button onClick={handleGenerateReport} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      レポート生成
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">最近生成したレポート</h3>
              <div className="space-y-2">
                {[
                  {
                    name: "温室効果ガス排出量レポート_2023FY.pdf",
                    date: "2023-05-15",
                    format: "pdf",
                  },
                  {
                    name: "エネルギー使用量レポート_2023Q1.xlsx",
                    date: "2023-04-10",
                    format: "excel",
                  },
                  {
                    name: "水使用量レポート_2023Q1.pdf",
                    date: "2023-04-05",
                    format: "pdf",
                  },
                  {
                    name: "廃棄物排出量レポート_2022FY.csv",
                    date: "2023-03-20",
                    format: "csv",
                  },
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-md bg-white">
                    <div className="flex items-center">
                      {getReportFormatIcon(report.format)}
                      <span className="ml-2 text-sm font-medium">{report.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {report.date}
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
