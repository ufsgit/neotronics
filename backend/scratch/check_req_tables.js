const db = require('../dbconnection');

async function testSearch() {
    try {
        const [rows] = await db.promise().query("SELECT * FROM requirementmaster LIMIT 5");
        console.log("Master rows:", rows.length);
        if (rows.length > 0) {
            console.log("First Master row:", rows[0]);
        }
        
        const [dRows] = await db.promise().query("SELECT * FROM requirementdetails LIMIT 5");
        console.log("Details rows:", dRows.length);
        if (dRows.length > 0) {
            console.log("First Detail row:", dRows[0]);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

testSearch();
