"use client"

import {
  Briefcase,
  Send,
  MessageSquare,
  Trophy,
  XCircle,
} from "lucide-react"
import type { Application } from "@/lib/types"

interface StatCardsProps {
  applications: Application[]
}

/** Dashboard summary cards showing application statistics */
export function StatCards({ applications }: StatCardsProps) {
  const total = applications.length
  const applied = applications.filter((a) => a.status === "Applied").length
  const interview = applications.filter((a) => a.status === "Interview").length
  const offer = applications.filter((a) => a.status === "Offer").length
  const rejected = applications.filter((a) => a.status === "Rejected").length

  const stats = [
    {
      label: "Total Applications",
      value: total,
      icon: Briefcase,
      color: "bg-primary/10 text-primary",
      borderColor: "border-primary/20",
    },
    {
      label: "Applied",
      value: applied,
      icon: Send,
      color: "bg-status-applied/10 text-status-applied",
      borderColor: "border-status-applied/20",
    },
    {
      label: "Interview",
      value: interview,
      icon: MessageSquare,
      color: "bg-status-interview/10 text-status-interview",
      borderColor: "border-status-interview/20",
    },
    {
      label: "Offer",
      value: offer,
      icon: Trophy,
      color: "bg-status-offer/10 text-status-offer",
      borderColor: "border-status-offer/20",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: XCircle,
      color: "bg-status-rejected/10 text-status-rejected",
      borderColor: "border-status-rejected/20",
    },
  ]

  return (
    <section aria-label="Application statistics">
      <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl border ${stat.borderColor} bg-card p-4 shadow-sm transition-shadow hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.color}`}
              >
                <stat.icon className="h-4 w-4" />
              </div>
              <span className="font-heading text-2xl font-bold text-card-foreground">
                {stat.value}
              </span>
            </div>
            <p className="mt-2 text-xs font-medium text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
