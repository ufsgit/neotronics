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
console.log("Total lines in HTML:", lines.length);

const targets = ['Status', 'status', 'Status_Data', 'Status_'];
targets.forEach(target => {
    console.log(`\n--- Matches for "${target}" ---`);
    lines.forEach((line, index) => {
        if (line.includes(target)) {
            console.log(`${index + 1}: ${line.trim()}`);
        }
    });
});
