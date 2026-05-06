-- ============================================================
-- Migration: Item Tax Details (GST/CGST/SGST/IGST + B2B/B2C rate)
-- Run this once against your database (e.g., neotronics_db)
-- ============================================================

ALTER TABLE `Item`
  ADD COLUMN IF NOT EXISTS `gst` DECIMAL(18,4) NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `cgst` DECIMAL(18,4) NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `sgst` DECIMAL(18,4) NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `igst` DECIMAL(18,4) NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `b2b_rate` DECIMAL(18,4) NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `b2c_rate` DECIMAL(18,4) NULL DEFAULT 0;

-- Optional backfill from legacy columns if present in your schema
-- (Safe to run; will just set the same values.)
UPDATE `Item`
SET
  gst = COALESCE(gst, Sales_Tax, 0),
  cgst = COALESCE(cgst, CGST, 0),
  sgst = COALESCE(sgst, SGST, 0),
  igst = COALESCE(igst, IGST, 0)
WHERE 1=1;

