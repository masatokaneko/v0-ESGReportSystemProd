"use client";

import { useState } from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, Plus } from "lucide-react";
import { EditDialog } from "./edit-dialog"; // 後述
import { format } from "date-fns";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ActivityPage() {
  const { data, mutate } = useSWR("/api/activity", fetcher);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);

  if (!data) return <div>読み込み中...</div>;

  const handleEdit = (row: any) => {
    setEditData(row);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("本当に削除しますか？")) return;
    await fetch(`/api/activity/${id}`, { method: "DELETE" });
    mutate();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">活動データ一覧</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          追加
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>日付</TableHead>
            <TableHead>説明</TableHead>
            <TableHead>活動量</TableHead>
            <TableHead>単位</TableHead>
            <TableHead>排出係数</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row: any) => (
            <TableRow
              key={row.id}
              className="cursor-pointer hover:bg-muted"
              onClick={() => handleEdit(row)}
            >
              <TableCell>{format(new Date(row.date), "yyyy-MM-dd")}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.emissionFactor?.unit}</TableCell>
              <TableCell>{row.emissionFactor?.factor}</TableCell>
              <TableCell
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(row.id);
                }}
              >
                <Trash
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  size={18}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={editData}
        onSaved={() => {
          setDialogOpen(false);
          mutate();
        }}
      />
    </div>
  );
}
