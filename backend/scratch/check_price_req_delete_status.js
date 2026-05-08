const db = require('../dbconnection');

async function checkPriceReq() {
    try {
        const [rows] = await db.promise().query("SELECT DeleteStatus FROM price_request_master WHERE DeleteStatus IS NULL");
        console.log("Null DeleteStatus in Price Request Master:", rows.length);
        
        const [rows2] = await db.promise().query("SELECT DeleteStatus FROM price_request_details WHERE DeleteStatus IS NULL");
        console.log("Null DeleteStatus in Price Request Details:", rows2.length);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkPriceReq();
