"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatusBadge } from "@/components/ui/status-badge"
import { StepIndicator } from "@/components/ui/step-indicator"
import { useToast } from "@/components/ui/use-toast"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { FileIcon, Search, CheckCircle, XCircle } from "lucide-react"

// モックデータ
const mockApprovals = [
  {
    id: "1",
    title: "東京本社 電力使用量",
    submitter: "山田太郎",
    submittedAt: "2023-04-01",
    scope: "scope2",
    category: "energy",
    location: "tokyo",
    period: "2023Q1",
    value: 45000,
    unit: "kWh",
    emissionFactor: 0.000423,
    calculatedEmission: 19.035,
    status: "pending",
    notes: "東京電力からの請求書に基づく報告",
    files: [{ name: "電力使用量明細.pdf", size: 1240000 }],
  },
  {
    id: "2",
    title: "大阪支社 ガス使用量",
    submitter: "佐藤花子",
    submittedAt: "2023-04-02",
    scope: "scope1",
    category: "energy",
    location: "osaka",
    period: "2023Q1",
    value: 2500,
    unit: "m3",
    emissionFactor: 2.21,
    calculatedEmission: 5525,
    status: "pending",
    notes: "大阪ガスからの請求書に基づく報告",
    files: [{ name: "ガス使用量明細.pdf", size: 980000 }],
  },
  {
    id: "3",
    title: "名古屋工場 廃棄物排出量",
    submitter: "鈴木一郎",
    submittedAt: "2023-04-03",
    scope: "scope3",
    category: "waste",
    location: "nagoya",
    period: "2023Q1",
    value: 12500,
    unit: "kg",
    emissionFactor: 0.0005,
    calculatedEmission: 6.25,
    status: "pending",
    notes: "産業廃棄物処理業者からの報告書に基づく",
    files: [
      { name: "廃棄物処理報告書.pdf", size: 1560000 },
      { name: "マニフェスト.pdf", size: 2340000 },
    ],
  },
  {
    id: "4",
    title: "福岡営業所 社用車燃料",
    submitter: "高橋健太",
    submittedAt: "2023-04-04",
    scope: "scope1",
    category: "transport",
    location: "fukuoka",
    period: "2023Q1",
    value: 450,
    unit: "L",
    emissionFactor: 2.32,
    calculatedEmission: 1044,
    status: "pending",
    notes: "ガソリンカード明細に基づく報告",
    files: [{ name: "給油明細.pdf", size: 890000 }],
  },
  {
    id: "5",
    title: "札幌営業所 水使用量",
    submitter: "伊藤めぐみ",
    submittedAt: "2023-04-05",
    scope: "scope3",
    category: "water",
    location: "sapporo",
    period: "2023Q1",
    value: 320,
    unit: "m3",
    emissionFactor: 0.23,
    calculatedEmission: 73.6,
    status: "pending",
    notes: "水道局からの請求書に基づく報告",
    files: [{ name: "水道使用量明細.pdf", size: 760000 }],
  },
]

const approvalSteps = [
  { id: "draft", label: "下書き", description: "作成中" },
  { id: "pending", label: "承認待ち", description: "レビュー中" },
  { id: "approved", label: "承認済", description: "完了" },
]

const commentSchema = z.object({
  comment: z.string().min(1, { message: "コメントを入力してください" }),
})

type CommentFormValues = z.infer<typeof commentSchema>

export default function ApprovalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  })

  const filteredApprovals = mockApprovals.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.submitter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDetails = (item: any) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
  }

  const handleApprove = () => {
    toast({
      title: "承認完了",
      description: `${selectedItem.title}を承認しました`,
    })
    setIsDialogOpen(false)
    setSelectedItem(null)
    form.reset()
  }

  const handleReject = (data: CommentFormValues) => {
    toast({
      title: "差戻し完了",
      description: `${selectedItem.title}を差戻しました`,
    })
    setIsDialogOpen(false)
    setSelectedItem(null)
    form.reset()
  }

  const getStatusStep = (status: string) => {
    switch (status) {
      case "draft":
        return 0
      case "pending":
        return 1
      case "approved":
        return 2
      case "rejected":
        return 1
      default:
        return 0
    }
  }

  return (
    <DashboardLayout allowedRoles={["reviewer", "admin"]}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">承認管理</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="検索..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>タイトル</TableHead>
                <TableHead>提出者</TableHead>
                <TableHead>提出日</TableHead>
                <TableHead>拠点</TableHead>
                <TableHead>期間</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="text-right">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApprovals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    承認待ちのデータがありません
                  </TableCell>
                </TableRow>
              ) : (
                filteredApprovals.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.submitter}</TableCell>
                    <TableCell>{item.submittedAt}</TableCell>
                    <TableCell>
                      {item.location === "tokyo" && "東京本社"}
                      {item.location === "osaka" && "大阪支社"}
                      {item.location === "nagoya" && "名古屋工場"}
                      {item.location === "fukuoka" && "福岡営業所"}
                      {item.location === "sapporo" && "札幌営業所"}
                    </TableCell>
                    <TableCell>
                      {item.period === "2023Q1" && "2023年 Q1"}
                      {item.period === "2023Q2" && "2023年 Q2"}
                      {item.period === "2023Q3" && "2023年 Q3"}
                      {item.period === "2023Q4" && "2023年 Q4"}
                      {item.period === "2023FY" && "2023年度 通年"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={item.status as any} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(item)}>
                        詳細
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedItem && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedItem.title}</DialogTitle>
              <DialogDescription>
                {selectedItem.submitter}さんが{selectedItem.submittedAt}に提出
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <StepIndicator
                steps={approvalSteps}
                currentStep={getStatusStep(selectedItem.status)}
                status={selectedItem.status}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div>
                <h3 className="text-sm font-medium mb-2">基本情報</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm text-muted-foreground">Scope:</div>
                    <div className="text-sm col-span-2">
                      {selectedItem.scope === "scope1" && "Scope 1 (直接排出)"}
                      {selectedItem.scope === "scope2" && "Scope 2 (間接排出)"}
                      {selectedItem.scope === "scope3" && "Scope 3 (その他の間接排出)"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm text-muted-foreground">カテゴリ:</div>
                    <div className="text-sm col-span-2">
                      {selectedItem.category === "energy" && "エネルギー"}
                      {selectedItem.category === "water" && "水"}
                      {selectedItem.category === "waste" && "廃棄物"}
                      {selectedItem.category === "transport" && "輸送"}
                      {selectedItem.category === "procurement" && "調達"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm text-muted-foreground">拠点:</div>
                    <div className="text-sm col-span-2">
                      {selectedItem.location === "tokyo" && "東京本社"}
                      {selectedItem.location === "osaka" && "大阪支社"}
                      {selectedItem.location === "nagoya" && "名古屋工場"}
                      {selectedItem.location === "fukuoka" && "福岡営業所"}
                      {selectedItem.location === "sapporo" && "札幌営業所"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm text-muted-foreground">対象期間:</div>
                    <div className="text-sm col-span-2">
                      {selectedItem.period === "2023Q1" && "2023年 Q1"}
                      {selectedItem.period === "2023Q2" && "2023年 Q2"}
                      {selectedItem.period === "2023Q3" && "2023年 Q3"}
                      {selectedItem.period === "2023Q4" && "2023年 Q4"}
                      {selectedItem.period === "2023FY" && "2023年度 通年"}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">排出量情報</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm text-muted-foreground">数値:</div>
                    <div className="text-sm col-span-2">
                      {selectedItem.value.toLocaleString()} {selectedItem.unit}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm text-muted-foreground">排出係数:</div>
                    <div className="text-sm col-span-2">
                      {selectedItem.emissionFactor} t-CO2/{selectedItem.unit}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm text-muted-foreground">計算結果:</div>
                    <div className="text-sm font-medium col-span-2">
                      {selectedItem.calculatedEmission.toLocaleString()} t-CO2
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-2">
              <h3 className="text-sm font-medium mb-2">備考</h3>
              <div className="text-sm bg-secondary p-3 rounded-md">{selectedItem.notes || "備考なし"}</div>
            </div>

            {selectedItem.files && selectedItem.files.length > 0 && (
              <div className="py-2">
                <h3 className="text-sm font-medium mb-2">添付ファイル</h3>
                <div className="space-y-2">
                  {selectedItem.files.map((file: any, index: number) => (
                    <div key={index} className="flex items-center p-2 border rounded-md">
                      <FileIcon className="h-5 w-5 text-primary mr-2" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{file.name}</div>
                        <div className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                      <Button variant="outline" size="sm">
                        表示
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleReject)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>コメント</FormLabel>
                      <FormControl>
                        <Textarea placeholder="承認または差戻しの理由を入力してください" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    キャンセル
                  </Button>
                  <Button variant="destructive" type="submit" className="gap-1">
                    <XCircle className="h-4 w-4" />
                    差戻し
                  </Button>
                  <Button type="button" onClick={handleApprove} className="gap-1">
                    <CheckCircle className="h-4 w-4" />
                    承認
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  )
}
