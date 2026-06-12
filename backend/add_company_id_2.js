const db = require('./dbconnection').promise();
async function run() {
    const tables = [
        'sales_master',
        'sales_return_master',
        'price_request_master',
        'price_response_master',
        'purchase_master',
        'purchase_return_master',
        'purchaseordermaster',
        'salesordermaster'
    ];
    for (let table of tables) {
        try {
            await db.query(`ALTER TABLE ${table} ADD COLUMN Company_Id INT DEFAULT 0;`);
            console.log(`Added Company_Id to ${table}`);
        } catch (err) {
            if (err.code === 'ER_DUP_FIELDNAME') {
                console.log(`Company_Id already exists in ${table}`);
            } else if (err.code === 'ER_NO_SUCH_TABLE') {
                console.log(`Table ${table} does not exist`);
            } else {
                console.error(`Error altering ${table}:`, err.message);
            }
        }
    }
    process.exit(0);
}
run();
