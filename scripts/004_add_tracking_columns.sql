-- Add tracking columns to partner_applications table
ALTER TABLE partner_applications 
ADD COLUMN IF NOT EXISTS tracking_source VARCHAR(255),
ADD COLUMN IF NOT EXISTS tracking_campaign VARCHAR(255),
ADD COLUMN IF NOT EXISTS tracking_medium VARCHAR(255),
ADD COLUMN IF NOT EXISTS tracking_content VARCHAR(255);

-- Create index for analytics queries
CREATE INDEX IF NOT EXISTS idx_partner_tracking 
ON partner_applications(tracking_source, tracking_campaign);
