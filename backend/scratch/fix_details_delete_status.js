const db = require('../dbconnection');

async function fixDetails() {
    try {
        await db.promise().query("ALTER TABLE requirementdetails MODIFY COLUMN DeleteStatus TINYINT UNSIGNED DEFAULT 0");
        console.log("Altered requirementdetails DeleteStatus default to 0.");
        
        const [res] = await db.promise().query("UPDATE requirementdetails SET DeleteStatus = 0 WHERE DeleteStatus IS NULL");
        console.log("Updated", res.affectedRows, "rows in requirementdetails to DeleteStatus = 0.");
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

fixDetails();
