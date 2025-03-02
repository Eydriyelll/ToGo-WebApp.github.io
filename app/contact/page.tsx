"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!name || !email || !message) {
      setError("Please fill in all fields")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    // In a real app, you would send this data to your backend
    console.log({ name, email, message })

    // Show success message
    setSubmitted(true)

    // Reset form
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <>
      <Navbar />

      <div className="contact-container max-w-4xl mx-auto mt-32 p-8 bg-card rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>

        {submitted ? (
          <div className="success-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
            <p>Thank you for your message! We'll get back to you soon.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 bg-primary hover:bg-[#774936] text-white px-4 py-2 rounded-md"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <>
            <p className="mb-6 text-center">Have questions or feedback? We'd love to hear from you!</p>

            {error && (
              <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-bold">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-input rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-bold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-input rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block mb-2 font-bold">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full p-3 border border-input rounded-md resize-none"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-primary hover:bg-[#774936] text-white p-3 rounded-md">
                Send Message
              </button>
            </form>
          </>
        )}
      </div>

      <Footer />
    </>
  )
}

