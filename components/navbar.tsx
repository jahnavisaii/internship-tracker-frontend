"use client"

import Image from "next/image"
import { Bell, User, Search } from "lucide-react"

/**
 * Top navigation bar with university logo, project title, and user profile.
 * Spans the full width above the main content area.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card px-4 shadow-sm sm:px-6">
      {/* Left: Logo and Title */}
      <div className="flex items-center gap-3">
        <Image
          src="/images/vitap-logo.png"
          alt="VIT-AP University Logo"
          width={140}
          height={42}
          className="h-8 w-auto sm:h-9"
          priority
        />
        <div className="hidden h-8 w-px bg-border sm:block" />
        <div className="hidden sm:block">
          <h1 className="font-heading text-base font-bold tracking-tight text-foreground">
            Smart Internship Tracker
          </h1>
          <p className="text-[11px] leading-tight text-muted-foreground">
            Application Management Dashboard
          </p>
        </div>
      </div>

      {/* Right: Profile Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notification Bell */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-status-applied ring-2 ring-card" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 rounded-lg bg-secondary px-2.5 py-1.5 sm:px-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-3.5 w-3.5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-foreground leading-tight">Student</p>
            <p className="text-[10px] text-muted-foreground leading-tight">VIT-AP</p>
          </div>
        </div>
      </div>
    </header>
  )
}
