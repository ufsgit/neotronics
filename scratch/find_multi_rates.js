const db = require('../backend/dbconnection');

const query = `
    SELECT ItemId, COUNT(DISTINCT SaleRate) as RateCount FROM (
        SELECT DISTINCT COALESCE(SaleRate, 0) AS SaleRate, ItemId
        FROM stock
        WHERE DeleteStatus = 0 AND SaleRate IS NOT NULL
        
        UNION
        
        SELECT DISTINCT (COALESCE(PRD.Supplier_Price, 0) + (COALESCE(PRD.Supplier_Price, 0) * COALESCE(PRD.Profit_Percentage, 0) / 100)) AS SaleRate, PRD.Item_Id AS ItemId
        FROM price_response_details PRD
        INNER JOIN price_response_master PRM ON PRD.Price_Response_Master_Id = PRM.Price_Response_Master_Id
        WHERE PRM.DeleteStatus = 0 AND PRD.Supplier_Price IS NOT NULL
    ) t
    GROUP BY ItemId
    HAVING RateCount > 1
    LIMIT 10
`;

db.query(query, (err, rows) => {
    if (err) {
        console.error("Error finding multi-rate items:", err);
        process.exit(1);
    }
    console.log("Multi-rate Item IDs:", rows);
    process.exit(0);
});
