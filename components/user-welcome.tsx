"use client"

import { useAuth } from "@/components/auth-provider"

export default function UserWelcome() {
  const { user } = useAuth()

  return (
    <section className="user-welcome">
      <h2 className="text-2xl font-bold mb-2">Welcome, {user?.displayName || user?.email?.split("@")[0] || "User"}!</h2>
      <p>Your tasks and schedule are synced across all your devices.</p>
    </section>
  )
}