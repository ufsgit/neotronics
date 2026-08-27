
DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_CompanySize_Save`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_CompanySize_Save`(
    IN p_Company_Size_Id INT,
    IN p_Company_Size_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM company_size
    WHERE Company_Size_Name = p_Company_Size_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Company_Size_Id IS NULL OR p_Company_Size_Id = 0 OR Company_Size_Id <> p_Company_Size_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Company_Size_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Company_Size_Id IS NULL OR p_Company_Size_Id = 0 THEN
            INSERT INTO company_size (Company_Size_Name, Description, DeleteStatus)
            VALUES (p_Company_Size_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Company_Size_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE company_size
            SET Company_Size_Name = p_Company_Size_Name, Description = p_Description
            WHERE Company_Size_Id = p_Company_Size_Id;

            SELECT p_Company_Size_Id AS Company_Size_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_CompanySize_Search`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_CompanySize_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Company_Size_Id AS Company_Size_Id, Company_Size_Name AS Company_Size_Name, Description
        FROM company_size
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Company_Size_Name ASC
        LIMIT 20;
    ELSE
        SELECT Company_Size_Id AS Company_Size_Id, Company_Size_Name AS Company_Size_Name, Description
        FROM company_size
        WHERE Company_Size_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Company_Size_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_CompanySize_Get`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_CompanySize_Get`(
    IN p_Company_Size_Id INT
)
BEGIN
    SELECT Company_Size_Id AS Company_Size_Id, Company_Size_Name AS Company_Size_Name, Description
    FROM company_size
    WHERE Company_Size_Id = p_Company_Size_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_CompanySize_Delete`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_CompanySize_Delete`(
    IN p_Company_Size_Id INT
)
BEGIN
    UPDATE company_size
    SET DeleteStatus = 1
    WHERE Company_Size_Id = p_Company_Size_Id;

    SELECT p_Company_Size_Id AS Company_Size_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

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
    FROM source_master
    WHERE Source_Name = p_Source_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Source_Id IS NULL OR p_Source_Id = 0 OR Source_Id <> p_Source_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Source_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Source_Id IS NULL OR p_Source_Id = 0 THEN
            INSERT INTO source_master (Source_Name, Description, DeleteStatus)
            VALUES (p_Source_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Source_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE source_master
            SET Source_Name = p_Source_Name, Description = p_Description
            WHERE Source_Id = p_Source_Id;

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
        SELECT Source_Id AS Source_Id, Source_Name AS Source_Name, Description
        FROM source_master
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Source_Name ASC
        LIMIT 20;
    ELSE
        SELECT Source_Id AS Source_Id, Source_Name AS Source_Name, Description
        FROM source_master
        WHERE Source_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Source_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Source_Get`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Source_Get`(
    IN p_Source_Id INT
)
BEGIN
    SELECT Source_Id AS Source_Id, Source_Name AS Source_Name, Description
    FROM source_master
    WHERE Source_Id = p_Source_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Source_Delete`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Source_Delete`(
    IN p_Source_Id INT
)
BEGIN
    UPDATE source_master
    SET DeleteStatus = 1
    WHERE Source_Id = p_Source_Id;

    SELECT p_Source_Id AS Source_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Designation_Save`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Designation_Save`(
    IN p_Designation_Id INT,
    IN p_Designation_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM designation
    WHERE Designation_Name = p_Designation_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Designation_Id IS NULL OR p_Designation_Id = 0 OR Designation_Id <> p_Designation_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Designation_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Designation_Id IS NULL OR p_Designation_Id = 0 THEN
            INSERT INTO designation (Designation_Name, Description, DeleteStatus)
            VALUES (p_Designation_Name, p_Description, 0);

            SELECT LAST_INSERT_ID() AS Designation_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE designation
            SET Designation_Name = p_Designation_Name, Description = p_Description
            WHERE Designation_Id = p_Designation_Id;

            SELECT p_Designation_Id AS Designation_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Designation_Search`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Designation_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Designation_Id AS Designation_Id, Designation_Name AS Designation_Name, Description
        FROM designation
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Designation_Name ASC
        LIMIT 20;
    ELSE
        SELECT Designation_Id AS Designation_Id, Designation_Name AS Designation_Name, Description
        FROM designation
        WHERE Designation_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Designation_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Designation_Get`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Designation_Get`(
    IN p_Designation_Id INT
)
BEGIN
    SELECT Designation_Id AS Designation_Id, Designation_Name AS Designation_Name, Description
    FROM designation
    WHERE Designation_Id = p_Designation_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Designation_Delete`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Designation_Delete`(
    IN p_Designation_Id INT
)
BEGIN
    UPDATE designation
    SET DeleteStatus = 1
    WHERE Designation_Id = p_Designation_Id;

    SELECT p_Designation_Id AS Designation_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_MarketSystem_Save`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_MarketSystem_Save`(
    IN p_Market_System_Id INT,
    IN p_Market_System_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM marketsystem_master
    WHERE MarketSystem_Name = p_Market_System_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Market_System_Id IS NULL OR p_Market_System_Id = 0 OR MarketSystem_Id <> p_Market_System_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Market_System_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Market_System_Id IS NULL OR p_Market_System_Id = 0 THEN
            INSERT INTO marketsystem_master (MarketSystem_Name, DeleteStatus)
            VALUES (p_Market_System_Name, 0);

            SELECT LAST_INSERT_ID() AS Market_System_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE marketsystem_master
            SET MarketSystem_Name = p_Market_System_Name
            WHERE MarketSystem_Id = p_Market_System_Id;

            SELECT p_Market_System_Id AS Market_System_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_MarketSystem_Search`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_MarketSystem_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT MarketSystem_Id AS Market_System_Id, MarketSystem_Name AS Market_System_Name, NULL AS Description
        FROM marketsystem_master
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY MarketSystem_Name ASC
        LIMIT 20;
    ELSE
        SELECT MarketSystem_Id AS Market_System_Id, MarketSystem_Name AS Market_System_Name, NULL AS Description
        FROM marketsystem_master
        WHERE MarketSystem_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY MarketSystem_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_MarketSystem_Get`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_MarketSystem_Get`(
    IN p_Market_System_Id INT
)
BEGIN
    SELECT MarketSystem_Id AS Market_System_Id, MarketSystem_Name AS Market_System_Name, NULL AS Description
    FROM marketsystem_master
    WHERE MarketSystem_Id = p_Market_System_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_MarketSystem_Delete`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_MarketSystem_Delete`(
    IN p_Market_System_Id INT
)
BEGIN
    UPDATE marketsystem_master
    SET DeleteStatus = 1
    WHERE MarketSystem_Id = p_Market_System_Id;

    SELECT p_Market_System_Id AS Market_System_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_PipelineStage_Save`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_PipelineStage_Save`(
    IN p_Pipeline_Stage_Id INT,
    IN p_Pipeline_Stage_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM pipeline_stage_master
    WHERE PipelineStage_Name = p_Pipeline_Stage_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Pipeline_Stage_Id IS NULL OR p_Pipeline_Stage_Id = 0 OR PipelineStage_Id <> p_Pipeline_Stage_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Pipeline_Stage_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Pipeline_Stage_Id IS NULL OR p_Pipeline_Stage_Id = 0 THEN
            INSERT INTO pipeline_stage_master (PipelineStage_Name, DeleteStatus)
            VALUES (p_Pipeline_Stage_Name, 0);

            SELECT LAST_INSERT_ID() AS Pipeline_Stage_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE pipeline_stage_master
            SET PipelineStage_Name = p_Pipeline_Stage_Name
            WHERE PipelineStage_Id = p_Pipeline_Stage_Id;

            SELECT p_Pipeline_Stage_Id AS Pipeline_Stage_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_PipelineStage_Search`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_PipelineStage_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT PipelineStage_Id AS Pipeline_Stage_Id, PipelineStage_Name AS Pipeline_Stage_Name, NULL AS Description
        FROM pipeline_stage_master
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY PipelineStage_Name ASC
        LIMIT 20;
    ELSE
        SELECT PipelineStage_Id AS Pipeline_Stage_Id, PipelineStage_Name AS Pipeline_Stage_Name, NULL AS Description
        FROM pipeline_stage_master
        WHERE PipelineStage_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY PipelineStage_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_PipelineStage_Get`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_PipelineStage_Get`(
    IN p_Pipeline_Stage_Id INT
)
BEGIN
    SELECT PipelineStage_Id AS Pipeline_Stage_Id, PipelineStage_Name AS Pipeline_Stage_Name, NULL AS Description
    FROM pipeline_stage_master
    WHERE PipelineStage_Id = p_Pipeline_Stage_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_PipelineStage_Delete`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_PipelineStage_Delete`(
    IN p_Pipeline_Stage_Id INT
)
BEGIN
    UPDATE pipeline_stage_master
    SET DeleteStatus = 1
    WHERE PipelineStage_Id = p_Pipeline_Stage_Id;

    SELECT p_Pipeline_Stage_Id AS Pipeline_Stage_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Pulse_Save`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Pulse_Save`(
    IN p_Pulse_Id INT,
    IN p_Pulse_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM pulse_master
    WHERE Pulse_Name = p_Pulse_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Pulse_Id IS NULL OR p_Pulse_Id = 0 OR Pulse_Id <> p_Pulse_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Pulse_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Pulse_Id IS NULL OR p_Pulse_Id = 0 THEN
            INSERT INTO pulse_master (Pulse_Name, DeleteStatus)
            VALUES (p_Pulse_Name, 0);

            SELECT LAST_INSERT_ID() AS Pulse_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE pulse_master
            SET Pulse_Name = p_Pulse_Name
            WHERE Pulse_Id = p_Pulse_Id;

            SELECT p_Pulse_Id AS Pulse_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Pulse_Search`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Pulse_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Pulse_Id AS Pulse_Id, Pulse_Name AS Pulse_Name, NULL AS Description
        FROM pulse_master
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Pulse_Name ASC
        LIMIT 20;
    ELSE
        SELECT Pulse_Id AS Pulse_Id, Pulse_Name AS Pulse_Name, NULL AS Description
        FROM pulse_master
        WHERE Pulse_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Pulse_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Pulse_Get`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Pulse_Get`(
    IN p_Pulse_Id INT
)
BEGIN
    SELECT Pulse_Id AS Pulse_Id, Pulse_Name AS Pulse_Name, NULL AS Description
    FROM pulse_master
    WHERE Pulse_Id = p_Pulse_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Pulse_Delete`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Pulse_Delete`(
    IN p_Pulse_Id INT
)
BEGIN
    UPDATE pulse_master
    SET DeleteStatus = 1
    WHERE Pulse_Id = p_Pulse_Id;

    SELECT p_Pulse_Id AS Pulse_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_TargetStage_Save`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_TargetStage_Save`(
    IN p_Target_Stage_Id INT,
    IN p_Target_Stage_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM target_stage_master
    WHERE TargetStage_Name = p_Target_Stage_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Target_Stage_Id IS NULL OR p_Target_Stage_Id = 0 OR TargetStage_Id <> p_Target_Stage_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Target_Stage_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Target_Stage_Id IS NULL OR p_Target_Stage_Id = 0 THEN
            INSERT INTO target_stage_master (TargetStage_Name, DeleteStatus)
            VALUES (p_Target_Stage_Name, 0);

            SELECT LAST_INSERT_ID() AS Target_Stage_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE target_stage_master
            SET TargetStage_Name = p_Target_Stage_Name
            WHERE TargetStage_Id = p_Target_Stage_Id;

            SELECT p_Target_Stage_Id AS Target_Stage_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_TargetStage_Search`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_TargetStage_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT TargetStage_Id AS Target_Stage_Id, TargetStage_Name AS Target_Stage_Name, NULL AS Description
        FROM target_stage_master
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY TargetStage_Name ASC
        LIMIT 20;
    ELSE
        SELECT TargetStage_Id AS Target_Stage_Id, TargetStage_Name AS Target_Stage_Name, NULL AS Description
        FROM target_stage_master
        WHERE TargetStage_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY TargetStage_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_TargetStage_Get`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_TargetStage_Get`(
    IN p_Target_Stage_Id INT
)
BEGIN
    SELECT TargetStage_Id AS Target_Stage_Id, TargetStage_Name AS Target_Stage_Name, NULL AS Description
    FROM target_stage_master
    WHERE TargetStage_Id = p_Target_Stage_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_TargetStage_Delete`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_TargetStage_Delete`(
    IN p_Target_Stage_Id INT
)
BEGIN
    UPDATE target_stage_master
    SET DeleteStatus = 1
    WHERE TargetStage_Id = p_Target_Stage_Id;

    SELECT p_Target_Stage_Id AS Target_Stage_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_ServiceProduct_Save`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_ServiceProduct_Save`(
    IN p_Service_Product_Id INT,
    IN p_Service_Product_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM serviceinterest_master
    WHERE ServiceInterest_Name = p_Service_Product_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Service_Product_Id IS NULL OR p_Service_Product_Id = 0 OR ServiceInterest_Id <> p_Service_Product_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Service_Product_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Service_Product_Id IS NULL OR p_Service_Product_Id = 0 THEN
            INSERT INTO serviceinterest_master (ServiceInterest_Name, DeleteStatus)
            VALUES (p_Service_Product_Name, 0);

            SELECT LAST_INSERT_ID() AS Service_Product_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE serviceinterest_master
            SET ServiceInterest_Name = p_Service_Product_Name
            WHERE ServiceInterest_Id = p_Service_Product_Id;

            SELECT p_Service_Product_Id AS Service_Product_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_ServiceProduct_Search`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_ServiceProduct_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT ServiceInterest_Id AS Service_Product_Id, ServiceInterest_Name AS Service_Product_Name, NULL AS Description
        FROM serviceinterest_master
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY ServiceInterest_Name ASC
        LIMIT 20;
    ELSE
        SELECT ServiceInterest_Id AS Service_Product_Id, ServiceInterest_Name AS Service_Product_Name, NULL AS Description
        FROM serviceinterest_master
        WHERE ServiceInterest_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY ServiceInterest_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_ServiceProduct_Get`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_ServiceProduct_Get`(
    IN p_Service_Product_Id INT
)
BEGIN
    SELECT ServiceInterest_Id AS Service_Product_Id, ServiceInterest_Name AS Service_Product_Name, NULL AS Description
    FROM serviceinterest_master
    WHERE ServiceInterest_Id = p_Service_Product_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_ServiceProduct_Delete`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_ServiceProduct_Delete`(
    IN p_Service_Product_Id INT
)
BEGIN
    UPDATE serviceinterest_master
    SET DeleteStatus = 1
    WHERE ServiceInterest_Id = p_Service_Product_Id;

    SELECT p_Service_Product_Id AS Service_Product_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Branch_Save`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Branch_Save`(
    IN p_Assignment_Id INT,
    IN p_Assignment_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM branch_master
    WHERE Branch_Name = p_Assignment_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Assignment_Id IS NULL OR p_Assignment_Id = 0 OR Branch_Id <> p_Assignment_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Assignment_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Assignment_Id IS NULL OR p_Assignment_Id = 0 THEN
            INSERT INTO branch_master (Branch_Name, DeleteStatus)
            VALUES (p_Assignment_Name, 0);

            SELECT LAST_INSERT_ID() AS Assignment_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE branch_master
            SET Branch_Name = p_Assignment_Name
            WHERE Branch_Id = p_Assignment_Id;

            SELECT p_Assignment_Id AS Assignment_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Branch_Search`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Branch_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Branch_Id AS Assignment_Id, Branch_Name AS Assignment_Name, NULL AS Description
        FROM branch_master
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Branch_Name ASC
        LIMIT 20;
    ELSE
        SELECT Branch_Id AS Assignment_Id, Branch_Name AS Assignment_Name, NULL AS Description
        FROM branch_master
        WHERE Branch_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Branch_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Branch_Get`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Branch_Get`(
    IN p_Assignment_Id INT
)
BEGIN
    SELECT Branch_Id AS Assignment_Id, Branch_Name AS Assignment_Name, NULL AS Description
    FROM branch_master
    WHERE Branch_Id = p_Assignment_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Branch_Delete`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Branch_Delete`(
    IN p_Assignment_Id INT
)
BEGIN
    UPDATE branch_master
    SET DeleteStatus = 1
    WHERE Branch_Id = p_Assignment_Id;

    SELECT p_Assignment_Id AS Assignment_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Workflow_Save`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Workflow_Save`(
    IN p_Followup_Automation_Id INT,
    IN p_Followup_Automation_Name VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM workflow_master
    WHERE Workflow_Name = p_Followup_Automation_Name
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_Followup_Automation_Id IS NULL OR p_Followup_Automation_Id = 0 OR Workflow_Id <> p_Followup_Automation_Id);

    IF v_Exists > 0 THEN
        SELECT 0 AS Followup_Automation_Id_, 'Name already exists' AS Message;
    ELSE
        IF p_Followup_Automation_Id IS NULL OR p_Followup_Automation_Id = 0 THEN
            INSERT INTO workflow_master (Workflow_Name, DeleteStatus)
            VALUES (p_Followup_Automation_Name, 0);

            SELECT LAST_INSERT_ID() AS Followup_Automation_Id_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE workflow_master
            SET Workflow_Name = p_Followup_Automation_Name
            WHERE Workflow_Id = p_Followup_Automation_Id;

            SELECT p_Followup_Automation_Id AS Followup_Automation_Id_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Workflow_Search`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Workflow_Search`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT Workflow_Id AS Followup_Automation_Id, Workflow_Name AS Followup_Automation_Name, NULL AS Description
        FROM workflow_master
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY Workflow_Name ASC
        LIMIT 20;
    ELSE
        SELECT Workflow_Id AS Followup_Automation_Id, Workflow_Name AS Followup_Automation_Name, NULL AS Description
        FROM workflow_master
        WHERE Workflow_Name LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY Workflow_Name ASC;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Workflow_Get`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Workflow_Get`(
    IN p_Followup_Automation_Id INT
)
BEGIN
    SELECT Workflow_Id AS Followup_Automation_Id, Workflow_Name AS Followup_Automation_Name, NULL AS Description
    FROM workflow_master
    WHERE Workflow_Id = p_Followup_Automation_Id
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `LC_Workflow_Delete`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LC_Workflow_Delete`(
    IN p_Followup_Automation_Id INT
)
BEGIN
    UPDATE workflow_master
    SET DeleteStatus = 1
    WHERE Workflow_Id = p_Followup_Automation_Id;

    SELECT p_Followup_Automation_Id AS Followup_Automation_Id_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;
