-- Create Branch table if it doesn't exist
CREATE TABLE IF NOT EXISTS `Branch` (
  `Branch_Id` INT NOT NULL AUTO_INCREMENT,
  `Branch_Name` VARCHAR(255) DEFAULT NULL,
  `Description` TEXT DEFAULT NULL,
  `DeleteStatus` INT DEFAULT 0,
  PRIMARY KEY (`Branch_Id`)
);

-- Add Description and DeleteStatus to Department
ALTER TABLE `Department`
ADD COLUMN `Description` TEXT DEFAULT NULL,
ADD COLUMN `DeleteStatus` INT DEFAULT 0;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Branch_Save`(
    IN p_Branch_Id INT,
    IN p_Branch_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM Branch
    WHERE Branch_Name = p_Branch_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Branch_Id IS NULL OR p_Branch_Id = 0 OR Branch_Id <> p_Branch_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Branch_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Branch_Id IS NULL OR p_Branch_Id = 0 THEN
            INSERT INTO Branch (Branch_Name, Description, DeleteStatus)
            VALUES (p_Branch_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Branch_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE Branch
            SET Branch_Name = p_Branch_Name, Description = p_Description
            WHERE Branch_Id = p_Branch_Id;

            SELECT p_Branch_Id AS Branch_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Branch_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Branch_Id, Branch_Name, Description
        FROM Branch
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Branch_Name ASC
        LIMIT 20;
    ELSE
        SELECT Branch_Id, Branch_Name, Description
        FROM Branch
        WHERE Branch_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Branch_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Branch_Get`(
    IN p_Branch_Id INT
)
BEGIN
    SELECT Branch_Id, Branch_Name, Description
    FROM Branch
    WHERE Branch_Id = p_Branch_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Branch_Delete`(
    IN p_Branch_Id INT
)
BEGIN
    UPDATE Branch
    SET DeleteStatus = 1
    WHERE Branch_Id = p_Branch_Id;

    SELECT p_Branch_Id AS Branch_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

-- Department SPs
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Department_Save`(
    IN p_Department_Id INT,
    IN p_Department_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM Department
    WHERE Department_Name = p_Department_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Department_Id IS NULL OR p_Department_Id = 0 OR Department_Id <> p_Department_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Department_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Department_Id IS NULL OR p_Department_Id = 0 THEN
            INSERT INTO Department (Department_Name, Description, DeleteStatus)
            VALUES (p_Department_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Department_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE Department
            SET Department_Name = p_Department_Name, Description = p_Description
            WHERE Department_Id = p_Department_Id;

            SELECT p_Department_Id AS Department_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Department_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Department_Id, Department_Name, Description
        FROM Department
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Department_Name ASC
        LIMIT 20;
    ELSE
        SELECT Department_Id, Department_Name, Description
        FROM Department
        WHERE Department_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Department_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Department_Get`(
    IN p_Department_Id INT
)
BEGIN
    SELECT Department_Id, Department_Name, Description
    FROM Department
    WHERE Department_Id = p_Department_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Department_Delete`(
    IN p_Department_Id INT
)
BEGIN
    UPDATE Department
    SET DeleteStatus = 1
    WHERE Department_Id = p_Department_Id;

    SELECT p_Department_Id AS Department_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;
