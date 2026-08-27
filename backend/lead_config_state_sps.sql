DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_State_Delete`(
    IN p_State_Id INT
)
BEGIN
    UPDATE State
    SET DeleteStatus = 1
    WHERE State_Id = p_State_Id;

    SELECT p_State_Id AS State_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_State_Get`(
    IN p_State_Id INT
)
BEGIN
    SELECT State_Id, State_Name
    FROM State
    WHERE State_Id = p_State_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_State_Save`(
    IN p_State_Id INT,
    IN p_State_Name VARCHAR(255)
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    -- Check duplicate name (excluding deleted)
    SELECT COUNT(*) INTO v_Exists
    FROM State
    WHERE State_Name = p_State_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_State_Id IS NULL OR p_State_Id = 0 OR State_Id <> p_State_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS State_Id_, 'State Name already exists' AS Message;
    ELSE
        IF p_State_Id IS NULL OR p_State_Id = 0 THEN
            INSERT INTO State (State_Name, DeleteStatus)
            VALUES (p_State_Name, 0);

            SELECT LAST_INSERT_ID() AS State_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE State
            SET State_Name = p_State_Name
            WHERE State_Id = p_State_Id;

            SELECT p_State_Id AS State_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_State_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT State_Id, State_Name
        FROM State
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY State_Name ASC
        LIMIT 20;
    ELSE
        SELECT State_Id, State_Name
        FROM State
        WHERE State_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY State_Name ASC;
    END IF;
END$$
DELIMITER ;
