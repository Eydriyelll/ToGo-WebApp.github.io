"use client"

import { useState } from "react"
import type { Task, TaskPriority } from "@/types/task"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { Edit2, Trash2, Clock, AlertCircle } from "lucide-react"

interface TaskItemProps {
  task: Task
  onComplete: (id: string, completed: boolean) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onComplete, onEdit, onDelete }: TaskItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const priorityColors: Record<TaskPriority, string> = {
    urgent: "bg-red-500",
    important: "bg-orange-500",
    optional: "bg-blue-500",
    normal: "bg-gray-500",
  }

  const priorityIcons: Record<TaskPriority, JSX.Element> = {
    urgent: <AlertCircle className="w-4 h-4 text-red-500" />,
    important: <AlertCircle className="w-4 h-4 text-orange-500" />,
    optional: <Clock className="w-4 h-4 text-blue-500" />,
    normal: <Clock className="w-4 h-4 text-gray-500" />,
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`task-item ${task.completed ? "task-completed" : `task-${task.priority}`}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => onComplete(task.id, e.target.checked)}
          className="task-checkbox"
        />

        <div className="task-content">
          <div className="flex items-center gap-2">
            <h3 className={`task-title ${task.completed ? "line-through text-muted-foreground" : ""}`}>{task.name}</h3>
            {priorityIcons[task.priority]}
          </div>

          {task.description && <p className="text-sm text-muted-foreground mt-1">{task.description}</p>}

          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {format(new Date(task.deadline), "PPP")}
            </span>

            <span className={`px-2 py-0.5 rounded-full text-xs ${priorityColors[task.priority]} text-white`}>
              {task.priority}
            </span>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} className="task-actions">
        <button onClick={() => onEdit(task)} className="btn-secondary" title="Edit task">
          <Edit2 className="w-4 h-4" />
        </button>

        <button onClick={() => onDelete(task.id)} className="btn-destructive" title="Delete task">
          <Trash2 className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  )
}

