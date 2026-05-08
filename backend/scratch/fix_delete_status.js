const db = require('../dbconnection');

async function fixDB() {
    try {
        await db.promise().query("ALTER TABLE requirementmaster MODIFY COLUMN DeleteStatus TINYINT UNSIGNED DEFAULT 0");
        console.log("Altered requirementmaster DeleteStatus default to 0.");
        
        const [res] = await db.promise().query("UPDATE requirementmaster SET DeleteStatus = 0 WHERE DeleteStatus IS NULL");
        console.log("Updated", res.affectedRows, "rows in requirementmaster to DeleteStatus = 0.");
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

fixDB();
