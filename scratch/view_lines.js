const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../frontend/src/app/modules/admin/Quotation/Quotation.component.ts');
const content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');
console.log(lines.slice(1929, 1980).join('\n'));
