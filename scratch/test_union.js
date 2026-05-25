const db = require('../backend/dbconnection');
const Item = require('../backend/models/Item');

const itemIds = [22, 25, 29, 35, 90];

async function runTests() {
    for (const testItemId of itemIds) {
        console.log(`\nTesting Get_Multiple_Sale_Rates for Item ID: ${testItemId}`);
        await new Promise((resolve) => {
            Item.Get_Multiple_Sale_Rates(testItemId, (err, results) => {
                if (err) {
                    console.error(`Error for Item ID ${testItemId}:`, err);
                } else {
                    console.log(`Item ID ${testItemId} results:`, results);
                }
                resolve();
            });
        });
    }
    process.exit(0);
}

runTests();
