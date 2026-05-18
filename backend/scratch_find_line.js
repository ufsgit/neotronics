const fs = require('fs');
const path = require('path');

const filePath = 'c:/Users/nanda/OneDrive/Desktop/UFS PROJECT/netronics/frontend/src/app/modules/admin/Quotation/Quotation.component.ts';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Total lines:", lines.length);

lines.forEach((line, index) => {
    if (line.toLowerCase().includes('clr_sales_details')) {
        console.log(`Line ${index + 1}: ${line.trim()}`);
    }
});
process.exit(0);
