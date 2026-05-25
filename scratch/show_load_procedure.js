const db = require('../backend/dbconnection');

db.query("SHOW CREATE PROCEDURE Load_SalesQuotationMaster", (err, res) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(res[0]['Create Procedure']);
    process.exit(0);
});
