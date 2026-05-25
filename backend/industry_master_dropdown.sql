-- ============================================================
-- Migration: Industry master dropdown values
-- Run this once if you want to seed the Vertical master manually.
-- The backend also self-seeds these rows when the master/dropdown loads.
-- ============================================================

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Infrastructure & System Integration', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Infrastructure & System Integration' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Consulting & Project Management', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Consulting & Project Management' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Hospital', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Hospital' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Clinic', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Clinic' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Hospitality', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Hospitality' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Automotive', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Automotive' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Media & Broadcasting', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Media & Broadcasting' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Corporate Enterprises', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Corporate Enterprises' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Chartered Accountancy & Financial Services', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Chartered Accountancy & Financial Services' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Education Institutions', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Education Institutions' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'EdTech', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'EdTech' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Study Abroad Services', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Study Abroad Services' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Manufacturing', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Manufacturing' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Retail Chains', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Retail Chains' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Travel Agencies', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Travel Agencies' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Visa Services', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Visa Services' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Loan & Financial Agencies', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Loan & Financial Agencies' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Solar & Renewable Energy', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Solar & Renewable Energy' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
SELECT 'Real Estate', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Vertical WHERE Vertical_Name = 'Real Estate' AND IFNULL(DeleteStatus, 0) = 0);
