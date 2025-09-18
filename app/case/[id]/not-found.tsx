import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, BookOpen } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          {/* Illustration */}
          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>

          {/* Error message */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">404</h1>
            <h2 className="text-xl font-semibold text-foreground">事例が見つかりませんでした</h2>
            <p className="text-muted-foreground">お探しの教育事例は存在しないか、移動された可能性があります。</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              ホームに戻る
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full bg-transparent">
            <Link href="/?search=">
              <Search className="w-4 h-4 mr-2" />
              事例を検索する
            </Link>
          </Button>
        </div>

        {/* Help text */}
        <p className="text-sm text-muted-foreground">問題が続く場合は、管理者にお問い合わせください。</p>
      </div>
    </div>
  )
}
