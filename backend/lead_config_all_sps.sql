DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_CompanySize_Delete`(
    IN p_Company_Size_Id INT
)
BEGIN
    UPDATE CompanySize
    SET DeleteStatus = 1
    WHERE Company_Size_Id = p_Company_Size_Id;

    SELECT p_Company_Size_Id AS Company_Size_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_CompanySize_Get`(
    IN p_Company_Size_Id INT
)
BEGIN
    SELECT Company_Size_Id, Company_Size_Name, Description
    FROM CompanySize
    WHERE Company_Size_Id = p_Company_Size_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_CompanySize_Save`(
    IN p_Company_Size_Id INT,
    IN p_Company_Size_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM CompanySize
    WHERE Company_Size_Name = p_Company_Size_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Company_Size_Id IS NULL OR p_Company_Size_Id = 0 OR Company_Size_Id <> p_Company_Size_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Company_Size_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Company_Size_Id IS NULL OR p_Company_Size_Id = 0 THEN
            INSERT INTO CompanySize (Company_Size_Name, Description, DeleteStatus)
            VALUES (p_Company_Size_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Company_Size_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE CompanySize
            SET Company_Size_Name = p_Company_Size_Name, Description = p_Description
            WHERE Company_Size_Id = p_Company_Size_Id;

            SELECT p_Company_Size_Id AS Company_Size_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_CompanySize_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Company_Size_Id, Company_Size_Name, Description
        FROM CompanySize
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Company_Size_Name ASC
        LIMIT 20;
    ELSE
        SELECT Company_Size_Id, Company_Size_Name, Description
        FROM CompanySize
        WHERE Company_Size_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Company_Size_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Source_Delete`(
    IN p_Source_Id INT
)
BEGIN
    UPDATE Source
    SET DeleteStatus = 1
    WHERE Source_Id = p_Source_Id;

    SELECT p_Source_Id AS Source_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Source_Get`(
    IN p_Source_Id INT
)
BEGIN
    SELECT Source_Id, Source_Name, Description
    FROM Source
    WHERE Source_Id = p_Source_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Source_Save`(
    IN p_Source_Id INT,
    IN p_Source_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM Source
    WHERE Source_Name = p_Source_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Source_Id IS NULL OR p_Source_Id = 0 OR Source_Id <> p_Source_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Source_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Source_Id IS NULL OR p_Source_Id = 0 THEN
            INSERT INTO Source (Source_Name, Description, DeleteStatus)
            VALUES (p_Source_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Source_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE Source
            SET Source_Name = p_Source_Name, Description = p_Description
            WHERE Source_Id = p_Source_Id;

            SELECT p_Source_Id AS Source_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Source_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Source_Id, Source_Name, Description
        FROM Source
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Source_Name ASC
        LIMIT 20;
    ELSE
        SELECT Source_Id, Source_Name, Description
        FROM Source
        WHERE Source_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Source_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Designation_Delete`(
    IN p_Designation_Id INT
)
BEGIN
    UPDATE Designation
    SET DeleteStatus = 1
    WHERE Designation_Id = p_Designation_Id;

    SELECT p_Designation_Id AS Designation_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Designation_Get`(
    IN p_Designation_Id INT
)
BEGIN
    SELECT Designation_Id, Designation_Name, Description
    FROM Designation
    WHERE Designation_Id = p_Designation_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Designation_Save`(
    IN p_Designation_Id INT,
    IN p_Designation_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM Designation
    WHERE Designation_Name = p_Designation_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Designation_Id IS NULL OR p_Designation_Id = 0 OR Designation_Id <> p_Designation_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Designation_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Designation_Id IS NULL OR p_Designation_Id = 0 THEN
            INSERT INTO Designation (Designation_Name, Description, DeleteStatus)
            VALUES (p_Designation_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Designation_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE Designation
            SET Designation_Name = p_Designation_Name, Description = p_Description
            WHERE Designation_Id = p_Designation_Id;

            SELECT p_Designation_Id AS Designation_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Designation_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Designation_Id, Designation_Name, Description
        FROM Designation
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Designation_Name ASC
        LIMIT 20;
    ELSE
        SELECT Designation_Id, Designation_Name, Description
        FROM Designation
        WHERE Designation_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Designation_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_FollowupAutomation_Delete`(
    IN p_Followup_Automation_Id INT
)
BEGIN
    UPDATE FollowupAutomation
    SET DeleteStatus = 1
    WHERE Followup_Automation_Id = p_Followup_Automation_Id;

    SELECT p_Followup_Automation_Id AS Followup_Automation_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_FollowupAutomation_Get`(
    IN p_Followup_Automation_Id INT
)
BEGIN
    SELECT Followup_Automation_Id, Followup_Automation_Name, Description
    FROM FollowupAutomation
    WHERE Followup_Automation_Id = p_Followup_Automation_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_FollowupAutomation_Save`(
    IN p_Followup_Automation_Id INT,
    IN p_Followup_Automation_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM FollowupAutomation
    WHERE Followup_Automation_Name = p_Followup_Automation_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Followup_Automation_Id IS NULL OR p_Followup_Automation_Id = 0 OR Followup_Automation_Id <> p_Followup_Automation_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Followup_Automation_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Followup_Automation_Id IS NULL OR p_Followup_Automation_Id = 0 THEN
            INSERT INTO FollowupAutomation (Followup_Automation_Name, Description, DeleteStatus)
            VALUES (p_Followup_Automation_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Followup_Automation_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE FollowupAutomation
            SET Followup_Automation_Name = p_Followup_Automation_Name, Description = p_Description
            WHERE Followup_Automation_Id = p_Followup_Automation_Id;

            SELECT p_Followup_Automation_Id AS Followup_Automation_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_FollowupAutomation_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Followup_Automation_Id, Followup_Automation_Name, Description
        FROM FollowupAutomation
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Followup_Automation_Name ASC
        LIMIT 20;
    ELSE
        SELECT Followup_Automation_Id, Followup_Automation_Name, Description
        FROM FollowupAutomation
        WHERE Followup_Automation_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Followup_Automation_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_MarketSystem_Delete`(
    IN p_Market_System_Id INT
)
BEGIN
    UPDATE MarketSystem
    SET DeleteStatus = 1
    WHERE Market_System_Id = p_Market_System_Id;

    SELECT p_Market_System_Id AS Market_System_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_MarketSystem_Get`(
    IN p_Market_System_Id INT
)
BEGIN
    SELECT Market_System_Id, Market_System_Name, Description
    FROM MarketSystem
    WHERE Market_System_Id = p_Market_System_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_MarketSystem_Save`(
    IN p_Market_System_Id INT,
    IN p_Market_System_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM MarketSystem
    WHERE Market_System_Name = p_Market_System_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Market_System_Id IS NULL OR p_Market_System_Id = 0 OR Market_System_Id <> p_Market_System_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Market_System_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Market_System_Id IS NULL OR p_Market_System_Id = 0 THEN
            INSERT INTO MarketSystem (Market_System_Name, Description, DeleteStatus)
            VALUES (p_Market_System_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Market_System_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE MarketSystem
            SET Market_System_Name = p_Market_System_Name, Description = p_Description
            WHERE Market_System_Id = p_Market_System_Id;

            SELECT p_Market_System_Id AS Market_System_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_MarketSystem_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Market_System_Id, Market_System_Name, Description
        FROM MarketSystem
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Market_System_Name ASC
        LIMIT 20;
    ELSE
        SELECT Market_System_Id, Market_System_Name, Description
        FROM MarketSystem
        WHERE Market_System_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Market_System_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_PipelineStage_Delete`(
    IN p_Pipeline_Stage_Id INT
)
BEGIN
    UPDATE PipelineStage
    SET DeleteStatus = 1
    WHERE Pipeline_Stage_Id = p_Pipeline_Stage_Id;

    SELECT p_Pipeline_Stage_Id AS Pipeline_Stage_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_PipelineStage_Get`(
    IN p_Pipeline_Stage_Id INT
)
BEGIN
    SELECT Pipeline_Stage_Id, Pipeline_Stage_Name, Description
    FROM PipelineStage
    WHERE Pipeline_Stage_Id = p_Pipeline_Stage_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_PipelineStage_Save`(
    IN p_Pipeline_Stage_Id INT,
    IN p_Pipeline_Stage_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM PipelineStage
    WHERE Pipeline_Stage_Name = p_Pipeline_Stage_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Pipeline_Stage_Id IS NULL OR p_Pipeline_Stage_Id = 0 OR Pipeline_Stage_Id <> p_Pipeline_Stage_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Pipeline_Stage_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Pipeline_Stage_Id IS NULL OR p_Pipeline_Stage_Id = 0 THEN
            INSERT INTO PipelineStage (Pipeline_Stage_Name, Description, DeleteStatus)
            VALUES (p_Pipeline_Stage_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Pipeline_Stage_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE PipelineStage
            SET Pipeline_Stage_Name = p_Pipeline_Stage_Name, Description = p_Description
            WHERE Pipeline_Stage_Id = p_Pipeline_Stage_Id;

            SELECT p_Pipeline_Stage_Id AS Pipeline_Stage_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_PipelineStage_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Pipeline_Stage_Id, Pipeline_Stage_Name, Description
        FROM PipelineStage
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Pipeline_Stage_Name ASC
        LIMIT 20;
    ELSE
        SELECT Pipeline_Stage_Id, Pipeline_Stage_Name, Description
        FROM PipelineStage
        WHERE Pipeline_Stage_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Pipeline_Stage_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Pulse_Delete`(
    IN p_Pulse_Id INT
)
BEGIN
    UPDATE Pulse
    SET DeleteStatus = 1
    WHERE Pulse_Id = p_Pulse_Id;

    SELECT p_Pulse_Id AS Pulse_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Pulse_Get`(
    IN p_Pulse_Id INT
)
BEGIN
    SELECT Pulse_Id, Pulse_Name, Description
    FROM Pulse
    WHERE Pulse_Id = p_Pulse_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Pulse_Save`(
    IN p_Pulse_Id INT,
    IN p_Pulse_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM Pulse
    WHERE Pulse_Name = p_Pulse_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Pulse_Id IS NULL OR p_Pulse_Id = 0 OR Pulse_Id <> p_Pulse_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Pulse_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Pulse_Id IS NULL OR p_Pulse_Id = 0 THEN
            INSERT INTO Pulse (Pulse_Name, Description, DeleteStatus)
            VALUES (p_Pulse_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Pulse_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE Pulse
            SET Pulse_Name = p_Pulse_Name, Description = p_Description
            WHERE Pulse_Id = p_Pulse_Id;

            SELECT p_Pulse_Id AS Pulse_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Pulse_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Pulse_Id, Pulse_Name, Description
        FROM Pulse
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Pulse_Name ASC
        LIMIT 20;
    ELSE
        SELECT Pulse_Id, Pulse_Name, Description
        FROM Pulse
        WHERE Pulse_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Pulse_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_TargetStage_Delete`(
    IN p_Target_Stage_Id INT
)
BEGIN
    UPDATE TargetStage
    SET DeleteStatus = 1
    WHERE Target_Stage_Id = p_Target_Stage_Id;

    SELECT p_Target_Stage_Id AS Target_Stage_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_TargetStage_Get`(
    IN p_Target_Stage_Id INT
)
BEGIN
    SELECT Target_Stage_Id, Target_Stage_Name, Description
    FROM TargetStage
    WHERE Target_Stage_Id = p_Target_Stage_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_TargetStage_Save`(
    IN p_Target_Stage_Id INT,
    IN p_Target_Stage_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM TargetStage
    WHERE Target_Stage_Name = p_Target_Stage_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Target_Stage_Id IS NULL OR p_Target_Stage_Id = 0 OR Target_Stage_Id <> p_Target_Stage_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Target_Stage_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Target_Stage_Id IS NULL OR p_Target_Stage_Id = 0 THEN
            INSERT INTO TargetStage (Target_Stage_Name, Description, DeleteStatus)
            VALUES (p_Target_Stage_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Target_Stage_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE TargetStage
            SET Target_Stage_Name = p_Target_Stage_Name, Description = p_Description
            WHERE Target_Stage_Id = p_Target_Stage_Id;

            SELECT p_Target_Stage_Id AS Target_Stage_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_TargetStage_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Target_Stage_Id, Target_Stage_Name, Description
        FROM TargetStage
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Target_Stage_Name ASC
        LIMIT 20;
    ELSE
        SELECT Target_Stage_Id, Target_Stage_Name, Description
        FROM TargetStage
        WHERE Target_Stage_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Target_Stage_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_ServiceProduct_Delete`(
    IN p_Service_Product_Id INT
)
BEGIN
    UPDATE ServiceProduct
    SET DeleteStatus = 1
    WHERE Service_Product_Id = p_Service_Product_Id;

    SELECT p_Service_Product_Id AS Service_Product_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_ServiceProduct_Get`(
    IN p_Service_Product_Id INT
)
BEGIN
    SELECT Service_Product_Id, Service_Product_Name, Description
    FROM ServiceProduct
    WHERE Service_Product_Id = p_Service_Product_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_ServiceProduct_Save`(
    IN p_Service_Product_Id INT,
    IN p_Service_Product_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM ServiceProduct
    WHERE Service_Product_Name = p_Service_Product_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Service_Product_Id IS NULL OR p_Service_Product_Id = 0 OR Service_Product_Id <> p_Service_Product_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Service_Product_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Service_Product_Id IS NULL OR p_Service_Product_Id = 0 THEN
            INSERT INTO ServiceProduct (Service_Product_Name, Description, DeleteStatus)
            VALUES (p_Service_Product_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Service_Product_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE ServiceProduct
            SET Service_Product_Name = p_Service_Product_Name, Description = p_Description
            WHERE Service_Product_Id = p_Service_Product_Id;

            SELECT p_Service_Product_Id AS Service_Product_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_ServiceProduct_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Service_Product_Id, Service_Product_Name, Description
        FROM ServiceProduct
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Service_Product_Name ASC
        LIMIT 20;
    ELSE
        SELECT Service_Product_Id, Service_Product_Name, Description
        FROM ServiceProduct
        WHERE Service_Product_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Service_Product_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Assignment_Delete`(
    IN p_Assignment_Id INT
)
BEGIN
    UPDATE Assignment
    SET DeleteStatus = 1
    WHERE Assignment_Id = p_Assignment_Id;

    SELECT p_Assignment_Id AS Assignment_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Assignment_Get`(
    IN p_Assignment_Id INT
)
BEGIN
    SELECT Assignment_Id, Assignment_Name, Description
    FROM Assignment
    WHERE Assignment_Id = p_Assignment_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Assignment_Save`(
    IN p_Assignment_Id INT,
    IN p_Assignment_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM Assignment
    WHERE Assignment_Name = p_Assignment_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Assignment_Id IS NULL OR p_Assignment_Id = 0 OR Assignment_Id <> p_Assignment_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Assignment_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Assignment_Id IS NULL OR p_Assignment_Id = 0 THEN
            INSERT INTO Assignment (Assignment_Name, Description, DeleteStatus)
            VALUES (p_Assignment_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Assignment_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE Assignment
            SET Assignment_Name = p_Assignment_Name, Description = p_Description
            WHERE Assignment_Id = p_Assignment_Id;

            SELECT p_Assignment_Id AS Assignment_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Assignment_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Assignment_Id, Assignment_Name, Description
        FROM Assignment
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Assignment_Name ASC
        LIMIT 20;
    ELSE
        SELECT Assignment_Id, Assignment_Name, Description
        FROM Assignment
        WHERE Assignment_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Assignment_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_District_Delete`(
    IN p_District_Id INT
)
BEGIN
    UPDATE District
    SET DeleteStatus = 1
    WHERE District_Id = p_District_Id;

    SELECT p_District_Id AS District_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_District_Get`(
    IN p_District_Id INT
)
BEGIN
    SELECT District_Id, District_Name, State_Id
    FROM District
    WHERE District_Id = p_District_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_District_Save`(
    IN p_District_Id INT,
    IN p_District_Name VARCHAR(255),
    IN p_State_Id INT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM District
    WHERE District_Name = p_District_Name
      AND State_Id = p_State_Id
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_District_Id IS NULL OR p_District_Id = 0 OR District_Id <> p_District_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS District_Id_, 'Name already exists in this State' AS Message;
    ELSE
        IF p_District_Id IS NULL OR p_District_Id = 0 THEN
            INSERT INTO District (District_Name, State_Id, DeleteStatus)
            VALUES (p_District_Name, p_State_Id, 0);

            SELECT LAST_INSERT_ID() AS District_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE District
            SET District_Name = p_District_Name, State_Id = p_State_Id
            WHERE District_Id = p_District_Id;

            SELECT p_District_Id AS District_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_District_Search`(
    IN p_Search VARCHAR(255),
    IN p_State_Id INT
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT District_Id, District_Name, State_Id
        FROM District
        WHERE IFNULL(DeleteStatus, 0) = 0
          AND (p_State_Id IS NULL OR p_State_Id = 0 OR State_Id = p_State_Id)
        ORDER BY District_Name ASC
        LIMIT 20;
    ELSE
        SELECT District_Id, District_Name, State_Id
        FROM District
        WHERE District_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
          AND (p_State_Id IS NULL OR p_State_Id = 0 OR State_Id = p_State_Id)
        ORDER BY District_Name ASC;
    END IF;
END$$
DELIMITER ;

