"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { logoutUser } from "@/lib/auth"
import { useState } from "react"

export default function Navbar() {
  const { user } = useAuth()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="bg-primary fixed w-full top-0 left-0 z-50 shadow-md">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-5 py-5">
        <div className="logo">Schedule App</div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={toggleMenu} aria-label="Toggle menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>

        <ul
          className={`nav-links md:flex ${menuOpen ? "flex flex-col absolute top-16 left-0 w-full bg-primary p-5" : "hidden"} md:static md:flex-row md:w-auto`}
        >
          {user ? (
            <>
              <li>
                <Link href="/" className={pathname === "/" ? "text-[#fc9fb1]" : ""} onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule"
                  className={pathname === "/schedule" ? "text-[#fc9fb1]" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/tasks"
                  className={pathname === "/tasks" ? "text-[#fc9fb1]" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  Tasks
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={pathname === "/about" ? "text-[#fc9fb1]" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={pathname === "/contact" ? "text-[#fc9fb1]" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn bg-primary hover:bg-[#774936] text-white px-4 py-2 rounded-md"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className={pathname === "/login" ? "text-[#fc9fb1]" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className={pathname === "/signup" ? "text-[#fc9fb1]" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

