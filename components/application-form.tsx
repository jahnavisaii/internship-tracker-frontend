"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { STATUS_OPTIONS, type Application, type StatusType } from "@/lib/types"

interface ApplicationFormProps {
  onAdd: (app: Application) => void
}

/** Form to add new internship applications */
export function ApplicationForm({ onAdd }: ApplicationFormProps) {
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [status, setStatus] = useState<StatusType>("Applied")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate inputs
    if (!company.trim() || !role.trim()) return

    // Create new application entry
    const newApp: Application = {
      id: crypto.randomUUID(),
      company: company.trim(),
      role: role.trim(),
      status,
      createdAt: new Date().toISOString(),
    }

    onAdd(newApp)

    // Reset form fields
    setCompany("")
    setRole("")
    setStatus("Applied")
  }

  return (
    <section aria-label="Add new application">
      <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
        Add New Application
      </h2>
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Company Name Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="company"
                className="block text-sm font-medium text-card-foreground"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g., Google"
                required
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Role Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-card-foreground"
              >
                Role
              </label>
              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Software Engineer Intern"
                required
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Status Dropdown */}
            <div className="space-y-1.5">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-card-foreground"
              >
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as StatusType)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
              >
                <PlusCircle className="h-4 w-4" />
                Add Application
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
