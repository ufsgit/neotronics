const db = require('./dbconnection');

async function addColumn() {
    try {
        const result = await db.promise().query("ALTER TABLE price_request_master ADD COLUMN Company_Id INT;");
        console.log("Column added successfully:", result);
    } catch (e) {
        if (e.code === 'ER_DUP_FIELDNAME') {
            console.log("Column already exists.");
        } else {
            console.error("Error adding column:", e);
        }
    } finally {
        process.exit();
    }
}

addColumn();
