-- ============================================================
-- Migration: Company Size dropdown values
-- Employee range is stored in Description.
-- The backend also self-seeds these rows when the master/dropdown loads.
-- ============================================================

INSERT INTO Company_Size (Company_Size_Name, Description, DeleteStatus)
SELECT 'Micro Company', '2 - 10', 0 WHERE NOT EXISTS (SELECT 1 FROM Company_Size WHERE Company_Size_Name = 'Micro Company' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Company_Size (Company_Size_Name, Description, DeleteStatus)
SELECT 'Very Small Business', '11 - 25', 0 WHERE NOT EXISTS (SELECT 1 FROM Company_Size WHERE Company_Size_Name = 'Very Small Business' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Company_Size (Company_Size_Name, Description, DeleteStatus)
SELECT 'Small Business', '26 - 50', 0 WHERE NOT EXISTS (SELECT 1 FROM Company_Size WHERE Company_Size_Name = 'Small Business' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Company_Size (Company_Size_Name, Description, DeleteStatus)
SELECT 'Lower SMB', '51 - 100', 0 WHERE NOT EXISTS (SELECT 1 FROM Company_Size WHERE Company_Size_Name = 'Lower SMB' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Company_Size (Company_Size_Name, Description, DeleteStatus)
SELECT 'Upper SMB', '101 - 250', 0 WHERE NOT EXISTS (SELECT 1 FROM Company_Size WHERE Company_Size_Name = 'Upper SMB' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Company_Size (Company_Size_Name, Description, DeleteStatus)
SELECT 'Mid-Market', '251 - 500', 0 WHERE NOT EXISTS (SELECT 1 FROM Company_Size WHERE Company_Size_Name = 'Mid-Market' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Company_Size (Company_Size_Name, Description, DeleteStatus)
SELECT 'Large Mid-Market', '501 - 1000', 0 WHERE NOT EXISTS (SELECT 1 FROM Company_Size WHERE Company_Size_Name = 'Large Mid-Market' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Company_Size (Company_Size_Name, Description, DeleteStatus)
SELECT 'Enterprise', '1001 - 5000', 0 WHERE NOT EXISTS (SELECT 1 FROM Company_Size WHERE Company_Size_Name = 'Enterprise' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Company_Size (Company_Size_Name, Description, DeleteStatus)
SELECT 'Large Enterprise', '5000 - 10000', 0 WHERE NOT EXISTS (SELECT 1 FROM Company_Size WHERE Company_Size_Name = 'Large Enterprise' AND IFNULL(DeleteStatus, 0) = 0);

INSERT INTO Company_Size (Company_Size_Name, Description, DeleteStatus)
SELECT 'Global Enterprise', '10000+', 0 WHERE NOT EXISTS (SELECT 1 FROM Company_Size WHERE Company_Size_Name = 'Global Enterprise' AND IFNULL(DeleteStatus, 0) = 0);
