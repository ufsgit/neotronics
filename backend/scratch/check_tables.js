
const db = require('../dbconnection');

async function checkSchema() {
    try {
        const tables = [
            'requirementmaster', 'requirementdetails',
            'Lead', 'Follow_up',
            'price_request_master', 'price_request_details',
            'salesquotationmaster', 'salesquotationdetails'
        ];

        for (const table of tables) {
            try {
                const [rows] = await db.promise().query(`DESCRIBE \`${table}\``);
                console.log(`Table: ${table}`);
                console.log(rows.map(r => r.Field).join(', '));
            } catch (err) {
                console.log(`\nTable: ${table} - DOES NOT EXIST or Error: ${err.message}`);
            }
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkSchema();
