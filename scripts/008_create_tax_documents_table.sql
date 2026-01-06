-- Create tax_documents table for W-9 and W-8BEN forms
CREATE TABLE IF NOT EXISTS tax_documents (
  id SERIAL PRIMARY KEY,
  document_id VARCHAR(100) UNIQUE NOT NULL,
  form_type VARCHAR(20) NOT NULL, -- 'w9' or 'w8ben'
  partner_email VARCHAR(255),
  form_data JSONB NOT NULL,
  signature_data TEXT, -- Base64 encoded signature image
  signed_at TIMESTAMP NOT NULL,
  ip_address VARCHAR(100),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tax_docs_partner ON tax_documents(partner_email);
CREATE INDEX IF NOT EXISTS idx_tax_docs_form_type ON tax_documents(form_type);
CREATE INDEX IF NOT EXISTS idx_tax_docs_created ON tax_documents(created_at DESC);
