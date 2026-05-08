const db = require('../dbconnection');

async function addColumn() {
    try {
        await db.promise().query("ALTER TABLE General_Settings ADD COLUMN RequestNumber INT DEFAULT 1");
        console.log("Successfully added RequestNumber to General_Settings.");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

addColumn();
