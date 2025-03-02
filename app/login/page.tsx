"use client"

import type React from "react"

import { useState } from "react"
import { loginUser, resetPassword } from "@/lib/auth"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)

    try {
      await loginUser(email, password)
      // Redirect is handled by the auth provider
    } catch (error: any) {
      setError(error.message || "Failed to login")
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (!email) {
      setError("Please enter your email address")
      return
    }

    setError("")
    setMessage("")
    setLoading(true)

    try {
      await resetPassword(email)
      setMessage("Password reset email sent. Please check your inbox.")
    } catch (error: any) {
      setError(error.message || "Failed to send reset email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <main className="auth-container max-w-md mx-auto mt-32 p-8 bg-card rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Login to Your Account</h2>
        <p className="mb-6 text-muted-foreground">
          Welcome back! Please enter your credentials to access your schedule.
        </p>

        <form onSubmit={handleLogin} className="auth-form space-y-4">
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
              placeholder="Password"
              required
              className="w-full p-3 border border-input rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn bg-primary hover:bg-[#774936] text-white p-3 rounded-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-links mt-6 text-sm">
          <p className="mb-2">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
          <p>
            <button onClick={handleForgotPassword} className="text-primary hover:underline">
              Forgot password?
            </button>
          </p>
        </div>

        {error && <div className="error-message mt-4 text-destructive">{error}</div>}
        {message && <div className="success-message mt-4 text-green-600">{message}</div>}
      </main>

      <Footer />
    </>
  )
}

