# Affiliate Dashboard & Payout Access Guide

## Overview

Your CookinPartners affiliate program uses **GoHighLevel (GHL)** for all partner management, commission tracking, and payouts. This document explains how affiliates access their dashboard and manage their earnings.

---

## How Affiliates Access Their Dashboard

### 1. **Initial Signup Process**

When a partner signs up through your Next.js application:

1. Partner fills out application form (including payout information)
2. System creates GHL contact with affiliate tags
3. GHL Affiliate Manager generates unique affiliate ID
4. Welcome email is sent with:
   - Unique affiliate link: `https://cookinpartners.com/cookinpartnerscom?am_id={their_id}`
   - Login credentials for GHL Client Portal
   - Instructions to access dashboard

### 2. **Client Portal Login**

Partners access their dashboard through the **GHL Client Portal**:

**Portal URL:** `https://cookinpartners.com/portal`

**Login Credentials:**
- Email: The email they used during signup
- Password: Sent in welcome email (or they can reset)

### 3. **What Partners See in the Dashboard**

Once logged into the GHL Client Portal, partners have access to:

#### **Training & Resources Tab**
- Getting started guide
- Marketing materials (banners, email templates, social posts)
- Best practices for promoting SaintSal™ products
- Video tutorials

#### **Affiliate Dashboard Tab**
- **Unique Affiliate Link** - Copy and share
- **Click Tracking** - Real-time clicks on their link
- **Conversion Stats** - Sign-ups and sales generated
- **Commission Breakdown** - Pending and paid commissions
- **Referral History** - List of all referrals

#### **Payouts Tab**
- **Current Balance** - Total unpaid commissions
- **Payout Schedule** - Net-15 (paid 15 days after month end)
- **Payout Method** - PayPal, Venmo, Cash App, Bank Transfer, or Check
- **Payment History** - Past payouts with dates and amounts
- **Tax Forms** - Download 1099 forms (for US partners earning $600+)

#### **Community Tab**
- Partner community forum
- Direct messaging with support team
- Announcements and updates

---

## Payout Information Management

### **How Payout Info is Collected**

During signup, partners provide:
- **Payout Method:** PayPal, Venmo, Cash App, Direct Deposit (ACH), or Check
- **Payment Details:**
  - PayPal: Email address
  - Venmo: Username (@handle)
  - Cash App: Username ($handle)
  - Bank Transfer: Account holder name, routing number, account number
  - Check: Mailing address (collected separately)
- **Tax ID/SSN:** Optional (required for US partners earning $600+/year)

### **Where Payout Info is Stored**

Payout information is stored in two places:
1. **Neon Database** - Your application's database backup
2. **GHL Custom Fields** - Synced to the partner's contact record

This ensures redundancy and easy access from both your admin panel and GHL.

### **How Partners Update Payout Info**

Partners can update their payout information by:
1. Logging into the GHL Client Portal
2. Going to **Settings** → **Payout Information**
3. Updating their preferred method and details
4. Clicking **Save Changes**

Alternatively, they can email `partners@cookin.io` to request changes.

---

## Commission Tracking & Payments

### **Commission Structure**

- **Partner (15%):** $4.05 - $74.55 per referral (depending on product tier)
- **VP Partner (25%):** $6.75 - $124.25 per referral
- **President (35%):** $9.45 - $173.95 per referral

All commissions are **recurring** - partners earn every month the referral stays subscribed.

### **How Commissions Are Calculated**

GHL Affiliate Manager automatically tracks:
1. **Click** - When someone clicks the affiliate link
2. **Cookie** - 90-day cookie tracks the visitor
3. **Conversion** - When visitor purchases a SaintSal™ product
4. **Commission** - Calculated based on partner tier and product price
5. **Payout** - Scheduled for Net-15 (15 days after month end)

### **Payout Schedule**

- **Billing Period:** Monthly (1st - Last day of month)
- **Commission Calculation:** 1st - 5th of following month
- **Payout Date:** 15th of following month (Net-15)
- **Minimum Payout:** $50 (commissions below $50 roll over to next month)

**Example:**
- Sales made in January → Commissions calculated Jan 1-5 → Payout sent February 15th

### **How Payouts Are Sent**

Based on the payout method selected during signup:

1. **PayPal** - Sent to PayPal email address
2. **Venmo** - Sent to Venmo username
3. **Cash App** - Sent to Cash App username
4. **Bank Transfer (ACH)** - Direct deposit to bank account (US only)
5. **Check** - Mailed to address on file

---

## Technical Integration Flow

### **Signup → GHL → Dashboard Access**

```
1. Partner signs up on cookinpartners.com
   ↓
2. API creates GHL contact with tags:
   - "Partner" or "VP Application"
   - "15% Commission" or "25-35% Commission"
   - "Send Welcome Email"
   ↓
3. GHL Affiliate Manager creates affiliate with unique ID
   ↓
4. GHL Workflow triggered by "Send Welcome Email" tag:
   - Sends welcome email with affiliate link
   - Sends login credentials for Client Portal
   - Includes getting started guide
   ↓
5. Partner logs into GHL Client Portal:
   - URL: https://cookinpartners.com/portal
   - Email: Their signup email
   - Password: From welcome email
   ↓
6. Partner accesses dashboard to:
   - Get affiliate link
   - Track commissions
   - Download marketing materials
   - View payout history
```

### **GHL Custom Fields Setup**

Ensure these custom fields are created in your GHL location:

- `application_type` - "partner" or "vp"
- `commission_rate` - "15%", "25%", or "35%"
- `affiliate_experience` - Their experience level
- `audience_type` - Primary audience/industry
- `payout_method` - "paypal", "venmo", "cashapp", "bank", "check"
- `payout_email` - PayPal/Venmo/Cash App handle
- `tax_id` - SSN/EIN for 1099 reporting
- `tracking_source` - UTM source from signup
- `tracking_campaign` - UTM campaign from signup

---

## Support & Help

### **For Partners:**
- **Email:** partners@cookin.io
- **Support Portal:** Inside GHL Client Portal chat
- **Knowledge Base:** https://cookinpartners.com/help

### **For Admins:**
- **GHL Dashboard:** https://app.gohighlevel.com
- **Location ID:** oRA8vL3OSiCPjpwmEC0V
- **Affiliate Manager:** Marketing → Affiliate Manager
- **Client Portal Settings:** Sites → Client Portal → Branding

---

## Summary: Complete Affiliate Journey

**Yes, the system is fully operational!** Here's the complete flow:

1. **Signup:** Partner applies on your Next.js site with payout information
2. **Approval:** 
   - Partners (15%) = Instant auto-approval
   - VPs (25-35%) = Manual review, emailed to support@cookin.io
3. **Affiliate Link:** Generated automatically via GHL Affiliate Manager API
4. **Welcome Email:** Sent automatically with link + portal login credentials
5. **Dashboard Access:** Partners log into GHL Client Portal at `https://cookinpartners.com/portal`
6. **Commission Tracking:** Real-time tracking in GHL Affiliate Dashboard
7. **Payouts:** Automatic monthly payouts via selected method (Net-15 schedule)
8. **Support:** Partners can reach out via Client Portal or partners@cookin.io

**Everything is automated except VP application review!** Partners get instant access to their dashboard, affiliate link, marketing materials, and commission tracking through the GHL Client Portal.
