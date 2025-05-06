"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "./auth-provider"
import { Loader2 } from "lucide-react"

type ProtectedRouteProps = {
  children: React.ReactNode
  allowedRoles?: Array<"inputer" | "reviewer" | "admin">
}

export function ProtectedRoute({ children, allowedRoles = ["inputer", "reviewer", "admin"] }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
    } else if (!isLoading && user && !allowedRoles.includes(user.role)) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router, pathname, allowedRoles])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">読み込み中...</span>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">アクセス権限がありません</h1>
        <p className="text-muted-foreground">このページを表示するための権限がありません。</p>
      </div>
    )
  }

  return <>{children}</>
}
