-- ============================================================
-- Lead Config > Company Details > Vertical
-- Stored Procedures — run once on the 'neo' database
-- ============================================================

DELIMITER $$

-- 1. Save (Insert or Update)
DROP PROCEDURE IF EXISTS LC_Vertical_Save$$
CREATE PROCEDURE LC_Vertical_Save(
    IN p_Vertical_Id    INT,
    IN p_Vertical_Name  VARCHAR(200),
    IN p_Description    VARCHAR(500)
)
BEGIN
    DECLARE v_duplicate INT DEFAULT 0;
    DECLARE v_result_id INT DEFAULT 0;
    DECLARE v_message   VARCHAR(200);

    IF p_Vertical_Name IS NULL OR TRIM(p_Vertical_Name) = '' THEN
        SELECT 0 AS Vertical_Id_, 'Vertical name is required' AS Message;
    ELSE
        SELECT COUNT(*) INTO v_duplicate
          FROM Vertical
         WHERE Vertical_Name = TRIM(p_Vertical_Name)
           AND IFNULL(DeleteStatus, 0) = 0
           AND Vertical_Id <> IFNULL(p_Vertical_Id, 0);

        IF v_duplicate > 0 THEN
            SELECT -1 AS Vertical_Id_, 'Vertical already exists' AS Message;
        ELSEIF IFNULL(p_Vertical_Id, 0) > 0 THEN
            UPDATE Vertical
               SET Vertical_Name = TRIM(p_Vertical_Name),
                   Description   = IFNULL(p_Description, ''),
                   DeleteStatus  = 0
             WHERE Vertical_Id   = p_Vertical_Id;
            SELECT p_Vertical_Id AS Vertical_Id_, 'Updated successfully' AS Message;
        ELSE
            INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
            VALUES (TRIM(p_Vertical_Name), IFNULL(p_Description, ''), 0);
            SELECT LAST_INSERT_ID() AS Vertical_Id_, 'Saved successfully' AS Message;
        END IF;
    END IF;
END$$

-- 2. Search
DROP PROCEDURE IF EXISTS LC_Vertical_Search$$
CREATE PROCEDURE LC_Vertical_Search(
    IN p_Search VARCHAR(200)
)
BEGIN
    IF p_Search IS NULL OR TRIM(p_Search) = '' THEN
        SELECT Vertical_Id, Vertical_Name, Description, DeleteStatus
          FROM Vertical
         WHERE IFNULL(DeleteStatus, 0) = 0
         ORDER BY Vertical_Name;
    ELSE
        SELECT Vertical_Id, Vertical_Name, Description, DeleteStatus
          FROM Vertical
         WHERE Vertical_Name LIKE CONCAT('%', TRIM(p_Search), '%')
           AND IFNULL(DeleteStatus, 0) = 0
         ORDER BY Vertical_Name;
    END IF;
END$$

-- 3. Get by ID
DROP PROCEDURE IF EXISTS LC_Vertical_Get$$
CREATE PROCEDURE LC_Vertical_Get(
    IN p_Vertical_Id INT
)
BEGIN
    SELECT Vertical_Id, Vertical_Name, Description, DeleteStatus
      FROM Vertical
     WHERE Vertical_Id = p_Vertical_Id;
END$$

-- 4. Soft Delete
DROP PROCEDURE IF EXISTS LC_Vertical_Delete$$
CREATE PROCEDURE LC_Vertical_Delete(
    IN p_Vertical_Id INT
)
BEGIN
    UPDATE Vertical
       SET DeleteStatus = 1
     WHERE Vertical_Id = p_Vertical_Id;
    SELECT ROW_COUNT() AS AffectedRows;
END$$

DELIMITER ;
