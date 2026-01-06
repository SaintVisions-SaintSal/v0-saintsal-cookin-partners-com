import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { sql } from "@/lib/neon"

export async function POST(request: NextRequest) {
  try {
    // Verify admin authorization
    const authHeader = request.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const name = formData.get("name") as string
    const type = formData.get("type") as string
    const format = formData.get("format") as string
    const size = formData.get("size") as string

    if (!file || !name) {
      return NextResponse.json({ success: false, error: "Missing file or name" }, { status: 400 })
    }

    // Upload to Vercel Blob
    const blob = await put(`marketing-assets/${Date.now()}-${file.name}`, file, {
      access: "public",
    })

    // Store in database
    const result = await sql`
      INSERT INTO marketing_assets (name, type, format, size, url, thumbnail, created_at)
      VALUES (${name}, ${type}, ${format}, ${size}, ${blob.url}, ${blob.url}, NOW())
      RETURNING id, name, type, format, size, url, thumbnail, created_at
    `

    const asset = {
      id: result[0].id.toString(),
      name: result[0].name,
      type: result[0].type,
      format: result[0].format,
      size: result[0].size,
      url: result[0].url,
      thumbnail: result[0].thumbnail,
      createdAt: result[0].created_at,
    }

    console.log("[v0] Asset uploaded:", asset.name)

    return NextResponse.json({ success: true, asset })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 })
  }
}
