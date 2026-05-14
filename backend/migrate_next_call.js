const db = require('./dbconnection');

async function migrate() {
    const pool = db.promise();
    console.log('Adding Next_Call_Action column to Lead table...');

    try {
        await pool.query(`ALTER TABLE \`Lead\` ADD COLUMN \`Next_Call_Action\` TINYINT(1) DEFAULT 0`);
        console.log(`OK: Column Next_Call_Action added to Lead table.`);
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.warn(`SKIP: Column Next_Call_Action already exists.`);
        } else {
            console.error(`Error adding Next_Call_Action:`, err.message);
        }
    }

    console.log('Migration complete.');
    process.exit(0);
}

migrate();
