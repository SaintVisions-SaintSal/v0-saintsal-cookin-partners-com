import { type NextRequest, NextResponse } from "next/server"
import { createHash } from "crypto"

// Admin credentials - ONLY ryan@cookin.io with the specified password
const ADMIN_EMAIL = "ryan@cookin.io"
const ADMIN_PASSWORD_HASH = createHash("sha256").update("Ayden0428$$").digest("hex")

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Verify credentials
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const passwordHash = createHash("sha256").update(password).digest("hex")
    if (passwordHash !== ADMIN_PASSWORD_HASH) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
    }

    // Generate session token
    const token = createHash("sha256").update(`${email}-${Date.now()}-${Math.random()}`).digest("hex")

    console.log("[v0] Admin login successful:", email)

    return NextResponse.json({
      success: true,
      email,
      token,
    })
  } catch (error) {
    console.error("[v0] Admin login error:", error)
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 })
  }
}
