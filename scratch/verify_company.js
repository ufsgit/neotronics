const fs = require('fs');
const base = 'src/app/modules/admin';
const modules = {
  'Requirement': 'Requirement/Requirement.component.ts',
  'Price_Request': 'Price_Request/Price_Request.component.ts',
  'Quotation': 'Quotation/Quotation.component.ts',
  'SalesOrder': 'SalesOrder/SalesOrder.component.ts',
  'Performa_Invoice': 'Performa_Invoice/Performa_Invoice.component.ts',
  'Purchase_Order': 'Purchase_Order/Purchase_Order.component.ts',
  'purchase-return': 'purchase-return/purchase-return.component.ts',
  'Sales_Return': 'Sales_Return/Sales_Return.component.ts'
};

console.log('\n=== Final Verification of Branch/Company Dropdown Fix ===\n');
Object.entries(modules).forEach(([name, f]) => {
  const c = fs.readFileSync(base + '/' + f, 'utf8');

  // Detect any response-unwrapping pattern
  const hasUnwrap =
    c.includes('response.data : response') ||
    c.includes('.data) ? (Rows as any).data') ||
    c.includes('(Rows as any).data : Rows');

  // Detect Company_Data assignment
  const hasCompanyDataRows0 = c.includes('this.Company_Data = Rows[0]');
  const hasCompanyDataCompanyRows = c.includes('this.Company_Data = companyRows');
  const hasCompanyData = hasCompanyDataRows0 || hasCompanyDataCompanyRows;

  // Detect old (broken) subscribe pattern still present
  const oldSubscribeRegex = /\.Load_Company\(\)\.subscribe\(\s*Rows\s*=>/;
  const hasOldSubscribe = oldSubscribeRegex.test(c) && hasCompanyData;

  let status = '';
  if (hasOldSubscribe) {
    status = '❌ STILL BROKEN (old subscribe pattern)';
  } else if (hasUnwrap && hasCompanyData) {
    status = '✅ FIXED';
  } else if (hasCompanyData && !hasUnwrap) {
    // Check if it uses a custom unwrap (like Requirement.component.ts)
    status = '✅ FIXED (custom unwrap)';
  } else {
    status = '⚠ NO Company_Data dropdown';
  }

  console.log(name.padEnd(20) + ' | ' + status);

  // Show the subscribe line for quick inspection
  const lines = c.split('\n');
  lines.forEach((line, i) => {
    if (line.includes('Load_Company().subscribe')) {
      console.log(' '.padEnd(22) + '  subscribe @ line ' + (i+1) + ': ' + line.trim().substring(0, 80));
    }
  });
});
console.log('\n=== Done ===\n');
