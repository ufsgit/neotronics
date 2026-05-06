-- Lead Requirement (Lead -> Quotation -> Transaction) tables
-- Run this once on database `neotronics_db`.

CREATE TABLE IF NOT EXISTS `lead_requirement_master` (
  `LeadRequirementMaster_Id` INT NOT NULL AUTO_INCREMENT,
  `Lead_Id` INT NOT NULL,
  `Lead_Name` VARCHAR(255) DEFAULT NULL,
  `Phone` VARCHAR(50) DEFAULT NULL,
  `Contact_Person` VARCHAR(255) DEFAULT NULL,
  `Contact_Number` VARCHAR(50) DEFAULT NULL,
  `Email` VARCHAR(255) DEFAULT NULL,
  `Address` TEXT DEFAULT NULL,
  `Requirement_Date` DATETIME DEFAULT NULL,
  `Notes` TEXT DEFAULT NULL,
  `Created_At` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `DeleteStatus` BIT DEFAULT b'0',
  PRIMARY KEY (`LeadRequirementMaster_Id`),
  KEY `idx_lead_requirement_master_lead` (`Lead_Id`)
);

CREATE TABLE IF NOT EXISTS `lead_requirement_details` (
  `LeadRequirementDetail_Id` INT NOT NULL AUTO_INCREMENT,
  `LeadRequirementMaster_Id` INT NOT NULL,
  `Item` VARCHAR(500) DEFAULT NULL,
  `Quantity` DECIMAL(18,4) DEFAULT NULL,
  `Remarks` VARCHAR(500) DEFAULT NULL,
  `DeleteStatus` BIT DEFAULT b'0',
  PRIMARY KEY (`LeadRequirementDetail_Id`),
  KEY `idx_lead_requirement_details_master` (`LeadRequirementMaster_Id`),
  CONSTRAINT `fk_lead_requirement_details_master`
    FOREIGN KEY (`LeadRequirementMaster_Id`)
    REFERENCES `lead_requirement_master` (`LeadRequirementMaster_Id`)
    ON DELETE CASCADE
);

