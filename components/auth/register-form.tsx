"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    school: "",
    schoolType: "",
    position: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("パスワードが一致しません")
      return
    }

    setIsLoading(true)

    try {
      // Mock registration - in real implementation, this would call an API
      await register(formData)
      router.push("/")
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">氏名</Label>
        <Input
          id="name"
          placeholder="山田 太郎"
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input
          id="email"
          type="email"
          placeholder="teacher@example.com"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="school">学校名</Label>
        <Input
          id="school"
          placeholder="千葉市立○○小学校"
          value={formData.school}
          onChange={(e) => updateFormData("school", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="schoolType">学校種別</Label>
        <Select value={formData.schoolType} onValueChange={(value) => updateFormData("schoolType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="学校種別を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="elementary">小学校</SelectItem>
            <SelectItem value="junior-high">中学校</SelectItem>
            <SelectItem value="high-school">高等学校</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="position">職位</Label>
        <Input
          id="position"
          placeholder="教諭、主任教諭、教頭など"
          value={formData.position}
          onChange={(e) => updateFormData("position", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">パスワード</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => updateFormData("password", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">パスワード確認</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => updateFormData("confirmPassword", e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "登録中..." : "登録"}
      </Button>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">既にアカウントをお持ちの方は </span>
        <Link href="/auth/login" className="text-primary hover:underline">
          ログイン
        </Link>
      </div>
    </form>
  )
}
