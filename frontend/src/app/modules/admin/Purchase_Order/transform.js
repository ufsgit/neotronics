const fs = require('fs');
let inv = fs.readFileSync('../Invoice/invoice.component.html', 'utf8');

// Extract the Entry_View part
let start = inv.indexOf('<div class="row" *ngIf="Entry_View"');
let end = inv.indexOf('<!-- PRINT TEMPLATE START -->');
if(end === -1) {
    end = inv.indexOf('<!-- PRINT TEMPLATE START');
}
if(start === -1 || end === -1) {
    console.log('Could not find boundaries', start, end);
    process.exit(1);
}
let entryView = inv.substring(start, end);

// Replace variables
entryView = entryView.replace(/Sales_Master_/g, 'Purchase_Ordermaster_');
entryView = entryView.replace(/Sales_Details_/g, 'Purchase_Orderdetails_');
entryView = entryView.replace(/Sales_Details_Data/g, 'Purchase_Orderdetails_Data');
entryView = entryView.replace(/Sales_Details_New/g, 'Purchase_Orderdetails_New');
entryView = entryView.replace(/Customer \*/g, 'Supplier *');
entryView = entryView.replace(/Sales Invoice No/g, 'Order Number');
entryView = entryView.replace(/SalesRate/g, 'SaleRate');
entryView = entryView.replace(/Save_Sales/g, 'Save_Purchase_Order');
entryView = entryView.replace(/TotalAmount/g, 'NetTotal');
entryView = entryView.replace(/VAT_Amount/g, 'VAT_Amount');
entryView = entryView.replace(/PaymentTerm_Data/g, 'PaymentTermData'); // from purchase order
entryView = entryView.replace(/Payment_Term_Description_/g, 'Payment_Term_Description_'); 
entryView = entryView.replace(/Calculate_Total_Amount/g, 'Calculate_Quotation_Details_Amount'); // wait
entryView = entryView.replace(/Plus_Sales_Details/g, 'Plus_Sales_Details'); 
entryView = entryView.replace(/Delete_Sales_Detail/g, 'Delete_Quotation_Detail');
entryView = entryView.replace(/Edit_Sales_Detail/g, 'Edit_Quotation_Detail');

fs.writeFileSync('po_entry_view.html', entryView);
console.log('done');
