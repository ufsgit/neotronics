const db = require('../backend/dbconnection');

async function alterTable() {
    db.query("DESCRIBE salesquotationmaster", (err, columns) => {
        if (err) {
            console.error("Error describing salesquotationmaster:", err);
            process.exit(1);
        }
        console.log("Existing columns in salesquotationmaster:", columns.map(c => c.Field));
        
        const hasStatusId = columns.some(c => c.Field.toLowerCase() === 'status_id');
        const hasStatusName = columns.some(c => c.Field.toLowerCase() === 'status_name');
        
        if (!hasStatusId || !hasStatusName) {
            console.log("Adding columns Status_Id and Status_Name...");
            db.query("ALTER TABLE salesquotationmaster ADD COLUMN Status_Id INT NULL, ADD COLUMN Status_Name VARCHAR(50) NULL", (alterErr, alterRes) => {
                if (alterErr) {
                    console.error("Error altering table:", alterErr);
                    process.exit(1);
                }
                console.log("Table salesquotationmaster altered successfully:", alterRes);
                process.exit(0);
            });
        } else {
            console.log("Status columns already exist in salesquotationmaster!");
            process.exit(0);
        }
    });
}

alterTable();
