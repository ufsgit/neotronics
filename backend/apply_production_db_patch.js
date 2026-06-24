const db = require('./dbconnection');

async function applyDbPatch() {
    console.log("Applying database patch to add Company_Id...");

    const tables = [
        "sales_master",
        "salesquotationmaster",
        "performainvoicemaster",
        "purchaseordermaster",
        "sales_return_master",
        "price_request_master"
    ];

    for (const table of tables) {
        try {
            await db.promise().query(`ALTER TABLE ${table} ADD COLUMN Company_Id INT NULL`);
            console.log(`✅ Success: Added Company_Id to ${table}`);
        } catch (error) {
            if (error.code === 'ER_DUP_FIELDNAME') {
                console.log(`ℹ️ Ignored: Company_Id already exists in ${table}`);
            } else {
                console.error(`❌ Error patching ${table}:`, error.message);
            }
        }
    }

    console.log("Finished applying DB patch.");
    process.exit(0);
}

applyDbPatch();
