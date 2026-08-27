DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Source_Save`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Source_Save`(
    IN p_Source_Id INT,
    IN p_Source_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM source
    WHERE sourceName = p_Source_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Source_Id IS NULL OR p_Source_Id = 0 OR id <> p_Source_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Source_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Source_Id IS NULL OR p_Source_Id = 0 THEN
            INSERT INTO source (sourceName, description, DeleteStatus)
            VALUES (p_Source_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Source_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE source
            SET sourceName = p_Source_Name, description = p_Description
            WHERE id = p_Source_Id;

            SELECT p_Source_Id AS Source_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Source_Search`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Source_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT id AS Source_Id, sourceName AS Source_Name, description AS Description
        FROM source
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY sourceName ASC
        LIMIT 20;
    ELSE
        SELECT id AS Source_Id, sourceName AS Source_Name, description AS Description
        FROM source
        WHERE sourceName LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY sourceName ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Source_Get`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Source_Get`(
    IN p_Source_Id INT
)
BEGIN
    SELECT id AS Source_Id, sourceName AS Source_Name, description AS Description
    FROM source
    WHERE id = p_Source_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Source_Delete`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Source_Delete`(
    IN p_Source_Id INT
)
BEGIN
    UPDATE source
    SET DeleteStatus = 1
    WHERE id = p_Source_Id;

    SELECT p_Source_Id AS Source_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;
