"use client";

import { useState } from "react";
// import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatusBadge } from "@/components/ui/status-badge";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileIcon, Search, CheckCircle, XCircle, FileText } from "lucide-react";

// モックデータ
const mockApprovals = [
  {
    id: "ESG-2023-001",
    date: "2023-04-01",
    location: "東京本社",
    department: "総務部",
    activityType: "電力使用量",
    emission: 5287.5,
    status: "pending",
    submitter: "山田太郎",
    notes: "東京電力からの請求書に基づく報告",
    files: [{ name: "電力使用量明細.pdf", size: 1240000 }],
  },
  {
    id: "ESG-2023-002",
    date: "2023-04-01",
    location: "大阪支社",
    department: "営業部",
    activityType: "ガス使用量",
    emission: 1003.5,
    status: "pending",
    submitter: "佐藤花子",
    notes: "大阪ガスからの請求書に基づく報告",
    files: [{ name: "ガス使用量明細.pdf", size: 980000 }],
  },
  {
    id: "ESG-2023-003",
    date: "2023-04-01",
    location: "名古屋支社",
    department: "製造部",
    activityType: "燃料消費量",
    emission: 825.6,
    status: "pending",
    submitter: "鈴木一郎",
    notes: "社用車のガソリン使用量",
    files: [{ name: "給油明細.pdf", size: 890000 }],
  },
  {
    id: "ESG-2023-004",
    date: "2023-04-01",
    location: "福岡支社",
    department: "研究開発部",
    activityType: "水使用量",
    emission: 179.4,
    status: "approved",
    submitter: "田中誠",
    notes: "水道局からの請求書に基づく報告",
    files: [{ name: "水道使用量明細.pdf", size: 760000 }],
  },
  {
    id: "ESG-2023-005",
    date: "2023-04-01",
    location: "札幌支社",
    department: "情報システム部",
    activityType: "廃棄物排出量",
    emission: 498,
    status: "rejected",
    submitter: "高橋洋太",
    notes: "産業廃棄物処理業者からの報告書に基づく",
    files: [
      { name: "廃棄物処理報告書.pdf", size: 1560000 },
      { name: "マニフェスト.pdf", size: 2340000 },
    ],
  },
];

const commentSchema = z.object({
  comment: z.string().min(1, { message: "コメントを入力してください" }),
});

type CommentFormValues = z.infer<typeof commentSchema>;

export default function ApprovalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("pending");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [approvalData, setApprovalData] = useState(mockApprovals);
  const { toast } = useToast();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const filteredApprovals = approvalData.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.activityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.submitter.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedFilter === "all" || item.status === selectedFilter;
    const matchesDepartment =
      departmentFilter === "all" || item.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleViewDetails = (item: any) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleApprove = () => {
    const updatedData = approvalData.map((item) =>
      item.id === selectedItem.id ? { ...item, status: "approved" } : item
    );

    setApprovalData(updatedData);

    toast({
      title: "承認完了",
      description: `${selectedItem.id}を承認しました`,
    });
    setIsDialogOpen(false);
    setSelectedItem(null);
    form.reset();
  };

  const handleReject = (data: CommentFormValues) => {
    const updatedData = approvalData.map((item) =>
      item.id === selectedItem.id
        ? { ...item, status: "rejected", rejectReason: data.comment }
        : item
    );

    setApprovalData(updatedData);

    toast({
      title: "差戻し完了",
      description: `${selectedItem.id}を差戻しました`,
    });
    setIsDialogOpen(false);
    setSelectedItem(null);
    form.reset();
  };

  return (
    <div>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">データ承認</h1>

        <div className="bg-white rounded-md shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">承認待ちデータ一覧</h2>
            <p className="text-sm text-muted-foreground">
              登録されたESGデータを確認し、承認または差戻しを行います。
            </p>
          </div>

          <div className="p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="キーワード検索..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="承認状況" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="pending">承認待ち</SelectItem>
                  <SelectItem value="approved">承認済み</SelectItem>
                  <SelectItem value="rejected">差戻し</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="部門" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="総務部">総務部</SelectItem>
                  <SelectItem value="営業部">営業部</SelectItem>
                  <SelectItem value="製造部">製造部</SelectItem>
                  <SelectItem value="研究開発部">研究開発部</SelectItem>
                  <SelectItem value="情報システム部">情報システム部</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="whitespace-nowrap">
                フィルター適用
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>日付</TableHead>
                  <TableHead>拠点</TableHead>
                  <TableHead>部門</TableHead>
                  <TableHead>活動種類</TableHead>
                  <TableHead>排出量(kg-CO2)</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>登録者</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApprovals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6">
                      該当するデータがありません
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApprovals.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>{item.activityType}</TableCell>
                      <TableCell>{item.emission.toLocaleString()}</TableCell>
                      <TableCell>
                        <StatusBadge status={item.status as any} />
                      </TableCell>
                      <TableCell>{item.submitter}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewDetails(item)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          {item.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-status-approved"
                                onClick={() => {
                                  setSelectedItem(item);
                                  handleApprove();
                                }}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-status-rejected"
                                onClick={() => {
                                  setSelectedItem(item);
                                  setIsDialogOpen(true);
                                }}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* 詳細・承認ダイアログ */}
      {selectedItem && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {selectedItem.id}: {selectedItem.activityType}
              </DialogTitle>
              <DialogDescription>
                {selectedItem.submitter}さんが{selectedItem.date}に提出
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div>
                <h3 className="text-sm font-medium mb-2">基本情報</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm text-muted-foreground">拠点:</div>
                    <div className="text-sm col-span-2">
                      {selectedItem.location}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm text-muted-foreground">部門:</div>
                    <div className="text-sm col-span-2">
                      {selectedItem.department}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm text-muted-foreground">
                      活動種類:
                    </div>
                    <div className="text-sm col-span-2">
                      {selectedItem.activityType}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm text-muted-foreground">日付:</div>
                    <div className="text-sm col-span-2">
                      {selectedItem.date}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">排出量情報</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm text-muted-foreground">排出量:</div>
                    <div className="text-sm font-medium col-span-2">
                      {selectedItem.emission.toLocaleString()} kg-CO2
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm text-muted-foreground">
                      ステータス:
                    </div>
                    <div className="text-sm col-span-2">
                      <StatusBadge status={selectedItem.status as any} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-2">
              <h3 className="text-sm font-medium mb-2">備考</h3>
              <div className="text-sm bg-secondary p-3 rounded-md">
                {selectedItem.notes || "備考なし"}
              </div>
            </div>

            {selectedItem.files && selectedItem.files.length > 0 && (
              <div className="py-2">
                <h3 className="text-sm font-medium mb-2">添付ファイル</h3>
                <div className="space-y-2">
                  {selectedItem.files.map((file: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center p-2 border rounded-md"
                    >
                      <FileIcon className="h-5 w-5 text-primary mr-2" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        表示
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedItem.status === "pending" && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleReject)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>コメント</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="承認または差戻しの理由を入力してください"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      キャンセル
                    </Button>
                    <Button
                      variant="destructive"
                      type="submit"
                      className="gap-1"
                    >
                      <XCircle className="h-4 w-4" />
                      差戻し
                    </Button>
                    <Button
                      type="button"
                      onClick={handleApprove}
                      className="gap-1"
                    >
                      <CheckCircle className="h-4 w-4" />
                      承認
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            )}

            {selectedItem.status !== "pending" && (
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  閉じる
                </Button>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
