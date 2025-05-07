"use client"

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { NAV_ITEMS } from "@/components/nav-items"
import * as Icons from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({})

  // サブメニューを開くべきか判定
  const isMenuOpen = (item: any) => {
    if (openMenus[item.label] !== undefined) return openMenus[item.label]
    if (item.children) {
      return item.children.some((child: any) => child.href && pathname.startsWith(child.href))
    }
    return false
  }

  const handleToggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <Icons.BarChart3 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">ESGレポート</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const Icon = Icons[item.icon as keyof typeof Icons] || Icons.Circle
                const isActive = Boolean(item.href && pathname.startsWith(item.href))
                const hasChildren = !!item.children
                const open = isMenuOpen(item)

                if (hasChildren) {
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        isActive={isActive || open}
                        tooltip={item.label}
                        onClick={() => handleToggleMenu(item.label)}
                        className="flex justify-between items-center w-full"
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </span>
                        <span className={`transition-transform ${open ? "rotate-90" : ""}`}>▶</span>
                      </SidebarMenuButton>
                      {open && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.children.map((child: any) => {
                            const ChildIcon = Icons[child.icon as keyof typeof Icons] || Icons.Circle
                            const isChildActive = Boolean(child.href && pathname.startsWith(child.href))
                            return (
                              <SidebarMenuButton
                                key={child.label}
                                asChild
                                isActive={isChildActive}
                                tooltip={child.label}
                              >
                                <Link href={child.href || "#"}>
                                  <ChildIcon className="h-4 w-4" />
                                  <span>{child.label}</span>
                                </Link>
                              </SidebarMenuButton>
                            )
                          })}
                        </div>
                      )}
                    </SidebarMenuItem>
                  )
                }

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <Link href={item.href || "#"}>
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  )
}
