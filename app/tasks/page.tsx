"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { loadTasks, saveTasks, type Task } from "@/lib/auth"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Tasks() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskName, setTaskName] = useState("")
  const [taskDeadline, setTaskDeadline] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editTaskIndex, setEditTaskIndex] = useState(-1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTasks() {
      if (!user) return

      try {
        const tasksData = await loadTasks(user)
        setTasks(tasksData)
      } catch (error) {
        console.error("Error loading tasks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [user])

  const addOrUpdateTask = async () => {
    if (!user) return
    if (!taskName || !taskDeadline) {
      alert("Please enter both a task name and a deadline.")
      return
    }

    try {
      const newTasks = [...tasks]

      if (isEditing) {
        // Update existing task
        newTasks[editTaskIndex] = {
          name: taskName,
          deadline: taskDeadline,
          completed: newTasks[editTaskIndex].completed,
        }
        setIsEditing(false)
        setEditTaskIndex(-1)
      } else {
        // Add new task
        newTasks.push({
          name: taskName,
          deadline: taskDeadline,
          completed: false,
        })
      }

      await saveTasks(user, newTasks)
      setTasks(newTasks)
      setTaskName("")
      setTaskDeadline("")
    } catch (error) {
      console.error("Error adding/updating task:", error)
    }
  }

  const editTask = (index: number) => {
    const task = tasks[index]
    setTaskName(task.name)
    setTaskDeadline(task.deadline)
    setIsEditing(true)
    setEditTaskIndex(index)
  }

  const deleteTask = async (index: number) => {
    if (!user) return

    try {
      const newTasks = [...tasks]
      newTasks.splice(index, 1)
      await saveTasks(user, newTasks)
      setTasks(newTasks)
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const markTask = async (index: number, completed: boolean) => {
    if (!user) return

    try {
      const newTasks = [...tasks]
      newTasks[index].completed = completed
      await saveTasks(user, newTasks)
      setTasks(newTasks)
    } catch (error) {
      console.error("Error marking task:", error)
    }
  }

  // Filter tasks into pending and completed
  const pendingTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)

  // Sort tasks by deadline (earliest first)
  pendingTasks.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
  completedTasks.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())

  return (
    <>
      <Navbar />

      <div className="tasks-container max-w-4xl mx-auto mt-32 p-8 bg-card rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Tasks</h2>

        <div className="task-input flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task"
            className="flex-grow p-3 border border-input rounded-md"
          />
          <input
            type="date"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
            className="md:w-40 p-3 border border-input rounded-md"
          />
          <button
            onClick={addOrUpdateTask}
            className="bg-primary hover:bg-[#774936] text-white px-5 py-3 rounded-md whitespace-nowrap"
          >
            {isEditing ? "Save Changes" : "Add Task"}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-4">Loading tasks...</div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4">Pending Tasks</h3>
            {pendingTasks.length === 0 ? (
              <p className="text-center py-4">No pending tasks.</p>
            ) : (
              <ul className="space-y-3 mb-8">
                {pendingTasks.map((task, index) => {
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
                    <li key={index} className={`p-4 rounded-md ${isUrgent ? "urgent-task" : "bg-muted"}`}>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={(e) => markTask(pendingTasks.indexOf(task), e.target.checked)}
                            className="w-5 h-5"
                          />
                          <div>
                            <div className="font-medium">{task.name}</div>
                            <div className="text-sm">Due: {formattedDeadline}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editTask(tasks.indexOf(task))}
                            className="bg-primary hover:bg-[#774936] text-white px-3 py-1 rounded-md"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTask(tasks.indexOf(task))}
                            className="bg-destructive hover:bg-red-700 text-white px-3 py-1 rounded-md"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}

            <h3 className="text-xl font-bold mb-4">Completed Tasks</h3>
            {completedTasks.length === 0 ? (
              <p className="text-center py-4">No completed tasks.</p>
            ) : (
              <ul className="space-y-3">
                {completedTasks.map((task, index) => {
                  const taskDeadline = new Date(task.deadline)
                  const formattedDeadline = taskDeadline.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })

                  return (
                    <li key={index} className="p-4 rounded-md bg-[#8a5a44] text-white line-through">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={(e) => markTask(tasks.indexOf(task), e.target.checked)}
                            className="w-5 h-5"
                          />
                          <div>
                            <div className="font-medium">{task.name}</div>
                            <div className="text-sm">Due: {formattedDeadline}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteTask(tasks.indexOf(task))}
                          className="bg-destructive hover:bg-red-700 text-white px-3 py-1 rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </>
        )}
      </div>

      <Footer />
    </>
  )
}

