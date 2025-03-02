"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { loadSchedule, type ScheduleRow } from "@/lib/auth"

export default function HomeSchedule() {
  const { user } = useAuth()
  const [schedule, setSchedule] = useState<ScheduleRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSchedule() {
      if (!user) return

      try {
        const scheduleData = await loadSchedule(user)
        setSchedule(scheduleData)
      } catch (error) {
        console.error("Error loading schedule:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSchedule()
  }, [user])

  if (loading) {
    return <div className="py-4">Loading schedule...</div>
  }

  if (schedule.length === 0) {
    return <div className="py-4">No schedule available.</div>
  }

  // Headers for the schedule table
  const headers = ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  // Show only the first 3 rows of the schedule
  const rowsToShow = schedule.slice(0, 3)

  return (
    <div className="overflow-x-auto">
      <table className="schedule-table w-full">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowsToShow.map((row) => (
            <tr key={row.id}>
              <td>{row.time}</td>
              <td>{row.monday}</td>
              <td>{row.tuesday}</td>
              <td>{row.wednesday}</td>
              <td>{row.thursday}</td>
              <td>{row.friday}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

