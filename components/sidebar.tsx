"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { Calendar, CheckSquare, Home, Menu, Star, User, Settings, LogOut } from "lucide-react"
import { logoutUser } from "@/lib/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Sidebar() {
  const [expanded, setExpanded] = useState(true)
  const pathname = usePathname()
  const { user } = useAuth()

  const menuItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/tasks", label: "My Tasks", icon: CheckSquare },
    { path: "/schedule", label: "Schedule", icon: Calendar },
    { path: "/important", label: "Important", icon: Star },
    { path: "/profile", label: "Profile", icon: User },
    { path: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <motion.div animate={{ width: expanded ? 240 : 70 }} className="h-screen bg-[#A79277] text-white relative">
      <button
        onClick={() => setExpanded(!expanded)}
        className="absolute right-[-12px] top-6 bg-[#A79277] rounded-full p-1.5 hover:bg-[#8a7660]"
      >
        <Menu size={20} />
      </button>

      <div className="flex flex-col h-full">
        <div className="p-4 mb-4">
          {expanded ? (
            <h1 className="text-2xl font-bold">Schedule App</h1>
          ) : (
            <h1 className="text-2xl font-bold text-center">S</h1>
          )}
        </div>

        <div className="flex-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-3 py-2 mb-2 rounded-lg transition-colors ${
                  pathname === item.path ? "bg-[#8a7660] text-white" : "hover:bg-[#8a7660] text-white/80"
                }`}
              >
                <Icon size={20} />
                {expanded && <span className="ml-3">{item.label}</span>}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-[#8a7660]">
          {expanded ? (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user?.photoURL || ""} />
                <AvatarFallback>{user?.displayName?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.displayName || "User"}</p>
                <p className="text-xs text-white/60 truncate">{user?.email || ""}</p>
              </div>
              <button onClick={logoutUser} className="p-1.5 hover:bg-[#8a7660] rounded-lg">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button onClick={logoutUser} className="w-full flex justify-center p-1.5 hover:bg-[#8a7660] rounded-lg">
              <LogOut size={20} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

