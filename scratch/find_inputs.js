const fs = require('fs');
const path = require('path');

const filePath = path.resolve('c:/Users/nanda/OneDrive/Desktop/UFS PROJECT/netronics/frontend/src/app/modules/admin/Quotation/Quotation.component.html');
const raw = fs.readFileSync(filePath);

let content;
if (raw[0] === 0xff && raw[1] === 0xfe) {
    content = raw.toString('utf16le');
} else {
    content = raw.toString('utf8');
}

const lines = content.split(/\r?\n/);

const targets = ['Search Item', 'mat-autocomplete', 'Quotation_Details_', 'Sales Rate', 'UnitPrice', 'Custom Rate'];
targets.forEach(target => {
    console.log(`\n--- Matches for "${target}" ---`);
    lines.forEach((line, index) => {
        if (line.toLowerCase().includes(target.toLowerCase())) {
            console.log(`${index + 1}: ${line.trim()}`);
        }
    });
});
