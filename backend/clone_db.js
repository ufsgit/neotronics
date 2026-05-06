const mysql = require('mysql2/promise');

async function cloneTable(connection, sourceTable, destTable) {
    console.log(`Cloning table ${sourceTable} to ${destTable}...`);
    try {
        await connection.query(`DROP TABLE IF EXISTS ${destTable}`);
        
        const [rows] = await connection.query(`SHOW CREATE TABLE ${sourceTable}`);
        let createSql = rows[0]['Create Table'];
        
        // Replace table name and ID columns
        createSql = createSql.replace(new RegExp(sourceTable, 'gi'), destTable);
        
        // specific column replacements
        createSql = createSql.replace(/SalesQuotationMaster_Id/gi, 'Price_Request_Master_Id');
        createSql = createSql.replace(/SalesQuotationDetails_Id/gi, 'Price_Request_Details_Id');
        createSql = createSql.replace(/QuotationMaster_Id/gi, 'PriceRequestMaster_Id');
        createSql = createSql.replace(/QuotationNo/gi, 'RequestNumber');
        
        await connection.query(createSql);
        console.log(`Successfully created ${destTable}`);
    } catch (err) {
        console.error(`Error cloning ${sourceTable} to ${destTable}:`, err);
    }
}

async function cloneProcedure(connection, sourceProc, destProc) {
    console.log(`Cloning procedure ${sourceProc} to ${destProc}...`);
    try {
        await connection.query(`DROP PROCEDURE IF EXISTS ${destProc}`);
        
        const [rows] = await connection.query(`SHOW CREATE PROCEDURE ${sourceProc}`);
        let createSql = rows[0]['Create Procedure'];
        
        // Ensure no DEFINER issues
        createSql = createSql.replace(/CREATE DEFINER=`[^`]+`@`[^`]+` PROCEDURE/g, 'CREATE PROCEDURE');
        
        // Replace procedure name
        createSql = createSql.replace(new RegExp(sourceProc, 'gi'), destProc);
        
        // Replace tables
        createSql = createSql.replace(/salesquotationmaster/gi, 'price_request_master');
        createSql = createSql.replace(/salesquotationdetails/gi, 'price_request_details');
        
        // Replace column names & variables
        createSql = createSql.replace(/SalesQuotationMaster_Id/gi, 'Price_Request_Master_Id');
        createSql = createSql.replace(/SalesQuotationDetails_Id/gi, 'Price_Request_Details_Id');
        createSql = createSql.replace(/QuotationMaster_Id/gi, 'PriceRequestMaster_Id');
        createSql = createSql.replace(/QuotationNo/gi, 'RequestNumber');
        createSql = createSql.replace(/Quotation_Details_/gi, 'Price_Request_Details_');
        
        await connection.query(createSql);
        console.log(`Successfully created ${destProc}`);
    } catch (err) {
        console.error(`Error cloning procedure ${sourceProc} to ${destProc}:`, err);
    }
}

async function main() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root123',
        database: 'neotronics_db',
        multipleStatements: true
    });

    try {
        await cloneTable(connection, 'salesquotationmaster', 'price_request_master');
        await cloneTable(connection, 'salesquotationdetails', 'price_request_details');
        
        await cloneProcedure(connection, 'Save_Quotation', 'Save_Price_Request');
        await cloneProcedure(connection, 'Save_Quotation_Details', 'Save_Price_Request_Details');
        await cloneProcedure(connection, 'Load_SalesQuotationMaster', 'Load_Price_Request_Master');
        await cloneProcedure(connection, 'Get_Quotation_Details', 'Get_Price_Request_Details');
        await cloneProcedure(connection, 'Search_Quotation', 'Search_Price_Request');
        await cloneProcedure(connection, 'Delete_Quotation_Master', 'Delete_Price_Request_Master');
        
    } catch (err) {
        console.error(err);
    } finally {
        await connection.end();
    }
}

main();

