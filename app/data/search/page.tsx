"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Search, FileDown } from "lucide-react"

// モックデータ
const mockData = [
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
    calculatedEmission: 19.035,
    status: "approved",
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
    calculatedEmission: 5525,
    status: "pending",
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
    calculatedEmission: 6.25,
    status: "approved",
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
    calculatedEmission: 1044,
    status: "rejected",
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
    calculatedEmission: 73.6,
    status: "draft",
  },
  {
    id: "6",
    title: "東京本社 電力使用量",
    submitter: "山田太郎",
    submittedAt: "2023-07-01",
    scope: "scope2",
    category: "energy",
    location: "tokyo",
    period: "2023Q2",
    value: 52000,
    unit: "kWh",
    calculatedEmission: 21.996,
    status: "approved",
  },
  {
    id: "7",
    title: "大阪支社 ガス使用量",
    submitter: "佐藤花子",
    submittedAt: "2023-07-02",
    scope: "scope1",
    category: "energy",
    location: "osaka",
    period: "2023Q2",
    value: 2800,
    unit: "m3",
    calculatedEmission: 6188,
    status: "approved",
  },
  {
    id: "8",
    title: "名古屋工場 廃棄物排出量",
    submitter: "鈴木一郎",
    submittedAt: "2023-07-03",
    scope: "scope3",
    category: "waste",
    location: "nagoya",
    period: "2023Q2",
    value: 13200,
    unit: "kg",
    calculatedEmission: 6.6,
    status: "approved",
  },
  {
    id: "9",
    title: "福岡営業所 社用車燃料",
    submitter: "高橋健太",
    submittedAt: "2023-07-04",
    scope: "scope1",
    category: "transport",
    location: "fukuoka",
    period: "2023Q2",
    value: 520,
    unit: "L",
    calculatedEmission: 1206.4,
    status: "approved",
  },
  {
    id: "10",
    title: "札幌営業所 水使用量",
    submitter: "伊藤めぐみ",
    submittedAt: "2023-07-05",
    scope: "scope3",
    category: "water",
    location: "sapporo",
    period: "2023Q2",
    value: 350,
    unit: "m3",
    calculatedEmission: 80.5,
    status: "approved",
  },
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedScope, setSelectedScope] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // フィルタリング
  const filteredData = mockData.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.submitter.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesScope = selectedScope === "all" || item.scope === selectedScope
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesLocation = selectedLocation === "all" || item.location === selectedLocation
    const matchesPeriod = selectedPeriod === "all" || item.period === selectedPeriod
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus

    return matchesSearch && matchesScope && matchesCategory && matchesLocation && matchesPeriod && matchesStatus
  })

  // ページネーション
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedScope("all")
    setSelectedCategory("all")
    setSelectedLocation("all")
    setSelectedPeriod("all")
    setSelectedStatus("all")
    setCurrentPage(1)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">データ検索</h1>
          <Button variant="outline" className="gap-2" onClick={resetFilters}>
            <Search className="h-4 w-4" />
            フィルターをリセット
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>検索条件</CardTitle>
            <CardDescription>検索条件を指定して、ESGデータを絞り込みます</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">キーワード</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="タイトル、提出者で検索..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Scope</label>
                <Select value={selectedScope} onValueChange={setSelectedScope}>
                  <SelectTrigger>
                    <SelectValue placeholder="Scopeを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="scope1">Scope 1</SelectItem>
                    <SelectItem value="scope2">Scope 2</SelectItem>
                    <SelectItem value="scope3">Scope 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">カテゴリ</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="カテゴリを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="energy">エネルギー</SelectItem>
                    <SelectItem value="water">水</SelectItem>
                    <SelectItem value="waste">廃棄物</SelectItem>
                    <SelectItem value="transport">輸送</SelectItem>
                    <SelectItem value="procurement">調達</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">拠点</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="拠点を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="tokyo">東京本社</SelectItem>
                    <SelectItem value="osaka">大阪支社</SelectItem>
                    <SelectItem value="nagoya">名古屋工場</SelectItem>
                    <SelectItem value="fukuoka">福岡営業所</SelectItem>
                    <SelectItem value="sapporo">札幌営業所</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">対象期間</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="期間を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="2023Q1">2023年 Q1</SelectItem>
                    <SelectItem value="2023Q2">2023年 Q2</SelectItem>
                    <SelectItem value="2023Q3">2023年 Q3</SelectItem>
                    <SelectItem value="2023Q4">2023年 Q4</SelectItem>
                    <SelectItem value="2023FY">2023年度 通年</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">ステータス</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="ステータスを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="draft">下書き</SelectItem>
                    <SelectItem value="pending">承認待ち</SelectItem>
                    <SelectItem value="approved">承認済み</SelectItem>
                    <SelectItem value="rejected">差戻し</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="rounded-md border bg-white">
          <div className="flex justify-between items-center p-4 border-b">
            <div className="text-sm text-muted-foreground">{filteredData.length}件のデータが見つかりました</div>
            <Button variant="outline" size="sm" className="gap-1">
              <FileDown className="h-4 w-4" />
              CSVエクスポート
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>タイトル</TableHead>
                <TableHead>提出者</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead>カテゴリ</TableHead>
                <TableHead>拠点</TableHead>
                <TableHead>期間</TableHead>
                <TableHead>排出量 (t-CO2)</TableHead>
                <TableHead>ステータス</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    条件に一致するデータがありません
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.submitter}</TableCell>
                    <TableCell>
                      {item.scope === "scope1" && "Scope 1"}
                      {item.scope === "scope2" && "Scope 2"}
                      {item.scope === "scope3" && "Scope 3"}
                    </TableCell>
                    <TableCell>
                      {item.category === "energy" && "エネルギー"}
                      {item.category === "water" && "水"}
                      {item.category === "waste" && "廃棄物"}
                      {item.category === "transport" && "輸送"}
                      {item.category === "procurement" && "調達"}
                    </TableCell>
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
                    <TableCell>{item.calculatedEmission.toLocaleString()}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status as any} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <div className="p-4 border-t">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage > 1) handlePageChange(currentPage - 1)
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1
                    // 現在のページの前後2ページまでと最初と最後のページを表示
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              handlePageChange(page)
                            }}
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    }
                    // 省略記号を表示（前後の省略記号が重複しないように）
                    if ((page === 2 && currentPage > 3) || (page === totalPages - 1 && currentPage < totalPages - 2)) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )
                    }
                    return null
                  })}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage < totalPages) handlePageChange(currentPage + 1)
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
