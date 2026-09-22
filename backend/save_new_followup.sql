-- ============================================================
--  SP: Save_NewFollowUp
--  Purpose : Update a lead's follow-up details and maintain
--            pipeline-pulse history + ghosting history.
--  Inputs  : all follow-up fields + Login_User_Id
--  Output  : p_Success (1 = ok), p_Message
-- ============================================================

DROP PROCEDURE IF EXISTS Save_NewFollowUp;

DELIMITER $$

CREATE PROCEDURE Save_NewFollowUp(
    -- Lead identifier
    IN  p_Lead_Id               INT,

    -- Assignment
    IN  p_Branch_Id             INT,
    IN  p_Branch_Name           VARCHAR(255),
    IN  p_Department_Id         INT,
    IN  p_Department_Name       VARCHAR(255),
    IN  p_Staff_Id              INT,
    IN  p_Staff_Name            VARCHAR(255),

    -- Follow-up fields
    IN  p_Next_FollowUp_Date    DATE,
    IN  p_Remark                TEXT,
    IN  p_Followup_Required     TINYINT,        -- 1 = yes, 0 = no

    -- Pipeline / Pulse
    IN  p_PipelineStage_Id      INT,
    IN  p_Pipeline_Stage        VARCHAR(255),
    IN  p_Stage_Type            TINYINT,
    IN  p_Color                 VARCHAR(20),
    IN  p_Pulse_Id              INT,
    IN  p_Pulse                 VARCHAR(100),
    IN  p_isGhosting            TINYINT,
    -- Status / Target stage
    IN  p_Status_Id             INT,
    IN  p_Status_Name           VARCHAR(255),

    -- Audit
    IN  p_Login_User_Id         INT,

    -- Output
    OUT p_Success               TINYINT,
    OUT p_Message               VARCHAR(255)
)
sp_label: BEGIN

    -- ── local variables ──────────────────────────────────────
    DECLARE v_prev_PipelineStage_Id  INT     DEFAULT NULL;
    DECLARE v_prev_Pulse_Id          INT     DEFAULT NULL;
    DECLARE v_prev_Pulse             VARCHAR(100) DEFAULT NULL;
    DECLARE v_login_user_name        VARCHAR(255) DEFAULT NULL;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_Success = 0;
        SET p_Message = 'An error occurred. Transaction rolled back.';
    END;

    -- ── 1. Validate ──────────────────────────────────────────
    IF p_Lead_Id IS NULL OR p_Lead_Id = 0 THEN
        SET p_Success = 0;
        SET p_Message = 'Lead_Id is required.';
        LEAVE sp_label;   -- exit early (needs label below)
    END IF;

    -- Transaction starts here
    START TRANSACTION;

        -- ── 2. Read current lead state (before update) ───────
        SELECT PipelineStage_Id, Pulse_Id, Pulse
        INTO   v_prev_PipelineStage_Id, v_prev_Pulse_Id, v_prev_Pulse
        FROM   `lead`
        WHERE  Lead_Id = p_Lead_Id
        LIMIT  1;

        -- ── 3. Update the lead row ───────────────────────────
        UPDATE `lead`
        SET
            Branch_Id              = p_Branch_Id,
            Branch_Name            = p_Branch_Name,
            Department_Id          = p_Department_Id,
            Department_Name        = p_Department_Name,
            Staff_Id               = p_Staff_Id,
            Staff_Name             = p_Staff_Name,
            Next_FollowUp_Date     = p_Next_FollowUp_Date,
            Remarks                = p_Remark,
            PipelineStage_Id       = p_PipelineStage_Id,
            Current_Pipeline_Stage = p_Pipeline_Stage,
            Stage_Type             = IFNULL(p_Stage_Type, 0),
            Followup_Required      = IFNULL(p_Followup_Required, 1),
            Color                  = IFNULL(p_Color, '#3b82f6'),
            isGhosting             = CASE WHEN p_Pulse = 'Ghosting' THEN 1 ELSE IFNULL(p_isGhosting, 0) END,
            Pulse_Id               = p_Pulse_Id,
            Pulse                  = p_Pulse,
            Status_Id              = p_Status_Id,
            Status_Name            = p_Status_Name,
            
            sale_won               = CASE WHEN p_Stage_Type = 1 THEN 1 ELSE 0 END,
            sale_won_date          = CASE WHEN p_Stage_Type = 1 THEN IFNULL(sale_won_date, CURRENT_TIMESTAMP) ELSE NULL END,
            sale_won_by            = CASE WHEN p_Stage_Type = 1 THEN p_Staff_Id ELSE NULL END,
            
            sale_lost              = CASE WHEN p_Stage_Type = 2 THEN 1 ELSE 0 END,
            sale_lost_date         = CASE WHEN p_Stage_Type = 2 THEN IFNULL(sale_lost_date, CURRENT_TIMESTAMP) ELSE NULL END,
            sale_lost_by           = CASE WHEN p_Stage_Type = 2 THEN p_Staff_Id ELSE NULL END
            
        WHERE Lead_Id = p_Lead_Id;

        -- ── 4. Pipeline + Pulse history ──────────────────────
        --       Only record if stage OR pulse actually changed
        IF (v_prev_PipelineStage_Id <> p_PipelineStage_Id OR v_prev_Pulse_Id <> p_Pulse_Id)
           OR (v_prev_PipelineStage_Id IS NULL OR v_prev_Pulse_Id IS NULL) THEN

            -- Close old active record
            UPDATE `lead_pipeline_pulse_history`
            SET    Current_Status = '0'
            WHERE  Lead_Id        = p_Lead_Id
              AND  Current_Status = '1';

            -- Insert new snapshot directly from the just-updated lead row
            INSERT INTO `lead_pipeline_pulse_history`
                (Lead_Id, PipelineStage_Id, Pipeline_Stage, Stage_Type,
                 Followup_Required, Color, Pulse_Id, Pulse,isGhosting, Current_Status, Login_User_Id)
            SELECT
                Lead_Id, PipelineStage_Id, Current_Pipeline_Stage,
                IFNULL(Stage_Type, 0), IFNULL(Followup_Required, 1),
                IFNULL(Color, '#3b82f6'), Pulse_Id, Pulse, IFNULL(isGhosting, 0),'1', p_Login_User_Id
            FROM `lead`
            WHERE Lead_Id = p_Lead_Id;

        END IF;

        -- ── 5. Ghosting history ──────────────────────────────
        --       Always act on ghosting to keep history updated with latest branch/staff

        -- If the lead WAS ghosting, close that record
        IF v_prev_Pulse = 'Ghosting' THEN
            UPDATE `lead_ghosting_history`
            SET    isCurrent       = 0,
                   Current_Status  = '0'
            WHERE  Lead_Id         = p_Lead_Id
              AND  isCurrent       = 1;
        END IF;

        -- If the lead IS NOW ghosting, open a new record
        IF p_Pulse = 'Ghosting' THEN

            -- Resolve the login user's display name once
            SELECT User_Details_Name
            INTO   v_login_user_name
            FROM   User_Details
            WHERE  User_Details_Id = p_Login_User_Id
            LIMIT  1;

            INSERT INTO `lead_ghosting_history`
                (Lead_Id, Lead_Name, Lead_Type,
                 PipelineStage_Id, Pipeline_Stage, Stage_Type,
                 Followup_Required, Color, Pulse_Id, Pulse,
                 Current_Status, Login_User_Id, login_user_name,
                 Branch_Id, Branch_Name, Department_Id, Department_Name,
                 Staff_Id, Staff_Name, Source_Id, Source_Name, isCurrent)
            SELECT
                Lead_Id, Lead_Name, Lead_Type,
                PipelineStage_Id, Current_Pipeline_Stage,
                IFNULL(Stage_Type, 0), IFNULL(Followup_Required, 1),
                IFNULL(Color, '#3b82f6'), Pulse_Id, Pulse,
                '1', p_Login_User_Id, v_login_user_name,
                Branch_Id, Branch_Name, Department_Id, Department_Name,
                Staff_Id, Staff_Name, Source, Source_Name, 1
            FROM `lead`
            WHERE Lead_Id = p_Lead_Id;

        END IF;

        -- ── 6. Insert into follow_up table ──────────────────────
        INSERT INTO `follow_up` (
            Lead_Id, Lead_Type,
            Status_Id, Status_Name,
            Branch_Id, Branch_Name,
            Department_Id, Department_Name,
            Staff_Id, Staff_Name,
            Remark, Next_FollowUp_Date,
            PipelineStage_Id, Pipeline_Stage, Stage_Type,
            Followup_Required, Color,
            Pulse_Id, Pulse, isGhosting,
            Login_User_Id
        )
        SELECT
            Lead_Id, Lead_Type,
            p_Status_Id, p_Status_Name,
            p_Branch_Id, p_Branch_Name,
            p_Department_Id, p_Department_Name,
            p_Staff_Id, p_Staff_Name,
            p_Remark, p_Next_FollowUp_Date,
            p_PipelineStage_Id, p_Pipeline_Stage, IFNULL(p_Stage_Type, 0),
            IFNULL(p_Followup_Required, 1), IFNULL(p_Color, '#3b82f6'),
            p_Pulse_Id, p_Pulse, isGhosting,
            p_Login_User_Id
        FROM `lead`
        WHERE Lead_Id = p_Lead_Id;

        COMMIT;

        SET p_Success = 1;
        SET p_Message = 'Lead follow-up saved successfully.';

END$$

DELIMITER ;
