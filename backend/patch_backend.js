const fs = require('fs');
const path = require('path');

function patchModel(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    const patches = [
        {
            sp: "Save_PerformaInvoice",
            table: "performainvoicemaster",
            pk: "PerformaInvoiceMaster_Id",
            master: "PerformaInvoice_Master_"
        },
        {
            sp: "Save_Purchase_order",
            table: "purchaseordermaster",
            pk: "PurchaseOrderMaster_Id",
            master: "Purchase_Order_Master_"
        },
        {
            sp: "Save_Sales_Returns_Master",
            table: "sales_return_master",
            pk: "Sales_Return_Master_Id",
            master: "Sales_Return_Master_"
        },
        {
            sp: "Save_Price_Request",
            table: "price_request_master",
            pk: "Price_Request_Master_Id",
            master: "Price_Request_Master_"
        }
    ];

    patches.forEach(p => {
        const regex = new RegExp(`return \\(new storedProcedure\\("${p.sp}", params, connection\\)\\)\\.result\\(\\);`, 'g');
        content = content.replace(regex, 
            `var result = await (new storedProcedure("${p.sp}", params, connection)).result();
            if (result && result[0] && result[0].${p.pk}_ && ${p.master}.Company_Id) {
                await connection.query("UPDATE ${p.table} SET Company_Id=? WHERE ${p.pk}=?", [${p.master}.Company_Id, result[0].${p.pk}_]);
            }
            return result;`
        );
    });

    fs.writeFileSync(file, content, 'utf8');
    console.log("Patched " + file);
}

patchModel('models/Sales_Master.js');
