-- ============================================================
-- Migration: Lost lead management fields
-- The backend also adds these columns automatically when saving a lead.
-- ============================================================

ALTER TABLE `Lead` ADD COLUMN `Lost_Reason` VARCHAR(255) NULL;
ALTER TABLE `Lead` ADD COLUMN `Lost_Primary_Issue` VARCHAR(255) NULL;
ALTER TABLE `Lead` ADD COLUMN `Lost_Competitor_Name` VARCHAR(255) NULL;
ALTER TABLE `Lead` ADD COLUMN `Lost_Competitor_Price` DECIMAL(18,2) NULL;
ALTER TABLE `Lead` ADD COLUMN `Lost_Was_Price_Issue` TINYINT(1) DEFAULT 0;
ALTER TABLE `Lead` ADD COLUMN `Lost_Was_Solution_Issue` TINYINT(1) DEFAULT 0;
ALTER TABLE `Lead` ADD COLUMN `Lost_Quote_Only_Comparison` TINYINT(1) DEFAULT 0;
ALTER TABLE `Lead` ADD COLUMN `Lost_Reopen_Possibility` VARCHAR(20) NULL;
ALTER TABLE `Lead` ADD COLUMN `Lost_Expected_Reconnect_Date` DATE NULL;
ALTER TABLE `Lead` ADD COLUMN `Lost_Remarks` TEXT NULL;
