const db = require('../backend/dbconnection');

async function test() {
    try {
        console.log("Calling Search_Quotation...");
        const [searchRes] = await db.promise().query("CALL Search_Quotation(0, null, null, 0, null, null, 0, 0, 0, null, 0)");
        
        if (searchRes && searchRes[0] && searchRes[0].length > 0) {
            const quotation = searchRes[0][0];
            console.log("First Search_Quotation result:");
            console.log(quotation);
            
            console.log(`\nCalling Get_Quotation_Details for ID ${quotation.SalesQuotationMaster_Id}...`);
            const [detailsRes] = await db.promise().query("CALL Get_Quotation_Details(?)", [quotation.SalesQuotationMaster_Id]);
            console.log("Get_Quotation_Details results:");
            console.log(detailsRes[0]);
        } else {
            console.log("No quotations found.");
        }
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}

test();
