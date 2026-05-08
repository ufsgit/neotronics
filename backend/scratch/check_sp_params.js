const db = require('../dbconnection');

async function checkSP() {
    try {
        const [rows] = await db.promise().query("SELECT PARAMETER_NAME, DATA_TYPE, ORDINAL_POSITION FROM information_schema.PARAMETERS WHERE SPECIFIC_NAME = 'Save_Price_Request' AND ROUTINE_TYPE = 'PROCEDURE' ORDER BY ORDINAL_POSITION");
        console.log("Parameters for Save_Price_Request:");
        rows.forEach(r => {
            console.log(`${r.ORDINAL_POSITION}: ${r.PARAMETER_NAME} (${r.DATA_TYPE})`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkSP();
