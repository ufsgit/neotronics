-- ============================================================
-- Lead Config > Company Details > District
-- Stored Procedures — run once on the 'neo' database
-- Table: District (District_Id INT PK AUTO_INCREMENT, District_Name VARCHAR(200), State_Id INT, DeleteStatus INT)
-- ============================================================

DELIMITER $$

-- 1. Save (Insert or Update)
DROP PROCEDURE IF EXISTS LC_District_Save$$
CREATE PROCEDURE LC_District_Save(
    IN p_District_Id   INT,
    IN p_District_Name VARCHAR(200),
    IN p_State_Id      INT
)
BEGIN
    DECLARE v_duplicate INT DEFAULT 0;

    IF p_District_Name IS NULL OR TRIM(p_District_Name) = '' THEN
        SELECT 0 AS District_Id_, 'District name is required' AS Message;
    ELSE
        SELECT COUNT(*) INTO v_duplicate
          FROM District
         WHERE District_Name = TRIM(p_District_Name)
           AND IFNULL(State_Id, 0) = IFNULL(p_State_Id, 0)
           AND IFNULL(DeleteStatus, 0) = 0
           AND District_Id <> IFNULL(p_District_Id, 0);

        IF v_duplicate > 0 THEN
            SELECT -1 AS District_Id_, 'District already exists for this state' AS Message;
        ELSEIF IFNULL(p_District_Id, 0) > 0 THEN
            UPDATE District
               SET District_Name = TRIM(p_District_Name),
                   State_Id      = p_State_Id,
                   DeleteStatus  = 0
             WHERE District_Id   = p_District_Id;
            SELECT p_District_Id AS District_Id_, 'Updated successfully' AS Message;
        ELSE
            INSERT INTO District (District_Name, State_Id, DeleteStatus)
            VALUES (TRIM(p_District_Name), p_State_Id, 0);
            SELECT LAST_INSERT_ID() AS District_Id_, 'Saved successfully' AS Message;
        END IF;
    END IF;
END$$

-- 2. Search
DROP PROCEDURE IF EXISTS LC_District_Search$$
CREATE PROCEDURE LC_District_Search(
    IN p_Search   VARCHAR(200),
    IN p_State_Id INT
)
BEGIN
    IF p_Search IS NULL OR TRIM(p_Search) = '' THEN
        SELECT d.District_Id, d.District_Name, d.State_Id, s.State_Name, d.DeleteStatus
          FROM District d
          LEFT JOIN State s ON s.State_Id = d.State_Id
         WHERE IFNULL(d.DeleteStatus, 0) = 0
           AND (p_State_Id IS NULL OR p_State_Id = 0 OR d.State_Id = p_State_Id)
         ORDER BY d.District_Name;
    ELSE
        SELECT d.District_Id, d.District_Name, d.State_Id, s.State_Name, d.DeleteStatus
          FROM District d
          LEFT JOIN State s ON s.State_Id = d.State_Id
         WHERE d.District_Name LIKE CONCAT('%', TRIM(p_Search), '%')
           AND IFNULL(d.DeleteStatus, 0) = 0
           AND (p_State_Id IS NULL OR p_State_Id = 0 OR d.State_Id = p_State_Id)
         ORDER BY d.District_Name;
    END IF;
END$$

-- 3. Get by ID
DROP PROCEDURE IF EXISTS LC_District_Get$$
CREATE PROCEDURE LC_District_Get(
    IN p_District_Id INT
)
BEGIN
    SELECT d.District_Id, d.District_Name, d.State_Id, s.State_Name, d.DeleteStatus
      FROM District d
      LEFT JOIN State s ON s.State_Id = d.State_Id
     WHERE d.District_Id = p_District_Id;
END$$

-- 4. Soft Delete
DROP PROCEDURE IF EXISTS LC_District_Delete$$
CREATE PROCEDURE LC_District_Delete(
    IN p_District_Id INT
)
BEGIN
    UPDATE District
       SET DeleteStatus = 1
     WHERE District_Id = p_District_Id;
    SELECT ROW_COUNT() AS AffectedRows;
END$$

DELIMITER ;
