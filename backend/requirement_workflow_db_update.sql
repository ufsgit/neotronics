-- ============================================================
-- Migration: Requirement workflow columns (Price Request / Quotation)
-- Adds: price_request_status, quotation_master_id, quotation_status
-- Run this once against your database (e.g., neotronics_db)
-- ============================================================

ALTER TABLE `requirementmaster`
  ADD COLUMN IF NOT EXISTS `price_request_status` TINYINT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `quotation_master_id` INT NULL,
  ADD COLUMN IF NOT EXISTS `quotation_status` TINYINT NULL DEFAULT 0;

