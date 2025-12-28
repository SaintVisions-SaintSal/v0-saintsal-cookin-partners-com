// GHL tracking utilities for capturing source parameters
export interface GHLTrackingParams {
  source?: string
  campaign?: string
  medium?: string
  utm_source?: string
  utm_campaign?: string
  utm_medium?: string
  utm_content?: string
  ref?: string
}

export function captureGHLParams(): GHLTrackingParams {
  if (typeof window === "undefined") return {}

  const params = new URLSearchParams(window.location.search)

  return {
    source: params.get("source") || undefined,
    campaign: params.get("campaign") || undefined,
    medium: params.get("medium") || undefined,
    utm_source: params.get("utm_source") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_content: params.get("utm_content") || undefined,
    ref: params.get("ref") || undefined,
  }
}

export function storeGHLParams(params: GHLTrackingParams) {
  if (typeof window === "undefined") return

  try {
    sessionStorage.setItem("ghl_tracking", JSON.stringify(params))
  } catch (e) {
    console.error("[v0] Failed to store GHL params:", e)
  }
}

export function retrieveGHLParams(): GHLTrackingParams {
  if (typeof window === "undefined") return {}

  try {
    const stored = sessionStorage.getItem("ghl_tracking")
    return stored ? JSON.parse(stored) : {}
  } catch (e) {
    console.error("[v0] Failed to retrieve GHL params:", e)
    return {}
  }
}
