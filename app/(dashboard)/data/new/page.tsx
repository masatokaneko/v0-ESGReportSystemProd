"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { FileDropZone } from "@/components/ui/file-drop-zone"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const dataEntrySchema = z.object({
  title: z.string().min(1, { message: "タイトルを入力してください" }),
  scope: z.enum(["scope1", "scope2", "scope3"], {
    required_error: "Scopeを選択してください",
  }),
  category: z.string().min(1, { message: "カテゴリを選択してください" }),
  location: z.string().min(1, { message: "拠点を選択してください" }),
  period: z.string().min(1, { message: "対象期間を選択してください" }),
  value: z.coerce.number().min(0, { message: "0以上の数値を入力してください" }),
  unit: z.string().min(1, { message: "単位を選択してください" }),
  emissionFactor: z.coerce.number().min(0, { message: "0以上の数値を入力してください" }),
  notes: z.string().optional(),
})

type DataEntryFormValues = z.infer<typeof dataEntrySchema>

export default function DataEntryPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<DataEntryFormValues>({
    resolver: zodResolver(dataEntrySchema),
    defaultValues: {
      title: "",
      scope: "scope1",
      category: "",
      location: "",
      period: "",
      value: 0,
      unit: "",
      emissionFactor: 0,
      notes: "",
    },
  })

  const { watch } = form
  const value = watch("value")
  const emissionFactor = watch("emissionFactor")
  const calculatedEmission = value * emissionFactor

  const onSubmit = async (data: DataEntryFormValues) => {
    setIsSubmitting(true)
    try {
      // 実際の実装ではAPIエンドポイントにデータを送信
      console.log("送信データ:", { ...data, files, calculatedEmission })

      // 送信成功を模擬
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "データ登録完了",
        description: "データが正常に登録されました。承認待ちとなります。",
      })

      // フォームリセット
      form.reset()
      setFiles([])
    } catch (error) {
      console.error("データ登録エラー:", error)
      toast({
        variant: "destructive",
        title: "エラー",
        description: "データ登録中にエラーが発生しました。再度お試しください。",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles)
  }

  return (
    <DashboardLayout allowedRoles={["inputer", "reviewer", "admin"]}>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">ESGデータ登録</h1>

        <Card>
          <CardHeader>
            <CardTitle>新規データ入力</CardTitle>
            <CardDescription>ESG関連データを入力し、承認プロセスに送信します</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>タイトル</FormLabel>
                        <FormControl>
                          <Input placeholder="データタイトル" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="scope"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Scope</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Scopeを選択" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="scope1">Scope 1 (直接排出)</SelectItem>
                            <SelectItem value="scope2">Scope 2 (間接排出)</SelectItem>
                            <SelectItem value="scope3">Scope 3 (その他の間接排出)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>カテゴリ</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="カテゴリを選択" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="energy">エネルギー</SelectItem>
                            <SelectItem value="water">水</SelectItem>
                            <SelectItem value="waste">廃棄物</SelectItem>
                            <SelectItem value="transport">輸送</SelectItem>
                            <SelectItem value="procurement">調達</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>拠点</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="拠点を選択" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="tokyo">東京本社</SelectItem>
                            <SelectItem value="osaka">大阪支社</SelectItem>
                            <SelectItem value="nagoya">名古屋工場</SelectItem>
                            <SelectItem value="fukuoka">福岡営業所</SelectItem>
                            <SelectItem value="sapporo">札幌営業所</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="period"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>対象期間</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="対象期間を選択" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="2023Q1">2023年 Q1</SelectItem>
                            <SelectItem value="2023Q2">2023年 Q2</SelectItem>
                            <SelectItem value="2023Q3">2023年 Q3</SelectItem>
                            <SelectItem value="2023Q4">2023年 Q4</SelectItem>
                            <SelectItem value="2023FY">2023年度 通年</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>数値</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>単位</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="単位を選択" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="kWh">kWh</SelectItem>
                            <SelectItem value="m3">m³</SelectItem>
                            <SelectItem value="L">L</SelectItem>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="t">t</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="emissionFactor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>排出係数</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.001" {...field} />
                        </FormControl>
                        <FormDescription>単位あたりのCO2排出係数 (t-CO2/単位)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <div className="text-sm font-medium">計算結果</div>
                    <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background text-sm">
                      <span>{calculatedEmission.toFixed(2)}</span>
                      <span className="ml-1 text-muted-foreground">t-CO2</span>
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>備考</FormLabel>
                      <FormControl>
                        <Textarea placeholder="補足情報があれば入力してください" className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <div className="text-sm font-medium">添付ファイル</div>
                  <FileDropZone
                    onFilesSelected={handleFilesSelected}
                    maxFiles={3}
                    acceptedFileTypes={["application/pdf"]}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" type="button">
                    下書き保存
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        送信中...
                      </>
                    ) : (
                      "承認依頼"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
