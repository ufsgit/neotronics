const db = require('./dbconnection');

const tables = ['requirementmaster', 'salesquotationmaster', 'requirementdetails', 'salesquotationdetails'];

async function checkSchemas() {
    const pool = db.promise();
    for (const table of tables) {
        try {
            console.log(`--- Schema for ${table} ---`);
            const [rows] = await pool.query(`DESCRIBE ${table}`);
            console.log(JSON.stringify(rows, null, 2));
        } catch (err) {
            console.error(`Error describing ${table}:`, err.message);
        }
    }
    process.exit();
}

checkSchemas();
