import type React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ProtectedRoute } from "@/components/auth/protected-route"

type DashboardLayoutProps = {
  children: React.ReactNode
  allowedRoles?: Array<"inputer" | "reviewer" | "admin">
}

export function DashboardLayout({ children, allowedRoles }: DashboardLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 md:ml-72">
          <Header />
          <main className="p-4 md:p-6 bg-secondary-gray min-h-[calc(100vh-4rem)]">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
