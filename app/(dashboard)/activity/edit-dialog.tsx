"use client";

import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWR, { mutate } from "swr";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const schema = z.object({
  date: z.string().min(1, "日付は必須です"),
  description: z.string().optional(),
  amount: z.string().min(1, "活動量は必須です"),
  emissionFactorId: z.string().min(1, "排出係数は必須です"),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: any | null; // 編集時はActivityData型
  onSaved?: () => void;
};

export function EditDialog({ open, onOpenChange, data, onSaved }: Props) {
  const isEdit = !!data;
  const { data: factors } = useSWR("/api/emission-factor", (url) => fetch(url).then(res => res.json()));

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: "",
      description: "",
      amount: "",
      emissionFactorId: "",
    },
  });

  // 編集時は初期値セット
  useEffect(() => {
    if (data) {
      setValue("date", data.date ? data.date.slice(0, 10) : "");
      setValue("description", data.description ?? "");
      setValue("amount", String(data.amount));
      setValue("emissionFactorId", String(data.emissionFactorId));
    } else {
      reset();
    }
  }, [data, setValue, reset]);

  const onSubmit = async (values: FormValues) => {
    const payload = {
      ...values,
      amount: Number(values.amount),
      emissionFactorId: Number(values.emissionFactorId),
      date: values.date,
    };
    let res;
    if (isEdit) {
      res = await fetch(`/api/activity/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      res = await fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    if (res.ok) {
      mutate("/api/activity");
      onOpenChange(false);
      onSaved?.();
    } else {
      alert("保存に失敗しました");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "活動データを編集" : "活動データを追加"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>日付</Label>
            <Input type="date" {...register("date")} />
            {errors.date && <div className="text-red-500 text-sm">{errors.date.message}</div>}
          </div>
          <div>
            <Label>説明</Label>
            <Input {...register("description")} />
          </div>
          <div>
            <Label>活動量</Label>
            <Input type="number" step="any" {...register("amount")} />
            {errors.amount && <div className="text-red-500 text-sm">{errors.amount.message}</div>}
          </div>
          <div>
            <Label>排出係数</Label>
            <Select
              value={factors && factors.length > 0 ? undefined : ""}
              defaultValue={data?.emissionFactorId ? String(data.emissionFactorId) : ""}
              {...register("emissionFactorId")}
              onValueChange={val => setValue("emissionFactorId", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                {factors?.map((f: any) => (
                  <SelectItem key={f.id} value={String(f.id)}>
                    {f.name}（{f.unit} / {f.factor}）
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.emissionFactorId && <div className="text-red-500 text-sm">{errors.emissionFactorId.message}</div>}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              キャンセル
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isEdit ? "更新" : "追加"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 