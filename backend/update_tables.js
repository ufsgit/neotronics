const db = require('./dbconnection');

const tables = [
    { name: 'State', desc: false },
    { name: 'District', desc: false },
    { name: 'CompanySize', desc: true },
    { name: 'Source', desc: true },
    { name: 'Designation', desc: true },
    { name: 'MarketSystem', desc: true },
    { name: 'PipelineStage', desc: true },
    { name: 'Pulse', desc: true },
    { name: 'TargetStage', desc: true },
    { name: 'ServiceProduct', desc: true },
    { name: 'Assignment', desc: true },
    { name: 'FollowupAutomation', desc: true }
];

async function updateTables() {
    for (const t of tables) {
        try {
            await db.promise().query(`ALTER TABLE ${t.name} ADD COLUMN DeleteStatus tinyint DEFAULT 0`);
            console.log(`Added DeleteStatus to ${t.name}`);
        } catch (e) {
            if (e.code !== 'ER_DUP_FIELDNAME') console.log(`Error adding DeleteStatus to ${t.name}:`, e.message);
        }
        
        if (t.desc) {
            try {
                await db.promise().query(`ALTER TABLE ${t.name} ADD COLUMN Description text DEFAULT NULL`);
                console.log(`Added Description to ${t.name}`);
            } catch (e) {
                if (e.code !== 'ER_DUP_FIELDNAME') console.log(`Error adding Description to ${t.name}:`, e.message);
            }
        }
    }
    console.log('Done!');
    process.exit(0);
}

updateTables();
