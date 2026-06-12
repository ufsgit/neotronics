const fs = require('fs');
const path = require('path');

const modules = [
    { dir: 'Price_Request', html_name: 'Price_Request.component.html', ts_name: 'Price_Request.component.ts', master: 'Price_Request_Master_' },
    { dir: 'Price_Response', html_name: 'Price_Response.component.html', ts_name: 'Price_Response.component.ts', master: 'Price_Response_Master_' },
    { dir: 'Requirement', html_name: 'Requirement.component.html', ts_name: 'Requirement.component.ts', master: 'Requirement_Master_' },
    { dir: 'Purchase_Order', html_name: 'Purchase_Order.component.html', ts_name: 'Purchase_Order.component.ts', master: 'Purchase_Order_Master_' },
    { dir: 'purchase-return', html_name: 'purchase-return.component.html', ts_name: 'purchase-return.component.ts', master: 'Purchase_Return_Master_' },
    { dir: 'Quotation_Confirmation', html_name: 'Quotation_Confirmation.component.html', ts_name: 'Quotation_Confirmation.component.ts', master: 'Quotation_Master_' },
    { dir: 'SalesOrder', html_name: 'SalesOrder.component.html', ts_name: 'SalesOrder.component.ts', master: 'Sales_Master_' },
    { dir: 'Performa_Invoice', html_name: 'Performa_Invoice.component.html', ts_name: 'Performa_Invoice.component.ts', master: 'Performa_Invoice_Master_' },
    { dir: 'Sales_Return', html_name: 'Sales_Return.component.html', ts_name: 'Sales_Return.component.ts', master: 'Sales_Return_Master_' }
];

modules.forEach(m => {
    try {
        const htmlFile = path.join('src/app/modules/admin', m.dir, m.html_name);
        const tsFile = path.join('src/app/modules/admin', m.dir, m.ts_name);

        if (fs.existsSync(htmlFile)) {
            let html = fs.readFileSync(htmlFile, 'utf8');
            if (!html.includes('Company_Dropdown_Change()')) {
                // Find "Date <span" and inject the dropdown before it inside the form
                const dateRegex = /<div class="col-md-12[^>]*>\s*<label[^>]*>Date\s*<span/s;
                html = html.replace(dateRegex, (match) => {
                    return `<div class="col-md-12 mb-1">
                        <label class="col-md-4 label-to-crect-all-names-to-divs down-label-name-to-all-sections">Branch/Company <span style="color:#ef071e; ">*</span></label>
                        <select class="col-md-8 mrgn-crct-input-text-div-tre-prt-sles1 mrgn-crct-input-bx-sls-mstr-rspnsv-nw-sctn form-control-standard" [(ngModel)]="${m.master}.Company_Id" (ngModelChange)="Company_Dropdown_Change()" name="Company_Id">
                            <option *ngFor="let c of Company_Data" [ngValue]="c.Company_Id">{{c.Company_Name}}</option>
                        </select>
                    </div>\n` + match;
                });
                fs.writeFileSync(htmlFile, html, 'utf8');
                console.log(m.dir + " HTML Patched");
            }
        }
    } catch (e) {
        console.error("Error patching " + m.dir, e);
    }
});
console.log("UI Patch Phase 2 completed");
