DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Vertical_Delete`(
    IN p_Vertical_Id INT
)
BEGIN
    UPDATE Vertical
    SET DeleteStatus = 1
    WHERE Vertical_Id = p_Vertical_Id;

    SELECT p_Vertical_Id AS Vertical_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Vertical_Get`(
    IN p_Vertical_Id INT
)
BEGIN
    SELECT Vertical_Id, Vertical_Name, Description
    FROM Vertical
    WHERE Vertical_Id = p_Vertical_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Vertical_Save`(
    IN p_Vertical_Id INT,
    IN p_Vertical_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    -- Check duplicate name (excluding deleted)
    SELECT COUNT(*) INTO v_Exists
    FROM Vertical
    WHERE Vertical_Name = p_Vertical_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Vertical_Id IS NULL OR p_Vertical_Id = 0 OR Vertical_Id <> p_Vertical_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Vertical_Id_, 'Industry / Vertical Name already exists' AS Message;
    ELSE
        IF p_Vertical_Id > 0 THEN
            -- Update existing record
            UPDATE Vertical
            SET Vertical_Name = p_Vertical_Name,
                Description   = p_Description
            WHERE Vertical_Id = p_Vertical_Id;

            SELECT p_Vertical_Id AS Vertical_Id_, 'Saved Successfully' AS Message;
        ELSE
            -- Insert new record
            INSERT INTO Vertical (Vertical_Name, Description, DeleteStatus)
            VALUES (p_Vertical_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Vertical_Id_, 'Saved Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Vertical_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Vertical_Id, Vertical_Name, Description
        FROM Vertical
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Vertical_Name ASC
        LIMIT 20;
    ELSE
        SELECT Vertical_Id, Vertical_Name, Description
        FROM Vertical
        WHERE Vertical_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Vertical_Name ASC
        LIMIT 20;
    END IF;
END$$
DELIMITER ;
