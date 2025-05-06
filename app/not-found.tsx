import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary-gray p-4">
      <div className="text-6xl font-bold text-primary mb-4">404</div>
      <h1 className="text-2xl font-bold mb-2">ページが見つかりません</h1>
      <p className="text-muted-foreground mb-6">お探しのページは存在しないか、移動した可能性があります。</p>
      <Button asChild>
        <Link href="/dashboard">ダッシュボードに戻る</Link>
      </Button>
    </div>
  )
}
