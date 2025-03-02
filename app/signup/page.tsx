"use client"

import type React from "react"

import { useState } from "react"
import { registerUser } from "@/lib/auth"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      await registerUser(name, email, password)
      // Redirect is handled by the auth provider
    } catch (error: any) {
      setError(error.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <main className="auth-container max-w-md mx-auto mt-32 p-8 bg-card rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Create an Account</h2>
        <p className="mb-6 text-muted-foreground">Sign up to save your schedule and access it from any device.</p>

        <form onSubmit={handleSignup} className="auth-form space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              className="w-full p-3 border border-input rounded-md"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-3 border border-input rounded-md"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min. 6 characters)"
              required
              minLength={6}
              className="w-full p-3 border border-input rounded-md"
            />
          </div>
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              minLength={6}
              className="w-full p-3 border border-input rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn bg-primary hover:bg-[#774936] text-white p-3 rounded-md"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-links mt-6 text-sm">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>

        {error && <div className="error-message mt-4 text-destructive">{error}</div>}
      </main>

      <Footer />
    </>
  )
}

