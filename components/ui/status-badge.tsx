import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatusType = "draft" | "pending" | "approved" | "rejected"

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    draft: {
      label: "下書き",
      variant: "outline" as const,
      className: "border-status-draft text-status-draft",
    },
    pending: {
      label: "承認待ち",
      variant: "outline" as const,
      className: "border-status-pending text-status-pending",
    },
    approved: {
      label: "承認済み",
      variant: "outline" as const,
      className: "border-status-approved text-status-approved",
    },
    rejected: {
      label: "差戻し",
      variant: "outline" as const,
      className: "border-status-rejected text-status-rejected",
    },
  }

  const config = statusConfig[status]

  return (
    <Badge variant={config.variant} className={cn(config.className, className)}>
      {config.label}
    </Badge>
  )
}
