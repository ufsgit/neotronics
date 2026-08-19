-- ============================================================
-- Lead Config > Company Details > Source
-- Stored Procedures — run once on the 'neo' database
-- Table: Enquiry_Source (Source_Id INT PK AUTO_INCREMENT, Source_Name VARCHAR(200), DeleteStatus INT)
-- ============================================================

DELIMITER $$

-- 1. Save (Insert or Update)
DROP PROCEDURE IF EXISTS LC_Source_Save$$
CREATE PROCEDURE LC_Source_Save(
    IN p_Source_Id   INT,
    IN p_Source_Name VARCHAR(200),
    IN p_Description VARCHAR(500)
)
BEGIN
    DECLARE v_duplicate INT DEFAULT 0;

    IF p_Source_Name IS NULL OR TRIM(p_Source_Name) = '' THEN
        SELECT 0 AS Source_Id_, 'Source name is required' AS Message;
    ELSE
        SELECT COUNT(*) INTO v_duplicate
          FROM Enquiry_Source
         WHERE Source_Name = TRIM(p_Source_Name)
           AND IFNULL(DeleteStatus, 0) = 0
           AND Source_Id <> IFNULL(p_Source_Id, 0);

        IF v_duplicate > 0 THEN
            SELECT -1 AS Source_Id_, 'Source already exists' AS Message;
        ELSEIF IFNULL(p_Source_Id, 0) > 0 THEN
            UPDATE Enquiry_Source
               SET Source_Name   = TRIM(p_Source_Name),
                   Description   = IFNULL(p_Description, ''),
                   DeleteStatus  = 0
             WHERE Source_Id     = p_Source_Id;
            SELECT p_Source_Id AS Source_Id_, 'Updated successfully' AS Message;
        ELSE
            INSERT INTO Enquiry_Source (Source_Name, Description, DeleteStatus)
            VALUES (TRIM(p_Source_Name), IFNULL(p_Description, ''), 0);
            SELECT LAST_INSERT_ID() AS Source_Id_, 'Saved successfully' AS Message;
        END IF;
    END IF;
END$$

-- 2. Search
DROP PROCEDURE IF EXISTS LC_Source_Search$$
CREATE PROCEDURE LC_Source_Search(
    IN p_Search VARCHAR(200)
)
BEGIN
    IF p_Search IS NULL OR TRIM(p_Search) = '' THEN
        SELECT Source_Id, Source_Name, DeleteStatus
          FROM Enquiry_Source
         WHERE IFNULL(DeleteStatus, 0) = 0
         ORDER BY Source_Name;
    ELSE
        SELECT Source_Id, Source_Name, DeleteStatus
          FROM Enquiry_Source
         WHERE Source_Name LIKE CONCAT('%', TRIM(p_Search), '%')
           AND IFNULL(DeleteStatus, 0) = 0
         ORDER BY Source_Name;
    END IF;
END$$

-- 3. Get by ID
DROP PROCEDURE IF EXISTS LC_Source_Get$$
CREATE PROCEDURE LC_Source_Get(
    IN p_Source_Id INT
)
BEGIN
    SELECT Source_Id, Source_Name, DeleteStatus
      FROM Enquiry_Source
     WHERE Source_Id = p_Source_Id;
END$$

-- 4. Soft Delete
DROP PROCEDURE IF EXISTS LC_Source_Delete$$
CREATE PROCEDURE LC_Source_Delete(
    IN p_Source_Id INT
)
BEGIN
    UPDATE Enquiry_Source
       SET DeleteStatus = 1
     WHERE Source_Id = p_Source_Id;
    SELECT ROW_COUNT() AS AffectedRows;
END$$

DELIMITER ;
