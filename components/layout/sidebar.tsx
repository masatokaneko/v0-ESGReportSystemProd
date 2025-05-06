"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/components/auth/auth-provider"
import {
  BarChart3,
  Settings,
  ClipboardCheck,
  Search,
  FileUp,
  PlusCircle,
  LogOut,
  Menu,
  X,
  Home,
  FileOutput,
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  const routes = [
    {
      label: "ダッシュボード",
      icon: Home,
      href: "/dashboard",
      roles: ["inputer", "reviewer", "admin"],
    },
    {
      label: "データ登録",
      icon: PlusCircle,
      href: "/data/new",
      roles: ["inputer", "reviewer", "admin"],
    },
    {
      label: "承認管理",
      icon: ClipboardCheck,
      href: "/data/approvals",
      roles: ["reviewer", "admin"],
    },
    {
      label: "データ検索",
      icon: Search,
      href: "/data/search",
      roles: ["inputer", "reviewer", "admin"],
    },
    {
      label: "レポート",
      icon: FileOutput,
      href: "/reports",
      roles: ["reviewer", "admin"],
    },
    {
      label: "CSVアップロード",
      icon: FileUp,
      href: "/upload/csv",
      roles: ["inputer", "reviewer", "admin"],
    },
    {
      label: "設定",
      icon: Settings,
      href: "/settings",
      roles: ["admin"],
    },
  ]

  return (
    <>
      <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-50" onClick={toggleSidebar}>
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      <div
        className={cn("fixed inset-0 z-40 bg-black/50 md:hidden", isOpen ? "block" : "hidden")}
        onClick={closeSidebar}
      />

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-lg transform transition-transform duration-200 ease-in-out md:translate-x-0 dark:bg-gray-900",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-6 border-b">
            <Link href="/dashboard" className="flex items-center" onClick={closeSidebar}>
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">ESGレポート</span>
            </Link>
          </div>

          <ScrollArea className="flex-1 py-4">
            <nav className="px-4 space-y-2">
              {routes.map((route) => {
                if (!user || !route.roles.includes(user.role)) return null

                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={closeSidebar}
                    className={cn(
                      "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                      pathname === route.href
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-secondary hover:text-primary dark:text-gray-300 dark:hover:bg-gray-800",
                    )}
                  >
                    <route.icon className="h-5 w-5 mr-2" />
                    {route.label}
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                {user?.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">
                  {user?.role === "admin" && "管理者"}
                  {user?.role === "reviewer" && "レビュアー"}
                  {user?.role === "inputer" && "入力者"}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => {
                closeSidebar()
                logout()
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              ログアウト
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
