const db = require('../dbconnection');

async function checkTable() {
    try {
        const [rows] = await db.promise().query("DESCRIBE General_Settings");
        console.log("Columns in General_Settings:");
        rows.forEach(r => {
            console.log(`${r.Field} (${r.Type})`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkTable();
