-- ============================================================
-- Lead Config > Company Details > Company Size
-- Stored Procedures — run once on the 'neo' database
-- Table: Company_Size (Company_Size_Id INT PK AUTO_INCREMENT, Company_Size_Name VARCHAR(200), Description VARCHAR(200), DeleteStatus INT)
-- ============================================================

DELIMITER $$

-- 1. Save (Insert or Update)
DROP PROCEDURE IF EXISTS LC_CompanySize_Save$$
CREATE PROCEDURE LC_CompanySize_Save(
    IN p_Company_Size_Id   INT,
    IN p_Company_Size_Name VARCHAR(200),
    IN p_Description       VARCHAR(200)
)
BEGIN
    DECLARE v_duplicate INT DEFAULT 0;

    IF p_Company_Size_Name IS NULL OR TRIM(p_Company_Size_Name) = '' THEN
        SELECT 0 AS Company_Size_Id_, 'Company Size name is required' AS Message;
    ELSE
        SELECT COUNT(*) INTO v_duplicate
          FROM Company_Size
         WHERE Company_Size_Name = TRIM(p_Company_Size_Name)
           AND IFNULL(DeleteStatus, 0) = 0
           AND Company_Size_Id <> IFNULL(p_Company_Size_Id, 0);

        IF v_duplicate > 0 THEN
            SELECT -1 AS Company_Size_Id_, 'Company Size already exists' AS Message;
        ELSEIF IFNULL(p_Company_Size_Id, 0) > 0 THEN
            UPDATE Company_Size
               SET Company_Size_Name = TRIM(p_Company_Size_Name),
                   Description       = IFNULL(p_Description, ''),
                   DeleteStatus      = 0
             WHERE Company_Size_Id   = p_Company_Size_Id;
            SELECT p_Company_Size_Id AS Company_Size_Id_, 'Updated successfully' AS Message;
        ELSE
            INSERT INTO Company_Size (Company_Size_Name, Description, DeleteStatus)
            VALUES (TRIM(p_Company_Size_Name), IFNULL(p_Description, ''), 0);
            SELECT LAST_INSERT_ID() AS Company_Size_Id_, 'Saved successfully' AS Message;
        END IF;
    END IF;
END$$

-- 2. Search
DROP PROCEDURE IF EXISTS LC_CompanySize_Search$$
CREATE PROCEDURE LC_CompanySize_Search(
    IN p_Search VARCHAR(200)
)
BEGIN
    IF p_Search IS NULL OR TRIM(p_Search) = '' THEN
        SELECT Company_Size_Id, Company_Size_Name, Description, DeleteStatus
          FROM Company_Size
         WHERE IFNULL(DeleteStatus, 0) = 0
         ORDER BY Company_Size_Name;
    ELSE
        SELECT Company_Size_Id, Company_Size_Name, Description, DeleteStatus
          FROM Company_Size
         WHERE Company_Size_Name LIKE CONCAT('%', TRIM(p_Search), '%')
           AND IFNULL(DeleteStatus, 0) = 0
         ORDER BY Company_Size_Name;
    END IF;
END$$

-- 3. Get by ID
DROP PROCEDURE IF EXISTS LC_CompanySize_Get$$
CREATE PROCEDURE LC_CompanySize_Get(
    IN p_Company_Size_Id INT
)
BEGIN
    SELECT Company_Size_Id, Company_Size_Name, Description, DeleteStatus
      FROM Company_Size
     WHERE Company_Size_Id = p_Company_Size_Id;
END$$

-- 4. Soft Delete
DROP PROCEDURE IF EXISTS LC_CompanySize_Delete$$
CREATE PROCEDURE LC_CompanySize_Delete(
    IN p_Company_Size_Id INT
)
BEGIN
    UPDATE Company_Size
       SET DeleteStatus = 1
     WHERE Company_Size_Id = p_Company_Size_Id;
    SELECT ROW_COUNT() AS AffectedRows;
END$$

DELIMITER ;
