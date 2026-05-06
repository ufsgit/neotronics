-- ============================================================
-- Migration: Multi-select Vertical + Enquiry_For in Lead
-- Run this once against your database
-- ============================================================

-- 1. Alter Lead table: change Vertical to VARCHAR for comma-separated IDs,
--    add Enquiry_For column
ALTER TABLE Lead
  MODIFY COLUMN Vertical VARCHAR(255) NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS Enquiry_For VARCHAR(255) NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS Contact_Number VARCHAR(50) NULL DEFAULT NULL;

-- 2. Drop and recreate Save_Lead SP with new params
DROP PROCEDURE IF EXISTS Save_Lead;

DELIMITER $$

CREATE PROCEDURE Save_Lead(
    IN p_Lead_Id          INT,
    IN p_Lead_Name        VARCHAR(255),
    IN p_Phone            VARCHAR(50),
    IN p_Source           INT,
    IN p_Contact_Person   VARCHAR(255),
    IN p_Contact_Number   VARCHAR(50),
    IN p_Vertical         VARCHAR(255),   -- comma-separated e.g. '1,3'
    IN p_Enquiry_For      INT,
    IN p_Designation      INT,
    IN p_Email            VARCHAR(255),
    IN p_Website          VARCHAR(255),
    IN p_Address          VARCHAR(500),
    IN p_Review           VARCHAR(500),
    IN p_Rate             VARCHAR(50),
    IN p_State            INT,
    IN p_District         INT,
    IN p_Department_Id    INT,
    IN p_Status_Id        INT,
    IN p_Staff_Id         INT,
    IN p_Remark           VARCHAR(1000),
    IN p_Is_FollowUp      TINYINT,
    IN p_FollowUp_Dept    INT,
    IN p_FollowUp_Status  INT,
    IN p_FollowUp_Staff   INT,
    IN p_FollowUp_Remark  VARCHAR(1000),
    IN p_FollowUp_Date    DATETIME,
    IN p_Login_User_Id    INT,
    IN p_Next_FollowUp    DATE
)
BEGIN
    IF p_Lead_Id = 0 THEN
        -- INSERT new lead
        INSERT INTO Lead (
            Lead_Name, Phone, Source, Contact_Person, Contact_Number, Vertical, Enquiry_For,
            Designation, Email, Website, Address, Review, Rate,
            State, District, Department_Id, Status_Id, Staff_Id, Remark,
            Is_FollowUp, Next_FollowUp_Date, Entry_Date
        ) VALUES (
            p_Lead_Name, p_Phone, p_Source, p_Contact_Person, p_Contact_Number, p_Vertical, p_Enquiry_For,
            p_Designation, p_Email, p_Website, p_Address, p_Review, p_Rate,
            p_State, p_District, p_Department_Id, p_Status_Id, p_Staff_Id, p_Remark,
            p_Is_FollowUp, p_Next_FollowUp, NOW()
        );
        SET p_Lead_Id = LAST_INSERT_ID();
        SELECT p_Lead_Id AS Key_Id;
    ELSE
        -- UPDATE existing lead
        UPDATE Lead SET
            Lead_Name       = p_Lead_Name,
            Phone           = p_Phone,
            Source          = p_Source,
            Contact_Person  = p_Contact_Person,
            Contact_Number  = p_Contact_Number,
            Vertical        = p_Vertical,
            Enquiry_For     = p_Enquiry_For,
            Designation     = p_Designation,
            Email           = p_Email,
            Website         = p_Website,
            Address         = p_Address,
            Review          = p_Review,
            Rate            = p_Rate,
            State           = p_State,
            District        = p_District,
            Department_Id   = p_Department_Id,
            Status_Id       = p_Status_Id,
            Staff_Id        = p_Staff_Id,
            Remark          = p_Remark,
            Is_FollowUp     = p_Is_FollowUp,
            Next_FollowUp_Date = p_Next_FollowUp
        WHERE Lead_Id = p_Lead_Id;
        SELECT p_Lead_Id AS Key_Id;
    END IF;

    -- Insert follow-up record if applicable
    IF p_Is_FollowUp = 1 THEN
        INSERT INTO Follow_up (
            Lead_Id, Department_Id, Status_Id, Staff_Id,
            Remark, FollowUp_Date, Next_FollowUp_Date, Login_User_Id
        ) VALUES (
            p_Lead_Id, p_FollowUp_Dept, p_FollowUp_Status, p_FollowUp_Staff,
            p_FollowUp_Remark, p_FollowUp_Date, p_Next_FollowUp, p_Login_User_Id
        );
    END IF;
END$$

DELIMITER ;
