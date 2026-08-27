const fs = require('fs');

const configs = [
    {
        modelName: 'CompanySize',
        dbTable: 'company_size',
        dbPk: 'Company_Size_Id',
        dbName: 'Company_Size_Name',
        uiPk: 'Company_Size_Id',
        uiName: 'Company_Size_Name',
        hasDesc: true
    },
    {
        modelName: 'Source',
        dbTable: 'source_master',
        dbPk: 'Source_Id',
        dbName: 'Source_Name',
        uiPk: 'Source_Id',
        uiName: 'Source_Name',
        hasDesc: true
    },
    {
        modelName: 'Designation',
        dbTable: 'designation',
        dbPk: 'Designation_Id',
        dbName: 'Designation_Name',
        uiPk: 'Designation_Id',
        uiName: 'Designation_Name',
        hasDesc: true
    },
    {
        modelName: 'MarketSystem',
        dbTable: 'marketsystem_master',
        dbPk: 'MarketSystem_Id',
        dbName: 'MarketSystem_Name',
        uiPk: 'Market_System_Id',
        uiName: 'Market_System_Name',
        hasDesc: false
    },
    {
        modelName: 'PipelineStage',
        dbTable: 'pipeline_stage_master',
        dbPk: 'PipelineStage_Id',
        dbName: 'PipelineStage_Name',
        uiPk: 'Pipeline_Stage_Id',
        uiName: 'Pipeline_Stage_Name',
        hasDesc: false
    },
    {
        modelName: 'Pulse',
        dbTable: 'pulse_master',
        dbPk: 'Pulse_Id',
        dbName: 'Pulse_Name',
        uiPk: 'Pulse_Id',
        uiName: 'Pulse_Name',
        hasDesc: false
    },
    {
        modelName: 'TargetStage',
        dbTable: 'target_stage_master',
        dbPk: 'TargetStage_Id',
        dbName: 'TargetStage_Name',
        uiPk: 'Target_Stage_Id',
        uiName: 'Target_Stage_Name',
        hasDesc: false
    },
    {
        modelName: 'ServiceProduct',
        dbTable: 'serviceinterest_master',
        dbPk: 'ServiceInterest_Id',
        dbName: 'ServiceInterest_Name',
        uiPk: 'Service_Product_Id',
        uiName: 'Service_Product_Name',
        hasDesc: false
    },
    {
        modelName: 'Branch',
        dbTable: 'branch_master',
        dbPk: 'Branch_Id',
        dbName: 'Branch_Name',
        uiPk: 'Assignment_Id',
        uiName: 'Assignment_Name',
        hasDesc: false
    },
    {
        modelName: 'Workflow',
        dbTable: 'workflow_master',
        dbPk: 'Workflow_Id',
        dbName: 'Workflow_Name',
        uiPk: 'Followup_Automation_Id',
        uiName: 'Followup_Automation_Name',
        hasDesc: false
    }
];

let sql = '';

for (const c of configs) {
    const descField = c.hasDesc ? 'Description' : 'NULL AS Description';
    const descInsertCol = c.hasDesc ? ', Description' : '';
    const descInsertVal = c.hasDesc ? ', p_Description' : '';
    const descUpdate = c.hasDesc ? ', Description = p_Description' : '';

    // Save SP
    sql += `
DELIMITER $$
DROP PROCEDURE IF EXISTS \`LC_${c.modelName}_Save\`$$
CREATE DEFINER=\`root\`@\`localhost\` PROCEDURE \`LC_${c.modelName}_Save\`(
    IN p_${c.uiPk} INT,
    IN p_${c.uiName} VARCHAR(255),
    IN p_Description TEXT
)
BEGIN
    DECLARE v_Exists INT DEFAULT 0;

    SELECT COUNT(*) INTO v_Exists
    FROM ${c.dbTable}
    WHERE ${c.dbName} = p_${c.uiName}
      AND IFNULL(DeleteStatus, 0) = 0
      AND (p_${c.uiPk} IS NULL OR p_${c.uiPk} = 0 OR ${c.dbPk} <> p_${c.uiPk});

    IF v_Exists > 0 THEN
        SELECT 0 AS ${c.uiPk}_, 'Name already exists' AS Message;
    ELSE
        IF p_${c.uiPk} IS NULL OR p_${c.uiPk} = 0 THEN
            INSERT INTO ${c.dbTable} (${c.dbName}${descInsertCol}, DeleteStatus)
            VALUES (p_${c.uiName}${descInsertVal}, 0);

            SELECT LAST_INSERT_ID() AS ${c.uiPk}_, 'Saved Successfully' AS Message;
        ELSE
            UPDATE ${c.dbTable}
            SET ${c.dbName} = p_${c.uiName}${descUpdate}
            WHERE ${c.dbPk} = p_${c.uiPk};

            SELECT p_${c.uiPk} AS ${c.uiPk}_, 'Updated Successfully' AS Message;
        END IF;
    END IF;
END$$
DELIMITER ;
`;

    // Search SP
    sql += `
DELIMITER $$
DROP PROCEDURE IF EXISTS \`LC_${c.modelName}_Search\`$$
CREATE DEFINER=\`root\`@\`localhost\` PROCEDURE \`LC_${c.modelName}_Search\`(
    IN p_Search VARCHAR(255)
)
BEGIN
    IF p_Search IS NULL OR p_Search = '' THEN
        SELECT ${c.dbPk} AS ${c.uiPk}, ${c.dbName} AS ${c.uiName}, ${descField}
        FROM ${c.dbTable}
        WHERE IFNULL(DeleteStatus, 0) = 0
        ORDER BY ${c.dbName} ASC
        LIMIT 20;
    ELSE
        SELECT ${c.dbPk} AS ${c.uiPk}, ${c.dbName} AS ${c.uiName}, ${descField}
        FROM ${c.dbTable}
        WHERE ${c.dbName} LIKE CONCAT('%', p_Search, '%')
          AND IFNULL(DeleteStatus, 0) = 0
        ORDER BY ${c.dbName} ASC;
    END IF;
END$$
DELIMITER ;
`;

    // Get SP
    sql += `
DELIMITER $$
DROP PROCEDURE IF EXISTS \`LC_${c.modelName}_Get\`$$
CREATE DEFINER=\`root\`@\`localhost\` PROCEDURE \`LC_${c.modelName}_Get\`(
    IN p_${c.uiPk} INT
)
BEGIN
    SELECT ${c.dbPk} AS ${c.uiPk}, ${c.dbName} AS ${c.uiName}, ${descField}
    FROM ${c.dbTable}
    WHERE ${c.dbPk} = p_${c.uiPk}
      AND IFNULL(DeleteStatus, 0) = 0;
END$$
DELIMITER ;
`;

    // Delete SP
    sql += `
DELIMITER $$
DROP PROCEDURE IF EXISTS \`LC_${c.modelName}_Delete\`$$
CREATE DEFINER=\`root\`@\`localhost\` PROCEDURE \`LC_${c.modelName}_Delete\`(
    IN p_${c.uiPk} INT
)
BEGIN
    UPDATE ${c.dbTable}
    SET DeleteStatus = 1
    WHERE ${c.dbPk} = p_${c.uiPk};

    SELECT p_${c.uiPk} AS ${c.uiPk}_, 'Deleted Successfully' AS Message;
END$$
DELIMITER ;
`;

}

fs.writeFileSync('lead_config_master_sps.sql', sql);
console.log('SQL generated successfully.');
