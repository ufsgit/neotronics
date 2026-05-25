-- ============================================================
-- Migration: Designation master dropdown values
-- Run this once if you want to seed the Designation master manually.
-- The backend also self-seeds these rows when the master/dropdown loads.
-- ============================================================

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Sales & Business Development', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Sales & Business Development' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Sales Person', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Sales Person' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Sales Manager', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Sales Manager' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'BDA', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'BDA' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'BDE', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'BDE' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Business Development Manager', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Business Development Manager' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Revenue Manager', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Revenue Manager' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'C-Level', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'C-Level' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Owner', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Owner' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'CEO', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'CEO' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Chairman', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Chairman' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Director', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Director' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Managing Director', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Managing Director' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Founder', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Founder' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Partner', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Partner' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Technology & IT', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Technology & IT' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'IT Manager', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'IT Manager' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'IT Head', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'IT Head' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'CTO', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'CTO' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'System Administrator', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'System Administrator' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Network Administrator', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Network Administrator' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Technical Consultant', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Technical Consultant' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Operations', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Operations' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Operations Manager', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Operations Manager' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Operations Head', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Operations Head' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Branch Manager', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Branch Manager' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'General Manager', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'General Manager' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Marketing', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Marketing' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Marketing Manager', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Marketing Manager' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Marketing Head', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Marketing Head' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Digital Marketing Manager', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Digital Marketing Manager' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Growth Manager', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Growth Manager' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Consulting & Advisory', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Consulting & Advisory' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Consultant', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Consultant' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Government Consultant', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Government Consultant' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Project Consultant', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Project Consultant' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'ELV Consultant', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'ELV Consultant' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'MEP Consultant', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'MEP Consultant' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'PMC', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'PMC' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Architect', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Architect' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Principal Architect', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Principal Architect' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Project & Execution', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Project & Execution' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Project Manager', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Project Manager' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Project Head', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Project Head' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Implementation Manager', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Implementation Manager' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
SELECT 'Site Engineer', '', 0 WHERE NOT EXISTS (SELECT 1 FROM Designation WHERE Designation_Name = 'Site Engineer' AND IFNULL(DeleteStatus, 0) = 0);
