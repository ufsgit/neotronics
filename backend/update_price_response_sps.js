var db = require('./dbconnection');

var queries = [
`DROP PROCEDURE IF EXISTS Search_Price_Response;`,
`CREATE PROCEDURE Search_Price_Response
(
    IN Look_In_Date_ INT,
    IN From_Date_ DATE,
    IN To_Date_ DATE,
    IN Supplier_Id_ INT,
    IN Price_RequestNo_ VARCHAR(100)
)
BEGIN
    SELECT 
        PRM.*,
        SA.Client_Accounts_Name AS Supplier_Name
    FROM Price_Response_Master PRM
    LEFT JOIN Client_Accounts SA ON SA.Client_Accounts_Id = PRM.Supplier_Id
    WHERE 
        (Look_In_Date_ = 0 OR (PRM.EntryDate BETWEEN From_Date_ AND To_Date_))
        AND (Supplier_Id_ = 0 OR PRM.Supplier_Id = Supplier_Id_)
        AND (Price_RequestNo_ = '' OR PRM.Price_Response_No LIKE CONCAT('%', Price_RequestNo_, '%'))
        AND PRM.DeleteStatus = 0
    ORDER BY PRM.EntryDate DESC;
END;`,
`DROP PROCEDURE IF EXISTS Get_Next_Price_Response_No;`,
`CREATE PROCEDURE Get_Next_Price_Response_No
(
    IN EntryDate_ DATE
)
BEGIN
    SELECT COALESCE(MAX(CAST(Price_Response_No AS UNSIGNED)), 0) + 1 AS NextNo 
    FROM Price_Response_Master 
    WHERE Price_Response_No REGEXP '^[0-9]+$';
END;`
];

async function runQueries() {
    for (let q of queries) {
        try {
            await db.promise().query(q);
            console.log("Executed query successfully");
        } catch (err) {
            console.error("Error executing query:", err);
        }
    }
    process.exit();
}

runQueries();
