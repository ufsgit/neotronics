const db = require('../backend/dbconnection');

const sqlCommands = [
    `CREATE TABLE IF NOT EXISTS Reference_Quotation (
        Reference_Quotation_Id INT AUTO_INCREMENT PRIMARY KEY,
        ReferenceID INT,
        QuotationID INT
    )`,
    `CREATE TABLE IF NOT EXISTS Price_Request_Master (
        Price_Request_Master_Id INT AUTO_INCREMENT PRIMARY KEY,
        RequestNumber VARCHAR(50),
        TotalAmount DECIMAL(18,3),
        EntryDate DATETIME,
        DeleteStatus TINYINT DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS Price_Request_Reference (
        Price_Request_Reference_Id INT AUTO_INCREMENT PRIMARY KEY,
        ReferenceID INT,
        RequestID INT
    )`,
    `DROP PROCEDURE IF EXISTS Get_Quotation_Requirement_Details`,
    `CREATE PROCEDURE Get_Quotation_Requirement_Details(IN _Requirement_Master_Id INT)
    BEGIN
        SELECT qm.SalesQuotationMaster_Id, qm.EntryDate, qm.QuotationNo, qm.NetTotal
        FROM salesquotationmaster qm
        INNER JOIN Reference_Quotation rq ON qm.SalesQuotationMaster_Id = rq.QuotationID
        WHERE rq.ReferenceID = _Requirement_Master_Id AND IFNULL(qm.DeleteStatus,0)=0;
    END`,
    `DROP PROCEDURE IF EXISTS Get_PriceRequest_Requirement_Details`,
    `CREATE PROCEDURE Get_PriceRequest_Requirement_Details(IN _Requirement_Master_Id INT)
    BEGIN
        SELECT pr.Price_Request_Master_Id, pr.EntryDate, pr.RequestNumber, pr.TotalAmount
        FROM Price_Request_Master pr
        INNER JOIN Price_Request_Reference prr ON pr.Price_Request_Master_Id = prr.RequestID
        WHERE prr.ReferenceID = _Requirement_Master_Id AND IFNULL(pr.DeleteStatus,0)=0;
    END`
];

async function run() {
    for (const sql of sqlCommands) {
        try {
            await new Promise((resolve, reject) => {
                db.query(sql, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            console.log('Executed successfully:', sql.substring(0, 50).replace(/\n/g, ' ') + '...');
        } catch (err) {
            console.error('Error executing:', sql.substring(0, 50).replace(/\n/g, ' ') + '...');
            console.error(err);
        }
    }
    process.exit();
}

run();
