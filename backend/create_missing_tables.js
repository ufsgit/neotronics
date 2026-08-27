const db = require('./dbconnection');

const missingTables = [
    { table: 'CompanySize', idCol: 'Company_Size_Id', nameCol: 'Company_Size_Name' },
    { table: 'MarketSystem', idCol: 'Market_System_Id', nameCol: 'Market_System_Name' },
    { table: 'PipelineStage', idCol: 'Pipeline_Stage_Id', nameCol: 'Pipeline_Stage_Name' },
    { table: 'Pulse', idCol: 'Pulse_Id', nameCol: 'Pulse_Name' },
    { table: 'TargetStage', idCol: 'Target_Stage_Id', nameCol: 'Target_Stage_Name' },
    { table: 'ServiceProduct', idCol: 'Service_Product_Id', nameCol: 'Service_Product_Name' },
    { table: 'Assignment', idCol: 'Assignment_Id', nameCol: 'Assignment_Name' },
    { table: 'FollowupAutomation', idCol: 'Followup_Automation_Id', nameCol: 'Followup_Automation_Name' }
];

async function createTables() {
    for (const t of missingTables) {
        const query = `
        CREATE TABLE IF NOT EXISTS ${t.table} (
            ${t.idCol} INT NOT NULL AUTO_INCREMENT,
            ${t.nameCol} VARCHAR(255) DEFAULT NULL,
            Description TEXT DEFAULT NULL,
            DeleteStatus INT DEFAULT 0,
            PRIMARY KEY (${t.idCol})
        )`;
        
        try {
            await db.promise().query(query);
            console.log(`Created table ${t.table}`);
        } catch (e) {
            console.error(`Error creating table ${t.table}:`, e.message);
        }
    }
    console.log('Done creating tables!');
    process.exit(0);
}

createTables();
