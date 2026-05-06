-- ============================================================
-- Migration: Requirement Details item tax fields
-- Adds: part_number, gst, cgst, sgst, igst, b2b_rate, b2c_rate
-- Run this once against your database (e.g., neotronics_db)
-- ============================================================

ALTER TABLE `requirementdetails`
  ADD COLUMN IF NOT EXISTS `part_number` VARCHAR(100) NULL,
  ADD COLUMN IF NOT EXISTS `gst` DECIMAL(18,4) NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `cgst` DECIMAL(18,4) NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `sgst` DECIMAL(18,4) NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `igst` DECIMAL(18,4) NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `b2b_rate` DECIMAL(18,4) NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `b2c_rate` DECIMAL(18,4) NULL DEFAULT 0;

