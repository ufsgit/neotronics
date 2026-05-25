-- ============================================================
-- Migration: Lead stages workflow
-- Run this once against your database if you want to seed stages
-- outside the application startup/dropdown flow.
-- ============================================================

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'RAW Lead', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'RAW Lead' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'Need to call up for first level call', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'Need to call up for first level call' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'Need to Send Company Profile', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'Need to Send Company Profile' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'Need to Schedule Sales Meeting', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'Need to Schedule Sales Meeting' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'Meeting Scheduled', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'Meeting Scheduled' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'Need Site Visit / Demo / Support', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'Need Site Visit / Demo / Support' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'Work / Project Stuck', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'Work / Project Stuck' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'Need to Send Quote', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'Need to Send Quote' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'Immediate Follow-up Required on Quote', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'Immediate Follow-up Required on Quote' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'Weekly Follow-up (Every Wednesday)', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'Weekly Follow-up (Every Wednesday)' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'Monthly Follow-up (15th of Every Month)', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'Monthly Follow-up (15th of Every Month)' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'Final Stage', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'Final Stage' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'PO Received', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'PO Received' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'Operations', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'Operations' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'Payment Follow-up', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'Payment Follow-up' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'Lost', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'Lost' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO `Status` (Status_Name, DeleteStatus)
SELECT 'Currently No Requirement', 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = 'Currently No Requirement' AND IFNULL(DeleteStatus, 0) = 0);
