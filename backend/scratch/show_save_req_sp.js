const db = require('../dbconnection');

async function showSP() {
    try {
        const [rows] = await db.promise().query("SHOW CREATE PROCEDURE Save_Requirement");
        console.log(rows[0]['Create Procedure']);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

showSP();
