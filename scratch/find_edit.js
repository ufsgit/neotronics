const fs = require('fs');
const path = require('path');

const filePath = path.resolve('c:/Users/nanda/OneDrive/Desktop/UFS PROJECT/netronics/frontend/src/app/modules/admin/Quotation/Quotation.component.ts');
const raw = fs.readFileSync(filePath);

// Let's detect encoding
let content;
if (raw[0] === 0xff && raw[1] === 0xfe) {
    content = raw.toString('utf16le');
} else {
    content = raw.toString('utf8');
}

const lines = content.split(/\r?\n/);
console.log("Total lines:", lines.length);

const targets = ['Save_Quotation', 'Clr_Sales_Master', 'Load_SalesQuotationMaster', 'Status_'];
targets.forEach(target => {
    console.log(`\n--- Matches for "${target}" ---`);
    lines.forEach((line, index) => {
        if (line.includes(target)) {
            console.log(`${index + 1}: ${line.trim()}`);
        }
    });
});
