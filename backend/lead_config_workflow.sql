-- Create Workflow table if it doesn't exist
CREATE TABLE IF NOT EXISTS `Workflow` (
  `Workflow_Id` INT NOT NULL AUTO_INCREMENT,
  `Workflow_Name` VARCHAR(255) DEFAULT NULL,
  `Description` TEXT DEFAULT NULL,
  `DeleteStatus` INT DEFAULT 0,
  PRIMARY KEY (`Workflow_Id`)
);

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Workflow_Save`(
    IN p_Workflow_Id INT,
    IN p_Workflow_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM Workflow
    WHERE Workflow_Name = p_Workflow_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Workflow_Id IS NULL OR p_Workflow_Id = 0 OR Workflow_Id <> p_Workflow_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Workflow_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Workflow_Id IS NULL OR p_Workflow_Id = 0 THEN
            INSERT INTO Workflow (Workflow_Name, Description, DeleteStatus)
            VALUES (p_Workflow_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Workflow_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE Workflow
            SET Workflow_Name = p_Workflow_Name, Description = p_Description
            WHERE Workflow_Id = p_Workflow_Id;

            SELECT p_Workflow_Id AS Workflow_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Workflow_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Workflow_Id, Workflow_Name, Description
        FROM Workflow
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Workflow_Name ASC
        LIMIT 20;
    ELSE
        SELECT Workflow_Id, Workflow_Name, Description
        FROM Workflow
        WHERE Workflow_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Workflow_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Workflow_Get`(
    IN p_Workflow_Id INT
)
BEGIN
    SELECT Workflow_Id, Workflow_Name, Description
    FROM Workflow
    WHERE Workflow_Id = p_Workflow_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Workflow_Delete`(
    IN p_Workflow_Id INT
)
BEGIN
    UPDATE Workflow
    SET DeleteStatus = 1
    WHERE Workflow_Id = p_Workflow_Id;

    SELECT p_Workflow_Id AS Workflow_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;
