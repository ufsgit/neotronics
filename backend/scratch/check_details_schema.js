const db = require('../dbconnection');

async function checkTable() {
    try {
        const [rows] = await db.promise().query("DESCRIBE Price_Request_Details");
        console.log("Columns in Price_Request_Details:");
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
