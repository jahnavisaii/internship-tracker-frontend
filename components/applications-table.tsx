"use client"

import { Trash2, Inbox } from "lucide-react"
import type { Application } from "@/lib/types"

interface ApplicationsTableProps {
  applications: Application[]
  onDelete: (id: string) => void
}

/** Get the appropriate badge styling based on application status */
function getStatusBadge(status: Application["status"]) {
  const styles: Record<Application["status"], string> = {
    Applied: "bg-status-applied/10 text-status-applied border-status-applied/30",
    Interview:
      "bg-status-interview/10 text-status-interview border-status-interview/30",
    Offer: "bg-status-offer/10 text-status-offer border-status-offer/30",
    Rejected:
      "bg-status-rejected/10 text-status-rejected border-status-rejected/30",
  }
  return styles[status]
}

/** Table displaying all tracked internship applications */
export function ApplicationsTable({
  applications,
  onDelete,
}: ApplicationsTableProps) {
  return (
    <section aria-label="Applications list">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold text-foreground">
          Your Applications
        </h2>
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          {applications.length}{" "}
          {applications.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {applications.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center px-6 py-16">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Inbox className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="mb-1 font-heading text-base font-semibold text-card-foreground">
              No applications yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Start tracking your internship applications by adding one above.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Company
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Role
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Date Added
                    </th>
                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {applications.map((app) => (
                    <tr
                      key={app.id}
                      className="transition-colors hover:bg-muted/30"
                    >
                      <td className="px-5 py-3.5 text-sm font-medium text-card-foreground">
                        {app.company}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">
                        {app.role}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(app.status)}`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">
                        {new Date(app.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => onDelete(app.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                          aria-label={`Delete application for ${app.company}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="divide-y divide-border md:hidden">
              {applications.map((app) => (
                <div key={app.id} className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-card-foreground">
                        {app.company}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {app.role}
                      </p>
                    </div>
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(app.status)}`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <button
                      onClick={() => onDelete(app.id)}
                      className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                      aria-label={`Delete application for ${app.company}`}
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
