const db = require('./dbconnection');
const pool = db.promise();

const sps = [
    {
        name: 'Load_SalesQuotationMaster',
        sql: `
        CREATE PROCEDURE \`Load_SalesQuotationMaster\`(
        IN SalesQuotationMaster_Id_ INT
        )
        BEGIN
            DECLARE Search_Date_ VARCHAR(500);
            DECLARE SearchbyName_Value VARCHAR(2000);

        SET @query = CONCAT("
            SELECT DISTINCT
                salesquotationmaster.*,
                DATE_FORMAT(salesquotationmaster.EntryDate, '%d-%m-%Y') AS FormattedEntryDate,
                salesquotationmaster.QuotationNo,
                salesquotationmaster.NetTotal,
                client_accounts.Client_Accounts_Name AS Customer,
                    client_accounts.Address1,client_accounts.Address2,client_accounts.Address3,client_accounts.Address4,client_accounts.PinCode,client_accounts.GSTNo
        
            FROM salesquotationmaster 
            INNER JOIN salesquotationdetails ON salesquotationmaster.SalesQuotationMaster_Id = salesquotationdetails.QuotationMaster_Id
            INNER JOIN client_accounts ON salesquotationmaster.Account_Party_Id = client_accounts.Client_Accounts_Id 
            WHERE salesquotationmaster.DeleteStatus = FALSE AND salesquotationmaster.SalesQuotationMaster_Id =",SalesQuotationMaster_Id_," 
            "
        );

            PREPARE QUERY FROM @query;
            EXECUTE QUERY;
        END`
    },
    {
        name: 'Get_Quotation_Details',
        sql: `
        CREATE PROCEDURE \`Get_Quotation_Details\`(In SalesQuotationMaster_Id_ int)
        BEGIN

        select salesquotationdetails.*,ItemCode as Item_Code,Sale_Tax as  SaleTax, IFNULL(Unit_Discount, 0) AS Unit_Discount

        from salesquotationdetails where QuotationMaster_Id = SalesQuotationMaster_Id_ and DeleteStatus = 0;
        END`
    },
    {
        name: 'Load_Company',
        sql: `
        CREATE PROCEDURE \`Load_Company\`()
        BEGIN
        Select * from Company_info where DeleteStatus=false;
        select Client_Accounts_Id,Client_Accounts_Name,Client_Accounts_No,Address1,Address2 from client_accounts where
        Account_Group_Id in(4,5) and DeleteStatus=0;
        END`
    }
];

async function run() {
    console.log("Applying Quotation Stored Procedures...");
    for (const sp of sps) {
        try {
            console.log(\`Dropping \${sp.name}...\`);
            await pool.query(\`DROP PROCEDURE IF EXISTS \${sp.name}\`);
            
            console.log(\`Recreating \${sp.name}...\`);
            await pool.query(sp.sql);
            console.log(\`Successfully applied \${sp.name}.\n\`);
        } catch (error) {
            console.error(\`Failed to apply \${sp.name}:\`, error.message);
        }
    }
    console.log("Finished applying SPs!");
    process.exit(0);
}

run();
