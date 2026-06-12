const fs = require('fs');

function patchModel(file) {
    let content = fs.readFileSync(file, 'utf8');

    // Quotation
    content = content.replace(
        /return \(new storedProcedure\("Save_SalesQuotation", params, connection\)\)\.result\(\);/g,
        `var result = await (new storedProcedure("Save_SalesQuotation", params, connection)).result();
            if (result && result[0] && result[0].SalesQuotationMaster_Id_ && Quotation_Master_.Company_Id) {
                await connection.query("UPDATE salesquotationmaster SET Company_Id=? WHERE SalesQuotationMaster_Id=?", [Quotation_Master_.Company_Id, result[0].SalesQuotationMaster_Id_]);
            }
            return result;`
    );

    // Sales Order
    content = content.replace(
        /return \(new storedProcedure\("Save_Sales_Master", params, connection\)\)\.result\(\);/g,
        `var result = await (new storedProcedure("Save_Sales_Master", params, connection)).result();
            if (result && result[0] && result[0].Sales_Master_Id_ && Sales_Master_.Company_Id) {
                await connection.query("UPDATE sales_master SET Company_Id=? WHERE Sales_Master_Id=?", [Sales_Master_.Company_Id, result[0].Sales_Master_Id_]);
            }
            return result;`
    );

    fs.writeFileSync(file, content, 'utf8');
    console.log("Patched " + file);
}

patchModel('models/Sales_Master.js');
