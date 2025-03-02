export type TaskPriority = "urgent" | "important" | "optional" | "normal"

export interface Task {
  id: string
  name: string
  description?: string
  deadline: string
  completed: boolean
  priority: TaskPriority
  category?: string
  createdAt: Date
  updatedAt: Date
}

export interface TaskCategory {
  id: string
  name: string
  color: string
  description?: string
}

