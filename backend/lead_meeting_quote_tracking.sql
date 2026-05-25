-- ============================================================
-- Migration: Lead meeting and quote tracking
-- The backend also creates these tables automatically when needed.
-- ============================================================

CREATE TABLE IF NOT EXISTS lead_meeting (
  LeadMeeting_Id INT NOT NULL AUTO_INCREMENT,
  Lead_Id INT NOT NULL,
  Meeting_Date DATETIME NOT NULL,
  Meeting_Type VARCHAR(20) NOT NULL,
  Notes TEXT NULL,
  Outcome TEXT NULL,
  User_Id INT NULL,
  Created_At DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  DeleteStatus TINYINT DEFAULT 0,
  PRIMARY KEY (LeadMeeting_Id),
  KEY idx_lead_meeting_lead (Lead_Id)
);

CREATE TABLE IF NOT EXISTS lead_quote_tracking (
  LeadQuoteTracking_Id INT NOT NULL AUTO_INCREMENT,
  Lead_Id INT NOT NULL,
  Requirement_Id INT NULL,
  Requirement_Name VARCHAR(255) NULL,
  Quote_Sent_Date DATE NULL,
  Quote_Amount DECIMAL(18,2) DEFAULT 0,
  FollowUp_Status_After_Quote VARCHAR(255) NULL,
  User_Id INT NULL,
  Created_At DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  DeleteStatus TINYINT DEFAULT 0,
  PRIMARY KEY (LeadQuoteTracking_Id),
  KEY idx_lead_quote_tracking_lead (Lead_Id)
);
