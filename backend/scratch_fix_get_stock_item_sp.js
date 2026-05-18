const db = require('./dbconnection');

const dropQuery = "DROP PROCEDURE IF EXISTS Get_Stock_Item_Typeahead";

const createQuery = `
CREATE PROCEDURE Get_Stock_Item_Typeahead(In ItemName_ varchar(500))
BEGIN
    -- Escape special characters
    delete from db_logs;

    insert into db_logs values (0,ItemName_,'Get_Stock_Item_Typeahead1','');

    SET ItemName_ = REPLACE(ItemName_, '\\\\', '\\\\\\\\');
    SET ItemName_ = REPLACE(ItemName_, '%', '\\\\%');
    SET ItemName_ = REPLACE(ItemName_, '_', '\\\\_');
    SET ItemName_ = CONCAT('%', ItemName_, '%');

    insert into db_logs values (0,ItemName_,'Get_Stock_Item_Typeahead2','');
    SELECT 
        ifnull(Stock.Stock_Id,0) Stock_Id,
        ifnull(Stock.Stock_Id,0) AS StockId, 
        stock.ItemId,
        stock.Barcode,
        stock.Item_Code,
        stock.ItemName,
        stock.GroupId,
        stock.GroupName,
        stock.UnitId,
        stock.UnitName,
        ifnull(stock.Quantity,0) as Quantity,
        ifnull(stock.PurchaseRate,0) as PurchaseRate,
        ifnull(stock.SaleRate,0) as SaleRate,
        ifnull(stock.SaleRate,0) as UnitPrice,
        ifnull(i.b2b_rate,0) as b2b_rate,
        ifnull(i.b2c_rate,0) as b2c_rate,
        ifnull(stock.MRP,0) as MRP,
        ifnull(i.Sales_Tax,0) AS SaleTax,
        IFNULL(stock.HSNMasterId, 0) AS HSNMasterId,
        IFNULL(stock.HSNCODE, '') AS HSNCODE,
        IFNULL(i.Country_Id, 0) AS Country_Id,
        IFNULL(i.Country_Name, '') AS Country_Name,
        ifnull(stock.Quantity,0) AS Availability 
    FROM Stock 
    LEFT JOIN item i ON i.item_id = stock.itemid
    WHERE Quantity > 0 
    AND Stock.DeleteStatus = false 
    AND ItemName LIKE ItemName_
    ORDER BY ItemName ASC 
    LIMIT 25;
END
`;

async function run() {
    const pool = db.promise();
    try {
        console.log("Dropping procedure Get_Stock_Item_Typeahead...");
        await pool.query(dropQuery);
        console.log("Creating updated procedure Get_Stock_Item_Typeahead...");
        await pool.query(createQuery);
        console.log("Procedure recreated successfully!");
    } catch (err) {
        console.error("Error updating stored procedure:", err.message);
    }
    process.exit(0);
}

run();
