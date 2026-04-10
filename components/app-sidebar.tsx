"use client"

import { useState } from "react"
import Image from "next/image"
import {
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react"

/** Navigation tabs for the application */
export type NavTab = "dashboard" | "add" | "analytics" | "settings"

interface AppSidebarProps {
  activeTab: NavTab
  onTabChange: (tab: NavTab) => void
}

const NAV_ITEMS: { id: NavTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "add", label: "Add Application", icon: PlusCircle },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
]

/**
 * Dark navy sidebar with navigation links.
 * Collapsible on desktop, sheet-style on mobile.
 */
export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col ${collapsed ? "w-[72px]" : "w-[260px]"} shrink-0 border-r transition-all duration-300 ease-in-out`}
        style={{
          backgroundColor: "hsl(var(--sidebar-background))",
          borderColor: "hsl(var(--sidebar-border))",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 border-b px-4 py-5" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "hsl(var(--sidebar-accent))" }}>
            <GraduationCap className="h-5 w-5" style={{ color: "hsl(var(--sidebar-primary))" }} />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="truncate text-sm font-bold" style={{ color: "hsl(var(--sidebar-accent-foreground))" }}>
                Smart Internship
              </p>
              <p className="truncate text-xs" style={{ color: "hsl(var(--sidebar-foreground))" }}>
                Tracker
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? ""
                    : "hover:bg-[hsl(var(--sidebar-accent))]"
                } ${collapsed ? "justify-center" : ""}`}
                style={
                  isActive
                    ? {
                        backgroundColor: "hsl(var(--sidebar-accent))",
                        color: "hsl(var(--sidebar-primary))",
                      }
                    : {
                        color: "hsl(var(--sidebar-foreground))",
                      }
                }
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* VIT-AP Logo at bottom */}
        <div className="border-t px-4 py-4" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
          {!collapsed && (
            <div className="mb-3 flex items-center gap-2">
              <Image
                src="/images/vitap-logo.png"
                alt="VIT-AP University Logo"
                width={120}
                height={36}
                className="h-7 w-auto brightness-0 invert opacity-60"
              />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:bg-[hsl(var(--sidebar-accent))]"
            style={{ color: "hsl(var(--sidebar-foreground))" }}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t bg-card px-2 py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] lg:hidden">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
              <span>{item.label.split(" ")[0]}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
