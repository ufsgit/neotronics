const fs = require('fs');
const path = require('path');

const filePath = path.resolve('c:/Users/nanda/OneDrive/Desktop/UFS PROJECT/netronics/frontend/src/app/modules/admin/Quotation_Confirmation/Quotation_Confirmation.component.ts');
const raw = fs.readFileSync(filePath);

let content;
if (raw[0] === 0xff && raw[1] === 0xfe) {
    content = raw.toString('utf16le');
} else {
    content = raw.toString('utf8');
}

const lines = content.split(/\r?\n/);
console.log("Total lines in TS:", lines.length);

const targets = ['Status_Filter', 'Reset_Filters', 'Search_Quotation', 'Update_Quotation_Workflow_Status', 'Workflow'];
targets.forEach(target => {
    console.log(`\n--- Matches for "${target}" ---`);
    lines.forEach((line, index) => {
        if (line.includes(target)) {
            console.log(`${index + 1}: ${line.trim()}`);
        }
    });
});
