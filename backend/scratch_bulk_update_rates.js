/**
 * Set b2b_rate = 85% of the stock's SaleRate (per-item-per-stock-row basis)
 * and b2c_rate = 95% — but we store on Item table, so use the FIRST stock row's rate as the base.
 * Also ensures the SP verification is clean.
 */
const db = require('./dbconnection');

async function run() {
    const pool = db.promise();
    try {
        // Use the FIRST/lowest SaleRate per item as the base
        const [result] = await pool.query(`
            UPDATE Item i
            INNER JOIN (
                SELECT ItemId, MIN(SaleRate) AS baseRate
                FROM Stock
                WHERE SaleRate > 0 AND ItemId > 0
                GROUP BY ItemId
            ) s ON s.ItemId = i.Item_Id
            SET 
                i.b2b_rate = ROUND(s.baseRate * 0.85, 4),
                i.b2c_rate = ROUND(s.baseRate * 0.95, 4)
        `);
        console.log(`Updated ${result.affectedRows} items with corrected B2B/B2C rates`);

        // Final verification
        console.log('\nSP output for "marker"...');
        const [spResult] = await pool.query(`CALL Get_Stock_Item_Typeahead('marker')`);
        if (spResult && spResult[0]) {
            spResult[0].slice(0, 5).forEach(r => {
                console.log(`  "${r.ItemName}": Retail=${r.SaleRate}, B2B=${r.b2b_rate}, B2C=${r.b2c_rate}, MRP=${r.MRP}`);
            });
        }

        console.log('\nSP output for "Relay Module"...');
        const [spResult2] = await pool.query(`CALL Get_Stock_Item_Typeahead('Relay Module')`);
        if (spResult2 && spResult2[0]) {
            spResult2[0].slice(0, 5).forEach(r => {
                console.log(`  "${r.ItemName}": Retail=${r.SaleRate}, B2B=${r.b2b_rate}, B2C=${r.b2c_rate}, MRP=${r.MRP}`);
            });
        }

        console.log('\nDone!');
    } catch (err) {
        console.error('Error:', err.message);
    }
    process.exit(0);
}

run();
