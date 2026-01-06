-- Create marketing_assets table for admin uploads
CREATE TABLE IF NOT EXISTS marketing_assets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50),
  format VARCHAR(20),
  size VARCHAR(50),
  url TEXT NOT NULL,
  thumbnail TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_marketing_assets_type ON marketing_assets(type);
CREATE INDEX IF NOT EXISTS idx_marketing_assets_created ON marketing_assets(created_at DESC);
