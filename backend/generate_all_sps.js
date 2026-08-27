const fs = require('fs');

const configs = [
    { spPrefix: 'LC_CompanySize', table: 'CompanySize', idCol: 'Company_Size_Id', nameCol: 'Company_Size_Name', hasDesc: true },
    { spPrefix: 'LC_Source', table: 'Source', idCol: 'Source_Id', nameCol: 'Source_Name', hasDesc: true },
    { spPrefix: 'LC_Designation', table: 'Designation', idCol: 'Designation_Id', nameCol: 'Designation_Name', hasDesc: true },
    { spPrefix: 'LC_FollowupAutomation', table: 'FollowupAutomation', idCol: 'Followup_Automation_Id', nameCol: 'Followup_Automation_Name', hasDesc: true },
    { spPrefix: 'LC_MarketSystem', table: 'MarketSystem', idCol: 'Market_System_Id', nameCol: 'Market_System_Name', hasDesc: true },
    { spPrefix: 'LC_PipelineStage', table: 'PipelineStage', idCol: 'Pipeline_Stage_Id', nameCol: 'Pipeline_Stage_Name', hasDesc: true },
    { spPrefix: 'LC_Pulse', table: 'Pulse', idCol: 'Pulse_Id', nameCol: 'Pulse_Name', hasDesc: true },
    { spPrefix: 'LC_TargetStage', table: 'TargetStage', idCol: 'Target_Stage_Id', nameCol: 'Target_Stage_Name', hasDesc: true },
    { spPrefix: 'LC_ServiceProduct', table: 'ServiceProduct', idCol: 'Service_Product_Id', nameCol: 'Service_Product_Name', hasDesc: true },
    { spPrefix: 'LC_Assignment', table: 'Assignment', idCol: 'Assignment_Id', nameCol: 'Assignment_Name', hasDesc: true },
    { spPrefix: 'LC_District', table: 'District', idCol: 'District_Id', nameCol: 'District_Name', hasState: true }
];

let sql = '';

for (const c of configs) {
    // Delete
    sql += `DELIMITER $$\nCREATE DEFINER=\`root\`@\`localhost\` PROCEDURE \`${c.spPrefix}_Delete\`(
    IN p_${c.idCol} INT
)
BEGIN
    UPDATE ${c.table}
    SET DeleteStatus = 1
    WHERE ${c.idCol} = p_${c.idCol};

    SELECT p_${c.idCol} AS ${c.idCol}_, 'Deleted Successfully' AS Message;
END$$\nDELIMITER ;\n\n`;

    // Get
    if (c.hasDesc) {
        sql += `DELIMITER $$\nCREATE DEFINER=\`root\`@\`localhost\` PROCEDURE \`${c.spPrefix}_Get\`(
    IN p_${c.idCol} INT
)
BEGIN
    SELECT ${c.idCol}, ${c.nameCol}, Description
    FROM ${c.table}
    WHERE ${c.idCol} = p_${c.idCol}
      AND IFNULL(DeleteStatus, 0) = 0;
END$$\nDELIMITER ;\n\n`;
    } else if (c.hasState) {
        sql += `DELIMITER $$\nCREATE DEFINER=\`root\`@\`localhost\` PROCEDURE \`${c.spPrefix}_Get\`(
    IN p_${c.idCol} INT
)
BEGIN
    SELECT ${c.idCol}, ${c.nameCol}, State_Id
    FROM ${c.table}
    WHERE ${c.idCol} = p_${c.idCol}
      AND IFNULL(DeleteStatus, 0) = 0;
END$$\nDELIMITER ;\n\n`;
    }

    // Save
    if (c.hasDesc) {
        sql += `DELIMITER $$\nCREATE DEFINER=\`root\`@\`localhost\` PROCEDURE \`${c.spPrefix}_Save\`(
    IN p_${c.idCol} INT,
    IN p_${c.nameCol} VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM ${c.table}
    WHERE ${c.nameCol} = p_${c.nameCol}
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_${c.idCol} IS NULL OR p_${c.idCol} = 0 OR ${c.idCol} <> p_${c.idCol});

    IF v_Exists > 0 THEN
        SELECT 0 AS ${c.idCol}_, 'Name already exists' AS Message;
    ELSE
        IF p_${c.idCol} IS NULL OR p_${c.idCol} = 0 THEN
            INSERT INTO ${c.table} (${c.nameCol}, Description, DeleteStatus)
            VALUES (p_${c.nameCol}, p_Description, 0);

            SELECT LAST_INSERT_ID() AS ${c.idCol}_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE ${c.table}
            SET ${c.nameCol} = p_${c.nameCol}, Description = p_Description
            WHERE ${c.idCol} = p_${c.idCol};

            SELECT p_${c.idCol} AS ${c.idCol}_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$\nDELIMITER ;\n\n`;
    } else if (c.hasState) {
        sql += `DELIMITER $$\nCREATE DEFINER=\`root\`@\`localhost\` PROCEDURE \`${c.spPrefix}_Save\`(
    IN p_${c.idCol} INT,
    IN p_${c.nameCol} VARCHAR(255),
    IN p_State_Id INT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM ${c.table}
    WHERE ${c.nameCol} = p_${c.nameCol}
      AND State_Id = p_State_Id
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_${c.idCol} IS NULL OR p_${c.idCol} = 0 OR ${c.idCol} <> p_${c.idCol});

    IF v_Exists > 0 THEN
        SELECT 0 AS ${c.idCol}_, 'Name already exists in this State' AS Message;
    ELSE
        IF p_${c.idCol} IS NULL OR p_${c.idCol} = 0 THEN
            INSERT INTO ${c.table} (${c.nameCol}, State_Id, DeleteStatus)
            VALUES (p_${c.nameCol}, p_State_Id, 0);

            SELECT LAST_INSERT_ID() AS ${c.idCol}_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE ${c.table}
            SET ${c.nameCol} = p_${c.nameCol}, State_Id = p_State_Id
            WHERE ${c.idCol} = p_${c.idCol};

            SELECT p_${c.idCol} AS ${c.idCol}_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$\nDELIMITER ;\n\n`;
    }

    // Search
    if (c.hasDesc) {
        sql += `DELIMITER $$\nCREATE DEFINER=\`root\`@\`localhost\` PROCEDURE \`${c.spPrefix}_Search\`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT ${c.idCol}, ${c.nameCol}, Description
        FROM ${c.table}
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY ${c.nameCol} ASC
        LIMIT 20;
    ELSE
        SELECT ${c.idCol}, ${c.nameCol}, Description
        FROM ${c.table}
        WHERE ${c.nameCol} LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY ${c.nameCol} ASC;
    END IF;
END$$\nDELIMITER ;\n\n`;
    } else if (c.hasState) {
        sql += `DELIMITER $$\nCREATE DEFINER=\`root\`@\`localhost\` PROCEDURE \`${c.spPrefix}_Search\`(
    IN p_Search VARCHAR(255),
    IN p_State_Id INT
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT ${c.idCol}, ${c.nameCol}, State_Id
        FROM ${c.table}
        WHERE IFNULL(DeleteStatus, 0) = 0
          AND (p_State_Id IS NULL OR p_State_Id = 0 OR State_Id = p_State_Id)
        ORDER BY ${c.nameCol} ASC
        LIMIT 20;
    ELSE
        SELECT ${c.idCol}, ${c.nameCol}, State_Id
        FROM ${c.table}
        WHERE ${c.nameCol} LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
          AND (p_State_Id IS NULL OR p_State_Id = 0 OR State_Id = p_State_Id)
        ORDER BY ${c.nameCol} ASC;
    END IF;
END$$\nDELIMITER ;\n\n`;
    }
}

fs.writeFileSync('lead_config_all_sps.sql', sql);
