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
                const dateRegex = /<div class="col-md-12( wole-div-margin-to-down-proper)? mb-1">\s*<label[^>]*>Date\s*<span/s;
                html = html.replace(dateRegex, (match) => {
                    return `<div class="col-md-12 mb-1">
                        <label class="col-md-4 label-to-crect-all-names-to-divs down-label-name-to-all-sections">Branch/Company <span style="color:#ef071e; ">*</span></label>
                        <select class="col-md-8 mrgn-crct-input-text-div-tre-prt-sles1 mrgn-crct-input-bx-sls-mstr-rspnsv-nw-sctn form-control-standard" [(ngModel)]="${m.master}.Company_Id" (ngModelChange)="Company_Dropdown_Change()" name="Company_Id">
                            <option *ngFor="let c of Company_Data" [ngValue]="c.Company_Id">{{c.Company_Name}}</option>
                        </select>
                    </div>\n` + match;
                });
                fs.writeFileSync(htmlFile, html, 'utf8');
            }
        }

        if (fs.existsSync(tsFile)) {
            let ts = fs.readFileSync(tsFile, 'utf8');
            if (!ts.includes('Company_Dropdown_Change()')) {
                // Ensure Company_Data is declared
                if (!ts.includes('Company_Data')) {
                    ts = ts.replace(/(Entry_View\s*:\s*boolean\s*=\s*false;)/, "$1\nCompany_Data: any[] = [];\n");
                }

                // Add Company_Dropdown_Change method
                ts = ts.replace(/(Load_Company\(\)\s*\{)/, `Company_Dropdown_Change() {
    if(this.Company_Data) {
        const c = this.Company_Data.find(x => x.Company_Id == this.${m.master}.Company_Id);
        if (c) {
            this.Company_ = c;
            this.Print_Company_ = c;
        }
    }
}
$1`);

                // Update Load_Company to set Company_Data
                ts = ts.replace(/(this\.Print_Company_\s*=\s*Rows\[0\]\[0\];)/, "this.Company_Data = Rows[0];\n    $1");

                // Update clear method to reset Company_Id
                // The clear method might be Clr_Sales_Master, Clr_Price_Request, etc.
                const clearRegex = /this\.[a-zA-Z_]+\.Mobile\s*=\s*["']["'];/g; // Try to match the end of the clear method
                ts = ts.replace(clearRegex, (match) => {
                    return match + `\n    if (this.Company_Data && this.Company_Data.length > 0) {\n        this.${m.master}.Company_Id = this.Company_Data[0].Company_Id;\n        this.Company_ = this.Company_Data[0];\n        this.Print_Company_ = this.Company_Data[0];\n    }\n`;
                });

                fs.writeFileSync(tsFile, ts, 'utf8');
            }
        }
    } catch (e) {
        console.error("Error patching " + m.dir, e);
    }
});
console.log("UI Patch completed");
