"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

interface Asset {
  id: string
  name: string
  type: string
  format: string
  size: string
  url: string
  thumbnail: string
  createdAt: string
}

export default function AdminResourcesPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [assets, setAssets] = useState<Asset[]>([])
  const [newAsset, setNewAsset] = useState({
    name: "",
    type: "Logo",
    format: "PNG",
    size: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem("admin_session")
    if (session) {
      const parsed = JSON.parse(session)
      if (parsed.expires > Date.now() && parsed.email === "ryan@cookin.io") {
        setIsAuthenticated(true)
        loadAssets()
      } else {
        localStorage.removeItem("admin_session")
        router.push("/admin/login")
      }
    } else {
      router.push("/admin/login")
    }
    setLoading(false)
  }, [router])

  const loadAssets = async () => {
    try {
      const res = await fetch("/api/admin/assets")
      const data = await res.json()
      if (data.assets) {
        setAssets(data.assets)
      }
    } catch (error) {
      console.error("Failed to load assets:", error)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))

      // Auto-detect format
      const ext = file.name.split(".").pop()?.toUpperCase() || "PNG"
      setNewAsset((prev) => ({
        ...prev,
        format: ext,
        name: prev.name || file.name.replace(/\.[^/.]+$/, ""),
      }))
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("name", newAsset.name)
      formData.append("type", newAsset.type)
      formData.append("format", newAsset.format)
      formData.append("size", newAsset.size)

      const session = JSON.parse(localStorage.getItem("admin_session") || "{}")

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
        body: formData,
      })

      const data = await res.json()

      if (data.success) {
        // Add to assets list
        setAssets((prev) => [data.asset, ...prev])
        // Reset form
        setNewAsset({ name: "", type: "Logo", format: "PNG", size: "" })
        setSelectedFile(null)
        setPreviewUrl(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
      } else {
        alert(data.error || "Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (assetId: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return

    try {
      const session = JSON.parse(localStorage.getItem("admin_session") || "{}")

      const res = await fetch(`/api/admin/assets/${assetId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      })

      if (res.ok) {
        setAssets((prev) => prev.filter((a) => a.id !== assetId))
      }
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_session")
    router.push("/admin/login")
  }

  if (loading) {
    return (
      <main className="admin-page">
        <div className="admin-loading">Loading...</div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="admin-page">
      <div className="admin-header">
        <div className="admin-header-left">
          <Link href="/" className="admin-logo-link">
            <Image src="/images/cookinpartners-logo.png" alt="CookinPartners" width={48} height={48} />
            <span>Admin Panel</span>
          </Link>
        </div>
        <div className="admin-header-right">
          <span className="admin-user">ryan@cookin.io</span>
          <button onClick={handleLogout} className="admin-logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="admin-container">
        <div className="admin-sidebar">
          <nav className="admin-nav">
            <Link href="/admin/resources" className="admin-nav-item active">
              Marketing Assets
            </Link>
            <Link href="/admin/partners" className="admin-nav-item">
              Partner Management
            </Link>
            <Link href="/admin/analytics" className="admin-nav-item">
              Analytics
            </Link>
          </nav>
        </div>

        <div className="admin-main">
          <div className="admin-section">
            <h2>Upload New Asset</h2>
            <form onSubmit={handleUpload} className="admin-upload-form">
              <div className="admin-upload-area" onClick={() => fileInputRef.current?.click()}>
                {previewUrl ? (
                  <div className="admin-preview">
                    <Image
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      width={200}
                      height={150}
                      style={{ objectFit: "contain" }}
                    />
                    <span>{selectedFile?.name}</span>
                  </div>
                ) : (
                  <div className="admin-upload-placeholder">
                    <span className="admin-upload-icon">+</span>
                    <span>Click to select file</span>
                    <span className="admin-upload-hint">PNG, JPG, SVG, PDF</span>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*,.pdf,.svg" onChange={handleFileSelect} hidden />
              </div>

              <div className="admin-form-grid">
                <div className="admin-field">
                  <label>Asset Name *</label>
                  <input
                    type="text"
                    value={newAsset.name}
                    onChange={(e) => setNewAsset((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Partner Banner 2024"
                    required
                  />
                </div>

                <div className="admin-field">
                  <label>Type</label>
                  <select
                    value={newAsset.type}
                    onChange={(e) => setNewAsset((prev) => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="Logo">Logo</option>
                    <option value="Banner">Banner</option>
                    <option value="Social">Social Media</option>
                    <option value="Email">Email Template</option>
                    <option value="Document">Document</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="admin-field">
                  <label>Format</label>
                  <input
                    type="text"
                    value={newAsset.format}
                    onChange={(e) => setNewAsset((prev) => ({ ...prev, format: e.target.value }))}
                    placeholder="PNG"
                  />
                </div>

                <div className="admin-field">
                  <label>Dimensions</label>
                  <input
                    type="text"
                    value={newAsset.size}
                    onChange={(e) => setNewAsset((prev) => ({ ...prev, size: e.target.value }))}
                    placeholder="e.g., 1920x1080"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedFile || !newAsset.name || uploading}
                className="admin-upload-btn"
              >
                {uploading ? "Uploading..." : "Upload Asset"}
              </button>
            </form>
          </div>

          <div className="admin-section">
            <h2>Existing Assets ({assets.length})</h2>
            <div className="admin-assets-grid">
              {assets.map((asset) => (
                <div key={asset.id} className="admin-asset-card">
                  <div className="admin-asset-preview">
                    <Image
                      src={asset.thumbnail || asset.url || "/placeholder.svg"}
                      alt={asset.name}
                      width={200}
                      height={120}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="admin-asset-info">
                    <h4>{asset.name}</h4>
                    <div className="admin-asset-meta">
                      <span>{asset.type}</span>
                      <span>{asset.format}</span>
                      {asset.size && <span>{asset.size}</span>}
                    </div>
                  </div>
                  <div className="admin-asset-actions">
                    <a href={asset.url} target="_blank" rel="noopener noreferrer" className="admin-btn-view">
                      View
                    </a>
                    <button onClick={() => handleDelete(asset.id)} className="admin-btn-delete">
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {assets.length === 0 && (
                <div className="admin-empty">
                  <p>No assets uploaded yet. Upload your first asset above!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
