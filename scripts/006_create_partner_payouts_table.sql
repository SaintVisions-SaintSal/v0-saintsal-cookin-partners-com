-- Create partner_payouts table for storing payout information
CREATE TABLE IF NOT EXISTS partner_payouts (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  rewardful_id VARCHAR(100),
  account_type VARCHAR(20) DEFAULT 'individual',
  business_name VARCHAR(255),
  ein VARCHAR(20),
  tax_id VARCHAR(4),
  country VARCHAR(10) DEFAULT 'US',
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(50),
  zip VARCHAR(20),
  payout_method VARCHAR(50),
  paypal_email VARCHAR(255),
  venmo_handle VARCHAR(100),
  cashapp_handle VARCHAR(100),
  bank_name VARCHAR(255),
  routing_number VARCHAR(20),
  account_number VARCHAR(30),
  commission_rate INTEGER DEFAULT 15,
  is_vp BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_partner_payouts_email ON partner_payouts(email);
CREATE INDEX IF NOT EXISTS idx_partner_payouts_is_vp ON partner_payouts(is_vp);
