const db = require('../dbconnection');

async function checkColumn() {
    try {
        const [rows] = await db.promise().query("SELECT TABLE_NAME FROM information_schema.COLUMNS WHERE COLUMN_NAME = 'RequestNumber' AND TABLE_SCHEMA = 'neotronics_db'");
        console.log("Tables with RequestNumber column:");
        rows.forEach(r => {
            console.log(r.TABLE_NAME);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkColumn();
