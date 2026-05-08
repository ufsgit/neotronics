const db = require('../dbconnection');

async function showSP() {
    try {
        const [rows] = await db.promise().query("SHOW CREATE PROCEDURE Save_Price_Request_Details");
        console.log("Definition of Save_Price_Request_Details:");
        console.log(rows[0]['Create Procedure']);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

showSP();
