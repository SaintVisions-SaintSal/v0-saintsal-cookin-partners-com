"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (data.success) {
        // Store admin session
        localStorage.setItem(
          "admin_session",
          JSON.stringify({
            email: data.email,
            token: data.token,
            expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
          }),
        )
        router.push("/admin/resources")
      } else {
        setError(data.error || "Invalid credentials")
      }
    } catch {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <Link href="/" className="admin-logo">
              <Image src="/images/cookinpartners-logo.png" alt="CookinPartners" width={80} height={80} />
            </Link>
            <h1>Admin Access</h1>
            <p>CookinPartners Resource Management</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            {error && <div className="admin-error">{error}</div>}

            <div className="admin-field">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cookin.io"
                required
              />
            </div>

            <div className="admin-field">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="admin-login-btn">
              {loading ? "Authenticating..." : "Access Admin Panel"}
            </button>
          </form>

          <div className="admin-login-footer">
            <p>Authorized personnel only</p>
            <Link href="/">← Back to CookinPartners</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
