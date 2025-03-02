"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { loadTasks, type Task } from "@/lib/auth"

export default function HomeTasks() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTasks() {
      if (!user) return

      try {
        const tasksData = await loadTasks(user)

        // Sort tasks by deadline (earliest to latest)
        const sortedTasks = [...tasksData].sort(
          (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
        )

        setTasks(sortedTasks)
      } catch (error) {
        console.error("Error loading tasks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [user])

  if (loading) {
    return <div className="py-4">Loading tasks...</div>
  }

  if (tasks.length === 0) {
    return <div className="py-4">No tasks available.</div>
  }

  // Show only the first 5 tasks
  const tasksToShow = tasks.slice(0, 5)

  return (
    <ul className="space-y-3">
      {tasksToShow.map((task, index) => {
        const taskDeadline = new Date(task.deadline)
        const formattedDeadline = taskDeadline.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })

        // Calculate remaining days
        const today = new Date()
        const timeDiff = taskDeadline.getTime() - today.getTime()
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

        // Apply red highlight if the task is due in ≤ 3 days
        const isUrgent = daysLeft <= 3

        return (
          <li
            key={index}
            className={`p-4 rounded-md ${isUrgent ? "urgent-task bg-[#fc9fb1] text-white font-bold" : "bg-muted"}`}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="font-medium">{task.name}</div>
              <div className="text-sm">Due: {formattedDeadline}</div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

