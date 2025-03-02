"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { loadSchedule, saveSchedule, type ScheduleRow } from "@/lib/auth"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { v4 as uuidv4 } from "uuid"

export default function Schedule() {
  const { user } = useAuth()
  const [schedule, setSchedule] = useState<ScheduleRow[]>([])
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSchedule() {
      if (!user) return

      try {
        const scheduleData = await loadSchedule(user)

        if (scheduleData.length === 0) {
          // Add a default empty row if no data exists
          setSchedule([
            {
              id: uuidv4(),
              time: "Time - Time",
              monday: "Subject",
              tuesday: "Subject",
              wednesday: "Subject",
              thursday: "Subject",
              friday: "Subject",
            },
          ])
        } else {
          setSchedule(scheduleData)
        }
      } catch (error) {
        console.error("Error loading schedule:", error)
        // Add a default empty row if loading fails
        setSchedule([
          {
            id: uuidv4(),
            time: "Time - Time",
            monday: "Subject",
            tuesday: "Subject",
            wednesday: "Subject",
            thursday: "Subject",
            friday: "Subject",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchSchedule()
  }, [user])

  const addRow = () => {
    setSchedule([
      ...schedule,
      {
        id: uuidv4(),
        time: "Time - Time",
        monday: "Subject",
        tuesday: "Subject",
        wednesday: "Subject",
        thursday: "Subject",
        friday: "Subject",
      },
    ])
  }

  const deleteRow = (id: string) => {
    const newSchedule = schedule.filter((row) => row.id !== id)
    setSchedule(newSchedule)
  }

  const updateCell = (id: string, field: keyof ScheduleRow, value: string) => {
    const newSchedule = schedule.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value }
      }
      return row
    })
    setSchedule(newSchedule)
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleSaveSchedule = async () => {
    if (!user) return

    try {
      await saveSchedule(user, schedule)
      setEditMode(false)
      alert("Schedule saved successfully!")
    } catch (error) {
      console.error("Error saving schedule:", error)
      alert("Error saving schedule. Please try again.")
    }
  }

  return (
    <>
      <Navbar />

      <div className="schedule-container max-w-6xl mx-auto mt-32 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Schedule</h2>

        {loading ? (
          <div className="text-center py-8">Loading schedule...</div>
        ) : (
          <>
            <div className="overflow-x-auto bg-card p-6 rounded-lg shadow-md">
              <table className="schedule-table w-full">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    {editMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => (
                    <tr key={row.id}>
                      {Object.keys(row).map((key) => {
                        if (key === "id") return null
                        return (
                          <td
                            key={`${row.id}-${key}`}
                            contentEditable={editMode}
                            suppressContentEditableWarning={true}
                            onBlur={(e) =>
                              updateCell(row.id, key as keyof ScheduleRow, e.currentTarget.textContent || "")
                            }
                          >
                            {row[key as keyof ScheduleRow]}
                          </td>
                        )
                      })}
                      {editMode && (
                        <td>
                          <button
                            onClick={() => deleteRow(row.id)}
                            className="bg-destructive text-white px-3 py-1 rounded-md"
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-6">
              {editMode && (
                <button onClick={addRow} className="bg-primary hover:bg-[#774936] text-white px-5 py-2 rounded-md">
                  Add Row
                </button>
              )}

              <button
                onClick={toggleEditMode}
                className="bg-primary hover:bg-[#774936] text-white px-5 py-2 rounded-md"
              >
                {editMode ? "Cancel Edit" : "Edit Schedule"}
              </button>

              {editMode && (
                <button
                  onClick={handleSaveSchedule}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
                >
                  Save Schedule
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  )
}

