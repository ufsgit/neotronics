const db = require('./dbconnection');
const fs = require('fs');

async function dumpSPs() {
    try {
        const [rows] = await db.promise().query(`
            SELECT ROUTINE_NAME, ROUTINE_DEFINITION 
            FROM information_schema.routines 
            WHERE ROUTINE_TYPE="PROCEDURE" AND ROUTINE_SCHEMA = DATABASE()
            ORDER BY ROUTINE_NAME ASC
        `);

        let output = "";
        for (const row of rows) {
            output += `DELIMITER $$\nCREATE PROCEDURE \`${row.ROUTINE_NAME}\`\n${row.ROUTINE_DEFINITION}\n$$\nDELIMITER ;\n\n`;
        }

        fs.writeFileSync('C:/Users/nanda/OneDrive/Desktop/UFS PROJECT/netronics/backend/db_sps_dump.sql', output);
        console.log("SPs successfully dumped to backend/db_sps_dump.sql");
        process.exit(0);
    } catch (err) {
        console.error("Error dumping SPs:", err);
        process.exit(1);
    }
}

dumpSPs();
