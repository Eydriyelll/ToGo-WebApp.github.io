"use client"

import type React from "react"

import { useState } from "react"
import type { Task, TaskPriority } from "@/types/task"
import { motion } from "framer-motion"
import { Calendar, AlertCircle } from "lucide-react"

interface TaskFormProps {
  initialTask?: Partial<Task>
  onSubmit: (task: Partial<Task>) => void
  onCancel: () => void
}

export function TaskForm({ initialTask, onSubmit, onCancel }: TaskFormProps) {
  const [task, setTask] = useState<Partial<Task>>({
    name: "",
    description: "",
    deadline: new Date().toISOString().split("T")[0],
    priority: "normal" as TaskPriority,
    ...initialTask,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(task)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-card rounded-lg shadow-lg"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Task Name
        </label>
        <input
          type="text"
          id="name"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          className="input-modern w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description (Optional)
        </label>
        <textarea
          id="description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="input-modern w-full h-24 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium mb-1">
            Deadline
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              id="deadline"
              value={task.deadline}
              onChange={(e) => setTask({ ...task, deadline: e.target.value })}
              className="input-modern w-full pl-10"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium mb-1">
            Priority
          </label>
          <div className="relative">
            <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              id="priority"
              value={task.priority}
              onChange={(e) => setTask({ ...task, priority: e.target.value as TaskPriority })}
              className="input-modern w-full pl-10"
              required
            >
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="important">Important</option>
              <option value="optional">Optional</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {initialTask ? "Update Task" : "Create Task"}
        </button>
      </div>
    </motion.form>
  )
}

