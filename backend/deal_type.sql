-- ============================================================
-- Deal Type Table & Stored Procedures
-- Table: Deal_Type
-- Columns: Deal_Type_Id (PK, AUTO_INCREMENT), Deal_Type_Name, DeleteStatus (default 0)
-- ============================================================

-- ── 1. CREATE TABLE ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `Deal_Type` (
  `Deal_Type_Id`   INT          NOT NULL AUTO_INCREMENT,
  `Deal_Type_Name` VARCHAR(100) NOT NULL,
  `DeleteStatus`   TINYINT(1)   NOT NULL DEFAULT 0,
  PRIMARY KEY (`Deal_Type_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── 2. SAVE (Insert / Update) with duplicate name check ──────
DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_DealType_Save`$$
CREATE PROCEDURE `LC_DealType_Save`(
    IN p_Deal_Type_Id   INT,
    IN p_Deal_Type_Name VARCHAR(100)
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    -- Check for duplicate name (exclude current record on edit)
    SELECT COUNT(*) INTO v_Exists
    FROM   Deal_Type
    WHERE  Deal_Type_Name = p_Deal_Type_Name
      AND  IFNULL(DeleteStatus, 0) = 0
      AND  (p_Deal_Type_Id IS NULL OR p_Deal_Type_Id = 0 OR Deal_Type_Id <> p_Deal_Type_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Deal_Type_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Deal_Type_Id IS NULL OR p_Deal_Type_Id = 0 THEN
            INSERT INTO Deal_Type (Deal_Type_Name, DeleteStatus)
            VALUES (p_Deal_Type_Name, 0);
            SELECT LAST_INSERT_ID() AS Deal_Type_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE Deal_Type
            SET    Deal_Type_Name = p_Deal_Type_Name
            WHERE  Deal_Type_Id   = p_Deal_Type_Id;
            SELECT p_Deal_Type_Id AS Deal_Type_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

-- ── 3. SEARCH with pagination ────────────────────────────────
DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_DealType_Search`$$
CREATE PROCEDURE `LC_DealType_Search`(
    IN p_Search   VARCHAR(100),
    IN p_Page     INT,
    IN p_PageSize INT
)
BEGIN
    DECLARE v_Offset INT DEFAULT 0;
    DECLARE v_Limit  INT DEFAULT 20;

    -- Default page size
    IF p_PageSize IS NULL OR p_PageSize = 0 THEN
        SET v_Limit = 20;
    ELSE
        SET v_Limit = p_PageSize;
    END IF;

    -- Calculate offset
    IF p_Page IS NULL OR p_Page <= 1 THEN
        SET v_Offset = 0;
    ELSE
        SET v_Offset = (p_Page - 1) * v_Limit;
    END IF;

    -- Result set 1: data rows
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Deal_Type_Id,
               Deal_Type_Name
        FROM   Deal_Type
        WHERE  IFNULL(DeleteStatus, 0) = 0
        ORDER BY Deal_Type_Name ASC
        LIMIT  v_Limit OFFSET v_Offset;
    ELSE
        SELECT Deal_Type_Id,
               Deal_Type_Name
        FROM   Deal_Type
        WHERE  IFNULL(DeleteStatus, 0) = 0
          AND  Deal_Type_Name LIKE CONCAT('%', p_Search, '%')
        ORDER BY Deal_Type_Name ASC
        LIMIT  v_Limit OFFSET v_Offset;
    END IF;

    -- Result set 2: total count (for pagination UI)
    SELECT COUNT(*) AS TotalCount
    FROM   Deal_Type
    WHERE  IFNULL(DeleteStatus, 0) = 0
      AND  (p_Search IS NULL OR p_Search = ''
            OR Deal_Type_Name LIKE CONCAT('%', p_Search, '%'));
END$$
DELIMITER ;

-- ── 4. GET (single record) ───────────────────────────────────
DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_DealType_Get`$$
CREATE PROCEDURE `LC_DealType_Get`(
    IN p_Deal_Type_Id INT
)
BEGIN
    SELECT Deal_Type_Id,
           Deal_Type_Name
    FROM   Deal_Type
    WHERE  Deal_Type_Id = p_Deal_Type_Id
      AND  IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

-- ── 5. DELETE (soft-delete via DeleteStatus = 1) ─────────────
DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_DealType_Delete`$$
CREATE PROCEDURE `LC_DealType_Delete`(
    IN p_Deal_Type_Id INT
)
BEGIN
    UPDATE Deal_Type
    SET    DeleteStatus = 1
    WHERE  Deal_Type_Id = p_Deal_Type_Id;

    SELECT ROW_COUNT() AS AffectedRows;
END$$
DELIMITER ;
