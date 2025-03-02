"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, type User } from "firebase/auth"
import { useRouter, usePathname } from "next/navigation"
import LoadingScreen from "@/components/loading-screen"

type AuthContextType = {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)

      // Handle redirects based on auth state
      if (!user) {
        // If not logged in and trying to access protected routes
        if (pathname !== "/login" && pathname !== "/signup" && !pathname.startsWith("/_next")) {
          router.push("/login")
        }
      } else {
        // If logged in and trying to access auth pages
        if (pathname === "/login" || pathname === "/signup") {
          router.push("/")
        }
      }
    })

    return () => unsubscribe()
  }, [pathname, router])

  if (loading) {
    return <LoadingScreen />
  }

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

