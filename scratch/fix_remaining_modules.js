const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '../frontend/src/app/modules/admin');

// Remaining modules that also use Load_Company with old pattern
const remainingModules = [
  'Daybook/Daybook.component.ts',
  'Vat_Report/Vat_Report.component.ts',
  'Stock_Reports/Stock_Reports.component.ts',
  'Receipt_Voucher/Receipt_Voucher.component.ts',
  'ReceiptVoucher/ReceiptVoucher.component.ts',
  'ProfitAndLossReport/ProfitAndLossReport.component.ts',
  'Payment_Voucher/Payment_Voucher.component.ts',
  'OutstandingReport/OutstandingReport.component.ts',
  'Ledger/Ledger.component.ts',
  'GRN_Vat_Report/GRN_Vat_Report.component.ts',
  'Company/Company.component.ts'
];

const fixedTemplate = (serviceName) => `Load_Company() 
    {   
    this.${serviceName}.Load_Company().subscribe((response) => {
    // API wraps with sendSuccess: { success: true, data: [[companyRows],[bankRows]] }
    const Rows = (response && typeof response === 'object' && 'success' in response) ? response.data : response;
    if (Rows != null && Array.isArray(Rows[0]) && Rows[0].length > 0) {
    this.Company_Data = Rows[0];
    this.Print_Company_ = Rows[0][0];
    this.Company_ = Rows[0][0];
    this.Bank_ = Rows[1] || [];
 }
 this.issLoading = false;
 },
 err => {
 this.issLoading = false;
 });
}`;

console.log('\n=== Fixing remaining Load_Company modules ===\n');

for (const mod of remainingModules) {
  const filePath = path.join(basePath, mod);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${mod}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  // Already fixed?
  if (content.includes('Load_Company().subscribe((response)') && 
      content.includes('success in response')) {
    console.log(`ALREADY FIXED: ${path.basename(filePath)}`);
    continue;
  }

  // Find Load_Company subscribe line
  let subscribeLineIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Load_Company().subscribe(Rows') || 
        lines[i].includes("Load_Company().subscribe(Rows =>")) {
      subscribeLineIdx = i;
      break;
    }
  }

  if (subscribeLineIdx === -1) {
    console.log(`SKIP (no old pattern): ${path.basename(filePath)}`);
    continue;
  }

  // Get service name
  const svcMatch = lines[subscribeLineIdx].match(/this\.(\w+)\.Load_Company/);
  const serviceName = svcMatch ? svcMatch[1] : 'Sales_Master_Service_';

  // Find the Load_Company() { line (should be a few lines before)
  let funcLineIdx = -1;
  for (let i = subscribeLineIdx; i >= Math.max(0, subscribeLineIdx - 5); i--) {
    if (lines[i].includes('Load_Company()') && !lines[i].includes('subscribe') && !lines[i].includes('this.')) {
      funcLineIdx = i;
      break;
    }
  }

  // Find end of the subscribe callback (closing });  followed by closing } of function)
  let depth = 0;
  let endLineIdx = -1;
  let started = false;
  for (let i = subscribeLineIdx; i < Math.min(lines.length, subscribeLineIdx + 30); i++) {
    const line = lines[i];
    for (const ch of line) {
      if (ch === '{') { depth++; started = true; }
      if (ch === '}') { depth--; }
    }
    if (started && depth <= 0) {
      endLineIdx = i;
      break;
    }
  }

  // Now find the outer function close
  let funcEndIdx = -1;
  if (endLineIdx !== -1) {
    for (let i = endLineIdx + 1; i < Math.min(lines.length, endLineIdx + 5); i++) {
      if (lines[i].trim() === '}') {
        funcEndIdx = i;
        break;
      }
    }
  }

  const start = funcLineIdx !== -1 ? funcLineIdx : Math.max(0, subscribeLineIdx - 2);
  const end = funcEndIdx !== -1 ? funcEndIdx : (endLineIdx !== -1 ? endLineIdx : subscribeLineIdx + 15);

  // Replace the block
  const replacement = fixedTemplate(serviceName).split('\n');
  lines.splice(start, end - start + 1, ...replacement);

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log(`FIXED: ${path.basename(filePath)} (lines ${start+1}-${end+1}, service: ${serviceName})`);
}

console.log('\n=== Done ===\n');
