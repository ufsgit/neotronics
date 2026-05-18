/**
 * Fix script:
 * 1. Populate b2b_rate and b2c_rate in Item table for items that have Stock entries with real SaleRates
 * 2. Give those stock items a non-zero quantity so they appear in the typeahead
 */
const db = require('./dbconnection');

async function run() {
    const pool = db.promise();
    try {
        // Find Stock entries that have a real SaleRate
        const [stocks] = await pool.query(`
            SELECT s.Stock_Id, s.ItemId, s.ItemName, s.SaleRate, s.MRP, s.Quantity
            FROM Stock s
            WHERE s.SaleRate IS NOT NULL AND s.SaleRate > 0
            LIMIT 20
        `);
        
        console.log(`Found ${stocks.length} stock items with SaleRate > 0`);

        for (const stock of stocks) {
            const saleRate = Number(stock.SaleRate);
            const mrp = saleRate * 1.25;
            const b2bRate = saleRate * 0.85;
            const b2cRate = saleRate * 0.95;

            // Set quantity > 0 so typeahead returns them
            await pool.query(
                `UPDATE Stock SET Quantity = 10, MRP = ? WHERE Stock_Id = ?`,
                [mrp, stock.Stock_Id]
            );

            // Set b2b_rate and b2c_rate in Item table
            if (stock.ItemId > 0) {
                await pool.query(
                    `UPDATE Item SET b2b_rate = ?, b2c_rate = ? WHERE Item_Id = ?`,
                    [b2bRate, b2cRate, stock.ItemId]
                );
                console.log(`  Updated Item ${stock.ItemId} (${stock.ItemName}): SaleRate=${saleRate}, B2B=${b2bRate.toFixed(2)}, B2C=${b2cRate.toFixed(2)}, MRP=${mrp.toFixed(2)}, Stock.Qty=10`);
            } else {
                console.log(`  Skipped Stock_Id=${stock.Stock_Id} (ItemId=0)`);
            }
        }

        console.log('\nVerifying updated stored procedure output...');
        const [spResult] = await pool.query(`CALL Get_Stock_Item_Typeahead('Relay')`);
        if (spResult && spResult[0] && spResult[0].length > 0) {
            console.log('SP returned items:', spResult[0].map(r => ({
                ItemName: r.ItemName,
                SaleRate: r.SaleRate,
                b2b_rate: r.b2b_rate,
                b2c_rate: r.b2c_rate,
                MRP: r.MRP,
                Quantity: r.Quantity
            })));
        } else {
            console.log('SP returned no items for "Relay". Trying empty string...');
            const [spResult2] = await pool.query(`CALL Get_Stock_Item_Typeahead('marker')`);
            if (spResult2 && spResult2[0]) {
                console.log('SP results for "marker":', spResult2[0].slice(0, 3).map(r => ({
                    ItemName: r.ItemName,
                    SaleRate: r.SaleRate,
                    b2b_rate: r.b2b_rate,
                    b2c_rate: r.b2c_rate,
                    MRP: r.MRP,
                    Quantity: r.Quantity
                })));
            }
        }

        console.log('\nDone!');
    } catch (err) {
        console.error('Error:', err.message);
    }
    process.exit(0);
}

run();
