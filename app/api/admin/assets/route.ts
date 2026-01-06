import { NextResponse } from "next/server"
import { sql } from "@/lib/neon"

export async function GET() {
  try {
    // Try to get assets from database
    let assets = []

    try {
      const result = await sql`
        SELECT id, name, type, format, size, url, thumbnail, created_at
        FROM marketing_assets
        ORDER BY created_at DESC
      `
      assets = result.map((row: Record<string, unknown>) => ({
        id: String(row.id),
        name: row.name as string,
        type: row.type as string,
        format: row.format as string,
        size: row.size as string,
        url: row.url as string,
        thumbnail: row.thumbnail as string,
        createdAt: row.created_at as string,
      }))
    } catch {
      // If table doesn't exist, return default assets
      console.log("[v0] Marketing assets table not found, returning defaults")
      assets = [
        {
          id: "1",
          name: "CookinPartners Logo (Dark)",
          type: "Logo",
          format: "PNG",
          size: "2400x2400",
          url: "/images/cookinpartners-logo.png",
          thumbnail: "/images/cookinpartners-logo.png",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "SaintSal Logo",
          type: "Logo",
          format: "PNG",
          size: "1200x1200",
          url: "/images/saintsal-logo.png",
          thumbnail: "/images/saintsal-logo.png",
          createdAt: new Date().toISOString(),
        },
      ]
    }

    return NextResponse.json({ assets })
  } catch (error) {
    console.error("[v0] Failed to load assets:", error)
    return NextResponse.json({ assets: [] })
  }
}
