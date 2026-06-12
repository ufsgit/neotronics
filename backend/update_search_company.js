const db = require('./dbconnection').promise();
async function run() {
    try {
        await db.query("DROP PROCEDURE IF EXISTS Search_Company");
        await db.query(`
        CREATE PROCEDURE Search_Company(IN Company_Name_Search_ VARCHAR(100))
        BEGIN
            SELECT Company_Name, Address1, Address2, Address3, Phone, Gsm, Email, CR_No, Company_Id, File_Upload, Note, Vat_No
            FROM company_info
            WHERE DeleteStatus=false AND Company_Name LIKE CONCAT('%', Company_Name_Search_, '%')
            ORDER BY Company_Id DESC;
        END
        `);
        console.log("Updated Search_Company SP");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
run();
