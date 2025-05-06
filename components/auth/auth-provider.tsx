"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  name: string
  role: "inputer" | "reviewer" | "admin"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // ページロード時にCookieからユーザー情報を取得
    const checkAuth = async () => {
      try {
        // 実際の実装ではAPIエンドポイントからユーザー情報を取得
        const storedUser = localStorage.getItem("esg_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("認証チェックエラー:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // 実際の実装ではAPIエンドポイントでの認証
      // ここではモックデータを使用
      if (email === "admin@example.com" && password === "password") {
        const userData: User = {
          id: "1",
          name: "管理者",
          role: "admin",
        }
        setUser(userData)
        localStorage.setItem("esg_user", JSON.stringify(userData))
        toast({
          title: "ログイン成功",
          description: "ESGレポーティングシステムへようこそ",
        })
        router.push("/dashboard")
      } else if (email === "reviewer@example.com" && password === "password") {
        const userData: User = {
          id: "2",
          name: "レビュアー",
          role: "reviewer",
        }
        setUser(userData)
        localStorage.setItem("esg_user", JSON.stringify(userData))
        toast({
          title: "ログイン成功",
          description: "ESGレポーティングシステムへようこそ",
        })
        router.push("/dashboard")
      } else if (email === "inputer@example.com" && password === "password") {
        const userData: User = {
          id: "3",
          name: "入力者",
          role: "inputer",
        }
        setUser(userData)
        localStorage.setItem("esg_user", JSON.stringify(userData))
        toast({
          title: "ログイン成功",
          description: "ESGレポーティングシステムへようこそ",
        })
        router.push("/dashboard")
      } else {
        toast({
          variant: "destructive",
          title: "ログイン失敗",
          description: "メールアドレスまたはパスワードが正しくありません",
        })
      }
    } catch (error) {
      console.error("ログインエラー:", error)
      toast({
        variant: "destructive",
        title: "ログインエラー",
        description: "ログイン処理中にエラーが発生しました",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("esg_user")
    router.push("/login")
    toast({
      title: "ログアウト完了",
      description: "正常にログアウトしました",
    })
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
