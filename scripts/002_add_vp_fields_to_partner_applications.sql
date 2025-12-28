-- Add VP-specific fields to partner_applications table
ALTER TABLE partner_applications 
ADD COLUMN IF NOT EXISTS application_type VARCHAR(20) DEFAULT 'partner',
ADD COLUMN IF NOT EXISTS instagram VARCHAR(255),
ADD COLUMN IF NOT EXISTS facebook VARCHAR(255),
ADD COLUMN IF NOT EXISTS linkedin VARCHAR(255),
ADD COLUMN IF NOT EXISTS twitter VARCHAR(255),
ADD COLUMN IF NOT EXISTS tiktok VARCHAR(255),
ADD COLUMN IF NOT EXISTS youtube VARCHAR(255),
ADD COLUMN IF NOT EXISTS follower_count VARCHAR(50),
ADD COLUMN IF NOT EXISTS portfolio_url VARCHAR(500),
ADD COLUMN IF NOT EXISTS social_experience TEXT,
ADD COLUMN IF NOT EXISTS marketing_strategy TEXT,
ADD COLUMN IF NOT EXISTS affiliate_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS affiliate_link VARCHAR(500);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_application_type ON partner_applications(application_type);
CREATE INDEX IF NOT EXISTS idx_affiliate_id ON partner_applications(affiliate_id);
