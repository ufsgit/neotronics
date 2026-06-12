const db = require('./dbconnection').promise();
async function run() {
    try {
        await db.query("DROP PROCEDURE IF EXISTS Search_Company_Table");
        await db.query(`
        CREATE PROCEDURE Search_Company_Table(In Company_Name_ varchar(100))
        BEGIN
            declare SearchbyName_Value varchar(2000);
            SET SearchbyName_Value ='';
            if Company_Name_!='' then
                    SET SearchbyName_Value =   Concat( " and Company_Name like '%",Company_Name_ ,"%'") ;
                end if;
            SET @query = Concat(" SELECT 
                Company_Name, Address1, Address2, Address3, 
                Phone as Phone_Number, Gsm as GSTNO, Email as EMail, CR_No as CINO, Company_Id,
                File_Upload as Logo, Note, Vat_No as PANNO
            From company_info where DeleteStatus=false ", SearchbyName_Value," 
            order by Company_Id desc");
            PREPARE QUERY FROM @query; EXECUTE QUERY;
        END
        `);
        console.log("Updated Search_Company_Table SP");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
run();
