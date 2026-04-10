"use client"
import { useState } from "react"
import { Trash2, Building2, Briefcase } from "lucide-react"
import type { Application } from "@/lib/types"

interface KanbanBoardProps {
  applications: Application[]
  onDelete: (id: string) => void
  onStatusChange: (id: string, newStatus: Application["status"]) => void
}

const COLUMNS: {
  status: Application["status"]
  label: string
  color: string
  bg: string
  border: string
}[] = [
  { status: "Applied",   label: "Applied",   color: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE" },
  { status: "Interview", label: "Interview", color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A" },
  { status: "Offer",     label: "Offer",     color: "#10B981", bg: "#F0FDF4", border: "#A7F3D0" },
  { status: "Rejected",  label: "Rejected",  color: "#EF4444", bg: "#FFF1F2", border: "#FECDD3" },
]

export function KanbanBoard({ applications, onDelete, onStatusChange }: KanbanBoardProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [dragOverCol, setDragOverCol] = useState<Application["status"] | null>(null)

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", id)
  }

  const handleDragOver = (e: React.DragEvent, status: Application["status"]) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = "move"
    setDragOverCol(status)
  }

  const handleDrop = (e: React.DragEvent, status: Application["status"]) => {
    e.preventDefault()
    e.stopPropagation()
    const id = e.dataTransfer.getData("text/plain") || draggedId
    if (id && id !== "") {
      onStatusChange(id, status)
    }
    setDraggedId(null)
    setDragOverCol(null)
  }

  const handleDragEnd = () => {
    setDraggedId(null)
    setDragOverCol(null)
  }

  return (
    <section>
      {/* Header */}
      <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--foreground)" }}>
          Kanban Board
        </h2>
        <span style={{
          fontSize: "12px", color: "#64748B",
          background: "#F1F5F9", padding: "4px 10px",
          borderRadius: "999px"
        }}>
          Drag cards to update status
        </span>
      </div>

      {/* Columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
      }}>
        {COLUMNS.map((col) => {
          const colApps = applications.filter((a) => a.status === col.status)
          const isOver = dragOverCol === col.status

          return (
            <div
              key={col.status}
              onDragOver={(e) => handleDragOver(e, col.status)}
              onDragEnter={(e) => { e.preventDefault(); setDragOverCol(col.status) }}
              onDragLeave={(e) => {
                e.preventDefault()
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setDragOverCol(null)
                }
              }}
              onDrop={(e) => handleDrop(e, col.status)}
              style={{
                background: isOver ? col.bg : "#F8FAFC",
                border: `2px dashed ${isOver ? col.color : "#E2E8F0"}`,
                borderRadius: "14px",
                padding: "14px",
                minHeight: "400px",
                transition: "background 0.15s, border-color 0.15s",
              }}
            >
              {/* Column header */}
              <div style={{ marginBottom: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: col.color }} />
                  <span style={{ fontSize: "13px", fontWeight: 700 }}>{col.label}</span>
                </div>
                <span style={{
                  fontSize: "12px", fontWeight: 600,
                  background: col.bg, color: col.color,
                  border: `1px solid ${col.border}`,
                  borderRadius: "999px", padding: "2px 8px",
                }}>
                  {colApps.length}
                </span>
              </div>

              {/* Empty state */}
              {colApps.length === 0 ? (
                <div style={{
                  textAlign: "center", padding: "32px 16px",
                  color: "#CBD5E1", fontSize: "12px",
                  border: "2px dashed #E2E8F0", borderRadius: "8px",
                }}>
                  <div style={{ fontSize: "24px", marginBottom: "6px" }}>📭</div>
                  Drop here
                </div>
              ) : (
                colApps.map((app) => (
                  <div
                    key={app.id}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, app.id)}
                    onDragEnd={handleDragEnd}
                    style={{
                      background: "white",
                      border: draggedId === app.id ? `2px solid ${col.color}` : "1px solid #E2E8F0",
                      borderRadius: "10px",
                      padding: "12px",
                      marginBottom: "10px",
                      cursor: "grab",
                      opacity: draggedId === app.id ? 0.5 : 1,
                      transition: "opacity 0.15s, border 0.15s",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                          <Building2 size={12} color="#64748B" />
                          <span style={{
                            fontSize: "13px", fontWeight: 600,
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                          }}>
                            {app.company}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                          <Briefcase size={12} color="#94A3B8" />
                          <span style={{
                            fontSize: "12px", color: "#64748B",
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                          }}>
                            {app.role}
                          </span>
                        </div>
                        {app.location && (
                          <div style={{ fontSize: "11px", color: "#94A3B8", marginBottom: "4px" }}>
                            📍 {app.location}
                          </div>
                        )}
                        {app.stipend && (
                          <div style={{ fontSize: "11px", color: "#10B981", fontWeight: 500 }}>
                            💰 {app.stipend}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => onDelete(app.id)}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          padding: "4px", borderRadius: "6px", color: "#EF4444",
                        }}
                        aria-label={`Delete ${app.company}`}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div style={{
                      fontSize: "11px", color: "#94A3B8",
                      marginTop: "6px", borderTop: "1px solid #F1F5F9", paddingTop: "6px"
                    }}>
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric"
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile stacked */}
      <style>{`
        @media (max-width: 768px) {
          .kanban-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}