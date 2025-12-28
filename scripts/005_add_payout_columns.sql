-- Add payout information columns to partner_applications table
ALTER TABLE partner_applications 
ADD COLUMN IF NOT EXISTS payout_method VARCHAR(50),
ADD COLUMN IF NOT EXISTS payout_details JSONB,
ADD COLUMN IF NOT EXISTS tax_id VARCHAR(100);

-- Add index for payout method queries
CREATE INDEX IF NOT EXISTS idx_partner_applications_payout_method 
ON partner_applications(payout_method);

-- Add comment
COMMENT ON COLUMN partner_applications.payout_method IS 'Preferred payout method: paypal, venmo, cashapp, bank, check';
COMMENT ON COLUMN partner_applications.payout_details IS 'JSON containing payment details (email, handles, bank info)';
COMMENT ON COLUMN partner_applications.tax_id IS 'Tax ID/SSN for 1099 reporting';
