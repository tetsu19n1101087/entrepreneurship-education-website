import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - ページが見つかりません</h1>
      <p className="text-muted-foreground mb-8">お探しの事例は存在しないか、削除された可能性があります。</p>
      <Button asChild>
        <Link href="/">ホームに戻る</Link>
      </Button>
    </div>
  )
}
