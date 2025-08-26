import { TeacherProfileCard } from "@/components/teacher-profile-card"
import { Header } from "@/components/header"
import { SearchFilterProvider } from "@/hooks/use-search-filter"

export default function TeachersPage() {
  const teachers = [
    {
      id: "1",
      name: "田中 花子",
      school: "千葉市立○○中学校",
      schoolType: "中学校",
      position: "教諭",
      postsCount: 12,
      followersCount: 45,
      isFollowing: false,
    },
    {
      id: "2",
      name: "佐藤 太郎",
      school: "船橋市立△△小学校",
      schoolType: "小学校",
      position: "主任教諭",
      postsCount: 8,
      followersCount: 32,
      isFollowing: true,
    },
    {
      id: "3",
      name: "山田 次郎",
      school: "県立□□高等学校",
      schoolType: "高等学校",
      position: "教諭",
      postsCount: 15,
      followersCount: 67,
      isFollowing: false,
    },
  ]

  return (
    <SearchFilterProvider>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">教員一覧</h1>
            <p className="text-muted-foreground text-lg">千葉県内の教員の皆様とつながりましょう</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <TeacherProfileCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </main>
      </div>
    </SearchFilterProvider>
  )
}
