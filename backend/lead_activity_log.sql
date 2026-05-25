-- ============================================================
-- Migration: Lead remarks history and activity timeline
-- The backend also creates this table automatically when needed.
-- ============================================================

CREATE TABLE IF NOT EXISTS lead_activity_log (
  LeadActivityLog_Id INT NOT NULL AUTO_INCREMENT,
  Lead_Id INT NOT NULL,
  Activity_Type VARCHAR(50) NOT NULL,
  Activity_Title VARCHAR(255) NOT NULL,
  Old_Value TEXT NULL,
  New_Value TEXT NULL,
  Remarks TEXT NULL,
  User_Id INT NULL,
  Activity_Date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  DeleteStatus TINYINT DEFAULT 0,
  PRIMARY KEY (LeadActivityLog_Id),
  KEY idx_lead_activity_log_lead (Lead_Id)
);
