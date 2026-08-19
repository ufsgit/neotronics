-- ============================================================
-- Lead Config > Company Details > State
-- Stored Procedures — run once on the 'neo' database
-- Table: State (State_Id INT PK AUTO_INCREMENT, State_Name VARCHAR(200), DeleteStatus INT)
-- ============================================================

DELIMITER $$

-- 1. Save (Insert or Update)
DROP PROCEDURE IF EXISTS LC_State_Save$$
CREATE PROCEDURE LC_State_Save(
    IN p_State_Id   INT,
    IN p_State_Name VARCHAR(200)
)
BEGIN
    DECLARE v_duplicate INT DEFAULT 0;

    IF p_State_Name IS NULL OR TRIM(p_State_Name) = '' THEN
        SELECT 0 AS State_Id_, 'State name is required' AS Message;
    ELSE
        SELECT COUNT(*) INTO v_duplicate
          FROM State
         WHERE State_Name = TRIM(p_State_Name)
           AND IFNULL(DeleteStatus, 0) = 0
           AND State_Id <> IFNULL(p_State_Id, 0);

        IF v_duplicate > 0 THEN
            SELECT -1 AS State_Id_, 'State already exists' AS Message;
        ELSEIF IFNULL(p_State_Id, 0) > 0 THEN
            UPDATE State
               SET State_Name  = TRIM(p_State_Name),
                   DeleteStatus = 0
             WHERE State_Id    = p_State_Id;
            SELECT p_State_Id AS State_Id_, 'Updated successfully' AS Message;
        ELSE
            INSERT INTO State (State_Name, DeleteStatus)
            VALUES (TRIM(p_State_Name), 0);
            SELECT LAST_INSERT_ID() AS State_Id_, 'Saved successfully' AS Message;
        END IF;
    END IF;
END$$

-- 2. Search
DROP PROCEDURE IF EXISTS LC_State_Search$$
CREATE PROCEDURE LC_State_Search(
    IN p_Search VARCHAR(200)
)
BEGIN
    IF p_Search IS NULL OR TRIM(p_Search) = '' THEN
        SELECT State_Id, State_Name, DeleteStatus
          FROM State
         WHERE IFNULL(DeleteStatus, 0) = 0
         ORDER BY State_Name;
    ELSE
        SELECT State_Id, State_Name, DeleteStatus
          FROM State
         WHERE State_Name LIKE CONCAT('%', TRIM(p_Search), '%')
           AND IFNULL(DeleteStatus, 0) = 0
         ORDER BY State_Name;
    END IF;
END$$

-- 3. Get by ID
DROP PROCEDURE IF EXISTS LC_State_Get$$
CREATE PROCEDURE LC_State_Get(
    IN p_State_Id INT
)
BEGIN
    SELECT State_Id, State_Name, DeleteStatus
      FROM State
     WHERE State_Id = p_State_Id;
END$$

-- 4. Soft Delete
DROP PROCEDURE IF EXISTS LC_State_Delete$$
CREATE PROCEDURE LC_State_Delete(
    IN p_State_Id INT
)
BEGIN
    UPDATE State
       SET DeleteStatus = 1
     WHERE State_Id = p_State_Id;
    SELECT ROW_COUNT() AS AffectedRows;
END$$

DELIMITER ;
