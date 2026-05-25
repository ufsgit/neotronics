const db = require('../backend/dbconnection');

db.query("SELECT COUNT(*) AS total, SUM(CASE WHEN DeleteStatus = 0 THEN 1 ELSE 0 END) AS active FROM salesquotationmaster", (err, res) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Quotations counts:", res);

    db.query("SELECT Status, workflow_status, Status_Id, Status_Name, COUNT(*) as cnt FROM salesquotationmaster GROUP BY Status, workflow_status, Status_Id, Status_Name", (err2, res2) => {
        if (err2) {
            console.error(err2);
            process.exit(1);
        }
        console.log("Quotations status breakdown:", res2);

        db.query("SELECT * FROM salesquotationmaster LIMIT 5", (err3, res3) => {
            console.log("Sample records:", res3);
            process.exit(0);
        });
    });
});
