-- Neotronics ERP - Tax column alignment (May 7, 2026)
-- Fixes: ER_BAD_FIELD_ERROR: Unknown column 'gst' in 'field list'
-- DB: neotronics_db

-- 1) Item: keep legacy Sales_Tax, add normalized GST split + B2B/B2C rates
ALTER TABLE `Item` ADD COLUMN IF NOT EXISTS `gst` DECIMAL(18,4) NULL DEFAULT 0 AFTER `Sales_Tax`;
ALTER TABLE `Item` ADD COLUMN IF NOT EXISTS `cgst` DECIMAL(18,4) NULL DEFAULT 0 AFTER `gst`;
ALTER TABLE `Item` ADD COLUMN IF NOT EXISTS `sgst` DECIMAL(18,4) NULL DEFAULT 0 AFTER `cgst`;
ALTER TABLE `Item` ADD COLUMN IF NOT EXISTS `igst` DECIMAL(18,4) NULL DEFAULT 0 AFTER `sgst`;
ALTER TABLE `Item` ADD COLUMN IF NOT EXISTS `b2b_rate` DECIMAL(18,4) NULL DEFAULT 0 AFTER `igst`;
ALTER TABLE `Item` ADD COLUMN IF NOT EXISTS `b2c_rate` DECIMAL(18,4) NULL DEFAULT 0 AFTER `b2b_rate`;

-- Backfill (non-destructive)
UPDATE `Item`
SET
  `gst` = COALESCE(`gst`, `Sales_Tax`, 0),
  `cgst` = COALESCE(`cgst`, 0),
  `sgst` = COALESCE(`sgst`, 0),
  `igst` = COALESCE(`igst`, 0),
  `b2b_rate` = COALESCE(`b2b_rate`, 0),
  `b2c_rate` = COALESCE(`b2c_rate`, 0);

-- 2) requirementdetails: add missing part_number + tax columns used by Save_Requirement JSON detail inserts
ALTER TABLE `requirementdetails` ADD COLUMN IF NOT EXISTS `part_number` VARCHAR(100) NULL AFTER `ItemId`;
ALTER TABLE `requirementdetails` ADD COLUMN IF NOT EXISTS `gst` DECIMAL(18,4) NULL DEFAULT 0 AFTER `part_number`;
ALTER TABLE `requirementdetails` ADD COLUMN IF NOT EXISTS `cgst` DECIMAL(18,4) NULL DEFAULT 0 AFTER `gst`;
ALTER TABLE `requirementdetails` ADD COLUMN IF NOT EXISTS `sgst` DECIMAL(18,4) NULL DEFAULT 0 AFTER `cgst`;
ALTER TABLE `requirementdetails` ADD COLUMN IF NOT EXISTS `igst` DECIMAL(18,4) NULL DEFAULT 0 AFTER `sgst`;
ALTER TABLE `requirementdetails` ADD COLUMN IF NOT EXISTS `b2b_rate` DECIMAL(18,4) NULL DEFAULT 0 AFTER `igst`;
ALTER TABLE `requirementdetails` ADD COLUMN IF NOT EXISTS `b2c_rate` DECIMAL(18,4) NULL DEFAULT 0 AFTER `b2b_rate`;

-- Backfill
UPDATE `requirementdetails`
SET
  `gst` = COALESCE(`gst`, `SaleTax`, 0),
  `cgst` = COALESCE(`cgst`, 0),
  `sgst` = COALESCE(`sgst`, 0),
  `igst` = COALESCE(`igst`, 0),
  `b2b_rate` = COALESCE(`b2b_rate`, 0),
  `b2c_rate` = COALESCE(`b2c_rate`, 0);
