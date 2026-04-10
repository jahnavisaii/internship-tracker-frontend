export interface Application {
  id: string
  company: string
  role: string
  status: "Applied" | "Interview" | "Offer" | "Rejected"
  createdAt: string
  appliedDate?: string   // ← backend sends this
  location?: string      // ← backend sends this
  stipend?: string       // ← backend sends this
}

export const STATUS_OPTIONS = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
] as const

export type StatusType = (typeof STATUS_OPTIONS)[number]