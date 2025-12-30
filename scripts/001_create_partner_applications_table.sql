-- Create partner_applications table in Neon database
CREATE TABLE IF NOT EXISTS partner_applications (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  company VARCHAR(255),
  audience VARCHAR(100),
  experience VARCHAR(100),
  source VARCHAR(100) DEFAULT 'cookinpartners.com',
  referrer_partner_id VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_partner_applications_email ON partner_applications(email);

-- Create index on status
CREATE INDEX IF NOT EXISTS idx_partner_applications_status ON partner_applications(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_partner_applications_created_at ON partner_applications(created_at DESC);
