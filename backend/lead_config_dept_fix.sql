DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Department_Save`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Department_Save`(
    IN p_Assignment_Id INT,
    IN p_Assignment_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM department
    WHERE Department_Name = p_Assignment_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Assignment_Id IS NULL OR p_Assignment_Id = 0 OR Department_Id <> p_Assignment_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Assignment_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Assignment_Id IS NULL OR p_Assignment_Id = 0 THEN
            INSERT INTO department (Department_Name, Description, DeleteStatus)
            VALUES (p_Assignment_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Assignment_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE department
            SET Department_Name = p_Assignment_Name, Description = p_Description
            WHERE Department_Id = p_Assignment_Id;

            SELECT p_Assignment_Id AS Assignment_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Department_Search`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Department_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Department_Id AS Assignment_Id, Department_Name AS Assignment_Name, Description
        FROM department
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Department_Name ASC
        LIMIT 20;
    ELSE
        SELECT Department_Id AS Assignment_Id, Department_Name AS Assignment_Name, Description
        FROM department
        WHERE Department_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Department_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Department_Get`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Department_Get`(
    IN p_Assignment_Id INT
)
BEGIN
    SELECT Department_Id AS Assignment_Id, Department_Name AS Assignment_Name, Description
    FROM department
    WHERE Department_Id = p_Assignment_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Department_Delete`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Department_Delete`(
    IN p_Assignment_Id INT
)
BEGIN
    UPDATE department
    SET DeleteStatus = 1
    WHERE Department_Id = p_Assignment_Id;

    SELECT p_Assignment_Id AS Assignment_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;
