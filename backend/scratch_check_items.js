const db = require('./dbconnection');

async function run() {
    const pool = db.promise();
    try {
        console.log("Checking item records...");
        const [items] = await pool.query("SELECT Item_Id, Item_Name, b2b_rate, b2c_rate FROM Item LIMIT 10");
        console.log("Current items in database:", items);

        if (items.length > 0) {
            console.log("Updating first few items with mock pricing rates for testing...");
            for (let i = 0; i < Math.min(items.length, 5); i++) {
                const itemId = items[i].Item_Id;
                
                // Get the SaleRate and MRP from Stock table for this item if available, default to 100
                const [stocks] = await pool.query("SELECT SaleRate, MRP FROM Stock WHERE ItemId = ? LIMIT 1", [itemId]);
                const baseRate = stocks.length > 0 && stocks[0].SaleRate > 0 ? Number(stocks[0].SaleRate) : 100 + (i * 20);
                
                const b2bRate = baseRate * 0.85; // 15% discount for B2B
                const b2cRate = baseRate * 0.95; // 5% discount for B2C
                const mrp = baseRate * 1.25;     // 25% markup for MRP

                await pool.query(
                    "UPDATE Item SET b2b_rate = ?, b2c_rate = ? WHERE Item_Id = ?",
                    [b2bRate, b2cRate, itemId]
                );
                
                // Ensure Stock table has SaleRate and MRP values populated
                await pool.query(
                    "UPDATE Stock SET SaleRate = ?, MRP = ? WHERE ItemId = ?",
                    [baseRate, mrp, itemId]
                );
                
                console.log(`Updated Item: ${items[i].Item_Name} (ID: ${itemId}) -> Base: ${baseRate}, B2B: ${b2bRate.toFixed(2)}, B2C: ${b2cRate.toFixed(2)}, MRP: ${mrp.toFixed(2)}`);
            }
            console.log("Mock rates updated successfully!");
        } else {
            console.log("No items found to update.");
        }
    } catch (err) {
        console.error("Error checking/updating items:", err.message);
    }
    process.exit(0);
}

run();
